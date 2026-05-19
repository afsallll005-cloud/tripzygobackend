import { HotelModel } from "../model/Hotel.js";
import { PackageCollectionModel } from "../model/Package.js";

/* ADD PACKAGE */
export const addPackages = async (req, res) => {
  try {

    const imagePath = req.file ? `/images/${req.file.filename}` : "";

    const pkg = new PackageCollectionModel({
      title: req.body.title,
      destination: req.body.destination,
      location: req.body.location,
      price: req.body.price,
      rating: req.body.rating,
      description: req.body.description,
      durationDays: req.body.durationDays,
      inclusions: [],
      itinerary: [],
      suggestedHotels: [],

      image: imagePath
    });

    await pkg.save();

    res.status(201).json(pkg);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* GET ALL PACKAGES */
/* ================= GET ALL PACKAGES ================= */
export const getPackages = async (req, res) => {
  try {
    const { deleted } = req.query;

    let filter = {};

    if (deleted === "true") {
      filter.isDelete = true;
    } else {
      filter.isDelete = false;
    }

    const packages = await PackageCollectionModel.find(filter);

    res.json(packages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= GET PACKAGE DETAILS + HOTELS ================= */
export const getPackageDetails = async (req, res) => {
  try {
    const packageData = await PackageCollectionModel.findById(req.params.id);

    if (!packageData) {
      return res.status(404).json({ message: "Package not found" });
    }

    // 🔥 IMPORTANT: FETCH HOTELS
    const hotels = await HotelModel.find({
      packageId: req.params.id
    });

    res.json({
      ...packageData._doc,
      hotels
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};





/* UPDATE (EDIT) */
export const updatePackage = async (req, res) => {
  try {
    const updateData = {
      ...req.body,
      price: Number(req.body.price),
      rating: Number(req.body.rating),
      durationDays: Number(req.body.durationDays)
    };

    if (req.file) {
      updateData.image = `/images/${req.file.filename}`;
    }

    const updated = await PackageCollectionModel.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





/* DELETE (SOFT DELETE) */
export const deletePackage = async (req, res) => {
  try {

    const deleted = await PackageCollectionModel.findByIdAndUpdate(
      req.params.id,
      { isDelete: true },
      { new: true }
    );

    if (!deleted) {
      return res.status(404).json({ msg: "Package not found" });
    }

    res.json({ msg: "Deleted successfully", deleted });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// Restore 
export const restorePackage = async (req, res) => {
  try {
    await PackageCollectionModel.findByIdAndUpdate(
      req.params.id,
      { isDelete: false }
    );

    res.json({ msg: "Restored successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


/* SEARCH */
export const searchPackages = async (req, res) => {
  try {
    const q = req.query.q;

    const result = await PackageCollectionModel.find({
      $or: [
        { title: { $regex: q, $options: "i" } },
        { destination: { $regex: q, $options: "i" } }
      ]
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
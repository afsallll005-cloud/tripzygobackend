// import { PackageModel } from "../model/PackageSchema.js";
import { Aboutmodel, Heromodel } from "../model/Schema.js";

export const addhero = async (req, res) => {
     try {
    const { mainDescription, title, desc, days, amount } = req.body;

    const imagePath = req.file ? `/images/${req.file.filename}` : "";

    const newHero = new Heromodel({
      mainDescription,
      title,
      desc,
      days,
      heroimage: imagePath,
      amount,
    });

    await newHero.save();

    res.status(201).json({
      message: "Hero section added successfully",
      data: newHero
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const gethero = async (req, res) => {
     try {
    const data = await Heromodel.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// About
export const addAbout = async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const newAbout = new Aboutmodel({
      aboutTitle: req.body.aboutTitle,
      aboutDesc: req.body.aboutDesc,
      aboutLeftimage: req.files?.aboutLeftimage?.[0]?.filename || "",
      aboutRightimage: req.files?.aboutRightimage?.[0]?.filename || "",
    });

    await newAbout.save();

    res.status(200).json({
      message: "About section added successfully ✅",
      data: newAbout,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};


// GET About
export const getAbout = async (req, res) => {
  try {
    const about = await Aboutmodel.find().sort({ createdAt: -1 });

    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};







// ADD PACKAGE
// export const addPackage = async (req, res) => {
//   try {

//     const newPackage = new PackageModel({
//       destinationName: req.body.destinationName,
//       location: req.body.location,
//       price: req.body.price,
//       rating: req.body.rating,
//       description: req.body.description,
//       mainImage: req.file.filename
//     });

//     await newPackage.save();

//     res.json({
//       success: true,
//       message: "Package Added Successfully",
//       data: newPackage
//     });

//   } catch (error) {
//     res.status(500).json(error);
//   }
// };

// // GET ALL PACKAGES
// export const getAllPackages = async (req, res) => {
//   try {

//     const packages = await PackageModel.find();

//     res.json({
//       success: true,
//       data: packages
//     });

//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
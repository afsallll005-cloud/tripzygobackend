import { HotelModel } from "../model/Hotel.js";
import { RoomModel } from "../model/Rooms.js";

export const createHotel = async (req, res) => {
  try {
    const body = req.body || {};

    const name = body.name;
    const city = body.city;
    const packageId = body.packageId;
    const amenities = body.amenities || "";
    const hotelPrice = body.hotelPrice;

    // ✅ safe number conversion
    const lat = Number(body.latitude);
    const lng = Number(body.longitude);

    const coordinates =
      !isNaN(lat) && !isNaN(lng) ? [lng, lat] : [0, 0];

    // ✅ images from multer
    const images = req.files
      ? req.files.map((file) => `/images/${file.filename}`)
      : [];

    const hotel = new HotelModel({
      name,
      city,
      packageId,
        hotelPrice, 
      amenities: amenities ? amenities.split(",") : [],
      location: {
        type: "Point",
        coordinates
      },
      images
    });

    await hotel.save();

    res.status(201).json(hotel);
  } catch (err) {
    console.error("Create Hotel Error:", err);
    res.status(500).json({ message: err.message });
  }
};





export const getHotelsByPackage = async (req, res) => {
  try {
    const hotels = await HotelModel.find({
      packageId: req.params.packageId
    });

    res.json(hotels);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const getHotelDetails = async (req, res) => {
  try {

    const hotel = await HotelModel.findById(req.params.id);

    const rooms = await RoomModel.find({
      hotelId: req.params.id
    });

    res.json({
      hotel,
      rooms
    });

  } catch (err) {
    res.status(500).json(err);
  }
};
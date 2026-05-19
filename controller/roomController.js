import { RoomModel } from "../model/Rooms.js";

/* CREATE ROOM */
export const createRoom = async (req, res) => {
  try {

    console.log("BODY:", req.body);
    console.log("FILES:", req.files);

    const { hotelId, name, price, maxPeople, facilities } = req.body;

    if (!hotelId || !name || !price || !maxPeople) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const roomImages = req.files
      ? req.files.map(file => `/images/${file.filename}`)
      : [];

    const room = new RoomModel({
      hotelId,
      name,
      price: Number(price),
      maxPeople: Number(maxPeople),
      facilities: facilities
        ? facilities.split(",").map(f => f.trim())
        : [],
      roomImages
    });

    await room.save();

    res.status(201).json(room);

  } catch (err) {
    console.error("ROOM ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};          




/* GET ROOMS BY HOTEL */
export const getRoomsByHotel = async (req, res) => {
  try {
    const rooms = await RoomModel.find({
      hotelId: req.params.hotelId
    });

    res.json(rooms);

  } catch (err) {
    res.status(500).json(err);
  }
};

/* AVAILABLE ROOMS */
export const getAvailableRooms = async (req, res) => {
  try {
    const rooms = await RoomModel.find({
      hotelId: req.params.hotelId
    });

    const available = rooms.filter(
      (r) => r.bookedDates.length === 0
    );

    res.json(available);

  } catch (err) {
    res.status(500).json(err);
  }
};

// /* AVAILABLE ROOMS */
// export const getAvailableRooms = async (req, res) => {
//   try {
//     const rooms = await RoomModel.find({
//       hotelId: req.params.hotelId
//     });

//     const available = rooms.filter(
//       (r) => r.bookedDates.length === 0
//     );

//     res.json(available);

//   } catch (err) {
//     res.status(500).json(err);
//   }
// };
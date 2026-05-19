import mongoose from "mongoose";
import { BookingModel } from "../model/Booking.js";
import { RoomModel } from "../model/Rooms.js";
import { generateBookingRef } from "../utils/bookingRef.js";

/* ================= CREATE BOOKING ================= */

export const createBooking = async (req, res) => {
  try {
    const { roomId, checkIn, checkOut } = req.body;

    // FIX: strict check
    const userId = req.user._id;

    if (!roomId || !checkIn || !checkOut) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const room = await RoomModel.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (end <= start) {
      return res.status(400).json({ message: "Invalid dates" });
    }

    const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * room.price;

    const booking = await BookingModel.create({
      bookingRef: generateBookingRef(),
      userId,
      roomId,
      checkIn: start,
      checkOut: end,
      nights,
      totalPrice,
      status: "confirmed"
    });

    return res.status(201).json({
      bookingId: booking._id,
      booking
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};

/* ================= GET BOOKING ================= */

export const getBookingDetails = async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.id)
      .populate("roomId userId hotelId packageId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ================= CANCEL BOOKING ================= */

export const cancelBooking = async (req, res) => {
  try {
    const booking = await BookingModel.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "cancelled";
    await booking.save();

    res.json({
      message: "Booking cancelled",
      booking
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
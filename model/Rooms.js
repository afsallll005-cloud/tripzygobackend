import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    facilities: {
      type: [String],
      default: []
    },

    price: {
      type: Number,
      required: true
    },

    maxPeople: {
      type: Number,
      required: true
    },

    roomImages: {
      type: [String],
      default: []
    },

    bookedDates: {
      type: [Date],
      default: []
    }
  },
  { timestamps: true }
);

export const RoomModel = mongoose.model("Room", RoomSchema);
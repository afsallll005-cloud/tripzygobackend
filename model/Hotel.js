import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    city: { type: String, required: true },

    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package",
      required: true
    },
       hotelPrice: {
      type: Number,
      required: true
    },


    location: {
      type: {
        type: String,
        default: "Point"
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      }
    },

    amenities: {
      type: [String],
      default: []
    },

    images: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

HotelSchema.index({ location: "2dsphere" });

export const HotelModel = mongoose.model("Hotel", HotelSchema);
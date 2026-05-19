import mongoose from "mongoose";

const PackageSchema = new mongoose.Schema({
  title: String,
  destination: String,
  location: String,
  price: Number,
  rating: Number,

  description: String,
  image: String,

  durationDays: { type: Number, required: true },

  inclusions: [{ type: String }],

  itinerary: [
    {
      day: Number,
      title: String,
      description: String
    }
  ],

  suggestedHotels: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel"
    }
  ],

  isDelete: { type: Boolean, default: false }
}, { timestamps: true });

export const PackageCollectionModel =  mongoose.model("PackageCollection", PackageSchema);
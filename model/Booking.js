import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    bookingRef: String,

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package"
    },

    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel"
    },

    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true
    },

    checkIn: {
      type: Date,
      required: true
    },

    checkOut: {
      type: Date,
      required: true
    },

    nights: Number,
    totalPrice: Number,

    status: {
      type: String,
      default: "pending"
    }
  },
  { timestamps: true }
);

// auto calculate nights
BookingSchema.pre("save", function (next) {
  if (this.checkIn && this.checkOut) {
    const diff = this.checkOut - this.checkIn;
    this.nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
  }
  next();
});

export const BookingModel = mongoose.model("Booking", BookingSchema);
import mongoose from "mongoose";

const HeroSchema = new mongoose.Schema({
  mainDescription: String,
  title: String,
  days: String,
  desc: String,
  heroimage: String,
  amount: String,
}, { timestamps: true }); 

export const Heromodel = mongoose.model("HeroSection", HeroSchema);



// About
const AboutSchema = new mongoose.Schema(
  {
    aboutLeftimage: String,
    aboutRightimage: String,
    aboutTitle: String,
    aboutDesc: String,
  },
  { timestamps: true }
);

export const Aboutmodel = mongoose.model("AboutCollection", AboutSchema);










import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import path from "path";

dotenv.config();

import {
  addAbout,
  addhero,
  getAbout,
  gethero
} from "./controller/controller.js";

import router from "./routes/apiRoutes.js";

const app = express();

/* =============================
   CORS
============================= */
const corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

/* =============================
   Upload Folder Setup
============================= */
const uploadPath = path.join("public", "images");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

/* =============================
   Multer Setup
============================= */
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

/* =============================
   MongoDB Connection
============================= */
mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

/* =============================
   Middlewares
============================= */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =============================
   Static Folder
============================= */
app.use("/images", express.static(uploadPath));

/* =============================
   API Routes
============================= */
app.use("/api", router);

/* =============================
   Hero Routes
============================= */

// app.get("/addhero", gethero);

// app.post(
//   "/addhero",
//   upload.single("heroimage"),
//   addhero
// );

/* =============================
   About Routes
============================= */

app.get("/addAbout", getAbout);

app.post(
  "/addAbout",
  upload.fields([
    { name: "aboutLeftimage", maxCount: 1 },
    { name: "aboutRightimage", maxCount: 1 }
  ]),
  addAbout
);

/* =============================
   Default Route
============================= */
app.get("/", (req, res) => {
  res.send("TripzyGo Backend Running 🚀");
});

/* =============================
   Server Start
============================= */
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

export default app;

import express from "express";
import multer from "multer";

/* ================= CONTROLLERS ================= */

// AUTH
import {
  registerUser,
  loginUser,
  getProfile
} from "../controller/authController.js";

// PACKAGE
import {
  getPackages,
  getPackageDetails,
  searchPackages,
  addPackages,
  updatePackage,
  deletePackage,
  restorePackage
} from "../controller/packageController.js";

// HOTEL
import {
  createHotel,
  getHotelsByPackage,
  getHotelDetails
} from "../controller/hotelController.js";

// ROOM
import {
  createRoom,
  getRoomsByHotel,
  getAvailableRooms
} from "../controller/roomController.js";

// BOOKING
import {
  createBooking,
  getBookingDetails,
  cancelBooking
} from "../controller/bookingController.js";

// PAYMENT
import {
  createPayment,
  verifyPayment
} from "../controller/billPaymentController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createMessage, getMessages } from "../controller/messageController.js";
import { addAbout, addhero, getAbout, gethero } from "../controller/controller.js";

/* ================= ROUTER ================= */

const router = express.Router();

/* ================= MULTER ================= */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // make sure folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });




// router.get("/addAbout", getAbout);

// router.post(
//   "/addAbout",
//   upload.fields([
//     { name: "aboutLeftimage", maxCount: 1 },
//     { name: "aboutRightimage", maxCount: 1 }
//   ]),
//   addAbout
// );




router.get("/addhero", gethero);
router.post("/addhero", upload.single("heroimage"), addhero);

/* ================= AUTH ROUTES ================= */

router.post("/auth/register", registerUser);
router.post("/auth/login", loginUser);

/* PROFILE (PROTECTED) */
router.get("/auth/profile", authMiddleware, getProfile);


/* ================= PACKAGE ROUTES ================= */

/* USER SIDE */
router.get("/packages/search", searchPackages); //  specific first
router.get("/packages", getPackages);
router.get("/packages/:id", getPackageDetails);

/* ADMIN SIDE */
router.post("/packages", upload.single("img"), addPackages);
router.put("/packages/:id", upload.single("img"), updatePackage);
router.delete("/packages/:id", deletePackage);
router.put("/packages/restore/:id", restorePackage);

/* ================= HOTEL ROUTES ================= */

router.post("/hotels", upload.array("images", 5), createHotel);
router.get("/hotels/package/:packageId", getHotelsByPackage);
router.get("/hotels/:id", getHotelDetails);


/* ================= ROOM ROUTES ================= */

router.post("/rooms", upload.array("roomImages", 10), createRoom);
router.get("/rooms/hotel/:hotelId", getRoomsByHotel);
router.get("/rooms/available/:hotelId", getAvailableRooms);


/* ================= BOOKING ROUTES ================= */

// router.post("/bookings", createBooking);
router.post("/bookings", authMiddleware, createBooking);
router.get("/bookings/:id", getBookingDetails);
router.put("/bookings/cancel/:id", cancelBooking);

/* ================= PAYMENT ROUTES ================= */

router.post("/payment", createPayment);
router.post("/payment/verify", verifyPayment);




/* ================= Message ROUTES ================= */

router.post("/addmessages", createMessage);
router.get("/getmessages", getMessages);






/* ================= EXPORT ================= */

export default router;
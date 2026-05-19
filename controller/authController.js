import jwt from "jsonwebtoken";
import { UserModel } from "../model/User.js";

/* REGISTER */
export const registerUser = async (req, res) => {
  try {
    console.log("REGISTER BODY:", req.body);

    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const exist = await UserModel.findOne({ email });

    if (exist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Default role = user
    const user = await UserModel.create({
      name,
      email,
      password,
      role: role || "user",
    });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT_SECRET missing in .env" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({ token, user });

  } catch (err) {
    console.log("REGISTER ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

/* LOGIN */
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await user.comparePassword(password);

    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* PROFILE */
export const getProfile = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id).select("-password");

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
import jwt from "jsonwebtoken";
import { UserModel } from "../model/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await UserModel.findById(decoded._id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;

    return next(); // IMPORTANT
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};



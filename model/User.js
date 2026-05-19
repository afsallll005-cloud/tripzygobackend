import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" }
  },
  { timestamps: true }
);

/* ================= PASSWORD HASH ================= */
UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

/* ================= COMPARE PASSWORD ================= */
UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

export const UserModel = mongoose.model("User", UserSchema);
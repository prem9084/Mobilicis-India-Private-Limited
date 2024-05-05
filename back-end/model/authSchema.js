import mongoose from "mongoose";

const authSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      length: ["Password length must be greater than 6 characterss"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", authSchema);

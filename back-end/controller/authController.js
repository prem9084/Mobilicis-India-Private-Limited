import authSchema from "../model/authSchema.js";
import { hashPassword, compairePassword } from "../utils/authUiles.js";
import jwt from "jsonwebtoken";
export const userRegisterController = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;
    if (!fullName) {
      return res.send({ message: "fullname is required" });
    }
    if (!username) {
      return res.send({ message: "username is required" });
    }
    if (!email) {
      return res.send({ message: "Email is required" });
    }
    if (!password) {
      return res.send({ message: "Password is required" });
    }

    // chech existing user

    const existingUser = await authSchema.findOne({ email });

    if (existingUser) {
      return res.send({
        message: "User already exists. Please Login",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await new authSchema({
      fullName,
      username,
      email,
      password: hashedPassword,
    });

    user.save();

    res.status(200).send({
      success: true,
      message: "Registration successful",
      user,
    });
  } catch (error) {
    console.log(error);
  }
};

// for user login

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({ message: "Email or password Invalid" });
    }

    // check user

    const user = await authSchema.findOne({ email });

    if (!user) {
      return res.send({
        message: "User is not register Please do Registration",
      });
    }

    const match = await compairePassword(password, user.password);

    if (!match) {
      return res.send({ message: "email and password Invalid" });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT, {
      expiresIn: "1d",
    });

    res.status(200).send({
      success: true,
      message: "User Login Successfully",
      user: {
        _id: user._id,
        name: user.fullName,
        username: user.username,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
  }
};

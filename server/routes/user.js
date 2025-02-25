import express from "express";
import bcryptjs from "bcryptjs";
const router = express.Router();
import { UserModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

router.post("/register", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    return res.json({ message: "Email already existed!" });
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const newUser = new UserModel({
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return res.json({ message: "Record registered!" });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.json({ message: "User is not registered!" });
  }
  const validPassword = await bcryptjs.compare(password, user.password);
  if (!validPassword) {
    return res.json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
  res.cookie("token", token, { httpOnly: true, maxAge: 360000 });
  return res.json({ status: true, message: "Login successfully" });
});

router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ message: "User not registered!" });
    }

    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "5m",
    });
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "dindinmailla4987@gmail.com",
        pass: "sznw yyuq weea bjkf",
      },
    });

    var mailOptions = {
      from: "dindinmailla4987@gmail.com",
      to: "user.email",
      subject: "Forgot Password Reset Link",
      text: `http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        return res.json({ message: "Error sending message email!" });
      } else {
        return res.json({ status: true, message: "Email sent!" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

export { router as UserRouter };

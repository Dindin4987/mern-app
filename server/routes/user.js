import express from "express";
import bcryptjs from "bcryptjs";
const router = express.Router();
import { UserModel } from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

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

    console.log("GMAIL_USER:", process.env.GMAIL_USER);
    console.log(
      "GMAIL_PASS:",
      process.env.GMAIL_PASS ? "Loaded" : "Not Loaded"
    );

    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // Use `true` for 465, `false` for 587
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    var mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Forgot Password Reset Link",
      text: `http://localhost:5173/resetPassword/${token}`,
    };

    await transporter.sendMail(mailOptions);
    return res.json({ status: true, message: "Email sent!" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Error sending email", error: error.message });
  }
});

const verifyUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ status: false, message: "No token" });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    return res.json(err);
  }
};

router.get("/verify",verifyUser, (req, res) => {
  return res.json({ status: true, message: "Authorized!" });
});

router.get('/logout', (req, res) => {
  res.clearCookie('token')
  return res.json({status: true})
})


export { router as UserRouter };

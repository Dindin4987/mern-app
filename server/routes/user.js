import express from "express";
import bcryptjs from "bcryptjs";
const router = express.Router();
import { UserModel } from "../models/UserModel.js";
import jwt from 'jsonwebtoken'

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

router.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.json({message: "User is not registered!"})
    }
    const validPassword = await bcryptjs.compare(password, user.password)
    if (!validPassword) {
        return res.json({message: "Invalid credentials"})
    }

    const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' })
    res.cookie('token', token, { httpOnly:true, maxAge: 360000 })
    return res.json({status: true, message: "Login successfully"})
})

export { router as UserRouter };

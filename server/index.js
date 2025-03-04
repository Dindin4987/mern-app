import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()
import cors from "cors";
import cookieParser from "cookie-parser";
import { ClientModel } from "./models/ClientModel.js";
import { UserModel } from "./models/UserModel.js";
import { UserRouter } from "./routes/user.js";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser())
app.use('/auth', UserRouter)

mongoose.connect(
  "mongodb+srv://dindin4987:dindin4987.@final.ix4ow.mongodb.net/finalmern"
);


app.get("/", (req, res) => {
  ClientModel.find({})
    .then((clients) => res.json(clients))
    .catch((err) => res.json(err));
});

app.get("/getClient/:id", (req, res) => {
  const id = req.params.id;
  ClientModel.findById({ _id: id })
    .then((clients) => res.json(clients))
    .catch((err) => res.json(err));
});

app.put("/updateClient/:id", (req, res) => {
  const id = req.params.id;
  ClientModel.findByIdAndUpdate(
    { _id: id },
    {
      name: req.body.name,
      email: req.body.email,
      contact: req.body.contact,
      age: req.body.age,
    }
  )
    .then((clients) => res.json(clients))
    .catch((err) => res.json(err));
});

app.delete("/deleteClient/:id", (req, res) => {
  const id = req.params.id;
  ClientModel.findByIdAndDelete({ _id: id })
    .then((res) => res.json(res))
    .catch((err) => res.json(err));
});

app.post("/createClient", (req, res) => {
  ClientModel.create(req.body)
    .then((clients) => res.json(clients))
    .catch((err) => res.json(err));
});

app.listen(8080, () => {
  console.log("Server is running!");
});

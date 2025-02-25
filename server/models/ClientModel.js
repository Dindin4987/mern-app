import mongoose from "mongoose";

const ClientSchema = new mongoose.Schema({
    name: String,
    email: String,
    contact: Number,
    age: Number
})

const ClientModel = mongoose.model("clients", ClientSchema)

export {ClientModel}

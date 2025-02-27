import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: String,
});

const UserModel = mongoose.model("users", UserSchema);

export { UserModel };

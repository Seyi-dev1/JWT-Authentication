const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  token: String,
});

module.exports = mongoose.model("User", userSchema);

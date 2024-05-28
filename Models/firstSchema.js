const mongoose = require("mongoose");

const firstSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  user: {
    type: String,
    required: true,
  },
  class: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  inserted_at: {
    type: Date,
  },
});

const User = mongoose.model("User", firstSchema);

module.exports = User;

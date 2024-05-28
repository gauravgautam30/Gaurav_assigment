const mongoose = require("mongoose");

const secondSchema = new mongoose.Schema({
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
  modified_at: {
    type: Date,
  },
});

const ProcessedUser = mongoose.model("ProcessedUser", secondSchema);

module.exports = ProcessedUser;

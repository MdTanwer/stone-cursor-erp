const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  destinationId: {
    type: Number,
    // required: [true, "Please enter your Destination Id!"],
  },
  destinationName: {
    type: String,
    // required: [true, "Please enter your Destination Name!"],
  },
  description: {
    type: String,
    // required: [true, "Please enter your Destination Name!"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdBy: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedBy: {
    type: Number,
    default: 1,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Destination", destinationSchema);

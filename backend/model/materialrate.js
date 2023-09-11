const mongoose = require("mongoose");

const materialRateSchema = new mongoose.Schema({
  materialRateId: {
    type: Number,
  },
  materialName: {
    type: String,
    required: [true, "please enter your Material Name!"],
  },
  customerName: {
    type: String,
    required: [true, "please enter your Customer Name!"],
  },
  locationName: {
    type: String,
  },
  rate: {
    type: Number,
    required: [true, "please enter your Rate!"],
  },
  transportRate: {
    type: Number,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: String,
    // default: `this ${user.name} is created by`,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  updatedBy: {
    type: String,
  },
});
module.exports = mongoose.model("Material Rate Master", materialRateSchema);

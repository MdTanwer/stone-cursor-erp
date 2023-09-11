const mongoose = require("mongoose");

const loaderMasterSchema = new mongoose.Schema({
  loaderId: {
    type: Number,
    // required: [true, "Please enter your Destination Id!"],
  },
  loaderName: {
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
module.exports = mongoose.model("Loader Master", loaderMasterSchema);

const mongoose = require("mongoose");

const loadTypeSchema = new mongoose.Schema({
  loadTypeId: {
    type: String,
    // required: [true, "Please enter your Destination Id!"],
  },
  loadType: {
    type: String,
    // required: [true, "Please enter your Destination Name!"],
  },
  loadWeight: {
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
module.exports = mongoose.model("LoadType", loadTypeSchema);

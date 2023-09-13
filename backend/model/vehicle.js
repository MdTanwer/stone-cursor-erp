const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema({
  vehicleId: {
    type: Number,
  },
  licensePlateNumber: {
    type: String,
    required: [true, "Please enter your licensePlateNumber!"],
  },
  vehicleModel: {
    type: Number,
    // required: [true, "Please enter your vehicleModel!"],
  },
  vehicleOwnerName: {
    type: String,
    // required: [true, "Please enter your vehicleOwnerName!"],
  },

  vehicleWeight: {
    type: Number,
    // required: [true, "Please enter your vehicleWeight!"],
  },
  vehicleTypes: {
    type: String,
    // required: [true, "Please enter your vehicleTypes!"],
  },
  vehicleFuelTypes: {
    type: String,
    // required: [true, "Please enter your vehicleTypes!"],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isPermitted: {
    type: Boolean,
    default: true,
  },
  isLicensed: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  createdBy: {
    type: String,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  updatedBy: {
    type: String,
  },
});
module.exports = mongoose.model("vehicle", vehicleSchema);

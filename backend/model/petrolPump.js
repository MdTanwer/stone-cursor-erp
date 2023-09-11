const mongoose = require("mongoose");

const petrolPumpSchema = new mongoose.Schema({
  petrolPumpId: {
    type: Number,
    // required: [true, "Please enter your Destination Id!"],
  },
  petrolPumpName: {
    type: String,
    // required: [true, "Please enter your Destination Name!"],
  },
  petrolPumpOwnerName: {
    type: String,
    // required: [true, "Please enter your Destination Name!"],
  },
  mobile: {
    type: Number,
    // required: [true, "Please enter your Destination Name!"],
  },
  city: {
    type: String,
    // required: [true, "Please enter your Destination Name!"],
  },
  address: {
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
module.exports = mongoose.model("PetrolPump", petrolPumpSchema);

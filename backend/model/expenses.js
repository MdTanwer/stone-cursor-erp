const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  expenseId: {
    type: Number,
  },
  expenseTypes: {
    type: String,
    required: [true, "Please enter your licensePlateNumber!"],
  },
  description: {
    type: String,
    required: [true, "Please enter your vehicleModel!"],
  },
  expenseDatevalue: {
    type: Date,
    // required: [true, "Please enter your vehicleOwnerName!"],
  },

  amount: {
    type: Number,
    required: [true, "Please enter your vehicleWeight!"],
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
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  updatedBy: {
    type: String,
  },
});
module.exports = mongoose.model("expense", expenseSchema);

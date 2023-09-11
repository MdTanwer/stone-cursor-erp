const mongoose = require("mongoose");

const fuelExpenseSchema = new mongoose.Schema({
  fuelExpensesId: {
    type: Number,
    // required: [true, "Please enter your fuel Expenses Id!"],
  },
  petrolPump: {
    type: String,
    // required: [true, "Please enter your Petrol Pump!"],
  },
  mobile: {
    type: String,
    // required: [true, "Please enter your Mobile Number!"],
  },
  vehicle: {
    type: String,
    // required: [true, "Please enter your Vehicle No!"],
  },
  driver: {
    type: String,
    // required: [true, "Please enter your Vehicle No!"],
  },
  type: {
    type: String,
    // required: [true, "Please enter your fuel types Name!"],
  },
  reading: {
    type: String,
    // required: [true, "Please enter your Reading Name!"],
  },

  quantity: {
    type: String,
    // required: [true, "Please enter your Quantity!"],
  },
  rate: {
    type: String,
    // required: [true, "Please enter your rate!"],
  },
  amount: {
    type: String,
    // required: [true, "Please enter your amount Name!"],
  },
  paid: {
    type: String,
    // required: [true, "Please enter your amount Name!"],
  },
  dues: {
    type: String,
    // required: [true, "Please enter your amount Name!"],
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
module.exports = mongoose.model("Fuel Expense", fuelExpenseSchema);

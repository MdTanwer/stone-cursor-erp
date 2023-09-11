const mongoose = require("mongoose");
const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: Number,
  },
  manualId: {
    type: Number,
  },
  currentDate: {
    type: Date,
  },
  suplierName: {
    type: String,
    // required: [true, "Choose Suplier !"],
  },
  invoiceNo: {
    type: String,
    // required: [true, "Enter Invoice Number !"],
  },
  dueAmount: {
    type: String,
  },
  discount: {
    type: Number,
  },
  paybleAmount: {
    type: Number,
  },
  recivedAmount: {
    type: Number,
  },
  dueAdvAmount: {
    type: Number,
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
module.exports = mongoose.model("Payment", paymentSchema);

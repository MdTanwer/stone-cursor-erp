const mongoose = require("mongoose");
const paymentRecivedSchema = new mongoose.Schema({
  paymentId: {
    type: Number,
  },
  manualId: {
    type: Number,
  },
  currentDate: {
    type: Date,
  },
  customerName: {
    type: String,
    required: [true, "Choose Customer !"],
  },
  challan: {
    type: String,
    required: [true, "Choose Challan !"],
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
module.exports = mongoose.model("Payment Recived", paymentRecivedSchema);

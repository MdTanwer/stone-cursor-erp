const mongoose = require('mongoose');
const invoiceSchema = new mongoose.Schema({
  invoiceId: {
    type: Number,
  },
  mInvoiceId: {
    type: Number,
  },
  currentDateTime: {
    type: String,
  },
  customerName: {
    type: String,
    required: [true, 'Choose Customer !'],
  },
  challanNos: {
    type: Array,
    // required: [true, 'Choose Challan !'],
  },
  challans: {
    type: Array,
    // required: [true, 'Choose Challan !'],
  },
  // dueAmount: {
  //   type: String,
  // },
  discount: {
    type: Number,
  },
  paybleAmount: {
    type: Number,
  },
  receivingAmount: {
    type: Number,
  },
  dueAdvAmount: {
    type: Number,
  },
  createdAt: {
    type: Date,
    // default: Date.now(),
  },
  createdBy: {
    type: String,
    // default: `this ${user.name} is created by`,
  },
  updatedAt: {
    type: Date,
    // default: Date.now(),
  },
  updatedBy: {
    type: String,
  },
});
module.exports = mongoose.model('Invoice', invoiceSchema);

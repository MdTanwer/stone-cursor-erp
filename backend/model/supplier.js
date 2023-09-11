const mongoose = require('mongoose');

const addNewSupplierSchema = new mongoose.Schema({
  supplierId: {
    type: Number,
    // required: [true, 'Please enter supplier name!'],
  },
  supplierName: {
    type: String,
    required: [true, 'Please enter supplier name!'],
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Please enter supplier phone number'],
  },
  whatsAppNumber: {
    type: Number,
    // required: [true, 'Please enter supplier whatsApp number'],
  },
  email: {
    type: String,
    // required: [true, 'Please enter supplier emai'],
  },

  panNumber: {
    type: String,
    // required: [true, 'Please enter supplier PAN number'],
  },
  gstNumber: {
    type: String,
    // required: [true, 'Please enter supplier GST number'],
  },
  city: {
    type: String,
    // required: [true, 'Please enter supplier city'],
  },
  pinCode: {
    type: String,
    // required: [true, 'Please enter supplier city'],
  },
  supplierAddress: {
    type: String,
    // required: [true, 'Please enter supplier full address'],
  },
  accountHolderName: {
    type: String,
    // required: [true, 'Please enter supplier bank account holder name'],
  },
  bankName: {
    type: String,
    // required: [true, 'Please enter supplier bank name'],
  },
  accountNumber: {
    type: String,
    // required: [true, 'Please enter supplier bank account number'],
  },
  ifscCode: {
    type: String,
    // required: [true, 'Please enter supplier IFSC code'],
  },
  branchAddress: {
    type: String,
    // required: [true, 'Please enter branch address'],
  },
  accountType: {
    type: String,
    // required: [true, 'Please enter account type'],
  },
  createdBy: {
    type: String,
    // required: [true, 'Please enter Created by name'],
  },
  updatedBy: {
    type: String,
    // required: [true, 'Please enter Created by name'],
  },
  createdAt: {
    type: Date,
    // default: new Date().toLocaleDateString('en-GB'),
  },
  updatedAt: {
    type: Date,
    // default: new Date().toLocaleDateString('en-GB'),
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model('Supplier', addNewSupplierSchema);

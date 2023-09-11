const mongoose = require('mongoose');

const addNewCustomerSchema = new mongoose.Schema({
  customerId: {
    type: Number,
    // required: [true, 'Please enter customer name!'],
  },
  customerName: {
    type: String,
    required: [true, 'Please enter customer name!'],
  },
  phoneNumber: {
    type: Number,
    required: [true, 'Please enter customer phone number'],
  },
  whatsAppNumber: {
    type: Number,
    // required: [true, 'Please enter customer whatsApp number'],
  },
  email: {
    type: String,
    // required: [true, 'Please enter customer emai'],
  },

  panNumber: {
    type: String,
    // required: [true, 'Please enter customer PAN number'],
  },
  gstNumber: {
    type: String,
    // required: [true, 'Please enter customer GST number'],
  },
  city: {
    type: String,
    // required: [true, 'Please enter customer city'],
  },
  pinCode: {
    type: String,
    // required: [true, 'Please enter customer city'],
  },
  customerAddress: {
    type: String,
    // required: [true, 'Please enter customer full address'],
  },
  accountHolderName: {
    type: String,
    // required: [true, 'Please enter customer bank account holder name'],
  },
  bankName: {
    type: String,
    // required: [true, 'Please enter customer bank name'],
  },
  accountNumber: {
    type: String,
    // required: [true, 'Please enter customer bank account number'],
  },
  ifscCode: {
    type: String,
    // required: [true, 'Please enter customer IFSC code'],
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

module.exports = mongoose.model('Customer', addNewCustomerSchema);

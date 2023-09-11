const mongoose = require("mongoose");

const addNewVendorSchema = new mongoose.Schema({
  vendorId: {
    type: Number,
    // required: [true, 'Please enter vendor name!'],
  },
  vendorName: {
    type: String,
    required: [true, "Please enter vendor name!"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please enter vendor phone number"],
  },
  whatsAppNumber: {
    type: Number,
    // required: [true, 'Please enter vendor whatsApp number'],
  },
  email: {
    type: String,
    // required: [true, 'Please enter vendor emai'],
  },

  panNumber: {
    type: String,
    // required: [true, 'Please enter vendor PAN number'],
  },
  gstNumber: {
    type: String,
    // required: [true, 'Please enter vendor GST number'],
  },
  city: {
    type: String,
    // required: [true, 'Please enter vendor city'],
  },
  pinCode: {
    type: String,
    // required: [true, 'Please enter vendor city'],
  },
  vendorAddress: {
    type: String,
    // required: [true, 'Please enter vendor full address'],
  },
  accountHolderName: {
    type: String,
    // required: [true, 'Please enter vendor bank account holder name'],
  },
  bankName: {
    type: String,
    // required: [true, 'Please enter vendor bank name'],
  },
  accountNumber: {
    type: String,
    // required: [true, 'Please enter vendor bank account number'],
  },
  ifscCode: {
    type: String,
    // required: [true, 'Please enter vendor IFSC code'],
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
    // default: Date.now(),
  },
  updatedAt: {
    type: Date,
    // default: Date.now(),
  },
  isActive: {
    type: Boolean,
    default: true,
  },

  //   images: [
  //     {
  //       public_id: {
  //         type: String,
  //         required: true,
  //       },
  //       url: {
  //         type: String,
  //         required: true,
  //       },
  //     },
  //   ],
});

module.exports = mongoose.model("Vendormaster", addNewVendorSchema);

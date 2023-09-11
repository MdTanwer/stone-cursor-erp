const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const transportSchema = new mongoose.Schema({
  transportId: {
    type: Number,
  },
  transportname: {
    type: String,
    // required: [true, "Please enter your name!"],
  },

  phonenumber: {
    type: Number,
    // required: [true, "Please enter your Whatsapp Number"],
    // minLength: [10, "phoneNumber should be 10 digit"],
  },
  whatsappnumber: {
    type: Number,
    // required: [true, "Please enter your email"],
  },
  transportEmail: {
    type: String,
    // required: [true, "Please enter your Pan Number "],
  },
  pannumber: {
    type: String,
    // required: [true, "Please enter your Pan Number "],
  },

  gstn: {
    type: String,
    // required: [true, "Please enter your Pan Number "],
  },
  city: {
    type: String,
    // required: [true, "Please enter your Customer Address!"],
  },
  pincode: {
    type: Number,
    // required: [true, "Please enter your Customer Address!"],
  },
  address: {
    type: String,
    // required: [true, "Please enter your Customer Address!"],
  },

  accountHolderName: {
    type: String,
    // required: [true, "Please enter your Customer Address!"],
  },
  bankName: {
    type: String,
    // required: [true, "Please enter your Customer Address!"],
  },
  accountNumber: {
    type: String,
    // required: [true, "Please enter your Customer Address!"],
  },
  ifscCode: {
    type: String,
    // required: [true, "Please enter your Customer Address!"],
  },
  branchAddress: {
    type: String,
    // required: [true, "Please enter your Customer Address!"],
  },
  accountType: {
    type: String,
    // required: [true, "Please enter your Customer Address!"],
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

module.exports = mongoose.model("transport", transportSchema);

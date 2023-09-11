const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const maintananceSchema = new mongoose.Schema({
  maintananceId: {
    type: Number,
  },
  catagory: {
    type: String,
    // required: [true, "Please enter your name!"],
  },

  vender: {
    type: String,
    // required: [true, "Please enter your Whatsapp Number"],
    // minLength: [10, "phoneNumber should be 10 digit"],
  },
  mobileNumber: {
    type: Number,
    // required: [true, "Please enter your email"],
  },
  description: {
    type: String,
    // required: [true, "Please enter your Pan Number "],
  },
  amount: {
    type: Number,
    // required: [true, "Please enter your Pan Number "],
  },

  startDatevalue: {
    type: Date,
    // required: [true, "Please enter your Pan Number "],
  },

  address: {
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

module.exports = mongoose.model("maintanance", maintananceSchema);

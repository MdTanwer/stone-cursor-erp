const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  empId: {
    type: Number,
  },
  empName: {
    type: String,
    required: [true, "Please enter your licensePlateNumber!"],
  },
  fName: {
    type: String,
    // required: [true, "Please enter your licensePlateNumber!"],
  },
  pinCode: {
    type: Number,
    // required: [true, "Please enter your licensePlateNumber!"],
  },
  employeeDatevalue: {
    type: Date,
    // required: [true, "Please enter your licensePlateNumber!"],
  },
  empRole: {
    type: String,
    // required: [true, "Please enter your vehicleModel!"],
  },
  phoneNumber: {
    type: Number,
    // required: [true, "Please enter your vehicleOwnerName!"],
  },

  whatshapNumber: {
    type: Number,
    // required: [true, "Please enter your vehicleWeight!"],
  },
  email: {
    type: String,
    // required: [true, "Please enter your vehicleTypes!"],
  },
  panNumber: {
    type: String,
    // required: [true, "Please enter your vehicleTypes!"],
  },
  adharNumber: {
    type: Number,
    // required: [true, "Please enter your vehicleTypes!"],
  },
  city: {
    type: String,
    // required: [true, "Please enter your vehicleTypes!"],
  },
  empAddress: {
    type: String,
    // required: [true, "Please enter your vehicleTypes!"],
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
    type: Number,
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
module.exports = mongoose.model("employee", employeeSchema);

const mongoose = require('mongoose');

const addNewChallanSchema = new mongoose.Schema({
  challanNumber: {
    type: Number,
    // required: [true, 'Please enter customer name!'],
  },
  mChallanNo: {
    type: Number,
    // required: [true, 'Please enter customer name!'],
    default: null,
  },
  mineSourceName: {
    type: String,
    required: [true, 'Please enter mine / source name'],
  },
  siteInchargeName: {
    type: String,
    required: [true, 'Please enter site incharge name'],
  },
  customerName: {
    type: String,
    required: [true, 'Please enter customer name'],
  },

  currentDate: {
    type: Date,
    // required: [true, 'Please enter customer PAN number'],
  },
  customerPhoneNumber: {
    type: String,
    required: [true, 'Please enter customer phone number'],
  },
  materialName: {
    type: String,
    required: [true, 'Please enter material name'],
  },
  customerDestination: {
    type: String,
    required: [true, 'Please enter customer destination'],
  },
  quantity: {
    type: String,
    required: [true, 'Please enter quantity'],
  },
  unit: {
    type: String,
    required: [true, 'Please enter unit name'],
  },
  transporter: {
    type: String,
    required: [true, 'Please enter transpoeter'],
  },
  manualTransportName: {
    type: String,
    default: null,
  },
  vehicle: {
    type: String,
    required: [true, 'Please enter vehicle'],
  },
  manualVehicleName: {
    type: String,
    default: null,
  },
  driver: {
    type: String,
    required: [true, 'Please enter driver name'],
  },
  manualDrivereName: {
    type: String,
    default: null,
  },
  royaltyType: {
    type: String,
    required: [true, 'Please enter Royalty type'],
  },
  loadedBy: {
    type: String,
    required: [true, 'Please enter Loaded by'],
  },
  loadType: {
    type: String,
    required: [true, 'Please enter Loaded type'],
  },
  grossweight: {
    type: Number,
    required: [true, 'Please enter Gross weight'],
  },
  mGrossWeight: {
    type: Number,
    // required: [true, 'Please enter Gross weight'],
  },
  emptyWeight: {
    type: Number,
    required: [true, 'Please enter Empty weight'],
  },
  netWeight: {
    type: Number,
  },
});

module.exports = mongoose.model('Challan', addNewChallanSchema);

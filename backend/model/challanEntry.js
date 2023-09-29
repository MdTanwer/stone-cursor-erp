const mongoose = require('mongoose');

const addNewChallanSchema = new mongoose.Schema({
  challanNumber: {
    type: Number,
    // required: [true, 'Please enter customer name!'],
  },
  mChallanNo: {
    type: Number,
    // required: [true, 'Please enter customer name!'],
    default: 0,
  },
  mineSourceName: {
    type: String,
    required: [true, 'Please enter mine / source name'],
  },
  siteInchargeName: {
    type: String,
    required: [true, 'Please enter site incharge name'],
  },
  customerId: {
    type: Number,
    // required: [true, 'Please enter customer name'],
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
    type: Object,
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
  royalty: {
    type: Object,
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
  grossWeightDateTime: {
    type: String,
    // required: [true, 'Please enter Gross weight'],
  },
  miningWeight: {
    type: Number,
    // required: [true, 'Please enter Gross weight'],
  },
  nonMiningWeight: {
    type: Number,
    // required: [true, 'Please enter Gross weight'],
  },
  emptyWeight: {
    type: Number,
    required: [true, 'Please enter Empty weight'],
  },
  emptyWeightDateTime: {
    type: String,
    // required: [true, 'Please enter Empty weight'],
  },
  netWeight: {
    type: Number,
  },
  saleAmount: {
    type: Number,
  },
  miningAmount: {
    type: Number,
  },
  nonMiningAmount: {
    type: Number,
  },
  materialRateDetails: {
    type: Object,
  },
  createdBy: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  updatedBy: {
    type: String,
  },

  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model('Challan', addNewChallanSchema);

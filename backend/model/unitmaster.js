const mongoose = require('mongoose');

const unitmasterSchema = new mongoose.Schema({
  unitmasterId: {
    type: Number,
    // required: [true, "Please enter your Unit name!"],
  },
  unitName: {
    type: String,
    required: [true, 'Please enter your Unit name!'],
    unique: true,
  },
  unitShortName: {
    type: String,
    required: [true, 'Please enter your Unit Short Name!'],
  },
  description: {
    type: String,
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
module.exports = mongoose.model('unitmaster', unitmasterSchema);

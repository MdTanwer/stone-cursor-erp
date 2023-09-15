const mongoose = require("mongoose");
const sourceSchema = new mongoose.Schema({
  sourceId: {
    type: Number,
  },
  sourceName: {
    type: String,
    required: [true, "please enter your source Name !"],
  },
  sourceAddress: {
    type: String,
    //  required: [true, "please enter your Source Address!"],
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
    // default: `this ${user.name} is created by`,
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  updatedBy: {
    type: String,
  },
});
module.exports = mongoose.model("Source Master", sourceSchema);

const mongoose = require("mongoose");
const materialSchema = new mongoose.Schema({
  materialId: {
    type: Number,
  },
  materialName: {
    type: String,
    required: [true, "please enter your Material Name!"],
  },
  description: {
    type: String,
    required: [true, "please enter description"],
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
module.exports = mongoose.model("Material Master", materialSchema);

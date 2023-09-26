const mongoose = require("mongoose");
const miningRoyaltySchema = new mongoose.Schema({
  royltyId: {
    type: Number,
  },
  mineName: {
    type: String,
  },
  locationName: {
    type: String,
  },
  units: {
    type: String
  },
  royltyRate: {
    type: String,
  },
  gstRate: {
    type: String,
  },
  igst: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("Mining Royalty", miningRoyaltySchema);

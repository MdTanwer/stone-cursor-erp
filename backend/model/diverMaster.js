const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

const driverMasterSchema = new mongoose.Schema({
  driverID: {
    type: Number,
  },
  driverName: {
    type: String,
    // required: [true, "Please enter your name!"],
  },

  mobileNumber: {
    type: Number,
    // required: [true, "Please enter your Whatsapp Number"],
    // minLength: [10, "phoneNumber should be 10 digit"],
  },
  driverEmail: {
    type: String,
    // required: [true, "Please enter your email"],
  },
  panNumber: {
    type: String,
    // required: [true, "Please enter your Pan Number "],
  },
  typesofDL: {
    type: String,
    // required: [true, "Please enter your Pan Number "],
  },
  drivingLicenseNumber: {
    type: String,
    // required: [true, "Please enter your Pan Number "],
  },
  startDatevalue: {
    type: String,
    // required: [true, "Please enter your Pan Number "],
  },

  city: {
    type: String,
    // required: [true, "Please enter your City "],
  },
  zipCode: {
    type: Number,
    // required: [true, "Please enter your Zip Code"],
  },
  authorityCentre: {
    type: String,
    // required: [true, "Please enter your GST Number "],
  },
  driverAddress: {
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

  //   addresses: [
  //     {
  //       country: {
  //         type: String,
  //       },
  //       city: {
  //         type: String,
  //       },
  //       address1: {
  //         type: String,
  //       },
  //       address2: {
  //         type: String,
  //       },
  //       zipCode: {
  //         type: Number,
  //       },
  //       addressType: {
  //         type: String,
  //       },
  //     },
  //   ],
  //   role: {
  //     type: String,
  //     default: "user",
  //   },
  //   avatar: {
  //     public_id: {
  //       type: String,
  //       required: true,
  //     },
  //     url: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  //   createdAt: {
  //     type: Date,
  //     default: Date.now(),
  //   },
  //   resetPasswordToken: String,
  //   resetPasswordTime: Date,
});

// //  Hash password
// userSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     next();
//   }

//   this.password = await bcrypt.hash(this.password, 10);
// });

// // jwt token
// userSchema.methods.getJwtToken = function () {
//   return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
//     expiresIn: process.env.JWT_EXPIRES,
//   });
// };

// // compare password
// userSchema.methods.comparePassword = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

module.exports = mongoose.model("DriverMaster", driverMasterSchema);

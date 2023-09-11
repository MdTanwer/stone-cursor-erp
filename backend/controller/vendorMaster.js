const express = require("express");
const router = express.Router();
const Customer = require("../model/customer");
const Vendormaster = require("../model/vendormaster");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

// create vendor
router.post(
  "/create-vendor",
  catchAsyncErrors(async (req, res, next) => {
    try {

      const vendorData = req.body;

      const vendor = await Vendormaster.create(vendorData);

      res.status(201).json({
        success: true,
        vendor,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all vendors
router.get(
  "/all-vendors",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const vendors = await Vendormaster.find().sort({
        vendorName: 1,
      });
      res.status(201).json({
        success: true,
        vendors,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find customer by ID
router.get(
  "/vendor-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const vendor = await Vendormaster.findById(req.params.id);

      res.status(201).json({
        success: true,
        vendor,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update customer data

// update user info
router.put(
  '/update-vendor-info/:id',
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const updatedVendorData = req.body;
    try {
      // const { email, password, phoneNumber, name } = req.body;

      const data = await Vendormaster.findById(id);
      //   const Vendor = await Vendor.findOne({ email }).select('+password');

      if (!data) {
        return next(new ErrorHandler("Vendor not found with this id ", 400));
      }
      const vendor = await Vendormaster.findByIdAndUpdate(
        id,
        updatedVendorData,
        { new: true }
      );

      res.status(201).json({
        success: true,
        vendor,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete vendor
router.delete(
  "/delete-vendor/:id",
  // isAuthenticated,
  // isAdmin('Admin'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const vendor = await Vendormaster.findById(req.params.id);

      if (!vendor) {
        return next(
          new ErrorHandler("Vendor is not available with this id", 400)
        );
      }

      //   const imageId = user.avatar.public_id;
      //   await cloudinary.v2.uploader.destroy(imageId);

      await Vendormaster.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Vendor deleted successfully!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;

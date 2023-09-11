const express = require('express');
const router = express.Router();
const Challan = require('../model/challanEntry');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');

// create challan
router.post(
  '/create-challan',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const challanData = req.body;

      const challan = await Challan.create(challanData);

      res.status(201).json({
        success: true,
        challan,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all challans
router.get(
  '/all-challans',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const challans = await Challan.find().sort({
        challanNumber: 1,
      });
      res.status(201).json({
        success: true,
        challans,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find challan by ID
router.get(
  '/challan-info/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const challan = await Challan.findById(req.params.id);

      res.status(201).json({
        success: true,
        challan,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update challan info
router.put(
  '/update-challan-info/:id',
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const updatedChallanData = req.body;
    try {
      // const { email, password, phoneNumber, name } = req.body;

      const data = await Challan.findById(id);
      //   const customer = await Challan.findOne({ email }).select('+password');

      if (!data) {
        return next(new ErrorHandler('Challan not found with this id ', 400));
      }
      const challan = await Challan.findByIdAndUpdate(id, updatedChallanData, {
        new: true,
      });

      res.status(201).json({
        success: true,
        challan,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete challan
router.delete(
  '/delete-challan/:id',
  // isAuthenticated,
  // isAdmin('Admin'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const challan = await Challan.findById(req.params.id);

      if (!challan) {
        return next(
          new ErrorHandler('Challan is not available with this id', 400)
        );
      }

      //   const imageId = user.avatar.public_id;
      //   await cloudinary.v2.uploader.destroy(imageId);

      await Challan.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: 'Challan deleted successfully!',
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;

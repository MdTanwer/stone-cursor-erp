const express = require('express');
const {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
} = require('../middleware/auth');
const router = express.Router();
const materialRateSchema = require('../model/materialrate');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');

router.post(
  '/create/materialrate',
  catchAsyncErrors(async (req, res, next) => {
    const {
      materialRateId,
      materialName,
      locationName,
      customerName,
      customerId,
      rate,
      purchaseRate,
      transportRate,
      isActive,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
    } = req.body;
    try {
      const materialrate = await materialRateSchema.create({
        materialRateId,
        materialName,
        locationName,
        customerName,
        customerId,
        rate,
        purchaseRate,
        transportRate,
        isActive,
        createdAt,
        createdBy,
        updatedAt,
        updatedBy,
      });
      res.status(201).json({
        success: true,
        materialrate,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.get(
  '/get/materialrate',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const materialrates = await materialRateSchema.find();
      res.status(200).json({
        success: true,
        materialrates,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.put(
  '/updatematerialrate/:id',
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      materialRateId,
      materialName,
      locationName,
      customerName,
      rate,
      purchaseRate,
      transportRate,
      isActive,
      updatedAt,
      updatedBy,
    } = req.body;
    try {
      const materialrate = await materialRateSchema.findByIdAndUpdate(
        id,
        {
          materialRateId,
          materialName,
          locationName,
          customerName,
          rate,
          purchaseRate,
          transportRate,
          isActive,
          updatedAt,
          updatedBy,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        materialrate,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.delete(
  '/deletematerialrate/:id',
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
      const materialrate = await materialRateSchema.findById(req.params.id);
      if (!materialrate) {
        return next(new ErrorHandler('Site is not found with this id', 400));
      }
      await materialRateSchema.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: 'Site is Delete Successfully',
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;

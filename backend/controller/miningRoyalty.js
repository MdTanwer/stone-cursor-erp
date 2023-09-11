const express = require("express");
const router = express.Router();
const miningRoyaltySchema = require("../model/miningRoyalty");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

router.post(
  "/create/miningroyalty",
  catchAsyncErrors(async (req, res, next) => {
    const {
      royltyId,
      mineName,
      locationName,
      royltyRate,
      gstRate,
      igst,
      isActive,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
    } = req.body;
    try {
      const miningRoyalty = await miningRoyaltySchema.create({
        royltyId,
        mineName,
        locationName,
        royltyRate,
        gstRate,
        igst,
        isActive,
        createdAt,
        createdBy,
        updatedAt,
        updatedBy,
      });
      res.status(201).json({
        success: true,
        miningRoyalty,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.get(
  "/get/miningroyalty",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const miningRoyalty = await miningRoyaltySchema.find();
      res.status(200).json({
        success: true,
        miningRoyalty,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.put(
  "/updateminingroyalty/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      royltyId,
      mineName,
      locationName,
      royltyRate,
      gstRate,
      igst,
      isActive,
      updatedAt,
      updatedBy,
    } = req.body;
    try {
      const miningRoyalty = await miningRoyaltySchema.findByIdAndUpdate(
        id,
        {
          royltyId,
          mineName,
          locationName,
          royltyRate,
          gstRate,
          igst,
          isActive,
          updatedAt,
          updatedBy,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        miningRoyalty,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.delete(
  "/deleteminingroyalty/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
      const miningRoyalty = await miningRoyaltySchema.findById(req.params.id);
      if (!miningRoyalty) {
        return next(new ErrorHandler("Site is not found with this id", 400));
      }
      await miningRoyaltySchema.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Site is Delete Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;

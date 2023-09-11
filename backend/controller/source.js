const express = require("express");
const {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
} = require("../middleware/auth");
const router = express.Router();
const sourceSchema = require("../model/source");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

router.post(
  "/create/sourcemaster",
  catchAsyncErrors(async (req, res, next) => {
    const {
      sourceId,
      sourceName,
      sourceAddress,
      isActive,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
    } = req.body;
    try {
      const sourcemaster = await sourceSchema.create({
        sourceId,
        sourceName,
        sourceAddress,
        isActive,
        createdAt,
        createdBy,
      });
      res.status(201).json({
        success: true,
        sourcemaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.get(
  "/get/sourcemaster",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sourcemaster = await sourceSchema.find();
      res.status(200).json({
        success: true,
        sourcemaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.put(
  "/updatesourcemaster/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      sourceId,
      sourceName,
      sourceAddress,
      isActive,
      updatedAt,
      updatedBy,
    } = req.body;
    try {
      const sourcemaster = await sourceSchema.findByIdAndUpdate(
        id,
        {
          sourceId,
          sourceName,
          sourceAddress,
          isActive,
          updatedAt,
          updatedBy,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        sourcemaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.delete(
  "/deletesourcemaster/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
      const sourcemaster = await sourceSchema.findById(req.params.id);
      if (!sourcemaster) {
        return next(new ErrorHandler("Site is not found with this id", 400));
      }
      await sourceSchema.findByIdAndDelete(req.params.id);
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

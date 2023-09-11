// controllers/destinationController.js

const express = require("express");
const router = express.Router();
const loaderMasterSchema = require("../model/loadermaster");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

router.post(
  "/create-loadermaster",
  catchAsyncErrors(async (req, res, next) => {
    const {
      loaderId,
      loaderName,
      description,
      isActive,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = req.body;
    debugger;
    try {
      const loadermaster = await loaderMasterSchema.create({
        loaderId,
        loaderName,
        description,
        isActive,
        createdBy,
        createdAt,
        updatedBy,
        updatedAt,
      });

      res.status(201).json({
        success: true,
        loadermaster,
      });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  })
);
router.get(
  "/get-loadermaster",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const loaderMasters = await loaderMasterSchema.find();
      debugger;
      res.status(200).json({
        success: true,
        loaderMasters,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/update-loadermaster/:id",
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      loaderName,
      description,
      isActive,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = req.body;

    try {
      const updatedloaderMaster = await loaderMasterSchema.findByIdAndUpdate(
        id,
        {
          loaderName,
          description,
          isActive,
          createdBy,
          createdAt,
          updatedBy,
          updatedAt,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        updatedloaderMaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.delete(
  "/delete-loadermaster/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const loaderMaster = await loaderMasterSchema.findById(req.params.id);

      if (!loaderMaster) {
        return next(
          new ErrorHandler("Destination is not found with this id", 404)
        );
      }

      // await unitmaster.remove();
      await loaderMasterSchema.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Destination is Deleted Successfully",
        loaderMaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;

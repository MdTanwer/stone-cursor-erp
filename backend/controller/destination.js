// controllers/destinationController.js

const express = require("express");
const router = express.Router();
const destinationSchema = require("../model/destination");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

router.post(
  "/create-destination",
  catchAsyncErrors(async (req, res, next) => {
    const {
      destinationId,
      destinationName,
      description,
      isActive,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = req.body;
    debugger;
    try {
      const destination = await destinationSchema.create({
        destinationId,
        destinationName,
        description,
        isActive,
        createdBy,
        createdAt,
        updatedBy,
        updatedAt,
      });

      res.status(201).json({
        success: true,
        destination,
      });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  })
);
router.get(
  "/get-destination",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const destinations = await destinationSchema.find();
      debugger;
      res.status(200).json({
        success: true,
        destinations,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/update-destination/:id",
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      updateDestinationId,
      destinationId,
      destinationName,
      description,
      isActive,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = req.body;

    try {
      const updateddestination = await destinationSchema.findByIdAndUpdate(
        id,
        {
          destinationId,
          destinationName,
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
        updateddestination,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.delete(
  "/delete-destination/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const destination = await destinationSchema.findById(req.params.id);

      if (!destination) {
        return next(
          new ErrorHandler("Destination is not found with this id", 404)
        );
      }

      // await unitmaster.remove();
      await destinationSchema.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Destination is Deleted Successfully",
        destination,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;

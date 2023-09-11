// controllers/destinationController.js

const express = require("express");
const router = express.Router();
const petrolPumpSchema = require("../model/petrolPump");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

router.post(
  "/create-petrolPump",
  catchAsyncErrors(async (req, res, next) => {
    const {
      petrolPumpId,
      petrolPumpName,
      petrolPumpOwnerName,
      mobile,
      city,
      address,
      isActive,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = req.body;
    debugger;
    try {
      const petrolPump = await petrolPumpSchema.create({
        petrolPumpId,
        petrolPumpName,
        petrolPumpOwnerName,
        mobile,
        city,
        address,
        isActive,
        createdBy,
        createdAt,
        updatedBy,
        updatedAt,
      });

      res.status(201).json({
        success: true,
        petrolPump,
      });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  })
);
router.get(
  "/get-petrolPump",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const petrolPumps = await petrolPumpSchema.find();
      debugger;
      res.status(200).json({
        success: true,
        petrolPumps,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/update-petrolPump/:id",
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      // updateDestinationId,
      // destinationId,

      petrolPumpName,
      petrolPumpOwnerName,
      mobile,
      city,
      address,
      isActive,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = req.body;

    try {
      const updatedpetrolPump = await petrolPumpSchema.findByIdAndUpdate(
        id,
        {
          // destinationId,

          petrolPumpName,
          petrolPumpOwnerName,
          mobile,
          city,
          address,
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
        updatedpetrolPump,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.delete(
  "/delete-petrolPump/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const petrolPump = await petrolPumpSchema.findById(req.params.id);

      if (!petrolPump) {
        return next(
          new ErrorHandler("Destination is not found with this id", 404)
        );
      }

      // await unitmaster.remove();
      await petrolPumpSchema.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Destination is Deleted Successfully",
        petrolPump,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;

const express = require("express");
const {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
} = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const vehicleSchema = require("../model/vehicle");
const ErrorHandler = require("../utils/ErrorHandler");

// create product
router.post(
  "/create-vehicle",
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    const {
      vehicleId,
      licensePlateNumber,
      vehicleModel,
      vehicleOwnerName,
      vehicleWeight,
      vehicleTypes,
      vehicleFuelTypes,
    } = req.body;

    try {
      const vehicle = await vehicleSchema.create({
        vehicleId,
        licensePlateNumber,
        vehicleModel,
        vehicleOwnerName,
        vehicleWeight,
        vehicleTypes,
        vehicleFuelTypes,
      });

      res.status(201).json({
        success: true,
        vehicle,
        //data: newUnitMaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get vehicle

router.get(
  "/get-vehicle",
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    try {
      const vehicles = await vehicleSchema.find();
      debugger;
      res.status(200).json({
        success: true,
        // data: unitmasters,
        vehicles,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// //put vehicle

router.put(
  "/update-vehicle/:id",
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      updateVehicleId,
      licensePlateNumber,
      vehicleModel,
      vehicleOwnerName,
      vehicleWeight,
      vehicleTypes,
      vehicleFuelTypes,
    } = req.body;

    try {
      const updatedvehicle = await vehicleSchema.findByIdAndUpdate(
        id,
        {
          licensePlateNumber,
          vehicleModel,
          vehicleOwnerName,
          vehicleWeight,
          vehicleTypes,
          vehicleFuelTypes,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,

        updatedvehicle,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// //Delete Vehicle

router.delete(
  "/delete-vehicle/:id",
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
      const vehicle = await vehicleSchema.findById(req.params.id);

      if (!vehicle) {
        return next(new ErrorHandler("Vehicle is not found with this id", 404));
      }

      await vehicleSchema.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Vehicle is Deleted Successfully",
        vehicle,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;

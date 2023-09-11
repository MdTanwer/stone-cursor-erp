const express = require("express");
const router = express.Router();
// const driverMaster = require("../model/diverMaster");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const maintananceSchema = require("../model/maintanance");

//create maintanance
router.post(
  "/create-maintanance",
  catchAsyncErrors(async (req, res, next) => {
    const {
      maintananceId,
      catagory,
      vender,
      mobileNumber,
      description,
      amount,
      startDatevalue,
      address,
      isActive,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = req.body;
    try {
      const maintanance = await maintananceSchema.create({
        maintananceId,
        catagory,
        vender,
        mobileNumber,
        description,
        amount,
        startDatevalue,
        address,
        isActive,
        createdBy,
        createdAt,
        updatedBy,
        updatedAt,
      });

      res.status(201).json({
        success: true,
        maintanance,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//driverModel get all

router.get(
  "/get-maintanance",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const maintanances = await maintananceSchema.find();
      res.status(200).json({
        success: true,
        maintanances,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.delete(
  "/delete-maintanance/:id",

  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
      const maintanance = await maintananceSchema.findById(req.params.id);

      if (!maintanance) {
        return next(new ErrorHandler("Unit is not found with this id", 404));
      }

      // await maintanance.remove();
      await maintananceSchema.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Unit is Deleted Successfully",
        maintanance,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/update-maintanance/:id",

  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      updatemaintananceId,
      catagory,
      vender,
      mobileNumber,
      description,
      amount,
      startDatevalue,
      address,
      isActive,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = req.body;

    try {
      const updatedMaintanance = await maintananceSchema.findByIdAndUpdate(
        id,
        {
          catagory,
          vender,
          mobileNumber,
          description,
          amount,
          startDatevalue,
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
        // data: updatedUnitMaster,
        updatedMaintanance,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;

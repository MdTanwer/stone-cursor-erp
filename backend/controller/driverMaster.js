const express = require("express");
const router = express.Router();
// const driverMaster = require("../model/diverMaster");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const driverMasterSchema = require("../model/diverMaster");

//create driver
router.post(
  "/create-driverMaster",
  catchAsyncErrors(async (req, res, next) => {
    const {
      driverID,
      driverName,
      mobileNumber,
      driverEmail,
      panNumber,
      city,
      zipCode,
      driverAddress,
      typesofDL,
      drivingLicenseNumber,
      startDatevalue,
      authorityCentre,
      accountHolderName,
      bankName,
      accountNumber,
      ifscCode,
      branchAddress,
      accountType,
      isActive,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = req.body;
    try {
      const driverMaster = await driverMasterSchema.create({
        driverID,
        driverName,
        mobileNumber,
        driverEmail,
        panNumber,
        city,
        zipCode,
        driverAddress,
        typesofDL,
        drivingLicenseNumber,
        startDatevalue,
        authorityCentre,
        accountHolderName,
        bankName,
        accountNumber,
        ifscCode,
        branchAddress,
        accountType,
        isActive,
        createdBy,
        createdAt,
        updatedBy,
        updatedAt,
      });

      res.status(201).json({
        success: true,
        driverMaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//driverModel get all

router.get(
  "/get-driverMaster",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const driverMasters = await driverMasterSchema.find();
      res.status(200).json({
        success: true,
        driverMasters,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.delete(
  "/delete-driverMaster/:id",

  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
      const drivermaster = await driverMasterSchema.findById(req.params.id);

      if (!drivermaster) {
        return next(new ErrorHandler("Driver is not found with this id", 404));
      }

      // await drivermaster.remove();
      await driverMasterSchema.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Driver is Deleted Successfully",
        drivermaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/update-driverMaster/:id",

  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      UpdatedriverID,
      driverName,
      mobileNumber,
      driverEmail,
      panNumber,
      city,
      zipCode,
      driverAddress,
      typesofDL,
      drivingLicenseNumber,
      startDatevalue,
      authorityCentre,
      accountHolderName,
      bankName,
      accountNumber,
      ifscCode,
      branchAddress,
      accountType,
      isActive,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = req.body;

    try {
      const updatedDriverMaster = await driverMasterSchema.findByIdAndUpdate(
        id,
        {
          driverName,
          mobileNumber,
          driverEmail,
          panNumber,
          city,
          zipCode,
          driverAddress,
          typesofDL,
          drivingLicenseNumber,
          startDatevalue,
          authorityCentre,
          accountHolderName,
          bankName,
          accountNumber,
          ifscCode,
          branchAddress,
          accountType,
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
        updatedDriverMaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;

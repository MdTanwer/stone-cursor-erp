const express = require("express");
const router = express.Router();
// const driverMaster = require("../model/diverMaster");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const transportSchema = require("../model/transport");

//create transport
router.post(
  "/create-transport",
  catchAsyncErrors(async (req, res, next) => {
    const {
      transportId, //
      transportname, //
      phonenumber, //
      whatsappnumber, //
      transportEmail, //
      pannumber, //
      gstn, //
      city, //
      pincode, //
      address, //
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
      const transport = await transportSchema.create({
        transportId,
        transportname,
        phonenumber,
        whatsappnumber,
        transportEmail,
        pannumber,
        gstn,
        city,
        pincode,
        address,
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
        transport,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get  transport  all

router.get(
  "/get-transport",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const transports = await transportSchema.find();
      res.status(200).json({
        success: true,
        transports,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.delete(
  "/delete-transport/:id",

  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
      const transport = await transportSchema.findById(req.params.id);

      if (!transport) {
        return next(
          new ErrorHandler("Transport is not found with this id", 404)
        );
      }

      // await transport.remove();
      await transportSchema.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Transport is Deleted Successfully",
        transport,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/update-transport/:id",

  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      transportId,
      transportname,
      phonenumber,
      whatsappnumber,
      transportEmail,
      pannumber,
      gstn,
      city,
      pincode,
      address,
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
      const updatedTransport = await transportSchema.findByIdAndUpdate(
        id,
        {
          transportId,
          transportname,
          phonenumber,
          whatsappnumber,
          transportEmail,
          pannumber,
          gstn,
          city,
          pincode,
          address,
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
        updatedTransport,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;

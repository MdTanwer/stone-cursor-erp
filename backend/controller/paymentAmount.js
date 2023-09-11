const express = require("express");
const {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
} = require("../middleware/auth");
const router = express.Router();
const paymentSchema = require("../model/paymentAmount");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

router.post(
  "/create/payment",
  catchAsyncErrors(async (req, res, next) => {
    const {
      paymentId,
      manualId,
      currentDate,
      suplierName,
      invoiceNo,
      dueAmount,
      discount,
      paybleAmount,
      recivedAmount,
      dueAdvAmount,
      createdAt,
      createdBy,
      updatedAt,
      updatedBy,
    } = req.body;
    try {
      const Payment = await paymentSchema.create({
        paymentId,
        manualId,
        currentDate,
        suplierName,
        invoiceNo,
        dueAmount,
        discount,
        paybleAmount,
        recivedAmount,
        dueAdvAmount,
        createdAt,
        createdBy,
      });
      res.status(201).json({
        success: true,
        Payment,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.get(
  "/get/payment",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const Payment = await paymentSchema.find();
      res.status(200).json({
        success: true,
        Payment,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.put(
  "/update/payment/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      paymentId,
      manualId,
      currentDate,
      suplierName,
      invoiceNo,
      dueAmount,
      discount,
      paybleAmount,
      recivedAmount,
      dueAdvAmount,
      updatedAt,
      updatedBy,
    } = req.body;
    try {
      const Payment = await paymentSchema.findByIdAndUpdate(
        id,
        {
          paymentId,
          manualId,
          currentDate,
          suplierName,
          invoiceNo,
          dueAmount,
          discount,
          paybleAmount,
          recivedAmount,
          dueAdvAmount,
          updatedAt,
          updatedBy,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        Payment,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.delete(
  "/delete/payment/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
      const payment = await paymentSchema.findById(req.params.id);
      if (!payment) {
        return next(new ErrorHandler("Payment is not found with this id", 400));
      }
      await paymentSchema.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "payment is Delete Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;

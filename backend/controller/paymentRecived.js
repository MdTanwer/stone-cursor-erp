const express = require("express");
const {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
} = require("../middleware/auth");
const router = express.Router();
const paymentRecivedSchema = require("../model/paymentRecived");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

router.post(
  "/create/paymentrecieved",
  catchAsyncErrors(async (req, res, next) => {
    const {
      paymentId,
      manualId,
      currentDate,
      customerName,
      challan,
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
      const paymentRecived = await paymentRecivedSchema.create({
        paymentId,
        manualId,
        currentDate,
        customerName,
        challan,
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
        paymentRecived,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.get(
  "/get/paymentrecieved",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const paymentRecived = await paymentRecivedSchema.find();
      res.status(200).json({
        success: true,
        paymentRecived,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.put(
  "/update/paymentrecieved/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      paymentId,
      manualId,
      currentDate,
      customerName,
      challan,
      dueAmount,
      discount,
      paybleAmount,
      recivedAmount,
      dueAdvAmount,
      updatedAt,
      updatedBy,
    } = req.body;
    try {
      const paymentRecived = await paymentRecivedSchema.findByIdAndUpdate(
        id,
        {
          paymentId,
          manualId,
          currentDate,
          customerName,
          challan,
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
        paymentRecived,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.delete(
  "/delete/paymentrecieved/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
      const paymentRecived = await paymentRecivedSchema.findById(req.params.id);
      if (!paymentRecived) {
        return next(
          new ErrorHandler("Payment Recived is not found with this id", 400)
        );
      }
      await paymentRecivedSchema.findByIdAndDelete(req.params.id);
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

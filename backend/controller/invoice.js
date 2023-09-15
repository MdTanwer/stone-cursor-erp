const express = require('express');
const router = express.Router();
const Invoice = require('../model/invoice');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');

// create invoice
router.post(
  '/create-invoice',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const invoiceData = req.body;

      const invoice = await Invoice.create(invoiceData);

      res.status(201).json({
        success: true,
        invoice,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all invoices
router.get(
  '/all-invoice',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const invoices = await Invoice.find().sort({
        invoiceId: 1,
      });
      res.status(201).json({
        success: true,
        invoices,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find invoice by ID
router.get(
  '/invoice-info/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const invoice = await Invoice.findById(req.params.id);

      res.status(201).json({
        success: true,
        invoice,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update invoice info
router.put(
  '/update-invoice-info/:id',
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const updatedInvoiceData = req.body;
    try {
      // const { email, password, phoneNumber, name } = req.body;

      const data = await Invoice.findById(id);

      if (!data) {
        return next(new ErrorHandler('Invoice not found with this id ', 400));
      }
      const invoice = await Invoice.findByIdAndUpdate(id, updatedInvoiceData, {
        new: true,
      });

      res.status(201).json({
        success: true,
        invoice,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete invoice
router.delete(
  '/delete-invoice/:id',
  // isAuthenticated,
  // isAdmin('Admin'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const invoice = await Invoice.findById(req.params.id);

      if (!invoice) {
        return next(
          new ErrorHandler('Invoice is not available with this id', 400)
        );
      }

      //   const imageId = user.avatar.public_id;
      //   await cloudinary.v2.uploader.destroy(imageId);

      await Invoice.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: 'Invoice deleted successfully!',
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;

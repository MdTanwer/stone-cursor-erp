const express = require('express');
const router = express.Router();
const Customer = require('../model/customer');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');

// create customer
router.post(
  '/create-customer',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const customerData = req.body;

      const customer = await Customer.create(customerData);

      res.status(201).json({
        success: true,
        customer,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all customers
router.get(
  '/all-customers',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const customers = await Customer.find().sort({
        customerName: 1,
      });
      res.status(201).json({
        success: true,
        customers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find customer by ID
router.get(
  '/customer-info/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id);

      res.status(201).json({
        success: true,
        customer,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update customer data

// update user info
router.put(
  '/update-customer-info/:id',
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const updatedCustomerData = req.body;
    try {
      // const { email, password, phoneNumber, name } = req.body;

      const data = await Customer.findById(id);
      //   const customer = await Customer.findOne({ email }).select('+password');

      if (!data) {
        return next(new ErrorHandler('Customer not found with this id ', 400));
      }
      const customer = await Customer.findByIdAndUpdate(
        id,
        updatedCustomerData,
        { new: true }
      );

      res.status(201).json({
        success: true,
        customer,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete customer
router.delete(
  '/delete-customer/:id',
  // isAuthenticated,
  // isAdmin('Admin'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const customer = await Customer.findById(req.params.id);

      if (!customer) {
        return next(
          new ErrorHandler('Customer is not available with this id', 400)
        );
      }

      //   const imageId = user.avatar.public_id;
      //   await cloudinary.v2.uploader.destroy(imageId);

      await Customer.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: 'Customer deleted successfully!',
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;

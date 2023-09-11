const express = require('express');
const router = express.Router();
// const Supplier = require("../model/customer");
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const ErrorHandler = require('../utils/ErrorHandler');
const Supplier = require('../model/supplier');

// create customer
router.post(
  '/create-supplier',
  catchAsyncErrors(async (req, res, next) => {
    try {
      //   const shop = await Shop.findById(shopId);
      //   if (!shop) {
      //     return next(new ErrorHandler('Shop Id is invalid!', 400));
      //   } else {
      //     let images = [];

      //     if (typeof req.body.images === 'string') {
      //       images.push(req.body.images);
      //     } else {
      //       images = req.body.images;
      //     }

      //     const imagesLinks = [];

      //     for (let i = 0; i < images.length; i++) {
      //       const result = await cloudinary.v2.uploader.upload(images[i], {
      //         folder: 'products',
      //       });

      //       imagesLinks.push({
      //         public_id: result.public_id,
      //         url: result.secure_url,
      //       });
      //     }

      //     const customerData = req.body;

      //     const customer = await Supplier.create(customerData);

      //     res.status(201).json({
      //       success: true,
      //       customer,
      //     });
      //   }
      const supplierData = req.body;

      const supplier = await Supplier.create(supplierData);

      res.status(201).json({
        success: true,
        supplier,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// get all customers
router.get(
  '/all-suppliers',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const suppliers = await Supplier.find().sort({
        supplierId: 1,
      });
      res.status(201).json({
        success: true,
        suppliers,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find customer by ID
router.get(
  '/supplier-info/:id',
  catchAsyncErrors(async (req, res, next) => {
    try {
      const supplier = await Supplier.findById(req.params.id);

      res.status(201).json({
        success: true,
        supplier,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update customer data

// update user info
router.put(
  '/update-supplier-info/:id',
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const updatedSupplierData = req.body;
    try {
      // const { email, password, phoneNumber, name } = req.body;

      const data = await Supplier.findById(id);
      //   const customer = await Supplier.findOne({ email }).select('+password');

      if (!data) {
        return next(new ErrorHandler('Supplier not found with this id ', 400));
      }
      const supplier = await Supplier.findByIdAndUpdate(
        id,
        updatedSupplierData,
        { new: true }
      );

      res.status(201).json({
        success: true,
        supplier,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// Delete customer
router.delete(
  '/delete-supplier/:id',
  // isAuthenticated,
  // isAdmin('Admin'),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const supplier = await Supplier.findById(req.params.id);

      if (!supplier) {
        return next(
          new ErrorHandler('Supplier is not available with this id', 400)
        );
      }

      //   const imageId = user.avatar.public_id;
      //   await cloudinary.v2.uploader.destroy(imageId);

      await Supplier.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: 'Supplier deleted successfully!',
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;

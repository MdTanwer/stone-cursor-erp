const express = require('express');
const {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
} = require('../middleware/auth');
const catchAsyncErrors = require('../middleware/catchAsyncErrors');
const router = express.Router();
const unitmasterSchema = require("../model/unitmaster");
const ErrorHandler = require("../utils/ErrorHandler");
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

// create product
router.post(
  '/create-unitmaster',
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    const { unitmasterId, unitName, unitShortName, description } = req.body;

    try {

      debugger
      // const unitshortname = await unitmasterSchema.findOne({ unitShortName });

      // if (unitshortname) {
      //   return next(new ErrorHandler("This Unit is already exists", 400));
      // }
      // else {
      const unitmaster = await unitmasterSchema.create({
        unitmasterId,
        unitName,
        unitShortName,
        description,
      });
      // }
      debugger
      res.status(201).json({
        success: true,
        message: "Unit is Created Successfully",
        unitmaster,
        //data: newUnitMaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.get(
  '/get-unitmasters',
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    try {
      const unitmasters = await unitmasterSchema.find();

      res.status(200).json({
        success: true,
        // data: unitmasters,
        unitmasters,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  '/update-unitmaster/:id',
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { unitmasterId, unitName, unitShortName, description } = req.body;

    try {
      const updatedUnitMaster = await unitmasterSchema.findByIdAndUpdate(
        id,
        {
          // unitmasterId,
          unitName,
          unitShortName,
          description,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        // data: updatedUnitMaster,
        updatedUnitMaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/update-unitmaster/:id",
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const { unitmasterId, unitName, unitShortName, description } = req.body;

    try {
      const updatedUnitMaster = await unitmasterSchema.findByIdAndUpdate(
        id,
        {
          unitmasterId,
          unitName,
          unitShortName,
          description,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        // data: updatedUnitMaster,
        updatedUnitMaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
// router.put(
//   "/update-unitmaster/:unitShortName",
//   //   isAuthenticated, // Ensure user is authenticated
//   //   isAdmin, // Ensure user has admin privileges
//   //   isSuperAdmin, // Ensure user has Superadmin privileges
//   catchAsyncErrors(async (req, res, next) => {
//     const { unitShortName } = req.params;
//     const { unitName, description } = req.body;

//     try {
//       const updatedUnitMaster = await unitmasterSchema.findOneAndUpdate(
//         { unitShortName: unitShortName },
//         {
//           unitName,
//           description,
//         },
//         { new: true }
//       );

//       if (!updatedUnitMaster) {
//         return next(new ErrorHandler('Unit master not found', 404));
//       }

//       res.status(200).json({
//         success: true,
//         message: "Unit is Deleted Successfully",
//         updatedUnitMaster
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );

// router.put(
//   "/update-unitmaster/:updateUnitmasterId",
//   //   isAuthenticated, // Ensure user is authenticated
//   //   isAdmin, // Ensure user has admin privileges
//   //   isSuperAdmin, // Ensure user has Superadmin privileges
//   catchAsyncErrors(async (req, res, next) => {
//     const { unitmasterId } = req.params;
//     const { unitShortName, unitName, description } = req.body;

//     try {
//       const updatedUnitMaster = await unitmasterSchema.findOneAndUpdate(
//         { updateUnitmasterId: unitmasterId },
//         {
//           unitShortName,
//           unitName,
//           description,
//         },
//         { new: true }
//       );

//       if (!updatedUnitMaster) {
//         return next(new ErrorHandler('Unit master not found', 404));
//       }

//       res.status(200).json({
//         success: true,
//         message: "Unit is Updated Successfully",
//         updatedUnitMaster
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );

router.delete(
  '/delete-unitmaster/:id',
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
      const unitmaster = await unitmasterSchema.findById(req.params.id);

      if (!unitmaster) {
        return next(new ErrorHandler('Unit is not found with this id', 404));
      }

      // await unitmaster.remove();
      await unitmasterSchema.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: 'Unit is Deleted Successfully',
        unitmaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// // delete product of a shop
// router.delete(
//   "/delete-unitmaster/:id",
//   isSeller,
//   catchAsyncErrors(async (req, res, next) => {
//     try {
//       const product = await Product.findByIdAndDelete(req.params.id);

//       if (!product) {
//         return next(new ErrorHandler("Product is not found with this id", 404));
//       }

//       for (let i = 0; i < product.images.length; i++) {
//         const result = await cloudinary.v2.uploader.destroy(
//           product.images[i].public_id
//         );
//       }

//       await product.remove();

//       res.status(201).json({
//         success: true,
//         message: "Product Deleted successfully!",
//       });
//     } catch (error) {
//       return next(new ErrorHandler(error, 400));
//     }
//   })
// );
module.exports = router;

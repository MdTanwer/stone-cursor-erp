const express = require("express");
const {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
} = require("../middleware/auth");
const router = express.Router();
const materialSchema = require("../model/material");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");

router.post(
  "/create-materialmaster",
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges

  catchAsyncErrors(async (req, res, next) => {
    const {
      materialId,
      materialName,
      description,
      updatedBy,
      updatedAt,
      createdBy,
      createdAt,
      isActive,
    } = req.body;

    try {
      const materialmaster = await materialSchema.create({
        materialId,
        materialName,
        description,
        createdBy,
        createdAt,
        isActive,
      });
      res.status(201).json({
        success: true,
        materialmaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.get(
  "/get-materialmaster",
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    try {
      const materialmasters = await materialSchema.find();
      res.status(200).json({
        success: true,
        materialmasters,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.put(
  "/update-materialmaster/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      materialId,
      materialName,
      description,
      updatedAt,
      updatedBy,
      isActive,
    } = req.body;
    try {
      const updateMaterialMaster = await materialSchema.findByIdAndUpdate(
        id,
        {
          materialName,
          description,
          updatedAt,
          updatedBy,
          isActive,
        },
        { new: true }
      );
      res.status(200).json({
        success: true,
        updateMaterialMaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.delete(
  "/delete-materialmaster/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
      const materialmaster = await materialSchema.findById(req.params.id);
      if (!materialmaster) {
        return next(
          new ErrorHandler("Material is not Found with this id", 400)
        );
      }
      await materialSchema.findByIdAndDelete(req.params.id);
      res.status(200).json({
        success: true,
        message: "Material is Delete Successfully",
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;

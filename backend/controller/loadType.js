// controllers/destinationController.js

const express = require("express");
const router = express.Router();
const loadTypeSchema = require("../model/loadType");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

router.post(
  "/create-loadType",
  catchAsyncErrors(async (req, res, next) => {
    const {
      loadTypeId,
      loadType,
      loadWeight,
      description,
      isActive,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = req.body;
    try {
      const destination = await loadTypeSchema.create({
        loadTypeId,
        loadType,
        loadWeight,
        description,
        isActive,
        createdBy,
        createdAt,
        updatedBy,
        updatedAt,
      });

      res.status(201).json({
        success: true,
        destination,
        //data: newUnitMaster,
      });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  })
);
router.get(
  "/get-loadType",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const loadTypes = await loadTypeSchema.find();
      debugger;
      res.status(200).json({
        success: true,
        // data: unitmasters,
        loadTypes,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);


router.put(
  "/update-loadType/:id",
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      loadType,
      loadWeight,
      description,
      isActive,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = req.body;

    try {
      const updatedloadType = await loadTypeSchema.findByIdAndUpdate(
        id,
        {
          loadType,
          loadWeight,
          description,
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
        updatedloadType,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.delete(
  "/delete-loadType/:id",
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    try {
      const destination = await loadTypeSchema.findById(req.params.id);

      if (!destination) {
        return next(new ErrorHandler("Unit is not found with this id", 404));
      }

      // await unitmaster.remove();
      await loadTypeSchema.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Unit is Deleted Successfully",
        destination,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;

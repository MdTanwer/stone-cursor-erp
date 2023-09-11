// controllers/destinationController.js

const express = require("express");
const router = express.Router();
const fuelExpenseSchema = require("../model/fuelExpense");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

router.post(
  "/create-fuelExpense",
  catchAsyncErrors(async (req, res, next) => {
    const {
      fuelExpensesId,
      petrolPump,
      mobile,
      vehicle,
      driver,
      type,
      reading,
      quantity,
      rate,
      amount,
      paid,
      dues,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = req.body;
    debugger;
    try {
      const fuelExpense = await fuelExpenseSchema.create({
        fuelExpensesId,
        petrolPump,
        mobile,
        vehicle,
        driver,
        type,
        reading,
        quantity,
        rate,
        amount,
        paid,
        dues,
        createdBy,
        createdAt,
        updatedBy,
        updatedAt,
      });

      res.status(201).json({
        success: true,
        fuelExpense,
      });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  })
);
router.get(
  "/get-fuelExpense",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const fuelExpenses = await fuelExpenseSchema.find();
      debugger;
      res.status(200).json({
        success: true,
        fuelExpenses,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

router.put(
  "/update-fuelExpense/:id",
  // isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      petrolPump,
      mobile,
      vehicle,
      driver,
      type,
      reading,
      quantity,
      rate,
      amount,
      paid,
      dues,
      createdBy,
      createdAt,
      updatedBy,
      updatedAt,
    } = req.body;

    try {
      const updatedfuelExpense = await fuelExpenseSchema.findByIdAndUpdate(
        id,
        {
          petrolPump,
          mobile,
          vehicle,
          driver,
          type,
          reading,
          quantity,
          rate,
          amount,
          paid,
          dues,
          createdBy,
          createdAt,
          updatedBy,
          updatedAt,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,
        updatedfuelExpense,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
router.delete(
  "/delete-fuelExpense/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const fuelExpense = await fuelExpenseSchema.findById(req.params.id);

      if (!fuelExpense) {
        return next(
          new ErrorHandler("Fuel Expenses is not found with this id", 404)
        );
      }

      // await unitmaster.remove();
      await fuelExpenseSchema.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "Fuel Expenses is Deleted Successfully",
        fuelExpense,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;

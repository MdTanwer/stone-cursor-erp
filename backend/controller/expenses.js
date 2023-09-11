const express = require("express");
const {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
} = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const expenseSchema = require("../model/expenses");
const ErrorHandler = require("../utils/ErrorHandler");

// create product
router.post(
  "/create-expense",
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    const { expenseId, expenseTypes, description, expenseDatevalue, amount } =
      req.body;

    try {
      const expense = await expenseSchema.create({
        expenseId,
        expenseTypes,
        description,
        expenseDatevalue,
        amount,
      });

      res.status(201).json({
        success: true,
        expense,
        //data: newUnitMaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get expense

router.get(
  "/get-expense",
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    try {
      const expenses = await expenseSchema.find();
      debugger;
      res.status(200).json({
        success: true,
        // data: unitmasters,
        expenses,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// //put expense

router.put(
  "/update-expense/:id",
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      updateExpenseId,
      expenseTypes,
      description,
      expenseDatevalue,
      amount,
    } = req.body;

    try {
      const updatedexpense = await expenseSchema.findByIdAndUpdate(
        id,
        {
          expenseTypes,
          description,
          expenseDatevalue,
          amount,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,

        updatedexpense,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// //Delete expense

router.delete(
  "/delete-expense/:id",
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
      const expense = await expenseSchema.findById(req.params.id);

      if (!expense) {
        return next(new ErrorHandler("expense is not found with this id", 404));
      }

      await expenseSchema.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "expense is Deleted Successfully",
        expense,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;

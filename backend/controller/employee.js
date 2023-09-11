const express = require("express");
const {
  isAuthenticated,
  isAdmin,
  isSuperAdmin,
} = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const router = express.Router();
const employeeSchema = require("../model/employee");
const ErrorHandler = require("../utils/ErrorHandler");

// create product
router.post(
  "/create-employee",
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    const {
      empId,
      empName,
      fName,
      pinCode,
      employeeDatevalue,
      phoneNumber,
      whatshapNumber,
      email,
      empRole,
      panNumber,
      adharNumber,
      city,
      empAddress,
      accountHolderName,
      bankName,
      accountNumber,
      ifscCode,
      branchAddress,
      accountType,
    } = req.body;

    try {
      const employee = await employeeSchema.create({
        empId,
        empName,
        fName,
        pinCode,
        employeeDatevalue,
        phoneNumber,
        whatshapNumber,
        email,
        empRole,
        panNumber,
        adharNumber,
        city,
        empAddress,
        accountHolderName,
        bankName,
        accountNumber,
        ifscCode,
        branchAddress,
        accountType,
      });

      res.status(201).json({
        success: true,
        employee,
        //data: newUnitMaster,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

//get employee

router.get(
  "/get-employee",
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    try {
      const employees = await employeeSchema.find();
      debugger;
      res.status(200).json({
        success: true,
        // data: unitmasters,
        employees,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// //put employee

router.put(
  "/update-employee/:id",
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;
    const {
      updateEmpId,
      empName,
      fName,
      pinCode,
      employeeDatevalue,
      phoneNumber,
      whatshapNumber,
      email,
      empRole,
      panNumber,
      adharNumber,
      city,
      empAddress,
      accountHolderName,
      bankName,
      accountNumber,
      ifscCode,
      branchAddress,
      accountType,
    } = req.body;

    try {
      const updatedemployee = await employeeSchema.findByIdAndUpdate(
        id,
        {
          empName,
          fName,
          pinCode,
          employeeDatevalue,
          phoneNumber,
          whatshapNumber,
          email,
          empRole,
          panNumber,
          adharNumber,
          city,
          empAddress,
          accountHolderName,
          bankName,
          accountNumber,
          ifscCode,
          branchAddress,
          accountType,
        },
        { new: true }
      );

      res.status(200).json({
        success: true,

        updatedemployee,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// //Delete employee

router.delete(
  "/delete-employee/:id",
  //   isAuthenticated, // Ensure user is authenticated
  //   isAdmin, // Ensure user has admin privileges
  //   isSuperAdmin, // Ensure user has Superadmin privileges
  catchAsyncErrors(async (req, res, next) => {
    const { id } = req.params;

    try {
      const employee = await employeeSchema.findById(req.params.id);

      if (!employee) {
        return next(
          new ErrorHandler("employee is not found with this id", 404)
        );
      }

      await employeeSchema.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: "employee is Deleted Successfully",
        employee,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);
module.exports = router;

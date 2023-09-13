import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleIcon,
} from "@material-ui/icons";

import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import DropdownComp from "./Helper Component/DropDownComp";
import { toast } from "react-toastify";
import axios from "axios";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import BankDetails from "./bankDetails";
import { useSelector } from "react-redux";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  deleteName: {
    color: "red", // Your desired color
    fontWeight: "bold",
    fontSize: "20px", // Your desired font weight or other styles
    // Add any other custom styles you want
  },
}));

export default function Employee(props) {
  const columns = [
    { title: "Emp Id", field: "empId" },
    { title: "EmpName", field: "empName" },
    { title: "F/HusbandName", field: "fName" },
    { title: "EmpRole", field: "empRole" },
    { title: "JoiningDate", field: "employeeDatevalue" },
    { title: "PhoneNumber", field: "phoneNumber" },
    { title: "WhatshapNumber", field: "whatshapNumber" },
    { title: "Emaile", field: "email" },
    { title: "Pan Number", field: "panNumber" },
    { title: "Adhar Number", field: "adharNumber" },
    { title: "City", field: "city" },
    { title: "PinCode", field: "pinCode" },
    { title: "Emp Address", field: "empAddress" },
    { title: "Bank Account No.", field: "accountNumber" },
  ];

  const [empId, setEmpId] = useState("");
  const [updateEmpId, setUpdateEmpId] = useState("");

  const [mongodbId, setMongodbId] = useState("");
  const [empRole, setEmpRole] = useState("");
  const [empName, setEmpName] = useState("");
  const [employeeDatevalue, setEmployeeDateValue] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [fName, setFName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatshapNumber, setWhatshapNumber] = useState("");
  const [email, setEmaile] = useState("");
  const [panNumber, setPanNumber] = useState("");
  const [adharNumber, setAdharNumber] = useState("");
  const [city, setCity] = useState("");
  const [empAddress, setEmpAddress] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [bankName, setBankName] = useState("");
  const [branchAddress, setBranchAddress] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [ifscCode, setIfscCode] = useState("");

  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [EmpDeleteName, setEmpDeleteName] = useState("");
  const checkChanged = (state) => {
    setChecked(!checked);
  };
  const [allVehiclechecked, setAllVehiclechecked] = useState(false);
  // debugger;
  const AllVehicleChanged = (state) => {
    setAllVehiclechecked(!allVehiclechecked);
    // setIsDisable(!allVehiclechecked);
  };

  const classes = useStyles();
  const [Employeesdata, setEmployeesdata] = useState([]);
  // //for Bank==========================================================================
  // const {
  //   accountHolderName,
  //   bankName,
  //   accountNumber,
  //   ifscCode,
  //   branchAddress,
  //   accountType,
  // } = useSelector((state) => state.bank);

  useEffect(() => {
    GetEmployee();
    setEmpId(getMaxEmpId());
  }, [open, updateOpen]);

  const GetEmployee = async () => {
    try {
      const response = await axios.get("employee/get-employee");
      debugger;

      setEmployeesdata(response.data.employees);
      console.log(Employeesdata);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaxEmpId = () => {
    if (!Employeesdata || Employeesdata.length === 0) {
      // Handle the case where data.customer is null or empty
      return 1;
    }
    const maxID = Employeesdata.reduce((max, Employeesdata) => {
      // Convert customerId to a number
      const empId = parseInt(Employeesdata.empId);
      // Check if customerId is greater than the current max
      if (empId > max) {
        return empId; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0
    return maxID + 1;
  };

  const handleSubmit = async (event) => {
    debugger;
    event.preventDefault();
    GetEmployee();
    var data = {
      empId: empId,
      empName: empName,
      fName: fName,
      pinCode: pinCode,
      employeeDatevalue: employeeDatevalue,
      empRole: empRole,
      phoneNumber: phoneNumber,
      whatshapNumber: whatshapNumber,
      email: email,
      panNumber: panNumber,
      adharNumber: adharNumber,
      city: city,
      empAddress: empAddress,
      accountHolderName: accountHolderName,
      bankName: bankName,
      accountNumber: accountNumber,
      ifscCode: ifscCode,
      branchAddress: branchAddress,
      accountType: accountType,
    };

    debugger;
    console.log(data);
    axios
      .post("employee/create-employee", data)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Record has been added successfully!");
          setOpen(false);
          resetemployee();
        } else {
          toast.error("Invalid  Information!");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Employee Information!");
      });


  };

  const handleUpdateSubmit = async (event) => {
    debugger;
    // const id = rowData._id
    event.preventDefault();
    const endpoint = `/employee/update-employee/${mongodbId}`;
    // const endpoint = `/unitmaster/update-unitmaster/${updateUnitmasterId}`;
    try {
      const response = await axios.put(endpoint, {
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
      });

      toast.success("Employee Updated successfully!");
    } catch (error) {
      console.error("An error occurred while updating the unit:", error);
      // Handle the error in your UI, maybe show a notification or error message
    }
    resetemployee();
    setUpdateOpen(false);
    setOpen(false);
    GetEmployee();
    // dispatch(getAllUnitMaster());
  };

  const onClickDelete = async (rowData) => {
    debugger;
    axios
      .delete(`/employee/delete-employee/${rowData._id}`)
      .then((res) => {
        debugger;
        console.log(res);

        toast.success("Record has been deleted successfully!");
        GetEmployee();
      })
      .catch((err) => {
        toast.error("Invalid  Information!");
        console.log(err);
      });
    debugger;
    // alert("Delete = " + rowData.CustId);
    return;
  };
  console.log("You click No!");

  const actions = [
    {
      icon: () => <EditIcon color="primary" />,
      tooltip: "Edit Employee",
      onClick: (event, rowData) => {
        setUpdateOpen(true);
        setMongodbId(rowData._id);
        setUpdateEmpId(rowData.empId);
        setEmpName(rowData.empName);
        setEmpRole(rowData.empRole);
        setPhoneNumber(rowData.phoneNumber);
        setWhatshapNumber(rowData.whatshapNumber);
        setPanNumber(rowData.panNumber);
        setEmaile(rowData.email);
        setAdharNumber(rowData.adharNumber);
        setCity(rowData.city);
        setEmpAddress(rowData.empAddress);
        setEmployeeDateValue(rowData.employeeDatevalue);
        setPinCode(rowData.pinCode);
        setFName(rowData.fName);
        setAccountHolderName(rowData.accountHolderName);
        setBankName(rowData.bankName);
        setBranchAddress(rowData.branchAddress);
        setAccountType(rowData.accountType);
        setAccountNumber(rowData.accountNumber);
        setIfscCode(rowData.ifscCode);

        // setRowId(rowData._id);
        // refresh();
        // UpdateVehicle(rowData.Id);
      },
    },

    {
      icon: () => <DeleIcon color="secondary" />,
      tooltip: "Delete Employee",
      onClick: (event, rowData) => {
        // onClickDelete(rowData);
        setShowDeleteConfirm(rowData);
        setEmpDeleteName(rowData.empName);
      },
    },
  ];

  const resetemployee = () => {
    // setEmpId("");
    setEmpRole("");
    setEmpName("");
    setPhoneNumber("");
    setWhatshapNumber("");
    setPanNumber("");
    setEmaile("");
    setAdharNumber("");
    setCity("");
    setEmpAddress("");
    setFName("");
    setEmployeeDateValue("");
    setPinCode("");
    setAccountHolderName("");
    setBankName("");
    setBranchAddress("");
    setAccountType("");
    setAccountNumber("");
    setIfscCode("");
  };

  const handleClose = () => {
    setOpen(false);
    resetemployee();
    setUpdateOpen(false);
  };

  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Fab
              color="primary"
              style={{
                borderRadius: "0.5rem",
                height: "3rem",
                width: "100%",
              }}
              variant="extended"
              aria-label="add"
              fullWidth
              onClick={() => setOpen(true)}
            >
              Create New Employee
            </Fab>
          </Grid>
          <Grid item xs={12} sm={12}>
            <MaterialTable
              title=""
              columns={columns}
              data={Employeesdata}
              // icons={tableIcons}
              actions={actions}
              options={{
                sorting: true,
                search: true,
                searchFieldAlignment: "right",
                searchAutoFocus: true,
                searchFieldVariant: "standard",
                filtering: true,
                paging: true,
                pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
                pageSize: 10,
                paginationType: "stepped",
                showFirstLastPageButtons: false,
                paginationPosition: "both",
                exportButton: true,
                exportAllData: true,
                exportFileName: "All Employee",
                addRowPosition: "first",
                // actionsColumnIndex: -1,
                // selection: true,
                // showSelectAllCheckbox: false,
                showTextRowsSelected: false,
                // selectionProps: (rowData) => ({
                //   disabled: rowData.age == null,
                //   // color:"primary"
                // }),
                grouping: true,
                columnsButton: true,
                rowStyle: (data, index) =>
                  index % 2 === 0 ? { background: "#f5f5f5" } : null,
                headerStyle: { background: "#F44336", color: "#fff" },
              }}
            />
          </Grid>
        </Grid>



        <Dialog
          // onBackdropClick={handleClose}
          fullWidth
          maxWidth="md"
          open={open}
          disableBackdropClick={true}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <Grid
            style={{
              paddingTop: "0.5rem",
              display: "flex",
              alignItems: "center",
            }}
            container
          >
            <Grid style={{ justifyItems: "flex-end" }} item xs={12} sm={11}>
              <DialogTitle id="max-width-dialog-title">
                Create New Employee
              </DialogTitle>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                color="secondary"
                onClick={handleClose}
                variant="contained"
              >
                &#10539;
              </Button>
            </Grid>
          </Grid>

          <DialogContent>
            <div>
              {/* <h3>Create New Supplier</h3> */}
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      type="text"
                      // disabled={isDisable}
                      // value={getMaxVehicleId()}
                      // disabled={isDisable}
                      disabled
                      // value={empId}
                      value={getMaxEmpId()}
                      autoComplete="empId"
                      name="empId"
                      variant="outlined"
                      fullWidth
                      id="empId"
                      label="Employee ID"
                      // onChange={(e) => setEmpId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="empName"
                      // disabled={isDisable}
                      value={empName}
                      autoComplete="empName"
                      name="empName"
                      variant="outlined"
                      fullWidth
                      required
                      id="empName"
                      label="Employee Name"
                      onChange={(e) => setEmpName(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={fName}
                      // required
                      type="fName"
                      autoComplete="fName"
                      name="fName"
                      variant="outlined"
                      fullWidth
                      id="fName"
                      label="Father/Husband Name"
                      onChange={(e) => setFName(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <DropdownComp
                      required
                      dropDownLable={"Employee Role"}
                      ddselectlabel={"Employee Role"}
                      dropDownValue={empRole}
                      menuItemArray={["Manager", "Supervisor", "Site Engineer"]}
                      setDropDownValue={setEmpRole}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Joining Date"
                        // disabled={isDateRangeEnableDisable}
                        value={employeeDatevalue}
                        onChange={(newValue) => {
                          setEmployeeDateValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField variant="outlined" fullWidth {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={phoneNumber}
                      // required
                      type="number"
                      autoComplete="phoneNumber"
                      name="phoneNumber"
                      variant="outlined"
                      fullWidth
                      id="phoneNumber"
                      label="Phone Number"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={whatshapNumber}
                      // required
                      type="number"
                      autoComplete="whatshapNumber"
                      name="whatshapNumber"
                      variant="outlined"
                      fullWidth
                      id="whatshapNumber"
                      label="Whatshap Number"
                      onChange={(e) => setWhatshapNumber(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  {/* <Grid item xs={12} sm={4}>
                        <DropdownComp
                          required
                          dropDownLable={"Vehicle Fuel Types"}
                          ddselectlabel={"Vehicle Fuel Types"}
                          dropDownValue={panNumber}
                          menuItemArray={["Petrol", "Diesel", "CNG"]}
                          setDropDownValue={setpanNumber}
                        />
                      </Grid> */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={email}
                      // required
                      type="email"
                      autoComplete="email"
                      name="email"
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Email"
                      onChange={(e) => setEmaile(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={panNumber}
                      // required
                      type="text"
                      autoComplete="panNumber"
                      name="panNumber"
                      variant="outlined"
                      fullWidth
                      id="panNumber"
                      label="PAN Number"
                      onChange={(e) => setPanNumber(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={adharNumber}
                      // required
                      type="number"
                      autoComplete="adharNumber"
                      name="adharNumber"
                      variant="outlined"
                      fullWidth
                      id="adharNumber"
                      label="Adhar Number"
                      onChange={(e) => setAdharNumber(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={city}
                      // required
                      type="text"
                      autoComplete="city"
                      name="city"
                      variant="outlined"
                      fullWidth
                      id="city"
                      label="City"
                      onChange={(e) => setCity(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={pinCode}
                      // required
                      type="number"
                      autoComplete="pinCode"
                      name="pinCode"
                      variant="outlined"
                      fullWidth
                      id="pinCode"
                      label="PIN Code"
                      onChange={(e) => setPinCode(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      value={empAddress}
                      // required
                      type="empAddress"
                      autoComplete="empAddress"
                      name="empAddress"
                      variant="outlined"
                      fullWidth
                      id="empAddress"
                      label="Employee Address"
                      onChange={(e) => setEmpAddress(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  {/* <BankDetails /> ======================================================================*/}

                  {/* <Typography variant="h5" fontWeight={700} my={5}>
                      Add Bank Details
                    </Typography> */}

                  <Grid
                    style={{ justifyItems: "flex-end" }}
                    item
                    xs={12}
                    sm={11}
                  >
                    {/* <DialogTitle id="max-width-dialog-title"> */}
                    Add Bank Details
                    {/* </DialogTitle> */}
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      type="text"
                      name="accountHolderName"
                      value={accountHolderName}
                      fullWidth
                      id="accountHolderName"
                      label="Account Holder Name"
                      onChange={(e) => setAccountHolderName(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <DropdownComp
                      required
                      dropDownLable={"Bank Name"}
                      ddselectlabel={"Bank Name"}
                      dropDownValue={bankName}
                      menuItemArray={[
                        "State Bank of India",
                        "HDFC Bank",
                        "ICICI Bank",
                        "Axis Bank",
                        "Punjab National Bank",
                        "CBI - Central Bank of India",
                        "BOB",
                        "BOI",
                      ]}
                      setDropDownValue={setBankName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={branchAddress}
                      id="Branch"
                      name="branchAddress"
                      label="Branch Aaddress"
                      onChange={(e) => setBranchAddress(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <DropdownComp
                      required
                      dropDownLable={"Account Type"}
                      ddselectlabel={"Account Type"}
                      dropDownValue={accountType}
                      menuItemArray={["Current Account", "Saving Account"]}
                      setDropDownValue={setAccountType}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      type="number"
                      value={accountNumber}
                      fullWidth
                      id="accountno"
                      name="accountNumber"
                      label="Account Number"
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={ifscCode}
                      id="ifsc"
                      name="ifscCode"
                      label="Ifsc Code"
                      onChange={(e) => setIfscCode(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <label>IsActive</label>

                    <Checkbox
                      {...label}
                      checked={checked}
                      onChange={checkChanged}
                      color="primary"
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    // className={classes.submit}
                    >
                      Save Employee Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      type="reset"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => resetemployee()}
                    >
                      Reset Form
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={handleClose}

                    // onClick={() => clear()}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </DialogContent>
        </Dialog>

      </div>
      <div>
        <Dialog
          // onBackdropClick={handleClose}
          fullWidth
          maxWidth="md"
          open={updateOpen}
          disableBackdropClick={true}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <Grid
            style={{
              paddingTop: "0.5rem",
              display: "flex",
              alignItems: "center",
            }}
            container
          >
            <Grid style={{ justifyItems: "flex-end" }} item xs={12} sm={11}>
              <DialogTitle id="max-width-dialog-title">
                Update Employee
              </DialogTitle>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                color="secondary"
                onClick={handleClose}
                variant="contained"
              >
                &#10539;
              </Button>
            </Grid>
          </Grid>

          <DialogContent>
            <div>
              {/* <h3>Create New Supplier</h3> */}
              <form className={classes.form} onSubmit={handleUpdateSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      type="text"
                      disabled
                      value={updateEmpId}
                      autoComplete="empId"
                      name="empId"
                      variant="outlined"
                      fullWidth
                      id="empId"
                      label="Employee ID"
                      // onChange={(e) => setEmpId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="empName"
                      // disabled={isDisable}
                      value={empName}
                      autoComplete="empName"
                      name="empName"
                      variant="outlined"
                      fullWidth
                      // required
                      id="empName"
                      label="Employee Name"
                      onChange={(e) => setEmpName(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={fName}
                      // required
                      type="fName"
                      autoComplete="fName"
                      name="fName"
                      variant="outlined"
                      fullWidth
                      id="fName"
                      label="Father/Husband Name"
                      onChange={(e) => setFName(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <DropdownComp
                      required
                      dropDownLable={"Employee Role"}
                      ddselectlabel={"Employee Role"}
                      dropDownValue={empRole}
                      menuItemArray={["Manager", "Supervisor", "Site Engineer"]}
                      setDropDownValue={setEmpRole}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Joining Date"
                        // disabled={isDateRangeEnableDisable}
                        value={employeeDatevalue}
                        onChange={(newValue) => {
                          setEmployeeDateValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField variant="outlined" fullWidth {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={pinCode}
                      // required
                      type="pinCode"
                      autoComplete="pinCode"
                      name="pinCode"
                      variant="outlined"
                      fullWidth
                      id="pinCode"
                      label="PIN Code"
                      onChange={(e) => setPinCode(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={phoneNumber}
                      // required
                      type="phoneNumber"
                      autoComplete="phoneNumber"
                      name="phoneNumber"
                      variant="outlined"
                      fullWidth
                      id="phoneNumber"
                      label="Vehicle Model"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={whatshapNumber}
                      // required
                      type="whatshapNumber"
                      autoComplete="whatshapNumber"
                      name="whatshapNumber"
                      variant="outlined"
                      fullWidth
                      id="whatshapNumber"
                      label="Whatshap Number"
                      onChange={(e) => setWhatshapNumber(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={email}
                      // required
                      type="email"
                      autoComplete="email"
                      name="email"
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Email"
                      onChange={(e) => setEmaile(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={panNumber}
                      // required
                      type="panNumber"
                      autoComplete="panNumber"
                      name="panNumber"
                      variant="outlined"
                      fullWidth
                      id="panNumber"
                      label="PAN Number"
                      onChange={(e) => setPanNumber(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={adharNumber}
                      // required
                      type="adharNumber"
                      autoComplete="adharNumber"
                      name="adharNumber"
                      variant="outlined"
                      fullWidth
                      id="adharNumber"
                      label="Adhar Number"
                      onChange={(e) => setAdharNumber(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={city}
                      // required
                      type="city"
                      autoComplete="city"
                      name="city"
                      variant="outlined"
                      fullWidth
                      id="city"
                      label="City"
                      onChange={(e) => setCity(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      value={empAddress}
                      // required
                      type="empAddress"
                      autoComplete="empAddress"
                      name="empAddress"
                      variant="outlined"
                      fullWidth
                      id="empAddress"
                      label="Employee Address"
                      onChange={(e) => setEmpAddress(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid
                    style={{ justifyItems: "flex-end" }}
                    item
                    xs={12}
                    sm={11}
                  >
                    {/* <DialogTitle id="max-width-dialog-title"> */}
                    <strong>Add Bank Details</strong>
                    {/* </DialogTitle> */}
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      type="text"
                      name="accountHolderName"
                      value={accountHolderName}
                      fullWidth
                      id="accountHolderName"
                      label="Account Holder Name"
                      onChange={(e) => setAccountHolderName(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <DropdownComp
                      required
                      dropDownLable={"Bank Name"}
                      ddselectlabel={"Bank Name"}
                      dropDownValue={bankName}
                      menuItemArray={[
                        "State Bank of India",
                        "HDFC Bank",
                        "ICICI Bank",
                        "Axis Bank",
                        "Punjab National Bank",
                        "CBI - Central Bank of India",
                        "BOB",
                        "BOI",
                      ]}
                      setDropDownValue={setBankName}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={branchAddress}
                      id="Branch"
                      name="branchAddress"
                      label="Branch Aaddress"
                      onChange={(e) => setBranchAddress(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <DropdownComp
                      required
                      dropDownLable={"Account Type"}
                      ddselectlabel={"Account Type"}
                      dropDownValue={accountType}
                      menuItemArray={["Current Account", "Saving Account"]}
                      setDropDownValue={setAccountType}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      type="text"
                      value={accountNumber}
                      fullWidth
                      id="accountno"
                      name="accountNumber"
                      label="Account Number"
                      onChange={(e) => setAccountNumber(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      value={ifscCode}
                      id="ifsc"
                      name="ifscCode"
                      label="Ifsc Code"
                      onChange={(e) => setIfscCode(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <label>IsActive</label>

                    <Checkbox
                      {...label}
                      defaultChecked
                      checked={checked}
                      onChange={checkChanged}
                      color="primary"
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    // className={classes.submit}
                    >
                      Update Employee Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => resetemployee()}
                    >
                      Reset Form
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={handleClose}

                    // onClick={() => clear()}
                    >
                      Cancel
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={showDeleteConfirm}
          disableBackdropClick={true}
          maxWidth="md" // You can set it to 'xs', 'sm', 'md', 'lg', or 'false'
          fullWidth={true}
          onClose={() => setShowDeleteConfirm(false)}
          aria-labelledby="alert-dialog-title "
          aria-describedby="alert-dialog-description "
        >
          <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id="alert-dialog-description"
              classes={{ root: classes.customDialogContent }}
            >
              Are you sure you want to delete this
              <span className={classes.deleteName}>
                {`' ${EmpDeleteName} '`}
              </span>{" "}
              record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}></Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  name="submit"
                  variant="contained"
                  onClick={() => setShowDeleteConfirm(false)}
                  color="primary"
                >
                  No
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  name="cancle"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    onClickDelete(showDeleteConfirm);
                    GetEmployee();
                    // dispatch(getAllUnitMaster());
                    setShowDeleteConfirm(false);
                  }}
                  autoFocus
                >
                  Yes
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}

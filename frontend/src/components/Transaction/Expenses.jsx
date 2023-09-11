import {
  Checkbox,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  Fab,
  Grid,
  TextField,
  TextareaAutosize,
  makeStyles,
  Button,
} from "@material-ui/core";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleIcon,
} from "@material-ui/icons";
import { DialogContent } from "@mui/material";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import DropdownComp from "../Helper Component/DropDownComp";

import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import axios from "axios";

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

const Expenses = () => {
  const columns = [
    { title: "expenseId", field: "expenseId" },
    { title: "expenseTypes", field: "expenseTypes" },
    { title: "Description", field: "description" },
    { title: "expenseDatevalue", field: "expenseDatevalue" },
    { title: "Amount", field: "amount" },

    // { title: "Date", field: "Date" },
    // { title: "EDate", field: "EDate" },
    // {
    //   title: "VehicleRegistrationExpiryDate",
    //   field: "VehicleRegistrationExpiryDate",
    // },

    // { title: "CreatedAt", field: "createdAt" },
    // { title: "CreatedBy", field: "createdBy" },
    // { title: "UpdatedAt", field: "updatedAt" },
    // { title: "UpdatedBy", field: "updatedBy" },
  ];

  const [expenseId, setExpenseId] = useState("");
  const [updateExpenseId, setUpdateExpenseId] = useState("");

  const [mongodbId, setMongodbId] = useState("");
  const [expenseTypes, setExpenseTypes] = useState("");
  const [description, setDescription] = useState("");
  const [expenseDatevalue, setExpenseDateValue] = useState("");
  const [amount, setAmount] = useState("");

  const [expense, setExpense] = useState();

  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [expenseDeleteName, setExpenseDeleteName] = useState("");
  const checkChanged = (state) => {
    setChecked(!checked);
  };
  const [allVehiclechecked, setAllVehiclechecked] = useState(false);
  // debugger;
  const AllexpenseChanged = (state) => {
    setAllVehiclechecked(!allVehiclechecked);
    // setIsDisable(!allVehiclechecked);
  };

  const classes = useStyles();
  const [expensesdata, setExpensesdata] = useState([]);

  useEffect(() => {
    GetExpense();
    setExpenseId(getMaxexpenseId());
  }, [open, updateOpen]);

  const GetExpense = async () => {
    try {
      const response = await axios.get("expenses/get-expense");
      debugger;

      setExpensesdata(response.data.expenses);
      console.log(expensesdata);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaxexpenseId = () => {
    if (!expensesdata || expensesdata.length === 0) {
      // Handle the case where data.customer is null or empty
      return 1;
    }
    const maxID = expensesdata.reduce((max, expensesdata) => {
      // Convert customerId to a number
      const expenseId = parseInt(expensesdata.expenseId);
      // Check if customerId is greater than the current max
      if (expenseId > max) {
        return expenseId; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0
    return maxID + 1;
  };

  const handleSubmit = async (event) => {
    debugger;
    event.preventDefault();
    GetExpense();
    var data = {
      expenseId: expenseId,
      expenseTypes: expenseTypes,
      description: description,
      expenseDatevalue: expenseDatevalue,
      amount: amount,
    };

    debugger;
    console.log(data);
    axios
      .post("expenses/create-expense", data)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Record has been added successfully!");
          setOpen(false);
          console.log(res);
        } else {
          toast.error("Invalid  Information!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid expense Information!");
      });

    resetExpense();
  };

  const handleUpdateSubmit = async (event) => {
    debugger;
    // const id = rowData._id
    event.preventDefault();
    const endpoint = `/expenses/update-expense/${mongodbId}`;
    // const endpoint = `/unitmaster/update-unitmaster/${updateUnitmasterId}`;
    try {
      const response = await axios.put(endpoint, {
        updateExpenseId,
        expenseTypes,
        description,
        expenseDatevalue,
        amount,
      });

      toast.success("expense Updated successfully!");
      setOpen(false);
    } catch (error) {
      console.error("An error occurred while updating the unit:", error);
      // Handle the error in your UI, maybe show a notification or error message
    }
    resetExpense();
    setUpdateOpen(false);

    GetExpense();
    // dispatch(getAllUnitMaster());
  };

  const onClickDelete = async (rowData) => {
    debugger;

    debugger;

    axios
      .delete(`/expenses/delete-expense/${rowData._id}`)

      .then((res) => {
        debugger;
        console.log(res);

        toast.success("Record has been deleted successfully!");
        GetExpense();
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

  // const handleDelete = (vehicleId) => {
  //   debugger;
  //   dispatch(deleteVehicle(vehicleId));
  //   if (delsuccess) {
  //     toast.success("vehicle Deleted successfully!");
  //   }

  //   window.location.reload();
  // };

  const actions = [
    {
      icon: () => <EditIcon color="primary" />,
      tooltip: "Edit Expense",
      onClick: (event, rowData) => {
        setUpdateOpen(true);
        setMongodbId(rowData._id);
        setUpdateExpenseId(rowData.expenseId);
        setExpenseTypes(rowData.expenseTypes);
        setDescription(rowData.description);
        setExpenseDateValue(rowData.expenseDatevalue);
        setAmount(rowData.amount);

        // refresh();
        // UpdateVehicle(rowData.Id);
      },
    },

    {
      icon: () => <DeleIcon color="secondary" />,
      tooltip: "Delete Expense",
      onClick: (event, rowData) => {
        // onClickDelete(rowData);
        setShowDeleteConfirm(rowData);
        setExpenseDeleteName(rowData.expenseTypes);
        // onClickDelete(rowData);
        // handleDelete(rowData.vehicleId);
        // dispatch(getAllVehicle());
        // console.log(rowData);
      },
    },
  ];

  const resetExpense = () => {
    setExpenseId("");
    setExpenseTypes("");
    setDescription("");
    setExpenseDateValue("");
    setAmount("");
  };

  const handleClose = () => {
    setOpen(false);
    resetExpense();
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
              Create expense
            </Fab>
          </Grid>
          <Grid item xs={12} sm={12}>
            <MaterialTable
              title=""
              columns={columns}
              data={expensesdata}
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
                pageSize: 5,
                paginationType: "stepped",
                showFirstLastPageButtons: false,
                paginationPosition: "both",
                exportButton: true,
                exportAllData: true,
                exportFileName: "vehicle",
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
                Create expense
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
              {/* <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              /> */}
              {/* <h3>Create New Supplier</h3> */}
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      type="text"
                      // disabled={isDisable}
                      // value={getMaxVehicleId()}
                      // disabled={isDisable}
                      value={expenseId}
                      autoComplete="expenseId"
                      name="expenseId"
                      variant="outlined"
                      fullWidth
                      id="expenseId"
                      label="expense ID"
                      // onChange={(e) => setVehicleId(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <DropdownComp
                      required
                      dropDownLable={"expense Types"}
                      ddselectlabel={"expense Types"}
                      dropDownValue={expenseTypes}
                      menuItemArray={[
                        "Fuel",
                        "Maintenance and Repairs",
                        "Vehicle Insurance",
                        "Personnel Costs (e.g., driver wages)",
                        "Administrative expense",
                        "Equipment Maintenance",
                        "Others",
                      ]}
                      setDropDownValue={setExpenseTypes}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      // disabled={isDisable}
                      value={description}
                      autoComplete="description"
                      name="description"
                      variant="outlined"
                      fullWidth
                      // required
                      id="description"
                      label="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="expense Date"
                        // disabled={isDateRangeEnableDisable}
                        value={expenseDatevalue}
                        onChange={(newValue) => {
                          setExpenseDateValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField variant="outlined" fullWidth {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={amount}
                      // required
                      type="amount"
                      autoComplete="amount"
                      name="amount"
                      variant="outlined"
                      fullWidth
                      id="amount"
                      label="Amount"
                      onChange={(e) => setAmount(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={4}>
                    <TextField
                      value={vehicleOwnerName}
                      // required
                      type="vehicleOwnerName"
                      autoComplete="vehicleOwnerName"
                      name="vehicleOwnerName"
                      variant="outlined"
                      fullWidth
                      id="vehicleOwnerName"
                      label="Vehicle Owner Name"
                      onChange={(e) => setVehicleOwnerName(e.target.value)}
                      autoFocus
                    />
                  </Grid> */}

                  {/* <Grid item xs={12} sm={4}>
                        <DropdownComp
                          required
                          dropDownLable={"Vehicle Fuel Types"}
                          ddselectlabel={"Vehicle Fuel Types"}
                          dropDownValue={vehicleFuelTypes}
                          menuItemArray={["Petrol", "Diesel", "CNG"]}
                          setDropDownValue={setVehicleFuelTypes}
                        />
                      </Grid> */}
                  {/* <Grid item xs={12} sm={4}>
                        <TextField
                          value={vehicleWeight}
                          // required
                          type="vehicleWeight"
                          autoComplete="vehicleWeight"
                          name="vehicleWeight"
                          variant="outlined"
                          fullWidth
                          id="vehicleWeight"
                          label="Vehicle Weight"
                          onChange={(e) => setVehicleWeighte(e.target.value)}
                          autoFocus
                        />
                      </Grid> */}

                  {/* <Grid item xs={12} sm={2}>
                    <label>IsPermitted</label>

                    <Checkbox
                      {...label}
                      checked={checked}
                      onChange={checkChanged}
                      color="primary"
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <label>IsLicensed</label>

                    <Checkbox
                      {...label}
                      checked={checked}
                      onChange={checkChanged}
                      color="primary"
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <label>IsActive</label>

                    <Checkbox
                      {...label}
                      checked={checked}
                      onChange={checkChanged}
                      color="primary"
                      size="medium"
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    // className={classes.submit}
                    >
                      Save expense Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => resetExpense()}
                    >
                      Reset Form
                    </Button>
                  </Grid>
                  {/* <Grid item xs={12} sm={2}>
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          // onClick={() => clear()}
                        >
                          Cancel
                        </Button>
                      </Grid> */}
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
                Update expense
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
              {/* <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              /> */}
              {/* <h3>Create New Supplier</h3> */}
              <form className={classes.form} onSubmit={handleUpdateSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      type="text"
                      // disabled={isDisable}
                      // value={getMaxVehicleId()}
                      // disabled={isDisable}
                      value={updateExpenseId}
                      autoComplete="expenseId"
                      name="expenseId"
                      variant="outlined"
                      fullWidth
                      id="expenseId"
                      label="expense ID"
                      // onChange={(e) => setVehicleId(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <DropdownComp
                      required
                      dropDownLable={"expense Types"}
                      ddselectlabel={"expense Types"}
                      dropDownValue={expenseTypes}
                      menuItemArray={[
                        "Fuel",
                        "Maintenance and Repairs",
                        "Vehicle Insurance",
                        "Personnel Costs (e.g., driver wages)",
                        "Administrative expense",
                        "Equipment Maintenance",
                        "Others",
                      ]}
                      setDropDownValue={setExpenseTypes}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="text"
                      // disabled={isDisable}
                      value={description}
                      autoComplete="description"
                      name="description"
                      variant="outlined"
                      fullWidth
                      // required
                      id="description"
                      label="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="expense Date"
                        // disabled={isDateRangeEnableDisable}
                        value={expenseDatevalue}
                        onChange={(newValue) => {
                          setExpenseDateValue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField variant="outlined" fullWidth {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={amount}
                      // required
                      type="amount"
                      autoComplete="amount"
                      name="amount"
                      variant="outlined"
                      fullWidth
                      id="amount"
                      label="Amount"
                      onChange={(e) => setAmount(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={4}>
                        <DropdownComp
                          required
                          dropDownLable={"Vehicle Fuel Types"}
                          ddselectlabel={"Vehicle Fuel Types"}
                          dropDownValue={vehicleFuelTypes}
                          menuItemArray={["Petrol", "Diesel", "CNG"]}
                          setDropDownValue={setVehicleFuelTypes}
                        />
                      </Grid> */}
                  {/* <Grid item xs={12} sm={4}>
                    <TextField
                      value={vehicleWeight}
                      // required
                      type="vehicleWeight"
                      autoComplete="vehicleWeight"
                      name="vehicleWeight"
                      variant="outlined"
                      fullWidth
                      id="vehicleWeight"
                      label="Vehicle Weight"
                      onChange={(e) => setVehicleWeighte(e.target.value)}
                      autoFocus
                    />
                  </Grid> */}

                  {/* <Grid item xs={12} sm={2}>
                    <label>IsPermitted</label>

                    <Checkbox
                      defaultChecked
                      {...label}
                      checked={checked}
                      onChange={checkChanged}
                      color="primary"
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <label>IsLicensed</label>

                    <Checkbox
                      defaultChecked
                      {...label}
                      checked={checked}
                      onChange={checkChanged}
                      color="primary"
                      size="medium"
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <label>IsActive</label>

                    <Checkbox
                      {...label}
                      defaultChecked
                      checked={checked}
                      onChange={checkChanged}
                      color="primary"
                      size="medium"
                    />
                  </Grid> */}
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    // className={classes.submit}
                    >
                      Update expense Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => resetExpense()}
                    >
                      Reset Form
                    </Button>
                  </Grid>
                  {/* <Grid item xs={12} sm={2}>
                        <Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          // onClick={() => clear()}
                        >
                          Cancel
                        </Button>
                      </Grid> */}
                </Grid>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <Dialog
          // classes={{ paper: classes.customDialog }}
          // className={classes.customDialog}
          open={showDeleteConfirm}
          disableBackdropClick={true}
          maxWidth="sm" // You can set it to 'xs', 'sm', 'md', 'lg', or 'false'
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
                {`' ${expenseDeleteName} '`}
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
                    GetExpense();
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
};

export default Expenses;

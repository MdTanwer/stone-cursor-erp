import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  Select,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";

import MaterialTable from "material-table";
import React, { forwardRef, useEffect, useState } from "react";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleIcon,
  Refresh,
} from "@material-ui/icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

// ============================================================
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
// =====================================================================

export default function FuelExpenses() {
  const columns = [
    { title: "Fuel Expenses Id", field: "fuelExpensesId" },
    { title: "Petrol Pump", field: "petrolPump" },
    { title: "Mobile", field: "mobile" },
    { title: "Vehicle", field: "vehicle" },
    { title: "Driver", field: "driver" },
    { title: "Type", field: "type" },
    { title: "Reading", field: "reading" },
    { title: "Rate", field: "rate" },
    { title: "Amount", field: "amount" },
    { title: "Paid", field: "paid" },
    { title: "Dues", field: "dues" },
    { title: "Active", field: "isActive" },
  ];
  const [fuelExpensesId, setFuelExpensesId] = useState();
  const [petrolPump, setPetrolPump] = useState();
  const [mobile, setMobile] = useState();
  const [vehicle, setVehicle] = useState();
  const [driver, setDriver] = useState();
  const [reading, setReading] = useState();
  const [type, setType] = useState();
  const [quantity, setQuantity] = useState();
  const [rate, setRate] = useState();
  const [amount, setAmount] = useState();
  const [paid, setPaid] = useState();
  const [dues, setDues] = useState();

  const [updateFuelExpensesId, setUpdateFuelExpensesId] = useState();
  const [mongoDbId, setMongoDbId] = useState();
  const [isDisable, setIsDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(false);
  const [fuelExpensesDeleteName, setFuelExpensesDeleteName] = useState("");

  const [data, setData] = useState([]);

  // =================================================
  const [checked, setChecked] = useState(true);
  const [isActive, setIsActive] = useState(true);
  const checkChanged = (state) => {
    setChecked(!checked);
    setIsActive(!isActive);
  };

  const [allmatechecked, setAllMatechecked] = useState(false);

  const AllMaterialChanged = (state) => {
    setAllMatechecked(!allmatechecked);
    setIsDisable(!allmatechecked);
  };
  const handlePetrolPumpChange = (e) => {
    setPetrolPump(e.target.value);
  };
  const handleVehicleChange = (e) => {
    setVehicle(e.target.value);
  };
  const handleDriverChange = (e) => {
    setDriver(e.target.value);
  };
  const handleTypeChange = (e) => {
    setType(e.target.value);
  };

  useEffect(() => {
    GetFuelExpenses();
    setFuelExpensesId(getfuelexpensesMaxId());
    debugger;
  }, [open, updateOpen, showDeleteConfirm]);

  const GetFuelExpenses = () => {
    debugger;
    axios
      .get("fuelExpense/get-fuelExpense")
      .then((res) => {
        debugger;
        console.log(res);
        setData(res.data.fuelExpenses);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // GetDestination();
  const getfuelexpensesMaxId = () => {
    if (!data || data.length === 0) {
      // Handle the case where data.customer is null or empty
      return 1;
    }
    const maxID = data.reduce((max, data) => {
      // Convert customerId to a number
      const fuelExpensesId = parseInt(data.fuelExpensesId);
      // Check if customerId is greater than the current max
      if (fuelExpensesId > max) {
        return fuelExpensesId; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0
    return maxID + 1;
  };

  const classes = useStyles();
  // const [data, setData] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      fuelExpensesId: fuelExpensesId,
      petrolPump: petrolPump,
      mobile: mobile,
      vehicle: vehicle,
      driver: driver,
      type: type,
      reading: reading,
      quantity: quantity,
      rate: rate,
      amount: amount,
      paid: paid,
      dues: dues,
      isActive: isActive,
    };

    console.log(data);
    axios
      .post("fuelExpense/create-fuelExpense", data)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Fuel Expenses Added Successfully");
          console.log(res);
        } else {
          alert("Invalid  Information!");
        }
      })
      .catch((err) => {
        console.log(err);

        alert("Invalid Fuel Expenses Information!");
      });
    handleClose();
  };

  const handleUpdateSubmit = async (event) => {
    debugger;
    // const id = rowData._id
    event.preventDefault();
    const endpoint = `/fuelExpense/update-fuelExpense/${mongoDbId}`;
    // const endpoint = `/unitmaster/update-unitmaster/${updateUnitmasterId}`;
    try {
      const response = await axios.put(endpoint, {
        updateFuelExpensesId,
        petrolPump,
        mobile,
        vehicle,
        driver,
        reading,
        type,
        quantity,
        rate,
        amount,
        paid,
        dues,
        isActive,
      });

      toast.success("Fuel Expenses Updated successfully!");
    } catch (error) {
      console.error("An error occurred while updating the unit:", error);
      // Handle the error in your UI, maybe show a notification or error message
    }
    handleReset();
    setUpdateOpen(false);
    setOpen(false);
    GetFuelExpenses();
  };
  const handleReset = () => {
    debugger;

    setFuelExpensesId("");
    setPetrolPump("");
    setMobile("");
    setVehicle("");
    setDriver("");
    setReading("");
    setType("");
    setQuantity("");
    setRate("");
    setAmount("");
    setPaid("");
    setDues("");
  };

  // ==================================================
  const onClickDelete = async (rowData) => {
    debugger;
    debugger;
    axios
      .delete(`/fuelExpense/delete-fuelExpense/${rowData._id}`)
      .then((res) => {
        debugger;
        console.log(res);
        toast.success("Fuel Expense Deleted Successfully");
      })
      .catch((err) => {
        alert("Invalid  Information!");
        console.log(err);
      });
    debugger;
    // alert("Delete = " + rowData.CustId);
    return;
  };
  console.log("You click No!");

  const actions = [
    {
      icon: () => <Refresh />,
      tooltip: "Refresh Data",
      isFreeAction: true,
      onClick: (event, rowData) => {
        GetFuelExpenses();
      },
    },
    {
      icon: () => <EditIcon color="primary" />,
      tooltip: "Edit Fuel Expenses",
      onClick: (event, rowData) => {
        setUpdateOpen(true);
        setMongoDbId(rowData._id);
        setUpdateFuelExpensesId(rowData.fuelExpensesId);
        setPetrolPump(rowData.petrolPump);
        setMobile(rowData.mobile);
        setVehicle(rowData.vehicle);
        setDriver(rowData.driver);
        setReading(rowData.reading);
        setType(rowData.type);
        setQuantity(rowData.quantity);
        setRate(rowData.rate);
        setAmount(rowData.amount);
        setPaid(rowData.paid);
        setDues(rowData.dues);
        setIsActive(rowData.isActive);
      },
    },
    {
      icon: () => <DeleIcon color="secondary" />,
      tooltip: "Delete Fuel Expenses",
      onClick: (event, rowData) => {
        setShowDeleteConfirm(true);
        setSelectedRowId(rowData);
        setFuelExpensesDeleteName(rowData.petrolPump);
        // onClickDelete(rowData);
        // GetDestination();
      },
    },
  ];
  const refresh = () => {};
  const clear = () => {
    setFuelExpensesId("");
    setPetrolPump("");
    setMobile("");
    setVehicle("");
    setDriver("");
    setReading("");
    setQuantity("");
    setRate("");
    setAmount("");
    setPaid("");
    setDues("");
  };
  // ========================================================
  const handleClose = () => {
    setOpen(false);
    handleReset();
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
              Create Fuel Expenses
            </Fab>
          </Grid>
          <Grid item xs={12} sm={12}>
            <MaterialTable
              title=""
              columns={columns}
              data={data}
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
                exportFileName: "Fuel Expenses Details",
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
                headerStyle: { background: "#f44336", color: "#fff" },
              }}
            />
          </Grid>
        </Grid>
        <Dialog
          fullWidth
          maxWidth="md"
          open={open}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
            <Grid
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              container
            >
              <Grid item xs={12} sm={11}>
                {/* style={{ justifyContent: 'center' }} */}
                <Grid container>
                  <Typography
                    style={{ display: "inline-block" }}
                    variant="h5"
                    fontWeight={700}
                  >
                    Create Fuel Expenses
                  </Typography>
                </Grid>
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
          </DialogTitle>
          <DialogContent>
            <div>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <form
                className={classes.form}
                onSubmit={handleSubmit}
                onReset={handleReset}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      disabled
                      value={fuelExpensesId}
                      autoComplete="fuelExpensesId"
                      name="fuelExpensesId"
                      variant="outlined"
                      fullWidth
                      id="fuelExpensesId"
                      label="fuel Expenses Id"
                      onChange={(e) => setFuelExpensesId(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          variant="outlined"
                        >
                          Petrol Pump
                        </InputLabel>
                        <Select
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={petrolPump}
                          label="Petrol Pump"
                          onChange={handlePetrolPumpChange}
                        >
                          <MenuItem value="Indian Oil">Indian Oil</MenuItem>
                          <MenuItem value="Bharat Petroleum">
                            Bharat Petroleum
                          </MenuItem>
                          <MenuItem value="Reliance">Reliance</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={isDisable}
                      value={mobile}
                      autoComplete="mobile"
                      name="mobile"
                      variant="outlined"
                      fullWidth
                      required
                      id="mobile"
                      label="Mobile"
                      onChange={(e) => setMobile(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          variant="outlined"
                        >
                          Vehicle
                        </InputLabel>
                        <Select
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={vehicle}
                          label="Vehicle"
                          onChange={handleVehicleChange}
                        >
                          <MenuItem value="BR11GH4567">BR11GH4567</MenuItem>
                          <MenuItem value="BR11GH6412">BR11GH6412</MenuItem>
                          <MenuItem value="BR11GH1234">BR11GH1234</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          variant="outlined"
                        >
                          Driver
                        </InputLabel>
                        <Select
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={driver}
                          label="Driver"
                          onChange={handleDriverChange}
                        >
                          <MenuItem value="Ashif">Ashif</MenuItem>
                          <MenuItem value="Azmal">Azmal</MenuItem>
                          <MenuItem value="Afroz">Afroz</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          variant="outlined"
                        >
                          Type
                        </InputLabel>
                        <Select
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={type}
                          label="Type"
                          onChange={handleTypeChange}
                        >
                          <MenuItem value="Petrol">Petrol</MenuItem>
                          <MenuItem value="Diseal">Diseal</MenuItem>
                          <MenuItem value="CNG">CNG</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={isDisable}
                      value={reading}
                      autoComplete="reading"
                      name="reading"
                      variant="outlined"
                      fullWidth
                      required
                      id="reading"
                      label="Reading"
                      onChange={(e) => setReading(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={isDisable}
                      value={quantity}
                      autoComplete="quantity"
                      name="quantity"
                      variant="outlined"
                      fullWidth
                      id="quantity"
                      label="Quantity(in ltr/Kg) "
                      onChange={(e) => setQuantity(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={isDisable}
                      value={rate}
                      autoComplete="rate"
                      name="rate"
                      variant="outlined"
                      fullWidth
                      id="rate"
                      label="Rate"
                      onChange={(e) => setRate(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={isDisable}
                      value={amount}
                      autoComplete="amount"
                      name="amount"
                      variant="outlined"
                      fullWidth
                      id="amount"
                      label=" Total Amount"
                      onChange={(e) => setAmount(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={isDisable}
                      value={paid}
                      autoComplete="paid"
                      name="paid"
                      variant="outlined"
                      fullWidth
                      id="paid"
                      label="Paid"
                      onChange={(e) => setPaid(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      disabled={isDisable}
                      value={dues}
                      autoComplete="dues"
                      name="dues"
                      variant="outlined"
                      fullWidth
                      id="dues"
                      label="Dues"
                      onChange={(e) => setDues(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={1}>
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
                      Save Fuel Expenses
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      name="resetForm"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => handleReset()}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={() => clear()}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid xs={12} sm={2}></Grid>
                </Grid>

                {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
            </Button> */}
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        {" "}
        <Dialog
          fullWidth
          maxWidth="md"
          open={updateOpen}
          onClose={handleClose}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
            <Grid
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              container
            >
              <Grid item xs={12} sm={11}>
                {/* style={{ justifyContent: 'center' }} */}
                <Grid container>
                  <Typography
                    style={{ display: "inline-block" }}
                    variant="h5"
                    fontWeight={700}
                  >
                    Update Fuel Expenses
                  </Typography>
                </Grid>
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
          </DialogTitle>
          <DialogContent>
            <div>
              <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              <form
                className={classes.form}
                onSubmit={handleUpdateSubmit}
                onReset={handleReset}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      disabled
                      value={fuelExpensesId}
                      autoComplete="fuelExpensesId"
                      name="fuelExpensesId"
                      variant="outlined"
                      fullWidth
                      id="fuelExpensesId"
                      label="fuel Expenses Id"
                      onChange={(e) => setFuelExpensesId(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          variant="outlined"
                        >
                          Petrol Pump
                        </InputLabel>
                        <Select
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={petrolPump}
                          label="Petrol Pump"
                          onChange={handlePetrolPumpChange}
                        >
                          <MenuItem value="Indian Oil">Indian Oil</MenuItem>
                          <MenuItem value="Bharat Petroleum">
                            Bharat Petroleum
                          </MenuItem>
                          <MenuItem value="Reliance">Reliance</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={isDisable}
                      value={mobile}
                      autoComplete="mobile"
                      name="mobile"
                      variant="outlined"
                      fullWidth
                      required
                      id="mobile"
                      label="Mobile"
                      onChange={(e) => setMobile(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          variant="outlined"
                        >
                          Vehicle
                        </InputLabel>
                        <Select
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={vehicle}
                          label="Vehicle"
                          onChange={handleVehicleChange}
                        >
                          <MenuItem value="BR11GH4567">BR11GH4567</MenuItem>
                          <MenuItem value="BR11GH6412">BR11GH6412</MenuItem>
                          <MenuItem value="BR11GH1234">BR11GH1234</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          variant="outlined"
                        >
                          Driver
                        </InputLabel>
                        <Select
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={driver}
                          label="Driver"
                          onChange={handleDriverChange}
                        >
                          <MenuItem value="Ashif">Ashif</MenuItem>
                          <MenuItem value="Azmal">Azmal</MenuItem>
                          <MenuItem value="Afroz">Afroz</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          variant="outlined"
                        >
                          Type
                        </InputLabel>
                        <Select
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={type}
                          label="Type"
                          onChange={handleTypeChange}
                        >
                          <MenuItem value="Petrol">Petrol</MenuItem>
                          <MenuItem value="Diseal">Diseal</MenuItem>
                          <MenuItem value="CNG">CNG</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={isDisable}
                      value={reading}
                      autoComplete="reading"
                      name="reading"
                      variant="outlined"
                      fullWidth
                      required
                      id="reading"
                      label="Reading"
                      onChange={(e) => setReading(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={isDisable}
                      value={quantity}
                      autoComplete="quantity"
                      name="quantity"
                      variant="outlined"
                      fullWidth
                      id="quantity"
                      label="Quantity(in ltr/Kg) "
                      onChange={(e) => setQuantity(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={isDisable}
                      value={rate}
                      autoComplete="rate"
                      name="rate"
                      variant="outlined"
                      fullWidth
                      id="rate"
                      label="Rate"
                      onChange={(e) => setRate(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={isDisable}
                      value={amount}
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
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={isDisable}
                      value={amount}
                      autoComplete="paid"
                      name="paid"
                      variant="outlined"
                      fullWidth
                      id="paid"
                      label="paid"
                      onChange={(e) => setPaid(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      disabled={isDisable}
                      value={dues}
                      autoComplete="dues"
                      name="dues"
                      variant="outlined"
                      fullWidth
                      id="dues"
                      label="dues"
                      onChange={(e) => setDues(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={1}>
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
                      Update Fuel Expenses
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      name="resetForm"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => handleReset()}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={() => clear()}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid xs={12} sm={2}></Grid>
                </Grid>

                {/* <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Create
            </Button> */}
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* for delete */}
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
              <span
                className={classes.deleteName}
              >{`' ${fuelExpensesDeleteName} '`}</span>
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
                    onClickDelete(selectedRowId);

                    // handleDelete(selectedRowId);
                    // dispatch(getAllUnitMaster());
                    GetFuelExpenses();
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

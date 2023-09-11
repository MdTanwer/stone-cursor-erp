import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
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

export default function PetrolPump() {
  const columns = [
    { title: "Petrol Pump Id", field: "petrolPumpId" },
    { title: "Petrol Pump Name", field: "petrolPumpName" },
    { title: "Petrol Pump Owner Name", field: "petrolPumpOwnerName" },
    { title: "Mobile", field: "mobile" },
    { title: "City", field: "city" },
    { title: "Address", field: "address" },

    { title: "Active", field: "isActive" },
  ];
  const [petrolPumpId, setPetrolPumpId] = useState();
  const [petrolPumpName, setPetrolPumpName] = useState();
  const [petrolPumpOwnerName, setPetrolPumpOwnerName] = useState();
  const [mobile, setMobile] = useState();

  const [city, setCity] = useState();
  const [address, setAddress] = useState();

  const [updatePetrolPumpId, setUpdatePetrolPumpId] = useState();

  const [mongoDbId, setMongoDbId] = useState();

  const [isDisable, setIsDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(false);
  const [petrolPumpDeleteName, setPetrolPumpDeleteName] = useState("");

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
  const [data, setData] = useState([]);
  useEffect(() => {
    GetPetrolPump();
    setPetrolPumpId(getpetrolpumpMaxId());
    debugger;
  }, [open, updateOpen, showDeleteConfirm]);

  const GetPetrolPump = () => {
    debugger;
    axios
      .get("petrolPump/get-petrolPump")
      .then((res) => {
        debugger;
        console.log(res);
        setData(res.data.petrolPumps);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // GetDestination();
  const getpetrolpumpMaxId = () => {
    if (!data || data.length === 0) {
      // Handle the case where data.customer is null or empty
      return 1;
    }
    const maxID = data.reduce((max, data) => {
      // Convert customerId to a number
      const petrolPumpId = parseInt(data.petrolPumpId);
      // Check if customerId is greater than the current max
      if (petrolPumpId > max) {
        return petrolPumpId; // Update max if customerId is greater
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
      petrolPumpId: petrolPumpId,
      petrolPumpName: petrolPumpName,
      petrolPumpOwnerName: petrolPumpOwnerName,
      mobile: mobile,
      city: city,
      address: address,
      isActive: isActive,
    };

    console.log(data);
    axios
      .post("petrolPump/create-petrolPump", data)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Petrol Pump Added Successfully");
          console.log(res);
        } else {
          alert("Invalid  Information!");
        }
      })
      .catch((err) => {
        console.log(err);

        alert("Invalid Petrol Pump Information!");
      });
    handleClose();
  };

  const handleUpdateSubmit = async (event) => {
    debugger;
    // const id = rowData._id
    event.preventDefault();
    const endpoint = `/petrolPump/update-petrolPump/${mongoDbId}`;
    // const endpoint = `/unitmaster/update-unitmaster/${updateUnitmasterId}`;
    try {
      const response = await axios.put(endpoint, {
        updatePetrolPumpId,
        petrolPumpName,
        petrolPumpOwnerName,
        mobile,
        city,
        address,
        isActive,
      });

      toast.success("Petrol Pump Updated successfully!");
    } catch (error) {
      console.error("An error occurred while updating the unit:", error);
      // Handle the error in your UI, maybe show a notification or error message
    }
    handleReset();
    setUpdateOpen(false);
    setOpen(false);
    GetPetrolPump();
  };
  const handleReset = () => {
    debugger;

    setPetrolPumpName("");
    setPetrolPumpOwnerName("");
    setMobile("");
    setCity("");
    setAddress("");
  };

  // ==================================================
  const onClickDelete = async (rowData) => {
    debugger;
    debugger;
    axios
      .delete(`/petrolPump/delete-petrolPump/${rowData._id}`)
      .then((res) => {
        debugger;
        console.log(res);
        toast.success("Petrol Pump Deleted Successfully");
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
        GetPetrolPump();
      },
    },
    {
      icon: () => <EditIcon color="primary" />,
      tooltip: "Edit PetrolPump",
      onClick: (event, rowData) => {
        setUpdateOpen(true);
        setMongoDbId(rowData._id);
        setUpdatePetrolPumpId(rowData.petrolPumpId);
        setPetrolPumpName(rowData.petrolPumpName);
        setPetrolPumpOwnerName(rowData.petrolPumpOwnerName);
        setMobile(rowData.mobile);
        setCity(rowData.city);
        setAddress(rowData.address);
        setIsActive(rowData.isActive);
      },
    },
    {
      icon: () => <DeleIcon color="secondary" />,
      tooltip: "Delete PetrolPump",
      onClick: (event, rowData) => {
        setShowDeleteConfirm(true);
        setSelectedRowId(rowData);
        setPetrolPumpDeleteName(rowData.petrolPumpName);
        // onClickDelete(rowData);
        // GetDestination();
      },
    },
  ];
  const refresh = () => { };
  const clear = () => {
    setPetrolPumpName("");
    setPetrolPumpOwnerName("");
    setMobile("");
    setCity("");
    setAddress("");
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
              Create Petrol Pump
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
                exportFileName: "All PetrolPums",
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
                    Create Petrol Pump
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
              <form
                className={classes.form}
                onSubmit={handleSubmit}
                onReset={handleReset}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      disabled
                      value={petrolPumpId}
                      autoComplete="petrolPumpId"
                      name="petrolPumpId"
                      variant="outlined"
                      fullWidth
                      id="petrolPumpId"
                      label="Petrol Pump Id"
                      onChange={(e) => setPetrolPumpId(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <TextField
                      disabled={isDisable}
                      value={petrolPumpName}
                      autoComplete="petrolPumpName"
                      name="petrolPumpName"
                      variant="outlined"
                      fullWidth
                      required
                      id="petrolPumpName"
                      label="Petrol Pump Name"
                      onChange={(e) => setPetrolPumpName(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      disabled={isDisable}
                      value={petrolPumpOwnerName}
                      autoComplete="petrolPumpOwnerName"
                      name="petrolPumpOwnerName"
                      variant="outlined"
                      fullWidth

                      id="petrolPumpOwnerName"
                      label="Petrol Pump Owner Name"
                      onChange={(e) => setPetrolPumpOwnerName(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      // disabled={isDisable}
                      value={mobile}
                      autoComplete="mobile"
                      name="mobile"
                      variant="outlined"
                      fullWidth
                      type="number"
                      id="mobile"
                      label="Mobile"
                      onChange={(e) => setMobile(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={isDisable}
                      value={city}
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
                      disabled={isDisable}
                      value={address}
                      autoComplete="address"
                      name="address"
                      variant="outlined"
                      fullWidth
                      id="address"
                      label="Address "
                      onChange={(e) => setAddress(e.target.value)}
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
                      Save Petrol Pump
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
                    Update Petrol Pump
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
                      value={updatePetrolPumpId}
                      autoComplete="petrolPumpId"
                      name="petrolPumpId"
                      variant="outlined"
                      fullWidth
                      id="petrolPumpId"
                      label="Petrol Pump Id"
                      onChange={(e) => setPetrolPumpId(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <TextField
                      disabled={isDisable}
                      value={petrolPumpName}
                      autoComplete="petrolPumpName"
                      name="petrolPumpName"
                      variant="outlined"
                      fullWidth

                      id="petrolPumpName"
                      label="Petrol Pump Name"
                      onChange={(e) => setPetrolPumpName(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      disabled={isDisable}
                      value={petrolPumpOwnerName}
                      autoComplete="petrolPumpOwnerName"
                      name="petrolPumpOwnerName"
                      variant="outlined"
                      fullWidth

                      id="petrolPumpOwnerName"
                      label="Petrol Pump Owner Name"
                      onChange={(e) => setPetrolPumpOwnerName(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled={isDisable}
                      value={mobile}
                      autoComplete="mobile"
                      name="mobile"
                      variant="outlined"
                      fullWidth
                      required
                      type="number"
                      id="mobile"
                      label="Mobile"
                      onChange={(e) => setMobile(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      disabled={isDisable}
                      value={city}

                      autoComplete="city"
                      name="city"
                      variant="outlined"
                      fullWidth
                      required
                      id="city"
                      label="City"
                      onChange={(e) => setCity(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled={isDisable}
                      value={address}
                      autoComplete="address"
                      name="address"
                      variant="outlined"
                      fullWidth
                      id="address"
                      label="Address "
                      onChange={(e) => setAddress(e.target.value)}
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

                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    // className={classes.submit}
                    >
                      Update Petrol Pump
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      color="primary"
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
              >{`' ${petrolPumpDeleteName} '`}</span>
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
                    GetPetrolPump();
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

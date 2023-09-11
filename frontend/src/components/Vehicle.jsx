import React, { useState, Component, useEffect, forwardRef } from "react";

import { Link } from "react-router-dom";

import MaterialTable, { Column } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import axios from "axios";
// import jsPDF from "jspdf";
import "jspdf-autotable";

import Checkbox from "@mui/material/Checkbox";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleIcon,
} from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirm } from "react-confirm-box";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {

  DialogActions,
  DialogContent,
  DialogTitle,

  Tooltip,
} from "@mui/material";
import { pink } from "@mui/material/colors";
import DropdownComp from "./Helper Component/DropDownComp";
import { DialogContentText, Dialog, Fab, } from "@material-ui/core";

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

export default function Vehicle(props) {
  const columns = [
    { title: "VehicleId", field: "vehicleId" },
    { title: "LicensePlateNumber", field: "licensePlateNumber" },
    { title: "VehicleModel", field: "vehicleModel" },
    { title: "VehicleWeighte", field: "vehicleWeight" },
    { title: "VehicleOwnerName", field: "vehicleOwnerName" },
    { title: "VehicleTypes", field: "vehicleTypes" },
    { title: "VehicleFuelTypes", field: "vehicleFuelTypes" },

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

  const [vehicleId, setVehicleId] = useState("");
  const [updateVehicleId, setUpdateVehicleId] = useState("");

  const [mongodbId, setMongodbId] = useState("");
  const [vehicleTypes, setVehicleTypes] = useState("");
  const [licensePlateNumber, setLicensePlateNumber] = useState("");
  const [vehicleModel, setVehicleModel] = useState("");
  const [vehicleOwnerName, setVehicleOwnerName] = useState("");
  const [vehicleFuelTypes, setVehicleFuelTypes] = useState("");
  const [vehicleWeight, setVehicleWeighte] = useState("");

  const [vehicle, setVehicle] = useState();

  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [checked, setChecked] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [VehicleDeleteName, setVehicleDeleteName] = useState("");
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
  const [vehiclesdata, setVehiclesdata] = useState([]);

  useEffect(() => {
    GetVehicle();
    setVehicleId(getMaxVehicleId());
  }, [open, updateOpen]);

  const GetVehicle = async () => {
    try {
      const response = await axios.get("vehicle/get-vehicle");
      debugger;

      setVehiclesdata(response.data.vehicles);
      console.log(vehiclesdata);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaxVehicleId = () => {
    if (!vehiclesdata || vehiclesdata.length === 0) {
      // Handle the case where data.customer is null or empty
      return 1;
    }
    const maxID = vehiclesdata.reduce((max, vehiclesdata) => {
      // Convert customerId to a number
      const vehicleId = parseInt(vehiclesdata.vehicleId);
      // Check if customerId is greater than the current max
      if (vehicleId > max) {
        return vehicleId; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0
    return maxID + 1;
  };

  // const successMessageBox = (successMsg) => {
  //   toast.success(successMsg, {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };
  // const errorMessageBox = (errorMsg) => {
  //   toast.error(errorMsg, {
  //     position: "top-center",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  const handleSubmit = async (event) => {
    debugger;
    event.preventDefault();
    GetVehicle();
    var data = {
      vehicleId: vehicleId,
      licensePlateNumber: licensePlateNumber,
      vehicleModel: vehicleModel,
      vehicleOwnerName: vehicleOwnerName,
      vehicleWeight: vehicleWeight,
      vehicleTypes: vehicleTypes,
      vehicleFuelTypes: vehicleFuelTypes,
    };

    debugger;
    console.log(data);
    axios
      .post("vehicle/create-vehicle", data)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Record has been added successfully!");

          console.log(res);
          setOpen(false);
        } else {
          toast.error("Invalid  Information!");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("Invalid Vehicle Information!");
      });

    resetvehicle();

  };

  const handleUpdateSubmit = async (event) => {
    debugger;
    // const id = rowData._id
    event.preventDefault();
    const endpoint = `/vehicle/update-vehicle/${mongodbId}`;
    // const endpoint = `/unitmaster/update-unitmaster/${updateUnitmasterId}`;
    try {
      const response = await axios.put(endpoint, {
        // updateUnitmasterId,
        // unitName,
        // unitShortName,
        // description,

        updateVehicleId,
        licensePlateNumber,
        vehicleModel,
        vehicleOwnerName,
        vehicleWeight,
        vehicleTypes,
        vehicleFuelTypes,
      });

      toast.success("Vehicle Updated successfully!");
    } catch (error) {
      console.error("An error occurred while updating the unit:", error);
      // Handle the error in your UI, maybe show a notification or error message
    }
    resetvehicle();
    setUpdateOpen(false);
    setOpen(false);
    GetVehicle();
    // dispatch(getAllUnitMaster());
  };

  const onClickDelete = async (rowData) => {
    debugger;

    debugger;

    axios
      .delete(`/vehicle/delete-vehicle/${rowData._id}`)
      .then((res) => {
        debugger;
        console.log(res);

        alert("Record has been deleted successfully!");
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

  GetVehicle();

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
      tooltip: "Edit Vehicle",
      onClick: (event, rowData) => {
        setUpdateOpen(true);
        setMongodbId(rowData._id);
        setUpdateVehicleId(rowData.vehicleId);
        setLicensePlateNumber(rowData.licensePlateNumber);
        setVehicleTypes(rowData.vehicleTypes);
        setVehicleModel(rowData.vehicleModel);
        setVehicleOwnerName(rowData.vehicleOwnerName);
        setVehicleFuelTypes(rowData.vehicleFuelTypes);
        setVehicleWeighte(rowData.vehicleWeight);
        // refresh();
        // UpdateVehicle(rowData.Id);
      },
    },

    {
      icon: () => <DeleIcon color="secondary" />,
      tooltip: "Delete Vehicle",
      onClick: (event, rowData) => {
        // onClickDelete(rowData);
        setShowDeleteConfirm(rowData);
        setVehicleDeleteName(rowData.vehicleOwnerName);
        // onClickDelete(rowData);
        // handleDelete(rowData.vehicleId);
        // dispatch(getAllVehicle());
        // console.log(rowData);
      },
    },
  ];

  const resetvehicle = () => {
    setVehicleId("");
    setVehicleTypes("");
    setLicensePlateNumber("");
    setVehicleModel("");
    setVehicleOwnerName("");
    setVehicleFuelTypes("");
    setVehicleWeighte("");
  };

  const handleClose = () => {
    setOpen(false);
    resetvehicle();
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
              Create Vehicle
            </Fab>
          </Grid>
          <Grid item xs={12} sm={12}>
            <MaterialTable
              title=""
              columns={columns}
              data={vehiclesdata}
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
                Create Vehicle
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
                      disabled
                      value={vehicleId}
                      autoComplete="vehicleId"
                      name="vehicleId"
                      variant="outlined"
                      fullWidth
                      id="vehicleId"
                      label="Vehicle ID"
                      // onChange={(e) => setVehicleId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="licensePlateNumber"
                      // disabled={isDisable}
                      value={licensePlateNumber}
                      autoComplete="licensePlateNumber"
                      name="licensePlateNumber"
                      variant="outlined"
                      fullWidth
                      // required
                      id="licensePlateNumber"
                      label="License Plate Number"
                      onChange={(e) => setLicensePlateNumber(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={vehicleModel}
                      // required
                      type="vehicleModel"
                      autoComplete="vehicleModel"
                      name="vehicleModel"
                      variant="outlined"
                      fullWidth
                      id="vehicleModel"
                      label="Vehicle Model"
                      onChange={(e) => setVehicleModel(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
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
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <DropdownComp
                      required
                      dropDownLable={"Vehicle Types"}
                      ddselectlabel={"Vehicle Types"}
                      dropDownValue={vehicleTypes}
                      menuItemArray={[
                        "Truck",
                        "Tracter",
                        "JCB",
                        "Labour",
                        "PickUp",
                      ]}
                      setDropDownValue={setVehicleTypes}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <DropdownComp
                      required
                      dropDownLable={"Vehicle Fuel Types"}
                      ddselectlabel={"Vehicle Fuel Types"}
                      dropDownValue={vehicleFuelTypes}
                      menuItemArray={["Petrol", "Diesel", "CNG"]}
                      setDropDownValue={setVehicleFuelTypes}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
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
                  </Grid>

                  <Grid item xs={12} sm={2}>
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    // className={classes.submit}
                    >
                      Save Vehicle Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => resetvehicle()}
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
                Update Vehicle
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
                      disabled
                      // disabled={isDisable}
                      // value={getMaxVehicleId()}
                      // disabled={isDisable}
                      value={updateVehicleId}
                      autoComplete="vehicleId"
                      name="vehicleId"
                      variant="outlined"
                      fullWidth
                      id="vehicleId"
                      label="Vehicle ID"
                      // onChange={(e) => setVehicleId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="licensePlateNumber"
                      // disabled={isDisable}
                      value={licensePlateNumber}
                      autoComplete="licensePlateNumber"
                      name="licensePlateNumber"
                      variant="outlined"
                      fullWidth
                      // required
                      id="licensePlateNumber"
                      label="License Plate Number"
                      onChange={(e) => setLicensePlateNumber(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={vehicleModel}
                      // required
                      type="vehicleModel"
                      autoComplete="vehicleModel"
                      name="vehicleModel"
                      variant="outlined"
                      fullWidth
                      id="vehicleModel"
                      label="Vehicle Model"
                      onChange={(e) => setVehicleModel(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
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
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <DropdownComp
                      required
                      dropDownLable={"Vehicle Types"}
                      ddselectlabel={"Vehicle Types"}
                      dropDownValue={vehicleTypes}
                      menuItemArray={[
                        "Truck",
                        "Tracter",
                        "JCB",
                        "Labour",
                        "PickUp",
                      ]}
                      setDropDownValue={setVehicleTypes}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <DropdownComp
                      required
                      dropDownLable={"Vehicle Fuel Types"}
                      ddselectlabel={"Vehicle Fuel Types"}
                      dropDownValue={vehicleFuelTypes}
                      menuItemArray={["Petrol", "Diesel", "CNG"]}
                      setDropDownValue={setVehicleFuelTypes}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
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
                  </Grid>

                  <Grid item xs={12} sm={2}>
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
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    // className={classes.submit}
                    >
                      Update Vehicle Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => resetvehicle()}
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
                {`' ${VehicleDeleteName} '`}
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
                    GetVehicle();
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

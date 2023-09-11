import React, { useState, Component, useEffect, forwardRef } from "react";

import { Link } from "react-router-dom";

import MaterialTable, { Column } from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";


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
import DropdownComp from "../components/Helper Component/DropDownComp";
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

export default function MasterVehicleComp({ openMasterVehicle, setOpenMasterVehicle, getMaxVehicleId }) {
  const columns = [
    { title: "VehicleId", field: "vehicleId" },
    { title: "LicensePlateNumber", field: "licensePlateNumber" },
    { title: "VehicleModel", field: "vehicleModel" },
    { title: "VehicleWeighte", field: "vehicleWeight" },
    { title: "VehicleOwnerName", field: "vehicleOwnerName" },
    { title: "VehicleTypes", field: "vehicleTypes" },
    { title: "VehicleFuelTypes", field: "vehicleFuelTypes" },
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
  }, [open, updateOpen, openMasterVehicle]);

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
    setOpenMasterVehicle(false);
    resetvehicle();
  };

  return (
    <>
      <div>

        <Dialog
          // onBackdropClick={handleClose}
          fullWidth
          maxWidth="md"
          open={openMasterVehicle}
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

    </>
  );
}

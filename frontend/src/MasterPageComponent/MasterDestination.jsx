import {
  Box,
  Button,
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
  Select,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";

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

export default function MasterDestination({
  openMasterDestination,
  setOpenMasterDestination,
  getdestinationMaxId
}) {
  const columns = [
    { title: "Destination Id", field: "destinationId" },
    { title: "Destination Name", field: "destinationName" },
    { title: "Description", field: "description" },
    { title: "Active", field: "isActive" },
  ];
  const [destinationId, setDestinationId] = useState();
  const [mongoDbId, setMongoDbId] = useState();
  const [updateDestinationId, setUpdateDestinationId] = useState();
  const [destinationName, setDestinationName] = useState("");
  const [description, setDescription] = useState("");

  const [isDisable, setIsDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(false);
  const [destinationDeleteName, setDestinationDeleteName] = useState("");

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
    GetDestination();
    setDestinationId(getdestinationMaxId());
    debugger;
  }, [open, updateOpen, showDeleteConfirm, openMasterDestination]);

  const GetDestination = () => {
    debugger;
    axios
      .get("destinationmaster/get-destination")
      .then((res) => {
        debugger;
        console.log(res);
        setData(res.data.destinations);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const classes = useStyles();


  const handleSubmit = (event) => {
    event.preventDefault();
    var data = {
      destinationId: destinationId,
      destinationName: destinationName,
      description: description,
      isActive: isActive,
    };

    console.log(data);
    axios
      .post("destinationmaster/create-destination", data)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Destination Added Successfully");
          handleClose()
          console.log(res);
        } else {
          toast.err("Invalid  Information!");
          setOpenMasterDestination(true)
        }
      })
      .catch((err) => {
        console.log(err);

        toast.err("Invalid Destination Information!");
        setOpenMasterDestination(true)
      });
  };

  const handleReset = () => {
    debugger;
    setDestinationId();
    setDestinationName("");
    setDescription("");
  };


  // ========================================================
  const handleClose = () => {
    handleReset();
    setOpenMasterDestination(false);
    GetDestination()
  };
  return (
    <>
      <div>
        <Dialog
          fullWidth
          maxWidth="md"
          open={openMasterDestination}
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
                    Create Destination/Location Name
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
                      value={destinationId}
                      autoComplete="destinationId"
                      name="destinationId"
                      variant="outlined"
                      fullWidth
                      id="destinationId"
                      label="Destination Id"
                      onChange={(e) => setDestinationId(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled={isDisable}
                      value={destinationName}
                      autoComplete="destinationName"
                      name="destinationName"
                      variant="outlined"
                      fullWidth
                      required
                      id="destinationName"
                      label="Destination Name"
                      onChange={(e) => setDestinationName(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      disabled={isDisable}
                      value={description}
                      autoComplete="description"
                      name="description"
                      variant="outlined"
                      fullWidth
                      id="description"
                      label="Description "
                      onChange={(e) => setDescription(e.target.value)}
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
                      Save Destination Name
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
                      onClick={() => handleClose()}
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
    </>
  );
}

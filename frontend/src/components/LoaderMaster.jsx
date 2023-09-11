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
  Grid,
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

export default function LoaderMaster() {
  const columns = [
    { title: "Loader Id", field: "loaderId" },
    { title: "Loader Name", field: "loaderName" },

    { title: "Description", field: "description" },
    { title: "Active", field: "isActive" },
  ];
  const [loaderId, setLoaderId] = useState([]);
  const [loaderName, setLoaderName] = useState("");
  const [mongoDbId, setMongoDbId] = useState();
  const [updateloaderId, setUpdateloaderId] = useState();

  const [description, setDescription] = useState("");

  const [isDisable, setIsDisable] = useState(false);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(false);
  const [loaderDeleteName, setLoaderDeleteName] = useState("112");

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
    GetLoaderMaster();
    setLoaderId(getloaderMaxId());
  }, [open, updateOpen, showDeleteConfirm]);
  const GetLoaderMaster = () => {
    axios
      .get("loaderMaster/get-loadermaster")
      .then((res) => {
        debugger;
        console.log(res);
        setData(res.data.loaderMasters);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // GetLoadType();

  const getloaderMaxId = () => {
    if (!data || data.length === 0) {
      // Handle the case where data.customer is null or empty
      return 1;
    }
    const maxID = data.reduce((max, data) => {
      // Convert customerId to a number
      const loaderId = parseInt(data.loaderId);
      // Check if customerId is greater than the current max
      if (loaderId > max) {
        return loaderId; // Update max if customerId is greater
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
      loaderId: loaderId,
      loaderName: loaderName,

      description: description,
      isActive: isActive,
    };
    console.log(data);
    debugger;
    axios
      .post("loaderMaster/create-loadermaster", data)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Loader Master Added Successfully");
          console.log(res);
        } else {
          toast.err("Invalid  Information!");
        }
      })
      .catch((err) => {
        console.log(err);
        toast.err("Invalid Loader Master Information!");
      });
    handleClose();
  };
  const handleUpdateSubmit = async (event) => {
    debugger;
    // const id = rowData._id
    event.preventDefault();
    const endpoint = `/loaderMaster/update-loadermaster/${mongoDbId}`;
    // const endpoint = `/unitmaster/update-unitmaster/${updateUnitmasterId}`;
    try {
      const response = await axios.put(endpoint, {
        updateloaderId,
        loaderName,

        description,
        isActive,
      });

      toast.success("Loader Master Updated successfully!");
    } catch (error) {
      console.error("An error occurred while updating the unit:", error);
      // Handle the error in your UI, maybe show a notification or error message
    }
    handleReset();
    setUpdateOpen(false);
    setOpen(false);
    GetLoaderMaster();
  };
  const handleReset = () => {
    debugger;
    // setLoaderId();
    setLoaderName("");
    setDescription("");
  };
  // ==================================================

  const onClickDelete = async (rowData) => {
    debugger;
    debugger;
    axios
      .delete(`/loaderMaster/delete-loadermaster/${rowData._id}`)
      .then((res) => {
        debugger;
        console.log(res);
        toast.success("Loader Master Deleted Successfully");
        GetLoaderMaster();
      })
      .catch((err) => {
        toast.err("Invalid  Information!");
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
        GetLoaderMaster();
      },
    },
    {
      icon: () => <EditIcon color="primary" />,
      tooltip: "Edit Loader",
      onClick: (event, rowData) => {
        setUpdateOpen(true);
        setMongoDbId(rowData._id);
        setUpdateloaderId(rowData.loaderId);
        setLoaderName(rowData.loaderName);

        setDescription(rowData.description);
        setIsActive(rowData.isActive);
      },
    },
    {
      icon: () => <DeleIcon color="secondary" />,
      tooltip: "Delete Loader",
      onClick: (event, rowData) => {
        setShowDeleteConfirm(true);
        setSelectedRowId(rowData);
        setLoaderDeleteName(rowData.loaderName);
        debugger;
        // setMsg(rowData.loadType);
        // onClickDelete(rowData);
        // GetDestination();
      },
    },
  ];
  const refresh = () => { };
  const clear = () => {
    debugger;
    refresh();
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
              Create Loader Master
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
                exportFileName: "All Loaders",
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
                    Create Loader Name
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
                      value={loaderId}
                      autoComplete="loaderId"
                      name="loaderId"
                      variant="outlined"
                      fullWidth
                      id="loaderId"
                      label="Loader Id "
                      onChange={(e) => setLoaderId(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled={isDisable}
                      value={loaderName}
                      autoComplete="loadername"
                      name="loadername"
                      variant="outlined"
                      fullWidth
                      required
                      id="loadername"
                      label="Loader Name"
                      onChange={(e) => setLoaderName(e.target.value)}
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
                      Save Loader Master
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
                  <Grid item xs={12} sm={2}></Grid>
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
                    Update Loader Master
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
                      value={loaderId}
                      autoComplete="loaderId"
                      name="loaderId"
                      variant="outlined"
                      fullWidth
                      id="loaderId"
                      label="Loader Id "
                      onChange={(e) => setLoaderId(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled={isDisable}
                      value={loaderName}
                      autoComplete="loadername"
                      name="loadername"
                      variant="outlined"
                      fullWidth
                      required
                      id="loadername"
                      label="Loader Name"
                      onChange={(e) => setLoaderName(e.target.value)}
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
                      Update Loader Master
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
                  <Grid item xs={12} sm={2}></Grid>
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

      {/* for delete  */}
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
              >{`' ${loaderDeleteName} '`}</span>
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
                    GetLoaderMaster();
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

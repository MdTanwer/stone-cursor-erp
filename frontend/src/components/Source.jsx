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
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import {
  Edit as EditIcon,
  Delete as DeleIcon,
  Refresh,
} from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
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
const Source = () => {
  const [source, setSource] = useState([]);
  const [sourceId, setSourceId] = useState("");
  const [sourceName, setSourceName] = useState("");
  const [sourceAddress, setSourceAddress] = useState("");
  const [update, setUpdate] = useState(false);
  const [updateSourceId, setUpdateSourceId] = useState();
  const [mongodbId, setMongodbId] = useState();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [sourceDeleteName, setSourceDeleteName] = useState("");
  const [open, setOpen] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const classes = useStyles();
  const columns = [
    { title: "Source Id", field: "sourceId" },
    { title: "Source / Mine Name", field: "sourceName" },
    { title: "Source Address", field: "sourceAddress" },
  ];
  useEffect(() => {
    GetSource();
    setSourceId(getMaxSourceId()); //for auto id generator
  });
  const GetSource = async () => {
    try {
      const response = await axios.get("source/get/sourcemaster");
      debugger;
      // console.log(response.data.sitemasters);
      setSource(response.data.sourcemaster);
    } catch (error) {
      console.log(error);
    }
  };
  //   =================
  // For Add Counting in ID
  const getMaxSourceId = () => {
    if (!source || source.length === 0) {
      return 1;
    }
    const maxID = source.reduce((max, source) => {
      const sourceId = parseInt(source.sourceId);
      if (sourceId > max) {
        return sourceId;
      } else {
        return max;
      }
    }, 0);
    return maxID + 1;
  };
  //   ===============================
  const handleSubmit = async (event) => {
    event.preventDefault();
    var source = {
      sourceId: sourceId,
      sourceName: sourceName,
      sourceAddress: sourceAddress,
      isActive: isActive,
    };
    // console.log(source);
    try {
      const response = await axios.post("source/create/sourcemaster", source);

      if (response.status === 201) {
        toast.success("Record has been added successfully!");
        console.log(response);
      } else {
        toast("Invalid Information!");
      }
    } catch (error) {
      console.log(error);
      toast("Invalid Material Information!");
    }
    setOpen(!open);
    setSourceName("");
    setSourceAddress("");
  };
  const handleUpdateSubmit = async (event) => {
    debugger;
    event.preventDefault();
    const endpoint = `/source/updatesourcemaster/${mongodbId}`;
    // // // const endpoint = `/unitmaster/update-unitmaster/${updateUnitmasterId}`;
    try {
      const response = await axios.put(endpoint, {
        updateSourceId,
        sourceName: sourceName,
        sourceAddress: sourceAddress,
        isActive: isActive,
      });

      toast.success("Material Updated successfully!");
    } catch (error) {
      console.error("An error occurred while updating the unit:", error);
      // //   // Handle the error in your UI, maybe show a notification or error message
    }
    clear();
    setUpdate(false);
    setOpen(false);
    GetSource();
  };
  // ======================================
  const onClickDelete = async (rowData) => {
    axios
      .delete(`/source/deletesourcemaster/${rowData._id}`)
      .then((res) => {
        debugger;
        console.log(res);
        toast.success("Record has been deleted successfully!");
      })
      .catch((err) => {
        toast("Invalid  Information!");
        console.log(err);
      });
    debugger;
    // alert("Delete = " + rowData.CustId);
    return;
  };
  const actions = [
    {
      icon: () => <Refresh />,
      tooltip: "Refresh Data",
      isFreeAction: true,
      onClick: (event, rowData) => {
        GetSource();
      },
    },
    {
      icon: () => <EditIcon color="primary" />,
      tooltip: "Edit Factory",
      onClick: (event, rowData) => {
        setUpdate(true);
        setMongodbId(rowData._id);
        setUpdateSourceId(rowData.sourceId);
        setSourceName(rowData.sourceName);
        setSourceAddress(rowData.sourceAddress);
        setIsActive(rowData.isActive);
      },
    },
    {
      icon: () => <DeleIcon color="secondary" />,
      tooltip: "Delete Factory",
      onClick: (event, rowData) => {
        setShowDeleteConfirm(rowData);
        setSourceDeleteName(rowData.sourceName);
      },
    },
  ];
  const checkChanged = (e) => {
    setIsActive(!isActive);
    // const [name, checked] = e.target;
  };
  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    setSourceName("");
    setSourceAddress("");
  };
  const clear = () => {
    setSourceName("");
    setSourceAddress("");
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
              Create Source / Mine
            </Fab>
          </Grid>
          <Grid item xs={12} sm={12}>
            <MaterialTable
              title=""
              columns={columns}
              data={source}
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
                exportFileName: "SitesDetails",
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
          disableBackdropClick={true}
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
                    Create Source / Mine
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
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      disabled={true}
                      value={sourceId}
                      autoComplete="sourceId"
                      name="sourceId"
                      variant="outlined"
                      fullWidth
                      id="sourceId"
                      label="Source Id"
                      onChange={(e) => setSourceId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="sourceName"
                      value={sourceName}
                      required
                      autoComplete="sourceName"
                      name="sourceName"
                      variant="outlined"
                      fullWidth
                      id="sourceName"
                      label="Source / Mine Name"
                      onChange={(e) => setSourceName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="sourceAddress"
                      value={sourceAddress}
                      required
                      autoComplete="sourceAddress"
                      name="sourceAddress"
                      variant="outlined"
                      fullWidth
                      id="sourceAddress"
                      label="Source / Mine Address"
                      onChange={(e) => setSourceAddress(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={1}>
                    <label>IsActive</label>

                    <Checkbox
                      {...label}
                      value={isActive}
                      checked={isActive}
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
                      Save Site Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => clear()}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={1}></Grid>
                </Grid>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <Dialog
          fullWidth
          maxWidth="md"
          disableBackdropClick={true}
          open={update}
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
                    Create Source / Mine
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
              <form className={classes.form} onSubmit={handleUpdateSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      disabled={true}
                      value={updateSourceId}
                      autoComplete="sourceId"
                      name="sourceId"
                      variant="outlined"
                      fullWidth
                      id="sourceId"
                      label="Source Id"
                      onChange={(e) => setSourceId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="sourceName"
                      value={sourceName}
                      required
                      autoComplete="sourceName"
                      name="sourceName"
                      variant="outlined"
                      fullWidth
                      id="sourceName"
                      label="Source / Mine Name"
                      onChange={(e) => setSourceName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="sourceAddress"
                      value={sourceAddress}
                      required
                      autoComplete="sourceAddress"
                      name="sourceAddress"
                      variant="outlined"
                      fullWidth
                      id="sourceAddress"
                      label="Source / Mine Address"
                      onChange={(e) => setSourceAddress(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={1}>
                    <label>IsActive</label>

                    <Checkbox
                      {...label}
                      value={isActive}
                      checked={isActive}
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
                      Update Source Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => clear()}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={1}></Grid>
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
                {`' ${sourceDeleteName} '`}
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
                    GetSource();
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

export default Source;

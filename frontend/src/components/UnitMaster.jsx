
import React, { useState, useEffect } from "react";

import MaterialTable, { Column } from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
// import jsPDF from "jspdf";
import 'jspdf-autotable';

import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleIcon,
  Refresh,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createunitmaster,
  deleteUnitMaster,
  getAllUnitMaster,
  updateUnitMaster,
} from "../redux/actions/unitmaster";
import { server } from "../server";

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Typography } from "@material-ui/core";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  deleteName: {
    color: 'red', // Your desired color
    fontWeight: 'bold',
    fontSize: '20px' // Your desired font weight or other styles
    // Add any other custom styles you want
  },

}));

export default function UnitMaster(props) {
  const { success, error, unitmasters, delsuccess } = useSelector(
    (state) => state.unitmaster
  );
  console.log(unitmasters);
  const columns = [
    // { title: "Unit ID", field: "_id" },
    { title: "Unit ID", field: "unitmasterId" },
    { title: "Name", field: "unitName" },
    { title: "ShortName", field: "unitShortName" },
    { title: "Description", field: "description" },
  ];

  //   const [unitId, setUnitId] = useState("");
  const [open, setOpen] = useState(false);
  const [updateopen, setUpdateOpen] = useState(false);
  const [unitmasterId, setUnitmasterId] = useState("");
  const [mongodbid, setMongodbid] = useState("");
  const [updateUnitmasterId, setUpdateUnitmasterId] = useState("");
  const [unitName, setUnitName] = useState("");
  const [unitShortName, setUnitShortName] = useState("");
  const [description, setDescription] = useState("");

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [unitDeleteName, setUnitDeleteName] = useState("");


  // const [unitUpdateName, setUnitUpdateName] = useState("");
  // const [unitUpdateShortName, setUnitShortUpdateName] = useState("");
  // const [updateDescription, setUpdateDescription] = useState("");


  const dispatch = useDispatch();

  useEffect(() => {
    // if (error) {
    //   toast.error(error);
    // }
    // if (success) {
    //   toast.success("Unit created successfully!");
    //   // navigate("/dashboard-products");
    //   // window.location.reload();

    // }

    debugger;
    dispatch(getAllUnitMaster());
    // BindRowData();
    getMaxCustomerId();

    setUnitmasterId(getMaxCustomerId())
  }, [open, showDeleteConfirm]);

  const classes = useStyles();

  const handleSubmit = async (event) => {
    debugger
    event.preventDefault();
    const newForm = new FormData();

    newForm.append("unitmasterId", unitmasterId);
    newForm.append("unitName", unitName);
    newForm.append("unitShortName", unitShortName);
    newForm.append("description", description);

    dispatch(
      createunitmaster({
        unitmasterId,
        unitName,
        unitShortName,
        description,
      })
    );
    toast.success("Unit Create successfully!");
    dispatch(getAllUnitMaster());
    handleReset();
    setUpdateOpen(false)
    setOpen(false)

  };

  const handleUpdateSubmit = async (event,) => {

    debugger;
    // const id = rowData._id
    event.preventDefault();
    const endpoint = `/unitmaster/update-unitmaster/${mongodbid}`;
    // const endpoint = `/unitmaster/update-unitmaster/${updateUnitmasterId}`;


    try {
      const response = await axios.put(endpoint, {

        updateUnitmasterId,
        unitName,
        unitShortName,
        description,
      });


      toast.success("Unit Updated successfully!");

    } catch (error) {
      console.error("An error occurred while updating the unit:", error);
      // Handle the error in your UI, maybe show a notification or error message
    }
    handleReset()
    setUpdateOpen(false)
    setOpen(false)
    dispatch(getAllUnitMaster());




    // const unitData = {
    //   unitName: unitName,
    //   // unitShortName: unitShortName,
    //   description: description
  };

  const handleDelete = (id) => {
    dispatch(deleteUnitMaster(id));
    dispatch(getAllUnitMaster());
    toast.success('Unit Deleted successfully!');
    // window.location.reload();
  };

  const handleCloseCancle = () => {
    handleReset()
    setOpen(false);
    setUpdateOpen(false)


  };
  const handleReset = () => {
    setUnitName("");
    setUnitShortName("");
    setDescription("");
  };

  const actions = [
    {
      icon: () => <Refresh />,
      tooltip: 'Refresh Data',
      isFreeAction: true,
      onClick: (event, rowData) => {
        dispatch(getAllUnitMaster());
      },
    },
    {
      icon: () => <EditIcon color="primary" />,
      tooltip: 'Edit Unit',
      onClick: (event, rowData) => {
        setUpdateOpen(true)
        setMongodbid(rowData._id);
        // setUpdateUnitmasterId(rowData._id);
        setUpdateUnitmasterId(rowData.unitmasterId);
        setUnitName(rowData.unitName);
        setUnitShortName(rowData.unitShortName);
        setDescription(rowData.description);
        // handleUpdateSubmit(event, rowData)

        console.log(rowData.id);
        // refresh();
        // UpdateFactory(rowData.CommissionRulesId);
      },
    },

    {
      icon: () => <DeleIcon color="secondary" />,
      tooltip: 'Delete Unit',
      onClick: (event, rowData) => {
        // onClickDelete(rowData);
        // onClickDelete(rowData);

        // handleDelete(rowData._id)

        debugger
        setSelectedRowId(rowData._id);
        setShowDeleteConfirm(true);
        setUnitDeleteName(rowData.unitName)
        dispatch(getAllUnitMaster());

        // console.log(rowData);
      },
    },
  ];



  const getMaxCustomerId = () => {
    if (!unitmasters || unitmasters.length === 0) {
      // Handle the case where data.customer is null or empty
      return 1;
    }
    const maxID = unitmasters.reduce((max, unitmaster) => {
      // Convert customerId to a number
      const unitmasterId = parseInt(unitmaster.unitmasterId);
      // Check if customerId is greater than the current max
      if (unitmasterId > max) {
        return unitmasterId; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0
    return maxID + 1;
  };


  const row = [];

  unitmasters &&
    unitmasters.forEach((item) => {
      // debugger;
      row.push({
        _id: item._id,
        unitmasterId: item.unitmasterId,
        unitName: item.unitName,
        unitShortName: item.unitShortName,
        description: item.description,
      });
    });

  // };


  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Fab
              color='primary'
              style={{
                borderRadius: '0.5rem',
                height: '3rem',
                width: '100%',
              }}
              variant='extended'
              aria-label='add'
              fullWidth
              onClick={() => setOpen(true)}
            >
              Create New Unit
            </Fab>
          </Grid>
          <Grid item xs={12} sm={12}>
            <MaterialTable
              title=""
              columns={columns}
              // rows={row}
              data={row}
              //   icons={tableIcons}
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
                exportFileName: "All Units",
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
          // onBackdropClick={handleClose}

          fullWidth
          maxWidth='md'
          open={open}

          // disableBackdropClick={true}
          onClose={handleCloseCancle}
          aria-labelledby='max-width-dialog-title'
        >
          <DialogTitle id='max-width-dialog-title'>
            <Grid
              style={{
                // paddingTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
              }}
              container
            >
              <Grid style={{ justifyItems: 'flex-end' }} item xs={12} sm={11}>
                <Typography variant='h5' fontWeight={700}>
                  Create New Unit
                </Typography>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button
                  color='secondary'
                  onClick={handleCloseCancle}
                  variant='contained'
                >
                  &#10539;
                </Button>
              </Grid>
            </Grid>
          </DialogTitle>

          <DialogContent>
            <div>
              {/* <ToastContainer
                position='top-center'
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
                      value={unitmasterId}
                      required
                      type="unitName"
                      autoComplete="unitName"
                      name="unitName"
                      variant="outlined"
                      fullWidth
                      disabled
                      id="unitName"
                      label="UINO"
                      // onChange={(e) => setUiNo(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      value={unitName}
                      required
                      type="unitName"
                      autoComplete="unitName"
                      name="unitName"
                      variant="outlined"
                      fullWidth
                      id="unitName"
                      label="Unit Name"
                      onChange={(e) => setUnitName(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <TextField
                      value={unitShortName}
                      type="unitShortName"
                      autoComplete="unitShortName"
                      name="unitShortName"
                      variant="outlined"
                      fullWidth
                      id="unitShortName"
                      label="Unit Short Name"
                      onChange={(e) => setUnitShortName(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      value={description}
                      type="description"
                      autoComplete="description"
                      name="description"
                      variant="outlined"
                      fullWidth
                      id="description"
                      label="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  {/* 
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    // className={classes.submit}
                    >
                      Add / Update
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                    // onClick={() => clear()}
                    >
                      Cancel / Refresh
                    </Button>
                  </Grid> */}
                  <Grid item xs={12} sm={12}></Grid>
                  {/* </Grid> */}

                  {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button> */}
                  {/* <Grid item xs={12} sm={5}></Grid> */}
                  <Grid item xs={12} sm={4}>
                    <Button
                      name='submit'
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                    // className={classes.submit}
                    >
                      Save Unit Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      name='resetForm'
                      fullWidth
                      variant='contained'
                      color='primary'
                      // className={classes.submit}
                      onClick={() => handleReset()}
                    >
                      Reset Form
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      name='cancle'
                      variant='contained'
                      color='secondary'
                      fullWidth
                      onClick={() => handleCloseCancle()}
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

      {/* for update  */}
      <div>
        {/* <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Fab
              color='primary'
              style={{
                borderRadius: '0.5rem',
                height: '3rem',
                width: '100%',
              }}
              variant='extended'
              aria-label='add'
              fullWidth
              onClick={() => setUpdateOpen(true)}
            >
              Update New Unit
            </Fab>
          </Grid>
           
        </Grid> */}
        <Dialog
          // onBackdropClick={handleClose}
          fullWidth
          maxWidth='md'
          open={updateopen}
          disableBackdropClick={true}
          onClose={handleCloseCancle}

          aria-labelledby='max-width-dialog-title'
        >
          <DialogTitle id='max-width-dialog-title'>
            <Grid
              style={{
                // paddingTop: '0.5rem',
                display: 'flex',
                alignItems: 'center',
              }}
              container
            >
              <Grid style={{ justifyItems: 'flex-end' }} item xs={12} sm={11}>
                <Typography variant='h5' fontWeight={700}>
                  Update Unit
                </Typography>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button
                  color='secondary'
                  onClick={handleCloseCancle}
                  variant='contained'
                >
                  &#10539;
                </Button>
              </Grid>
            </Grid>
          </DialogTitle>

          <DialogContent>
            <div>
              {/* <ToastContainer
                position='top-center'
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
                      value={updateUnitmasterId}

                      type="updateUnitmasterId"
                      autoComplete="updateUnitmasterId"
                      name="updateUnitmasterId"
                      variant="outlined"
                      fullWidth
                      disabled
                      id="updateUnitmasterId"
                      label="UINo"
                      // onChange={(e) => setUiNo(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <TextField
                      value={unitName}
                      required
                      type="unitName"
                      autoComplete="unitName"
                      name="unitName"
                      variant="outlined"
                      fullWidth
                      id="unitName"
                      label="Unit Name"
                      onChange={(e) => setUnitName(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <TextField
                      value={unitShortName}
                      type="unitShortName"
                      autoComplete="unitShortName"
                      name="unitShortName"
                      variant="outlined"
                      fullWidth
                      id="unitShortName"
                      label="Unit Short Name"
                      onChange={(e) => setUnitShortName(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={12}>
                    <TextField
                      value={description}
                      type="description"
                      autoComplete="description"
                      name="description"
                      variant="outlined"
                      fullWidth
                      id="description"
                      label="Description"
                      onChange={(e) => setDescription(e.target.value)}
                      autoFocus
                    />
                  </Grid>


                  {/* <Grid item xs={12} sm={5}></Grid> */}
                  <Grid item xs={12} sm={4}>
                    <Button
                      name='submit'
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                    // className={classes.submit}
                    >
                      Update Unit Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      name='resetForm'
                      fullWidth
                      variant='contained'
                      color='primary'
                      // className={classes.submit}
                      onClick={() => handleReset()}
                    >
                      Reset Form
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      name='cancle'
                      variant='contained'
                      color='secondary'
                      fullWidth
                      onClick={() => handleCloseCancle()}
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
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this <span className={classes.deleteName}>{`' ${unitDeleteName} '`}</span> record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}></Grid>
            <Grid item xs={12} sm={4}>
              <Button
                fullWidth
                name='submit'
                variant='contained'
                onClick={() => setShowDeleteConfirm(false)}
                color="primary">
                No
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                name='cancle'
                variant='contained'
                color='secondary'
                fullWidth
                onClick={() => {
                  handleDelete(selectedRowId);
                  dispatch(getAllUnitMaster());
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
    </>
  );
}

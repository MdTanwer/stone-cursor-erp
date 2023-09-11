import React, { useState, Component, useEffect, forwardRef } from "react";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { TextField, Typography } from "@mui/material";

import axios from "axios";
import "jspdf-autotable";

import Checkbox from "@mui/material/Checkbox";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleIcon,
  Refresh,
} from "@material-ui/icons";
// import { Refresh } from '@material-ui/icons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { confirm } from "react-confirm-box";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import DropdownComp from "../Helper Component/DropDownComp";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { BsFillCloudUploadFill } from "react-icons/bs";
import { FaFileUpload } from "react-icons/fa";
import { DialogContentText, Fab } from "@material-ui/core";
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

export default function Maintanance(props) {
  // const {
  //   accountHolderName,
  //   bankName,
  //   accountNumber,
  //   ifscCode,
  //   branchAddress,
  //   accountType,
  // } = useSelector((state) => state.bank);
  // const { name, email } = useSelector((state) => state.user.user);
  // console.log(name, email);
  // const { success } = useSelector((state) => state.customer);

  const [isDisable, setIsDisable] = useState(false);
  const classes = useStyles();
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const [checked, setChecked] = useState(true);
  const checkChanged = (state) => {
    setChecked(!checked);
  };
  const [allCustchecked, setAllCustchecked] = useState(false);

  const AllCustomercheckChanged = (state) => {
    setAllCustchecked(!allCustchecked);
    setIsDisable(!allCustchecked);
  };

  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  // const [active, setActive] = useState(true);

  const [maintananceData, setMaintananceData] = useState([]);
  useEffect(() => {
    getmaintanance();
    setMaintananceId(getMaxmaintananceId);
  }, [open, updateOpen]);
  const getmaintanance = async () => {
    try {
      const response = await axios.get("maintanance/get-maintanance");

      setMaintananceData(response.data.maintanances);
      console.log(maintananceData);
    } catch (error) {
      console.log(error);
    }
  };

  const columns = [
    { title: "maintanance ID", field: "maintananceId" },
    { title: "Catagory", field: "catagory" },
    { title: "Vender", field: "vender" },
    { title: "Mobile No.", field: "mobileNumber" },
    { title: "Description", field: "description" },
    { title: "Address", field: "address" },
    // { title: "GSTIN", field: "gstNumber" },
    { title: "Amount", field: "amount" },
  ];
  const [mongodbId, setMongodbId] = useState("");
  const [maintananceId, setMaintananceId] = useState(""); //
  const [catagory, setCatagory] = useState(""); //
  const [vender, setVender] = useState(""); //
  const [startDatevalue, setStartDatevalue] = useState(""); //
  const [updatemaintananceId, setUpdateMaintananceId] = useState("");
  const [description, setDescription] = useState(""); //
  const [mobileNumber, setMobileNumber] = useState(""); //
  const [amount, setAmount] = useState(""); //
  const [imageUpload, setImageUpload] = useState("");
  const [address, setAddress] = useState(""); //
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [catagoryDelete, setCatagoryDelete] = useState("");
  // const [createdBy, setCreatedBy] = useState("");

  const getMaxmaintananceId = () => {
    if (!maintananceData || maintananceData.length === 0) {
      // Handle the case where data.customer is null or empty
      return 1;
    }
    const maxID = maintananceData.reduce((max, maintananceData) => {
      // Convert customerId to a number
      const maintananceId = parseInt(maintananceData.maintananceId);
      // Check if customerId is greater than the current max
      if (maintananceId > max) {
        return maintananceId; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0
    return maxID + 1;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var data = {
      maintananceId: maintananceId,
      description: description,
      mobileNumber: mobileNumber,
      amount: amount,
      catagory: catagory,
      vender: vender,
      startDatevalue: startDatevalue,
      // gstNumber: gstNumber,
      address: address,
    };
    console.log(data);
    axios
      .post("maintanance/create-maintanance", data)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Maintanance Save successfully!");

          console.log(res);
        } else {
          alert("Invalid  Information!");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Invalid Maintanance Information!");
      });
    handleReset();
    setUpdateOpen(false);
    setOpen(false);
    getmaintanance();
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

  const handleCheckChange = (e) => {
    const { name, checked } = e.target; // Use 'checked' instead of 'value'
    console.log(name, checked);
    console.log(e.target.checked.value);

    // setDriverData({
    //   ...driverData,
    //   [name]: checked ? true : false, // Set to 'true' if checked, 'false' otherwise
    // });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const newForm = new FormData();

  // };

  const handleUpdateSubmit = async (event) => {
    debugger;
    event.preventDefault();
    const endpoint = `/maintanance/update-maintanance/${mongodbId}`;
    try {
      const response = await axios.put(endpoint, {
        //
        updatemaintananceId,
        description,
        mobileNumber,
        amount,
        address,
        catagory,
        vender,
        startDatevalue,
      });
      toast.success("Maintanance Updated successfully!");
    } catch (error) {
      console.error("An error occurred while updating the unit:", error);
      // Handle the error in your UI, maybe show a notification or error message
    }
    handleReset();
    setUpdateOpen(false);
    setOpen(false);
    getmaintanance();

    // dispatch(getAllUnitMaster());
  };

  const onClickDelete = async (rowData) => {
    debugger;
    axios
      .delete(`/maintanance/delete-maintanance/${rowData._id}`)
      .then((res) => {
        debugger;
        console.log(res);
        toast.success("Maintanace Deleted Successfully");
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
  getmaintanance();
  // };

  const handleCloseCancle = () => {
    setOpen(false);
    handleReset();
    setUpdateOpen(false);
  };
  const handleReset = () => {
    setMaintananceId();
    setDescription("");
    setMobileNumber("");
    setAmount("");
    setVender("");
    setStartDatevalue("");
    setAddress("");
    setCatagory("");
  };

  const actions = [
    {
      icon: () => <Refresh />,
      tooltip: "Refresh Data",
      isFreeAction: true,
      onClick: () => {
        getmaintanance();
      },
    },
    {
      icon: () => <EditIcon color="primary" />,
      tooltip: "Edit Maintanance",
      onClick: (event, rowData) => {
        setUpdateOpen(true);
        setMongodbId(rowData._id);
        setUpdateMaintananceId(rowData.maintananceId);
        setDescription(rowData.description);
        setCatagory(rowData.catagory);
        setStartDatevalue(rowData.startDatevalue);
        setMobileNumber(rowData.mobileNumber);
        setAddress(rowData.address);
        setVender(rowData.vender);
        setAmount(rowData.amount);
      },
    },
    {
      icon: () => <DeleIcon color="secondary" />,
      tooltip: "Delete Factory",
      onClick: (event, rowData) => {
        setShowDeleteConfirm(rowData);
        setCatagoryDelete(rowData.catagory);
      },
    },
  ];

  return (
    <>
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
            Add Maintenance
          </Fab>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MaterialTable
            title=""
            columns={columns}
            data={maintananceData}
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
              exportFileName: "CommissionRulesDetails",
              addRowPosition: "last",

              showTextRowsSelected: false,
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
        onClose={handleCloseCancle}
        aria-labelledby="max-width-dialog-title"
        disableBackdropClick={true}
      >
        <DialogTitle id="max-width-dialog-title">
          <Grid
            style={{
              display: "flex",
              alignItems: "center",
            }}
            container
          >
            <Grid style={{ justifyItems: "flex-end" }} item xs={12} sm={11}>
              <Typography variant="h5" fontWeight={700}>
                Add Maintenance
              </Typography>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                color="secondary"
                onClick={handleCloseCancle}
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
            {/* <h3>Create New Supplier</h3> */}
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextField
                    disabled
                    type="number"
                    value={maintananceId}
                    autoComplete="maintananceId"
                    name="maintananceId"
                    variant="outlined"
                    fullWidth
                    id="maintananceId"
                    label="Maintanance ID"
                    onChange={(e) => setMaintananceId(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DropdownComp
                    // required
                    dropDownLable={"Select Catagory"}
                    ddselectlabel={"Select Catagory"}
                    dropDownValue={catagory}
                    menuItemArray={["Machine", "Loader", "JCB", "Machine"]}
                    setDropDownValue={setCatagory}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="DL Expiry Date"
                      value={startDatevalue}
                      onChange={(newValue) => {
                        setStartDatevalue(newValue);
                      }}
                      renderInput={(params) => (
                        <TextField variant="outlined" fullWidth {...params} />
                      )}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <DropdownComp
                    dropDownLable={"Vender"}
                    ddselectlabel={"Vender"}
                    dropDownValue={vender}
                    menuItemArray={["Ajmal", "Asif", "Afroz", "Zaf"]}
                    setDropDownValue={setVender}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    type="number"
                    disabled={isDisable}
                    value={mobileNumber}
                    autoComplete="mobileNumber"
                    name="mobileNumber"
                    variant="outlined"
                    fullWidth
                    id="mobileNumber"
                    label="Mobile Number"
                    onChange={(e) => setMobileNumber(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    disabled={isDisable}
                    value={description}
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

                <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={isDisable}
                    value={address}
                    autoComplete="address"
                    name="address"
                    variant="outlined"
                    fullWidth
                    id="address"
                    label=" Address"
                    onChange={(e) => setAddress(e.target.value)}
                    autoFocus
                    multiline
                    minRows={1}
                  />
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    disabled={isDisable}
                    required
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

                {/* <Grid item xs={12} sm={2}>
                  <input
                    type="file"
                    name=""
                    id="upload"
                    className="hidden"
                    multiple
                    value={imageUpload}
                    onChange={(e) => setImageUpload(e.target.value)}
                  />
                  <div className="w-full flex items-center flex-wrap">
                    <label htmlFor="upload">
                      <FaFileUpload size={30} className="mt-3" color="#555" />
                    </label>
                    <b>Upload Slip</b>
                  </div>
                </Grid> */}

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

                {/* <Grid item xs={12} sm={12}>
                  <Grid container>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        // required
                        disabled={true}
                        value={"UserName"}
                        autoComplete="createdBy"
                        name="createdBy"
                        variant="outlined"
                        fullWidth
                        id="createdBy"
                        label="Created By"
                        // onChange={handleChange}
                        onChange={(e) => setCreatedBy(e.target.value)}
                        autoFocus
                      />
                    </Grid>
                  </Grid>
                </Grid> */}

                <Grid item xs={12} sm={3}>
                  <Button
                    name="submit"
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  // onClick={() => handleReset()}
                  >
                    Save Details
                  </Button>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    name="resetForm"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => handleReset()}
                  >
                    Reset Form
                  </Button>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Button
                    name="cancle"
                    variant="contained"
                    color="secondary"
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
      {/* //=========================================================================================================================================== */}
      <div>
        <Dialog
          // onBackdropClick={handleClose}
          fullWidth
          maxWidth="md"
          open={updateOpen}
          onClose={handleCloseCancle}
          aria-labelledby="max-width-dialog-title"
          disableBackdropClick={true}
        >
          <DialogTitle id="max-width-dialog-title">
            <Grid
              style={{
                display: "flex",
                alignItems: "center",
              }}
              container
            >
              <Grid style={{ justifyItems: "flex-end" }} item xs={12} sm={11}>
                <Typography variant="h5" fontWeight={700}>
                  Update Maintanance
                </Typography>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button
                  color="secondary"
                  onClick={handleCloseCancle}
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
              {/* <h3>Create New Supplier</h3> */}
              <form className={classes.form} onSubmit={handleUpdateSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled
                      type="number"
                      value={updatemaintananceId}
                      autoComplete="maintananceId"
                      name="maintananceId"
                      variant="outlined"
                      fullWidth
                      id="maintananceId"
                      label="Maintanance ID"
                      // onChange={handleChange}
                      onChange={(e) => setUpdateMaintananceId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <DropdownComp
                      // required
                      dropDownLable={"Select Catagory"}
                      ddselectlabel={"Select Catagory"}
                      dropDownValue={catagory}
                      menuItemArray={["Machine", "Loader", "JCB", "Machine"]}
                      setDropDownValue={setCatagory}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="DL Expiry Date"
                        // disabled={isDateRangeEnableDisable}
                        value={startDatevalue}
                        onChange={(newValue) => {
                          setStartDatevalue(newValue);
                        }}
                        renderInput={(params) => (
                          <TextField variant="outlined" fullWidth {...params} />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <DropdownComp
                      // required
                      dropDownLable={"Vender"}
                      ddselectlabel={"Vender"}
                      dropDownValue={vender}
                      menuItemArray={["Ajmal", "Asif ", "Afroz", "Zaf"]}
                      setDropDownValue={setVender}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="number"
                      disabled={isDisable}
                      value={mobileNumber}
                      autoComplete="mobileNumber"
                      name="mobileNumber"
                      variant="outlined"
                      fullWidth
                      id="mobileNumber"
                      label="Mobile Number"
                      // onChange={handleChange}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled={isDisable}
                      value={description}
                      autoComplete="description"
                      name="description"
                      variant="outlined"
                      fullWidth
                      id="description"
                      label="Description"
                      // onChange={handleChange}
                      onChange={(e) => setDescription(e.target.value)}
                      autoFocus
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      disabled={isDisable}
                      value={address}
                      autoComplete="address"
                      name="address"
                      variant="outlined"
                      // rows={2}
                      fullWidth
                      id="address"
                      label=" Address"
                      // onChange={handleChange}
                      onChange={(e) => setAddress(e.target.value)}
                      autoFocus
                      multiline
                      minRows={1}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled={isDisable}
                      value={amount}
                      autoComplete="amount"
                      name="amount"
                      variant="outlined"
                      fullWidth
                      id="amount"
                      label="Amount"
                      // onChange={handleChange}
                      onChange={(e) => setAmount(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  {/* 
                  <Grid item xs={12} sm={2}>
                    <input
                      type="file"
                      name=""
                      id="upload"
                      className="hidden"
                      multiple
                      // onChange={handleImageChange}
                    />
                    <div className="w-full flex items-center flex-wrap">
                      <label htmlFor="upload">
                        <FaFileUpload size={30} className="mt-3" color="#555" />
                      </label>
                      <b>Upload Slip</b>
                    </div>
                  </Grid> */}

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
                  {/* <Grid item xs={12} sm={12}>
                    <BankDetails />
                  </Grid> */}
                  {/* <Grid item xs={12} sm={12}>
                  <Grid container>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        // required
                        disabled={true}
                        value={"UserName"}
                        autoComplete="createdBy"
                        name="createdBy"
                        variant="outlined"
                        fullWidth
                        id="createdBy"
                        label="Created By"
                        // onChange={handleChange}
                        onChange={(e) => setCreatedBy(e.target.value)}
                        autoFocus
                      />
                    </Grid>
                  </Grid>
                </Grid> */}

                  <Grid item xs={12} sm={3}>
                    <Button
                      name="submit"
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    // onClick={() => handleReset()}
                    >
                      Update Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      name="resetForm"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => handleReset()}
                    >
                      Reset Form
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <Button
                      name="cancle"
                      variant="contained"
                      color="secondary"
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
                {`' ${catagoryDelete} '`}
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
                    getmaintanance();
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

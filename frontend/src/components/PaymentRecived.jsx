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
import {
  Edit as EditIcon,
  Delete as DeleIcon,
  Refresh,
} from "@material-ui/icons";
import axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect } from "react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
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
const PaymentRecived = () => {
  const classes = useStyles();
  const [paymentData, setPaymentData] = useState([]);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [paymentId, setPaymentId] = useState("");
  const [manualId, setManualId] = useState("");
  const [currentDate, setCurrentDate] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [challan, setChallan] = useState("");
  const [dueAmount, setDueAmount] = useState("0");
  const [discount, setDiscount] = useState("");
  const [paybleAmount, setPaybleAmount] = useState("0");
  const [recivedAmount, setRecivedAmount] = useState("");
  const [dueAdvAmount, setDueAdvAmount] = useState("0");
  const [mongodbId, setMongodbId] = useState();
  const [paymentRecivedDelete, setPaymentRecivedDelete] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  // const [updatepaymentId, setUpdatepaymentId] = useState();
  // const [paymentData, setPaymentData] = useState({
  //   paymentId: "",
  //   manualId: "",
  //   currentDate: currentDateTime,
  //   customerName: "",
  //   challan: "",
  //   dueAmount: "",
  //   discount: "",
  //   paybleAmount: "",
  //   recivedAmount: "",
  //   dueAdvAmount: "",
  // });
  const columns = [
    { title: "PaymentId ", field: "paymentId" },
    { title: "ManualId", field: "manualId" },
    { title: "CurrentDate", field: "currentDate" },
    { title: "CustomerName", field: "customerName" },
    { title: "Challan", field: "challan" },
    { title: "DueAmount", field: "dueAmount" },
    { title: "Discount", field: "discount" },
    { title: "PaybleAmount", field: "paybleAmount" },
    { title: "RecivedAmount", field: "recivedAmount" },
    { title: "Due / AdvAmount", field: "dueAdvAmount" },
  ];
  useEffect(() => {
    GetPaymentRecived();
    getMaxPaymentId();
    setPaymentId(getMaxPaymentId());
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, [open]);
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setPaymentData({
  //     ...paymentData,
  //     [name]: value,
  //   });
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    var paymentData = {
      paymentId: paymentId,
      manualId: manualId,
      currentDate: currentDateTime,
      customerName: customerName,
      challan: challan,
      dueAmount: dueAmount,
      discount: discount,
      paybleAmount: paybleAmount,
      recivedAmount: recivedAmount,
      dueAdvAmount: dueAdvAmount,
    };
    try {
      const response = await axios.post(
        "paymentrecived/create/paymentrecieved",
        paymentData
      );

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
    setPaymentId("");
    setManualId("");
    setCustomerName("");
    setChallan("");
    setDueAmount("");
    setDiscount("");
    setPaybleAmount("");
    setRecivedAmount("");
    setDueAdvAmount("");
  };

  // Update the current date and time every second

  const GetPaymentRecived = async () => {
    try {
      const response = await axios.get("/paymentrecived/get/paymentrecieved");
      debugger;
      // console.log(response);
      setPaymentData(response.data.paymentRecived);
    } catch (error) {
      console.log(error);
    }
  };
  const handleUpdateSubmit = async (event) => {
    debugger;
    event.preventDefault();
    const endpoint = `/paymentrecived/update/paymentrecieved/${mongodbId}`;

    try {
      const response = await axios.put(endpoint, {
        paymentId,
        manualId: manualId,
        currentDate: currentDateTime,
        customerName: customerName,
        challan: challan,
        dueAmount: dueAmount,
        discount: discount,
        paybleAmount: paybleAmount,
        recivedAmount: recivedAmount,
        dueAdvAmount: dueAdvAmount,
      });

      toast.success("Material Updated successfully!");
    } catch (error) {
      console.error("An error occurred while updating the unit:", error);
      // //   // Handle the error in your UI, maybe show a notification or error message
    }
    clear();
    setUpdate(false);
    setOpen(false);
    GetPaymentRecived();
  };

  const onClickDelete = async (rowData) => {
    axios
      .delete(`/paymentrecived/delete/paymentrecieved/${rowData._id}`)
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
  GetPaymentRecived();
  // ===================For Automatic Id generator==================
  const getMaxPaymentId = () => {
    if (!paymentData || paymentData.length === 0) {
      return 1;
    }
    const maxID = paymentData.reduce((max, paymentData) => {
      const payId = parseInt(paymentData.paymentId);
      if (payId > max) {
        return payId;
      } else {
        return max;
      }
    }, 0);
    return maxID + 1;
  };
  // ==================================================================
  //   const handleCustomerChange = (e) => {
  //     setPaymentData();
  //   };
  const handlecustomerChange = (e) => {
    setCustomerName(e.target.value);
  };
  const handleChallanChange = (e) => {
    setChallan(e.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    setManualId("");
    setCustomerName("");
    setChallan("");
    setDueAmount("");
    setDiscount("");
    setPaybleAmount("");
    setRecivedAmount("");
    setDueAdvAmount("");
  };
  const clear = () => {
    setManualId("");
    setCustomerName("");
    setChallan("");
    setDueAmount("");
    setDiscount("");
    setPaybleAmount("");
    setRecivedAmount("");
    setDueAdvAmount("");
  };
  const actions = [
    {
      icon: () => <Refresh />,
      tooltip: "Refresh Data",
      isFreeAction: true,
      onClick: (event, rowData) => {
        GetPaymentRecived();
      },
    },
    {
      icon: () => <EditIcon color="primary" />,
      tooltip: "Edit Factory",
      onClick: (event, rowData) => {
        setUpdate(true);
        setPaymentId(rowData.paymentId);
        // setUpdatepaymentId(rowData.paymentId);
        setMongodbId(rowData._id);
        setManualId(rowData.manualId);
        setCustomerName(rowData.customerName);
        setChallan(rowData.challan);
        setDueAmount(rowData.dueAmount);
        setDiscount(rowData.discount);
        setPaybleAmount(rowData.paybleAmount);
        setRecivedAmount(rowData.recivedAmount);
        setDueAdvAmount(rowData.dueAdvAmount);
        GetPaymentRecived();
      },
    },
    {
      icon: () => <DeleIcon color="secondary" />,
      tooltip: "Delete Factory",
      onClick: (event, rowData) => {
        setShowDeleteConfirm(rowData);
        setPaymentRecivedDelete(rowData.customerName);
      },
    },
  ];
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
              Payment Recived
            </Fab>
          </Grid>
          <Grid item xs={12} sm={12}>
            <MaterialTable
              title=""
              columns={columns}
              data={paymentData}
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
                exportFileName: "Payment Recived",
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
                    Payment Recived
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
                      value={paymentId}
                      autoComplete="paymentId"
                      name="paymentId"
                      variant="outlined"
                      fullWidth
                      id="paymentId"
                      label="Payment Id"
                      // onChange={handleChange}
                      onChange={(e) => setPaymentId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      value={manualId}
                      autoComplete="manualId"
                      name="manualId"
                      variant="outlined"
                      fullWidth
                      id="manualId"
                      label="Manual Id"
                      // onChange={handleChange}
                      onChange={(e) => setManualId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      //   type="date"
                      disabled={true}
                      value={currentDateTime.toLocaleString("en-GB")}
                      required
                      autoComplete="date"
                      name="currentDateTime"
                      variant="outlined"
                      fullWidth
                      id="currentDateTime"
                      label=" Current Date / Time"
                      //   onChange={handleChange}
                      //   onChange={(e) => setSourceName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          variant="outlined"
                        >
                          Customer List
                        </InputLabel>
                        <Select
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="customerName"
                          value={customerName}
                          label="Customer List"
                          onChange={handlecustomerChange}
                          // onChange={(e) => setCustomerName(e.target.value)}
                        >
                          <MenuItem value="Mohammad Musharaf">
                            Mohammad Musharaf
                          </MenuItem>
                          <MenuItem value="Afroz khan">Afroz khan</MenuItem>
                          <MenuItem value="Zaf khan">Zaf khan</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          variant="outlined"
                        >
                          Challan List
                        </InputLabel>
                        <Select
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="challan"
                          value={challan}
                          label="Challan List"
                          // onChange={handleChange}
                          onChange={handleChallanChange}
                        >
                          <MenuItem value="Challan 1">Challan 1</MenuItem>
                          <MenuItem value="Challan 2">Challan 2</MenuItem>
                          <MenuItem value="Challan 3">Challan 3</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled={true}
                      type="dueAmount"
                      value={dueAmount}
                      autoComplete="dueAmount"
                      name="dueAmount"
                      variant="outlined"
                      fullWidth
                      id="dueAmount"
                      label="DueAmount"
                      onChange={(e) => setDueAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      type="discount"
                      value={discount}
                      autoComplete="discount"
                      name="discount"
                      variant="outlined"
                      fullWidth
                      id="discount"
                      label="Discount"
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      disabled
                      type="dueAmount"
                      value={paybleAmount}
                      autoComplete="paybleAmount"
                      name="paybleAmount"
                      variant="outlined"
                      fullWidth
                      id="paybleAmount"
                      label="Payble Amount"
                      onChange={(e) => setPaybleAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      type="recivedAmount"
                      value={recivedAmount}
                      autoComplete="recivedAmount"
                      name="recivedAmount"
                      variant="outlined"
                      fullWidth
                      id="recivedAmount"
                      label="Recived Amount"
                      onChange={(e) => setRecivedAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      disabled
                      type="dueAdvAmount"
                      value={dueAdvAmount}
                      autoComplete="dueAdvAmount"
                      name="dueAdvAmount"
                      variant="outlined"
                      fullWidth
                      id="dueAdvAmount"
                      label="Due/Adv Amount"
                      onChange={(e) => setDueAdvAmount(e.target.value)}
                    />
                  </Grid>
                  {/* =========================================== */}
                  <Grid item xs={12} sm={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      // className={classes.submit}
                    >
                      Save Payment Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      //   type="print"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => window.print()}
                      // className={classes.submit}
                    >
                      Print
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => clear()}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      color="secondary"
                      onClick={handleClose}
                      fullWidth
                      variant="contained"
                    >
                      Cancel
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={1}></Grid>
                </Grid>
              </form>
            </div>
          </DialogContent>
        </Dialog>
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
                    Payment Recived
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
                      value={paymentId}
                      autoComplete="paymentId"
                      name="paymentId"
                      variant="outlined"
                      fullWidth
                      id="paymentId"
                      label="Payment Id"
                      // onChange={handleChange}
                      onChange={(e) => setPaymentId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      value={manualId}
                      autoComplete="manualId"
                      name="manualId"
                      variant="outlined"
                      fullWidth
                      id="manualId"
                      label="Manual Id"
                      // onChange={handleChange}
                      onChange={(e) => setManualId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      //   type="date"
                      disabled={true}
                      value={currentDateTime.toLocaleString("en-GB")}
                      required
                      autoComplete="date"
                      name="currentDateTime"
                      variant="outlined"
                      fullWidth
                      id="currentDateTime"
                      label=" Current Date / Time"
                      //   onChange={handleChange}
                      //   onChange={(e) => setSourceName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          variant="outlined"
                        >
                          Customer List
                        </InputLabel>
                        <Select
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="customerName"
                          value={customerName}
                          label="Customer List"
                          onChange={handlecustomerChange}
                          // onChange={(e) => setCustomerName(e.target.value)}
                        >
                          <MenuItem value="Mohammad Musharaf">
                            Mohammad Musharaf
                          </MenuItem>
                          <MenuItem value="Afroz khan">Afroz khan</MenuItem>
                          <MenuItem value="Zaf khan">Zaf khan</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          variant="outlined"
                        >
                          Challan List
                        </InputLabel>
                        <Select
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          name="challan"
                          value={challan}
                          label="Challan List"
                          // onChange={handleChange}
                          onChange={handleChallanChange}
                        >
                          <MenuItem value="Challan 1">Challan 1</MenuItem>
                          <MenuItem value="Challan 2">Challan 2</MenuItem>
                          <MenuItem value="Challan 3">Challan 3</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled={true}
                      type="dueAmount"
                      value={dueAmount}
                      autoComplete="dueAmount"
                      name="dueAmount"
                      variant="outlined"
                      fullWidth
                      id="dueAmount"
                      label="DueAmount"
                      onChange={(e) => setDueAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      type="discount"
                      value={discount}
                      autoComplete="discount"
                      name="discount"
                      variant="outlined"
                      fullWidth
                      id="discount"
                      label="Discount"
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      disabled
                      type="dueAmount"
                      value={paybleAmount}
                      autoComplete="paybleAmount"
                      name="paybleAmount"
                      variant="outlined"
                      fullWidth
                      id="paybleAmount"
                      label="Payble Amount"
                      onChange={(e) => setPaybleAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      type="recivedAmount"
                      value={recivedAmount}
                      autoComplete="recivedAmount"
                      name="recivedAmount"
                      variant="outlined"
                      fullWidth
                      id="recivedAmount"
                      label="Recived Amount"
                      onChange={(e) => setRecivedAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      disabled
                      type="dueAdvAmount"
                      value={dueAdvAmount}
                      autoComplete="dueAdvAmount"
                      name="dueAdvAmount"
                      variant="outlined"
                      fullWidth
                      id="dueAdvAmount"
                      label="Due/Adv Amount"
                      onChange={(e) => setDueAdvAmount(e.target.value)}
                    />
                  </Grid>
                  {/* =========================================== */}
                  <Grid item xs={12} sm={3}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      // className={classes.submit}
                    >
                      Update Payment
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      //   type="print"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => window.print()}
                      // className={classes.submit}
                    >
                      Print
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => clear()}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      color="secondary"
                      onClick={handleClose}
                      fullWidth
                      variant="contained"
                    >
                      Cancel
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
                {`' ${paymentRecivedDelete} '`}
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
                    GetPaymentRecived();
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
export default PaymentRecived;

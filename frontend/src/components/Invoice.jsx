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
} from '@material-ui/core';
import {
  Edit as EditIcon,
  Delete as DeleIcon,
  Refresh,
} from '@material-ui/icons';
import axios from 'axios';
import MaterialTable from 'material-table';
import React, { useEffect, useRef } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
// import MultiSelect from 'react-select';
// import MultiSelect from './Helper Component/multiSelect';
import MultiSelectDropDown from './Helper Component/multiSelect';
/////////////////// Date & TIme ///////////////////////////
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSelector } from 'react-redux';
////////////////////////////////////////////////////////////

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
    fontSize: '20px', // Your desired font weight or other styles
    // Add any other custom styles you want
  },
}));
const PaymentRecived = () => {
  const classes = useStyles();
  const { name, email } = useSelector((state) => state.user.user);
  const [invoices, setInvoices] = useState([]);
  const [customerChallans, setCustomerChallans] = useState([]);
  //   const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);

  const initialState = {
    invoiceId: '',
    mInvoiceId: '',
    currentDateTime: '',
    customerName: '',
    challanNos: [],
    challans: [],
    // dueAmount: '',
    discount: '',
    paybleAmount: '',
    receivingAmount: '',
    dueAdvAmount: '',
  };
  const [invoiceData, setInvoiceData] = useState({ ...initialState });
  // console.log(invoiceData);
  const [challans, setChallans] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [selected, setSelected] = useState([]);
  // console.log(selected);
  //   const options = [
  //     { value: 'chocolate', label: 'Chocolate' },
  //     { value: 'strawberry', label: 'Strawberry' },
  //     { value: 'vanilla', label: 'Vanilla' },
  //   ];
  //////////////////////////////////////
  const [paymentId, setPaymentId] = useState('');
  const [manualId, setManualId] = useState('');
  const [currentDateTime, setCurrentDateTime] = useState(dayjs(new Date()));
  //   const [currentDate, setCurrentDate] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [challan, setChallan] = useState('');
  const [dueAmount, setDueAmount] = useState('0');
  const [discount, setDiscount] = useState('');
  const [paybleAmount, setPaybleAmount] = useState('0');
  const [receivingAmount, setRecivedAmount] = useState('');
  const [dueAdvAmount, setDueAdvAmount] = useState('0');

  /////////////////////////////////////
  const [mongodbId, setMongodbId] = useState();
  const [paymentRecivedDelete, setPaymentRecivedDelete] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  let [recAmount, setRecAmount] = useState('');
  // const [updatepaymentId, setUpdatepaymentId] = useState();
  // const [invoices, setInvoices] = useState({
  //   paymentId: "",
  //   manualId: "",
  //   currentDate: currentDateTime,
  //   customerName: "",
  //   challan: "",
  //   dueAmount: "",
  //   discount: "",
  //   paybleAmount: "",
  //   receivingAmount: "",
  //   dueAdvAmount: "",
  // });
  const columns = [
    { title: 'PaymentId ', field: 'paymentId' },
    { title: 'ManualId', field: 'manualId' },
    { title: 'CurrentDate', field: 'currentDate' },
    { title: 'CustomerName', field: 'customerName' },
    { title: 'Challan', field: 'challan' },
    { title: 'DueAmount', field: 'dueAmount' },
    { title: 'Discount', field: 'discount' },
    { title: 'PaybleAmount', field: 'paybleAmount' },
    { title: 'RecivedAmount', field: 'receivingAmount' },
    { title: 'Due / AdvAmount', field: 'dueAdvAmount' },
  ];

  const getAllCustomers = () => {
    axios
      .get(`/customer/all-customers`)
      .then((res) => {
        setCustomers(res.data.customers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllChallans = () => {
    axios
      .get('challan/all-challans')
      .then((res) => {
        setChallans(res.data.challans);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //////////////////////////////////////////////////////
  const getChallanNos = (custIdName) => {
    const custId = custIdName?.trim()?.split(';')[0];
    let customerChallans = challans.filter((item) => {
      return item.customerName?.trim()?.split(';')[0] === custId;
    });
    // let materialRateInfo = materialRate.find((item) => {
    //   return item.customerName.trim() === custName.trim();
    // });
    // console.log(materialRateInfo);
    // setCustomerChallans(customerChallans);
    return customerChallans.map(
      (el) => `Challan No. - ${el.challanNumber}, Amount:  `
    );
  };

  const getChallansOfCustomer = (challanNosArr) => {
    const customerChallans = challans.filter((el, i, arr) => {
      return challanNosArr.includes(el.challanNumber);
    });
    return customerChallans.map((el) => {
      return { ...el, invoiceId: invoiceData.invoiceId };
    });
  };

  const getDueAdvAmount = (customerIdName) => {
    const custId = customerIdName?.trim()?.split(';')[0];

    const custInvoice = invoices?.filter(
      (el) => el.customerName?.trim()?.split(';')[0] === custId
    );

    const dueAdvAmount = custInvoice.reduce(
      (acc, invoice) => (acc += parseFloat(invoice?.dueAdvAmount)),
      0
    );

    return dueAdvAmount;
  };
  ////////////////////////////////////////////////////////
  const getCustomerPhoneNo = (custName) => {
    // let materialRateInfo = materialRate.filter((item) => {
    //   return item.customerName.trim() === custName.trim();
    // });
    let customer = customers.find((item) => {
      return item.customerName.trim() === custName.trim();
    });
    // console.log(materialRateInfo);
    return customer;
  };

  useEffect(() => {
    setInvoiceData({
      ...invoiceData,
      challanNos: selected?.map((el) =>
        parseFloat(el.split(',')[0]?.slice(14))
      ),
    });
  }, [selected]);

  // useEffect(() => {
  //   setRecAmount(invoiceData?.paybleAmount);
  //   setInvoiceData({
  //     ...invoiceData,
  //     receivingAmount: recAmount,
  //   });
  // }, [invoiceData.paybleAmount]);

  useEffect(() => {
    handleReset();
    getAllCustomers();
    getInvoices();
    getMaxInvoiceId();
    getAllChallans();
    // setPaymentId(getMaxInvoiceId());
  }, [open]);

  //     useEffect(() => {
  //     if(selected.length){
  // // customer challan array = []
  //       // forEach loop on selected array

  //    }
  //     }, [selected]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'customerName') {
      setInvoiceData({
        ...invoiceData,
        [name]: value,
        customerId: value?.split(';')[0],
        challan: '',
      });
      setSelected([]);
      return;
    }
    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  const handleRecAmtChange = (e) => {
    const { name, value } = e.target;
    setRecAmount(value);
    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const invoice = {
      ...invoiceData,
      challans: getChallansOfCustomer(invoiceData?.challanNos),
      createdBy: `Name: ${name}, Email: ${email}`,
      createdAt: Date.now(),
    };
    console.log('SUBMIT🔥🔥🔥', invoice);

    // try {
    //   const response = await axios.post('invoice/create-invoice', invoice);

    //   if (response.status === 201) {
    //     toast.success('Invoice has been added successfully!');
    //   } else {
    //     toast('Invalid Information!');
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast('Invalid Invoice Information!');
    // }

    // setOpen(!open);
    // handleReset();
  };

  // Update the current date and time every second

  const getInvoices = async () => {
    try {
      const response = await axios.get('/invoice/all-invoice');
      setInvoices(response.data.invoices);
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
        receivingAmount: receivingAmount,
        dueAdvAmount: dueAdvAmount,
      });

      toast.success('Material Updated successfully!');
    } catch (error) {
      console.error('An error occurred while updating the unit:', error);
      // //   // Handle the error in your UI, maybe show a notification or error message
    }
    handleReset();
    setUpdate(false);
    setOpen(false);
    getInvoices();
  };

  const onClickDelete = async (rowData) => {
    axios
      .delete(`/paymentrecived/delete/paymentrecieved/${rowData._id}`)
      .then((res) => {
        debugger;
        toast.success('Record has been deleted successfully!');
      })
      .catch((err) => {
        toast('Invalid  Information!');
        console.log(err);
      });
    debugger;
    // alert("Delete = " + rowData.CustId);
    return;
  };
  getInvoices();

  const getMaxInvoiceId = () => {
    if (!invoices || invoices.length === 0) {
      return 1;
    }
    const maxID = invoices.reduce((max, invoices) => {
      const payId = parseInt(invoices.invoiceId);
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
  //     setInvoices();
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
    handleReset();
    // setInvoiceData({
    //   ...initialState,
    // });
    // setCurrentDateTime(dayjs(new Date()));
    // setManualId('');
    // setCustomerName('');
    // setChallan('');
    // setDueAmount('');
    // setDiscount('');
    // setPaybleAmount('');
    // setRecivedAmount('');
    // setDueAdvAmount('');
  };
  const handleReset = () => {
    setInvoiceData({
      ...initialState,
      invoiceId: getMaxInvoiceId(),
      mInvoiceId: 0,
      discount: 0,
      dueAdvAmount: 0,
      currentDateTime: dayjs(new Date()).$d.toLocaleString('en-GB'),
    });
    setSelected([]);
    setCurrentDateTime(dayjs(new Date()));
    // setManualId('');
    // setCustomerName('');
    // setChallan('');
    // setDueAmount('');
    // setDiscount('');
    // setPaybleAmount('');
    // setRecivedAmount('');
    // setDueAdvAmount('');
  };
  const actions = [
    {
      icon: () => <Refresh />,
      tooltip: 'Refresh Data',
      isFreeAction: true,
      onClick: (event, rowData) => {
        getInvoices();
      },
    },
    {
      icon: () => <EditIcon color='primary' />,
      tooltip: 'Edit Factory',
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
        setRecivedAmount(rowData.receivingAmount);
        setDueAdvAmount(rowData.dueAdvAmount);
        getInvoices();
      },
    },
    {
      icon: () => <DeleIcon color='secondary' />,
      tooltip: 'Delete Factory',
      onClick: (event, rowData) => {
        setShowDeleteConfirm(rowData);
        setPaymentRecivedDelete(rowData.customerName);
      },
    },
  ];

  const handleDateTimeChange = (newValue) => {
    setCurrentDateTime(newValue);
    setInvoiceData({
      ...invoiceData,
      currentDateTime: newValue.$d.toLocaleString('en-GB'),
    });
  };
  const invoiceRef = useRef(null);
  const handlePrint = (e) => {
    const printWindowWidth = 1100;
    const printWindowHeight = 700;
    const left = (window.innerWidth - printWindowWidth) / 2; // Adjust the width (600) as needed
    const top = (window.innerHeight - printWindowHeight) / 2; // Adjust the height (800) as needed

    // Create a new window or modal dialog at the center position
    const printWindow = window.open(
      '',
      '',
      `width=${printWindowWidth},height=${printWindowHeight},left=${left},top=${top}`
    );

    // Create the HTML content for the challan
    const invoiceContent = `
    <html>
      <head>
        <title>Challan</title>
        <style>
          @page {
            size: landscape; /* Specify paper size as landscape */
            margin: 0; /* Set margins to zero (or adjust as needed) */
            mso-header-space: 0;
            mso-footer-space: 0;
            page-count: 1; /* Set the maximum number of pages to 1 */
            page-break-inside: avoid; /* Avoid page breaks inside this element */
            page-break-before: avoid; /* Allow page breaks before this element if needed */
            overflow: hidden; /* Hide overflow content */
          }
          * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
          }
          html {
            page-break-inside: avoid; /* Avoid page breaks inside this element */
            page-break-before: avoid; /* Allow page breaks before this element if needed */
            overflow: hidden; /* Hide overflow content */
          }
          body {
            font-family: 'Roboto', Arial, sans-serif;
            font-size: 16px;
            page-break-inside: avoid; /* Avoid page breaks inside this element */
            page-break-before: avoid; /* Allow page breaks before this element if needed */
            overflow: hidden; /* Hide overflow content */
            padding: 3rem;
          }
          hr {
            margin-block-start: 0;
            margin-block-end: 0;
          }
          .container {
            display: flex;
            flex-direction: column;
            row-gap: 1.3rem;
            /* padding: 3rem; */
          }
          .section-1 {
            display: flex;
            justify-content: space-between;
          }
          .section-2 {
            display: flex;
            justify-content: flex-start;
            justify-content: space-between;
          }
          .div-1-section-1 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 2rem;
            row-gap: 0.5rem;

          }
          .div-2-section-1 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 2rem;
            row-gap: 0.5rem;
          }
          .div-1-section-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 3.2rem;
            row-gap: 0.5rem;
          }
          .div-2-section-2 {
            display: flex;
            flex-direction: column;
            column-gap: 2rem;
            row-gap: 0.5rem;
          }
          .div-2-section-2-p {
            display: inline-block;
            margin-right: 1rem;
          }
          .unit{
            font-weight: 700
          }
          .title {
            display: flex;
            flex-direction: column;
            row-gap: 0.3rem;
            align-items: center;
          }
          .title-text {
            font-weight: 700;
          }
          .footer {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          /* Add more styles as needed */
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div class="container">
          <div class="title">
            <h3 class="title-text">SSM</h3>
            <h3 class="title-text">SARBIL STONE MINE</h3>
            <h3 class="title-text">NMD</h3>
          </div>
          <hr />
          <div class="section section-1">
            <div class="div-1-section-1">
              <p>INVOICE NO. :</p>
              <p>${invoiceData.invoiceId}</p>
              <p>CUSTOMER NAME :</p>
              <p>${invoiceData.customerName || ''}</p>
              <p>MOBILE NO. :</p>
              <p>${
                getCustomerPhoneNo(invoiceData.customerName)?.phoneNumber || ''
              }</p>
              <p>DESTINATION :</p>
              <p>${invoiceData.customerDestination || ''}</p>
            </div>
            <div class="div-2-section-1">
              <p>VEHICLE NO. :</p>
              <p>{}</p>
              <p>MATERIAL NAME :</p>
              <p>${invoiceData.materialName || ''}</p>
              <p>SOURCE / MINE :</p>
              <p>${invoiceData.mineSourceName || ''}</p>
            </div>
          </div>
          <hr />
          <div class="section section-2">
            <div class="div-1-section-2">
              <p>GROSS WEIGHT :</p>
              <p>${
                (invoiceData.mGrossWeight
                  ? invoiceData.mGrossWeight
                  : invoiceData.grossweight) || 0
              }</p>
              <p>TARE WEIGHT :</p>
              <p>${invoiceData.emptyWeight || 0}</p>
              <p>NET WEIGHT :</p>
              <p>${invoiceData.netWeight || 0}</p>
            </div>
            <div class="div-2-section-2">
            <p>${
              (invoiceData.mGrossWeightDateTime
                ? invoiceData.mGrossWeightDateTime
                : invoiceData.grossWeightDateTime) || ''
            }</p>
            <p>${invoiceData.emptyWeightDateTime || ''}</p>
            <div>
              <p class="div-2-section-2-p"></p>
              <p class="div-2-section-2-p unit">${invoiceData.unit || ''}</p>
            </div>
            </div>
          </div>
          <hr />

          <div class="section">
            <p>SITE INCHARGE SIGNATURE: </p>
            <p>${invoiceData.siteInchargeName || ''}</p>
          </div>
          <hr />
          <div class="footer">
            <h4>THANK YOU</h4>
            <h4>VISIT AGAIN</h4>
          </div>
        </div>
      </body>
</html>

  `;

    // Write the HTML content to the new window
    printWindow.document.open();
    printWindow.document.write(invoiceContent);
    printWindow.document.close();
    printWindow.print();
  };

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
              Create New Invoice
            </Fab>
          </Grid>
          <Grid item xs={12} sm={12}>
            <MaterialTable
              title=''
              columns={columns}
              data={invoices}
              // icons={tableIcons}
              actions={actions}
              options={{
                sorting: true,
                search: true,
                searchFieldAlignment: 'right',
                searchAutoFocus: true,
                searchFieldVariant: 'standard',
                filtering: true,
                paging: true,
                pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
                pageSize: 10,
                paginationType: 'stepped',
                showFirstLastPageButtons: false,
                paginationPosition: 'both',
                exportButton: true,
                exportAllData: true,
                exportFileName: 'Payment Recived',
                addRowPosition: 'first',
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
                  index % 2 === 0 ? { background: '#f5f5f5' } : null,
                headerStyle: { background: '#f44336', color: '#fff' },
              }}
            />
          </Grid>
        </Grid>
        <Dialog
          fullWidth
          maxWidth='md'
          disableBackdropClick={true}
          open={open}
          onClose={handleClose}
          aria-labelledby='max-width-dialog-title'
        >
          <DialogTitle id='max-width-dialog-title'>
            <Grid
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              container
            >
              <Grid item xs={12} sm={11}>
                {/* style={{ justifyContent: 'center' }} */}
                <Grid container>
                  <Typography
                    style={{ display: 'inline-block' }}
                    variant='h5'
                    fontWeight={700}
                  >
                    Invoice
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button
                  color='secondary'
                  onClick={handleClose}
                  variant='contained'
                >
                  &#10539;
                </Button>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <div>
              <ToastContainer
                position='top-center'
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
                      value={invoiceData.invoiceId}
                      autoComplete='invoiceId'
                      name='invoiceId'
                      variant='outlined'
                      fullWidth
                      id='invoiceId'
                      label='Invoice Id'
                      onChange={handleChange}
                      //   onChange={(e) => setPaymentId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      value={invoiceData.mInvoiceId}
                      autoComplete='mInvoiceId'
                      name='mInvoiceId'
                      variant='outlined'
                      fullWidth
                      id='mInvoiceId'
                      label='Manual Invoice Id'
                      onChange={handleChange}
                      //   onChange={(e) => setManualId(e.target.value)}
                      // autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <Box>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          name='currentDate'
                          label='Invoice Date'
                          value={currentDateTime}
                          onChange={handleDateTimeChange}
                          renderInput={(params) => (
                            <TextField
                              variant='outlined'
                              style={{
                                width: '100%',
                              }}
                              {...params}
                            />
                          )}
                        />
                      </LocalizationProvider>
                    </Box>
                    {/* <TextField
                      //   type="date"
                      disabled={true}
                      value={currentDateTime.toLocaleString('en-GB')}
                      required
                      autoComplete='date'
                      name='currentDateTime'
                      variant='outlined'
                      fullWidth
                      id='currentDateTime'
                      label=' Current Date / Time'
                      //   onChange={handleChange}
                      //   onChange={(e) => setSourceName(e.target.value)}
                    /> */}
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id='demo-simple-select-label'
                          variant='outlined'
                        >
                          Select Customer
                        </InputLabel>
                        <Select
                          variant='outlined'
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          name='customerName'
                          value={invoiceData.customerName}
                          label='Select Customer'
                          onChange={handleChange}
                          // onChange={(e) => setCustomerName(e.target.value)}
                        >
                          {[
                            ...new Set(
                              challans.map((challan) => challan.customerName)
                            ),
                          ].map((el, i) => (
                            <MenuItem key={i} value={el}>
                              {`ID: ${el.split(';')[0]} - ${el.split(';')[1]}`}
                            </MenuItem>
                          ))}
                          {/* <MenuItem value='Mohammad Musharaf'>
                            Mohammad Musharaf
                          </MenuItem>
                          <MenuItem value='Afroz khan'>Afroz khan</MenuItem>
                          <MenuItem value='Zaf khan'>Zaf khan</MenuItem> */}
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Box>
                      <MultiSelectDropDown
                        options={getChallanNos(invoiceData.customerName)}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled={true}
                      value={getDueAdvAmount(invoiceData?.customerName)}
                      autoComplete='dueAmount'
                      name='dueAmount'
                      variant='outlined'
                      fullWidth
                      id='dueAmount'
                      label='Previous Due Amount'
                      // onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={invoiceData.discount}
                      autoComplete='discount'
                      name='discount'
                      variant='outlined'
                      fullWidth
                      id='discount'
                      label='Discount'
                      onChange={handleChange}
                      //   onChange={(e) => setDiscount(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      // disabled={true}
                      value={invoiceData.paybleAmount}
                      autoComplete='paybleAmount'
                      name='paybleAmount'
                      variant='outlined'
                      fullWidth
                      id='paybleAmount'
                      label='Payble Amount'
                      onChange={handleChange}
                      //   onChange={(e) => setPaybleAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      value={recAmount}
                      autoComplete='receivingAmount'
                      name='receivingAmount'
                      variant='outlined'
                      fullWidth
                      id='receivingAmount'
                      label='Receiving Amount'
                      onChange={handleRecAmtChange}
                      //   onChange={(e) => setRecivedAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      disabled={true}
                      type='dueAdvAmount'
                      value={
                        invoiceData?.paybleAmount - invoiceData?.receivingAmount
                      }
                      autoComplete='dueAdvAmount'
                      name='dueAdvAmount'
                      variant='outlined'
                      fullWidth
                      id='dueAdvAmount'
                      label='Current Due/Adv Amount'
                      // onChange={handleChange}
                      //   onChange={(e) => setDueAdvAmount(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                      // className={classes.submit}
                    >
                      Save Invoice
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      //   type="print"
                      fullWidth
                      variant='contained'
                      color='primary'
                      onClick={handlePrint}
                      // className={classes.submit}
                    >
                      Print
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant='contained'
                      color='primary'
                      fullWidth
                      onClick={() => handleReset()}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      color='secondary'
                      onClick={handleClose}
                      fullWidth
                      variant='contained'
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
          maxWidth='md'
          disableBackdropClick={true}
          open={update}
          onClose={handleClose}
          aria-labelledby='max-width-dialog-title'
        >
          <DialogTitle id='max-width-dialog-title'>
            <Grid
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              container
            >
              <Grid item xs={12} sm={11}>
                {/* style={{ justifyContent: 'center' }} */}
                <Grid container>
                  <Typography
                    style={{ display: 'inline-block' }}
                    variant='h5'
                    fontWeight={700}
                  >
                    Payment Recived
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button
                  color='secondary'
                  onClick={handleClose}
                  variant='contained'
                >
                  &#10539;
                </Button>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <div>
              <ToastContainer
                position='top-center'
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
                      autoComplete='paymentId'
                      name='paymentId'
                      variant='outlined'
                      fullWidth
                      id='paymentId'
                      label='Payment Id'
                      // onChange={handleChange}
                      onChange={(e) => setPaymentId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      value={manualId}
                      autoComplete='manualId'
                      name='manualId'
                      variant='outlined'
                      fullWidth
                      id='manualId'
                      label='Manual Id'
                      // onChange={handleChange}
                      onChange={(e) => setManualId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      //   type="date"
                      disabled={true}
                      value={currentDateTime.toLocaleString('en-GB')}
                      required
                      autoComplete='date'
                      name='currentDateTime'
                      variant='outlined'
                      fullWidth
                      id='currentDateTime'
                      label=' Current Date / Time'
                      //   onChange={handleChange}
                      //   onChange={(e) => setSourceName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id='demo-simple-select-label'
                          variant='outlined'
                        >
                          Customer List
                        </InputLabel>
                        <Select
                          variant='outlined'
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          name='customerName'
                          value={customerName}
                          label='Customer List'
                          onChange={handlecustomerChange}
                          // onChange={(e) => setCustomerName(e.target.value)}
                        >
                          <MenuItem value='Mohammad Musharaf'>
                            Mohammad Musharaf
                          </MenuItem>
                          <MenuItem value='Afroz khan'>Afroz khan</MenuItem>
                          <MenuItem value='Zaf khan'>Zaf khan</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id='demo-simple-select-label'
                          variant='outlined'
                        >
                          Challan List
                        </InputLabel>
                        <Select
                          variant='outlined'
                          labelId='demo-simple-select-label'
                          id='demo-simple-select'
                          name='challan'
                          value={challan}
                          label='Challan List'
                          // onChange={handleChange}
                          onChange={handleChallanChange}
                        >
                          <MenuItem value='Challan 1'>Challan 1</MenuItem>
                          <MenuItem value='Challan 2'>Challan 2</MenuItem>
                          <MenuItem value='Challan 3'>Challan 3</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      disabled={true}
                      type='dueAmount'
                      value={dueAmount}
                      autoComplete='dueAmount'
                      name='dueAmount'
                      variant='outlined'
                      fullWidth
                      id='dueAmount'
                      label='DueAmount'
                      onChange={(e) => setDueAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      type='discount'
                      value={discount}
                      autoComplete='discount'
                      name='discount'
                      variant='outlined'
                      fullWidth
                      id='discount'
                      label='Discount'
                      onChange={(e) => setDiscount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      disabled
                      type='dueAmount'
                      value={paybleAmount}
                      autoComplete='paybleAmount'
                      name='paybleAmount'
                      variant='outlined'
                      fullWidth
                      id='paybleAmount'
                      label='Payble Amount'
                      onChange={(e) => setPaybleAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <TextField
                      type='receivingAmount'
                      value={receivingAmount}
                      autoComplete='receivingAmount'
                      name='receivingAmount'
                      variant='outlined'
                      fullWidth
                      id='receivingAmount'
                      label='Recived Amount'
                      onChange={(e) => setRecivedAmount(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={7}>
                    <TextField
                      disabled
                      type='dueAdvAmount'
                      value={dueAdvAmount}
                      autoComplete='dueAdvAmount'
                      name='dueAdvAmount'
                      variant='outlined'
                      fullWidth
                      id='dueAdvAmount'
                      label='Due/Adv Amount'
                      onChange={(e) => setDueAdvAmount(e.target.value)}
                    />
                  </Grid>
                  {/* =========================================== */}
                  <Grid item xs={12} sm={3}>
                    <Button
                      type='submit'
                      fullWidth
                      variant='contained'
                      color='primary'
                      // className={classes.submit}
                    >
                      Update Payment
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      //   type="print"
                      fullWidth
                      variant='contained'
                      color='primary'
                      onClick={() => window.print()}
                      // className={classes.submit}
                    >
                      Print
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant='contained'
                      color='primary'
                      fullWidth
                      onClick={() => handleReset()}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      color='secondary'
                      onClick={handleClose}
                      fullWidth
                      variant='contained'
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
          maxWidth='sm' // You can set it to 'xs', 'sm', 'md', 'lg', or 'false'
          fullWidth={true}
          onClose={() => setShowDeleteConfirm(false)}
          aria-labelledby='alert-dialog-title '
          aria-describedby='alert-dialog-description '
        >
          <DialogTitle id='alert-dialog-title'>{'Confirm Delete'}</DialogTitle>
          <DialogContent>
            <DialogContentText
              id='alert-dialog-description'
              classes={{ root: classes.customDialogContent }}
            >
              Are you sure you want to delete this
              <span className={classes.deleteName}>
                {`' ${paymentRecivedDelete} '`}
              </span>{' '}
              record?
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
                  color='primary'
                >
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
                    onClickDelete(showDeleteConfirm);
                    getInvoices();
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

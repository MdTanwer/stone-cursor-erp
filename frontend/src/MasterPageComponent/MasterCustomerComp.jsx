import React, { useState, Component, useEffect, forwardRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TextField, Typography } from '@mui/material';

import axios from 'axios';
// import jsPDF from 'jspdf';
import 'jspdf-autotable';
import Checkbox from '@mui/material/Checkbox';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirm } from 'react-confirm-box';

// import {
//   DialogActions,
//   DialogContent,
//   DialogTitle,
// } from '@mui/material';
import BankDetails from '../components/bankDetails';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewCustomer,
  createNewCustomerFail,
  createNewCustomerReq,
} from '../redux/customer/customerSlice';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@material-ui/core';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

export const useStyles = makeStyles((theme) => ({
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
}));

export default function MasterCustomerComp({
  getMaxCustomerId,
  openMasterCustomer,
  setOpenMasterCustomer,
}) {
  const {
    accountHolderName,
    bankName,
    accountNumber,
    ifscCode,
    branchAddress,
    accountType,
  } = useSelector((state) => state.bank);

  const { name, email } = useSelector((state) => state.user.user);
  console.log(name, email);
  // const { success, deleteSuccess, updateSuccess } = useSelector(
  //   (state) => state.customer
  // );

  const [isDisable, setIsDisable] = useState(false);
  const classes = useStyles();
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const [customerData, setCustomerData] = useState({
    customerId: '',
    customerName: '',
    phoneNumber: '',
    whatsAppNumber: '',
    email: '',
    panNumber: '',
    gstNumber: '',
    city: '',
    customerAddress: '',
    pinCode: '',
    isActive: true,
  });

  console.log(customerData);

  // const [rowId, setRowId] = useState('');
  // const [open, setOpen] = useState(false);
  // const [updateOpen, setUpdateOpen] = useState(false);
  // const [isActive, setIsActive] = useState(true);
  // const [createdBy, setCreatedBy] = useState('');

  useEffect(() => {
    setCustomerData({
      ...customerData,
      customerId: getMaxCustomerId(),
    });
    getAllCustomers();
  }, []);

  const getAllCustomers = () => {
    axios
      .get(`/customer/all-customers`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleCheckChange = (e) => {
    setCustomerData({
      ...customerData,
      isActive: !customerData.isActive,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append('customerId', customerData.customerId);
    newFormData.append('customerName', customerData.customerName);
    newFormData.append('phoneNumber', customerData.phoneNumber);
    newFormData.append('whatsAppNumber', customerData.whatsAppNumber);
    newFormData.append('email', customerData.email);
    newFormData.append('panNumber', customerData.panNumber);
    newFormData.append('gstNumber', customerData.gstNumber);
    newFormData.append('city', customerData.city);
    newFormData.append('pinCode', customerData.pinCode);
    newFormData.append('customerAddress', customerData.customerAddress);
    newFormData.append('createdBy', `Name: ${name}, Email: ${email}`);
    newFormData.append('createdAt', Date.now());
    newFormData.append('isActive', customerData.isActive);
    newFormData.append('accountHolderName', accountHolderName);
    newFormData.append('bankName', bankName);
    newFormData.append('accountNumber', accountNumber);
    newFormData.append('ifscCode', ifscCode);
    newFormData.append('branchAddress', branchAddress);
    newFormData.append('accountType', accountType);
    let newForm = Object.fromEntries(newFormData);

    try {
      dispatch(createNewCustomerReq());

      const { data } = await axios.post(`/customer/create-customer`, newForm);

      if (data?.success === true) {
        dispatch(createNewCustomer(data.customer));
        toast.success('Customer Added Successfully');
        getAllCustomers();
        handleCloseCancel();
        getMaxCustomerId();
      }
    } catch (err) {
      dispatch(createNewCustomerFail({ err }));
    }
  };

  const handleCloseCancel = () => {
    setOpenMasterCustomer(false);
    handleReset();
  };

  const handleReset = () => {
    const maxCustomerId = getMaxCustomerId();
    setCustomerData({
      ...customerData,
      customerId: maxCustomerId,
      isActive: true,
      customerName: '',
      phoneNumber: '',
      whatsAppNumber: '',
      email: '',
      panNumber: '',
      gstNumber: '',
      city: '',
      pinCode: '',
      customerAddress: '',
    });
  };

  return (
    <>
      <Dialog
        // onBackdropClick={handleClose}
        fullWidth
        maxWidth='md'
        open={openMasterCustomer}
        disableBackdropClick={true}
        onClose={handleCloseCancel}
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
                Create New Customer
              </Typography>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                color='secondary'
                onClick={handleCloseCancel}
                variant='contained'
              >
                &#10539;
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>

        <DialogContent>
          <div>
            <form className={classes.form} >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <TextField
                    disabled={true}
                    // value={customerData.customerId}
                    value={getMaxCustomerId()}
                    // autoComplete='customerName'
                    name='customerId'
                    variant='outlined'
                    fullWidth
                    id='customerId'
                    label='Customer ID'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    disabled={isDisable}
                    value={customerData.customerName}
                    // autoComplete='customerName'
                    name='customerName'
                    variant='outlined'
                    fullWidth
                    id='customerName'
                    label='Customer Name'
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    type='number'
                    disabled={isDisable}
                    value={customerData.phoneNumber}
                    // autoComplete='phoneNumber'
                    name='phoneNumber'
                    variant='outlined'
                    fullWidth
                    id='phoneNumber'
                    label='Phone Number'
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    type='number'
                    disabled={isDisable}
                    value={customerData.whatsAppNumber}
                    // autoComplete='whatsAppNumber'
                    name='whatsAppNumber'
                    variant='outlined'
                    fullWidth
                    id='whatsAppNumber'
                    label='WhatsApp Number'
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    type='email'
                    disabled={isDisable}
                    value={customerData.email}
                    // autoComplete='email'
                    name='email'
                    variant='outlined'
                    fullWidth
                    id='email'
                    label='Email'
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    disabled={isDisable}
                    value={customerData.panNumber}
                    // autoComplete='panNumber'
                    name='panNumber'
                    variant='outlined'
                    fullWidth
                    id='panNumber'
                    label='Pan Number'
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    disabled={isDisable}
                    value={customerData.gstNumber}
                    // autoComplete='gstNumber'
                    name='gstNumber'
                    variant='outlined'
                    fullWidth
                    id='gstNumber'
                    label='GSTIN'
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    disabled={isDisable}
                    value={customerData.city}
                    // autoComplete='city'
                    name='city'
                    variant='outlined'
                    fullWidth
                    id='city'
                    label='City'
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    // disabled={isDisable}
                    value={customerData.pinCode}
                    // autoComplete='city'
                    name='pinCode'
                    variant='outlined'
                    fullWidth
                    id='pinCode'
                    label='Pin Code'
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    disabled={isDisable}
                    value={customerData.customerAddress}
                    // autoComplete='customerAddress'
                    name='customerAddress'
                    variant='outlined'
                    fullWidth
                    id='customerAddress'
                    label='Customer Address'
                    onChange={handleChange}
                    autoFocus
                    multiline
                    minRows={1}
                  />
                </Grid>
                <BankDetails />
                <Grid item xs={12} sm={5}>
                  <label>IsActive</label>
                  <Checkbox
                    {...label}
                    name='isActive'
                    value={customerData.isActive}
                    checked={customerData.isActive}
                    onChange={handleCheckChange}
                    color='primary'
                    size='medium'
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    name='submit'
                    // type='submit'
                    onClick={handleSubmit}
                    fullWidth
                    variant='contained'
                    color='primary'
                  // className={classes.submit}
                  >
                    Save Customer Details
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
                    onClick={() => handleCloseCancel()}
                  >
                    Cancel
                  </Button>
                </Grid>
              </Grid>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

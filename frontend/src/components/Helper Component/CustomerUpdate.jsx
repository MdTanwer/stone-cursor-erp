import {
  Autocomplete,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useStyles } from '../../pages/customer';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateCustomer,
  updateCustomerFail,
  updateCustomerReq,
} from '../../redux/customer/customerSlice';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const CustomerUpdateForm = ({ updateOpen, setUpdateOpen, rowId, setData }) => {
  const classes = useStyles();
  const bankNames = [
    'State Bank of India',
    'HDFC Bank',
    'ICICI Bank',
    'Axis Bank',
    'Punjab National Bank',
    'CBI - Central Bank of India',
    'BOB',
    'BOI',
    // Add more bank names here
  ];
  const dispatch = useDispatch();
  const { name, email } = useSelector((state) => state.user.user);
  const [customerData, setCustomerData] = useState({
    bankName: '',
    accountType: '',
    isActive: true,
  });

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

  const getCustomer = () => {
    const id = rowId;
    axios
      .get(`/customer/customer-info/${id}`)
      .then((res) => {
        setCustomerData(res.data.customer);
        // setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCustomer();
  }, [rowId]);

  const handleBankChange = (event, newValue) => {
    setCustomerData({
      ...customerData,
      bankName: newValue,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData({
      ...customerData,
      [name]: value,
    });
  };

  const handleCheckChange = () => {
    setCustomerData({
      ...customerData,
      isActive: !customerData.isActive,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const date = new Date();
    const newFormData = new FormData();
    // newFormData.append('customerId', customerData.customerId);
    newFormData.append('customerName', customerData.customerName);
    newFormData.append('phoneNumber', customerData.phoneNumber);
    newFormData.append('whatsAppNumber', customerData.whatsAppNumber);
    newFormData.append('email', customerData.email);
    newFormData.append('panNumber', customerData.panNumber);
    newFormData.append('gstNumber', customerData.gstNumber);
    newFormData.append('city', customerData.city);
    newFormData.append('pinCode', customerData.pinCode);
    newFormData.append('customerAddress', customerData.customerAddress);
    // newFormData.append('createdBy', customerData.createdBy);
    newFormData.append('updatedBy', `Name: ${name}, Email: ${email}`);
    // newFormData.append('createdAt', customerData.createdAt);
    newFormData.append('updatedAt', Date.now());
    newFormData.append('isActive', customerData.isActive);
    newFormData.append('accountHolderName', customerData.accountHolderName);
    newFormData.append('bankName', customerData.bankName);
    newFormData.append('accountNumber', customerData.accountNumber);
    newFormData.append('ifscCode', customerData.ifscCode);
    newFormData.append('branchAddress', customerData.branchAddress);
    newFormData.append('accountType', customerData.accountType);
    let newForm = Object.fromEntries(newFormData);

    try {
      dispatch(updateCustomerReq());
      const id = rowId;
      const { data } = await axios.put(
        `/customer/update-customer-info/${id}`,
        newForm
      );

      if (data?.success === true) {
        dispatch(updateCustomer());
        toast.success('Customer Updated Successfully');
        getAllCustomers();
        handleCloseCancel();
        //   getMaxCustomerId();
      }
    } catch (err) {
      dispatch(updateCustomerFail({ err }));
    }
  };

  const handleCloseCancel = () => {
    setUpdateOpen(false);
    getCustomer();
    // setCustomerData({
    //   ...customerData,
    // });
  };

  const handleReset = () => {
    getCustomer();
    // setCustomerData({
    //   ...customerData,
    // });
  };

  return (
    <>
      <Dialog
        // onBackdropClick={handleClose}
        fullWidth
        maxWidth='md'
        open={updateOpen}
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
                Update Customer Details
              </Typography>
            </Grid>
            <Grid item xs={12} sm={1}>
              <Button
                color='error'
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
            <ToastContainer
              position='bottom-center'
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
                    value={customerData.customerId}
                    name='customerId'
                    variant='outlined'
                    fullWidth
                    id='customerId'
                    label='Customer ID'
                    // onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoFocus

                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    // disabled={isDisable}
                    value={customerData.customerName}
                    autoComplete='customerName'
                    name='customerName'
                    variant='outlined'
                    fullWidth
                    id='customerName'
                    label='Customer Name'
                    onChange={handleChange}
                    // onChange={(e) => setCustomerName(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoFocus

                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    type='number'
                    // disabled={isDisable}
                    value={customerData.phoneNumber}
                    // autoComplete='phoneNumber'
                    name='phoneNumber'
                    variant='outlined'
                    fullWidth
                    id='phoneNumber'
                    label='Phone Number'
                    onChange={handleChange}
                    // onChange={(e) => setPhoneNumber(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoFocus

                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    type='number'
                    // disabled={isDisable}
                    value={customerData.whatsAppNumber}
                    // autoComplete='whatsAppNumber'
                    name='whatsAppNumber'
                    variant='outlined'
                    fullWidth
                    id='whatsAppNumber'
                    label='WhatsApp Number'
                    onChange={handleChange}
                    // onChange={(e) => setWhatsAppNumber(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoFocus

                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    type='email'
                    // disabled={isDisable}
                    value={customerData.email}
                    // autoComplete='email'
                    name='email'
                    variant='outlined'
                    fullWidth
                    id='email'
                    label='Email'
                    onChange={handleChange}
                    // onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoFocus

                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // disabled={isDisable}
                    value={customerData.panNumber}
                    // autoComplete='panNumber'
                    name='panNumber'
                    variant='outlined'
                    fullWidth
                    id='panNumber'
                    label='Pan Number'
                    onChange={handleChange}
                    // onChange={(e) => setPanNumber(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoFocus

                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // disabled={isDisable}
                    value={customerData.gstNumber}
                    // autoComplete='gstNumber'
                    name='gstNumber'
                    variant='outlined'
                    fullWidth
                    id='gstNumber'
                    label='GSTIN'
                    onChange={handleChange}
                    // onChange={(e) => setGstNumber(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoFocus

                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // disabled={isDisable}
                    value={customerData.city}
                    // autoComplete='city'
                    name='city'
                    variant='outlined'
                    fullWidth
                    id='city'
                    label='City'
                    onChange={handleChange}
                    // onChange={(e) => setCity(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                    // onChange={(e) => setCity(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoFocus

                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    // disabled={isDisable}
                    value={customerData.customerAddress}
                    // autoComplete='customerAddress'
                    name='customerAddress'
                    variant='outlined'
                    fullWidth
                    id='customerAddress'
                    label='Customer Address'
                    onChange={handleChange}
                    // onChange={(e) => setAddress(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    autoFocus

                    multiline
                    minRows={1}
                  />
                </Grid>
                {/* <Grid item xs={12} sm={12}>
                  <BankDetails />
                </Grid> */}
                <Grid item xs={12} sm={12}>
                  <Typography variant='h5' fontWeight={700}>
                    Update Bank Details
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    variant='outlined'
                    type='text'
                    name='accountHolderName'
                    value={customerData.accountHolderName}
                    fullWidth
                    id='accountHolderName'
                    label='Account Holder Name'
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    id='bank-autocomplete'
                    name='bankName'
                    options={bankNames}
                    getOptionLabel={(option) => option}
                    value={customerData.bankName}
                    // onChange={handleChange}
                    onChange={handleBankChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Bank Name'
                        variant='outlined'
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    )}
                    PaperComponent={({ children }) => (
                      <Paper style={{ maxHeight: 200, overflow: 'auto' }}>
                        {children}
                      </Paper>
                    )}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    variant='outlined'
                    type='text'
                    value={customerData.accountNumber}
                    fullWidth
                    id='accountno'
                    name='accountNumber'
                    label='Account Number'
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    value={customerData.ifscCode}
                    id='ifsc'
                    name='ifscCode'
                    label='Ifsc Code'
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    value={customerData.branchAddress}
                    id='Branch'
                    name='branchAddress'
                    label='Branch Aaddress'
                    onChange={handleChange}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>
                      Account Type
                    </InputLabel>
                    <Select
                      name='accountType'
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={customerData.accountType}
                      label='Account Type'
                      onChange={handleChange}
                    >
                      <MenuItem value={'Saving Account'}>
                        Saving Account
                      </MenuItem>
                      <MenuItem value={'Current Account'}>
                        Current Account
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <label>IsActive</label>
                  <Checkbox
                    {...label}
                    name='isActive'
                    value={customerData.isActive}
                    // checked={customerData.active}
                    checked={customerData.isActive}
                    // onChange={handleChange}
                    onChange={handleCheckChange}
                    color='primary'
                    size='medium'
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    name='submit'
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
                  // className={classes.submit}
                  >
                    Update Customer Details
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
                    color='error'
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
};

export default CustomerUpdateForm;

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
import DropdownComp from './DropDownComp';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { updateVendor, updateVendorFail, updateVendorReq } from '../../redux/vendor/vendorSlice';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const VendorUpdateForm = ({ updateOpen, setUpdateOpen, rowId }) => {
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
  const [vendorData, setVendorData] = useState({});
  console.log(vendorData);
  console.log(rowId);
  //   const [data, setData] = useState({});

  const getVendor = () => {
    const id = rowId;
    axios
      .get(`/vendormaster/vendor-info/${id}`)
      .then((res) => {
        setVendorData(res.data.vendor);
        // setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getVendor();
  }, [rowId]);

  const handleBankChange = (event, newValue) => {
    setVendorData({
      ...vendorData,
      bankName: newValue,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorData({
      ...vendorData,
      [name]: value,
    });
  };

  const handleCheckChange = () => {
    setVendorData({
      ...vendorData,
      isActive: !vendorData.isActive,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    // newFormData.append('customerId', vendorData.customerId);
    newFormData.append('vendorName', vendorData.vendorName);
    newFormData.append('phoneNumber', vendorData.phoneNumber);
    newFormData.append('whatsAppNumber', vendorData.whatsAppNumber);
    newFormData.append('email', vendorData.email);
    newFormData.append('panNumber', vendorData.panNumber);
    newFormData.append('gstNumber', vendorData.gstNumber);
    newFormData.append('city', vendorData.city);
    newFormData.append('pinCode', vendorData.pinCode);
    newFormData.append('vendorAddress', vendorData.vendorAddress);
    // newFormData.append('createdBy', vendorData.createdBy);
    newFormData.append('updatedBy', `Name: ${name}, Email: ${email}`);
    // newFormData.append('createdAt', vendorData.createdAt);
    newFormData.append('updatedAt', Date.now());
    newFormData.append('isActive', vendorData.isActive);
    newFormData.append('accountHolderName', vendorData.accountHolderName);
    newFormData.append('bankName', vendorData.bankName);
    newFormData.append('accountNumber', vendorData.accountNumber);
    newFormData.append('ifscCode', vendorData.ifscCode);
    newFormData.append('branchAddress', vendorData.branchAddress);
    newFormData.append('accountType', vendorData.accountType);
    let newForm = Object.fromEntries(newFormData);

    try {
      dispatch(updateVendorReq());
      const id = rowId;
      const { data } = await axios.put(
        `/vendormaster/update-vendor-info/${id}`,
        newForm
      );

      if (data?.success === true) {
        dispatch(updateVendor());
        toast.success('Vendor Updated Successfully');
        //   getAllCustomers();
        handleCloseCancel();
        //   getMaxCustomerId();
      }
    } catch (err) {
      dispatch(updateVendorFail({ err }));
    }
  };

  const handleCloseCancel = () => {
    setUpdateOpen(false);
    getVendor();
    // setCustomerData({
    //   ...customerData,
    // });
  };

  const handleReset = () => {
    getVendor();
    // setCustomerData({
    //   ...customerData,
    // });
  };

  return (
    <>
      <Dialog
        // onBackdropClick={handleClose}
        fullWidth
        maxWidth='lg'
        open={updateOpen}
        // disableBackdropClick={true}
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
                Update Vendor Details
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
                    value={vendorData.vendorId}
                    name='vendorId'
                    variant='outlined'
                    fullWidth
                    id='vendorId'
                    label='Vendor ID'
                    // onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    // disabled={isDisable}
                    value={vendorData.vendorName}
                    // autoComplete='customerName'
                    name='vendorName'
                    variant='outlined'
                    fullWidth
                    id='vendorName'
                    label='Vendor Name'
                    onChange={handleChange}
                    // onChange={(e) => setCustomerName(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    type='number'
                    // disabled={isDisable}
                    value={vendorData.phoneNumber}
                    // autoComplete='phoneNumber'
                    name='phoneNumber'
                    variant='outlined'
                    fullWidth
                    id='phoneNumber'
                    label='Phone Number'
                    onChange={handleChange}
                    // onChange={(e) => setPhoneNumber(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    type='number'
                    // disabled={isDisable}
                    value={vendorData.whatsAppNumber}
                    // autoComplete='whatsAppNumber'
                    name='whatsAppNumber'
                    variant='outlined'
                    fullWidth
                    id='whatsAppNumber'
                    label='WhatsApp Number'
                    onChange={handleChange}
                    // onChange={(e) => setWhatsAppNumber(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    type='email'
                    // disabled={isDisable}
                    value={vendorData.email}
                    // autoComplete='email'
                    name='email'
                    variant='outlined'
                    fullWidth
                    id='email'
                    label='Email'
                    onChange={handleChange}
                    // onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // disabled={isDisable}
                    value={vendorData.panNumber}
                    // autoComplete='panNumber'
                    name='panNumber'
                    variant='outlined'
                    fullWidth
                    id='panNumber'
                    label='Pan Number'
                    onChange={handleChange}
                    // onChange={(e) => setPanNumber(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // disabled={isDisable}
                    value={vendorData.gstNumber}
                    // autoComplete='gstNumber'
                    name='gstNumber'
                    variant='outlined'
                    fullWidth
                    id='gstNumber'
                    label='GSTIN'
                    onChange={handleChange}
                    // onChange={(e) => setGstNumber(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // disabled={isDisable}
                    value={vendorData.city}
                    // autoComplete='city'
                    name='city'
                    variant='outlined'
                    fullWidth
                    id='city'
                    label='City'
                    onChange={handleChange}
                    // onChange={(e) => setCity(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    // disabled={isDisable}
                    value={vendorData.pinCode}
                    // autoComplete='city'
                    name='pinCode'
                    variant='outlined'
                    fullWidth
                    id='pinCode'
                    label='Pin Code'
                    onChange={handleChange}
                    // onChange={(e) => setCity(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={10}>
                  <TextField
                    // disabled={isDisable}
                    value={vendorData.vendorAddress}
                    // autoComplete='vendorAddress'
                    name='vendorAddress'
                    variant='outlined'
                    fullWidth
                    id='vendorAddress'
                    label='Vendor Address'
                    onChange={handleChange}
                    // onChange={(e) => setAddress(e.target.value)}
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
                    value={vendorData.accountHolderName}
                    fullWidth
                    id='accountHolderName'
                    label='Account Holder Name'
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Autocomplete
                    id='bank-autocomplete'
                    name='bankName'
                    options={bankNames}
                    getOptionLabel={(option) => option}
                    value={vendorData.bankName}
                    // onChange={handleChange}
                    onChange={handleBankChange}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label='Bank Name'
                        variant='outlined'
                        fullWidth
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
                    value={vendorData.accountNumber}
                    fullWidth
                    id='accountno'
                    name='accountNumber'
                    label='Account Number'
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    value={vendorData.ifscCode}
                    id='ifsc'
                    name='ifscCode'
                    label='Ifsc Code'
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    variant='outlined'
                    fullWidth
                    value={vendorData.branchAddress}
                    id='Branch'
                    name='branchAddress'
                    label='Branch Aaddress'
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <FormControl fullWidth>
                    <InputLabel id='demo-simple-select-label'>Age</InputLabel>
                    <Select
                      name='accountType'
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={vendorData.accountType}
                      label='Age'
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
                    value={vendorData.isActive}
                    // checked={vendorData.active}
                    checked={vendorData.isActive}
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

export default VendorUpdateForm;

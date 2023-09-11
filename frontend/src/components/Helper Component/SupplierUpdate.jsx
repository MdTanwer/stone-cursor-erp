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
import {
  updateSupplier,
  updateSupplierFail,
  updateSupplierReq,
} from '../../redux/supplier/supplierSlice';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const SupplierUpdateForm = ({ updateOpen, setUpdateOpen, rowId, setData }) => {
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
  const [supplierData, setSupplierData] = useState({
    bankName: '',
    accountType: '',
    isActive: true,
  });
  console.log(supplierData);
  const getAllSuppliers = () => {
    axios
      .get(`/supplier/all-suppliers`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSupplier = () => {
    const id = rowId;
    axios
      .get(`/supplier/supplier-info/${id}`)
      .then((res) => {
        setSupplierData(res.data.supplier);
        // setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSupplier();
  }, [rowId]);

  const handleBankChange = (event, newValue) => {
    setSupplierData({
      ...supplierData,
      bankName: newValue,
    });
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
  };

  const handleCheckChange = () => {
    setSupplierData({
      ...supplierData,
      isActive: !supplierData.isActive,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    // const date = new Date();
    const newFormData = new FormData();
    // newFormData.append('customerId', supplierData.customerId);
    newFormData.append('supplierName', supplierData.supplierName);
    newFormData.append('phoneNumber', supplierData.phoneNumber);
    newFormData.append('whatsAppNumber', supplierData.whatsAppNumber);
    newFormData.append('email', supplierData.email);
    newFormData.append('panNumber', supplierData.panNumber);
    newFormData.append('gstNumber', supplierData.gstNumber);
    newFormData.append('city', supplierData.city);
    newFormData.append('pinCode', supplierData.pinCode);
    newFormData.append('supplierAddress', supplierData.supplierAddress);
    // newFormData.append('createdBy', supplierData.createdBy);
    newFormData.append('updatedBy', `Name: ${name}, Email: ${email}`);
    // newFormData.append('createdAt', supplierData.createdAt);
    newFormData.append('updatedAt', Date.now());
    newFormData.append('isActive', supplierData.isActive);
    newFormData.append('accountHolderName', supplierData.accountHolderName);
    newFormData.append('bankName', supplierData.bankName);
    newFormData.append('accountNumber', supplierData.accountNumber);
    newFormData.append('ifscCode', supplierData.ifscCode);
    newFormData.append('branchAddress', supplierData.branchAddress);
    newFormData.append('accountType', supplierData.accountType);
    let newForm = Object.fromEntries(newFormData);

    try {
      dispatch(updateSupplierReq());
      const id = rowId;
      const { data } = await axios.put(
        `/supplier/update-supplier-info/${id}`,
        newForm
      );

      if (data?.success === true) {
        dispatch(updateSupplier());
        toast.success('Supplier Updated Successfully');
        getAllSuppliers();
        handleCloseCancel();
        //   getMaxCustomerId();
      }
    } catch (err) {
      dispatch(updateSupplierFail({ err }));
    }
  };

  const handleCloseCancel = () => {
    setUpdateOpen(false);
    getSupplier();
    // setSupplierData({
    //   ...supplierData,
    // });
  };

  const handleReset = () => {
    getSupplier();
    // setSupplierData({
    //   ...supplierData,
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
                Update Supplier Details
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
                    value={supplierData.supplierId}
                    name='supplierId'
                    variant='outlined'
                    fullWidth
                    id='supplierId'
                    label='Supplier ID'
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
                    value={supplierData.supplierName}
                    autoComplete='supplierName'
                    name='supplierName'
                    variant='outlined'
                    fullWidth
                    id='supplierName'
                    label='Supplier Name'
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
                    value={supplierData.phoneNumber}
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
                    value={supplierData.whatsAppNumber}
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
                    value={supplierData.email}
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
                    value={supplierData.panNumber}
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
                    value={supplierData.gstNumber}
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
                    value={supplierData.city}
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
                    value={supplierData.pinCode}
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
                    value={supplierData.supplierAddress}
                    // autoComplete='customerAddress'
                    name='supplierAddress'
                    variant='outlined'
                    fullWidth
                    id='supplierAddress'
                    label='Supplier Address'
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
                    value={supplierData.accountHolderName}
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
                    value={supplierData.bankName}
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
                    value={supplierData.accountNumber}
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
                    value={supplierData.ifscCode}
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
                    value={supplierData.branchAddress}
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
                      value={supplierData.accountType}
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
                    value={supplierData.isActive}
                    // checked={supplierData.active}
                    checked={supplierData.isActive}
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
                    Update Supplier Details
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

export default SupplierUpdateForm;

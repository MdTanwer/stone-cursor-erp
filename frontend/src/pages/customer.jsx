import React, { useState, useEffect } from 'react';

import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TextField, Typography } from '@mui/material';

import axios from 'axios';
// import jsPDF from 'jspdf';
import 'jspdf-autotable';

import Checkbox from '@mui/material/Checkbox';
import {
  Edit as EditIcon,
  Delete as DeleIcon,
  Refresh,
} from '@material-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirm } from 'react-confirm-box';

import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import BankDetails from '../components/bankDetails';
import { useDispatch, useSelector } from 'react-redux';
import {
  createNewCustomer,
  createNewCustomerFail,
  createNewCustomerReq,
  deleteCustomer,
  deleteCustomerFailed,
  deleteCustomerRequest,
} from '../redux/customer/customerSlice';
import CustomerUpdateForm from '../components/Helper Component/CustomerUpdate';
import { DialogActions, DialogContentText, Fab } from '@material-ui/core';

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
  deleteName: {
    color: 'red', // Your desired color
    fontWeight: 'bold',
    fontSize: '20px', // Your desired font weight or other styles
    // Add any other custom styles you want
  },
}));

export default function Customer(props) {
  const {
    accountHolderName,
    bankName,
    accountNumber,
    ifscCode,
    branchAddress,
    accountType,
  } = useSelector((state) => state.bank);
  const { name, email } = useSelector((state) => state.user.user);
  // console.log(name, email);
  const { success, deleteSuccess, updateSuccess } = useSelector(
    (state) => state.customer
  );

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

  // console.log(customerData);
  const [rowId, setRowId] = useState('');
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [customerDeleteName, setCustomerDeleteName] = useState('');

  const [isActive, setIsActive] = useState(true);
  const [createdBy, setCreatedBy] = useState('');
  const columns = [
    { title: 'Customer ID', field: '_id', hidden: true },
    {
      title: 'Customer ID',
      field: 'customerId',
      defaultSort: 'asc',
    },
    { title: 'Customer Name', field: 'customerName' },
    { title: 'Phone No.', field: 'phoneNumber' },
    { title: 'WhatsApp No.', field: 'whatsAppNumber' },
    { title: 'Email', field: 'email' },
    { title: 'PAN', field: 'panNumber' },
    { title: 'GSTIN', field: 'gstNumber' },
    { title: 'City', field: 'city' },
    { title: 'PIN Code', field: 'pinCode' },
    { title: 'Customer Address', field: 'customerAddress' },
    { title: 'Bank Account Holder Name', field: 'accountHolderName' },
    { title: 'Bank Name', field: 'bankName' },
    { title: 'Bank Account No.', field: 'accountNumber' },
    { title: 'IFSC code', field: 'ifscCode' },
    { title: 'Bank Branch Address', field: 'branchAddress' },
    { title: 'Bank Account Type', field: 'accountType' },
  ];

  const getMaxCustomerId = () => {
    if (!data.customers || data.customers.length === 0) {
      return 1;
    }

    const maxID = data.customers.reduce((max, customer) => {
      // Convert customerId to a number
      const customerId = parseInt(customer.customerId);

      // Check if customerId is greater than the current max
      if (customerId > max) {
        return customerId; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0

    return maxID + 1;
  };

  useEffect(() => {
    const maxCustomerId = getMaxCustomerId();
    setCustomerData({
      ...customerData,
      customerId: maxCustomerId,
    });
    getAllCustomers();
  }, [open]);

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

  useEffect(() => {
    handleCloseCancel();
    handleReset();
    getAllCustomers();
  }, [success, deleteSuccess, updateSuccess]);

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
    setOpen(false);
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

  const handleDelete = async (id) => {
    try {
      dispatch(deleteCustomerRequest());
      const { data } = await axios.delete(
        `/customer/delete-customer/${id}`
        // {
        //   withCredentials: true,
        // }
      );

      // console.log(data);
      if (data?.success === true) {
        dispatch(deleteCustomer(`${data.message}`));
        toast.success(`${data.message}`);
        getAllCustomers();
      }
    } catch (err) {
      dispatch(deleteCustomerFailed({ err }));
    }
  };

  const actions = [
    {
      icon: () => <Refresh />,
      tooltip: 'Refresh Data',
      isFreeAction: true,
      onClick: () => {
        getAllCustomers();
      },
    },
    {
      icon: () => <EditIcon id='editIcon' color='primary' />,
      tooltip: 'Edit Factory',
      onClick: (event, rowData) => {
        setUpdateOpen(true);
        setRowId(rowData._id);
      },
    },
    {
      icon: () => <DeleIcon color='secondary' />,
      tooltip: 'Delete Factory',
      onClick: (event, rowData) => {
        setSelectedRowId(rowData._id);
        setShowDeleteConfirm(true);
        setCustomerDeleteName(rowData.customerName);
      },
    },
  ];

  return (
    <>
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
            Create New Customer
          </Fab>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MaterialTable
            title=''
            columns={columns}
            data={data.customers}
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
              exportFileName: 'All Customers',
              addRowPosition: 'last',
              showTextRowsSelected: false,
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
        open={open}
        onClose={handleCloseCancel}
        aria-labelledby='max-width-dialog-title'
        disableBackdropClick
      >
        <DialogTitle id='max-width-dialog-title'>
          <Grid
            style={{
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
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <TextField
                    disabled={true}
                    value={getMaxCustomerId()}
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
                    value={customerData.pinCode}
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
                    type='submit'
                    fullWidth
                    variant='contained'
                    color='primary'
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
      <CustomerUpdateForm
        setData={setData}
        rowId={rowId}
        updateOpen={updateOpen}
        setUpdateOpen={setUpdateOpen}
      />

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
          <DialogContentText id='alert-dialog-description'>
            Are you sure you want to delete this{' '}
            <span
              className={classes.deleteName}
            >{`' ${customerDeleteName} '`}</span>{' '}
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
                  handleDelete(selectedRowId);
                  getAllCustomers();
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

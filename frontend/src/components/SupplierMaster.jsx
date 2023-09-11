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
  createNewSupplierReq,
  createNewSupplier,
  createNewSupplierFail,
  deleteSupplier,
  deleteSupplierFailed,
  deleteSupplierRequest,
} from '../redux/supplier/supplierSlice';
import SupplierUpdateForm from './Helper Component/SupplierUpdate';
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
    fontSize: '20px' // Your desired font weight or other styles
    // Add any other custom styles you want
  },
}));

function SupplierMaster(props) {
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

  const [supplierData, setSupplierData] = useState({
    supplierId: '',
    supplierName: '',
    phoneNumber: '',
    whatsAppNumber: '',
    email: '',
    panNumber: '',
    gstNumber: '',
    city: '',
    supplierAddress: '',
    pinCode: '',
    isActive: true,
  });
  // console.log(supplierData);
  const [rowId, setRowId] = useState('');
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [supplierDeleteName, setSupplierDeleteName] = useState("");
  const columns = [
    { title: 'Supplier ID', field: '_id', hidden: true },
    {
      title: 'Supplier ID',
      field: 'supplierId',
      defaultSort: 'asc',
    },
    { title: 'Supplier Name', field: 'supplierName' },
    { title: 'Phone No.', field: 'phoneNumber' },
    { title: 'WhatsApp No.', field: 'whatsAppNumber' },
    { title: 'Email', field: 'email' },
    { title: 'PAN', field: 'panNumber' },
    { title: 'GSTIN', field: 'gstNumber' },
    { title: 'City', field: 'city' },
    { title: 'PIN Code', field: 'pinCode' },
    { title: 'Supplier Address', field: 'supplierAddress' },
    // { title: 'Bank Account Holder Name', field: 'accountHolderName' },
    { title: 'Bank Name', field: 'bankName' },
    { title: 'Bank Account No.', field: 'accountNumber' },
    { title: 'IFSC code', field: 'ifscCode' },
    // { title: 'Bank Branch Address', field: 'branchAddress' },
    // { title: 'Bank Account Type', field: 'accountType' },
  ];

  const getMaxSupplierId = () => {
    if (!data.suppliers || data.suppliers.length === 0) {
      return 1;
    }

    const maxID = data.suppliers.reduce((max, customer) => {
      // Convert supplierId to a number
      const supplierId = parseInt(customer.supplierId);

      // Check if supplierId is greater than the current max
      if (supplierId > max) {
        return supplierId; // Update max if supplierId is greater
      } else {
        return max; // Keep the current max if supplierId is not greater
      }
    }, 0); // Initialize max with 0

    return maxID + 1;
  };

  useEffect(() => {
    const maxSupplierId = getMaxSupplierId();
    setSupplierData({
      ...supplierData,
      supplierId: maxSupplierId,
    });
    getAllSuppliers();
  }, [open]);

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

  useEffect(() => {
    handleCloseCancel();
    const maxSupplierId = getMaxSupplierId();
    setSupplierData({
      ...supplierData,
      supplierId: maxSupplierId,
      isActive: true,
      supplierName: '',
      phoneNumber: '',
      whatsAppNumber: '',
      email: '',
      panNumber: '',
      gstNumber: '',
      city: '',
      pinCode: '',
      supplierAddress: '',
    });
    getAllSuppliers();
    // getAllSuppliers();
    // getMaxSupplierId();
  }, [success, deleteSuccess, updateSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData({
      ...supplierData,
      [name]: value,
    });
  };

  const handleCheckChange = (e) => {
    setSupplierData({
      ...supplierData,
      isActive: !supplierData.isActive,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData();
    newFormData.append('supplierId', supplierData.supplierId);
    newFormData.append('supplierName', supplierData.supplierName);
    newFormData.append('phoneNumber', supplierData.phoneNumber);
    newFormData.append('whatsAppNumber', supplierData.whatsAppNumber);
    newFormData.append('email', supplierData.email);
    newFormData.append('panNumber', supplierData.panNumber);
    newFormData.append('gstNumber', supplierData.gstNumber);
    newFormData.append('city', supplierData.city);
    newFormData.append('pinCode', supplierData.pinCode);
    newFormData.append('supplierAddress', supplierData.supplierAddress);
    newFormData.append('createdBy', `Name: ${name}, Email: ${email}`);
    newFormData.append('createdAt', Date.now());
    newFormData.append('isActive', supplierData.isActive);
    newFormData.append('accountHolderName', accountHolderName);
    newFormData.append('bankName', bankName);
    newFormData.append('accountNumber', accountNumber);
    newFormData.append('ifscCode', ifscCode);
    newFormData.append('branchAddress', branchAddress);
    newFormData.append('accountType', accountType);
    let newForm = Object.fromEntries(newFormData);

    try {
      dispatch(createNewSupplierReq());

      const { data } = await axios.post(`/supplier/create-supplier`, newForm);

      if (data?.success === true) {
        dispatch(createNewSupplier(data.supplier));
        toast.success('Supplier Added Successfully');
        getAllSuppliers();
        handleCloseCancel();
        getMaxSupplierId();
      }
    } catch (err) {
      dispatch(createNewSupplierFail({ err }));
    }
  };

  const handleCloseCancel = () => {
    const maxSupplierId = getMaxSupplierId();
    setOpen(false);
    setSupplierData({
      ...supplierData,
      isActive: true,
      supplierId: maxSupplierId,
      supplierName: '',
      phoneNumber: '',
      whatsAppNumber: '',
      email: '',
      panNumber: '',
      gstNumber: '',
      city: '',
      pinCode: '',
      supplierAddress: '',
    });
  };
  const handleReset = () => {
    const maxSupplierId = getMaxSupplierId();
    setSupplierData({
      ...supplierData,
      supplierId: maxSupplierId,
      isActive: true,
      supplierName: '',
      phoneNumber: '',
      whatsAppNumber: '',
      email: '',
      panNumber: '',
      gstNumber: '',
      city: '',
      pinCode: '',
      supplierAddress: '',
    });
  };

  const handleDelete = async (id) => {
    try {
      dispatch(deleteSupplierRequest());
      const { data } = await axios.delete(
        `/supplier/delete-supplier/${id}`
        // {
        //   withCredentials: true,
        // }
      );

      // console.log(data);
      if (data?.success === true) {
        dispatch(deleteSupplier(`${data.message}`));
        toast.success(`${data.message}`);
        getAllSuppliers();
      }
    } catch (err) {
      dispatch(deleteSupplierFailed({ err }));
    }
  };

  const actions = [
    {
      icon: () => <Refresh />,
      tooltip: 'Refresh Data',
      isFreeAction: true,
      onClick: () => {
        getAllSuppliers();
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
        setSupplierDeleteName(rowData.supplierName)
        // handleDelete(rowData._id);
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
            Create New Supplier
          </Fab>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MaterialTable
            title=''
            columns={columns}
            data={data.suppliers}
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
              exportFileName: 'All Suppliers',
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
                Create New Supplier
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
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={2}>
                  <TextField
                    disabled={true}
                    value={getMaxSupplierId()}
                    name='supplierId'
                    variant='outlined'
                    fullWidth
                    id='supplierId'
                    label='Supplier ID'
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    required
                    disabled={isDisable}
                    value={supplierData.supplierName}
                    name='supplierName'
                    variant='outlined'
                    fullWidth
                    id='supplierName'
                    label='Supplier Name'
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    required
                    type='number'
                    disabled={isDisable}
                    value={supplierData.phoneNumber}
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
                    value={supplierData.whatsAppNumber}
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
                    value={supplierData.email}
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
                    value={supplierData.panNumber}
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
                    value={supplierData.gstNumber}
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
                    value={supplierData.city}
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
                    value={supplierData.pinCode}
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
                    value={supplierData.supplierAddress}
                    name='supplierAddress'
                    variant='outlined'
                    fullWidth
                    id='supplierAddress'
                    label='Supplier Address'
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
                    value={supplierData.isActive}
                    checked={supplierData.isActive}
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
                    Save Supplier Details
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
      <SupplierUpdateForm
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
        maxWidth="sm" // You can set it to 'xs', 'sm', 'md', 'lg', or 'false'
        fullWidth={true}
        onClose={() => setShowDeleteConfirm(false)}
        aria-labelledby="alert-dialog-title "

        aria-describedby="alert-dialog-description "
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this <span className={classes.deleteName}>{`' ${supplierDeleteName} '`}</span> record?
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
                  getAllSuppliers();
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

export default SupplierMaster;

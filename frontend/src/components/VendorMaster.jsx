import React, { useState, Component, useEffect, forwardRef } from 'react';
import { server } from '../server';
import { Link } from 'react-router-dom';

import MaterialTable, { Column } from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TextField, Typography } from '@mui/material';
import { green } from '@mui/material/colors';
import Button from '@material-ui/core/Button';

import axios from 'axios';
// import jsPDF from 'jspdf';
import 'jspdf-autotable';

import Checkbox from '@mui/material/Checkbox';
import {
    Edit as EditIcon,
    Add as AddIcon,
    Delete as DeleIcon,
    Refresh,
} from '@material-ui/icons';
// import { Refresh } from '@material-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirm } from 'react-confirm-box';

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,

    Tooltip,
} from '@mui/material';
import BankDetails from '../components/bankDetails';
import { useDispatch, useSelector } from 'react-redux';

import { createNewVendor, createNewVendorFail, createNewVendorReq, deleteVendor, deleteVendorFailed, deleteVendorRequest } from '../redux/vendor/vendorSlice';
import VendorUpdateForm from './Helper Component/VendorUpdate';
import { DialogContentText, Fab } from '@material-ui/core';
import { blue } from '@material-ui/core/colors';

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

export default function VendorMaster(props) {
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
    const { success, deleteSuccess, updateSuccess } = useSelector(
        (state) => state.vendor
    );

    const [isDisable, setIsDisable] = useState(false);
    const classes = useStyles();
    const [data, setData] = useState([]);
    const dispatch = useDispatch();

    const [vendorData, setVendorData] = useState({
        vendorId: '',
        vendorName: '',
        phoneNumber: '',
        whatsAppNumber: '',
        email: '',
        panNumber: '',
        gstNumber: '',
        city: '',
        vendorAddress: '',
        pinCode: '',
        isActive: true,
    });
    console.log(vendorData);
    const [rowId, setRowId] = useState('');
    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [createdBy, setCreatedBy] = useState('');

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [selectedRowId, setSelectedRowId] = useState(null);
    const [unitDeleteName, setUnitDeleteName] = useState("");
    const columns = [
        { title: 'Vendor ID', field: '_id', hidden: true },
        {
            title: 'Vendor ID',
            field: 'vendorId',
            defaultSort: 'asc',
        },
        { title: 'Vendor Name', field: 'vendorName' },
        { title: 'Phone No.', field: 'phoneNumber' },
        { title: 'WhatsApp No.', field: 'whatsAppNumber' },
        { title: 'Email', field: 'email' },
        { title: 'PAN', field: 'panNumber' },
        { title: 'GSTIN', field: 'gstNumber' },
        { title: 'City', field: 'city' },
        { title: 'PIN Code', field: 'pinCode' },
        { title: 'Vendor Address', field: 'vendorAddress' },
        // { title: 'Bank Account Holder Name', field: 'accountHolderName' },
        { title: 'Bank Name', field: 'bankName' },
        { title: 'Bank Account No.', field: 'accountNumber' },
        { title: 'IFSC code', field: 'ifscCode' },
        // { title: 'Bank Branch Address', field: 'branchAddress' },
        // { title: 'Bank Account Type', field: 'accountType' },
    ];

    const getMaxVendorId = () => {
        if (!data.vendors || data.vendors.length === 0) {
            // Handle the case where data.customer is null or empty
            // setCustomerData({
            //   ...customerData,
            //   vendorId: 1,
            // });
            return 1;
        }

        const maxID = data.vendors.reduce((max, vendor) => {
            // Convert vendorId to a number
            const vendorId = parseInt(vendor.vendorId);

            // Check if vendorId is greater than the current max
            if (vendorId > max) {
                return vendorId; // Update max if vendorId is greater
            } else {
                return max; // Keep the current max if vendorId is not greater
            }
        }, 0); // Initialize max with 0


        return maxID + 1;
    };

    useEffect(() => {
        const maxCustomerId = getMaxVendorId();
        setVendorData({
            ...vendorData,
            vendorId: maxCustomerId,
        });
        getAllVendors();
    }, [open]);

    const getAllVendors = () => {
        debugger;
        axios
            .get(`vendormaster/all-vendors`)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        handleCloseCancel();
        const maxCustomerId = getMaxVendorId();
        setVendorData({
            ...vendorData,
            vendorId: maxCustomerId,
            isActive: true,
            vendorName: '',
            phoneNumber: '',
            whatsAppNumber: '',
            email: '',
            panNumber: '',
            gstNumber: '',
            city: '',
            pinCode: '',
            vendorAddress: '',
        });
        getAllVendors();
        // getAllCustomers();
        // getMaxCustomerId();
    }, [success, deleteSuccess, updateSuccess]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVendorData({
            ...vendorData,
            [name]: value,
        });
    };

    const handleCheckChange = (e) => {
        setVendorData({
            ...vendorData,
            isActive: !vendorData.isActive,
        });
        // setIsActive(!isActive);
        // const { name, checked } = e.target; // Use 'checked' instead of 'value'
        // console.log(name, checked);
        // console.log(e.target);
        // setCustomerData({
        //   ...customerData,
        //   [name]: checked ? true : false, // Set to 'true' if checked, 'false' otherwise
        // });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newFormData = new FormData();
        newFormData.append('vendorId', vendorData.vendorId);
        newFormData.append('vendorName', vendorData.vendorName);
        newFormData.append('phoneNumber', vendorData.phoneNumber);
        newFormData.append('whatsAppNumber', vendorData.whatsAppNumber);
        newFormData.append('email', vendorData.email);
        newFormData.append('panNumber', vendorData.panNumber);
        newFormData.append('gstNumber', vendorData.gstNumber);
        newFormData.append('city', vendorData.city);
        newFormData.append('pinCode', vendorData.pinCode);
        newFormData.append('vendorAddress', vendorData.vendorAddress);
        newFormData.append('createdBy', `Name: ${name}, Email: ${email}`);
        newFormData.append('createdAt', Date.now());
        newFormData.append('isActive', vendorData.isActive);
        newFormData.append('accountHolderName', accountHolderName);
        newFormData.append('bankName', bankName);
        newFormData.append('accountNumber', accountNumber);
        newFormData.append('ifscCode', ifscCode);
        newFormData.append('branchAddress', branchAddress);
        newFormData.append('accountType', accountType);
        let newForm = Object.fromEntries(newFormData);

        try {
            dispatch(createNewVendorReq());

            const { data } = await axios.post(`vendormaster/create-vendor`, newForm);

            if (data?.success === true) {
                dispatch(createNewVendor(data.vendor));
                toast.success('Vendor Added Successfully');
                getAllVendors();
                handleCloseCancel();
                getMaxVendorId();
            }
        } catch (err) {
            dispatch(createNewVendorFail({ err }));
        }
    };

    const handleCloseCancel = () => {
        const maxCustomerId = getMaxVendorId();
        setOpen(false);
        setVendorData({
            ...vendorData,
            isActive: true,
            vendorId: maxCustomerId,
            vendorName: '',
            phoneNumber: '',
            whatsAppNumber: '',
            email: '',
            panNumber: '',
            gstNumber: '',
            city: '',
            pinCode: '',
            vendorAddress: '',
        });
        // setIsActive(true);
    };
    const handleReset = () => {
        const maxCustomerId = getMaxVendorId();
        setVendorData({
            ...vendorData,
            isActive: true,
            vendorId: maxCustomerId,
            vendorName: '',
            phoneNumber: '',
            whatsAppNumber: '',
            email: '',
            panNumber: '',
            gstNumber: '',
            city: '',
            pinCode: '',
            vendorAddress: '',
        });
        // setIsActive(true);
    };

    const handleDelete = async (id) => {
        try {
            dispatch(deleteVendorRequest());
            const { data } = await axios.delete(
                `/vendormaster/delete-vendor/${id}`
                // {
                //   withCredentials: true,
                // }
            );

            console.log(data);
            if (data?.success === true) {
                dispatch(deleteVendor(`${data.message}`));
                toast.success(`${data.message}`);
                getAllVendors();
            }
        } catch (err) {
            dispatch(deleteVendorFailed({ err }));
        }
    };

    const actions = [
        {
            icon: () => <Refresh />,
            tooltip: 'Refresh Data',
            isFreeAction: true,
            onClick: () => {
                getAllVendors();
            },
        },
        {
            icon: () => <EditIcon id='editIcon' style={{ color: blue[500] }} />,
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
                debugger
                setSelectedRowId(rowData._id);
                setShowDeleteConfirm(true);
                setUnitDeleteName(rowData.vendorName)
                // handleDelete(rowData._id);
                console.log(rowData);
            },
        },
    ];

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
                            Create New Vendor
                        </Fab>
                    </Grid>
                    <Grid item xs={12} sm={12}>
                        <MaterialTable
                            title=''
                            columns={columns}
                            data={data.vendors}
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
                                exportFileName: 'All Vendors',
                                addRowPosition: 'last',
                                // actionsColumnIndex: -1,
                                // selection: true,
                                // showSelectAllCheckbox: false,
                                showTextRowsSelected: false,
                                // selectionProps: (rowData) => ({
                                //   disabled: rowData.age == null,
                                //   // color:"primary"
                                // }),
                                // defaultSort: 'asc',
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
                    // onBackdropClick={handleClose}
                    fullWidth
                    maxWidth='lg'
                    open={open}
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
                            {/* <h3>Create New Supplier</h3> */}
                            <form
                                className={classes.form}
                                // onChange={handleFormChange}
                                onSubmit={handleSubmit}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            disabled={true}
                                            // value={customerData.customerId}
                                            value={getMaxVendorId()}
                                            // autoComplete='customerName'
                                            name='vendorId'
                                            variant='outlined'
                                            fullWidth
                                            id='vendorId'
                                            label='Vendor ID'
                                            // onChange={handleChange}
                                            // onChange={(e) => setCustomerName(e.target.value)}
                                            autoFocus
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            required
                                            disabled={isDisable}
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
                                            disabled={isDisable}
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
                                            disabled={isDisable}
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
                                            disabled={isDisable}
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
                                            disabled={isDisable}
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
                                            disabled={isDisable}
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
                                            disabled={isDisable}
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
                                            disabled={isDisable}
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
                                    {/* <Grid item xs={12} sm={12}> */}
                                    <BankDetails />
                                    {/* </Grid> */}
                                    <Grid item xs={12} sm={5}>
                                        <label>IsActive</label>
                                        <Checkbox
                                            {...label}
                                            name='isActive'
                                            value={vendorData.isActive}
                                            // checked={vendorData.active}
                                            checked={vendorData.isActive}
                                            // checked={isActive}
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
                                            Save Vendor Details
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
                                        getAllVendors();
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
            {/* <CustomerUpdateForm
                rowId={rowId}
                updateOpen={updateOpen}
                setUpdateOpen={setUpdateOpen}
            /> */}
            <VendorUpdateForm
                rowId={rowId}
                updateOpen={updateOpen}
                setUpdateOpen={setUpdateOpen}
            />
        </>
    );
}

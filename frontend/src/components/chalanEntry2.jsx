import React, { useState, Component, useEffect, forwardRef } from 'react';

import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MaterialTable, { Column } from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { TextField } from '@mui/material';

import axios from 'axios';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleIcon,
} from '@material-ui/icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { confirm } from 'react-confirm-box';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import BankDetails from './bankDetails';
import MasterUnitComp from '../MasterPageComponent/MasterUnitComp';
import MasterSourceMineComp from '../MasterPageComponent/MasterSourceMineComp';
import MasterCustomerComp from '../MasterPageComponent/MasterCustomerComp';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

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
}));

export default function ChallanEntry(props) {
  const tableRef = React.createRef();

  // // const [priorYear, setPriorYear] = React.useState('');

  // const [isDisable, setIsDisable] = useState(false);
  // const [selectedPriorYearValue, setSelectedPriorYearValue] = useState('');
  // const [selectedCustomerValue, setSelectedCustomerValue] = useState('');
  // const [selectedSalesmanValue, setSelectedSalesmanValue] = useState('');
  // const [selectedFactoryValue, setSelectedFactoryValue] = useState('');
  // const [selectedFactCategoryValue, setSelectedFactCategoryValue] =
  //   useState('');

  // const FactoryCategoryOnchange = (value) => {
  //   setSelectedFactCategoryValue(value);
  //   debugger;
  //   console.log(selectedFactCategoryValue);
  // };

  // const FactoryOnchange = (value) => {
  //   setSelectedFactoryValue(value);
  //   debugger;
  //   console.log(selectedFactoryValue);
  // };

  // const SalesmanOnchange = (value) => {
  //   setSelectedSalesmanValue(value);
  //   debugger;
  //   console.log(selectedSalesmanValue);
  // };

  // const PriorYearOnchange = (value) => {
  //   setSelectedPriorYearValue(value);
  //   debugger;
  //   console.log(selectedPriorYearValue);
  // };
  // const CustomerOnchange = (value) => {
  //   setSelectedCustomerValue(value);
  //   debugger;
  //   console.log(selectedCustomerValue);
  // };

  // const [checked, setChecked] = useState(true);
  // const checkChanged = (state) => {
  //   setChecked(!checked);
  // };
  // const [allCustchecked, setAllCustchecked] = useState(false);
  // debugger;
  // const AllCustomercheckChanged = (state) => {
  //   setAllCustchecked(!allCustchecked);
  //   setIsDisable(!allCustchecked);
  // };

  const classes = useStyles();

  const [data, setData] = useState([]);
  const columns = [
    { title: 'Slip No.', field: 'challanNumber' },
    { title: 'Vehicle No.', field: 'vehicleNo' },
    { title: 'Material', field: 'material' },
    { title: 'Date & Time', field: 'currentDateTime' },
    { title: 'Customer', field: 'customer' },
    { title: 'transporter', field: 'transporter' },
    { title: 'D.M. No.', field: 'dmNumber' },
    { title: 'L.R. No.', field: 'lRNumber' },
    { title: 'Destination', field: 'destination' },
    { title: 'Royalty No.', field: 'royaltyNumber' },
    { title: 'Loaded By', field: 'loadedBy' },
    { title: 'Driver', field: 'driverName' },
    { title: 'Site Incharge', field: 'siteIncharge' },
    { title: 'Load Type', field: 'loadType' },
    { title: 'Gross Weight', field: 'grossweight' },
    { title: 'Empty Weight', field: 'emptyWeight' },
    { title: 'Net Weight', field: 'netWeight' },
    // { title: "FinYearId", field: "FinYearId" },
    // { title: 'IsActiveForAll', field: 'IsActiveForAll' },
    // { title: 'IsActive', field: 'IsActive' },
  ];

  // const [selectedPriorYearItem, setSelectedPriorYearItem] = useState(22);
  // const [selectedFactoryId, setSelectedFactoryId] = useState(0);
  // const [finYear, setFinYear] = useState('');
  // const [commissionRulesId, setCommissionRulesId] = useState(0);
  // const [factoryId, setSetFactoryId] = useState(0);
  // const [factoryName, setFactoryName] = useState('');
  // const [commissionRate, setCommissionRate] = useState('');
  // const [isActive, setIsActive] = useState('');
  // const [createdDate, setCreatedDate] = useState('');
  // const [custId, setCustId] = useState('');
  // const [getCustomers, setGetCustomers] = useState([]);
  // const [employeeAddress, setEmployeeAddress] = useState('');
  // const [phoneNumber, setPhoneNumber] = useState();
  // const [transporter, setTransporter] = useState('');
  // const [challanNumber, setSaleSlipNo] = useState('');
  // const [customer, setCustomer] = useState('');
  // const [material, setMaterial] = useState('');
  // const [vehicleNo, setVehicleNo] = useState('');
  // const [dmNumber, setDmNumber] = useState('');
  // const [lRNumber, setLrNumber] = useState('');
  // const [destination, setDestination] = useState('');
  // const [grossweight, setGrossWeight] = useState('');
  // const [emptyWeight, setEmptyWeight] = useState('');
  // const [netWeight, setNetWeight] = useState('');
  // const [royaltyNumber, setRoyaltyNumber] = useState('');
  // const [loadedBy, setLoadedBy] = useState('');
  // const [driverName, setDriverName] = useState('');
  // const [siteIncharge, setSiteIncharge] = useState('');
  // const [loadType, setLoadType] = useState('');

  const [open, setOpen] = useState(false);
  const [openUnitMaster, setOpenUnitMaster] = useState(false);
  const [openSourceMine, setOpenSourceMine] = useState(false);
  const [openMasterCustomer, setOpenMasterCustomer] = useState(false);
  // const [handleCloseeCancle, setHandleCloseeCancle] = useState(true);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [challanEntryData, setChallanEntryData] = useState({
    // challanNumber: '',
    manualChallanNumber: '',
    mineSourceName: '',
    siteInchargeName: '',
    customerName: '',
    currentDateTime: currentDateTime,
    customerPhoneNumber: null,
    materialName: '',
    customerDestination: '',
    quantity: '',
    unit: '',
    transporter: '',
    manualTransportName: '',
    vehicle: '',
    manualVehicleName: '',
    driver: '',
    manualDrivereName: '',
    royaltyType: '',
    loadedBy: '',
    loadType: '',
    grossweight: '',
    emptyWeight: '',
    netWeight: '',
  });

  const getMaxSupplierId = () => {
    if (!data.customers || data.customers.length === 0) {
      return 1;
    }

    const maxID = data.customers.reduce((max, customer) => {
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
  const handleChange = (e) => {
    const { name, value } = e.target;
    setChallanEntryData({
      ...challanEntryData,
      [name]: value,
    });
  };

  // const getAllCustomers = () => {
  //   axios
  //     .get('Customer/GetCustomer')
  //     .then((res) => {
  //       console.log(res.data);
  //       //setData(res.data);
  //       setGetCustomers(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const getCustInfo = (custName) => {
  //   var custInfo = getCustomers.find(
  //     (item) => item.CustomerName.trim() === custName.trim()
  //   );
  //   return custInfo;
  // };

  // const successMessageBox = (successMsg) => {
  //   toast.success(successMsg, {
  //     position: 'top-center',
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
  //     position: 'top-center',
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  // useEffect(() => {
  //   getAllCustomers();
  //   GetCummRules();
  // }, []);

  // const GetCummRules = () => {
  //   axios
  //     .get('CommissionRules/GetCommissionRules?id=0')

  //     .then((res) => {
  //       debugger;
  //       console.log(res.data);
  //       //setData(res.data);
  //       setData(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // const onClickDelete = async (rowData) => {
  //   const result = await confirm(
  //     'Do you really want to delete this Id = ' +
  //       rowData.CommissionRulesId +
  //       '?'
  //   );
  //   if (result) {
  //     debugger;

  //     axios
  //       .delete(
  //         'CommissionRules/DeleteCommissionRules?id=' +
  //           rowData.CommissionRulesId
  //       )
  //       .then((res) => {
  //         debugger;
  //         console.log(res);
  //         GetCummRules();
  //         // successMessageBox('Record has been deleted successfully!');
  //       })
  //       .catch((err) => {
  //         // errorMessageBox('Invalid  Information!');
  //         console.log(err);
  //       });
  //     debugger;
  //     // alert("Delete = " + rowData.CustId);
  //     return;
  //   }
  //   console.log('You click No!');
  // };
  const actions = [
    {
      icon: () => <EditIcon />,
      tooltip: 'Edit Factory',
      onClick: (event, rowData) => {
        // debugger;
        // refresh();
        // UpdateFactory(rowData.CommissionRulesId);
      },
    },
    {
      icon: () => <DeleIcon />,
      tooltip: 'Delete Factory',
      onClick: (event, rowData) => {
        // onClickDelete(rowData);
      },
    },
  ];

  const refresh = () => { };

  const clear = () => {
    // debugger;
    refresh();
  };

  // const downloadPdf = () => {
  //   const doc = new jsPDF();
  //   doc.text('Sales Commission Details', 20, 10);
  //   doc.autoTable({
  //     theme: 'grid',
  //     columns: columns.map((col) => ({ ...col, dataKey: col.field })),
  //     body: data,
  //   });
  //   doc.save('SalesCommission.pdf');
  // };

  // const handleVehicleNoChange = (e) => {
  //   setVehicleNo(e.target.value);
  // };
  // const handleMaterialChange = (e) => {
  //   setMaterial(e.target.value);
  // };
  // const handleCustomerChange = (e) => {
  //   setCustomer(e.target.value);
  // };
  // const handleDestinationChange = (e) => {
  //   setDestination(e.target.value);
  // };
  // const handleTransporterChange = (e) => {
  //   setTransporter(e.target.value);
  // };
  // const handleRoyaltyChange = (e) => {
  //   setRoyaltyNumber(e.target.value);
  // };
  // const handleLoadedByChange = (e) => {
  //   setLoadedBy(e.target.value);
  // };
  // const handleLoadedTypeChange = (e) => {
  //   setLoadType(e.target.value);
  // };

  const handleClose = () => {
    setOpen(false);
    setOpenUnitMaster(false);
  };

  // Update the current date and time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      // setChallanEntryData({
      //   ...challanEntryData,
      //   currentDateTime: new Date(),
      // });
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const handleUnitClick = () => {
    setOpenUnitMaster(true);
    // setOpenSourceMine(true)
  };
  const handleMineSourceClick = () => {
    setOpenSourceMine(true);
    // setOpenSourceMine(true)
  };
  const handleCustomerClick = () => {
    console.log('Customer clicked');
    setOpenMasterCustomer(true);
    // setOpenSourceMine(true)
  };

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
            New Chalan Entry
          </Fab>
        </Grid>
        <Grid item xs={12} sm={12}>
          <MaterialTable
            title=''
            columns={columns}
            data={data}
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
              pageSize: 5,
              paginationType: 'stepped',
              showFirstLastPageButtons: false,
              paginationPosition: 'both',
              exportButton: true,
              exportAllData: true,
              exportFileName: 'CommissionRulesDetails',
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
        // maxWidth='md'
        maxWidth='lg'
        open={open}
        disableBackdropClick={true}
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
                  New Chalan Entry
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
            {/* <h3>Create New Supplier</h3> */}
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={2}>
                  <TextField
                    disabled={true}
                    // value={getMaxChallanId()}
                    autoComplete='challanNumber'
                    name='challanNumber'
                    variant='outlined'
                    fullWidth
                    id='challanNumber'
                    label='Challan No.'
                    // onChange={handleChange}
                    // onChange={(e) => setSaleSlipNo(e.target.value)}
                    autoFocus
                    InputProps={{
                      style: { backgroundColor: '#ffe066' }, // Change 'yellow' to your desired background color
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    // disabled={true}
                    // value={getMaxChallanId()}
                    autoComplete='manualChallanNumber'
                    name='manualChallanNumber'
                    variant='outlined'
                    fullWidth
                    id='manualChallanNumber'
                    label='M Challan No.'
                    onChange={handleChange}
                    // onChange={(e) => setSaleSlipNo(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Grid
                    container
                    spacing={1}
                    xs={12}
                    sm={12}
                    alignItems='center'
                  >
                    <Grid item xs={12} sm={10}>
                      <Box sx={{ minWidth: 20 }}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Mine / Source Name
                          </InputLabel>
                          <Select
                            name='mineSourceName'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanEntryData.mineSourceName}
                            label='Select Prior Year'
                            onChange={handleChange}
                          >
                            <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '45px' }}
                        color='primary'
                        onClick={handleMineSourceClick}
                      />
                      {openSourceMine && <MasterSourceMineComp
                        openSourceMine={openSourceMine}
                        // onClose={handleCloseeCancle}
                        setOpenSourceMine={setOpenSourceMine}
                      />
                      }
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Grid
                    container
                    spacing={1}
                    style={{ flexSpacing: '2rem' }}
                    xs={12}
                    sm={12}
                    alignItems='center'
                  >
                    <Grid item xs={12} sm={10}>
                      <Box sx={{ minWidth: 20 }}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Site Incharge Name
                          </InputLabel>
                          <Select
                            name='siteInchargeName'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanEntryData.siteInchargeName}
                            label='Select Prior Year'
                            onChange={handleChange}
                          >
                            <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '45px' }}
                        // fontSize='large'
                        color='primary'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    disabled={true}
                    value={currentDateTime.toLocaleString('en-GB')}
                    autoComplete='currentDateTime'
                    name='currentDateTime'
                    variant='outlined'
                    fullWidth
                    id='currentDateTime'
                    label='Challan Date & Time'
                    // onChange={(e) => setEmployeeName(e.target.value)}
                    autoFocus
                    InputProps={{
                      style: { backgroundColor: '#ffe066' }, // Change 'yellow' to your desired background color
                    }}
                  />
                </Grid>


                <Grid item xs={12} sm={3}>
                  <Grid
                    container
                    spacing={1}
                    style={{ flexSpacing: '2rem' }}
                    xs={12}
                    sm={12}
                    alignItems='center'
                  >
                    <Grid item xs={12} sm={10}>
                      <Box sx={{ minWidth: 20 }}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Select Customer
                          </InputLabel>
                          <Select
                            name='siteInchargeName'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanEntryData.customerName}
                            label='Select Prior Year'
                            onChange={handleChange}
                          >
                            <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      {/* <AddCircleIcon
                        sx={{ fontSize: '45px' }}
                        // fontSize='large'
                        color='primary'
                      /> */}
                      <AddCircleIcon
                        sx={{ fontSize: '45px' }}
                        color='primary'
                        onClick={handleCustomerClick}
                      // onClick={() => setOpenMasterCustomer(true)}
                      />
                      {openMasterCustomer && <MasterCustomerComp
                        openMasterCustomer={openMasterCustomer}
                        // onClose={handleCloseeCancle}
                        setOpenMasterCustomer={setOpenMasterCustomer}

                      />
                      }
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    disabled={true}
                    value={challanEntryData.customerPhoneNumber}
                    autoComplete='manualChallanNumber'
                    name='customerPhoneNumber'
                    variant='outlined'
                    fullWidth
                    id='customerPhoneNumber'
                    label='Customer Phone Number'
                    // onChange={handleChange}
                    // onChange={(e) => setSaleSlipNo(e.target.value)}
                    autoFocus
                    InputProps={{
                      style: { backgroundColor: '#ffe066' }, // Change 'yellow' to your desired background color
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Grid
                    container
                    spacing={1}
                    style={{ flexSpacing: '2rem' }}
                    xs={12}
                    sm={12}
                    alignItems='center'
                  >
                    <Grid item xs={12} sm={10}>
                      <Box sx={{ minWidth: 20 }}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Select Material
                          </InputLabel>
                          <Select
                            name='materialName'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanEntryData.materialName}
                            label='Select Prior Year'
                            onChange={handleChange}
                          >
                            <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '45px' }}
                        // fontSize='large'
                        color='primary'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Grid
                    container
                    spacing={1}
                    style={{ flexSpacing: '2rem' }}
                    xs={12}
                    sm={12}
                    alignItems='center'
                  >
                    <Grid item xs={12} sm={10}>
                      <Box sx={{ minWidth: 20 }}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Customer Destination
                          </InputLabel>
                          <Select
                            name='customerDestination'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanEntryData.customerDestination}
                            label='Select Prior Year'
                            onChange={handleChange}
                          >
                            <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '45px' }}
                        // fontSize='large'
                        color='primary'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    // disabled={true}
                    value={challanEntryData.quantity}
                    autoComplete='quantity'
                    name='quantity'
                    variant='outlined'
                    fullWidth
                    id='quantity'
                    label='Quantity'
                    onChange={handleChange}
                    // onChange={(e) => setSaleSlipNo(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <Grid
                    container
                    spacing={1}
                    style={{ flexSpacing: '2rem' }}
                    xs={12}
                    sm={12}
                    alignItems='center'
                  >
                    <Grid item xs={12} sm={10}>
                      <Box sx={{ minWidth: 20 }}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Select Unit
                          </InputLabel>
                          <Select
                            name='unit'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanEntryData.unit}
                            label='Select Prior Year'
                            onChange={handleChange}
                          >
                            <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>

                      {/* <AddCircleIcon
                        sx={{ fontSize: '45px' }}
                        onClick={handleClick}
                        color='primary'
                      >
                        <MasterUnitComp open={openUnitMaster} />

                      </AddCircleIcon> */}

                      <AddCircleIcon
                        sx={{ fontSize: '45px' }}
                        color='primary'
                        onClick={handleUnitClick}
                      />
                      {openUnitMaster && <MasterUnitComp
                        openUnitMaster={openUnitMaster}
                        // onClose={handleCloseeCancle}
                        setOpenUnitMaster={setOpenUnitMaster}

                      />
                      }

                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid
                    container
                    spacing={1}
                    style={{ flexSpacing: '2rem' }}
                    xs={12}
                    sm={12}
                    alignItems='center'
                  >
                    <Grid item xs={12} sm={10}>
                      <Box sx={{ minWidth: 20 }}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Select Transporter
                          </InputLabel>
                          <Select
                            name='transporter'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanEntryData.transporter}
                            label='Select Prior Year'
                            onChange={handleChange}
                          >
                            <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '45px' }}
                        // fontSize='large'
                        color='primary'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // disabled={true}
                    value={challanEntryData.manualTransportName}
                    autoComplete='quantity'
                    name='manualTransportName'
                    variant='outlined'
                    fullWidth
                    id='quantity'
                    label='Enter Transport If Not in List'
                    onChange={handleChange}
                    // onChange={(e) => setSaleSlipNo(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Grid
                    container
                    spacing={1}
                    style={{ flexSpacing: '2rem' }}
                    xs={12}
                    sm={12}
                    alignItems='center'
                  >
                    <Grid item xs={12} sm={10}>
                      <Box sx={{ minWidth: 20 }}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Select Vehicle
                          </InputLabel>
                          <Select
                            name='vehicle'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanEntryData.vehicle}
                            label='Select Prior Year'
                            onChange={handleChange}
                          >
                            <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '45px' }}
                        // fontSize='large'
                        color='primary'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // disabled={true}
                    value={challanEntryData.manualVehicleName}
                    autoComplete='quantity'
                    name='manualVehicleName'
                    variant='outlined'
                    fullWidth
                    id='quantity'
                    label='Enter Vehicle If Not in List'
                    onChange={handleChange}
                    // onChange={(e) => setSaleSlipNo(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Grid
                    container
                    spacing={1}
                    style={{ flexSpacing: '2rem' }}
                    xs={12}
                    sm={12}
                    alignItems='center'
                  >
                    <Grid item xs={12} sm={10}>
                      <Box sx={{ minWidth: 20 }}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Select Driver
                          </InputLabel>
                          <Select
                            name='driver'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanEntryData.driver}
                            label='Select Prior Year'
                            onChange={handleChange}
                          >
                            <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '45px' }}
                        // fontSize='large'
                        color='primary'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // disabled={true}
                    value={challanEntryData.manualDrivereName}
                    autoComplete='quantity'
                    name='manualDrivereName'
                    variant='outlined'
                    fullWidth
                    id='manualDrivereName'
                    label='Enter Driver If Not in List'
                    onChange={handleChange}
                    // onChange={(e) => setSaleSlipNo(e.target.value)}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid
                    container
                    spacing={1}
                    style={{ flexSpacing: '2rem' }}
                    xs={12}
                    sm={12}
                    alignItems='center'
                  >
                    <Grid item xs={12} sm={10}>
                      <Box sx={{ minWidth: 20 }}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Select Royalty Type
                          </InputLabel>
                          <Select
                            name='royaltyType'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanEntryData.royaltyType}
                            label='Select Royalty Type'
                            onChange={handleChange}
                          >
                            <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '45px' }}
                        // fontSize='large'
                        color='primary'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid
                    container
                    spacing={1}
                    style={{ flexSpacing: '2rem' }}
                    xs={12}
                    sm={12}
                    alignItems='center'
                  >
                    <Grid item xs={12} sm={10}>
                      <Box sx={{ minWidth: 20 }}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Select Loaded By
                          </InputLabel>
                          <Select
                            name='loadedBy'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanEntryData.loadedBy}
                            label='Select Loaded By'
                            onChange={handleChange}
                          >
                            <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '45px' }}
                        // fontSize='large'
                        color='primary'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Grid
                    container
                    spacing={1}
                    style={{ flexSpacing: '2rem' }}
                    xs={12}
                    sm={12}
                    alignItems='center'
                  >
                    <Grid item xs={12} sm={10}>
                      <Box sx={{ minWidth: 20 }}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Select Load Type
                          </InputLabel>
                          <Select
                            name='loadType'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanEntryData.loadType}
                            label='Select Load Type'
                            onChange={handleChange}
                          >
                            <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '45px' }}
                        // fontSize='large'
                        color='primary'
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={4}>
                  <TextField
                    // disabled={true}
                    value={challanEntryData.grossweight}
                    autoComplete='GrossWeight'
                    name='GrossWeight'
                    variant='outlined'
                    fullWidth
                    id='GrossWeight'
                    label='Gross Weight'
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    // disabled={true}
                    value={challanEntryData.emptyWeight}
                    autoComplete='emptyWeight'
                    name='emptyWeight'
                    variant='outlined'
                    fullWidth
                    id='emptyWeight'
                    label='Empty Weight'
                    onChange={handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    disabled={true}
                    value={challanEntryData.netWeight}
                    autoComplete='netWeight'
                    name='netWeight'
                    variant='outlined'
                    fullWidth
                    id='netWeight'
                    label='Net Weight'
                    onChange={handleChange}
                    autoFocus
                    InputProps={{
                      style: { backgroundColor: '#ffe066' }, // Change 'yellow' to your desired background color
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={12} style={{ marginTop: '1rem' }}>
                  <Grid
                    container
                    spacing={2}
                  // style={{ justifyContent: 'flex-end' }}
                  >
                    <Grid item xs={12} sm={3}>
                      <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                      // className={classes.submit}
                      >
                        Save Chalan Entry
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Button
                        // type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                      // className={classes.submit}
                      >
                        Print
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        // type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                      // className={classes.submit}
                      >
                        Preview
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                      // className={classes.submit}
                      >
                        Reset Form
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        variant='contained'
                        color='secondary'
                        fullWidth
                        onClick={() => clear()}
                      >
                        Cancel
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

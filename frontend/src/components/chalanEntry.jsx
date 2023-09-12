import React, { useState, Component, useEffect, forwardRef } from 'react';

import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import MaterialTable, { Column } from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { DialogContentText, TextField } from '@mui/material';

import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleIcon,
  Refresh,
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
import MasterMaterialComp from '../MasterPageComponent/MasterMaterialComp';

import { useSelector } from 'react-redux';

import MasterEmployeeComp from '../MasterPageComponent/MasterEmployeeComp';
import MasterTransporterComp from '../MasterPageComponent/MasterTransporterComp';
import MasterVehicleComp from '../MasterPageComponent/MasterVehicleComp';

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
  deleteName: {
    color: 'red', // Your desired color
    fontWeight: 'bold',
    fontSize: '20px', // Your desired font weight or other styles
    // Add any other custom styles you want
  },
}));

export default function ChallanEntry(props) {
  const [challans, setChallans] = useState([]);
  const classes = useStyles();

  const getMaxChallanNumber = () => {
    if (!challans || challans.length === 0) {
      return 1;
    }

    const maxID = challans.reduce((max, challan) => {
      // Convert supplierId to a number
      const challanNumber = parseInt(challan.challanNumber);

      // Check if challanNumber is greater than the current max
      if (challanNumber > max) {
        return challanNumber; // Update max if supplierId is greater
      } else {
        return max; // Keep the current max if supplierId is not greater
      }
    }, 0); // Initialize max with 0

    return maxID + 1;
  };

  const columns = [
    { title: 'MongoDB Challan ID', field: '_id', hidden: true },
    { title: 'Challan No.', field: 'challanNumber' },
    { title: 'Manual Challan No.', field: 'mChallanNo' },
    { title: 'Mine / Source Name', field: 'mineSourceName' },
    { title: 'Site Incharge', field: 'siteInchargeName' },
    {
      title: 'Date & Time',
      field: 'currentDateTime',
      render: (rowData) =>
        new Date(rowData.currentDateTime).toLocaleString('en-GB'),
    },
    { title: 'Customer Name', field: 'customerName' },
    { title: 'Customer Phone No.', field: 'customerPhoneNumber' },
    { title: 'Material', field: 'materialName' },
    { title: 'Destination', field: 'customerDestination' },
    { title: 'Quantity', field: 'quantity' },
    { title: 'Unit', field: 'unit' },
    { title: 'Transporter', field: 'transporter' },
    { title: 'Manual Transporter', field: 'manualTransportName' },
    { title: 'vehicle', field: 'vehicle' },
    { title: 'Manual Vehicle', field: 'manualVehicleName' },
    { title: 'Driver', field: 'driver' },
    { title: 'Manual Driver', field: 'manualDrivereName' },
    { title: 'Royalty Type', field: 'royaltyType' },
    { title: 'Loaded By', field: 'loadedBy' },
    { title: 'Load Type', field: 'loadType' },
    { title: 'Gross Weight', field: 'grossweight' },
    { title: 'Manual Gross Weight', field: 'mGrossweight' },
    { title: 'Empty Weight', field: 'emptyWeight' },
    { title: 'Net Weight', field: 'netWeight' },
  ];

  const [open, setOpen] = useState(false);
  const [openUnitMaster, setOpenUnitMaster] = useState(false);
  const [openSourceMine, setOpenSourceMine] = useState(false);
  const [openMasterCustomer, setOpenMasterCustomer] = useState(false);
  const [openMaterialpage, setOpenMaterialpage] = useState(false);
  const [openSiteIncharge, setOpenSiteIncharge] = useState(false);
  const [openMasterTransporter, setOpenMasterTransporter] = useState(false);
  const [openMasterVehicle, setOpenMasterVehicle] = useState(false);

  const [currentDateTime, setCurrentDateTime] = useState(
    new Date().toLocaleString('en-GB')
  );
  const [customerNameChange, setCustomerNameChange] = useState('');
  const [challanEntryData, setChallanEntryData] = useState({
    challanNumber: '',
    mChallanNo: '',
    mineSourceName: '',
    siteInchargeName: '',
    customerName: '',
    currentDateTime: currentDateTime,
    customerPhoneNumber: null,
    materialName: '',
    customerDestination: '',
    quantity: null,
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
    mGrossweight: '',
    emptyWeight: '',
    netWeight: '',
  });

  console.log(challanEntryData);

  const [selectedRowId, setSelectedRowId] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [customerDeleteName, setCustomerDeleteName] = useState('');
  ///////////////////// All masters data /////////////////

  const [mineSource, setMineSource] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  // const [material, setMaterial] = useState([]);
  const [materialRate, setMaterialRate] = useState([]);
  const [allUnits, setAllUnits] = useState([]);
  const [transportData, setTransportData] = useState([]);
  const [vehiclesdata, setVehiclesdata] = useState([]);
  const [driversData, setDriversData] = useState([]);
  const [loadedBy, setLoadedBy] = useState([]);
  const [loadType, setLoadType] = useState([]);

  ////////////////////////////////////////////////////////

  /////////////////////// Get all Masters start ///////////////////
  const getMineSource = async () => {
    try {
      const response = await axios.get('source/get/sourcemaster');
      setMineSource(response.data.sourcemaster);
    } catch (error) {
      console.log(error);
    }
  };

  const getEmployees = async () => {
    try {
      const response = await axios.get('employee/get-employee');
      setEmployees(response.data.employees);
    } catch (error) {
      console.log(error);
    }
  };

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

  // const getMaterial = async () => {
  //   try {
  //     const response = await axios.get('materialmaster/get-materialmaster');
  //     console.log(response.data.materialmasters);
  //     setMaterial(response.data.materialmasters);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const getMaterialRate = async () => {
    try {
      const response = await axios.get('materialrate/get/materialrate');
      // console.log(response.data.materialrates);
      setMaterialRate(response.data.materialrates);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaterialRateInfo = (custName) => {
    let materialRateInfo = materialRate.filter((item) => {
      return item.customerName.trim() === custName.trim();
    });
    // let materialRateInfo = materialRate.find((item) => {
    //   return item.customerName.trim() === custName.trim();
    // });
    // console.log(materialRateInfo);
    return materialRateInfo;
  };

  const getVehicleNumber = (vehicleName) => {
    // let materialRateInfo = materialRate.filter((item) => {
    //   return item.customerName.trim() === custName.trim();
    // });
    let vehicle = vehiclesdata.find((item) => {
      return item.vehicleTypes.trim() === vehicleName.trim();
    });
    // console.log(materialRateInfo);
    return vehicle;
  };

  const getAllUnits = async () => {
    try {
      const { data } = await axios.get(`/unitmaster/get-unitmasters`);
      setAllUnits(data.unitmasters);
    } catch (err) {
      console.log(err);
    }
  };

  const getTransport = async () => {
    try {
      const response = await axios.get('transport/get-transport');

      setTransportData(response.data.transports);
      // console.log(transportData);
    } catch (error) {
      console.log(error);
    }
  };

  const getVehicle = async () => {
    try {
      const response = await axios.get('vehicle/get-vehicle');
      setVehiclesdata(response.data.vehicles);
    } catch (error) {
      console.log(error);
    }
  };

  const getdriversMaster = async () => {
    try {
      const response = await axios.get('driverMaster/get-driverMaster');

      setDriversData(response.data.driverMasters);
      // console.log(driversData);
    } catch (error) {
      console.log(error);
    }
  };

  const getLoaderMaster = () => {
    axios
      .get('loaderMaster/get-loadermaster')
      .then((res) => {
        setLoadedBy(res.data.loaderMasters);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLoadType = () => {
    axios
      .get('loadTypemaster/get-loadType')
      .then((res) => {
        setLoadType(res.data.loadTypes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEmptyWeight = (vehicleName) => {
    // let materialRateInfo = materialRate.filter((item) => {
    //   return item.customerName.trim() === custName.trim();
    // });
    let vehicle = vehiclesdata.find((item) => {
      return item.vehicleTypes === vehicleName;
    });
    // console.log(vehicle);
    return vehicle;
  };

  const getMaxCustomerId = () => {
    if (!customers || customers.length === 0) {
      return 1;
    }

    const maxID = customers.reduce((max, customer) => {
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
  //////////////////////////////////////////////////////////
  useEffect(() => {
    setChallanEntryData({
      ...challanEntryData,
      challanNumber: getMaxChallanNumber(),
    });
    // getMaxChallanNumber();
    getAllChallans();
    getMineSource();
    getEmployees();
    getAllCustomers();
    // getMaterial();
    getMaterialRate();
    getAllUnits();
    getTransport();
    getVehicle();
    getdriversMaster();
    getLoaderMaster();
    getLoadType();
    getMaxCustomerId();
  }, [
    open,
    openUnitMaster,
    openSourceMine,
    openMasterCustomer,
    openMaterialpage,
    openSiteIncharge,
    openMasterTransporter,
    openMasterVehicle,
  ]);
  // openUnitMaster, openSourceMine, openMasterCustomer, openMaterialpage, openSiteIncharge, openMasterTransporter, openMasterVehicle

  const getAllChallans = () => {
    axios
      .get('challan/all-challans')
      .then((res) => {
        console.log(res.data);
        setChallans(res.data.challans);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /////////////////////// Get all Masters End ///////////////////

  // maxID OF all PopUp Componennt start

  const getMaxUnitMasterId = () => {
    if (!allUnits || allUnits.length === 0) {
      // Handle the case where data.UnitMaster is null or empty
      return 1;
    }
    const maxID = allUnits.reduce((max, unitmaster) => {
      // Convert UnitMasterId to a number
      const unitmasterId = parseInt(unitmaster.unitmasterId);
      // Check if UnitMasterId is greater than the current max
      if (unitmasterId > max) {
        return unitmasterId; // Update max if UnitMasterId is greater
      } else {
        return max; // Keep the current max if UnitMasterId is not greater
      }
    }, 0); // Initialize max with 0
    return maxID + 1;
  };

  const getMaxSourceId = () => {
    if (!mineSource || mineSource.length === 0) {
      return 1;
    }
    const maxID = mineSource.reduce((max, mineSource) => {
      const sourceId = parseInt(mineSource.sourceId);
      if (sourceId > max) {
        return sourceId;
      } else {
        return max;
      }
    }, 0);
    return maxID + 1;
  };

  const getMaxEmpId = () => {
    if (!employees || employees.length === 0) {
      // Handle the case where data.customer is null or empty
      return 1;
    }
    const maxID = employees.reduce((max, employees) => {
      // Convert customerId to a number
      const empId = parseInt(employees.empId);
      // Check if customerId is greater than the current max
      if (empId > max) {
        return empId; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0
    return maxID + 1;
  };

  const getMaxtransportId = () => {
    if (!transportData || transportData.length === 0) {
      // Handle the case where data.customer is null or empty
      return 1;
    }
    const maxID = transportData.reduce((max, transportData) => {
      // Convert customerId to a number
      const transportId = parseInt(transportData.transportId);
      // Check if customerId is greater than the current max
      if (transportId > max) {
        return transportId; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0
    return maxID + 1;
  };

  const getMaxVehicleId = () => {
    if (!vehiclesdata || vehiclesdata.length === 0) {
      // Handle the case where data.customer is null or empty
      return 1;
    }
    const maxID = vehiclesdata.reduce((max, vehiclesdata) => {
      // Convert customerId to a number
      const vehicleId = parseInt(vehiclesdata.vehicleId);
      // Check if customerId is greater than the current max
      if (vehicleId > max) {
        return vehicleId; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0
    return maxID + 1;
  };

  // maxID OF all PopUp Componennt end

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'customerName') {
      const nameString = value.split(',')[0];
      const phoneString = value.split(',')[1];
      setCustomerNameChange(value);
      setChallanEntryData({
        ...challanEntryData,
        [name]: nameString,
        customerPhoneNumber: phoneString,
      });
      return;
    }
    if (name === 'vehicle') {
      setChallanEntryData({
        ...challanEntryData,
        [name]: value,
        emptyWeight: getEmptyWeight(value)?.vehicleWeight,
        manualVehicleName: '',
      });
      return;
    }
    if (name === 'driver') {
      setChallanEntryData({
        ...challanEntryData,
        [name]: value,
        manualDrivereName: '',
      });
      return;
    }
    if (name === 'transporter') {
      setChallanEntryData({
        ...challanEntryData,
        [name]: value,
        manualTransportName: '',
      });
      return;
    }

    setChallanEntryData({
      ...challanEntryData,
      [name]: value,
    });
  };

  const handleCloseCancel = () => {
    setOpen(false);
    handleReset();
  };
  const handleReset = () => {
    setCustomerNameChange('');
    setChallanEntryData({
      ...challanEntryData,
      challanNumber: getMaxChallanNumber(),
      mChallanNo: '',
      mineSourceName: '',
      siteInchargeName: '',
      customerName: '',
      currentDateTime: currentDateTime,
      customerPhoneNumber: null,
      materialName: '',
      customerDestination: '',
      quantity: null,
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData(e.currentTarget);
    newFormData.append('challanNumber', challanEntryData.challanNumber);
    newFormData.append('customerName', challanEntryData.customerName);
    newFormData.append(
      'customerPhoneNumber',
      challanEntryData.customerPhoneNumber
    );
    newFormData.append('currentDateTime', currentDateTime);
    newFormData.append('emptyWeight', challanEntryData.emptyWeight);
    newFormData.append('netWeight', challanEntryData.netWeight);
    newFormData.append('quantity', challanEntryData.quantity);
    const newForm = Object.fromEntries(newFormData);
    console.log('SUBMIT🔥🔥🔥', newForm);

    try {
      const { data } = await axios.post(`/challan/create-challan`, newForm);

      if (data?.success === true) {
        toast.success('Challan Added Successfully');
        getAllChallans();
        // handleCloseCancel();
        getMaxChallanNumber();
      }
    } catch (err) {
      console.log(err);
    }
  };

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
    const challanContent = `
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
          }
          .div-2-section-1 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 2rem;
          }
          .div-1-section-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 3.2rem;
          }
          .div-2-section-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            column-gap: 2rem;
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
              <p>CHALLAN NO. :</p>
              <p>${challanEntryData.challanNumber}</p>
              <p>CUSTOMER NAME :</p>
              <p>${challanEntryData.customerName}</p>
              <p>MOBILE NO. :</p>
              <p>${challanEntryData.customerPhoneNumber}</p>
              <p>DESTINATION :</p>
              <p>${challanEntryData.customerDestination}</p>
            </div>
            <div class="div-2-section-1">
              <p>VEHICLE NO. :</p>
              <p>${
                getVehicleNumber(challanEntryData.vehicle)?.licensePlateNumber
              }</p>
              <p>MATERIAL NAME :</p>
              <p>${challanEntryData.materialName}</p>
              <p>SOURCE / MINE :</p>
              <p>${challanEntryData.mineSourceName}</p>
            </div>
          </div>
          <hr />
          <div class="section section-2">
            <div class="div-1-section-2">
              <p>GROSS WEIGHT :</p>
              <p>${challanEntryData.grossweight}</p>
              <p>TARE WEIGHT :</p>
              <p>${challanEntryData.emptyWeight}</p>
              <p>NET WEIGHT :</p>
              <p>${challanEntryData.netWeight}</p>
            </div>
            <div class="div-2-section-2">
              <p>DATE :</p>
              <p>${new Date().toLocaleDateString('en-GB')}</p>
              <p>TIME :</p>
              <p>${new Date().toLocaleTimeString('en-GB')}</p>
              <p>NET WT IN WORDS</p>
              <p>${challanEntryData.unit}</p>
            </div>
          </div>
          <hr />

          <div class="section">
            <p>SITE INCHARGE SIGNATURE: </p>
            <p>${challanEntryData.siteInchargeName}</p>
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
    printWindow.document.write(challanContent);
    printWindow.document.close();
    printWindow.print();
  };

  const handlePreview = () => {};

  const handleDelete = async (id) => {
    try {
      // dispatch(deleteCustomerRequest());
      const { data } = await axios.delete(
        `/challan/delete-challan/${id}`
        // {
        //   withCredentials: true,
        // }
      );

      // console.log(data);
      if (data?.success === true) {
        // dispatch(deleteCustomer(`${data.message}`));
        toast.success(`${data.message}`);
        getAllChallans();
      }
    } catch (err) {
      // dispatch(deleteCustomerFailed({ err }));
      console.log(err);
    }
  };

  const actions = [
    {
      icon: () => <Refresh />,
      tooltip: 'Refresh Data',
      isFreeAction: true,
      onClick: () => {
        getAllChallans();
      },
    },
    {
      icon: () => <EditIcon />,
      tooltip: 'Edit Factory',
      onClick: (event, rowData) => {
        // refresh();
        // UpdateFactory(rowData.CommissionRulesId);
      },
    },
    {
      icon: () => <DeleIcon />,
      tooltip: 'Delete Factory',
      onClick: (event, rowData) => {
        setSelectedRowId(rowData._id);
        setShowDeleteConfirm(true);
        setCustomerDeleteName(rowData.customerName);
      },
    },
  ];

  const downloadPdf = () => {
    const doc = new jsPDF();
    doc.text('Sales Commission Details', 20, 10);
    doc.autoTable({
      theme: 'grid',
      columns: columns.map((col) => ({ ...col, dataKey: col.field })),
      body: challans,
    });
    doc.save('SalesCommission.pdf');
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // Update the current date and time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date().toLocaleString('en-GB'));
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
  // const handleCustomerClick = () => {
  //   console.log('I was clicked');
  //   setOpenMasterCustomer(true);
  //   // setOpenSourceMine(true)
  // };
  const handleMasterCompClick = () => {
    setOpenMaterialpage(true);
    // setOpenSourceMine(true)
  };
  const handleSiteInchargeClick = () => {
    setOpenSiteIncharge(true);
    // setOpenSourceMine(true)
  };
  const handleTransportClick = () => {
    setOpenMasterTransporter(true);
    // setOpenSourceMine(true)
  };
  const handleVechicleClick = () => {
    setOpenMasterVehicle(true);
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
            data={challans}
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
              exportFileName: 'All Chalan Entries',
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
        // onClose={handleClose}
        onClose={handleCloseCancel}
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
                // onClick={handleClose}
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
              <Grid container spacing={3}>
                <Grid style={{ marginRight: '4.8rem' }} item xs={12} sm={1}>
                  <TextField
                    style={{ width: '9.5rem', backgroundColor: '#fff9db' }}
                    disabled={true}
                    value={challanEntryData.challanNumber}
                    // value={getMaxChallanNumber()}
                    autoComplete='challanNumber'
                    name='challanNumber'
                    variant='outlined'
                    fullWidth
                    id='challanNumber'
                    label='Challan No.'
                    // onChange={handleChange}
                    // onChange={(e) => setSaleSlipNo(e.target.value)}
                    autoFocus
                  />
                </Grid>

                <Grid item xs={12} sm={2}>
                  <TextField
                    type='number'
                    // disabled={true}
                    value={challanEntryData.mChallanNo}
                    autoComplete='mChallanNo'
                    name='mChallanNo'
                    variant='outlined'
                    fullWidth
                    id='mChallanNo'
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
                            {mineSource.map((el) => (
                              <MenuItem key={el.sourceId} value={el.sourceName}>
                                {el.sourceName}
                              </MenuItem>
                            ))}
                            {/* <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem> */}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                      {/* <AddCircleIcon
                        sx={{ fontSize: '30px' }}
                        // fontSize='large'
                        color='primary'
                      /> */}
                      <AddCircleIcon
                        sx={{ fontSize: '30px' }}
                        color='primary'
                        onClick={handleMineSourceClick}
                      />
                      {openSourceMine && (
                        <MasterSourceMineComp
                          openSourceMine={openSourceMine}
                          getMaxSourceId={getMaxSourceId}
                          // onClose={handleCloseeCancle}
                          setOpenSourceMine={setOpenSourceMine}
                        />
                      )}
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
                            {employees.map((el) => (
                              <MenuItem key={el.empId} value={el.empName}>
                                {el.empName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '30px' }}
                        // fontSize='large'
                        color='primary'
                        onClick={handleSiteInchargeClick}
                      />
                      {openSiteIncharge && (
                        <MasterEmployeeComp
                          openSiteIncharge={openSiteIncharge}
                          getMaxEmpId={getMaxEmpId}
                          // onClose={handleCloseeCancle}
                          setOpenSiteIncharge={setOpenSiteIncharge}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={2}>
                  <TextField
                    style={{ width: '12rem', backgroundColor: '#fff9db' }}
                    disabled={true}
                    value={currentDateTime.toLocaleString('en-GB')}
                    autoComplete='currentDateTime'
                    name='currentDateTime'
                    variant='outlined'
                    fullWidth
                    id='currentDateTime'
                    label='Challan Date & Time'
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
                            Select Customer
                          </InputLabel>
                          <Select
                            name='customerName'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={customerNameChange}
                            // value={challanEntryData.customerName}
                            label='Select Prior Year'
                            // onChange={handleCustomerNameChange}
                            onChange={handleChange}
                          >
                            {customers.map((el) => (
                              <MenuItem
                                key={el.customerId}
                                value={`${el.customerName},${el.phoneNumber}`}
                              >
                                {el.customerName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      {/* <AddCircleIcon
                        sx={{ fontSize: '30px' }}
                        // fontSize='large'
                        color='primary'
                      /> */}
                      {/* <AddCircleIcon
                        sx={{ fontSize: '30px' }}
                        color='primary'
                        onClick={handleCustomerClick}
                        // onClick={() => setOpenMasterCustomer(true)}
                      />
                      {openMasterCustomer && (
                        <MasterCustomerComp
                          getMaxCustomerId={getMaxCustomerId}
                          openMasterCustomer={openMasterCustomer}
                          // onClose={handleCloseeCancle}
                          setOpenMasterCustomer={setOpenMasterCustomer}
                        />
                      )} */}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    style={{ backgroundColor: '#fff9db' }}
                    // type='number'
                    disabled={true}
                    value={challanEntryData.customerPhoneNumber}
                    autoComplete='customerPhoneNumber'
                    name='customerPhoneNumber'
                    variant='outlined'
                    fullWidth
                    id='customerPhoneNumber'
                    label='Customer Phone Number'
                    // onChange={handleChange}
                    // onChange={(e) => setSaleSlipNo(e.target.value)}
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
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
                    <Grid item xs={12} sm={12}>
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
                            {/* <MenuItem value={challanEntryData.materialName}>
                              {challanEntryData.materialName}
                            </MenuItem> */}
                            {getMaterialRateInfo(
                              challanEntryData.customerName
                            ).map((el) => (
                              <MenuItem
                                key={el.materialId}
                                value={el.materialName}
                              >
                                {el.materialName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    {/* <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '30px' }}
                        // fontSize='large'
                        color='primary'
                        onClick={handleMasterCompClick}
                      />
                      {openMaterialpage && (
                        <MasterMaterialComp
                          openMaterialpage={openMaterialpage}
                          // onClose={handleCloseeCancle}
                          setOpenMaterialpage={setOpenMaterialpage}
                        />
                      )}
                    </Grid> */}
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
                    <Grid item xs={12} sm={12}>
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
                            {getMaterialRateInfo(
                              challanEntryData.customerName
                            ).map((el) => (
                              <MenuItem
                                key={el.materialId}
                                value={el.locationName}
                              >
                                {el.locationName}
                              </MenuItem>
                            ))}
                            {/* <MenuItem
                              value={challanEntryData.customerDestination}
                            >
                              {challanEntryData.customerDestination}
                            </MenuItem> */}
                            {/* <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem> */}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    {/* <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '30px' }}
                        // fontSize='large'
                        color='primary'
                      />
                    </Grid> */}
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={2}>
                  <TextField
                    type='number'
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
                            {allUnits.map((el) => (
                              <MenuItem
                                key={el.unitmasterId}
                                value={el.unitName}
                              >
                                {el.unitName}
                              </MenuItem>
                            ))}
                            {/* <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem> */}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      {/* <AddCircleIcon
                        sx={{ fontSize: '30px' }}
                        // fontSize='large'
                        color='primary'
                      /> */}
                      <AddCircleIcon
                        sx={{ fontSize: '30px' }}
                        color='primary'
                        onClick={handleUnitClick}
                      />
                      {openUnitMaster && (
                        <MasterUnitComp
                          openUnitMaster={openUnitMaster}
                          getMaxUnitMasterId={getMaxUnitMasterId}
                          // onClose={handleCloseeCancle}
                          setOpenUnitMaster={setOpenUnitMaster}
                        />
                      )}
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
                            {transportData.map((el) => (
                              <MenuItem
                                key={el.transportId}
                                value={el.transportname}
                              >
                                {el.transportname}
                              </MenuItem>
                            ))}
                            <MenuItem
                              style={{
                                color: '#495057',
                                backgroundColor: '#e9ecef',
                                display: 'flex',
                                justifyContent: 'center',
                                border: '3px solid #adb5bd',
                                borderRadius: '0.5rem',
                                margin: '4px',
                              }}
                              value='Others'
                            >
                              Others
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '30px' }}
                        color='primary'
                        onClick={handleTransportClick}
                      />
                      {openMasterTransporter && (
                        <MasterTransporterComp
                          openMasterTransporter={openMasterTransporter}
                          getMaxtransportId={getMaxtransportId}
                          setOpenMasterTransporter={setOpenMasterTransporter}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    disabled={
                      challanEntryData.transporter === 'Others' ? false : true
                    }
                    value={challanEntryData.manualTransportName}
                    autoComplete='manualTransportName'
                    name='manualTransportName'
                    variant='outlined'
                    fullWidth
                    id='manualTransportName'
                    label='Enter Transport If Not in List'
                    onChange={handleChange}
                    autoFocus
                    style={{
                      backgroundColor:
                        challanEntryData.transporter !== 'Others'
                          ? '#fff9db'
                          : undefined,
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
                            {vehiclesdata.map((el) => (
                              <MenuItem
                                key={el.vehicleId}
                                value={el.vehicleTypes}
                              >
                                {`${el.vehicleTypes} - ${el.licensePlateNumber}`}
                              </MenuItem>
                            ))}
                            <MenuItem
                              style={{
                                color: '#495057',
                                backgroundColor: '#e9ecef',
                                display: 'flex',
                                justifyContent: 'center',
                                border: '3px solid #adb5bd',
                                borderRadius: '0.5rem',
                                margin: '4px',
                              }}
                              value='Others'
                            >
                              Others
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '30px' }}
                        color='primary'
                        onClick={handleVechicleClick}
                      />
                      {openMasterVehicle && (
                        <MasterVehicleComp
                          openMasterVehicle={openMasterVehicle}
                          getMaxVehicleId={getMaxVehicleId}
                          setOpenMasterVehicle={setOpenMasterVehicle}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    disabled={
                      challanEntryData.vehicle === 'Others' ? false : true
                    }
                    value={challanEntryData.manualVehicleName.toUpperCase()}
                    autoComplete='manualVehicleName'
                    name='manualVehicleName'
                    variant='outlined'
                    fullWidth
                    id='manualVehicleName'
                    label='Enter Vehicle Name & Number'
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
                            {driversData.map((el) => (
                              <MenuItem key={el.driverID} value={el.driverName}>
                                {el.driverName}
                              </MenuItem>
                            ))}
                            <MenuItem
                              style={{
                                color: '#495057',
                                backgroundColor: '#e9ecef',
                                display: 'flex',
                                justifyContent: 'center',
                                border: '3px solid #adb5bd',
                                borderRadius: '0.5rem',
                                margin: '4px',
                              }}
                              value='Others'
                            >
                              Others
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '30px' }}
                        // fontSize='large'
                        color='primary'
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    disabled={
                      challanEntryData.driver === 'Others' ? false : true
                    }
                    value={challanEntryData.manualDrivereName}
                    autoComplete='manualDrivereName'
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
                            <MenuItem
                              style={{
                                color: '#495057',
                                backgroundColor: '#e9ecef',
                                display: 'flex',
                                justifyContent: 'center',
                                border: '3px solid #adb5bd',
                                borderRadius: '0.5rem',
                                margin: '4px',
                              }}
                              value='None'
                            >
                              None
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '30px' }}
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
                            {loadedBy.map((el) => (
                              <MenuItem key={el.loaderId} value={el.loaderName}>
                                {el.loaderName}
                              </MenuItem>
                            ))}
                            {/* <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem> */}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '30px' }}
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
                            {loadType.map((el) => (
                              <MenuItem key={el.loadTypeId} value={el.loadType}>
                                {el.loadType}
                              </MenuItem>
                            ))}
                            {/* <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem> */}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <AddCircleIcon
                        sx={{ fontSize: '30px' }}
                        // fontSize='large'
                        color='primary'
                      />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    // disabled={true}
                    value={challanEntryData.grossweight}
                    autoComplete='grossweight'
                    name='grossweight'
                    variant='outlined'
                    fullWidth
                    id='grossweight'
                    label='Gross Weight'
                    onChange={handleChange}
                    autoFocus
                    InputProps={{
                      style: { backgroundColor: '#d3f9d8' }, // Change 'yellow' to your desired background color
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    // disabled={true}
                    value={challanEntryData.mGrossweight}
                    autoComplete='mGrossweight'
                    name='mGrossweight'
                    variant='outlined'
                    fullWidth
                    id='mGrossweight'
                    label='Manual Gross Weight'
                    onChange={handleChange}
                    autoFocus
                    InputProps={{
                      style: { backgroundColor: '#d3f9d8' }, // Change 'yellow' to your desired background color
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    disabled={true}
                    // value={
                    //   getEmptyWeight(challanEntryData.vehicle)?.vehicleWeight
                    // }
                    value={challanEntryData.emptyWeight}
                    autoComplete='emptyWeight'
                    name='emptyWeight'
                    variant='outlined'
                    fullWidth
                    id='emptyWeight'
                    label='Empty Weight'
                    // onChange={handleChange}
                    autoFocus
                    InputProps={{
                      style: { backgroundColor: '#d3f9d8' }, // Change 'yellow' to your desired background color
                    }}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextField
                    disabled={true}
                    value={challanEntryData.netWeight}
                    autoComplete='netWeight'
                    name='netWeight'
                    variant='outlined'
                    fullWidth
                    id='netWeight'
                    label='Net Weight'
                    // onChange={handleChange}
                    autoFocus
                    InputProps={{
                      style: { backgroundColor: '#d3f9d8' }, // Change 'yellow' to your desired background color
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
                        onClick={handlePrint}
                        // onClick={convertHtmlToPdfAndPrint(challanContent)}
                        // onClick={convertHtmlToPdfAndPrintInSamePage(
                        //   challanContent
                        // )}
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
                        // onClick={handlePreview}
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
                        onClick={handleReset}
                      >
                        Reset Form
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={2}>
                      <Button
                        variant='contained'
                        color='secondary'
                        fullWidth
                        onClick={handleCloseCancel}
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
                  getAllChallans();
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

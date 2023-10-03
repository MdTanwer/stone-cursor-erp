import React, { useState, Component, useEffect, forwardRef } from 'react';
import numberToWords from 'number-to-words';

/////////////////// Date & TIme ///////////////////////////
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
////////////////////////////////////////////////////////////
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
// import BankDetails from './bankDetails';
import MasterUnitComp from '../../MasterPageComponent/MasterUnitComp';
import MasterSourceMineComp from '../../MasterPageComponent/MasterSourceMineComp';
// import MasterCustomerComp from '../MasterPageComponent/MasterCustomerComp';
import MasterMaterialComp from '../../MasterPageComponent/MasterMaterialComp';

import { useSelector } from 'react-redux';

import MasterEmployeeComp from '../../MasterPageComponent/MasterEmployeeComp';
import MasterTransporterComp from '../../MasterPageComponent/MasterTransporterComp';
import MasterVehicleComp from '../../MasterPageComponent/MasterVehicleComp';
import MasterDriverComp from '../../MasterPageComponent/MasterDriverComp';
import MasterLoaderComp from '../../MasterPageComponent/MasterLoaderComp';
import MasterLoadType from '../../MasterPageComponent/MasterLoadType';
import { Dayjs } from 'dayjs';

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

export default function ChallanUpdateForm({
  updateOpen,
  setUpdateOpen,
  rowId,
  setChallans,
}) {
  const [isUpdated, setIsUpdated] = useState(false);
  const [isPrint, setIsPrint] = useState(true);
  const { name, email } = useSelector((state) => state.user.user);
  // const [challans, setChallans] = useState([]);
  const classes = useStyles();

  // const getMaxChallanNumber = () => {
  //   if (!challans || challans.length === 0) {
  //     return 1;
  //   }

  //   const maxID = challans.reduce((max, challan) => {
  //     // Convert supplierId to a number
  //     const challanNumber = parseInt(challan.challanNumber);

  //     // Check if challanNumber is greater than the current max
  //     if (challanNumber > max) {
  //       return challanNumber; // Update max if supplierId is greater
  //     } else {
  //       return max; // Keep the current max if supplierId is not greater
  //     }
  //   }, 0); // Initialize max with 0

  //   return maxID + 1;
  // };

  const initialWeightState = {
    grossweight: '',
    grossWeightDateTime: '',
    miningWeight: '',
    nonMiningWeight: '',
    emptyWeight: '',
    emptyWeightDateTime: '',
  };

  const initialChallanState = {
    challanNumber: '',
    mChallanNo: '',
    mineSourceName: '',
    siteInchargeName: '',
    customerName: '',
    currentDate: '',
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
    grossWeightDateTime: '',
    miningWeight: '',
    nonMiningWeight: '',
    emptyWeight: '',
    emptyWeightDateTime: '',
    netWeight: '',
  };

  const [open, setOpen] = useState(false);
  const [openUnitMaster, setOpenUnitMaster] = useState(false);
  const [openSourceMine, setOpenSourceMine] = useState(false);
  // const [openMasterCustomer, setOpenMasterCustomer] = useState(false);
  // const [openMaterialpage, setOpenMaterialpage] = useState(false);
  const [openSiteIncharge, setOpenSiteIncharge] = useState(false);
  const [openMasterTransporter, setOpenMasterTransporter] = useState(false);
  const [openMasterVehicle, setOpenMasterVehicle] = useState(false);
  const [openMasterDriver, setOpenMasterDriver] = useState(false);
  const [openMasterLoader, setOpenMasterLoader] = useState(false);
  const [openMasterLoadtype, setOpenMasterLoadtype] = useState(false);

  const [challanEntryData, setChallanEntryData] = useState({
    ...initialChallanState,
  });

  const [weightsData, setWeightsData] = useState({
    ...initialWeightState,
  });

  const [selectedRowId, setSelectedRowId] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showWeightBox, setShowWeightBox] = useState(false);
  const [customerDeleteName, setCustomerDeleteName] = useState('');
  const [challanData, setChallanData] = useState({ ...initialChallanState });
  // console.log(challanData);
  ///////////////////// All masters data /////////////////

  const [mineSource, setMineSource] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [customers, setCustomers] = useState([]);
  // const [material, setMaterial] = useState([]);
  const [materialRate, setMaterialRate] = useState([]);
  const [uniqueCustomerName, setUniqueCustomerName] = useState([]);
  const [allUnits, setAllUnits] = useState([]);
  const [transportData, setTransportData] = useState([]);
  const [vehiclesdata, setVehiclesdata] = useState([]);
  const [driversData, setDriversData] = useState([]);
  const [loadedBy, setLoadedBy] = useState([]);
  const [loadType, setLoadType] = useState([]);
  const [miningRoyalty, setMiningRoyalty] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs(new Date()));
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

  const getMaterialRate = async () => {
    try {
      const response = await axios.get('materialrate/get/materialrate');
      // console.log(response.data.materialrates);
      setMaterialRate(response.data.materialrates);
      setUniqueCustomerName([
        ...new Set(
          response.data.materialrates.map((item) => item.customerName)
        ),
      ]);
    } catch (error) {
      console.log(error);
    }
  };

  const getMaterialRateInfo = (custName) => {
    let materialRateInfo = materialRate.filter((item) => {
      return item.customerName?.trim() === custName?.trim();
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

  // const getMaxCustomerId = () => {
  //   if (!customers || customers.length === 0) {
  //     return 1;
  //   }

  //   const maxID = customers.reduce((max, customer) => {
  //     // Convert customerId to a number
  //     const customerId = parseInt(customer.customerId);

  //     // Check if customerId is greater than the current max
  //     if (customerId > max) {
  //       return customerId; // Update max if customerId is greater
  //     } else {
  //       return max; // Keep the current max if customerId is not greater
  //     }
  //   }, 0); // Initialize max with 0

  //   return maxID + 1;
  // };

  const getMaxRoyaltyId = () => {
    if (!miningRoyalty || miningRoyalty.length === 0) {
      return 1;
    }
    const maxID = miningRoyalty.reduce((max, miningRoyalty) => {
      const RoyalId = parseInt(miningRoyalty.royltyId);
      if (RoyalId > max) {
        return RoyalId;
      } else {
        return max;
      }
    }, 0);
    return maxID + 1;
  };

  const GetMiningRoyalty = async () => {
    try {
      const response = await axios.get('/miningRoyalty/get/miningroyalty');

      // console.log(response.data.materialmasters);
      setMiningRoyalty(response.data.miningRoyalty);
    } catch (error) {
      console.log(error);
    }
  };

  const getChallan = () => {
    const id = rowId;
    axios
      .get(`/challan/challan-info/${id}`)
      .then((res) => {
        setChallanData(res.data.challan);
        setCurrentDate(dayjs(`${res.data.challan.currentDate}`));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //////////////////////////////////////////////////////////
  // useEffect(() => {
  //   setCurrentDate(dayjs(`${challanData.currentDate}`));
  // }, []);

  useEffect(() => {
    getChallan();

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
    GetMiningRoyalty();
  }, [
    rowId,
    // open,
    // updateOpen,
    openUnitMaster,
    openSourceMine,
    openSiteIncharge,
    openMasterTransporter,
    openMasterVehicle,
    openMasterDriver,
    openMasterLoader,
    openMasterLoadtype,
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

  const getloaderMaxId = () => {
    if (!loadedBy || loadedBy.length === 0) {
      // Handle the case where loadedBy.customer is null or empty
      return 1;
    }
    const maxID = loadedBy.reduce((max, loadedBy) => {
      // Convert customerId to a number
      const loaderId = parseInt(loadedBy.loaderId);
      // Check if customerId is greater than the current max
      if (loaderId > max) {
        return loaderId; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0
    return maxID + 1;
  };

  const getMaxDriverID = () => {
    if (!driversData || driversData.length === 0) {
      // Handle the case where data.customer is null or empty
      return 1;
    }
    const maxID = driversData.reduce((max, driversData) => {
      // Convert customerId to a number
      const driverID = parseInt(driversData.driverID);
      // Check if customerId is greater than the current max
      if (driverID > max) {
        return driverID; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0
    return maxID + 1;
  };

  const getloadTypeMaxId = () => {
    if (!loadType || loadType.length === 0) {
      // Handle the case where loadType.customer is null or empty
      return 1;
    }
    const maxID = loadType.reduce((max, loadType) => {
      // Convert customerId to a number
      const loadTypeId = parseInt(loadType.loadTypeId);
      // Check if customerId is greater than the current max
      if (loadTypeId > max) {
        return loadTypeId; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0
    return maxID + 1;
  };

  // maxID OF all PopUp Componennt end

  const handleDateChange = (newValue) => {
    setCurrentDate(newValue);
    setChallanData({
      ...challanData,
      currentDate: newValue.$d.toLocaleDateString('en-GB'),
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'customerName') {
      setChallanData({
        ...challanData,
        [name]: value,
        customerPhoneNumber: getCustomerPhoneNo(value).phoneNumber,
      });
      return;
    }
    if (name === 'vehicle') {
      setChallanData({
        ...challanData,
        [name]: value,
        // emptyWeight: getEmptyWeight(value)?.vehicleWeight,
        manualVehicleName: '',
      });
      return;
    }
    if (name === 'driver') {
      setChallanData({
        ...challanData,
        [name]: value,
        manualDrivereName: '',
      });
      return;
    }
    if (name === 'transporter') {
      setChallanData({
        ...challanData,
        [name]: value,
        manualTransportName: '',
      });
      return;
    }
    if (value === 'None') {
      setChallanData({
        ...challanData,
        [name]: value,
        miningWeight: '',
        nonMiningWeight: '',
        // netWeight:
        //   parseInt(challanData.grossweight) -
        //   parseInt(challanData.emptyWeight),
      });
      return;
    }

    setChallanData({
      ...challanData,
      [name]: value,
    });
  };

  const handleWeightChange = (e) => {
    const { name, value } = e.target;
    if (name === 'grossweight') {
      setWeightsData({
        ...weightsData,
        [name]: value,
        grossWeightDateTime: new Date().toLocaleString('en-GB'),
      });
      return;
    }
    if (name === 'emptyWeight') {
      setWeightsData({
        ...weightsData,
        [name]: value,
        emptyWeightDateTime: new Date().toLocaleString('en-GB'),
      });
      return;
    }
    setWeightsData({
      ...weightsData,
      [name]: value,
    });
  };

  const handleAddWeightsOnClick = () => {
    setChallanData({
      ...challanData,
      ...weightsData,
      netWeight:
        parseInt(weightsData.grossweight) - parseInt(weightsData.emptyWeight),
    });
    setShowWeightBox(false);
    setTimeout(() => {
      resetWeightData();
    }, 100);
  };

  const resetWeightData = () => {
    setWeightsData({
      ...initialWeightState,
    });
  };

  const handleWeightsClose = () => {
    setShowWeightBox(false);
    resetWeightData();
  };
  const handleCloseCancel = () => {
    handleReset();
    setUpdateOpen(false);
  };

  const handleReset = () => {
    getChallan();
    setCurrentDate(dayjs(`${challanData.currentDate}`));
    setIsUpdated((prev) => (prev = false));
    setIsPrint((prev) => (prev = true));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newFormData = new FormData(e.currentTarget);
    newFormData.append('challanNumber', challanData.challanNumber);
    newFormData.append('customerPhoneNumber', challanData.customerPhoneNumber);
    newFormData.append('currentDate', challanData.currentDate);
    newFormData.append('grossweight', challanData.grossweight);
    newFormData.append('grossWeightDateTime', challanData.grossWeightDateTime);
    newFormData.append('miningWeight', challanData.miningWeight);
    newFormData.append('nonMiningWeight', challanData.nonMiningWeight);
    newFormData.append('manualDrivereName', challanData.manualDrivereName);
    newFormData.append('manualTransportName', challanData.manualTransportName);
    newFormData.append('emptyWeight', challanData.emptyWeight);
    newFormData.append('emptyWeightDateTime', challanData.emptyWeightDateTime);
    newFormData.append('manualVehicleName', challanData.manualVehicleName);
    newFormData.append('netWeight', challanData.netWeight);
    newFormData.append('updatedBy', `Name: ${name}, Email: ${email}`);
    newFormData.append('updatedAt', Date.now());
    // newFormData.append('quantity', challanEntryData.quantity);

    const newForm = Object.fromEntries(newFormData);
    console.log('SUBMIT🔥🔥🔥', newForm);

    try {
      const id = rowId;
      const { data } = await axios.put(
        `/challan/update-challan-info/${id}`,
        newForm
      );
      if (data?.success === true) {
        toast.success('Challan Updated Successfully');
        getAllChallans();
        // handleCloseCancel();
        // getMaxChallanNumber();
        setIsUpdated((prev) => (prev = true));
        setIsPrint((prev) => (prev = false));
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
              <p>CHALLAN NO. :</p>
              <p>${challanData.challanNumber}</p>
              <p>CUSTOMER NAME :</p>
              <p>${challanData.customerName || ''}</p>
              <p>MOBILE NO. :</p>
              <p>${challanData.customerPhoneNumber || ''}</p>
              <p>DESTINATION :</p>
              <p>${challanData.customerDestination || ''}</p>
            </div>
            <div class="div-2-section-1">
              <p>VEHICLE NO. :</p>
              <p>${
                getVehicleNumber(challanData.vehicle)?.licensePlateNumber || ''
              }</p>
              <p>MATERIAL NAME :</p>
              <p>${challanData.materialName || ''}</p>
              <p>SOURCE / MINE :</p>
              <p>${challanData.mineSourceName || ''}</p>
            </div>
          </div>
          <hr />
          <div class="section section-2">
            <div class="div-1-section-2">
              <p>GROSS WEIGHT :</p>
              <p>${
                (challanData.mGrossWeight
                  ? challanData.mGrossWeight
                  : challanData.grossweight) || 0
              }</p>
              <p>TARE WEIGHT :</p>
              <p>${challanData.emptyWeight || 0}</p>
              <p>NET WEIGHT :</p>
              <p>${challanData.netWeight || 0}</p>
            </div>
            <div class="div-2-section-2">
            <p>${
              (challanData.mGrossWeightDateTime
                ? challanData.mGrossWeightDateTime
                : challanData.grossWeightDateTime) || ''
            }</p>
            <p>${challanData.emptyWeightDateTime || ''}</p>
            <div>
              <p class="div-2-section-2-p">${numberToWords.toWords(
                challanData.netWeight || 0
              )}</p>
              <p class="div-2-section-2-p unit">${challanData.unit || ''}</p>
            </div>
            </div>
          </div>
          <hr />

          <div class="section">
            <p>SITE INCHARGE SIGNATURE: </p>
            <p>${challanData.siteInchargeName || ''}</p>
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

  // const handleDelete = async (id) => {
  //   try {
  //     // dispatch(deleteCustomerRequest());
  //     const { data } = await axios.delete(
  //       `/challan/delete-challan/${id}`
  //       // {
  //       //   withCredentials: true,
  //       // }
  //     );

  //     // console.log(data);
  //     if (data?.success === true) {
  //       // dispatch(deleteCustomer(`${data.message}`));
  //       toast.success(`${data.message}`);
  //       getAllChallans();
  //     }
  //   } catch (err) {
  //     // dispatch(deleteCustomerFailed({ err }));
  //     console.log(err);
  //   }
  // };

  // const actions = [
  //   {
  //     icon: () => <Refresh />,
  //     tooltip: 'Refresh Data',
  //     isFreeAction: true,
  //     onClick: () => {
  //       getAllChallans();
  //     },
  //   },
  //   {
  //     icon: () => <EditIcon color='primary' />,
  //     tooltip: 'Edit Factory',
  //     onClick: (event, rowData) => {
  //       // refresh();
  //       // UpdateFactory(rowData.CommissionRulesId);
  //     },
  //   },
  //   {
  //     icon: () => <DeleIcon color='error' />,
  //     tooltip: 'Delete Factory',
  //     onClick: (event, rowData) => {
  //       setSelectedRowId(rowData._id);
  //       setShowDeleteConfirm(true);
  //       setCustomerDeleteName(rowData.customerName);
  //     },
  //   },
  // ];

  // const downloadPdf = () => {
  //   const doc = new jsPDF();
  //   doc.text('Sales Commission Details', 20, 10);
  //   doc.autoTable({
  //     theme: 'grid',
  //     columns: columns.map((col) => ({ ...col, dataKey: col.field })),
  //     body: challans,
  //   });
  //   doc.save('SalesCommission.pdf');
  // };

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
  const handleDriverClick = () => {
    setOpenMasterDriver(true);
    // setOpenSourceMine(true)
  };
  const handleLoaderClick = () => {
    setOpenMasterLoader(true);
    // setOpenSourceMine(true)
  };
  const handleLoadtypeClick = () => {
    setOpenMasterLoadtype(true);
    // setOpenSourceMine(true)
  };
  return (
    <>
      <Dialog
        fullWidth
        // maxWidth='md'
        maxWidth='lg'
        open={updateOpen}
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
                  Update Challan
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
                    value={challanData.challanNumber}
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
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={2}>
                  <TextField
                    type='number'
                    // disabled={true}
                    value={challanData.mChallanNo}
                    autoComplete='mChallanNo'
                    name='mChallanNo'
                    variant='outlined'
                    fullWidth
                    id='mChallanNo'
                    label='M Challan No.'
                    onChange={handleChange}
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
                            required
                            name='mineSourceName'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanData.mineSourceName}
                            label='Select Prior Year'
                            onChange={handleChange}
                          >
                            {mineSource.map((el) => (
                              <MenuItem key={el.sourceId} value={el.sourceName}>
                                {el.sourceName}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={2}>
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
                            required
                            name='siteInchargeName'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanData.siteInchargeName}
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
                  <Box style={{ width: '12rem', backgroundColor: '#fff9db' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        name='currentDate'
                        label='Challan Date'
                        value={currentDate}
                        // value={challanData.currentDate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
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
                            required
                            name='customerName'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            // value={customerNameChange}
                            value={challanData.customerName}
                            label='Select Prior Year'
                            // onChange={handleCustomerNameChange}
                            onChange={handleChange}
                          >
                            {uniqueCustomerName.map((name) => (
                              <MenuItem
                                key={`${name}-${Math.random()}`}
                                value={name}
                              >
                                {name}
                              </MenuItem>
                            ))}
                            {/* {customers.map((el) => (
                              <MenuItem
                                key={el.customerId}
                                value={`${el.customerName},${el.phoneNumber}`}
                              >
                                {el.customerName}
                              </MenuItem>
                            ))} */}
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
                    value={challanData.customerPhoneNumber}
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
                            required
                            name='materialName'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanData.materialName}
                            label='Select Prior Year'
                            onChange={handleChange}
                          >
                            {/* <MenuItem value={challanData.materialName}>
                              {challanData.materialName}
                            </MenuItem> */}
                            {getMaterialRateInfo(challanData.customerName).map(
                              (el) => (
                                <MenuItem
                                  key={el.materialId}
                                  value={el.materialName}
                                >
                                  {el.materialName}
                                </MenuItem>
                              )
                            )}
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
                            required
                            name='customerDestination'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanData.customerDestination}
                            label='Select Prior Year'
                            onChange={handleChange}
                          >
                            {getMaterialRateInfo(challanData.customerName).map(
                              (el) => (
                                <MenuItem
                                  key={el.materialId}
                                  value={el.locationName}
                                >
                                  {el.locationName}
                                </MenuItem>
                              )
                            )}
                            {/* <MenuItem
                              value={challanData.customerDestination}
                            >
                              {challanData.customerDestination}
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
                    required
                    type='number'
                    // disabled={true}
                    value={challanData.quantity}
                    autoComplete='quantity'
                    name='quantity'
                    variant='outlined'
                    fullWidth
                    id='quantity'
                    label='Quantity'
                    onChange={handleChange}
                    // onChange={(e) => setSaleSlipNo(e.target.value)}
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                            required
                            name='unit'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanData.unit}
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
                            required
                            name='transporter'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanData.transporter}
                            label='Select Transporter'
                            onChange={handleChange}
                          >
                            {/* <MenuItem
                              style={{
                                color: '#495057',
                                backgroundColor: '#e9ecef',
                                display: 'flex',
                                justifyContent: 'center',
                                // border: '3px solid #adb5bd',
                                borderRadius: '0.5rem',
                                margin: '4px',
                              }}
                              value=''
                            >
                              Select Transporter
                            </MenuItem> */}
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
                      challanData.transporter === 'Others' ? false : true
                    }
                    required={
                      challanData.transporter === 'Others' ? true : false
                    }
                    value={challanData.manualTransportName}
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
                        challanData.transporter !== 'Others'
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
                            required
                            name='vehicle'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanData.vehicle}
                            label='Select Vehicle'
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
                    style={{
                      backgroundColor:
                        challanData.vehicle !== 'Others'
                          ? '#fff9db'
                          : undefined,
                    }}
                    disabled={challanData.vehicle === 'Others' ? false : true}
                    required={challanData.vehicle === 'Others' ? true : false}
                    value={challanData.manualVehicleName?.toUpperCase()}
                    autoComplete='manualVehicleName'
                    name='manualVehicleName'
                    variant='outlined'
                    fullWidth
                    id='manualVehicleName'
                    label='Enter Vehicle Name & Number'
                    onChange={handleChange}
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
                    <Grid item xs={12} sm={10}>
                      <Box sx={{ minWidth: 20 }}>
                        <FormControl fullWidth>
                          <InputLabel id='demo-simple-select-label'>
                            Select Driver
                          </InputLabel>
                          <Select
                            required
                            name='driver'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanData.driver}
                            label='Select Driver'
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
                        onClick={handleDriverClick}
                      />
                      {openMasterDriver && (
                        <MasterDriverComp
                          openMasterDriver={openMasterDriver}
                          getMaxDriverID={getMaxDriverID}
                          setOpenMasterDriver={setOpenMasterDriver}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={3}>
                  <TextField
                    style={{
                      backgroundColor:
                        challanData.driver !== 'Others' ? '#fff9db' : undefined,
                    }}
                    disabled={challanData.driver === 'Others' ? false : true}
                    required={challanData.driver === 'Others' ? true : false}
                    value={challanData.manualDrivereName}
                    autoComplete='manualDrivereName'
                    name='manualDrivereName'
                    variant='outlined'
                    fullWidth
                    id='manualDrivereName'
                    label='Enter Driver If Not in List'
                    onChange={handleChange}
                    // onChange={(e) => setSaleSlipNo(e.target.value)}
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                            Select Royalty
                          </InputLabel>
                          <Select
                            name='royaltyType'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            // defaultValue='None'
                            value={challanData.royaltyType}
                            label='Select Royalty'
                            onChange={handleChange}
                          >
                            {miningRoyalty.map((el) => (
                              <MenuItem
                                value={el.royltyId}
                              >{`${el.mineName} - ${el.royltyRate}`}</MenuItem>
                            ))}
                            {/* <MenuItem value='Value 1'>Value 1</MenuItem>
                            <MenuItem value='Value 2'>Value 2</MenuItem>
                            <MenuItem value='Value 3'>Value 3</MenuItem> */}
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
                            required
                            name='loadedBy'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanData.loadedBy}
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
                        onClick={handleLoaderClick}
                      />
                      {openMasterLoader && (
                        <MasterLoaderComp
                          openMasterLoader={openMasterLoader}
                          getloaderMaxId={getloaderMaxId}
                          setOpenMasterLoader={setOpenMasterLoader}
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
                            Select Load Type
                          </InputLabel>
                          <Select
                            required
                            name='loadType'
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={challanData.loadType}
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
                        onClick={handleLoadtypeClick}
                      />
                      {openMasterLoadtype && (
                        <MasterLoadType
                          openMasterLoadtype={openMasterLoadtype}
                          getloadTypeMaxId={getloadTypeMaxId}
                          setOpenMasterLoadtype={setOpenMasterLoadtype}
                        />
                      )}
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} sm={2}>
                  <Button
                    style={{
                      height: '100%',
                      backgroundColor: '#8ce99a',
                      border: '3px solid #37b24d',
                      // borderRadius: '0.5rem',
                    }}
                    name='addWeight'
                    variant='contained'
                    // color='secondary'
                    fullWidth
                    onClick={() => {
                      setShowWeightBox(true);
                      setWeightsData({
                        grossweight: challanData.grossweight,
                        miningWeight: challanData.miningWeight,
                        nonMiningWeight: challanData.nonMiningWeight,
                        emptyWeight: challanData.emptyWeight,
                      });
                    }}
                    autoFocus
                  >
                    Add Weights
                  </Button>
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    required
                    type='number'
                    style={{ backgroundColor: '#d3f9d8' }}
                    disabled={true}
                    value={challanData.grossweight}
                    autoComplete='grossweight'
                    name='grossweight'
                    variant='outlined'
                    fullWidth
                    id='grossweight'
                    label='Gross Weight'
                    // onChange={handleChange}
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    // required
                    type='number'
                    style={{ backgroundColor: '#d3f9d8' }}
                    disabled={true}
                    value={challanData.miningWeight}
                    autoComplete='miningWeight'
                    name='miningWeight'
                    variant='outlined'
                    fullWidth
                    id='miningWeight'
                    label='Mining Weight'
                    // onChange={handleChange}
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    // required
                    type='number'
                    style={{ backgroundColor: '#d3f9d8' }}
                    disabled={true}
                    value={challanData.nonMiningWeight}
                    autoComplete='nonMiningWeight'
                    name='nonMiningWeight'
                    variant='outlined'
                    fullWidth
                    id='nonMiningWeight'
                    label='Non Mining Weight'
                    // onChange={handleChange}
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    required
                    type='number'
                    style={{ backgroundColor: '#d3f9d8' }}
                    disabled={true}
                    value={challanData.emptyWeight}
                    autoComplete='emptyWeight'
                    name='emptyWeight'
                    variant='outlined'
                    fullWidth
                    id='emptyWeight'
                    label='Empty Weight'
                    // onChange={handleChange}
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextField
                    required
                    type='number'
                    style={{ backgroundColor: '#d3f9d8' }}
                    disabled={true}
                    value={challanData.netWeight}
                    autoComplete='netWeight'
                    name='netWeight'
                    variant='outlined'
                    fullWidth
                    id='netWeight'
                    label='Net Weight'
                    // onChange={handleChange}
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
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
                        disabled={isUpdated}
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        // className={classes.submit}
                      >
                        Update Chalan
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Button
                        disabled={isPrint}
                        // type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        // className={classes.submit}
                        onClick={handlePrint}
                      >
                        Print
                      </Button>
                    </Grid>
                    {/* <Grid item xs={12} sm={2}>
                      <Button fullWidth variant='contained' color='primary'>
                        Preview
                      </Button>
                    </Grid> */}
                    <Grid item xs={12} sm={3}>
                      <Button
                        // type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        // className={classes.submit}
                        onClick={handleReset}
                      >
                        Reset Form
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
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
        open={showWeightBox}
        disableBackdropClick={true}
        maxWidth='md' // You can set it to 'xs', 'sm', 'md', 'lg', or 'false'
        fullWidth={true}
        onClose={() => {
          setShowWeightBox(false);
          resetWeightData();
        }}
        aria-labelledby='alert-dialog-title '
        aria-describedby='alert-dialog-description '
      >
        <DialogTitle id='alert-dialog-title'>
          <Grid
            style={{ justifyContent: 'space-between' }}
            container
            spacing={2}
          >
            <Grid xs={12} sm={3}>
              <Typography fontWeight={700} variant='h5' padding={'0.5rem'}>
                Enter Weights
              </Typography>
            </Grid>
            <Grid
              style={{ paddingLeft: '4rem', paddingTop: '0.5rem' }}
              xs={12}
              sm={2}
            >
              <Button
                color='secondary'
                onClick={handleWeightsClose}
                variant='contained'
              >
                &#10539;
              </Button>
            </Grid>
          </Grid>
        </DialogTitle>
        <DialogContent style={{ padding: '1rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                type='number'
                style={{ backgroundColor: '#d3f9d8' }}
                // disabled={true}
                value={weightsData.emptyWeight}
                autoComplete='emptyWeight'
                name='emptyWeight'
                variant='outlined'
                fullWidth
                id='emptyWeight'
                label='Empty Weight'
                onChange={handleWeightChange}
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ backgroundColor: '#d3f9d8' }}
                disabled={true}
                value={weightsData.emptyWeightDateTime}
                autoComplete='emptyWeightDateTime'
                name='emptyWeightDateTime'
                variant='outlined'
                fullWidth
                id='emptyWeightDateTime'
                label='Empty Weight Date Time'
                onChange={handleWeightChange}
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                type='number'
                style={{ backgroundColor: '#d3f9d8' }}
                // disabled={true}
                value={weightsData.grossweight}
                autoComplete='grossweight'
                name='grossweight'
                variant='outlined'
                fullWidth
                id='grossweight'
                label='Gross Weight'
                onChange={handleWeightChange}
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                style={{ backgroundColor: '#d3f9d8' }}
                disabled={true}
                value={weightsData.grossWeightDateTime}
                autoComplete='grossWeightDateTime'
                name='grossWeightDateTime'
                variant='outlined'
                fullWidth
                id='grossWeightDateTime'
                label='Gross Weight Date Time'
                onChange={handleWeightChange}
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    type='number'
                    style={{ backgroundColor: '#d3f9d8' }}
                    disabled={challanData.royaltyType !== 'None' ? false : true}
                    value={weightsData.miningWeight}
                    autoComplete='miningWeight'
                    name='miningWeight'
                    variant='outlined'
                    fullWidth
                    id='miningWeight'
                    label='Mining Weight'
                    onChange={handleWeightChange}
                    autoFocus
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* <Grid item xs={12} sm={6}>
              <TextField
                style={{ backgroundColor: '#d3f9d8' }}
                disabled={true}
                value={weightsData.miningWeightDateTime}
                autoComplete='miningWeightDateTime'
                name='miningWeightDateTime'
                variant='outlined'
                fullWidth
                id='miningWeightDateTime'
                label='Mining Weight Date Time'
                onChange={handleWeightChange}
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid> */}
            <Grid item xs={12} sm={6}>
              <TextField
                type='number'
                style={{ backgroundColor: '#d3f9d8' }}
                disabled={true}
                value={
                  (weightsData.nonMiningWeight =
                    parseInt(weightsData.grossweight) -
                    parseInt(weightsData.miningWeight))
                }
                // value={weightsData.nonMiningWeight}
                autoComplete='nonMiningWeight'
                name='nonMiningWeight'
                variant='outlined'
                fullWidth
                id='nonMiningWeight'
                label='Non Mining Weight'
                // onChange={handleWeightChange}
                autoFocus
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions style={{ padding: '1rem' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Button
                name='add'
                variant='contained'
                color='primary'
                fullWidth
                onClick={handleAddWeightsOnClick}
                autoFocus
              >
                Add Weights
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </Dialog>
    </>
  );
}

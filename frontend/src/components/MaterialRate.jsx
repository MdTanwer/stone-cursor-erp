import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Refresh } from "@material-ui/icons";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import { Edit as EditIcon, Delete as DeleIcon } from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import MasterCustomerComp from "../MasterPageComponent/MasterCustomerComp";
import MasterMaterialComp from "../MasterPageComponent/MasterMaterialComp";
import MasterDestination from "../MasterPageComponent/MasterDestination";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  deleteName: {
    color: "red", // Your desired color
    fontWeight: "bold",
    fontSize: "20px", // Your desired font weight or other styles
    // Add any other custom styles you want
  },
}));
const label = { inputProps: { "aria-label": "Checkbox demo" } };
const MaterialRate = () => {
  const [data, setData] = useState([]);
  const [allCustomer, setAllCustomer] = useState([]);
  const [destination, setDestination] = useState([]);
  const [openMasterCustomer, setOpenMasterCustomer] = useState(false);
  const [openMaterialpage, setOpenMaterialpage] = useState(false);
  const [openMasterDestination, setOpenMasterDestination] = useState(false);

  const [isMasterMaterialCompOpen, setIsMasterMaterialCompOpen] = useState(false);


  const [materialRate, setMaterialRate] = useState([]);
  const [materialRateId, setMaterialRateId] = useState("");
  const [updateMaterialRateId, setUpdateMaterialRateId] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [rate, setRate] = useState("");
  const [purchaseRate, setPurchaseRate] = useState("");
  const [transportRate, setTransportRate] = useState("");
  const [materialRateDelete, setMaterialRateDelete] = useState("");
  const [openMaterial, setOpenMaterial] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [update, setUpdate] = useState(false);
  const [mongodbId, setMongodbId] = useState();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [material, setMaterial] = useState([]); //FOR DATA FETCH FROM MATERIAL TABLE
  const classes = useStyles();
  const columns = [
    { title: "MaterialRate ID ", field: "materialRateId" },
    { title: "Material Name", field: "materialName" },
    { title: "Customer Name", field: "customerName" },
    { title: "Location Name", field: "locationName" },
    { title: "Material Sales Rate", field: "rate" },
    { title: "Material Purchase Rate", field: "purchaseRate" },
    { title: "Transport Rate", field: "transportRate" },
    { title: "isActive", field: "isActive" },
  ];
  useEffect(() => {
    GetMaterial();
    GetMaterialRate();
    getMaxMaterialRateId();
    setMaterialRateId(getMaxMaterialRateId());
    getAllCustomers();
    GetDestination();
    getdestinationMaxId()
  }, [openMaterial, openMaterialpage, openMasterCustomer, openMasterDestination]);
  // ======================================
  const GetMaterial = async () => {
    try {
      const response = await axios.get("materialmaster/get-materialmaster");

      // console.log(response.data.materialmasters);
      setMaterial(response.data.materialmasters);
    } catch (error) {
      console.log(error);
    }
  };
  // ======================================
  const getAllCustomers = () => {
    axios
      .get(`/customer/all-customers`)
      .then((res) => {
        setAllCustomer(res.data.customers);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // ======================================
  const GetDestination = () => {
    axios
      .get("destinationmaster/get-destination")
      .then((res) => {
        console.log(res);
        setDestination(res.data.destinations);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const GetMaterialRate = async () => {
    try {
      const response = await axios.get("materialrate/get/materialrate");

      // console.log(response.data.materialrates);
      setMaterialRate(response.data.materialrates);
    } catch (error) {
      console.log(error);
    }
  };


  // ===================For Automatic Id generator==================
  const getMaxMaterialRateId = () => {
    if (!materialRate || materialRate.length === 0) {
      return 1;
    }
    const maxID = materialRate.reduce((max, materialRate) => {
      const RateId = parseInt(materialRate.materialRateId);
      if (RateId > max) {
        return RateId;
      } else {
        return max;
      }
    }, 0);
    return maxID + 1;
  };

  const getMaxMaterialId = () => {
    if (!material || material.length === 0) {
      // Handle the case where data.customer is null or empty
      // setCustomerData({
      //   ...customerData,
      //   customerId: 1,
      // });
      return 1;
    }
    const maxID = material.reduce((max, material) => {
      // Convert customerId to a number
      const materialId = parseInt(material.materialId);
      // Check if customerId is greater than the current max
      if (materialId > max) {
        return materialId; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0
    return maxID + 1;
  };


  const getMaxCustomerId = () => {
    if (!allCustomer || allCustomer.length === 0) {
      return 1;
    }

    const maxID = allCustomer.reduce((max, allCustomer) => {
      // Convert customerId to a number
      const customerId = parseInt(allCustomer.customerId);

      // Check if customerId is greater than the current max
      if (customerId > max) {
        return customerId; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0

    return maxID + 1;
  };

  const getdestinationMaxId = () => {
    if (!destination || destination.length === 0) {
      // Handle the case where destination.customer is null or empty
      return 1;
    }
    const maxID = destination.reduce((max, destination) => {
      // Convert customerId to a number
      const destinationId = parseInt(destination.destinationId);
      // Check if customerId is greater than the current max
      if (destinationId > max) {
        return destinationId; // Update max if customerId is greater
      } else {
        return max; // Keep the current max if customerId is not greater
      }
    }, 0); // Initialize max with 0
    return maxID + 1;
  };


  //   ==================================================================

  // ====================================================================
  const handleSubmit = async (event) => {
    event.preventDefault();
    // if (isMasterMaterialCompOpen) {
    //   return;
    // }
    var materialRate = {
      materialRateId: materialRateId,
      materialName: materialName,
      locationName: locationName,
      customerName: customerName,
      rate: rate,
      purchaseRate: purchaseRate,
      transportRate: transportRate,
      isActive: isActive,
    };
    try {
      const response = await axios.post(
        "materialrate/create/materialrate",
        materialRate
      );

      if (response.status === 201) {
        toast.success("Material Rate has been added successfully!");
        handleClose()
        console.log(response);
      } else {
        toast.error("Invalid MaterialRate Information!");
        setOpenMaterial(true)
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid MaterialRate Information!");
      setOpenMaterial(true)
    }
  };


  const handleUpdateSubmit = async (event) => {
    // if (isMasterMaterialCompOpen) {
    //   return;
    // }

    event.preventDefault();
    const endpoint = `/materialrate/updatematerialrate/${mongodbId}`;

    try {
      const response = await axios.put(endpoint, {
        updateMaterialRateId,
        materialName,
        locationName,
        customerName,
        rate,
        purchaseRate,
        transportRate,
        isActive,
      });

      toast.success("Material Updated successfully!");
      handleClose()
    } catch (error) {

      console.error("An error occurred while updating the Material Rate:", error);
      setUpdate(true);
      // //   // Handle the error in your UI, maybe show a notification or error message
    }
  };



  const checkChanged = (e) => {
    setIsActive(!isActive);
    // const [name, checked] = e.target;
  };
  const handlecustomerChange = (e) => {
    setCustomerName(e.target.value);
  };
  const handlematerialChange = (e) => {
    setMaterialName(e.target.value);
  };
  const handleLocationChange = (e) => {
    setLocationName(e.target.value);
  };

  const handleClose = () => {
    clear()
    setUpdate(false);
    setOpenMaterial(false);
    GetMaterialRate();
  };
  const clear = () => {
    setRate("");
    setMaterialName("");
    setPurchaseRate("");
    setCustomerName("");
    setLocationName("");
    setTransportRate("");

  };

  const updateReset = () => {
    GetMaterialRate()
  }
  const onClickDelete = async (rowData) => {
    axios
      .delete(`/materialrate/deletematerialrate/${rowData._id}`)
      .then((res) => {

        console.log(res);
        toast.success("Record has been deleted successfully!");
        handleClose()
      })
      .catch((err) => {
        toast("Invalid  Information!");
        console.log(err);
      });

    // alert("Delete = " + rowData.CustId);
    return;
  };
  GetMaterialRate();
  const actions = [
    {
      icon: () => <Refresh />,
      tooltip: "Refresh Data",
      isFreeAction: true,
      onClick: (event, rowData) => {
        GetMaterialRate();
      },
    },
    {
      icon: () => <EditIcon color="primary" />,
      tooltip: "Edit Factory",
      onClick: (event, rowData) => {
        setUpdate(true);
        setMongodbId(rowData._id);
        setUpdateMaterialRateId(rowData.materialRateId);
        setRate(rowData.rate);
        setPurchaseRate(rowData.purchaseRate)
        setTransportRate(rowData.transportRate);
        setMaterialName(rowData.materialName);
        setCustomerName(rowData.customerName);
        setLocationName(rowData.locationName)
      },
    },
    {
      icon: () => <DeleIcon color="secondary" />,
      tooltip: "Delete Factory",
      onClick: (event, rowData) => {
        setShowDeleteConfirm(rowData);
        setMaterialRateDelete(rowData.customerName);
      },
    },
  ];



  const handleCustomerClick = () => {
    setOpenMasterCustomer(true);
    // setIsMasterMaterialCompOpen(true);
    // setOpenSourceMine(true)
  };
  const handleMasterCompClick = () => {
    setOpenMaterialpage(true);
    // setIsMasterMaterialCompOpen(true);
    // setOpenSourceMine(true)
  };
  const handleMasterDestinationClick = () => {
    setOpenMasterDestination(true);
    // setIsMasterMaterialCompOpen(true);
    // setOpenSourceMine(true)
  };
  return (
    <>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <Fab
              color="primary"
              style={{
                borderRadius: "0.5rem",
                height: "3rem",
                width: "100%",
              }}
              variant="extended"
              aria-label="add"
              fullWidth
              onClick={() => setOpenMaterial(true)}
            >
              Create Material Rate
            </Fab>
          </Grid>
          <Grid item xs={12} sm={12}>
            <MaterialTable
              title=""
              columns={columns}
              data={materialRate}
              // icons={tableIcons}
              actions={actions}
              options={{
                sorting: true,
                search: true,
                searchFieldAlignment: "right",
                searchAutoFocus: true,
                searchFieldVariant: "standard",
                filtering: true,
                paging: true,
                pageSizeOptions: [2, 5, 10, 20, 25, 50, 100],
                pageSize: 10,
                paginationType: "stepped",
                showFirstLastPageButtons: false,
                paginationPosition: "both",
                exportButton: true,
                exportAllData: true,
                exportFileName: "SitesDetails",
                addRowPosition: "first",
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
                  index % 2 === 0 ? { background: "#f5f5f5" } : null,
                headerStyle: { background: "#f44336", color: "#fff" },
              }}
            />
          </Grid>
        </Grid>
        <Dialog
          fullWidth
          maxWidth="md"
          open={openMaterial}
          onClose={handleClose}
          disableBackdropClick={true}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
            <Grid
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              container
            >
              <Grid item xs={12} sm={11}>
                {/* style={{ justifyContent: 'center' }} */}
                <Grid container>
                  <Typography
                    style={{ display: "inline-block" }}
                    variant="h5"
                    fontWeight={700}
                  >
                    Create Material Rate
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button
                  color="secondary"
                  onClick={handleClose}
                  variant="contained"
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
                      value={materialRateId}
                      autoComplete="materialRateId"
                      name="materialRateId"
                      variant="outlined"
                      fullWidth
                      id="materialRateId"
                      label="MaterialRateId"
                      onChange={(e) => setMaterialRateId(e.target.value)}
                      autoFocus

                    />
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <Grid
                      container
                      spacing={1}
                      style={{ flexSpacing: "2rem" }}
                      xs={12}
                      sm={12}
                      alignItems="center"
                    >
                      <Grid item xs={12} sm={11}>
                        <Box sx={{ minWidth: 20 }}>
                          <FormControl fullWidth>
                            <InputLabel
                              id="demo-simple-select-label"
                              variant="outlined"
                            >
                              Select Material
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              onChange={handlematerialChange}
                              variant="outlined"
                              label="Select Prior Year"
                              value={materialName}
                            >
                              <MenuItem value="">Select Material</MenuItem>
                              {material.map((item) => (
                                <MenuItem
                                  key={item.materialName}
                                  value={item.materialName}
                                >
                                  {item.materialName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <AddCircleIcon
                        sx={{ fontSize: "30px" }}
                        color="primary"
                        onClick={handleMasterCompClick}
                      />
                      {openMaterialpage && (
                        <MasterMaterialComp
                          openMaterialpage={openMaterialpage}
                          getMaxMaterialId={getMaxMaterialId}
                          setOpenMaterialpage={setOpenMaterialpage}
                        />
                      )}
                    </Grid>
                  </Grid>

                  {/* <Grid item xs={12} sm={5}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          variant="outlined"
                        >
                          Select Material
                        </InputLabel>
                        <Select
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={materialName}
                          label="Select Material"
                          onChange={handlematerialChange}
                        >
                          <MenuItem value="gitti">Gitti</MenuItem>
                          <MenuItem value="dust">Dust</MenuItem>
                          <MenuItem value="cement">Cement</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid> */}

                  <Grid item xs={12} sm={5}>
                    <Grid
                      container
                      spacing={1}
                      style={{ flexSpacing: "2rem" }}
                      xs={12}
                      sm={12}
                      alignItems="center"
                    >
                      <Grid item xs={12} sm={10}>
                        <Box sx={{ minWidth: 20 }}>
                          <FormControl fullWidth>
                            <InputLabel
                              id="demo-simple-select-label"
                              variant="outlined"
                            >
                              Select Customer
                            </InputLabel>
                            <Select
                              variant="outlined"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={customerName}
                              label="Select Prior Year"
                              onChange={handlecustomerChange}
                            >
                              {allCustomer.map((el) => (
                                <MenuItem key={el._id} value={el.customerName}>
                                  {el.customerName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <AddCircleIcon
                          sx={{ fontSize: "30px" }}
                          color="primary"
                          onClick={handleCustomerClick}
                        // onClick={() => setOpenMasterCustomer(true)}
                        />
                        {openMasterCustomer && (
                          <MasterCustomerComp
                            openMasterCustomer={openMasterCustomer}
                            getMaxCustomerId={getMaxCustomerId}
                            setOpenMasterCustomer={setOpenMasterCustomer}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Grid
                      container
                      spacing={1}
                      style={{ flexSpacing: "2rem" }}
                      xs={12}
                      sm={12}
                      alignItems="center"
                    >
                      <Grid item xs={12} sm={10}>
                        <Box sx={{ minWidth: 20 }}>
                          <FormControl fullWidth>
                            <InputLabel
                              id="demo-simple-select-label"
                              variant="outlined"
                            >
                              Location/Destination
                            </InputLabel>
                            <Select
                              variant="outlined"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={locationName}
                              label="Location/Destination"
                              onChange={handleLocationChange}
                            >
                              {destination.map((el) => (
                                <MenuItem
                                  key={el._id}
                                  value={el.destinationName}
                                >
                                  {el.destinationName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <AddCircleIcon
                        sx={{ fontSize: "30px" }}
                        color="primary"
                        onClick={handleMasterDestinationClick}
                      />
                      {openMasterDestination && (
                        <MasterDestination
                          openMasterDestination={openMasterDestination}
                          setOpenMasterDestination={setOpenMasterDestination}
                          getdestinationMaxId={getdestinationMaxId}
                        />
                      )}
                    </Grid>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="number"
                      value={purchaseRate}
                      autoComplete="rate"
                      name="rate"
                      variant="outlined"
                      fullWidth
                      id="rate"
                      label="Material Purchase Rate"
                      onChange={(e) => setPurchaseRate(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="number"
                      value={rate}
                      autoComplete="rate"
                      name="rate"
                      variant="outlined"
                      fullWidth
                      id="rate"
                      label="Material Sales Rate"
                      onChange={(e) => setRate(e.target.value)}
                    />
                  </Grid>



                  <Grid item xs={12} sm={2}>
                    <TextField
                      type="transportRate"
                      value={transportRate}
                      autoComplete="transportRate"
                      name="transportRate"
                      variant="outlined"
                      fullWidth
                      id="transportRate"
                      label="TransportRate"
                      onChange={(e) => setTransportRate(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={1}>
                    <label>IsActive</label>

                    <Checkbox
                      {...label}
                      value={isActive}
                      checked={isActive}
                      onChange={checkChanged}
                      color="primary"
                      size="medium"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    // className={classes.submit}
                    >
                      Save Material Rate Details
                    </Button>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => clear()}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={() => handleClose()}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={1}></Grid>
                </Grid>
              </form>
            </div>
          </DialogContent>
        </Dialog>


        <Dialog
          fullWidth
          maxWidth="md"
          open={update}
          onClose={handleClose}
          disableBackdropClick={true}
          aria-labelledby="max-width-dialog-title"
        >
          <DialogTitle id="max-width-dialog-title">
            <Grid
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              container
            >
              <Grid item xs={12} sm={11}>
                {/* style={{ justifyContent: 'center' }} */}
                <Grid container>
                  <Typography
                    style={{ display: "inline-block" }}
                    variant="h5"
                    fontWeight={700}
                  >
                    Update Material Rate
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={1}>
                <Button
                  color="secondary"
                  onClick={handleClose}
                  variant="contained"
                >
                  &#10539;
                </Button>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent>
            <div>
              <form className={classes.form} onSubmit={handleUpdateSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      disabled={true}
                      value={updateMaterialRateId}
                      autoComplete="materialRateId"
                      name="materialRateId"
                      variant="outlined"
                      fullWidth
                      id="materialRateId"
                      label="MaterialRateId"
                      onChange={(e) => setMaterialRateId(e.target.value)}
                      autoFocus

                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Grid
                      container
                      spacing={1}
                      style={{ flexSpacing: "2rem" }}
                      xs={12}
                      sm={12}
                      alignItems="center"
                    >
                      <Grid item xs={12} sm={11}>
                        <Box sx={{ minWidth: 20 }}>
                          <FormControl fullWidth>
                            <InputLabel
                              id="demo-simple-select-label"
                              variant="outlined"
                            >
                              Select Material
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              onChange={handlematerialChange}
                              variant="outlined"
                              label="Select Prior Year"
                              value={materialName}
                            >
                              <MenuItem value="">Select Material</MenuItem>
                              {material.map((item) => (
                                <MenuItem
                                  key={item.materialName}
                                  value={item.materialName}
                                >
                                  {item.materialName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <AddCircleIcon
                        sx={{ fontSize: "30px" }}
                        color="primary"
                        onClick={handleMasterCompClick}
                      />
                      {openMaterialpage && (
                        <MasterMaterialComp
                          openMaterialpage={openMaterialpage}
                          getMaxMaterialId={getMaxMaterialId}
                          setOpenMaterialpage={setOpenMaterialpage}
                        />
                      )}
                    </Grid>
                  </Grid>
                  {/* <Grid item xs={12} sm={5}>
                    <Box sx={{ minWidth: 20 }}>
                      <FormControl fullWidth>
                        <InputLabel
                          id="demo-simple-select-label"
                          variant="outlined"
                        >
                          Select Material
                        </InputLabel>
                        <Select
                          variant="outlined"
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={materialName}
                          label="Select Material"
                          onChange={handlematerialChange}
                        >
                          <MenuItem value="gitti">Gitti</MenuItem>
                          <MenuItem value="dust">Dust</MenuItem>
                          <MenuItem value="cement">Cement</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid> */}

                  <Grid item xs={12} sm={5}>
                    <Grid
                      container
                      spacing={1}
                      style={{ flexSpacing: "2rem" }}
                      xs={12}
                      sm={12}
                      alignItems="center"
                    >
                      <Grid item xs={12} sm={10}>
                        <Box sx={{ minWidth: 20 }}>
                          <FormControl fullWidth>
                            <InputLabel
                              id="demo-simple-select-label"
                              variant="outlined"
                            >
                              Select Customer
                            </InputLabel>
                            <Select
                              variant="outlined"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={customerName}
                              label="Select Prior Year"
                              onChange={handlecustomerChange}
                            >
                              {allCustomer.map((el) => (
                                <MenuItem key={el._id} value={el.customerName}>
                                  {el.customerName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={2}>
                        <AddCircleIcon
                          sx={{ fontSize: "30px" }}
                          color="primary"
                          onClick={handleCustomerClick}
                        // onClick={() => setOpenMasterCustomer(true)}
                        />
                        {openMasterCustomer && (
                          <MasterCustomerComp
                            openMasterCustomer={openMasterCustomer}
                            getMaxCustomerId={getMaxCustomerId}
                            setOpenMasterCustomer={setOpenMasterCustomer}
                          />
                        )}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <Grid
                      container
                      spacing={1}
                      style={{ flexSpacing: "2rem" }}
                      xs={12}
                      sm={12}
                      alignItems="center"
                    >
                      <Grid item xs={12} sm={10}>
                        <Box sx={{ minWidth: 20 }}>
                          <FormControl fullWidth>
                            <InputLabel
                              id="demo-simple-select-label"
                              variant="outlined"
                            >
                              Location/Destination
                            </InputLabel>
                            <Select
                              variant="outlined"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={locationName}
                              label="Location/Destination"
                              onChange={handleLocationChange}
                            >
                              {destination.map((el) => (
                                <MenuItem
                                  key={el._id}
                                  value={el.destinationName}
                                >
                                  {el.destinationName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <AddCircleIcon
                        sx={{ fontSize: "30px" }}
                        color="primary"
                        onClick={handleMasterDestinationClick}
                      />
                      {openMasterDestination && (
                        <MasterDestination
                          openMasterDestination={openMasterDestination}
                          setOpenMasterDestination={setOpenMasterDestination}
                          getdestinationMaxId={getdestinationMaxId}
                        />
                      )}
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="number"
                      value={purchaseRate}
                      autoComplete="rate"
                      name="rate"
                      variant="outlined"
                      fullWidth
                      id="rate"
                      label="Material Purchase Rate"
                      onChange={(e) => setPurchaseRate(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="number"
                      value={rate}
                      autoComplete="rate"
                      name="rate"
                      variant="outlined"
                      fullWidth
                      id="rate"
                      label="Material Sales Rate"
                      onChange={(e) => setRate(e.target.value)}
                    />
                  </Grid>



                  <Grid item xs={12} sm={2}>
                    <TextField
                      type="transportRate"
                      value={transportRate}
                      autoComplete="transportRate"
                      name="transportRate"
                      variant="outlined"
                      fullWidth
                      id="transportRate"
                      label="TransportRate"
                      onChange={(e) => setTransportRate(e.target.value)}
                    />
                  </Grid>

                  <Grid item xs={12} sm={1}>
                    <label>IsActive</label>

                    <Checkbox
                      {...label}
                      value={isActive}
                      checked={isActive}
                      onChange={checkChanged}
                      color="primary"
                      size="medium"
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    // className={classes.submit}
                    >
                      Save Material Rate Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => updateReset()}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={() => handleClose()}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={1}></Grid>
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
            <DialogContentText
              id="alert-dialog-description"
              classes={{ root: classes.customDialogContent }}
            >
              Are you sure you want to delete this
              <span className={classes.deleteName}>
                {`' ${materialRateDelete} '`}
              </span>{" "}
              record?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}></Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  fullWidth
                  name="submit"
                  variant="contained"
                  onClick={() => setShowDeleteConfirm(false)}
                  color="primary"
                >
                  No
                </Button>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Button
                  name="cancle"
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={() => {
                    onClickDelete(showDeleteConfirm);
                    GetMaterialRate();
                    // dispatch(getAllUnitMaster());
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
    </>
  );
};

export default MaterialRate;

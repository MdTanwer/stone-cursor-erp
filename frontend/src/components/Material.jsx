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
import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  Refresh,
  SaveAlt,
  Search,
  ViewColumn,
} from "@material-ui/icons";
import MaterialTable from "material-table";
import React, { forwardRef, useEffect, useState } from "react";
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleIcon,
} from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
// import {
//   creatematerialmaster,
//   deleteMaterialMaster,
//   getAllMaterialMaster,
// } from "../redux/actions/material";
import axios from "axios";
import { confirm } from "react-confirm-box";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
// ============================================================
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
// =====================================================================

export default function Material() {
  const columns = [
    { title: "Material Id", field: "materialId" },
    { title: "Material Name", field: "materialName" },
    { title: "Description", field: "description" },
  ];
  const [materialId, setMaterialId] = useState("");
  const [materialName, setMaterialName] = useState("");
  const [description, setDescription] = useState();
  const [isActive, setIsActive] = useState(true);
  const [createdBy, setCreatedBy] = useState(0);
  const [createdAt, setCreatedAt] = useState();
  const [updatedBy, setUpdatedBy] = useState(1);
  const [updatedAt, setUpdatedAt] = useState();

  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [mongodbId, setMongodbId] = useState();
  const [updateMaterialId, setUpdateMaterialId] = useState();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [materialDeleteName, setMaterialDeleteName] = useState("");

  // const tableRef = React.createRef();
  // const tableIcons = {
  //   Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  //   Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  //   Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  //   Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  //   DetailPanel: forwardRef((props, ref) => (
  //     <ChevronRight {...props} ref={ref} />
  //   )),
  //   Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  //   Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  //   Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  //   // FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  //   // LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  //   NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  //   PreviousPage: forwardRef((props, ref) => (
  //     <ChevronLeft {...props} ref={ref} />
  //   )),
  //   ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  //   Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  //   SortArrow: forwardRef((props, ref) => (
  //     <ArrowDownward {...props} ref={ref} />
  //   )),
  //   // ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  //   ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  // };
  // =================================================
  // const { success, error, materialmasters, delsuccess } = useSelector(
  //   (state) => state.materialmasters
  // );
  // console.log(materialmasters);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   if (error) {
  //     toast.error(error);
  //   }
  //   if (success) {
  //     toast.success("Material created successfully!");
  //     // navigate("/dashboard-products");
  //     // window.location.reload();
  //   }
  //   debugger;
  //   dispatch(getAllMaterialMaster());
  // }, [dispatch, error, success]);
  // const row = [];

  // ==============================================================

  // const [checked, setChecked] = useState(true);

  // const [allmatechecked, setAllMatechecked] = useState(false);

  // const AllMaterialChanged = (state) => {
  //   setAllMatechecked(!allmatechecked);
  //   setIsDisable(!allmatechecked);
  // };
  const classes = useStyles();
  const [material, setMaterial] = useState([]);
  // ======================================================
  useEffect(() => {
    GetMaterial();
    setMaterialId(getMaxMaterialId());
  }, [open]);

  const GetMaterial = async () => {
    try {
      const response = await axios.get("materialmaster/get-materialmaster");
      debugger;
      console.log(response.data.materialmasters);
      setMaterial(response.data.materialmasters);
    } catch (error) {
      console.log(error);
    }
  };
  // =================================================
  // for Count add in material id
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
  // =========================================================

  console.log(isActive);
  const checkChanged = (e) => {
    setIsActive(!isActive);
    // const [name, checked] = e.target;
  };
  //const handleSubmit = (event) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    var material = {
      materialId: materialId,
      materialName: materialName,
      description: description,
      isActive: isActive,
      createdBy: createdBy,
      createdAt: createdAt,
      updatedBy: updatedBy,
      updatedAt: updatedAt,
    };

    debugger;
    console.log(material);
    try {
      const response = await axios.post(
        "materialmaster/create-materialmaster",
        material
      );

      if (response.status === 201) {
        toast.success("Record has been added successfully!");
        console.log(response);
      } else {
        toast("Invalid Information!");
      }
    } catch (error) {
      console.log(error);
      toast("Invalid Material Information!");
    }
    setOpen(!open);
    //  alert("added success");
    setMaterialName("");
    setDescription("");
    GetMaterial();
  };
  const handleUpdateSubmit = async (event) => {
    debugger;
    // const id = rowData._id
    event.preventDefault();
    const endpoint = `/materialmaster/update-materialmaster/${mongodbId}`;
    // const endpoint = `/unitmaster/update-unitmaster/${updateUnitmasterId}`;
    try {
      const response = await axios.put(endpoint, {
        updateMaterialId,
        materialName: materialName,
        description: description,
        isActive: isActive,
      });

      toast.success("Material Updated successfully!");
    } catch (error) {
      console.error("An error occurred while updating the unit:", error);
      // Handle the error in your UI, maybe show a notification or error message
    }
    clear();
    setUpdate(false);
    setOpen(false);
    // dispatch(getAllUnitMaster());
    GetMaterial();
  };
  const onClickDelete = async (rowData) => {
    axios
      .delete(`/materialmaster/delete-materialmaster/${rowData._id}`)
      .then((res) => {
        debugger;
        console.log(res);
        toast.success("Record has been deleted successfully!");
      })
      .catch((err) => {
        toast("Invalid  Information!");
        console.log(err);
      });
    debugger;
    // alert("Delete = " + rowData.CustId);
    return;
  };
  console.log("You click No!");

  GetMaterial();
  //   axios

  //     .post("materialmaster/create-materialmaster", data)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         alert("Record has been added successfully!");
  //         console.log(res);
  //       } else {
  //         alert("Invalid  Information!");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert("Invalid Material Information!");
  //     });
  //   //setOpen(!open);
  //  // alert("added success");
  //   setMaterialId("");
  //   setMaterialName("");
  //   setDescription("");
  // };

  // const handleDelete = (id) => {
  //   debugger;
  //   // dispatch(deleteMaterialMaster(id));
  //   if (delsuccess) {
  //     toast.success("Material Deleted successfully!");
  //   }

  //   // window.location.reload();
  // };

  // ========================================================
  // ========================================================

  //   const result = await confirm(
  //     "Do you really want to delete this Id = " +
  //       rowData.CommissionRulesId +
  //       "?"
  //   );
  //   if (result) {
  //     debugger;

  //     axios
  //       .delete(
  //         "CommissionRules/DeleteCommissionRules?id=" +
  //           rowData.CommissionRulesId
  //       )
  //       .then((res) => {
  //         debugger;
  //         console.log(res);
  //         GetCummRules();
  //         successMessageBox("Record has been deleted successfully!");
  //       })
  //       .catch((err) => {
  //         errorMessageBox("Invalid  Information!");
  //         console.log(err);
  //       });
  //     debugger;
  //     // alert("Delete = " + rowData.CustId);
  //     return;
  //   }
  //   console.log("You click No!");
  // };
  const actions = [
    {
      icon: () => <Refresh />,
      tooltip: "Refresh Data",
      isFreeAction: true,
      onClick: (event, rowData) => {
        // dispatch(getAllMaterialMaster());
      },
    },
    {
      icon: () => <EditIcon color="primary" />,
      tooltip: "Edit Factory",
      onClick: (event, rowData) => {
        setUpdate(true);
        setMongodbId(rowData._id);
        setUpdateMaterialId(rowData.materialId);
        setMaterialName(rowData.materialName);
        setDescription(rowData.description);
        setIsActive(rowData.isActive);
      },
    },
    {
      icon: () => <DeleIcon color="secondary" />,
      tooltip: "Delete Factory",
      onClick: (event, rowData) => {
        setShowDeleteConfirm(rowData);
        setMaterialDeleteName(rowData.materialName);
        // onClickDelete(rowData);

        // handleDelete(rowData._id);
        // dispatch(getAllMaterialMaster());
      },
    },
  ];

  // materialmaster &&
  //   materialmaster.forEach((item) => {
  //     row.push({
  //       _id: item.id_,
  //       materialName: item.materialName,
  //       description: item.description,
  //       isActive: item.isActive,
  //     });
  //   });

  const clear = () => {
    // debugger;
    // setMaterialId("");
    setMaterialName("");
    setDescription("");
  };
  // ========================================================
  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
    // setMaterialId("");
    setMaterialName("");
    setDescription("");
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
              onClick={() => setOpen(true)}
            >
              Create New Material
            </Fab>
          </Grid>
          <Grid item xs={12} sm={12}>
            <MaterialTable
              title=""
              columns={columns}
              data={material}
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
                exportFileName: "All Materials",
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
          open={open}
          onClose={handleClose}
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
                    Create New Material
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
              <ToastContainer
                position="top-center"
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
                      value={materialId}
                      autoComplete="materialId"
                      name="supplierId"
                      variant="outlined"
                      fullWidth
                      id="materialId"
                      label="Material Id"
                      onChange={(e) => setMaterialId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={materialName}
                      autoComplete="materialName"
                      name="materialName"
                      variant="outlined"
                      fullWidth
                      required
                      id="materialName"
                      label="Material Name"
                      onChange={(e) => setMaterialName(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={5}>
                  <Box sx={{ minWidth: 20 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Material Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={materialType}
                        label="Select Prior Year"
                        variant="outlined"
                        // onChange={handleMaterialTypeChange}
                      >
                        <MenuItem value={1}>Type1</MenuItem>
                        <MenuItem value={1}>Type2</MenuItem>
                        <MenuItem value={1}>Type3</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid> */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="description"
                      value={description}
                      autoComplete="description"
                      name="description"
                      variant="outlined"
                      fullWidth
                      id="description"
                      label="Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={3}>
                  <TextField
                    type="Rate"
                    // disabled={isDisable}
                    value={rate}
                    autoComplete="Rate"
                    name="Rate"
                    variant="outlined"
                    fullWidth
                    id="Rate"
                    label="Rate "
                    onChange={(e) => setRate(e.target.value)}
                    autoFocus
                  />
                </Grid> */}
                  {/* <Grid item xs={12} sm={2}>
                  <TextField
                    type="amount"
                    // disabled={isDisable}
                    value={amount}
                    autoComplete="amount"
                    name="amount"
                    variant="outlined"
                    fullWidth
                    id="amount"
                    label="Amount "
                    onChange={(e) => setAmount(e.target.value)}
                    autoFocus
                  />
                </Grid> */}

                  {/* <Grid item xs={12} sm={3}>
              <TextField
                disabled={isDisable}
                value={location}
                autoComplete='location'
                name='location'
                variant='outlined'
                fullWidth
                id='location'
                label='Location'
                onChange={(e) => setLocation(e.target.value)}
                autoFocus
              />
            </Grid> */}
                  {/* <Grid item xs={12} sm={4}>
                  <Box sx={{ minWidth: 20 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Supplier
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={Supplier}
                        label="Select Prior Year"
                        // onChange={handlesupplierChange}
                      >
                        <MenuItem value={1}>Supplier1</MenuItem>
                        <MenuItem value={1}>Supplier2</MenuItem>
                        <MenuItem value={1}>Supplier3</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid> */}

                  {/* <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={isDisable}
                    value={supplierAddress}
                    autoComplete="supplierAddress"
                    name="supplierAddress"
                    variant="outlined"
                    fullWidth
                    id="supplierAddress"
                    label="Supplier Address"
                    onChange={(e) => setSupplierAddress(e.target.value)}
                    autoFocus
                    multiline
                    minRows={2}
                  />
                </Grid> */}
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
                      Save Material Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => clear()}
                    >
                      Clear
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Button
                      name='cancle'
                      variant='contained'
                      color='secondary'
                      fullWidth
                      onClick={() => clear()}
                    >
                      Cancel
                    </Button>
                  </Grid>
                  {/* <Grid item xs={12} sm={1}></Grid> */}
                </Grid>

                {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button> */}
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <div>
        <Dialog
          fullWidth
          maxWidth="md"
          open={update}
          onClose={handleClose}
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
                    Update Material
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
              <ToastContainer
                position="top-center"
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
                      value={updateMaterialId}
                      autoComplete="materialId"
                      name="supplierId"
                      variant="outlined"
                      fullWidth
                      id="materialId"
                      label="Material Id"
                      onChange={(e) => setMaterialId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      value={materialName}
                      autoComplete="materialName"
                      name="materialName"
                      variant="outlined"
                      fullWidth
                      required
                      id="materialName"
                      label="Material Name"
                      onChange={(e) => setMaterialName(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={5}>
                  <Box sx={{ minWidth: 20 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Material Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={materialType}
                        label="Select Prior Year"
                        variant="outlined"
                        // onChange={handleMaterialTypeChange}
                      >
                        <MenuItem value={1}>Type1</MenuItem>
                        <MenuItem value={1}>Type2</MenuItem>
                        <MenuItem value={1}>Type3</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid> */}
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="description"
                      value={description}
                      autoComplete="description"
                      name="description"
                      variant="outlined"
                      fullWidth
                      id="description"
                      label="Description"
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={3}>
                  <TextField
                    type="Rate"
                    // disabled={isDisable}
                    value={rate}
                    autoComplete="Rate"
                    name="Rate"
                    variant="outlined"
                    fullWidth
                    id="Rate"
                    label="Rate "
                    onChange={(e) => setRate(e.target.value)}
                    autoFocus
                  />
                </Grid> */}
                  {/* <Grid item xs={12} sm={2}>
                  <TextField
                    type="amount"
                    // disabled={isDisable}
                    value={amount}
                    autoComplete="amount"
                    name="amount"
                    variant="outlined"
                    fullWidth
                    id="amount"
                    label="Amount "
                    onChange={(e) => setAmount(e.target.value)}
                    autoFocus
                  />
                </Grid> */}

                  {/* <Grid item xs={12} sm={3}>
              <TextField
                disabled={isDisable}
                value={location}
                autoComplete='location'
                name='location'
                variant='outlined'
                fullWidth
                id='location'
                label='Location'
                onChange={(e) => setLocation(e.target.value)}
                autoFocus
              />
            </Grid> */}
                  {/* <Grid item xs={12} sm={4}>
                  <Box sx={{ minWidth: 20 }}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Supplier
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={Supplier}
                        label="Select Prior Year"
                        // onChange={handlesupplierChange}
                      >
                        <MenuItem value={1}>Supplier1</MenuItem>
                        <MenuItem value={1}>Supplier2</MenuItem>
                        <MenuItem value={1}>Supplier3</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid> */}

                  {/* <Grid item xs={12} sm={6}>
                  <TextField
                    disabled={isDisable}
                    value={supplierAddress}
                    autoComplete="supplierAddress"
                    name="supplierAddress"
                    variant="outlined"
                    fullWidth
                    id="supplierAddress"
                    label="Supplier Address"
                    onChange={(e) => setSupplierAddress(e.target.value)}
                    autoFocus
                    multiline
                    minRows={2}
                  />
                </Grid> */}
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
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    // className={classes.submit}
                    >
                      Update Material Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => clear()}
                    >
                      Clear
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={1}></Grid>
                </Grid>

                {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button> */}
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
                {`' ${materialDeleteName} '`}
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
                    GetMaterial();
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
}

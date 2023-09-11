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

export default function MasterMaterialComp({ openMaterialpage, setOpenMaterialpage }) {
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


  const clear = () => {
    // debugger;
    // setMaterialId("");
    setMaterialName("");
    setDescription("");
  };
  // ========================================================
  const handleClose = () => {
    setOpenMaterialpage(false)
    setOpen(false);
    setUpdate(false);
    // setMaterialId("");
    setMaterialName("");
    setDescription("");
  };
  return (
    <>
      <div>

        <Dialog
          fullWidth
          maxWidth="md"
          open={openMaterialpage}
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
              <form className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      disabled={true}
                      // value={materialId}
                      value={getMaxMaterialId()}
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
                      Save Material Details
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

    </>
  );
}

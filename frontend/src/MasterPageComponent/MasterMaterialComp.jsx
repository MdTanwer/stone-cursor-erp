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

export default function MasterMaterialComp({ openMaterialpage, getMaxMaterialId, setOpenMaterialpage }) {

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
  }, [openMaterialpage]);

  const GetMaterial = async () => {
    try {
      const response = await axios.get("materialmaster/get-materialmaster");
      setMaterial(response.data.materialmasters);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(isActive);
  const checkChanged = (e) => {
    setIsActive(!isActive);
    // const [name, checked] = e.target;
  };
  //const handleSubmit = (event) => {
  const handlematerialSubmit = async (event) => {
    debugger
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


    console.log(material);
    try {
      const response = await axios.post(
        "materialmaster/create-materialmaster",
        material
      );

      if (response.status === 201) {
        toast.success("Record has been added successfully!");
        handleClose()
        console.log(response);
      } else {
        toast.error("Invalid Information!");
        setOpenMaterialpage(true)
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Material Information!");
      setOpenMaterialpage(true)
    }

  };


  const clear = () => {
    // 
    // setMaterialId("");
    setMaterialName("");
    setDescription("");
  };
  // ========================================================
  const handleClose = () => {
    setOpenMaterialpage(false)
    clear()
    GetMaterial()
  };
  return (
    <>
      <div>

        <Dialog
          fullWidth
          maxWidth="md"
          open={openMaterialpage}
          onClose={handleClose}
          onBackdropClick={false}
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
              <form className={classes.form} >
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
                      // type="submit"
                      onClick={handlematerialSubmit}
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

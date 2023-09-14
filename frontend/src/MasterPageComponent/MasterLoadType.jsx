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
    Grid,
    TextField,
    Typography,
    makeStyles,
} from "@material-ui/core";

import MaterialTable from "material-table";
import React, { forwardRef, useEffect, useState } from "react";
import {
    Edit as EditIcon,
    Add as AddIcon,
    Delete as DeleIcon,
    Refresh,
} from "@material-ui/icons";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
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

export default function MasterLoadType({ openMasterLoadtype, setOpenMasterLoadtype, getloadTypeMaxId }) {
    const columns = [
        { title: "Load Type Id", field: "loadTypeId" },
        { title: "Load Type", field: "loadType" },
        { title: "Load Weight", field: "loadWeight" },
        { title: "Description", field: "description" },
        { title: "Active", field: "isActive" },
    ];
    const [loadTypeId, setLoadTypeId] = useState([]);
    const [loadType, setLoadType] = useState("");
    const [loadWeight, setLoadWeight] = useState("");
    const [description, setDescription] = useState("");

    const [isDisable, setIsDisable] = useState(false);
    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    // =================================================
    const [checked, setChecked] = useState(true);
    const [isActive, setIsActive] = useState(true);

    const checkChanged = (state) => {
        setChecked(!checked);
        setIsActive(!isActive);
    };

    const [allmatechecked, setAllMatechecked] = useState(false);

    const AllMaterialChanged = (state) => {
        setAllMatechecked(!allmatechecked);
        setIsDisable(!allmatechecked);
    };
    const [data, setData] = useState([]);
    useEffect(() => {
        GetLoadType();
        setLoadTypeId(getloadTypeMaxId());
    }, [open, updateOpen, showDeleteConfirm]);
    const GetLoadType = () => {
        axios
            .get("loadTypemaster/get-loadType")
            .then((res) => {
                debugger;
                console.log(res);
                setData(res.data.loadTypes);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    // GetLoadType();

    // const getloadTypeMaxId = () => {
    //     if (!data || data.length === 0) {
    //         // Handle the case where data.customer is null or empty
    //         return 1;
    //     }
    //     const maxID = data.reduce((max, data) => {
    //         // Convert customerId to a number
    //         const loadTypeId = parseInt(data.loadTypeId);
    //         // Check if customerId is greater than the current max
    //         if (loadTypeId > max) {
    //             return loadTypeId; // Update max if customerId is greater
    //         } else {
    //             return max; // Keep the current max if customerId is not greater
    //         }
    //     }, 0); // Initialize max with 0
    //     return maxID + 1;
    // };
    const classes = useStyles();

    // const [data, setData] = useState([]);

    const handleSubmit = (event) => {
        event.preventDefault();
        var data = {
            loadTypeId: loadTypeId,
            loadType: loadType,
            loadWeight: loadWeight,
            description: description,
            isActive: isActive,
        };
        console.log(data);
        axios
            .post("loadTypemaster/create-loadType", data)
            .then((res) => {
                if (res.status === 201) {
                    toast.success("Load Type Added Successfully");
                    handleClose();
                    console.log(res);
                } else {
                    toast.err("Invalid  Information!");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.err("Invalid LoadType Information!");
            });

    };

    const handleReset = () => {
        debugger;
        // setLoadTypeId();
        setLoadType("");
        setDescription("");
        setLoadWeight("");
    };

    const handleClose = () => {
        setOpenMasterLoadtype(false)
        handleReset();
        GetLoadType()
    };

    return (
        <>
            <div>

                <Dialog
                    fullWidth
                    maxWidth="md"
                    open={openMasterLoadtype}
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
                                        Load Type Name
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
                            <form
                                className={classes.form}
                                onSubmit={handleSubmit}
                                onReset={handleReset}
                            >
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            disabled
                                            value={loadTypeId}
                                            autoComplete="loadTypeId"
                                            name="loadTypeId"
                                            variant="outlined"
                                            fullWidth
                                            id="loadTypeId"
                                            label="Load Type Id "
                                            onChange={(e) => setLoadTypeId(e.target.value)}
                                            autoFocus
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            disabled={isDisable}
                                            value={loadType}
                                            autoComplete="loadType"
                                            name="loadType"
                                            variant="outlined"
                                            fullWidth
                                            required
                                            id="loadType"
                                            label="Load Type"
                                            onChange={(e) => setLoadType(e.target.value)}
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={2}>
                                        <TextField
                                            disabled={isDisable}
                                            value={loadWeight}
                                            autoComplete="loadWeight"
                                            name="loadWeight"
                                            variant="outlined"
                                            fullWidth
                                            id="loadWeight"
                                            label="Load Weight"
                                            onChange={(e) => setLoadWeight(e.target.value)}
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <TextField
                                            disabled={isDisable}
                                            value={description}
                                            autoComplete="description"
                                            name="description"
                                            variant="outlined"
                                            fullWidth
                                            id="description"
                                            label="Description "
                                            onChange={(e) => setDescription(e.target.value)}
                                            autoFocus
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={1}>
                                        <label>IsActive</label>

                                        <Checkbox
                                            {...label}
                                            checked={checked}
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
                                            Save Load Type
                                        </Button>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Button
                                            name="resetForm"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleReset()}
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
                                    <Grid item xs={12} sm={2}></Grid>
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

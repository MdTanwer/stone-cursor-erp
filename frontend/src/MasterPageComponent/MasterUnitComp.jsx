
import React, { useState, useEffect } from "react";

import MaterialTable, { Column } from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import axios from 'axios';
// import jsPDF from "jspdf";
import 'jspdf-autotable';

import {
    Edit as EditIcon,
    Add as AddIcon,
    Delete as DeleIcon,
    Refresh,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
    createunitmaster,
    deleteUnitMaster,
    getAllUnitMaster,
    updateUnitMaster,
} from "../redux/actions/unitmaster";
import { server } from "../server";

import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, Typography } from "@material-ui/core";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

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
        fontSize: '20px' // Your desired font weight or other styles
        // Add any other custom styles you want
    },

}));

export default function MasterUnitComp({ openUnitMaster, setOpenUnitMaster, getMaxUnitMasterId }) {
    const { success, error, unitmasters, delsuccess } = useSelector(
        (state) => state.unitmaster
    );
    console.log(unitmasters);

    //   const [unitId, setUnitId] = useState("");
    const [open, setOpen] = useState(false);
    const [unitmasterId, setUnitmasterId] = useState("");
    const [unitName, setUnitName] = useState("");
    const [unitShortName, setUnitShortName] = useState("");
    const [description, setDescription] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);





    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllUnitMaster());
        setUnitmasterId(getMaxUnitMasterId())
    }, [openUnitMaster, open, showDeleteConfirm, setOpenUnitMaster]);

    const classes = useStyles();

    const handleSubmit = async (event) => {
        debugger
        event.preventDefault();
        const newForm = new FormData();

        newForm.append("unitmasterId", unitmasterId);
        newForm.append("unitName", unitName);
        newForm.append("unitShortName", unitShortName);
        newForm.append("description", description);

        dispatch(
            createunitmaster({
                unitmasterId,
                unitName,
                unitShortName,
                description,
            })
        );
        toast.success("Unit Create successfully!");
        handleCloseCancle()

    };


    const handleCloseCancle = () => {
        setOpenUnitMaster(false)
        handleReset()
        dispatch(getAllUnitMaster());
    };

    const handleReset = () => {
        setUnitName("");
        setUnitShortName("");
        setDescription("");
    };


    const row = [];

    unitmasters &&
        unitmasters.forEach((item) => {
            // debugger;
            row.push({
                _id: item._id,
                unitmasterId: item.unitmasterId,
                unitName: item.unitName,
                unitShortName: item.unitShortName,
                description: item.description,
            });
        });

    return (
        <>

            <Dialog
                fullWidth
                maxWidth='md'
                open={openUnitMaster}
                disableBackdropClick={true}
                onClose={handleCloseCancle}
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
                                Create New Unit
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Button
                                color='secondary'
                                onClick={handleCloseCancle}
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
                        <form className={classes.form} >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        value={getMaxUnitMasterId()}
                                        // value={unitmasterId}
                                        required
                                        type="unitName"
                                        autoComplete="unitName"
                                        name="unitName"
                                        variant="outlined"
                                        fullWidth
                                        disabled
                                        id="unitName"
                                        label="UINO"
                                        // onChange={(e) => setUiNo(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        value={unitName}
                                        required
                                        type="unitName"
                                        autoComplete="unitName"
                                        name="unitName"
                                        variant="outlined"
                                        fullWidth
                                        id="unitName"
                                        label="Unit Name"
                                        onChange={(e) => setUnitName(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12} sm={5}>
                                    <TextField
                                        value={unitShortName}
                                        type="unitShortName"
                                        autoComplete="unitShortName"
                                        name="unitShortName"
                                        variant="outlined"
                                        fullWidth
                                        id="unitShortName"
                                        label="Unit Short Name"
                                        onChange={(e) => setUnitShortName(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}>
                                    <TextField
                                        value={description}
                                        type="description"
                                        autoComplete="description"
                                        name="description"
                                        variant="outlined"
                                        fullWidth
                                        id="description"
                                        label="Description"
                                        onChange={(e) => setDescription(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>

                                <Grid item xs={12} sm={12}></Grid>
                                {/* </Grid> */}


                                <Grid item xs={12} sm={4}>
                                    <Button
                                        // name='submit'
                                        // type='submit'
                                        onClick={handleSubmit}
                                        fullWidth
                                        variant='contained'
                                        color='primary'
                                    // className={classes.submit}
                                    >
                                        Save Unit Details
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
                                        onClick={() => handleCloseCancle()}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>


        </>
    );
}

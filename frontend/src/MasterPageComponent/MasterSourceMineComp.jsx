import {
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
import React, { useEffect, useState } from "react";
import {
    Edit as EditIcon,
    Delete as DeleIcon,
    Refresh,
} from "@material-ui/icons";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
const label = { inputProps: { "aria-label": "Checkbox demo" } };
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
const MasterSourceMineComp = ({ openSourceMine, setOpenSourceMine, getMaxSourceId }) => {
    const [source, setSource] = useState([]);
    const [sourceId, setSourceId] = useState("");
    const [sourceName, setSourceName] = useState("");
    const [sourceAddress, setSourceAddress] = useState("");
    const [update, setUpdate] = useState(false);

    const [open, setOpen] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const classes = useStyles();

    useEffect(() => {
        GetSource();
        setSourceId(getMaxSourceId()); //for auto id generator
    }, [openSourceMine, setOpenSourceMine]);
    const GetSource = async () => {
        try {
            const response = await axios.get("source/get/sourcemaster");
            debugger;
            // console.log(response.data.sitemasters);
            setSource(response.data.sourcemaster);
        } catch (error) {
            console.log(error);
        }
    };
    //   =================
    // For Add Counting in ID
    // const getMaxSourceId = () => {
    //     if (!source || source.length === 0) {
    //         return 1;
    //     }
    //     const maxID = source.reduce((max, source) => {
    //         const sourceId = parseInt(source.sourceId);
    //         if (sourceId > max) {
    //             return sourceId;
    //         } else {
    //             return max;
    //         }
    //     }, 0);
    //     return maxID + 1;
    // };
    //   ===============================
    const handleSubmit = async (event) => {
        event.preventDefault();
        var source = {
            sourceId: sourceId,
            sourceName: sourceName,
            sourceAddress: sourceAddress,
            isActive: isActive,
        };
        // console.log(source);
        try {
            const response = await axios.post("source/create/sourcemaster", source);

            if (response.status === 201) {
                toast.success("Mine/Source has been added successfully!");
                setOpenSourceMine(false)
                clear();

            } else {
                toast.error("Invalid Information!");
            }
        } catch (error) {
            console.log(error);
            toast.error("Invalid Material Information!");
        }


    };


    const checkChanged = (e) => {
        setIsActive(!isActive);
        // const [name, checked] = e.target;
    };
    const handleClose = () => {
        setOpenSourceMine(false);
        clear();

    };
    const clear = () => {
        setSourceName("");
        setSourceAddress("");
    };
    return (
        <>


            <Dialog
                fullWidth
                maxWidth="md"
                disableBackdropClick={true}
                open={openSourceMine}
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
                                    Create Source / Mine
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
                        {/* onSubmit={handleSubmit} */}
                        <form className={classes.form} >
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={2}>
                                    <TextField
                                        disabled={true}
                                        value={getMaxSourceId()}
                                        // value={sourceId}

                                        autoComplete="sourceId"
                                        name="sourceId"
                                        variant="outlined"
                                        fullWidth
                                        id="sourceId"
                                        label="Source Id"
                                        onChange={(e) => setSourceId(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        type="sourceName"
                                        value={sourceName}
                                        required
                                        autoComplete="sourceName"
                                        name="sourceName"
                                        variant="outlined"
                                        fullWidth
                                        id="sourceName"
                                        label="Source / Mine Name"
                                        onChange={(e) => setSourceName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        type="sourceAddress"
                                        value={sourceAddress}

                                        autoComplete="sourceAddress"
                                        name="sourceAddress"
                                        variant="outlined"
                                        fullWidth
                                        id="sourceAddress"
                                        label="Source / Mine Address"
                                        onChange={(e) => setSourceAddress(e.target.value)}
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
                                        onClick={handleSubmit}
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                    // className={classes.submit}
                                    >
                                        Save Mine Details
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
                                        variant='contained'
                                        color='secondary'
                                        fullWidth
                                        onClick={() => handleClose()}
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
};

export default MasterSourceMineComp;

import React, { useState, Component, useEffect, forwardRef } from "react";

import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { TextField, Typography } from "@mui/material";

import axios from "axios";
import "jspdf-autotable";

import Checkbox from "@mui/material/Checkbox";
import {
    Edit as EditIcon,
    Add as AddIcon,
    Delete as DeleIcon,
    Refresh,
} from "@material-ui/icons";
// import { Refresh } from '@material-ui/icons';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirm } from "react-confirm-box";

import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Tooltip,
} from "@mui/material";
import BankDetails from "../components/bankDetails";
import { useDispatch, useSelector } from "react-redux";
import DropdownComp from "../components/Helper Component/DropDownComp";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DialogContentText, Fab } from "@material-ui/core";
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

export default function MasterDriverComp({ openMasterDriver, getMaxDriverID, setOpenMasterDriver }) {
    // const {
    //   accountHolderName,
    //   bankName,
    //   accountNumber,
    //   ifscCode,
    //   branchAddress,
    //   accountType,
    // } = useSelector((state) => state.bank);
    const { name, email } = useSelector((state) => state.user.user);
    console.log(name, email);
    const { success } = useSelector((state) => state.customer);

    const [isDisable, setIsDisable] = useState(false);
    const classes = useStyles();
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const label = { inputProps: { "aria-label": "Checkbox demo" } };

    const [checked, setChecked] = useState(true);
    const checkChanged = (state) => {
        setChecked(!checked);
    };
    const [allCustchecked, setAllCustchecked] = useState(false);

    const AllCustomercheckChanged = (state) => {
        setAllCustchecked(!allCustchecked);
        setIsDisable(!allCustchecked);
    };

    const [open, setOpen] = useState(false);
    const [updateOpen, setUpdateOpen] = useState(false);
    // const [active, setActive] = useState(true);

    const [driversData, setDriversData] = useState([]);
    useEffect(() => {
        getdriversMaster();
        setDriverID(getMaxDriverID);
    }, [open, updateOpen]);
    const getdriversMaster = async () => {
        try {
            const response = await axios.get("driverMaster/get-driverMaster");

            setDriversData(response.data.driverMasters);
            // console.log(driversData);
        } catch (error) {
            console.log(error);
        }
    };


    const [mongodbId, setMongodbId] = useState("");
    const [typesofDL, setTypesofDL] = useState("");
    const [startDatevalue, setStartDatevalue] = useState("");
    const [driverID, setDriverID] = useState("");
    const [updatedriverID, setUpdateDriverID] = useState("");
    const [driverName, setDriverName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [driverEmail, setDriverEmail] = useState("");
    const [panNumber, setPanNumber] = useState("");
    const [drivingLicenseNumber, setDrivingLicenseNumber] = useState("");
    const [city, setCity] = useState("");
    const [zipCode, setZipCode] = useState("");
    const [authorityCentre, setAuthorityCentre] = useState("");
    const [driverAddress, setDriverAddress] = useState("");
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [driverDelete, setDriverDelete] = useState("");

    //bank details
    const [accountHolderName, setAccountHolderName] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [branchAddress, setBranchAddress] = useState("");
    const [accountType, setAccountType] = useState("");

    // const getMaxDriverID = () => {
    //     if (!driversData || driversData.length === 0) {
    //         // Handle the case where data.customer is null or empty
    //         return 1;
    //     }
    //     const maxID = driversData.reduce((max, driversData) => {
    //         // Convert customerId to a number
    //         const driverID = parseInt(driversData.driverID);
    //         // Check if customerId is greater than the current max
    //         if (driverID > max) {
    //             return driverID; // Update max if customerId is greater
    //         } else {
    //             return max; // Keep the current max if customerId is not greater
    //         }
    //     }, 0); // Initialize max with 0
    //     return maxID + 1;
    // };

    const handleSubmit = async (event) => {
        debugger;
        event.preventDefault();
        var data = {
            driverID: driverID,
            driverName: driverName,
            mobileNumber: mobileNumber,
            driverEmail: driverEmail,
            panNumber: panNumber,
            typesofDL: typesofDL,
            drivingLicenseNumber: drivingLicenseNumber,
            startDatevalue: startDatevalue,
            city: city,
            zipCode: zipCode,
            authorityCentre: authorityCentre,
            driverAddress: driverAddress,
            accountHolderName: accountHolderName,
            bankName: bankName,
            accountNumber: accountNumber,
            ifscCode: ifscCode,
            branchAddress: branchAddress,
            accountType: accountType,
        };
        debugger;
        console.log(data);
        axios
            .post("driverMaster/create-driverMaster", data)
            .then((res) => {
                if (res.status === 201) {
                    toast.success("Driver Added successfully!");
                    handleCloseCancle();

                } else {
                    toast.error("Invalid  Information!");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Invalid Driver Master Information!");
            });

    };

    const handleCheckChange = (e) => {
        const { name, checked } = e.target; // Use 'checked' instead of 'value'
        console.log(name, checked);
        console.log(e.target.checked.value);
    };


    const handleCloseCancle = () => {
        setOpenMasterDriver(false)
        handleReset();
        getdriversMaster();
    };

    const handleReset = () => {
        setDriverID();
        setDriverName("");
        setMobileNumber("");
        setDriverEmail("");
        setPanNumber("");
        setDrivingLicenseNumber("");
        setCity("");
        setZipCode("");
        setAuthorityCentre("");
        setStartDatevalue("");
        setDriverAddress("");
        setTypesofDL("");
        setAccountHolderName("");
        setBankName("");
        setAccountNumber("");
        setIfscCode("");
        setBranchAddress("");
        setAccountType("");
    };


    return (
        <>

            <Dialog
                fullWidth
                maxWidth="md"
                open={openMasterDriver}
                onClose={handleCloseCancle}
                aria-labelledby="max-width-dialog-title"
                disableBackdropClick={true}
            >
                <DialogTitle id="max-width-dialog-title">
                    <Grid
                        style={{
                            display: "flex",
                            alignItems: "center",
                        }}
                        container
                    >
                        <Grid style={{ justifyItems: "flex-end" }} item xs={12} sm={11}>
                            <Typography variant="h5" fontWeight={700}>
                                Create New Driver
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={1}>
                            <Button
                                color="secondary"
                                onClick={handleCloseCancle}
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
                        {/* <h3>Create New Supplier</h3> */}
                        <form className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        disabled
                                        type="number"
                                        value={driverID}
                                        autoComplete="driverID"
                                        name="driverID"
                                        variant="outlined"
                                        fullWidth
                                        id="driverID"
                                        label="Driver ID"
                                        onChange={(e) => setDriverID(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        disabled={isDisable}
                                        value={driverName}
                                        autoComplete="driverName"
                                        name="driverName"
                                        variant="outlined"
                                        fullWidth
                                        id="driverName"
                                        label="Driver Name"
                                        // onChange={handleChange}
                                        onChange={(e) => setDriverName(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        type="number"
                                        disabled={isDisable}
                                        value={mobileNumber}
                                        autoComplete="mobileNumber"
                                        name="mobileNumber"
                                        variant="outlined"
                                        fullWidth
                                        id="mobileNumber"
                                        label="Mobile Number"
                                        // onChange={handleChange}
                                        onChange={(e) => setMobileNumber(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        type="email"
                                        disabled={isDisable}
                                        value={driverEmail}
                                        autoComplete="email"
                                        name="driverEmail"
                                        variant="outlined"
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        // onChange={handleChange}
                                        onChange={(e) => setDriverEmail(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        disabled={isDisable}
                                        value={panNumber}
                                        autoComplete="panNumber"
                                        name="panNumber"
                                        variant="outlined"
                                        fullWidth
                                        id="panNumber"
                                        label="Pan Number"
                                        // onChange={handleChange}
                                        onChange={(e) => setPanNumber(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <DropdownComp
                                        // required
                                        dropDownLable={"Types of DL"}
                                        ddselectlabel={"Types of DL"}
                                        dropDownValue={typesofDL}
                                        menuItemArray={[
                                            "Heavy Passenger Vehicle (HPV) License",
                                            "Commercial Driving License (CDL)",
                                            "All India Driving Permit (AIDP)",
                                        ]}
                                        setDropDownValue={setTypesofDL}
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        value={drivingLicenseNumber}
                                        // required
                                        type="drivingLicenseNumber"
                                        autoComplete="drivingLicenseNumber"
                                        name="drivingLicenseNumber"
                                        variant="outlined"
                                        fullWidth
                                        id="drivingLicenseNumber"
                                        label="DL No"
                                        // onChange={handleChange}
                                        onChange={(e) => setDrivingLicenseNumber(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
                                            label="DL Expiry Date"
                                            // disabled={isDateRangeEnableDisable}
                                            value={startDatevalue}
                                            onChange={(newValue) => {
                                                setStartDatevalue(newValue);
                                            }}
                                            renderInput={(params) => (
                                                <TextField variant="outlined" fullWidth {...params} />
                                            )}
                                        />
                                    </LocalizationProvider>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        disabled={isDisable}
                                        value={city}
                                        autoComplete="city"
                                        name="city"
                                        variant="outlined"
                                        fullWidth
                                        id="city"
                                        label="City"
                                        onChange={(e) => setCity(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        disabled={isDisable}
                                        value={zipCode}
                                        autoComplete="zipCode"
                                        name="zipCode"
                                        variant="outlined"
                                        fullWidth
                                        id="zipCode"
                                        label="Pin Code"
                                        onChange={(e) => setZipCode(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        value={authorityCentre}
                                        // required
                                        type="authorityCentre"
                                        autoComplete="authorityCentre"
                                        name="authorityCentre"
                                        variant="outlined"
                                        fullWidth
                                        id="authorityCentre"
                                        label="Authority Centre"
                                        onChange={(e) => setAuthorityCentre(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        disabled={isDisable}
                                        value={driverAddress}
                                        autoComplete="driverAddress"
                                        name="driverAddress"
                                        variant="outlined"
                                        // rows={2}
                                        fullWidth
                                        id="driverAddress"
                                        label="Driver Address"
                                        onChange={(e) => setDriverAddress(e.target.value)}
                                        autoFocus
                                        multiline
                                        minRows={1}
                                    />
                                </Grid>

                                <Grid item xs={12} sm={2}>
                                    <label>IsActive</label>

                                    <Checkbox
                                        {...label}
                                        checked={checked}
                                        onChange={checkChanged}
                                        color="primary"
                                        size="medium"
                                    />
                                </Grid>
                                <Grid container spacing={1}>
                                    <Grid
                                        style={{ marginBottom: "1rem", marginTop: "1rem" }}
                                        item
                                        xs={12}
                                        sm={12}
                                    >
                                        <Typography variant="h5" fontWeight={700}>
                                            Add Bank Details
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            variant="outlined"
                                            type="text"
                                            // required
                                            name="accountHolderName"
                                            value={accountHolderName}
                                            fullWidth
                                            id="accountHolderName"
                                            label="Account Holder Name"
                                            onChange={(e) => setAccountHolderName(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={3}>
                                        <DropdownComp
                                            // required
                                            dropDownLable={"Bank Name"}
                                            ddselectlabel={"Bank Name"}
                                            dropDownValue={bankName}
                                            menuItemArray={[
                                                "State Bank of India",
                                                "HDFC Bank",
                                                "ICICI Bank",
                                                "Axis Bank",
                                                "Punjab National Bank",
                                                "CBI - Central Bank of India",
                                                "BOB",
                                                "BOI",
                                            ]}
                                            setDropDownValue={setBankName}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            variant="outlined"
                                            type="text"
                                            // required
                                            value={accountNumber}
                                            fullWidth
                                            id="accountno"
                                            name="accountNumber"
                                            label="Account Number"
                                            onChange={(e) => setAccountNumber(e.target.value)}

                                        // onChange={handleChange}
                                        // onChange={(e) =>
                                        //   dispatch(addbankDetails({ accountNumber: e.target.value }))
                                        // }
                                        // onChange={(e) => setAccountNumber(e.target.value)}
                                        // error={!!errors.accountno}
                                        // helperText={errors.accountno}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            variant="outlined"
                                            // required
                                            fullWidth
                                            value={ifscCode}
                                            id="ifsc"
                                            name="ifscCode"
                                            label="Ifsc Code"
                                            onChange={(e) => setIfscCode(e.target.value)}

                                        // onChange={handleChange}
                                        // onChange={(e) =>
                                        //   dispatch(addbankDetails({ ifscCode: e.target.value }))
                                        // }
                                        // onChange={(e) => setIfscCode(e.target.value)}
                                        // error={!!errors.ifsc}
                                        // helperText={errors.ifsc}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <TextField
                                            variant="outlined"
                                            // required
                                            fullWidth
                                            value={branchAddress}
                                            id="Branch"
                                            name="branchAddress"
                                            label="Branch Aaddress"
                                            onChange={(e) => setBranchAddress(e.target.value)}

                                        // onChange={handleChange}
                                        // onChange={(e) =>
                                        //   dispatch(addbankDetails({ branchAddress: e.target.value }))
                                        // }
                                        // onChange={(e) => setBranchAddress(e.target.value)}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={3}>
                                        <DropdownComp
                                            // required
                                            dropDownLable={"Account Type"}
                                            ddselectlabel={"Account Typee"}
                                            dropDownValue={accountType}
                                            menuItemArray={["Current", "Saving"]}
                                            setDropDownValue={setAccountType}
                                        />
                                    </Grid>
                                </Grid>

                                <Grid item xs={12} sm={4}>
                                    <Button
                                        // name="submit"
                                        // type="submit"
                                        onClick={handleSubmit}
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                    // onClick={() => handleReset()}
                                    >
                                        Save Details
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
                                        name="cancle"
                                        variant="contained"
                                        color="secondary"
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

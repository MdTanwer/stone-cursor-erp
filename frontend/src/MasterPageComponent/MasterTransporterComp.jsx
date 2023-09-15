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

import { DialogContentText, Fab } from "@material-ui/core";
import DropdownComp from "../components/Helper Component/DropDownComp";
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

export default function MasterTransporterComp({ openMasterTransporter, setOpenMasterTransporter, getMaxtransportId }) {
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

    const [transportData, setTransportData] = useState([]);
    useEffect(() => {
        getTransport();
        getMaxtransportId()
        setTransportId(getMaxtransportId());
    }, [openMasterTransporter]);
    const getTransport = async () => {
        try {
            const response = await axios.get("transport/get-transport");

            setTransportData(response.data.transports);
            // console.log(transportData);
        } catch (error) {
            console.log(error);
        }
    };

    const columns = [
        { title: "Transport ID", field: "transportId" },
        { title: "Transport Name", field: "transportname" },
        { title: "Mobile No.", field: "phonenumber" },
        { title: "Whatsapp No.", field: "whatsappnumber" },
        { title: "Email", field: "transportEmail" },
        { title: "GST No.", field: "gstn" },
        { title: "PAN No.", field: "pannumber" },
        { title: "City", field: "city" },
        { title: "Pin Code", field: "pincode" },
        { title: " Address", field: "address" },
        { title: "Bank Account Holder Name", field: "accountHolderName" },
        { title: "Bank Name", field: "bankName" },
        { title: "Bank Account No.", field: "accountNumber" },
        { title: "IFSC code", field: "ifscCode" },
        { title: "Bank Branch Address", field: "branchAddress" },
        { title: "Bank Account Type", field: "accountType" },
    ];
    const [mongodbId, setMongodbId] = useState("");
    const [startDatevalue, setStartDatevalue] = useState("");
    const [transportId, setTransportId] = useState("");
    const [updatetransportId, setUpdatetransportId] = useState("");
    const [transportname, setTransportname] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [whatsappnumber, setWhatsappnumber] = useState("");
    const [transportEmail, setTransportEmail] = useState("");
    const [pannumber, setPannumber] = useState("");
    const [gstn, setGstn] = useState("");
    const [city, setCity] = useState("");
    const [pincode, setPincode] = useState("");
    const [address, setAddress] = useState("");


    //bank details
    const [accountHolderName, setAccountHolderName] = useState("");
    const [bankName, setBankName] = useState("");
    const [accountNumber, setAccountNumber] = useState("");
    const [ifscCode, setIfscCode] = useState("");
    const [branchAddress, setBranchAddress] = useState("");
    const [accountType, setAccountType] = useState("");


    // const getMaxtransportId = () => {
    //     if (!transportData || transportData.length === 0) {
    //         // Handle the case where data.customer is null or empty
    //         return 1;
    //     }
    //     const maxID = transportData.reduce((max, transportData) => {
    //         // Convert customerId to a number
    //         const transportId = parseInt(transportData.transportId);
    //         // Check if customerId is greater than the current max
    //         if (transportId > max) {
    //             return transportId; // Update max if customerId is greater
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
            transportId: transportId,
            transportname: transportname,
            phonenumber: phonenumber,
            transportEmail: transportEmail,
            pannumber: pannumber,
            whatsappnumber: whatsappnumber,
            startDatevalue: startDatevalue,
            city: city,
            gstn: gstn,
            pincode: pincode,
            address: address,
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
            .post("transport/create-transport", data)
            .then((res) => {
                if (res.status === 201) {
                    toast.success("Transport Submited successfully!");
                    handleCloseCancle()
                } else {
                    toast.error("Invalid  Information!");
                    setOpenMasterTransporter(true)
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Invalid Transport Information!");
                setOpenMasterTransporter(true)
            });

    };


    const handleCloseCancle = () => {
        setOpenMasterTransporter(false)
        handleReset();
        getTransport();
    };
    const handleReset = () => {
        setTransportId();
        setTransportname("");
        setPhonenumber("");
        setTransportEmail("");
        setPannumber("");
        setWhatsappnumber("");
        setCity("");
        setGstn("");
        setPincode("");
        setStartDatevalue("");
        setAddress("");
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
                // onBackdropClick={handleClose}
                fullWidth
                maxWidth="md"
                open={openMasterTransporter}
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
                                Create New Transport
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
                        {/* <h3>Create New Supplier</h3> */}
                        <form className={classes.form}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        disabled
                                        type="number"
                                        value={getMaxtransportId()}
                                        autoComplete="transportId"
                                        name="transportId"
                                        variant="outlined"
                                        fullWidth
                                        id="transportId"
                                        label="Transport ID"
                                        onChange={(e) => setTransportId(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        disabled={isDisable}
                                        value={transportname}
                                        autoComplete="transportname"
                                        name="transportname"
                                        variant="outlined"
                                        fullWidth
                                        id="transportname"
                                        label="Transport Name"
                                        required
                                        // onChange={handleChange}
                                        onChange={(e) => setTransportname(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        type="number"
                                        disabled={isDisable}
                                        value={phonenumber}
                                        autoComplete="phonenumber"
                                        name="phonenumber"
                                        variant="outlined"
                                        fullWidth
                                        id="phonenumber"
                                        label="Mobile Number"
                                        onChange={(e) => setPhonenumber(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        value={whatsappnumber}
                                        // required
                                        type="number"
                                        autoComplete="whatsappnumber"
                                        name="whatsappnumber"
                                        variant="outlined"
                                        fullWidth
                                        id="whatsappnumber"
                                        label="Whatsapp Number"
                                        onChange={(e) => setWhatsappnumber(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        type="email"
                                        disabled={isDisable}
                                        value={transportEmail}
                                        autoComplete="email"
                                        name="email"
                                        variant="outlined"
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        onChange={(e) => setTransportEmail(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        disabled={isDisable}
                                        value={pannumber}
                                        autoComplete="pannumber"
                                        name="pannumber"
                                        variant="outlined"
                                        fullWidth
                                        id="pannumber"
                                        label="Pan Number"
                                        onChange={(e) => setPannumber(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        disabled={isDisable}
                                        value={gstn}
                                        autoComplete="gstn"
                                        name="gstn"
                                        variant="outlined"
                                        fullWidth
                                        id="gstn"
                                        label="GST No."
                                        // onChange={handleChange}
                                        onChange={(e) => setGstn(e.target.value)}
                                        autoFocus
                                    />
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
                                        // onChange={handleChange}
                                        onChange={(e) => setCity(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                    <TextField
                                        value={pincode}
                                        // required
                                        type="number"
                                        autoComplete="pincode"
                                        name="pincode"
                                        variant="outlined"
                                        fullWidth
                                        id="pincode"
                                        label="Pin Code"
                                        // onChange={handleChange}
                                        onChange={(e) => setPincode(e.target.value)}
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={12} sm={8}>
                                    <TextField
                                        disabled={isDisable}
                                        value={address}
                                        autoComplete="address"
                                        name="address"
                                        variant="outlined"
                                        fullWidth
                                        id="address"
                                        label=" Address"
                                        onChange={(e) => setAddress(e.target.value)}
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

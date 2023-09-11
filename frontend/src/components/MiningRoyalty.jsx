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
import axios from "axios";
import MaterialTable from "material-table";
import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Edit as EditIcon,
  Delete as DeleIcon,
  Refresh,
} from "@material-ui/icons";
import MasterSourceMineComp from "../MasterPageComponent/MasterSourceMineComp";
import { toast } from "react-toastify";
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
const MiningRoyalty = () => {
  const classes = useStyles;
  const [open, setOpen] = useState(false);
  const [miningRoyalty, setMiningRoyalty] = useState([]);
  const [royltyId, setRoyltyId] = useState("");
  const [mineName, setMineName] = useState("");
  const [locationName, setLocationName] = useState("");
  const [royltyRate, setRoyltyRate] = useState("");
  const [gstRate, setGstRate] = useState("");
  const [igst, setIgst] = useState("");
  const [isActive, setIsActive] = useState(true);

  const [mineSource, setMineSource] = useState([]);

  const [openSourceMine, setOpenSourceMine] = useState(false);
  const [update, setUpdate] = useState(false);
  const [mongodbId, setMongodbId] = useState();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [miningRoyaltyDelete, setMiningRoyaltyDelete] = useState("");

  const columns = [
    { title: "Royalty ID ", field: "royltyId" },
    { title: "Mine Name", field: "mineName" },
    { title: "Location Name ", field: "locationName" },
    { title: " Roylty Rate", field: "royltyRate" },
    { title: "Gst Rate ", field: "gstRate" },
    { title: " Igst", field: "igst" },
    { title: "Active ", field: "isActive" },
  ];
  useEffect(() => {
    getMaxRoyaltyId();
    setRoyltyId(getMaxRoyaltyId());
    getMineSource();

    GetMiningRoyalty();
  }, [open]);

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
      const response = await axios.get("/miningRoyalty/get/miningroyalty");

      // console.log(response.data.materialmasters);
      setMiningRoyalty(response.data.miningRoyalty);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    var miningRoyalty = {
      royltyId: royltyId,
      mineName: mineName,
      locationName: locationName,
      royltyRate: royltyRate,
      gstRate: gstRate,
      igst: igst,
      isActive: isActive,
    };
    try {
      const response = await axios.post(
        "/miningRoyalty/create/miningroyalty",
        miningRoyalty
      );

      if (response.status === 201) {
        toast.success("Record has been added successfully!");
        setOpen(false);
        console.log(response);
      } else {
        toast("Invalid Information!");
      }
    } catch (error) {
      console.log(error);
      toast("Invalid Material Information!");
    }
    console.log(miningRoyalty);
  };
  // ====================================
  const handleUpdateSubmit = async (event) => {
    debugger;
    event.preventDefault();
    const endpoint = `/miningRoyalty/updateminingroyalty/${mongodbId}`;

    try {
      const response = await axios.put(endpoint, {
        royltyId,
        mineName: mineName,
        locationName: locationName,
        royltyRate: royltyRate,
        gstRate: gstRate,
        igst: igst,
        isActive: isActive,
      });

      toast.success("Material Updated successfully!");
    } catch (error) {
      console.error("An error occurred while updating the unit:", error);
      // //   // Handle the error in your UI, maybe show a notification or error message
    }
    setUpdate(false);
    setOpen(false);
    GetMiningRoyalty();
  };
  // ====================================
  const onClickDelete = async (rowData) => {
    axios
      .delete(`/miningRoyalty/deleteminingroyalty/${rowData._id}`)
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
  // ============================================
  const getMineSource = async () => {
    try {
      const response = await axios.get("source/get/sourcemaster");

      setMineSource(response.data.sourcemaster);
    } catch (error) {
      console.log(error);
    }
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

  const handleClose = () => {
    setOpen(false);
    setUpdate(false);
  };
  const clear = () => {
    setMineName("");

    setRoyltyRate("");
    setGstRate("");
    setIgst("");
  };
  const checkChanged = (e) => {
    setIsActive(!isActive);
    // const [name, checked] = e.target;
  };

  const getLocation = (mineName) => {
    const source = mineSource.find((item) => {
      return item.sourceName === mineName;
    });
    return source;
  };

  const handleMineChange = (e) => {
    setMineName(e.target.value);
  };
  const handleMineSourceClick = () => {
    setOpenSourceMine(true);
    // setOpenSourceMine(true)
  };
  const actions = [
    {
      icon: () => <Refresh />,
      tooltip: "Refresh Data",
      isFreeAction: true,
      onClick: (event, rowData) => {
        GetMiningRoyalty();
      },
    },
    {
      icon: () => <EditIcon color="primary" />,
      tooltip: "Edit Factory",
      onClick: (event, rowData) => {
        setUpdate(true);
        setMineName(rowData.mineName);
        setMongodbId(rowData._id);
        setRoyltyRate(rowData.royltyRate);
        setGstRate(rowData.gstRate);
        setIgst(rowData.igst);
      },
    },
    {
      icon: () => <DeleIcon color="secondary" />,
      tooltip: "Delete Factory",
      onClick: (event, rowData) => {
        setShowDeleteConfirm(rowData);
        setMiningRoyaltyDelete(rowData.mineName);
      },
    },
  ];
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
              Mining Royalty
            </Fab>
          </Grid>
          <Grid item xs={12} sm={12}>
            <MaterialTable
              title=""
              columns={columns}
              data={miningRoyalty}
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
                exportFileName: "All Royalty",
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
          disableBackdropClick
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
                    Mining Royalty
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
                      value={getMaxRoyaltyId()}
                      autoComplete="royltyId"
                      name="royltyId"
                      variant="outlined"
                      fullWidth
                      id="royltyId"
                      label="Roylty Id"
                      onChange={(e) => setRoyltyId(e.target.value)}
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <Grid
                      container
                      spacing={1}
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
                              Mine / Source Name
                            </InputLabel>
                            <Select
                              variant="outlined"
                              name="mineSourceName"
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={mineName}
                              label="Mine / Source Name"
                              onChange={handleMineChange}
                            >
                              {mineSource.map((el) => (
                                <MenuItem
                                  key={el.sourceId}
                                  value={el.sourceName}
                                >
                                  {el.sourceName}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>

                      <AddCircleIcon
                        sx={{ fontSize: "30px" }}
                        color="primary"
                        onClick={handleMineSourceClick}
                      />
                      {openSourceMine && (
                        <MasterSourceMineComp
                          openSourceMine={openSourceMine}
                          getMaxSourceId={getMaxSourceId}
                          setOpenSourceMine={setOpenSourceMine}
                        />
                      )}
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="locationName"
                      value={getLocation(mineName)?.sourceAddress}
                      autoComplete="locationName"
                      name="locationName"
                      variant="outlined"
                      fullWidth
                      id="locationName"
                      label="Location Name"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      // onChange={(e) => setLocationName(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="royltyRate"
                      value={royltyRate}
                      autoComplete="royltyRate"
                      name="royltyRate"
                      variant="outlined"
                      fullWidth
                      id="royltyRate"
                      label="Roylty Rate"
                      onChange={(e) => setRoyltyRate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      type="gstRate"
                      value={gstRate}
                      autoComplete="gstRate"
                      name="gstRate"
                      variant="outlined"
                      fullWidth
                      id="gstRate"
                      label="Gst Rate"
                      onChange={(e) => setGstRate(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      type="igst"
                      value={igst}
                      autoComplete="igst"
                      name="igst"
                      variant="outlined"
                      fullWidth
                      id="igst"
                      label="Igst Rate"
                      onChange={(e) => setIgst(e.target.value)}
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
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      // className={classes.submit}
                    >
                      Save Mining Royalty Details
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      onClick={() => clear()}
                    >
                      Reset
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Button
                      variant="contained"
                      color="secondary"
                      fullWidth
                      onClick={() => handleClose()}
                    >
                      Cancle
                    </Button>
                  </Grid>
                  <Grid item xs={12} sm={1}></Grid>
                </Grid>
              </form>
            </div>
          </DialogContent>
        </Dialog>
        <div>
          <Dialog
            disableBackdropClick
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
                      Mining Royalty
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
                        value={royltyId}
                        autoComplete="royltyId"
                        name="royltyId"
                        variant="outlined"
                        fullWidth
                        id="royltyId"
                        label="Roylty Id"
                        onChange={(e) => setRoyltyId(e.target.value)}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <Grid
                        container
                        spacing={1}
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
                                Mine / Source Name
                              </InputLabel>
                              <Select
                                variant="outlined"
                                name="mineSourceName"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={mineName}
                                label="Mine / Source Name"
                                onChange={handleMineChange}
                              >
                                {mineSource.map((el) => (
                                  <MenuItem
                                    key={el.sourceId}
                                    value={el.sourceName}
                                  >
                                    {el.sourceName}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                        </Grid>

                        <AddCircleIcon
                          sx={{ fontSize: "30px" }}
                          color="primary"
                          onClick={handleMineSourceClick}
                        />
                        {openSourceMine && (
                          <MasterSourceMineComp
                            openSourceMine={openSourceMine}
                            getMaxSourceId={getMaxSourceId}
                            setOpenSourceMine={setOpenSourceMine}
                          />
                        )}
                      </Grid>
                    </Grid>

                    <Grid item xs={12} sm={4}>
                      <TextField
                        type="locationName"
                        value={getLocation(mineName)?.sourceAddress}
                        autoComplete="locationName"
                        name="locationName"
                        variant="outlined"
                        fullWidth
                        id="locationName"
                        label="Location Name"
                        InputLabelProps={{
                          shrink: true,
                        }}
                        // onChange={(e) => setLocationName(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        type="royltyRate"
                        value={royltyRate}
                        autoComplete="royltyRate"
                        name="royltyRate"
                        variant="outlined"
                        fullWidth
                        id="royltyRate"
                        label="Roylty Rate"
                        onChange={(e) => setRoyltyRate(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <TextField
                        type="gstRate"
                        value={gstRate}
                        autoComplete="gstRate"
                        name="gstRate"
                        variant="outlined"
                        fullWidth
                        id="gstRate"
                        label="Gst Rate"
                        onChange={(e) => setGstRate(e.target.value)}
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <TextField
                        type="igst"
                        value={igst}
                        autoComplete="igst"
                        name="igst"
                        variant="outlined"
                        fullWidth
                        id="igst"
                        label="Igst Rate"
                        onChange={(e) => setIgst(e.target.value)}
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
                    <Grid item xs={12} sm={6}>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        // className={classes.submit}
                      >
                        Save Mining Royalty Details
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={() => clear()}
                      >
                        Reset
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        onClick={() => handleClose()}
                      >
                        Cancle
                      </Button>
                    </Grid>
                    <Grid item xs={12} sm={1}></Grid>
                  </Grid>
                </form>
              </div>
            </DialogContent>
          </Dialog>
        </div>
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
                {`' ${miningRoyaltyDelete} '`}
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
                    GetMiningRoyalty();
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

export default MiningRoyalty;

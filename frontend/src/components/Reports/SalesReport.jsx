import React, { useState, useEffect, forwardRef } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import Grid from "@material-ui/core/Grid";

// import MaterialTable, { Column } from "material-table";

import "jspdf-autotable";

import axios from "axios";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Checkbox from "@mui/material/Checkbox";

import TextField from "@material-ui/core/TextField";
import Radio from "@mui/material/Radio";
import { toast } from "react-toastify";
import Fade from "@material-ui/core/Fade";

//import "devextreme/dist/css/dx.light.css";
// import { exportDataGrid } from 'devextreme/excel_exporter';
// import { Workbook } from 'exceljs';
// import saveAs from 'file-saver';
import DataGrid, {
    Column,
    Selection,
    Summary,
    GroupItem,
    GroupPanel,
    Grouping,
    SortByGroupSummaryInfo,
    TotalItem,
    Export,
    Scrolling,
    Paging,
    Pager,
} from "devextreme-react/data-grid";
// import { jsPDF } from "jspdf";

// const exportFormats = ["pdf"];

import "devextreme/dist/css/dx.light.css";
//import DataGrid, { Export } from 'devextreme-react/data-grid';
import { jsPDF } from "jspdf";
import { exportDataGrid as exportDataGridToPdf } from "devextreme/pdf_exporter";
import { Workbook } from "exceljs";
import { saveAs } from "file-saver-es";
import { exportDataGrid } from "devextreme/excel_exporter";

const label = { inputProps: { "aria-label": "Checkbox demo" } };
const exportFormats = ["xlsx", "pdf"];

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    container: {
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
    },
}));

const EXTENSIONS = ["xlsx", "xls", "csv"];

const SalesReport = () => {
    const classes = useStyles();

    const [startDatevalue, setStartDatevalue] = useState(null);
    const [endDatevalue, setEndDatevalue] = useState(null);

    const [isDateWisecheckChanged, setIsDateWisecheckChanged] = useState(false);
    const [isDateRangeEnableDisable, setIsDateRangeEnableDisable] =
        useState(true);


    const [displayMode, setDisplayMode] = useState('full');
    const [showPageSizeSelector, setShowPageSizeSelector] = useState(true);
    const [showInfo, setShowInfo] = useState(true);
    const [showNavButtons, setShowNavButtons] = useState(true);

    const customizeColumns = (columns) => {
        columns[0].width = 70;
    };

    const data = []; // Define your data source
    const allowedPageSizes = [5, 10, "ALL"];
    // ************************This is for  Excel Export ***************************
    const onExporting = React.useCallback((e) => {
        if (e.format === "xlsx") {
            const workbook = new Workbook();
            const worksheet = workbook.addWorksheet("Companies");
            exportDataGrid({
                component: e.component,
                worksheet,
                autoFilterEnabled: true,
            }).then(() => {
                workbook.xlsx.writeBuffer().then((buffer) => {
                    saveAs(
                        new Blob([buffer], { type: "application/octet-stream" }),
                        "StoneCrusherReports.xlsx"
                    );
                });
            });
            e.cancel = true;
        } else if (e.format === "pdf") {
            debugger;
            const doc = new jsPDF("l");

            exportDataGridToPdf({
                jsPDFDocument: doc,

                columnWidths: [70, 15, 15, 40, 35, 30, 30, 30],

                component: e.component,
            }).then(() => {
                doc.save("StoneCrusherReports.pdf");
            });
        }
    });

    const DateWisecheckChanged = (state) => {
        setIsDateWisecheckChanged(!isDateWisecheckChanged);
        debugger;

        //refresh();

        //  setIsEnableDisable(isDateWisecheckChanged);
        if (isDateWisecheckChanged) {
            setStartDatevalue(null);
            setEndDatevalue(null);

            setIsDateRangeEnableDisable(true);
        } else {
            setStartDatevalue(null);
            setEndDatevalue(null);
            setIsDateRangeEnableDisable(false);
        }

        //setIsDisable(!allCustchecked);
    };


    const search = () => {
        debugger;
        var sd = new Date(startDatevalue);
        var ed = new Date(endDatevalue);
        var sd = sd.toLocaleDateString();
        var ed = ed.toLocaleDateString();
        debugger;

        if (isDateWisecheckChanged) {
            debugger;
            if (
                startDatevalue === undefined ||
                startDatevalue === null ||
                startDatevalue === "" ||
                startDatevalue.length === 0
            ) {
                toast.error(
                    "Start Date should not be blank, Please select Start Date"
                );

                return;
            }

            if (
                endDatevalue === undefined ||
                endDatevalue === null ||
                endDatevalue === "" ||
                endDatevalue.length === 0
            ) {
                toast.error("End Date should not be blank, Please select End Date");

                return;
            }

            if (startDatevalue.getTime() > endDatevalue.getTime()) {
                toast.error(
                    "Start Date should be equal or less than from End Date"
                );
            }
        }


    };

    // ************************This is for  Excel Export end ***************************
    return (
        <div>
            <h3>Stone Crusher Reports</h3>
            <form className={classes.form}>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12}></Grid>

                    {/* *****************************start Date Range Section ******************************** */}

                    <Grid item xs={12} sm={2}>
                        <label style={{ paddingLeft: 45 }}> Date Range</label>

                        <Radio
                            {...label}
                            checked={isDateWisecheckChanged}
                            onChange={DateWisecheckChanged}
                            color="primary"
                            size="medium"
                        />
                    </Grid>

                    <Grid item xs={12} sm={4}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Start Date"
                                disabled={isDateRangeEnableDisable}
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
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="End Date"
                                disabled={isDateRangeEnableDisable}
                                value={endDatevalue}
                                onChange={(newValue) => {
                                    setEndDatevalue(newValue);
                                }}
                                renderInput={(params) => (
                                    <TextField variant="outlined" fullWidth {...params} />
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>

                    <Grid itehsm xs={12} sm={2}></Grid>

                    <Grid item xs={12} sm={12}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => search()}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </form>

            <div class="dx-viewport">
                <div class="demo-container">
                    {/* { title: "Created Date", field: "CreatedDate" }, 
    
    
            {/* width={100} */}
                    <React.Fragment>
                        <DataGrid
                            id="gridContainer"
                            // dataSource={orders}
                            keyExpr="TrasactionId"
                            showBorders={true}
                            onExporting={onExporting}
                        >
                            <Paging defaultPageSize={10} />
                            <Pager
                                visible={true}
                                allowedPageSizes={allowedPageSizes}
                                displayMode={displayMode}
                                showPageSizeSelector={showPageSizeSelector}
                                showInfo={showInfo}
                                showNavigationButtons={showNavButtons}
                            />
                            {/* <rowType dataField="SoldToName" alignment="center" caption="Customer2"/> */}

                            {/* <Export enabled={true} formats={exportFormats} /> */}

                            <GroupPanel visible={true} />
                            <Grouping autoExpandAll={true} />

                            <Selection mode="single" />
                            {/* <Column dataField="CreatedDate" alignment="center"   caption="Date" /> */}
                            <Column
                                dataField="SoldToName"
                                alignment="left"
                                caption="Customer Name"
                            />
                            <Column
                                dataField="FinYear"
                                alignment="center"
                                caption="Years"
                            />

                            <Column
                                dataField="MonthName"
                                alignment="center"
                                caption="Month"
                            />
                            <Column
                                dataField="SalesmanCode"
                                alignment="center"
                                caption="Salesman"
                            />
                            <Column
                                dataField="TotalSalesAmt"
                                alignment="right"
                                format="$ #,##0.##"
                                // displayFormat= "0.0"
                                // precision="2"
                                caption="TotalAmt"
                            />
                            <Column
                                dataField="GrossCommRate"
                                // format="percent"

                                alignment="center"
                                caption="GCommRate"
                            />
                            <Column
                                dataField="GrossCommAmt"
                                // displayFormat= "0.0"
                                // precision="2"
                                alignment="right"
                                format="$ #,##0.##"
                                caption="GCommAmt"
                            />
                            {/* <Column dataField="SalesmanCommRate" alignment="center" caption="SCommRate"/> */}
                            <Column
                                dataField="SalesmanCommAmt"
                                // displayFormat="{0}"
                                alignment="right"
                                format="$ #,##0.##"
                                caption="SCommAmt"
                            />
                            <Column dataField="FactoryName" groupIndex={0} />

                            <Summary>
                                <GroupItem
                                    column="FactoryName"
                                    summaryType="count"
                                    displayFormat="{0}"
                                />
                                <TotalItem
                                    column="FactoryName"
                                    summaryType="count"
                                    displayFormat="Total Records : {0} "
                                    showInGroupFooter={true}
                                />
                                <GroupItem
                                    column="SoldToName"
                                    showInGroupFooter={true}
                                    //alignByColumn={true}
                                    alignment="right"
                                    displayFormat="Total for principal : "
                                />
                                <TotalItem
                                    column="SoldToName"
                                    showInGroupFooter={true}
                                    // alignByColumn={true}
                                    alignment="right"
                                    displayFormat="Total for Salesman : "
                                />
                                <GroupItem
                                    column="TotalSalesAmt"
                                    summaryType="sum"
                                    valueFormat="##0.00"
                                    displayFormat=" {0}"
                                    showInGroupFooter={true}
                                    //  valueFormat="currency"
                                    alignByColumn={true}
                                // displayFormat="{0}"
                                />
                                <TotalItem
                                    column="TotalSalesAmt"
                                    summaryType="sum"
                                    showInGroupFooter={true}
                                    //  valueFormat="currency"
                                    valueFormat="##0.00"
                                    displayFormat=" {0}"
                                    alignByColumn={true}
                                // displayFormat="{0}"
                                />
                                <GroupItem
                                    column="GrossCommAmt"
                                    summaryType="sum"
                                    showInGroupFooter={true}
                                    //  valueFormat="currency"
                                    valueFormat="##0.00"
                                    displayFormat=" {0}"
                                    alignByColumn={true}
                                // displayFormat="{0}"
                                />
                                <TotalItem
                                    column="GrossCommAmt"
                                    summaryType="sum"
                                    showInGroupFooter={true}
                                    //  valueFormat="currency"
                                    valueFormat="##0.00"
                                    displayFormat=" {0}"
                                    alignByColumn={true}
                                // displayFormat=" {0}"
                                />
                                <GroupItem
                                    column="SalesmanCommAmt"
                                    summaryType="sum"
                                    displayFormat=" {0}"
                                    showInGroupFooter={true}
                                    valueFormat="##0.00"
                                />
                                <TotalItem
                                    column="SalesmanCommAmt"
                                    summaryType="sum"
                                    displayFormat=" {0}"
                                    showInGroupFooter={true}
                                    alignByColumn={true}
                                    valueFormat="##0.00"
                                />

                                {/* <TotalItem
              column="SaleAmount"
              
              summaryType="count"
              displayFormat="Total count: {0} companies"
            /> */}
                            </Summary>
                            {/* <Summary>
            <TotalItem
              column="SaleAmount"
              summaryType="count"
              displayFormat="Total count: {0} companies"
            />
            
 <TotalItem
              column="SaleAmount"
              summaryType="sum"
              valueFormat="currency" />  
          </Summary> */}

                            <SortByGroupSummaryInfo summaryItem="count" />
                            <Export enabled={true} formats={exportFormats}></Export>

                        </DataGrid>
                    </React.Fragment>
                </div>
            </div>

        </div>
    );
};

export default SalesReport;

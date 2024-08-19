"use client";
import React, { useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  CircularProgress,
  TablePagination,
  MenuItem,
  Select,
  Menu,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput,
  ListItemText,
  Checkbox,
  TextField,
  Tooltip,
} from "@mui/material";
import { GetStudentLsit } from "@/services/api";
import QuickSearchToolbar from "@/components/SearchBar";
import { exportToCSV } from "@/components/Common";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import CustomButton from "@/components/CommonButton/CustomButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import moment from "moment";
import StudentDetails from "@/components/SchoolManagemnt/Modal/DetailsModal";
import { mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";
import Config from "@/utilities/Config";
import TransferCertificate from "@/components/SchoolManagemnt/Modal/TransferCertificate";
import DropOutModal from "@/components/SchoolManagemnt/Modal/Dropout";
import AuditLogs from "@/components/SchoolManagemnt/Modal/AuditLog";
import {
  ClassSelection,
  SectionSelection,
  StatusSelection,
} from "@/components/ClassSelection";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

const Orientation = [
  {
    value: "1",
    label: "Landscape",
  },
  {
    value: "2",
    label: "Portrait",
  },
];
const PageSize = [
  {
    value: "1",
    label: "Legal",
  },
  {
    value: "2",
    label: "A4",
  },
  {
    value: "3",
    label: "A3",
  },
];

const columnList = [
  { name: "Sl No" },
  { name: "Adm No" },
  { name: "Name" },
  { name: "Roll No" },
  { name: "Adm Type" },
  { name: "Fee Group" },
  { name: "DOB" },
  { name: "DOA" },
  { name: "Gender" },
  { name: "Emergency No" },
  { name: "Religion" },
  { name: "Nationality" },
  { name: "Email" },
  { name: "Adharcard No" },
  { name: "Permanent Add" },
  { name: "Persent Add" },
  { name: "Father Name" },
  { name: "Mother Name" },
  { name: "Father No" },
  { name: "Mother No" },
  { name: "Sibling Name" },
  { name: "Sibling class-sec" },
];

const StudentDynamicReport = () => {
  const router = useRouter();
  const names = [];

  const [searchText, setSearchText] = useState("");
  const [selectClass, setSelectClass] = useState();
  const [selectSection, setSelectSection] = useState();
  const [selectReportType, setSelectReportType] = useState();
  const [classSectionName, setClassSectionName] = useState([]);
  const [columnName, setColumnName] = useState([]);
  const [selectDateFrom, setSelectDateFrom] = useState(dayjs(new Date()));
  const [selectDateTo, setSelectDateTo] = useState(dayjs(new Date()));
  const [orientation, setOrientation] = useState("");
  const [pageSize, setPageSize] = useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setClassSectionName(typeof value === "string" ? value.split(",") : value);
  };

  const handleSelectAllClick = () => {
    if (columnName.length === columnList.length) {
      setColumnName([]);
    } else {
      setColumnName(columnList.map((item) => item.name));
    }
  };

  const handleChangeColumn = (event) => {
    const value = event.target.value;
    const allSelected = value.length === columnList.length;
    const isSelectAll = value.indexOf("all") > -1;

    if (isSelectAll) {
      handleSelectAllClick();
    } else {
      setColumnName(value);
    }
  };

  const handleChangeOrientation = (event) => {
    const {
      target: { value },
    } = event;
    setOrientation(value);
  };
  const handleChangePageSize = (event) => {
    const {
      target: { value },
    } = event;
    setPageSize(value);
  };

  Config.ClassList.forEach((classItem) => {
    Config.SectionList.forEach((sectionItem) => {
      names.push(`${classItem.value}-${sectionItem.value}`);
    });
  });
  const ITEM_HEIGHT = 180;
  const ITEM_PADDING_TOP = -30;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const {
    data: studentData,
    status: studentStatus,
    isLoading: studentLoading,
    refetch: studentRefetch,
  } = useQuery("studentData", async () => {
    const payload = {};
    (payload.page = 1),
      (payload.limit = 100),
      (payload.q = searchText),
      (payload.classNumber = selectClass),
      (payload.section = selectSection),
      (payload.status = selectReportType);
    const res = await GetStudentLsit(payload);
    console.log(res, "---sdf");
    return res?.data;
  });

  const handleSubmit = () => {
    const payload = {
      report_type: selectReportType,
      form_date: selectDateFrom,
      to_date: selectDateTo,
      selected_class_section: classSectionName,
      select_column: columnName,
    };
    console.log(payload,'--dsfewr')
  };

  const handleFilterClick = () => {
    studentRefetch();
    handleSubmit()
  };
  const handleResetClick = () => {
    setSelectClass();
    setSelectSection();
    setSelectReportType();
    setTimeout(() => {
      studentRefetch();
    }, 500);
  };

  const exportPDF = () => {
    const input = document.getElementById("my-table");
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      const pageHeight = pdf.internal.pageSize.getHeight();
      let heightLeft = pdfHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, pdfHeight);
        heightLeft -= pageHeight;
      }
      pdf.save(
        `Dynamic Report.pdf ${moment(new Date()).format("DD-MM-YYYY hh:mm:ss")}`
      );
    });
  };

  const csvHandler = async ({ page }) => {
    exportToCSV(studentData, "StudentList.csv");
  };

  const exportToExcel = () => {
    const table = document.getElementById("my-table");
    const wb = XLSX.utils.table_to_book(table, { sheet: "Sheet1" });
    XLSX.writeFile(wb, "table.xlsx");
  };

  return (
    <div className="">
      <div sx={{ marginTop: "5rem" }} className="bg-white">
        <Grid
          container
          spacing={2}
          sx={{
            py: 2,
            px: 2,
            alignItems: "center",
            // justifyContent: "space-between",
          }}
        >
          <Grid></Grid>

          <Grid item justifyContent={"center"} xs={12} sm={4} md={3}>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">
                Select Reports Type
              </InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                value={selectReportType}
                label="Select Reports Type"
                onChange={(e) => setSelectReportType(e.target.value)}
              >
                {Config.reportType.map((item, ind) => (
                  <MenuItem key={ind} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={6} md={3}>
            <DatePicker
              label="From Date"
              value={selectDateFrom}
              fullWidth
              className="w-[100%]"
              onChange={(newValue) => {
                setSelectDateFrom(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  error={false}
                />
              )}
            />
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={6} md={3}>
            <DatePicker
              label="To Date"
              value={selectDateTo}
              fullWidth
              className="w-[100%]"
              onChange={(newValue) => {
                setSelectDateTo(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  error={false}
                />
              )}
            />
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={6} md={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Select Class and Section
              </InputLabel>

              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={classSectionName}
                onChange={handleChange}
                input={<OutlinedInput label="Select Class and Section" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {names.map((name) => (
                  <MenuItem key={name} value={name}>
                    <Checkbox checked={classSectionName.indexOf(name) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={6} md={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Orientation
              </InputLabel>

              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                value={orientation}
                onChange={handleChangeOrientation}
                input={<OutlinedInput label="Orientation" />}
                MenuProps={MenuProps}
              >
                {Orientation.map((item, ind) => (
                  <MenuItem key={ind} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={6} md={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Page Size
              </InputLabel>

              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                value={pageSize}
                onChange={handleChangePageSize}
                input={<OutlinedInput label="Page Size" />}
                MenuProps={MenuProps}
              >
                {PageSize.map((item, ind) => (
                  <MenuItem key={ind} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={6} md={3}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-checkbox-label">
                Select Column
              </InputLabel>
              <Tooltip title={columnName.join(", ")}>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={columnName}
                  onChange={handleChangeColumn}
                  input={<OutlinedInput label="Select Column" />}
                  renderValue={(selected) => selected.join(", ")}
                  MenuProps={MenuProps}
                >
                  <MenuItem value="all">
                    <Checkbox
                      checked={columnName.length === columnList.length}
                      indeterminate={
                        columnName.length > 0 &&
                        columnName.length < columnList.length
                      }
                    />
                    <ListItemText primary="Select All" />
                  </MenuItem>
                  {columnList.map((name) => (
                    <MenuItem key={name?.name} value={name?.name}>
                      <Checkbox checked={columnName.indexOf(name?.name) > -1} />
                      <ListItemText primary={name?.name} />
                    </MenuItem>
                  ))}
                </Select>
              </Tooltip>
            </FormControl>
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={4} md={0.5}>
            <button onClick={handleFilterClick} className="filter-btncuston">
              <FilterAltIcon />
            </button>
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={4} md={0.5}>
            <button onClick={handleResetClick} className="filter-btncuston">
              Reset
            </button>
          </Grid>
        </Grid>
        <Grid
          container
          className="flex justify-end mb-5 mr-3"
          sx={{ mb: 2, mr: 2 }}
        >
          <Grid onClick={csvHandler} item xs={12} sm={4} md={1}>
            <button className="border-2 rounded-lg px-4 py-2.5 ">
              Export CSV
            </button>
          </Grid>
          <Grid item xs={12} sm={4} md={1}>
            <button
              onClick={exportPDF}
              className="border-2 rounded-lg px-4 py-2.5 "
            >
              Export PDF
            </button>
          </Grid>
          <Grid item xs={12} sm={4} md={1}>
            <button
              onClick={exportToExcel}
              className="border-2 rounded-lg px-4 py-2.5"
            >
              Export Excel
            </button>
          </Grid>
        </Grid>

        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table" id="my-table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  {columnName.map((item, ind) => {
                    return (
                      <StyledTableCell key={ind} align="center">
                        {item}
                      </StyledTableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                  height: "auto",
                  position: "relative",
                }}
              >
                {studentLoading ? (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <div
                        style={{
                          position: "relative",
                          height: "200px",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : studentData?.length > 0 ? (
                  <>
                    {studentData?.map((row, index) => (
                      <Row
                        key={index}
                        row={row}
                        index={index}
                        router={router}
                      />
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <div
                        style={{
                          position: "relative",
                          height: "200px",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        No Data Found
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <div className="mt-10" />
        </Paper>
      </div>{" "}
    </div>
  );
};

export default StudentDynamicReport;

const Row = (props) => {
  const { row, index } = props;

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            fontWeight: "600",
            color: "#000",
            overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.class}</Typography>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

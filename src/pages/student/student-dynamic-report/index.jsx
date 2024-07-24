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

const StudentDynamicReport = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectClass, setSelectClass] = useState();
  const [selectSection, setSelectSection] = useState();
  const [selectAdmissionNo, setSelectAdmissionNo] = useState();
  const [studentDetailsModal, setstudentDetailsModal] = useState(false);
  const [transferCertModal, settransferCertModal] = useState(false);
  const [dropOuttModal, setdropOuttModal] = useState(false);
  const [auditLOgModal, setauditLOgModal] = useState(false);
  const [selectedStudent, setSelectStudent] = useState();
  const [selectReportType, setSelectReportType] = useState();
  const names = [];
  const [classSectionName, setClassSectionName] = useState([]);
  const [selectDate, setSelectDate] = useState(dayjs(new Date()));

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setClassSectionName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
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
  const handleclose = () => {
    setstudentDetailsModal(false);
  };
  const handleOpen = (data) => {
    setstudentDetailsModal(true);
    setSelectStudent(data);
  };
  const handlecloseTc = () => {
    settransferCertModal(false);
  };
  const handleOpenTc = (data) => {
    settransferCertModal(true);
    setSelectStudent(data);
  };
  const handlecloseDropout = () => {
    setdropOuttModal(false);
  };
  const handleOpenDropout = (data) => {
    setdropOuttModal(true);
    setSelectStudent(data);
  };
  const handlecloseAuditLog = () => {
    setauditLOgModal(false);
  };
  const handleOpenAuditLog = (data) => {
    setauditLOgModal(true);
    setSelectStudent(data);
  };

  const handleFilterClick = () => {
    studentRefetch();
  };
  const handleResetClick = () => {
    setSearchText("");
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
      pdf.save("table.pdf");
    });
  };

  const csvHandler = async ({ page }) => {
    exportToCSV(studentData, "StudentList.csv");
    // setLoading(true);
    // try {
    //   const payload = {
    //     q: searchText,
    //     page,
    //     // status: filter?.status,
    //   };
    //   const res = await serviceList(payload);
    //   if (res?.code === 200) {
    //     exportToCSV(res?.data, "service_report.csv");
    //   }
    //   // setLoading(false);
    // } catch (err) {
    //   // setLoading(false);
    //   console.error("Error fetching salon data:", err);
    // }
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
              value={selectDate}
              fullWidth
              className="w-[100%]"
              onChange={(newValue) => {
                setSelectDate(newValue);
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
              value={selectDate}
              fullWidth
              className="w-[100%]"
              onChange={(newValue) => {
                setSelectDate(newValue);
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
                multiple
                value={classSectionName}
                onChange={handleChange}
                input={<OutlinedInput label="Orientation" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {Orientation.map((item,ind) => (
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
                multiple
                value={classSectionName}
                onChange={handleChange}
                input={<OutlinedInput label="Page Size" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {PageSize.map((item,ind) => (
                  <MenuItem key={ind} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
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
          {/* <Grid item xs={9} sm={4} md={1.5}>
            <CustomButton
              width={"160px"}
              onClick={() =>
                router.push({
                  pathname: "/student/student-entry",
                  query: { flag: true },
                })
              }
            >
              <AddIcon />
              Add Student
            </CustomButton>
          </Grid> */}
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
                  <StyledTableCell align="center">Id</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Admission No</StyledTableCell>
                  {/* <StyledTableCell align="center">Fee No</StyledTableCell> */}
                  {/* <StyledTableCell align="center">Parent Id</StyledTableCell> */}
                  <StyledTableCell align="center">Class-Sec</StyledTableCell>
                  <StyledTableCell align="center">Stream</StyledTableCell>
                  <StyledTableCell align="center">Roll No</StyledTableCell>
                  <StyledTableCell align="center">gender</StyledTableCell>
                  <StyledTableCell align="center">
                    emergency_number
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Date Of Birth
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">
                    Admission Date
                  </StyledTableCell>
                  <StyledTableCell align="center">Joining Date</StyledTableCell> */}
                  {/* <StyledTableCell align="center">
                    admitted_class
                  </StyledTableCell> */}
                  <StyledTableCell align="center">Action</StyledTableCell>
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
                        handleOpen={handleOpen}
                        handleOpenTc={handleOpenTc}
                        handleOpenDropout={handleOpenDropout}
                        handleOpenAuditLog={handleOpenAuditLog}
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
          {/* <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            // count={pagination?.total || 0}
            // rowsPerPage={15}
            // page={pagination?.currentPage ? pagination?.currentPage - 1 : 0}
            // onPageChange={handleChangePage}
          /> */}
        </Paper>
      </div>{" "}
      <StudentDetails
        open={studentDetailsModal}
        handleClose={handleclose}
        data={selectedStudent}
      />
      <TransferCertificate
        open={transferCertModal}
        handleClose={handlecloseTc}
        data={selectedStudent}
      />
      <DropOutModal
        open={dropOuttModal}
        handleClose={handlecloseDropout}
        data={selectedStudent}
      />
      <AuditLogs
        open={auditLOgModal}
        handleClose={handlecloseAuditLog}
        data={selectedStudent}
      />
    </div>
  );
};

export default StudentDynamicReport;

const Row = (props) => {
  const {
    row,
    salonDetails,
    setSalonDetails,
    index,
    router,
    handleOpen,
    handleOpenTc,
    handleOpenDropout,
    handleOpenAuditLog,
  } = props;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            background: open ? "#E5EFFC" : "",
            fontWeight: "600",
            color: "#000",
            overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell
          onClick={() => {
            router.push({
              pathname: "/student/student-entry",
              query: { id: row?._id },
            });
          }}
          align="center"
        >
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
        <StyledTableCell
          onClick={() => {
            router.push({
              pathname: "/student/student-entry",
              query: { id: row?._id },
            });
          }}
          align="left"
          style={{ minWidth: "200px" }}
        >
          <Typography>
            {(
              (row?.name?.first_name || "") +
              " " +
              (row?.name?.middle_name || "") +
              " " +
              (row?.name?.last_name || "")
            ).trim()}
          </Typography>
        </StyledTableCell>
        <StyledTableCell
          onClick={() => {
            router.push({
              pathname: "/student/student-entry",
              query: { id: row?._id },
            });
          }}
          align="left"
          style={{ minWidth: "150px" }}
        >
          <Typography>{row?.admission_number}</Typography>
        </StyledTableCell>
        {/* <StyledTableCell
          align="center"
          style={{
            minWidth: "150px",
            maxWidth: "200px",
            wordWrap: "break-word",
          }}
          onClick={() => {
            router.push({
              pathname: "/student/student-entry",
              query: { id: row?._id },
            });
          }}
        >
          <Typography>{row?.fee_number}</Typography>
        </StyledTableCell> */}
        {/* <StyledTableCell
          onClick={() => {
            router.push({
              pathname: "/student/student-entry",
              query: { id: row?._id },
            });
          }}
          align="center"
          style={{ minWidth: "200px" }}
        >
          <Typography>{row?.parent_id}</Typography>
        </StyledTableCell> */}
        <StyledTableCell
          onClick={() => {
            router.push({
              pathname: "/student/student-entry",
              query: { id: row?._id },
            });
          }}
          align="center"
          style={{ minWidth: "100px" }}
        >
          <Typography>
            {row?.class}
            {row?.section && "-"}
            {row?.section}
          </Typography>
        </StyledTableCell>
        {/* <StyledTableCell
          onClick={() => {
            router.push({
              pathname: "/student/student-entry",
              query: { id: row?._id },
            });
          }}
          align="center"
          style={{ minWidth: "100px" }}
        >
          <Typography>{row?.section}</Typography>
        </StyledTableCell> */}
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.stream}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.roll_number}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.gender}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.emergency_number}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>
            {moment(row?.date_of_birth).format("DD-MM-YYYY")}
          </Typography>
        </StyledTableCell>
        {/* <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>
            {moment(row?.joining_date).format("DD-MM-YYYY")}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>
            {moment(row?.admission_date).format("DD-MM-YYYY")}
          </Typography>
        </StyledTableCell> */}

        {/* <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.admitted_class}</Typography>
        </StyledTableCell> */}

        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <IconButton onClick={handleClick}>
            {/* <mdiDotsVertical /> */}
            <Icon path={mdiDotsVertical} size={1} />
          </IconButton>
          <Menu
            id="action-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem
              onClick={() => {
                router.push({
                  pathname: "/student/student-entry",
                  query: { id: row?._id },
                });
              }}
            >
              <Typography>{"Update"}</Typography>
            </MenuItem>
            <MenuItem onClick={handleOpen}>
              <Typography>{"Details"}</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleOpenTc(row)}>
              <Typography>{"TC"}</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleOpenDropout(row)}>
              <Typography>{"Drop Out"}</Typography>
            </MenuItem>
            <MenuItem onClick={() => handleOpenAuditLog(row)}>
              <Typography>{"Audit Logs"}</Typography>
            </MenuItem>
          </Menu>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

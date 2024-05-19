"use client";
import React, { useEffect, useState } from "react";
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
  InputLabel,
  TextField,
} from "@mui/material";
import {
  GetStudentLsit,
  addServices,
  adminCategory,
  serviceList,
} from "@/services/api";
import QuickSearchToolbar from "@/components/SearchBar";
import { toast } from "react-toastify";
import { exportToCSV } from "@/components/Common";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import CustomButton from "@/components/CommonButton/CustomButton";
import FormControl from "@mui/material/FormControl";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { Plus } from "mdi-material-ui";
import { useQuery } from "react-query";
import moment from "moment";
import StudentDetails from "@/components/SchoolManagemnt/Modal/DetailsModal";
import { mdiCached, mdiDotsVertical } from "@mdi/js";
import Icon from "@mdi/react";
import Config from "@/utilities/Config";
import { border } from "@mui/system";
import TransferCertificate from "@/components/SchoolManagemnt/Modal/TransferCertificate";
import DropOutModal from "@/components/SchoolManagemnt/Modal/Dropout";
import AuditLogs from "@/components/SchoolManagemnt/Modal/AuditLog";

const StudentList = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectClass, setSelectClass] = useState();
  const [selectSection, setSelectSection] = useState();
  const [selectAdmissionNo, setSelectAdmissionNo] = useState();
  const [studentDetailsModal, setstudentDetailsModal] = useState(false);
  const [transferCertModal, settransferCertModal] = useState(false);
  const [dropOuttModal, setdropOuttModal] = useState(false);
  const [auditLOgModal, setauditLOgModal] = useState(false);
  const [selectedStudent,setSelectStudent]=useState()

  const {
    data: studentData,
    status: studentStatus,
    isLoading: studentLoading,
    refetch: studentRefetch,
  } = useQuery("studentData", async () => {
    const res = await GetStudentLsit();
    console.log(res, "---sdf");
    return res?.data;
  });
  const handleclose = () => {
    setstudentDetailsModal(false);
  };
  const handleOpen = (data) => {
    setstudentDetailsModal(true);
    setSelectStudent(data)
  };
  const handlecloseTc = () => {
    settransferCertModal(false);
  };
  const handleOpenTc = (data) => {
    settransferCertModal(true);
    setSelectStudent(data)

  };
  const handlecloseDropout = () => {
    setdropOuttModal(false);
  };
  const handleOpenDropout = (data) => {
    setdropOuttModal(true);
    setSelectStudent(data)

  };
  const handlecloseAuditLog= () => {
    setauditLOgModal(false);
  };
  const handleOpenAuditLog = (data) => {
    setauditLOgModal(true);
    setSelectStudent(data)

  };

  return (
    <div className="">
      <div sx={{ marginTop: "5rem" }} className="bg-white">
        <Grid container spacing={2} sx={{ py: 2, px: 2, alignItems: "center" }}>
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <QuickSearchToolbar
              onChange={(event) => setSearchText(event.target.value)}
              isTeamMember="Search by Admission No, name, Class, Section"
              value={searchText}
              fullWidth
              rootSx={{ p: 0, pb: 0, marginLeft: 0 }}
              variant="outlined"
              // onFilterClick={handleFilterClick}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Class</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectClass}
                label="Class"
                onChange={(e) => setSelectClass(e.target.value)}
              >
                {Config.ClassList.map((item, ind) => (
                  <MenuItem key={ind} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Section</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectSection}
                label="Section"
                onChange={(e) => setSelectSection(e.target.value)}
              >
                {Config.SectionList.map((item, ind) => (
                  <MenuItem key={ind} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={2}>
            <TextField
              fullWidth
              value={selectAdmissionNo}
              onChange={(e) => setSelectAdmissionNo(e.target.value)}
              id="outlined-basic"
              label="Admission No"
              variant="outlined"
            />
          </Grid> */}
          <Grid item xs={2} sm={1} md={0.5}>
            <button
              // onClick={handleFilterClick}
              className="filter-btncuston"
            >
              <FilterAltIcon />
            </button>
          </Grid>
          <Grid item xs={2} sm={1} md={2}>
            <button
              // onClick={handleFilterClick}
              className="filter-btncuston"
            >
              <Icon path={mdiCached} size={2} />
            </button>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={1.5}>
            
          </Grid> */}
          <Grid item xs={9} sm={4} md={1.5}>
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
          </Grid>
          <Grid item xs={12} sm={4} md={1}>
            <img
              src={"/images/Export CSV.svg"}
              className="w-[103px] h-[40px] cursor-pointer mb-auto mr-5"
              // onClick={csvHandler}
            />
          </Grid>
        </Grid>

        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="center">Id</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Admission No</StyledTableCell>
                  {/* <StyledTableCell align="center">Fee No</StyledTableCell> */}
                  {/* <StyledTableCell align="center">Parent Id</StyledTableCell> */}
                  <StyledTableCell align="center">Class</StyledTableCell>
                  <StyledTableCell align="center">Section</StyledTableCell>
                  <StyledTableCell align="center">Stream</StyledTableCell>
                  <StyledTableCell align="center">Roll No</StyledTableCell>
                  <StyledTableCell align="center">gender</StyledTableCell>
                  <StyledTableCell align="center">
                    emergency_number
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Date Of Birth
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Admission Date
                  </StyledTableCell>
                  <StyledTableCell align="center">Joining Date</StyledTableCell>
                  {/* <StyledTableCell align="center">
                    admitted_class
                  </StyledTableCell> */}
                  <StyledTableCell align="center">Status</StyledTableCell>
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
          <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            // count={pagination?.total || 0}
            // rowsPerPage={15}
            // page={pagination?.currentPage ? pagination?.currentPage - 1 : 0}
            // onPageChange={handleChangePage}
          />
        </Paper>
      </div>{" "}
      <StudentDetails open={studentDetailsModal} handleClose={handleclose} data={selectedStudent} />
      <TransferCertificate open={transferCertModal} handleClose={handlecloseTc} data={selectedStudent} />
      <DropOutModal open={dropOuttModal} handleClose={handlecloseDropout} data={selectedStudent} />
      <AuditLogs open={auditLOgModal} handleClose={handlecloseAuditLog} data={selectedStudent}/>
    </div>
  );
};

export default StudentList;

const Row = (props) => {
  const { row, salonDetails, setSalonDetails, index, router, handleOpen,handleOpenTc ,handleOpenDropout,handleOpenAuditLog} =
    props;
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
          style={{ minWidth: "250px" }}
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
          <Typography>{row?.class}</Typography>
        </StyledTableCell>
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
          <Typography>{row?.section}</Typography>
        </StyledTableCell>
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
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>
            {moment(row?.joining_date).format("DD-MM-YYYY")}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>
            {moment(row?.admission_date).format("DD-MM-YYYY")}
          </Typography>
        </StyledTableCell>

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
            <MenuItem onClick={()=>handleOpenTc(row)}>
              <Typography>{"TC"}</Typography>
            </MenuItem>
            <MenuItem onClick={()=>handleOpenDropout(row)}>
              <Typography>{"Drop Out"}</Typography>
            </MenuItem>
            <MenuItem onClick={()=>handleOpenAuditLog(row)}>
              <Typography>{"Audit Logs"}</Typography>
            </MenuItem>
          </Menu>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

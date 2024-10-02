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
  Button,
  Checkbox,
  ListItemText,
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
import Config from "@/utilities/Config";
// import FollowUpModal from "./FollowUpModal";
import EnquiryMaster from "../enquiry-master";

const FollowUp = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

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
  const [followupModal, setfollowupModal] = useState(false);
  const handleclose = () => {
    setfollowupModal(false);
  };
  const handleOpen = () => {
    setfollowupModal(true);
  };
  const [selectClass, setSelectClass] = useState();
  const [selectSection, setSelectSection] = useState();
  const [selectRollNo, setSelectRollNo] = useState();
  const [priorities, setPriorities] = useState([]);

  // Function to handle changes in selection
  const handlePriorityChange = (event) => {
    const {
      target: { value },
    } = event;
    setPriorities(typeof value === "string" ? value.split(",") : value);
  };

  // useEffect to perform an action whenever priorities change
  useEffect(() => {
    if (priorities.length > 0) {
      console.log(`Priorities changed to: ${priorities.join(", ")}`);
      // You can replace the console.log with any other logic you need to execute
    }
  }, [priorities]);

  const priorityData = [
    "First Name",
    "last Name",
    "Gender",
    "Admission No.",
    "Stream",
    "Boarding Category",
  ];
  return (
    <div className="">
      <div sx={{ marginTop: "5rem" }} style={{ backgroundColor: "#fff" }}>
        <Grid
          container
          spacing={2}
          sx={{ py: 2, px: 2, alignItems: "center", justifyContent: "center" }}
        >
          <Button onClick={handleOpen}>FollowUp Enquiry</Button>
          <Grid item justifyContent={"center"} xs={12} sm={6} md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Selected Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectClass}
                label="Selected Status"
                onChange={(e) => setSelectClass(e.target.value)}
              >
                {Config.followupStatus.map((item, ind) => (
                  <MenuItem key={ind} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="center">Sl.No</StyledTableCell>
                  <StyledTableCell align="center">Enquiry No</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Class</StyledTableCell>
                  <StyledTableCell align="center">Year</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
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
      <EnquiryMaster open={followupModal} handleClose={handleclose} />
    </div>
  );
};

export default FollowUp;
const Row = (props) => {
  const { row, salonDetails, setSalonDetails, index, router,handleOpen } = props;
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
            // overflow: "scroll",
            // cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{"11234"}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "250px" }}>
          <Typography>
            {(
              (row?.name?.first_name || "Rahat") +
              " " +
              (row?.name?.middle_name || "") +
              " " +
              (row?.name?.last_name || "Tufail")
            ).trim()}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.class}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Typography>{row?.joining_year}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Typography textTransform={'capitalize'}>{row?.student_status}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "250px", gap: 2 }}>
          {row?.student_status === 'Follow-Up' && (
            <Button
            onClick={handleOpen}
              sx={{ marginRight: "10px" }}
              variant="outlined"
              color="secondary"
            >
              Follow Up
            </Button>
          )}
          <Button
            onClick={() =>
              router.push({ pathname: "/registration/student-registration", query: { id: row?._id } })
            }
            sx={{ marginRight: "10px" }}
            variant="outlined"
            color="success"
          >
            Registration
          </Button>
          <Button
            onClick={() =>
              router.push({ pathname: "/registration/student-enquiry", query: { id: row?._id } })
            }
          
            variant="outlined"
          >
            Details
          </Button>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

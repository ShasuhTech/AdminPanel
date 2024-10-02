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
  InputLabel,
  TextField,
  Button,
  Checkbox,
  ListItemText,
} from "@mui/material";
import { postAssignRollNo } from "@/services/api";
import { toast } from "react-toastify";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import StudentDetails from "@/components/SchoolManagemnt/Modal/DetailsModal";
import Config from "@/utilities/Config";

const RollNoAssign = () => {
  const router = useRouter();
  const [selectClass, setSelectClass] = useState();
  const [selectSection, setSelectSection] = useState();
  const [startingRollNo, setstartingRollNo] = useState();
  const [priorities, setPriorities] = useState([]);
  // Function to handle changes in selection
  const handlePriorityChange = (event) => {
    const {
      target: { value },
    } = event;
    setPriorities(typeof value === "string" ? value.split(",") : value);
  };

  const {
    mutate,
    data: studentData,
    error,
    isLoading: studentLoading,
  } = useMutation(postAssignRollNo);

  const handleSubmit = () => {
    if (selectClass && selectSection && priorities) {
      const payload = {
        class_number: selectClass,
        section: selectSection,
        priorityField: priorities,
        startingRollNo: startingRollNo,
      };
      mutate(payload);
    } else {
      toast.error("Please select all the fields");
    }
  };

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
        <Grid container spacing={2} sx={{ py: 2, px: 2, alignItems: "center" }}>
          <Grid item xs={12} sm={6} md={2.5}>
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
          <Grid item xs={12} sm={6} md={2.5}>
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
          <Grid item xs={12} sm={12} md={2.5}>
            <TextField
              fullWidth
              value={startingRollNo}
              onChange={(e) => setstartingRollNo(e.target.value)}
              id="outlined-basic"
              label="Starting Roll No"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={2.4}>
            <FormControl fullWidth>
              <InputLabel id="priority-multiple-select-label">
                Priorities
              </InputLabel>
              <Select
                labelId="priority-multiple-select-label"
                id="priority-multiple-select"
                multiple
                label="Priorities"
                value={priorities}
                onChange={handlePriorityChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {priorityData.map((level) => (
                  <MenuItem key={level} value={level}>
                    <Checkbox checked={priorities.indexOf(level) > -1} />
                    <ListItemText primary={` ${level}`} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={1.1}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              size="large"
              disabled={studentLoading}
            >
              {studentLoading ? "Generating" : "Generate"}
            </Button>
          </Grid>

          <Grid item xs={12} sm={12} md={1}>
            <Button variant="contained" size="large" color="error">
              Reset
            </Button>
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="center">Id</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Admission No</StyledTableCell>
                  <StyledTableCell align="center">Roll No</StyledTableCell>
                  <StyledTableCell align="center">Gender</StyledTableCell>
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

          {/* <TablePagination
            component="div"
            rowsPerPageOptions={[]}
            // count={pagination?.total || 0}
            // rowsPerPage={15}
            // page={pagination?.currentPage ? pagination?.currentPage - 1 : 0}
            // onPageChange={handleChangePage}
          /> */}
          {/* <Grid sx={{ display: "flex", justifyContent: "end", p: 3 }}>
            <Button variant="contained" size="large">
              Submit
            </Button>
          </Grid> */}
        </Paper>
      </div>{" "}
      {/* <StudentDetails open={studentDetailsModal} handleClose={handleclose} /> */}
    </div>
  );
};

export default RollNoAssign;

const Row = (props) => {
  const { row, salonDetails, setSalonDetails, index, router } = props;
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
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "250px" }}>
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
        <StyledTableCell align="center" style={{ minWidth: "250px" }}>
          <Typography>{row?.admission_number}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Typography>{row?.roll_number}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Typography>{row?.gender}</Typography>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

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
  Button,
} from "@mui/material";
import {
  GetStudentLsit,
  postAssignFeeGroup,
  postAssignsectionStream,
} from "@/services/api";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Config from "@/utilities/Config";
import { styled } from "@mui/system";
import { toast } from "react-toastify";

const StudentUpdation = () => {
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

  const [selectClass, setSelectClass] = useState();
  const [selectSection, setSelectSection] = useState();
  const [updatedSectionGroup, setUpdatedSectionGroup] = useState({});
  const [updatedStreamUpdate, setUpdatedStreamUpdate] = useState({});

  useEffect(() => {
    if (studentData) {
      const initialSectionGroup = {};
      studentData.forEach((student) => {
        initialSectionGroup[student._id] = student.section || "";
      });
      setUpdatedSectionGroup(initialSectionGroup);
      const initialStreamGroup = {};
      studentData.forEach((student) => {
        initialStreamGroup[student._id] = student.stream || "";
      });
      setUpdatedStreamUpdate(initialStreamGroup);
    }
  }, [studentData]);

  const handleSectionChange = (studentId, sectionGroup) => {
    console.log(studentId, sectionGroup, "studentId, feeGroup");
    setUpdatedSectionGroup((prev) => ({ ...prev, [studentId]: sectionGroup }));
  };
  const handleStreamChange = (studentId, streamGroup) => {
    console.log(studentId, streamGroup, "studentId, feeGroup");
    setUpdatedStreamUpdate((prev) => ({ ...prev, [studentId]: streamGroup }));
  };

  const handleSubmit = async () => {
    const payload = {};

    // Add section information to the payload
    Object.keys(updatedSectionGroup).forEach((studentId) => {
      if (!payload[studentId]) {
        payload[studentId] = {};
      }
      payload[studentId].section = updatedSectionGroup[studentId];
    });

    // Add stream information to the payload
    Object.keys(updatedStreamUpdate).forEach((studentId) => {
      if (!payload[studentId]) {
        payload[studentId] = {};
      }
      payload[studentId].stream = updatedStreamUpdate[studentId];
    });

    console.log(payload, "---hgjh");

    try {
      const res = await postAssignsectionStream(payload);
      if (res?.success) {
        toast.success("Succefully Updated...");
      }
      studentRefetch();
    } catch (error) {
      console.error("Error updating fee groups:", error);
    }
  };

  return (
    <div className="">
      <div sx={{ marginTop: "5rem" }} style={{ backgroundColor: "#fff" }}>
        <Grid container spacing={2} sx={{ py: 2, px: 2, alignItems: "center" }}>
          <Grid item xs={12} sm={6} md={3}>
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
          <Grid item xs={12} sm={6} md={2.9}>
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

          <Grid item xs={12} sm={12} md={1}>
            <Button variant="contained" size="large">
              Submit
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
                  <StyledTableCell align="center">Sl.No</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Admission No</StyledTableCell>
                  <StyledTableCell align="center">Section</StyledTableCell>
                  <StyledTableCell align="center">Stream</StyledTableCell>
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
                        handleSectionChange={handleSectionChange}
                        handleStreamChange={handleStreamChange}
                        currentSectionGroup={updatedSectionGroup[row._id] || ""}
                        currentStreamGroup={updatedStreamUpdate[row._id] || ""}
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
          {/* <Grid sx={{ display: "flex", justifyContent: "end", p: 3 }}>
            <Button variant="contained" size="large">
              Submit
            </Button>
          </Grid> */}
          <Grid className="flex justify-end py-7 p-5">
            <Button variant="contained" size="large" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Paper>
      </div>{" "}
    </div>
  );
};

export default StudentUpdation;

const Row = (props) => {
  const {
    row,
    index,
    handleSectionChange,
    handleStreamChange,
    currentSectionGroup,
    currentStreamGroup,
  } = props;

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            // background: open ? "#E5EFFC" : "",
            fontWeight: "600",
            color: "#000",
            // overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
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
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.admission_number}</Typography>
        </StyledTableCell>

        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <FormControl fullWidth>
            <InputLabel id="section-select-label">Section</InputLabel>
            <Select
              labelId="section-select-label"
              id="section-select"
              value={currentSectionGroup}
              label="Section"
              onChange={(e) => handleSectionChange(row._id, e.target.value)}
            >
              {Config.SectionList.map((item, ind) => (
                <MenuItem key={ind} value={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <FormControl fullWidth>
            <InputLabel id="stream-select-label">Stream</InputLabel>
            <Select
              labelId="stream-select-label"
              id="stream-select"
              value={currentStreamGroup}
              label="Stream"
              onChange={(e) => handleStreamChange(row._id, e.target.value)}
            >
              {Config.StreamList.map((item, ind) => (
                <MenuItem key={ind} value={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

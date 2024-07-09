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
  MenuItem,
  Select,
  InputLabel,
  Button,
} from "@mui/material";
import { GetStudentLsit, UpdateStudentFeeGroup, postAssignFeeGroup } from "@/services/api";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Config from "@/utilities/Config";

const FeeGroupAssigner = () => {
  const router = useRouter();
  const { data: studentData, status: studentStatus, isLoading: studentLoading, refetch: studentRefetch } = useQuery("studentData", async () => {
    const res = await GetStudentLsit();
    return res?.data;
  });

  const [selectClass, setSelectClass] = useState();
  const [selectSection, setSelectSection] = useState();
  const [sectionUpdate, setSectionUpdate] = useState();
  const [updatedFeeGroups, setUpdatedFeeGroups] = useState({});

  const handleFeeGroupChange = (studentId, feeGroup) => {
    setUpdatedFeeGroups(prev => ({ ...prev, [studentId]: feeGroup }));
  };

  const handleSubmit = async () => {
    const payload = Object.keys(updatedFeeGroups).map(studentId => ({
      id: studentId,
      fee_group: updatedFeeGroups[studentId],
    }));
    console.log(payload,'-ferfwref')
    try {
      await postAssignFeeGroup(payload);
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
              Filter
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={1}>
            <Button variant="contained" size="large" color="error" onClick={() => setUpdatedFeeGroups({})}>
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
                  <StyledTableCell align="center">Fee Group</StyledTableCell>
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
                        handleFeeGroupChange={handleFeeGroupChange}
                        currentFeeGroup={updatedFeeGroups[row.id] || row.fee_group}
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
          <Grid className="flex justify-end py-7 p-5">
            <Button variant="contained" size="large" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default FeeGroupAssigner;

const Row = ({ row, index, handleFeeGroupChange, currentFeeGroup }) => {
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
            <InputLabel id="fee-group-select-label">Fee Group</InputLabel>
            <Select
              labelId="fee-group-select-label"
              id="fee-group-select"
              value={currentFeeGroup}
              label="Fee Group"
              onChange={(e) => handleFeeGroupChange(row._id, e.target.value)}
            >
              {Config.FeeGroup.map((item, ind) => (
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

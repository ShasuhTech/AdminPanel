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
  Button,
} from "@mui/material";
import { getStallAllData, GetStudentLsit } from "@/services/api";
import QuickSearchToolbar from "@/components/SearchBar";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import CustomButton from "@/components/CommonButton/CustomButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Config from "@/utilities/Config";

import {
  SectionSelection,
  StatusSelection,
  ClassSelection,
} from "@/components/ClassSelection";
import moment from "moment";

const StaffListDetails = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const [selectClass, setSelectClass] = useState();
  const [selectSection, setSelectSection] = useState();
  const [selectStatus, setSelectStatus] = useState();
  const {
    data: staffData,
    isLoading: staffLoading,
    refetch: staffRefetch,
  } = useQuery("getStallAllData", async () => {
    const payload = {};
    (payload.page = 1),
      (payload.limit = 100),
      (payload.q = searchText),
      (payload.classNumber = selectClass),
      (payload.section = selectSection),
      (payload.status = selectStatus);

    const res = await getStallAllData(payload);
    return res?.data;
  });

  const handleFilterClick = () => {
    staffRefetch();
  };
  const handleResetClick = () => {
    setSearchText("");
  };

  return (
    <div className="">
      <div sx={{ marginTop: "5rem" }} style={{ backgroundColor: "#fff" }}>
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
          <Grid item xs={12} sm={6} md={3} lg={3}>
            <QuickSearchToolbar
              onChange={(event) => setSearchText(event.target.value)}
              isTeamMember="Search by Enquiry No, name, Class, Section"
              value={searchText}
              fullWidth
              rootSx={{ p: 0, pb: 0, marginLeft: 0 }}
              variant="outlined"
              // onFilterClick={handleFilterClick}
            />
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={4} md={2.5}>
            <StatusSelection
              selectStatus={selectStatus}
              setSelectStatus={setSelectStatus}
            />
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={6} md={2.5}>
            <ClassSelection
              selectClass={selectClass}
              setSelectClass={setSelectClass}
              classList={Config.ClassList}
            />
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={6} md={2.5}>
            <SectionSelection
              selectClass={selectSection}
              setSelectClass={setSelectSection}
            />
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={4} md={0.5}>
            <button onClick={handleFilterClick} className="filter-btncuston">
              <FilterAltIcon />
            </button>
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={4} md={1}>
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
          <Grid item xs={9} sm={4} md={1.9}>
            <CustomButton
              width={"200px"}
              onClick={() => router.push("/staff/add-staff")}
            >
              <AddIcon />
              Add Staff
            </CustomButton>
          </Grid>
          <Grid item xs={12} sm={4} md={1}>
            <button className="border-2 rounded-lg px-4 py-2.5 ">
              Export CSV
            </button>
          </Grid>
          <Grid item xs={12} sm={4} md={1}>
            <button className="border-2 rounded-lg px-4 py-2.5 ">
              Export PDF
            </button>
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="center">Sl.No</StyledTableCell>
                  <StyledTableCell align="center">Emp Code</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Designation</StyledTableCell>
                  <StyledTableCell align="center">Mobile</StyledTableCell>
                  <StyledTableCell align="center">
                    Date Of Appointment
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Date Of Joining
                  </StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                  height: "auto",
                  position: "relative",
                }}
              >
                {staffLoading ? (
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
                ) : staffData?.length > 0 ? (
                  <>
                    {staffData?.map((row, index) => (
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
    </div>
  );
};

export default StaffListDetails;

const Row = (props) => {
  const { row, index, router } = props;

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
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.employee_code}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "250px" }}>
          <Typography>
            {(
              (row?.first_name || "") +
              " " +
              (row?.middle_name || "") +
              " " +
              (row?.last_name || "")
            ).trim()}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.designation}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "130px" }}>
          <Typography>{row?.mobile_no || ""}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>
            {row?.appointment_date &&
              moment(row?.appointment_date).format("DD-MM-YYYY")}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>
            {row?.joining_date &&
              moment(row?.joining_date).format("DD-MM-YYYY")}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px", gap: 2 }}>
          <Button
            onClick={() =>
              router.push({
                pathname: "/staff/add-staff",
                query: { id: row?._id },
              })
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

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
  Button,
} from "@mui/material";
import { GetStudentLsit } from "@/services/api";
import QuickSearchToolbar from "@/components/SearchBar";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import moment from "moment";
import Config from "@/utilities/Config";
import {
  ClassSelection,
  SectionSelection,
  StatusSelection,
} from "@/components/ClassSelection";
import FeeCollectionDetails from "@/components/FeeManagement/FeeCollection/FeeCollectionDetails";

const FeeCollection = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [selectClass, setSelectClass] = useState();
  const [selectSection, setSelectSection] = useState();
  const [selectStatus, setSelectStatus] = useState();
  const [openDetailsModal, setOpenDetailsModal] = useState({
    item: {},
    status: false,
  });

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
      (payload.status = selectStatus);
    const res = await GetStudentLsit(payload);
    console.log(res, "---sdf");
    return res?.data;
  });

  const handleFilterClick = () => {
    studentRefetch();
  };
  const handleResetClick = () => {
    setSearchText("");
    setSelectClass();
    setSelectSection();
    setSelectStatus();
    setTimeout(() => {
      studentRefetch();
    }, 500);
  };

  const handleOpenModal = (item) => {
    setOpenDetailsModal({ item: item, status: true });
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
          <Grid item justifyContent={"center"} xs={12} sm={4} md={2}>
            <StatusSelection
              selectStatus={selectStatus}
              setSelectStatus={setSelectStatus}
            />
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={6} md={3}>
            <ClassSelection
              selectClass={selectClass}
              setSelectClass={setSelectClass}
              classList={Config.ClassList}
            />
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={6} md={2}>
            <SectionSelection
              selectClass={selectSection}
              setSelectClass={setSelectSection}
            />
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={4} md={0.7}>
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

        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table" id="my-table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="center">Id</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Admission No</StyledTableCell>
                  <StyledTableCell align="center">Class-Sec</StyledTableCell>
                  <StyledTableCell align="center">Roll No</StyledTableCell>
                  <StyledTableCell align="center">gender</StyledTableCell>
                  <StyledTableCell align="center">
                    Date Of Birth
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
                        handleOpenModal={handleOpenModal}
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
      <FeeCollectionDetails
        open={openDetailsModal?.status}
        handleClose={() => setOpenDetailsModal({ status: false })}
        data={openDetailsModal?.item}
      />
    </div>
  );
};

export default FeeCollection;

const Row = (props) => {
  const { row, index, router, handleOpenModal } = props;

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            fontWeight: "600",
            color: "#000",
          },
        }}
      >
        <StyledTableCell
          onClick={() => {
            // router.push({
            //   pathname: "/student/student-entry",
            //   query: { id: row?._id },
            // });
          }}
          align="center"
          sx={{ cursor: "pointer" }}
        >
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
        <StyledTableCell
          align="left"
          style={{ minWidth: "200px" }}
          sx={{ cursor: "pointer" }}
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
          align="left"
          style={{ minWidth: "150px" }}
          sx={{ cursor: "pointer" }}
        >
          <Typography>{row?.admission_number}</Typography>
        </StyledTableCell>

        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>
            {row?.class}
            {row?.section && "-"}
            {row?.section}
          </Typography>
        </StyledTableCell>

        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.roll_number}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.gender}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>
            {moment(row?.date_of_birth).format("DD-MM-YYYY")}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Button variant="outlined" onClick={() => handleOpenModal(row)}>
            Update
          </Button>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

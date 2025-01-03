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
  Button,
} from "@mui/material";
import {
  GetStudentLsit,

} from "@/services/api";
import QuickSearchToolbar from "@/components/SearchBar";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import CustomButton from "@/components/CommonButton/CustomButton";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Config from "@/utilities/Config";
import StudentRegistration from "./RegistrationForm";
import {
  ClassSelection,
  SectionSelection,
  StatusSelection,
} from "@/components/ClassSelection";

const StudentRegistrationDetails = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const [resetInitialValues, setresetInitialValues] = useState(false);

  const [selectStatus, setSelectStatus] = useState();
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

  const [followupEnquiryModal, setfollowupEnquiruModal] = useState(false);
  const [enquiryIdStore, setEnquiryIdStore] = useState("");
  console.log(enquiryIdStore);
  const handlecloseEnquiry = () => {
    setfollowupEnquiruModal(false);
  };
  const handleOpenEnquiry = () => {
    setfollowupEnquiruModal(true);
    setEnquiryIdStore("");
    setresetInitialValues(true);
    router.replace("/registration/student-registration");
  };
  useEffect(() => {
    if (enquiryIdStore) {
      setfollowupEnquiruModal(true);
    }
  }, [enquiryIdStore]);
  useEffect(() => {
    if (router?.query?.id) {
      setfollowupEnquiruModal(true);
    }
  }, [router]);

  const handleButtonClick = (id) => {
    setEnquiryIdStore(null); // Reset the state before setting it to a new value
    setTimeout(() => {
      setEnquiryIdStore(id);
    }, 0);
    router.push({
      pathname: "/registration/student-registration",
      query: { id: id },
    });
    setresetInitialValues(false);
  };
  const [selectClass, setSelectClass] = useState();
  const [selectSection, setSelectSection] = useState();

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
          <Grid item justifyContent={"center"} xs={12} sm={4} md={1}>
            <button onClick={handleResetClick} className="filter-btncuston">
              {/* <FilterAltIcon /> */}
              Reset
            </button>
          </Grid>
        </Grid>
        <Grid
          container
          className="flex justify-end mb-5 mr-3"
          sx={{ mb: 2, px: 2,gap:1 }}
        >
          <Grid >
            <CustomButton width={"100%"} onClick={handleOpenEnquiry}>
              <AddIcon />
              Student Registration
            </CustomButton>
          </Grid>
          <Grid >
            <button className="border-2 rounded-lg px-4 py-2.5 ">
              Export CSV
            </button>
          </Grid>
          <Grid >
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
                        handleButtonClick={handleButtonClick}
                        setEnquiryIdStore={setEnquiryIdStore}
                        setresetInitialValues={setresetInitialValues}
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
      <StudentRegistration
        open={followupEnquiryModal}
        handleClose={handlecloseEnquiry}
        data={enquiryIdStore}
        setresetInitialValues={setresetInitialValues}
        resetInitialValues={resetInitialValues}
      />
    </div>
  );
};

export default StudentRegistrationDetails;
const Row = (props) => {
  const {
    row,
    index,
    router,
    handleButtonClick,
  } = props;

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
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
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.enquiry_id}</Typography>
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
        <StyledTableCell align="center" style={{ minWidth: "50px" }}>
          <Typography>{row?.class}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.joining_year}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography textTransform={"capitalize"}>
            {row?.student_status}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "250px", gap: 2 }}>
          <Button
            onClick={() =>
              router.push({
                pathname: "/student/student-entry",
                query: { id: row?._id },
              })
            }
            sx={{ marginRight: "10px" }}
            variant="outlined"
            color="success"
          >
            Admission
          </Button>
          <Button
            onClick={() => handleButtonClick(row?._id)}
            variant="outlined"
          >
            Details
          </Button>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

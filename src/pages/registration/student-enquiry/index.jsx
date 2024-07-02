// "use client";

// import React, { useEffect, useState } from "react";
// import { Card } from "@mui/material";

// import TCDetails from "@/components/SchoolManagemnt/TransferCertificate/Details";
// import TCHistory from "@/components/SchoolManagemnt/TransferCertificate/History";
// import CustomTabs from "@/components/customeTab";
// import StudentWiseAttendance from "@/components/Attendance/StudentWiseAttendance";
// import ClassWiseAttendance from "@/components/Attendance/ClassWiseAttendance";
// import EnquiryMaster from "./enquiry-master";
// import FollowUp from "./followup";
// import { GetStudentListById } from "@/services/api";
// import { useRouter } from "next/router";

// const StudentEnquiry = () => {
//   const router = useRouter();
//   const [selectedTab, setSlectedTab] = useState(1);
//   const [studentData, setStudentData] = useState([]);
//   const id = router?.query?.id;
//   const studentDetails = async () => {
//     try {
//       if (!id) {
//         return;
//       }
//       const resp = await GetStudentListById(id);
//       console.log(resp, "resp");

//       setStudentData(resp?.data[0]);
//     } catch (error) {}
//   };
//   useEffect(() => {
//     studentDetails();
//   }, [id, router]);
//   const tabs = [
//     { id: 1, label: "ENQUIRY MASTER" },
//     { id: 2, label: "FOLLOW UP/REGISTRATION" },
//   ];
//   useEffect(() => {
//     if (router.query?.id) {
//       setSlectedTab(1);
//     }
//   }, [router]);

//   return (
//     <Card sx={{ p: 2 }}>
//       <CustomTabs
//         tabs={tabs}
//         selectedTab={selectedTab}
//         onSelectTab={setSlectedTab}
//       />

//       <>
//         {selectedTab === 1 && <EnquiryMaster setSlectedTab={setSlectedTab} />}
//         {selectedTab === 2 && <FollowUp setSlectedTab={setSlectedTab} />}
//       </>
//     </Card>
//   );
// };

// export default StudentEnquiry;

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
import EnquiryMaster from "./enquiry-master";
import FollowUpModal from "./followup/FollowUpModal";
import {
  SectionSelection,
  StatusSelection,
  ClassSelection,
} from "@/components/ClassSelection";
// import FollowUpModal from "./FollowUpModal";
// import EnquiryMaster from "../enquiry-master";

const FollowUp = () => {
  const [searchText, setSearchText] = useState("");
  const [SelectedRow, setSelectedRow] = useState();
  const router = useRouter();
  const [selectClass, setSelectClass] = useState();
  const [selectSection, setSelectSection] = useState();
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
    return res?.data;
  });

  // useEffect(() => {
  //   studentRefetch();
  // }, []);

  const handleFilterClick=()=>{
    studentRefetch();
  }
  const handleResetClick=()=>{
    setSearchText('')
    setSelectedRow()
    setSelectClass()
    setSelectSection()
    setSelectStatus()
    setTimeout(() => {
      
      studentRefetch();
    }, 500);
  }

  const [followupModal, setfollowupModal] = useState(false);
  const handleclose = () => {
    setfollowupModal(false);
  };
  const handleOpen = (data) => {
    setSelectedRow(data);
    setfollowupModal(true);
  };
  const [followupEnquiryModal, setfollowupEnquiruModal] = useState(false);
  const [enquiryIdStore, setEnquiryIdStore] = useState("");
  console.log(enquiryIdStore);
  const handlecloseEnquiry = () => {
    setfollowupEnquiruModal(false);
  };
  const handleOpenEnquiry = () => {
    setfollowupEnquiruModal(true);
    setEnquiryIdStore("");
  };
  useEffect(() => {
    if (enquiryIdStore) {
      setfollowupEnquiruModal(true);
    }
  }, [enquiryIdStore]);

  const handleButtonClick = (id) => {
    setEnquiryIdStore(null); // Reset the state before setting it to a new value
    setTimeout(() => {
      setEnquiryIdStore(id);
    }, 0);
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
              rootSx={{ p: 0, pb: 0, marginLeft: 0, }}
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
          <button
            onClick={handleFilterClick}
            className="filter-btncuston"
          >
            <FilterAltIcon />
          </button>
          </Grid>
          <Grid item justifyContent={"center"} xs={12} sm={4} md={1}>
          <button
            onClick={handleResetClick}
            className="filter-btncuston"
          >
            Reset
          </button>
          </Grid>
         
        </Grid>
          {/* <Grid item xs={12} sm={6} md={2} lg={2} className="flex justify-end mb-5" sx={{mb:2,mr:2}}>
            <Button variant="outlined" onClick={handleOpenEnquiry}>
              FollowUp Enquiry
            </Button>
          </Grid> */}
           <Grid
          container
          className="flex justify-end mb-5 mr-3"
          sx={{ mb: 2, mr: 2 }}
        >
          <Grid item xs={9} sm={4} md={1.9}>
            <CustomButton
              width={"200px"}
              onClick={handleOpenEnquiry}
            >
              <AddIcon />
              FollowUp Enquiry
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
                        handleButtonClick={handleButtonClick}
                        setEnquiryIdStore={setEnquiryIdStore}
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
          <div className="mt-10"  />

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
      <FollowUpModal
        open={followupModal}
        handleClose={handleclose}
        data={SelectedRow}
      />
      <EnquiryMaster
        open={followupEnquiryModal}
        handleClose={handlecloseEnquiry}
        data={enquiryIdStore}
      />
    </div>
  );
};

export default FollowUp;
const Row = (props) => {
  const {
    row,
    salonDetails,
    setSalonDetails,
    index,
    router,
    handleOpen,
    handleButtonClick,
    setEnquiryIdStore,
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
          {row?.student_status === "Follow-Up" && (
            <Button
              onClick={() => handleOpen(row)}
              sx={{ marginRight: "10px" }}
              variant="outlined"
              color="secondary"
            >
              Follow Up
            </Button>
          )}
          <Button
            onClick={() =>
              router.push({
                pathname: "/registration/student-registration",
                query: { id: row?._id },
              })
            }
            sx={{ marginRight: "10px" }}
            variant="outlined"
            color="success"
          >
            Registration
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
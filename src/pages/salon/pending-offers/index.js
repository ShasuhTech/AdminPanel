"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
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
  Box,
  Autocomplete,
  Pagination,
  Radio,
  TablePagination,
  InputLabel,
  MenuItem,
  Select,
  IconButton,
   Dialog ,
 DialogActions,
 DialogContent,
 DialogContentText ,
 DialogTitle 
} from "@mui/material";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import { addServices, adminCategory, serviceList,customServiceList ,updateStatusCustomService, pendingOfferList, updateStatusCustomOffers} from "@/services/api";
import QuickSearchToolbar from "@/components/SearchBar";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { Close } from "mdi-material-ui";
import axiosInstance from "@/utilities/configureAxios";
import { exportToCSV } from "@/components/Common";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import CustomButton from "@/components/CommonButton/FilterButton";
import ResetButton from "@/components/CommonButton/ResetButton";
import FormControl from "@mui/material/FormControl";
import Confirmation from "../../../components/Modal/Confirmation";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { useRouter } from "next/router";



const PendingOffersList = () => {
  const [loading, setLoading] = useState(false);
  const [userSalonData, setUserSalonData] = useState([]);
  const [errorMsg, setErrorMsg] = useState();
  const [filter, setFilter] = useState({
    search: "",
    status: 2,
  });

  const initialFilterState = {
    search: "",
    status: 2,
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState();
  const [salonNames, setSalonNames] = useState([]);
  const [selectedSalon, setSelectedSalon] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of items per page
  const [selectedValue, setSelectedValue] = useState("2");
  const [data, setCategorydata] = useState();
  const [gender, setGender] = useState(10);
  const [category, setCategory] = useState(10);
  const [selectedAction, setSelectedAction] = useState("");
  // Total number of items in your dataset
  const totalItems = pagination ? pagination.total : 0;

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  var status = [2];

  const fetchSalonNames = async (page) => {
    console.log("fetch called");
    setLoading(true);
    try {
      // const payload = {};
      // (payload.status = status),
      // (payload.page = page);
      const res = await axiosInstance.get(
        `admin/salon/list?q=${""}&status=[5]&page=${""}`
      );
      console.log(res, "salonNames", "res");
      setSalonNames(res?.data?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching salon name data:", err);
    }
  };

  

  


  const getUserData = async (page) => {
    setLoading(true);
    try {
      let payload = {
        q: searchText,
        page,
        status:3
      };
      if (selectedSalon) {
        payload = {
          ...payload,
          salonId: selectedSalon,
        };
      }
      const res = await pendingOfferList(payload);
      setPagination(res?.meta?.pagination);
      setUserSalonData(res?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching salon data:", err);
    }
  };

  const csvHandler = async ({ page }) => {
    setLoading(true);
    try {
      const payload = {
        q: searchText,
        page,
        // status: filter?.status,
      };
      const res = await serviceList(payload);
      if (res?.code === 200) {
        exportToCSV(res?.data, "service_report.csv");
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching salon data:", err);
    }
  };

  const handleChangePage = (event, page) => {
    getUserData(page + 1);
    // setCurrentPage(page);
  };
  const getAdminCatByGender = async () => {
    const payload = { genderId: selectedValue };
    try {
      setLoading(true);
      const res = await adminCategory({ payload });
      setCategorydata(res?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching salon data:", err);
    }
  };

  const getAdminCategoryByGender = async (selectedValue) => {
    const payload = { genderId: selectedValue };
    try {
      setLoading(true);
      const res = await adminCategory({ payload });
      setCategorydata(res?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching salon data:", err);
    }
  };
  // const { data, status, isLoading, refetch } = useQuery(
  //   "adminCategory",
  //   async () => {
  //     const res = await adminCategory({ payload });
  //     return res?.data;
  //   }
  // );

  const handleSalonChange = (event) => {
    setSelectedSalon(event.target.value);
  };

  useEffect(() => {
    getUserData({});
    fetchSalonNames();
  }, []);

  // useEffect(() => {
  //   getAdminCatByGender();
  // }, [selectedValue]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleFilterClick = () => {
    getUserData({ page: 1 });
  };

  const handleResetFilter = () => {
    setFilter(initialFilterState);
    setSearchText("");
    window.location.reload();
  };

  const handleGenderChange = async (e) => {
    const selectedGender = e.target.value;
    setGender(selectedGender);
    const genderId =
      selectedGender === 20 ? 1 : selectedGender === 30 ? 2 : null;
if(selectedGender === 10){
  setCategory(10);
}
    if (genderId !== null) {
      await getAdminCategoryByGender(genderId);
      setCategory(10);
    }
    else {
      console.log("genderId is null")
    }
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div className="">
      <div sx={{ marginTop: "5rem" }}>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            padding: "10px 0px",
            alignItems: "center",
            background: "#FFF",
            borderRadius: "5px",
            marginBottom: "10px",
          }}
          className="shadow-lg"
        >
          <Grid className="lg:flex px-2 justify-between  w-[100%]">
            <Grid className="lg:flex gap-3 text-center items-center">
              <QuickSearchToolbar
                onChange={(event) => setSearchText(event.target.value)}
                isTeamMember="Search by Customer name"
                // width="100%"
                value={searchText}
                rootSx={{ p: 0, pb: 0, marginLeft: 0, width: "300px" }}
                variant="outlined"
                onFilterClick={handleFilterClick}
              />
              {/* <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="salon-select-label">Select Salon</InputLabel>
                <Select
                  labelId="salon-select-label"
                  id="salon-select"
                  value={selectedSalon}
                  onChange={handleSalonChange}
                  MenuProps={{ disableScrollLock: true }} 
                >
                  <MenuItem value="" disabled>
                    Select Salon
                  </MenuItem>
                  {salonNames.map((salon) => (
                    <MenuItem key={salon.id} value={salon.id}>
                      {salon.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <button onClick={handleFilterClick} className="filter-btncuston">
                <FilterAltIcon />
              </button>
              <button onClick={handleResetFilter} className="filter-btncuston">
              <RestartAltIcon />
            </button> */}
            </Grid>
            <Grid >
              
              {/* <CustomButton onClick={csvHandler}>Export To Csv</CustomButton> */}
              <img
              src={"/images/Export CSV.svg"}
              className="w-[103px] h-[40px] cursor-pointer mt-3 mb-auto mr-5"
              onClick={csvHandler}
            />
            </Grid>
          </Grid>
        </div>
        
        {/* <Button variant="outlined" onClick={handleOpenModal}>
                Add Service
              </Button> */}
        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="center"> Request Id</StyledTableCell>
                  <StyledTableCell align="center"> Salon Id</StyledTableCell>
                  <StyledTableCell align="center">Salon Name</StyledTableCell>
                  <StyledTableCell align="center">Title</StyledTableCell>
                  <StyledTableCell align="center">Description</StyledTableCell>
                  {/* <StyledTableCell align="center">Category</StyledTableCell> */}
                  {/* <StyledTableCell align="center"  style={{ minWidth: "200px" }}>Regular Amount</StyledTableCell> */}
                  <StyledTableCell align="center"  style={{ minWidth: "200px" }}>Offer Amount</StyledTableCell>
                  <StyledTableCell align="center" style={{ minWidth: "200px" }}>Start Date</StyledTableCell>
    <StyledTableCell align="center" style={{ minWidth: "200px" }}>End Date</StyledTableCell>
                  <StyledTableCell align="center">User Limit</StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
                  {/* <StyledTableCell align="center">Action</StyledTableCell> */}
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                  height: "auto",
                  position: "relative",
                }}
              >
                {loading ? (
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
                ) : userSalonData?.length > 0 ? (
                  <>
                    {userSalonData?.map((row, index) => (
                      <Row key={index} row={row} getUserData={getUserData} />
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
            count={pagination?.total || 0}
            rowsPerPage={15}
            page={pagination?.currentPage ? pagination?.currentPage - 1 : 0}
            onPageChange={handleChangePage}
          />
          {/* <Grid className="flex items-center justify-between my-3">
            <Typography variant="h6" fontWeight={"bold"} px={2}>
              Total Count:- {pagination?.total || 0}
            </Typography>
            <Pagination
              component="div"
              count={totalPages}
              page={currentPage}
              onChange={handleChangePage}
              boundaryCount={2} // Adjust as needed
              color="primary"
              showFirstButton
              showLastButton
              siblingCount={2} // Adjust as needed
            />
          </Grid> */}
        </Paper>
      </div>{" "}
    </div>
  );
};

export default PendingOffersList;

const Row = (props) => {
  const { row, salonDetails, setSalonDetails,getUserData } = props;
  console.log(row,"row")
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const [selectedAction, setSelectedAction] = useState("1");
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openRemarksModal, setOpenRemarksModal] = useState(false);
  const [remarks, setRemarks] = useState("");

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
    if (event.target.value === "reject") {
      setOpenRemarksModal(true);
    } else {
      setOpenConfirmation(true);
    }
  };

  const handleConfirmationClose = () => {
    setOpenConfirmation(false);
    setSelectedAction("");
    setSelectedAction("1")
  };

  const handleConfirmationProceed = async () => {
    setOpenConfirmation(false);
    try {
      let payload = {
        offerId: row.id,
        salonId: row?.salonId,
        status: selectedAction === "approve" ? 1 : 2,
      };
      if (selectedAction === "reject") {
        payload = {
          ...payload,
          remarks: remarks 
        };
      }
      const res = await updateStatusCustomOffers(payload);
      if (res.success) {
        console.log("Offer status updated successfully.");
        getUserData({});
      } else {
        console.error("Failed to update offer status.");
      }
    } catch (error) {
      console.error("Error occurred while updating offer status:", error);
    }
  };

  const handleRemarksModalClose = () => {
    setOpenRemarksModal(false);
    setSelectedAction(""); 
    setRemarks("");
    setSelectedAction('1')
  };

  const handleRemarksSubmit = () => {
    setOpenRemarksModal(false);
    setOpenConfirmation(true);
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      // hour: 'numeric',
      // minute: 'numeric',
      // hour12: true
    };
    return date.toLocaleDateString('en-US', options);
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
          },
        }}
        onClick={() => {
          router.push({
            pathname: "/salon/pending-offers/pending-offers-details",
            query: {
              id: row?.id,
              status: true,
              title: `Salon >> Pending-Offers >> ${row?.title}` 
              // + row?.name,
            },
          });
        }}
      >
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.id}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.salonId}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.name}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.title}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.desc}</Typography>
        </StyledTableCell>
        {/* <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.categoryText}</Typography>
        </StyledTableCell> */}
         {/* <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.regularAmountInPaisa}</Typography>
        </StyledTableCell> */}
        
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.offerAmountInPaisa}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Typography>{formatDateTime(row?.startDate)}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Typography>{formatDateTime(row?.endDate)}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.userLimit}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.statusText}</Typography>
        </StyledTableCell>
        {/* <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <FormControl >
            <Select value={selectedAction} onChange={handleActionChange} style={{width:'140px', height:'40px',}}>
            <MenuItem value="1" disabled>Update Status</MenuItem>
              <MenuItem value="approve">Approve</MenuItem>
              <MenuItem value="reject">Reject</MenuItem>
            </Select>
          </FormControl>
        </StyledTableCell> */}
      </TableRow>
      {/* <Confirmation
        open={openConfirmation}
        handleClose={handleConfirmationClose}
        onClick={handleConfirmationProceed}
        message={`${selectedAction}`}
      /> */}
      {/* <Dialog open={openRemarksModal} onClose={handleRemarksModalClose}>
        <DialogTitle style={{fontWeight:'bold', marginBottom:'20px'}}>Enter Remarks</DialogTitle>
        <DialogContent sx={{width:'450px' }}>
          <DialogContentText sx={{marginBottom:'5px',fontWeight:'bold'}}>
            Please enter remarks for rejecting the offer:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="remarks"
            label="Remarks"
            type="text"
            fullWidth
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleRemarksModalClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleRemarksSubmit} variant= 'contained' style={{marginRight:'15px', marginLeft:'15px'}}>
            Submit
          </Button>
        </DialogActions>
      </Dialog> */}
    </React.Fragment>
  );
};

// import React from 'react'

// function index() {
//   return (
//     <div>
//       pending offer
//     </div>
//   )
// }

// export default index

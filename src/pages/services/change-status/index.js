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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import { addServices, adminCategory, serviceList,customServiceList ,updateStatusCustomService} from "@/services/api";
import QuickSearchToolbar from "@/components/SearchBar";
import { toast } from "react-toastify";
import { useQuery } from "react-query";
import { Close } from "mdi-material-ui";
import { exportToCSV } from "@/components/Common";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import CustomButton from "@/components/CommonButton/FilterButton";
import ResetButton from "@/components/CommonButton/ResetButton";
import FormControl from "@mui/material/FormControl";
import Confirmation from "../../../components/Modal/Confirmation";
import FilterAltIcon from '@mui/icons-material/FilterAlt';



const SalonService = () => {
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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of items per page
  const [selectedValue, setSelectedValue] = useState("2");
  const [data, setCategorydata] = useState();
  const [gender, setGender] = useState(10);
  const [category, setCategory] = useState(10);
  // Total number of items in your dataset
  const totalItems = pagination ? pagination.total : 0;

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  


  const getUserData = async (page) => {
    setLoading(true);
    try {
      const payload = {
        q: searchText,
        categoryId:category===10?null:category,
        genderId: gender === 10 ? null : gender === 20 ? 1 : gender === 30 ? 2 : null,
        page,
        // status: filter?.status,
      };
      const res = await customServiceList(payload);
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
  useEffect(() => {
    getUserData({});
  }, []);

  useEffect(() => {
    getAdminCatByGender();
  }, [selectedValue]);

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
              />
              <FormControl sx={{ m: 1, width:'150px' }} size="small">
                <InputLabel id="demo-select-small-label">Gender</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={gender}
                  label="Gender"
                  onChange={handleGenderChange}
                >
                  {/* <MenuItem value="">
          <em>None</em>
        </MenuItem> */}
                  <MenuItem value={10}>All</MenuItem>
                  <MenuItem value={20}>Male</MenuItem>
                  <MenuItem value={30}>Female</MenuItem>
                </Select>
              </FormControl>

              <FormControl sx={{ m: 1, width:'150px' }} size="small" disabled = {gender === 10}>
                <InputLabel id="demo-select-small-label">Category</InputLabel>
                <Select
                  labelId="demo-select-small-label"
                  id="demo-select-small"
                  value={category}
                  label="Category"
                  onChange={handleCategoryChange}
                >
                  <MenuItem value={10}>All</MenuItem>
                  {data &&
                    data.map((category) => (
                      <MenuItem key={category?.value} value={category?.value}>
          {category?.key}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
              {/* <IconButton onClick={handleFilterClick}>
                <SearchIcon />
              </IconButton> */}
              {/* <CustomButton onClick={handleFilterClick}>Filter</CustomButton> */}
              <button onClick={handleFilterClick} className="filter-btncuston">
              <FilterAltIcon />
            </button>
              {/* <ResetButton onClick={handleResetFilter} /> */}
            </Grid>
            <Grid className="gap-2 lg:flex  items-center text-center">
              
              {/* <CustomButton onClick={csvHandler}>Export To Csvvvv</CustomButton> */}
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
                  <StyledTableCell align="left">Id</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Category</StyledTableCell>
                  <StyledTableCell align="left">Regular Price</StyledTableCell>
                  <StyledTableCell align="left">Offer Price</StyledTableCell>
                  <StyledTableCell align="left">Gender</StyledTableCell>
                  <StyledTableCell align="center">Min Time</StyledTableCell>
                  <StyledTableCell align="center">Max Time</StyledTableCell>
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

export default SalonService;

const Row = (props) => {
  const { row, salonDetails, setSalonDetails,getUserData } = props;
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("1");
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [openRemarksModal, setOpenRemarksModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [remarksError, setRemarksError] = useState(""); 

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
    if(event.target.value === 'reject'){
      setOpenRemarksModal(true)
    }else{
      setOpenConfirmation(true); 
    }
    
  };

  const handleConfirmationClose = () => {
    setOpenConfirmation(false);
    setSelectedAction("");
    setSelectedAction("1")
  };

  const handleConfirmationProceed = async() => {
   
    setOpenConfirmation(false);
    try {
     
      let payload = {
        salonServiceId: row.id, 
        salonId: row?.salon?.id, 
        status: selectedAction === "approve" ? 1 : 4,
      };
      if(selectedAction === 'reject'){
        payload = {
          ...payload,
          rejectReason: remarks 
        };
      }
      const res = await updateStatusCustomService(payload);
      console.log(res, "res")
      if (res.success) {
        console.log("Service status updated successfully.");
        toast.success("Service status updated successfully.");
        // handleCloseConfirm();
        // handleClose();
        getUserData({})
      } else {
        console.error("Failed to update service status.");
        toast.success("Failed to update service status.");
      }
    } catch (error) {
      toast.success("Error occurred while updating service status:", error);
      console.error("Error occurred while updating service status:", error);
    }
  };

 
  const handleRemarksChange = (e) => {
    const { value } = e.target;
    setRemarks(value);
    // Check for errors and update the error state
    if (value.trim() === "") {
      setRemarksError("Remarks cannot be empty");
    } else {
      setRemarksError("");
    }
  };

  const handleRemarksModalClose = () => {
    setOpenRemarksModal(false);
    setSelectedAction("1"); 
    setRemarks("");
  };

  const handleRemarksSubmit = () => {
    // Check if remarks are empty
    if (remarks.trim() === "") {
      setRemarksError("Remarks cannot be empty");
    } else {
      setRemarksError("");
      // Proceed with submission logic
      setOpenRemarksModal(false);
      setOpenConfirmation(true);
    }
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
      >
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.id}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.title}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.categoryText}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.regularPrice}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.offerPrice}</Typography>
        </StyledTableCell>
        
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.genderText}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.minTime}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row?.maxTime}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.statusText}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <FormControl>
            <Select
              value={selectedAction}
              onChange={handleActionChange}
              style={{width:'140px', height:'40px',}}
            >
               <MenuItem value="1" disabled>Update Status</MenuItem>
              <MenuItem value="approve">Approve</MenuItem>
              <MenuItem value="reject">Reject</MenuItem>
            </Select>
          </FormControl>
        </StyledTableCell>
      </TableRow>
      <Confirmation
        open={openConfirmation}
        handleClose={handleConfirmationClose}
        onClick={handleConfirmationProceed}
        message={` ${selectedAction}`}
        message2={row?.title}
      />
      <Dialog open={openRemarksModal} onClose={handleRemarksModalClose} sx={{borderRadius:'20px'}}>
        <DialogTitle style={{fontWeight:'bold', marginBottom:'20px'}}>Enter Remarks</DialogTitle>
        <DialogContent sx={{width:'450px' }}>
          <DialogContentText sx={{marginBottom:'5px',fontWeight:'bold'}}>
            Please enter remarks for rejecting the Salon:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="remarks"
            label="Remarks"
            type="text"
            fullWidth
            value={remarks}
            // onChange={(e) => setRemarks(e.target.value)}
            onChange={handleRemarksChange} 
            error={!!remarksError} 
            helperText={remarksError}
          />
        </DialogContent>
        <DialogActions >
          <Button onClick={handleRemarksModalClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleRemarksSubmit} variant="contained" style={{marginRight:'15px', marginLeft:'15px'}}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};


import React, { useState } from "react";
import {
  Paper,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  styled,
  tableCellClasses,
  TablePagination,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  CircularProgress,
 
} from "@mui/material";
import { useEffect } from "react";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { useRouter } from "next/router";
import {  adminCategory } from "@/services/api";
import { salonListByid,customServiceList } from "@/services/api";
import { Grid } from "mdi-material-ui";
import QuickSearchToolbar from "@/components/SearchBar";
import CustomButton from "@/components/CommonButton/FilterButton";
import Confirmation from "@/components/Modal/Confirmation";
 
 
 
 
const Services = ({  }) => {
 
  const [data, setSalonData] = useState({});
  const [userSalonData, setUserSalonData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [servicesData, setServicesData] = useState([]);
  const [pagination, setPagination] = useState();
  const [gender, setGender] = useState(10);
  const [selectedValue, setSelectedValue] = useState("2");
const [data1, setCategorydata] = useState();
const [category, setCategory] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [filter, setFilter] = useState({
    search: "",
    status: 2,
  });
  const initialFilterState = {
    search: "",
    status: 2,
  };
 
 
  // const itemsPerPage = 2; // Number of items per page
  const totalItems = servicesData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
 
  // Total number of items in your dataset
  // const totalItems = pagination ? pagination.total : 0;
 
  // Calculate the total number of pages
  // const totalPages = Math.ceil(totalItems / itemsPerPage);
 
  const id = router?.query?.id;
  const call = async () => {
    if (!id) {
      return;
    }
    const payload = {
      id,
      include: "services",
      q: searchText,
      categoryId:category===10?null:category,
      genderId: gender === 10 ? null : gender === 20 ? 1 : gender === 30 ? 2 : null,
 
    };
    try {
      setLoader(true);
      const resp = await salonListByid(payload);
      setPagination(resp?.data?.meta?.pagination);
      setLoader(false);
      setServicesData(resp?.data?.services);
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };
 
  const getUserData = async (page) => {
    setLoading(true);
    try {
      const payload = {
        page        // status: filter?.status,
      };
      const res = await customServiceList(payload);
      console.log(res, id,"puneet singh")
      setPagination(res?.meta?.pagination);
      const filteredData = res?.data.filter(item => item.salonId == id);
      setUserSalonData(filteredData);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching salon data:", err);
    }
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
 
 
  useEffect(() => {
    if (Object.keys(data).length === 0 && data?.constructor === Object) {
      call();
    }
  }, [router]);
 
  useEffect(() => {
    getUserData({});
  }, []);
 
  console.log("userSalonData",userSalonData)
 
 
  // const handleChangePage = (e, page) => {
  //  call()
  // };
 
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };
 
  // useEffect(() => {
  //   setServicesData(data?.services);
  // }, [data]);
 
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
 
 
  const handleFilterClick = () => {
    call({ page: 1 });
  };
 
  useEffect(() => {
    getAdminCatByGender();
  }, [selectedValue]);
 
 
  const renderData = () => {
    const startIndex = currentPage * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
    return servicesData.slice(startIndex, endIndex);
  };
 
  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setItemsPerPage(newRowsPerPage);
    setCurrentPage(0); // Reset to the first page when rows per page changes
  };
 
 
 
  return (
    <>
    {console.log(userSalonData,"vineet singh")}
    {userSalonData.length> 0 && (
      <>
    <Typography variant="h5" fontWeight={500} ml={4} mt={2} mb={2}>
          Pending Approvals
        </Typography>
 
        <div className="">
      <div sx={{ marginTop: "5rem" }}>
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
                      <PendingRow key={index} row={row} getUserData={getUserData} />
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
    </>
    )}
 
    <Typography variant="h5" fontWeight={500} ml={4} mt={2} mb={2}>
          Service Availed
        </Typography>
        <hr></hr>
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
 
   
      <QuickSearchToolbar
        onChange={(event) => setSearchText(event.target.value)}
        isTeamMember="Search by Customer name"
        // width="100%"
        value={searchText}
        rootSx={{ p: 0, pb: 0, marginLeft: 5, width: "300px" }}
        variant="outlined"
      />
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
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
 
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small"disabled={gender === 10} >
        <InputLabel id="demo-select-small-label">Category</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={category}
          label="Category"
          onChange={handleCategoryChange}
        >
          <MenuItem value={10}>All</MenuItem>
          {data1 &&
      data1.map((category) => (
        <MenuItem key={category?.value} value={category?.value}>
          {category?.key}
        </MenuItem>
      ))}
        </Select>
      </FormControl>
      {/* <IconButton onClick={handleFilterClick}>
        <SearchIcon />
      </IconButton> */}
      <CustomButton onClick={handleFilterClick}>Filter</CustomButton>
      {/* <ResetButton onClick={handleResetFilter} /> */}
   
 
  </div>
   
    <div>
      <Paper sx={{ width: "100%", overflow: "scroll" , marginTop:'25px'}}>
        <TableContainer>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow sx={{backgroundColor:'#F3F6F9'}}>
                <StyledTableCell align="left">ID</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Description</StyledTableCell>
                <StyledTableCell align="center">Category</StyledTableCell>
                <StyledTableCell align="center">Type</StyledTableCell>
                <StyledTableCell align="center">Regular price</StyledTableCell>
                <StyledTableCell align="center">Disc %</StyledTableCell>
                <StyledTableCell align="center">Offer Price</StyledTableCell>
                <StyledTableCell align="center">Min Time</StyledTableCell>
                <StyledTableCell align="center">Max Time</StyledTableCell>
                {/* <StyledTableCell align="center">Image</StyledTableCell> */}
                <StyledTableCell align="center">Status</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody
              style={{
                height: "auto",
                position: "relative",
              }}
            >
              {servicesData?.length > 0 ? (
                <>
                  {renderData().map((row) => (
                  <Row key={row.id} row={row} />
                  ))}
                </>
              ) : (
                <TableRow>
                <StyledTableCell colSpan={12}>
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
                </StyledTableCell>
              </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
             component="div"
             rowsPerPageOptions={[]}
             count={totalPages}
             rowsPerPage={itemsPerPage}
             page={currentPage}
             onPageChange={handleChangePage}
             onChangeRowsPerPage={handleChangeRowsPerPage}
             
          />
      </Paper>
    </div>
    </div>{" "}
    </div>
   
    </>
 
  );
};
 
export default Services;
 
const Row = (props) => {
  const { row, router } = props;
 
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <StyledTableCell align="left" sx={{ cursor: "pointer" }}>
          {row.id}
        </StyledTableCell>
        <StyledTableCell align="left">{row?.service?.name}</StyledTableCell>
        <StyledTableCell align="left">{row?.desc}</StyledTableCell>
        <StyledTableCell align="center">
          {row?.service?.categoryText}
        </StyledTableCell>
        <StyledTableCell align="center">
          {row.serviceId ? "System" : "Custom"}
        </StyledTableCell>
        <StyledTableCell align="center">{row?.regularPrice}</StyledTableCell>
        <StyledTableCell align="center">{row?.disountPer}</StyledTableCell>
        <StyledTableCell align="center">{row?.offerPrice}</StyledTableCell>
        <StyledTableCell align="center">{row?.minTime}</StyledTableCell>
        <StyledTableCell align="center">{row?.maxTime}</StyledTableCell>
        {/* <StyledTableCell align="left">
          {row?.service?.slug && (
            <img
              src={row?.service?.slug}
              className="w-[60px] h-[60px] object-fill rounded-full"
            />
          )}
        </StyledTableCell> */}
        <StyledTableCell align="center">{row?.status}</StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
 
};
 
const PendingRow = (props) => {
  const { row, salonDetails, setSalonDetails,getUserData } = props;
  const [open, setOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState("");
  const [openConfirmation, setOpenConfirmation] = useState(false);
 
  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
    setOpenConfirmation(true);
  };
 
  const handleConfirmationClose = () => {
    setOpenConfirmation(false);
    setSelectedAction("");
  };
 
  const handleConfirmationProceed = async() => {
   
    setOpenConfirmation(false);
    try {
     
      const payload = {
        salonServiceId: row.id,
        salonId: row?.salon?.id,
        status: selectedAction === "approve" ? 1 : 4,
      };
      const res = await updateStatusCustomService(payload);
      console.log(res, "res")
      if (res.success) {
        console.log("Service status updated successfully.");
        getUserData({})
      } else {
        console.error("Failed to update service status.");
      }
    } catch (error) {
      console.error("Error occurred while updating service status:", error);
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
            >
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
      />
    </React.Fragment>
  );
};
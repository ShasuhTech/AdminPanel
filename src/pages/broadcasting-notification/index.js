"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Paper,
  Grid,
  TableContainer,
  TableRow,
  TableHead,
  TableBody,
  Table,
  CircularProgress,
  Box,
  debounce,
  Pagination,
  TablePagination,
} from "@mui/material";
import { useSelector } from "react-redux";
import axiosInstance from "@/utilities/configureAxios";
import { useRouter } from "next/router";
import QuickSearchToolbar from "@/components/SearchBar";
import { exportToCSV } from "@/components/Common";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import BroadcastingNotificationModal from './broadcasting-modal'; 
import FilterButton from "@/components/CommonButton/FilterButton";
import ResetButton from "@/components/CommonButton/ResetButton";
import CustomButton from "@/components/CommonButton/FilterButton";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const BroadcastingNotification = () => {
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [userSalonData, setUserSalonData] = useState([]);
  const [pagination, setPagination] = useState();
  const [filter, setFilter] = useState({
    search: "",
    status: 2,
  });
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  const handleBroadcastNotification = () => {
    toggleModal(); // Open the modal
  };


  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of items per page

  // Total number of items in your dataset
  const totalItems = pagination ? pagination.total : 0;

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  var status = [2];

  const getUserData = async (page) => {
    setLoading(true);
    try {
      const payload = {};
      (payload.q = searchText),
        // (payload.status = status),
        (payload.page = page);
      const res = await axiosInstance.get(
        `admin/notifications/broadcastNotificationList?q=${searchText || ""}&page=${page || ""}`
      );
      setPagination(res?.data?.meta?.pagination);
      setUserSalonData(res?.data?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching salon data:", err);
    }
  };
  const csvHandler = async (page) => {
    setLoading(true);
    try {
      const payload = {};
      (payload.q = searchText),
        (payload.status = status),
        (payload.page = page);
      const res = await axiosInstance.get(
        `admin/salon/list?q=${searchText || ""}&status=[5]&page=${page || ""}`
      );
      setPagination(res?.data?.meta?.pagination);
      setUserSalonData(res?.data?.data);
      setLoading(false);
      if (res?.data?.code === 200) {
        exportToCSV(res?.data?.data, "user_report.csv");
      }
    } catch (err) {
      setLoading(false);
      console.error("Error fetching salon data:", err);
    }
  };

  useEffect(() => {
    getUserData(1);
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleFilterClick = () => {
    getUserData();
  };

  const handleResetFilter = () => {
    setSearchText("");
    getUserData();
    // window.location.reload();
  };

  const handleChangePage = (e, page) => {
    getUserData(page + 1);
    // setCurrentPage(page);
  };

  // const handleSearch = debounce((searchValue) => {
  //   setSearchText(searchValue);
  //   if (searchValue?.length > 0) {
  //     getUserData(1, searchValue);
  //   } else {
  //     getUserData(1, "");
  //   }
  // }, 400);

  return (
    <Box>
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
        <Grid className="flex px-2 justify-between  w-[100%]">
          <Grid className="flex gap-3 text-center items-center">
            <QuickSearchToolbar
              onChange={(event) => setSearchText(event.target.value)}
              title="Search by Name & Id"
              // width="100%"
              value={searchText}
              rootSx={{ p: 0, pb: 0, marginLeft: 0, width: "300px" }}
              variant="outlined"
              onFilterClick={handleFilterClick}
            />
            {/* <button onClick={handleFilterClick} className="filter-btncuston">
              <FilterAltIcon />
            </button> */}
            {/* <CustomButton onClick={handleFilterClick}>Filter</CustomButton> */}
            {/* <ResetButton onClick={handleResetFilter} /> */}
            {/* <button onClick={handleResetFilter} className="filter-btncuston">
              <RestartAltIcon />
            </button> */}
          </Grid>
          <Grid>
            {/* <CustomButton onClick={csvHandler}>Export To Csv</CustomButton> */}
            <img
              src={"/images/Export CSV.svg"}
              className="w-[103px] h-[40px] cursor-pointer mt-1 mb-auto mr-5"
              onClick={csvHandler}
            />
          </Grid>
        </Grid>
        <div className="text-end w-full">
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "black", color: "white" }}
          onClick={handleBroadcastNotification}
        >
          Broadcast Notification
        </Button>
        {isModalOpen && (
        <BroadcastingNotificationModal
          onClose={toggleModal} 
        />
      )}
        </div>
      </div>
      <div className="">
        <Paper
          sx={{
            width: "100%",
            overflow: "scroll",
            boxShadow: 10,
            borderRadius: "10px",
          }}
        >
          <TableContainer>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="left">Id</StyledTableCell>
                  <StyledTableCell align="left">Title</StyledTableCell>
                  <StyledTableCell align="left">
                    Description
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">
                    Landline Number
                  </StyledTableCell> */}
                  {/* <StyledTableCell align="left">
                   Image
                  </StyledTableCell>
                  <StyledTableCell align="left">Action Link</StyledTableCell> */}
                  <StyledTableCell align="left">Type</StyledTableCell>
                  <StyledTableCell align="left">User Type</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
                  <StyledTableCell align="left">Created At</StyledTableCell>
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
                        <CircularProgress />
                      </div>
                    </StyledTableCell>
                  </TableRow>
                ) : userSalonData.length > 0 ? (
                  <>
                    {userSalonData.map((row, index) => (
                      <Row key={index} row={row} />
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
            count={pagination?.total || 0}
            rowsPerPage={15}
            page={pagination?.currentPage ? pagination?.currentPage - 1 : 0}
            onPageChange={handleChangePage}
          />
          {/* <Grid className="flex items-center justify-between my-3">
            <Typography variant="h6" fontWeight={'bold'} px={2}>Total Count:- {pagination?.total || 0}</Typography>
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
      </div>
    </Box>
  );
};

export default BroadcastingNotification;

const Row = (props) => {
  const { row, salonDetails, setSalonDetails } = props;
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleRowClick = () => { };

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
            cursor: "pointer",
          },
        }}
        onClick={() => {
          router.push({
            pathname: "/salon/Details",
            query: {
              id: row?.id,
              status: true,
              // title: row?.name +" >> Salon Details",
              title: " Salon >> Active >>" + row?.name,
            },
          });
        }}
      >
        <StyledTableCell
          align="left"
          style={{ minWidth: "100px", cursor: "pointer" }}
        >
          <Typography>{row?.id}</Typography>
        </StyledTableCell>
        <StyledTableCell
          // onClick={() => {
          //   router.push({
          //     pathname: "/salon/Details",
          //     query: {
          //       id: row?.id,
          //       status: true,
          //       title: "Salon Details",
          //     },
          //   });
          // }}
          style={{ minWidth: "200px", cursor: "pointer" }}
          align="left"
          sx={{ textTransform: "capitalize" }}
        >
          <Typography>{row?.body?.title}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "200px" }}>
          <Typography>{row?.body?.description}</Typography>
        </StyledTableCell>
        {/* <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row.landlineNumber}</Typography>
        </StyledTableCell> */}
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.type}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.user_type}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.status}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{formatDateTime(row?.createdAt)}
            </Typography>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

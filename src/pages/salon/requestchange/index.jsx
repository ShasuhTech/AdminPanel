"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  FormControl,
  Button,
  InputAdornment,
  InputLabel,
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
  IconButton,
  TablePagination,
  CircularProgress,
  Collapse,
  Select,
  MenuItem,
  styled,
  tableCellClasses,
  Box,
  debounce,
  CardHeader,
  Pagination,
} from "@mui/material";
import {
  ChevronDown,
  ChevronUp,
  EyeOffOutline,
  PencilOutline,
  Star,
  SwapVertical,
} from "mdi-material-ui";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import axios from "axios";
import MiniDrawer from "@/components/VerticalSidebar";
import { useSelector } from "react-redux";
import { getSalonRequestChange, salonList } from "@/services/api";
import { eraseCookie } from "@/utilities/cookies";
import axiosInstance from "@/utilities/configureAxios";
import { useRouter } from "next/router";
import QuickSearchToolbar from "@/components/SearchBar";
import FilterButton from "@/components/CommonButton/FilterButton";
import ResetButton from "@/components/CommonButton/ResetButton";
import { exportToCSV } from "@/components/Common";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { useQuery } from "react-query";
import moment from "moment";
import AprovalModal from "./ApprovalModal";
import CustomButton from "@/components/CommonButton/FilterButton";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

const RequestChange = () => {
  const [loading, setLoading] = useState(false);
  const [userSalonData, setUserSalonData] = useState([]);
  const [pagination, setPagination] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const handleClose = () => {
    setOpenModal(false);
  };
  const [filter, setFilter] = useState({
    search: "",
    status: 2,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of items per page

  // Total number of items in your dataset
  const totalItems = pagination ? pagination.total : 0;

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const token = useSelector((state) => state.auth.token);
  console.log("dsadsadasdsa", token);
  // const loading = useSelector(state => state.auth.loading);

  const initialFilterState = {
    search: "",
    status: 2,
  };
  const [searchText, setSearchText] = useState("");

  var status = [2];

  const getUserData = async (page) => {
    setLoading(true);
    try {
      const payload = {};
      (payload.q = searchText),
        (payload.page = page);
        const res = await axiosInstance.get(
          `admin/salon/getSalonRequestChange?q=${searchText || ""}&page=${page || ""}`
        );
        console.log("puneetsingh",res)
      // const res = await getSalonRequestChange();
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
      const res = await getSalonRequestChange();
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

  const updateDocumentList = async () => {
    await getUserData(currentPage); 
  };

 

  useEffect(() => {
    getUserData();
  }, []);

  //   const { data, status, isLoading, refetch } = useQuery('getSalonRequestChange', async () => {
  //     const res = await getSalonRequestChange()
  //     return res.data
  // })

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleFilterClick = () => {
    getUserData();
  };

  const handleResetFilter = () => {
    setSearchText("");
    window.location.reload();

  };

  const handleChangePage = (e, page) => {
    getUserData(page+1);
    // setCurrentPage(page);
  };

  const handleSearch = debounce((searchValue) => {
    setSearchText(searchValue);
    if (searchValue?.length > 0) {
      getUserData(1, searchValue);
    } else {
      getUserData(1, "");
    }
  }, 400);

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
            </button>
            <button onClick={handleResetFilter} className="filter-btncuston">
              <RestartAltIcon />
            </button> */}
          </Grid>
          <Grid>
          <img
              src={"/images/Export CSV.svg"}
              className="w-[103px] h-[40px] cursor-pointer mt-1 mb-auto mr-5"
              onClick={csvHandler}
            />
          </Grid>
        </Grid>
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
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="center">Type</StyledTableCell>
                  {/* <StyledTableCell align="center">Current Details</StyledTableCell>
                  <StyledTableCell align="center">
                    Requested Details
                  </StyledTableCell> */}
                  <StyledTableCell align="center">
                    Requested Date
                  </StyledTableCell>
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
                      <Row
                        key={index}
                        row={row}
                        setSelectedRow={setSelectedRow}
                        setOpenModal={setOpenModal}
                      />
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
      {openModal && (
        <AprovalModal
          open={openModal}
          handleClose={handleClose}
          data={selectedRow}
          // getUserData={getUserData}
          updateDocumentList={updateDocumentList}
        />
      )}
    </Box>
  );
};

export default RequestChange;

const Row = (props) => {
  const { row, salonDetails, setSalonDetails, setSelectedRow, setOpenModal } =
    props;
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const handleRowClick = () => {};

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
        <StyledTableCell
          style={{ minWidth: "100px" }}
          align="left"
          sx={{ textTransform: "capitalize" }}
        >
          <Typography>{row?.salon?.id}</Typography>
        </StyledTableCell>
        <StyledTableCell
          style={{ minWidth: "200px" }}
          align="left"
          sx={{ textTransform: "capitalize" }}
        >
          <Typography>{row?.salon?.name}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.typeText}</Typography>
        </StyledTableCell>
        {/* {
          <StyledTableCell align="center" style={{ minWidth: "150px" }}>
            <Typography>
              {row?.typeText === "name"
                ? row?.salon?.name
                : row?.typeText === "imageVideo"
                ? row?.salon?.meta?.image?.key
                : row?.salon?.address?.address+','+row?.salon?.address?.pincode}
            </Typography>
          </StyledTableCell>
        }
        {
          <StyledTableCell align="center" style={{ minWidth: "150px" }}>
            <Typography>
              {row?.typeText === "name"
                ? row?.changeRequested?.newName
                : row?.typeText === "imageVideo"
                ? row?.changeRequested?.image?.key
                : row?.changeRequested?.newAddress?.address +
                  "," +
                  row?.changeRequested?.newAddress?.pincode}
            </Typography>
          </StyledTableCell>
        } */}
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>
            {moment(row?.requestDate).format("DD-MM-YYYY")}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.statusText}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Button
            onClick={() => {
              setSelectedRow(row);
              setOpenModal(true);
            }}
          >
            View
          </Button>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

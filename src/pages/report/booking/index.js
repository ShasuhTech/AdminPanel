"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
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
  tableCellClasses,
  styled,
  Pagination,
  TablePagination,
  TextField,
} from "@mui/material";
import { getTopSalonOrderDetails, serviceList } from "@/services/api";
import QuickSearchToolbar from "@/components/SearchBar";
import { exportToCSV } from "@/components/Common";
import CustomButton from "@/components/CommonButton/FilterButton";
import ResetButton from "@/components/CommonButton/ResetButton";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    textTransform: "capitalize",
    fontWeight: 500,
    fontSize: 13,
    lineHeight: "24px",
    borderBottom: "1px solid #D7D7D7",
    minWidth: 100,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    lineHeight: "21px",
    color: theme.palette.common.black,
    minWidth: 100,
    fontWeight: 400,
    borderBottom: "1px solid #D7D7D7",
  },
}));

const ReportDetails = () => {
  const [loading, setLoading] = useState(false);
  const [userSalonData, setUserSalonData] = useState([]);
  const currentDate = new Date();
  const currentMonthStart = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const [filter, setFilter] = useState({
    search: "",
    status: 2,
  });

  const initialFilterState = {
    search: "",
    status: 2,
  };
  const [searchText, setSearchText] = useState("");
  const [pagination, setPagination] = useState();
  const [fromDate, setFromDate] = useState(
    dayjs(dayjs().startOf("month").toDate())
  ); // Initialize with current date
  const [toDate, setToDate] = useState(dayjs(new Date().toDateString()));
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const itemsPerPage = 15; // Number of items per page

  // Total number of items in your dataset
  const totalItems = pagination ? pagination.total : 0;

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getUserData = async ({ page }) => {
    setLoading(true);
    try {
      const payload = {
        q: searchText,
        page,
        // status: filter?.status,
      };
      const res = await getTopSalonOrderDetails({...payload,
        startDate: fromDate,
        endDate: toDate,
      });
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

  useEffect(() => {
    const from = router.query.from;
    const to = router.query.to;
    console.log(from, to, "fromTOuse");
    if (from) setFromDate(dayjs(from));
    if (to) setToDate(dayjs(to));
  }, [router.query]);

  useEffect(() => {
    getUserData({});
  }, [fromDate, toDate]);

  console.log(fromDate, toDate, "fromto");

  const handleFilterClick = () => {
    getUserData({ page: 1 });
  };

  const handleResetFilter = () => {
    setFilter(initialFilterState);
    setSearchText("");
    getUserData({ page: 1 });
    window.location.reload();
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
          <Grid className="flex px-2 justify-between  w-[100%]">
            <Grid className="flex gap-3 text-center items-center">
              <QuickSearchToolbar
                onChange={(event) => setSearchText(event.target.value)}
                isTeamMember="Search by Customer name"
                // width="100%"
                value={searchText}
                rootSx={{ p: 0, pb: 0, marginLeft: 0, width: "300px" }}
                variant="outlined"
                onFilterClick={handleFilterClick}
              />
              {/* <CustomButton onClick={handleFilterClick}>Filter</CustomButton>
              <ResetButton onClick={handleResetFilter} /> */}
              <button onClick={handleFilterClick} className="filter-btncuston">
                <FilterAltIcon />
              </button>
              <button onClick={handleResetFilter} className="filter-btncuston">
                <RestartAltIcon />
              </button>
            </Grid>
            <Grid
              container
              spacing={2}
              style={{ padding: "5px", paddingLeft: "30px" }}
            >
              <Grid item>
                <DatePicker
                  label="From Date"
                  format="DD-MM-YYYY"
                  value={fromDate}
                  sx={{ width: "150px" }}
                  onChange={(date) => setFromDate(date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
              <Grid item>
                <DatePicker
                  label="To Date"
                  format="DD-MM-YYYY"
                  value={toDate}
                  sx={{ width: "150px" }}
                  onChange={(date) => setToDate(date)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Grid>
            </Grid>
            {/* <Grid className="gap-2 flex  items-center text-center">
              <CustomButton onClick={csvHandler}>Export To Csv</CustomButton>
              
            </Grid> */}
            <img
              src={"/images/Export CSV.svg"}
              className="w-[103px] h-[40px] cursor-pointer mt-4 mb-auto mr-5"
              onClick={csvHandler}
            />
          </Grid>
        </div>
        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="center">Order Number</StyledTableCell>
                  <StyledTableCell align="center">Order Date</StyledTableCell>
                  <StyledTableCell align="center">Amount</StyledTableCell>
                  <StyledTableCell align="center">
                    Customer Name
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    Contact Number
                  </StyledTableCell>
                  <StyledTableCell align="center">Status</StyledTableCell>
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
                ) : userSalonData?.orderData?.length > 0 ? (
                  <>
                    {userSalonData?.orderData?.map((row, index) => (
                      <Row key={index} row={row} />
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
      </div>{" "}
    </div>
  );
};

export default ReportDetails;

const Row = (props) => {
  const { row, salonDetails, setSalonDetails } = props;
  const [open, setOpen] = useState(false);

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleDateString("en-US", options);
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
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.orderNo}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{formatDateTime(row?.orderDate)}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.amount / 100}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.customer?.firstName}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.customer?.contactMobileNumber}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.status}</Typography>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

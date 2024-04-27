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
} from "@mui/material";
import { serviceList } from "@/services/api";
import QuickSearchToolbar from "@/components/SearchBar";
import { exportToCSV } from "@/components/Common";
import CustomButton from "@/components/CommonButton/FilterButton";
import ResetButton from "@/components/CommonButton/ResetButton";

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
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of items per page

  // Total number of items in your dataset
  const totalItems = pagination ? pagination.total : 0;

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

//   const getUserData = async ({ page }) => {
//     setLoading(true);
//     try {
//       const payload = {
//         q: searchText,
//         page,
//         // status: filter?.status,
//       };
//       const res = await serviceList(payload);
//       setPagination(res?.meta?.pagination);
//       setUserSalonData(res?.data);
//       setLoading(false);
//     } catch (err) {
//       setLoading(false);
//       console.error("Error fetching salon data:", err);
//     }
//   };

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
    getUserData(page+1);
    // setCurrentPage(page);
  };

//   useEffect(() => {
//     getUserData({});
//   }, []);

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
              />
              <CustomButton onClick={handleFilterClick}>Filter</CustomButton>
              <ResetButton onClick={handleResetFilter} />
            </Grid>
            <Grid className="gap-2 flex  items-center text-center">
              <CustomButton onClick={csvHandler}>Export To Csv</CustomButton>
            </Grid>
          </Grid>
        </div>
        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="left">ID</StyledTableCell>
                  <StyledTableCell align="left">FIRST NAME</StyledTableCell>
                  <StyledTableCell align="left">LAST NAME</StyledTableCell>
                  <StyledTableCell align="left">CONTACT NUMBER</StyledTableCell>
                  <StyledTableCell align="center">EMAIL ID</StyledTableCell>
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
          <Typography>{row?.name}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.categoryText}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.desc}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.statusText}</Typography>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import axiosInstance from "@/utilities/configureAxios";
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
import QuickSearchToolbar from "@/components/SearchBar";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { useState } from "react";

const ApprovedReview = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [userSalonData, setUserSalonData] = useState([]);
  const [pagination, setPagination] = useState();
  const router = useRouter();
  const statusValue = router.query.status;
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of items per page

  // Total number of items in your dataset
  const totalItems = pagination ? pagination.total : 0;

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  var status = [2];

  const getApprovedRating = async (page) => {
    setLoading(true);
    try{
      const payload = {};
      (payload.q = searchText), (payload.page = page);
      const res = await axiosInstance.get(
        `admin/ratings/list?status=3&q=${searchText || ""}&page=${page || ""}`
      );
      setPagination(res?.data?.meta?.pagination);
      setData(res.data.data);
      setLoading(false);
    }
    catch{
      setLoading(false);
      console.error("Error fetching rating data:", err);
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
    getApprovedRating();
  }, []);

  const handleFilterClick = () => {
    getApprovedRating();
  };

  const handleChangePage = (e, page) => {
    getApprovedRating(page + 1);
    // setCurrentPage(page);
  };

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
              value={searchText}
              // width="100%"

              rootSx={{ p: 0, pb: 0, marginLeft: 0, width: "300px" }}
              variant="outlined"
              onFilterClick={handleFilterClick}
            />
            {/* <button className="filter-btncuston">
              <FilterAltIcon />
            </button> */}
            {/* <CustomButton onClick={handleFilterClick}>Filter</CustomButton> */}
            {/* <ResetButton onClick={handleResetFilter} /> */}
            {/* <button className="filter-btncuston">
              <RestartAltIcon />
            </button> */}
          </Grid>
          <Grid>
            {/* <CustomButton onClick={csvHandler}>Export To Csv</CustomButton> */}
            <img
              src={"/images/Export CSV.svg"}
              className="w-[103px] h-[40px] cursor-pointer mt-1 mb-auto mr-5"
              alt="test"
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
                  <StyledTableCell align="left">Saloon Name</StyledTableCell>
                  <StyledTableCell align="center">
                    Customer Name
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">
                    Landline Number
                  </StyledTableCell> */}
                  <StyledTableCell align="center">Type Text</StyledTableCell>
                  <StyledTableCell align="left">Status</StyledTableCell>
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
                ) : data?.length > 0 ? (
                  <>
                    {data.map((row, index) => (
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

export default ApprovedReview;
const Row = (props) => {
  const { row, salonDetails, setSalonDetails } = props;
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
            cursor: "pointer",
          },
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
          <Typography>{row.fromName}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Typography>{row.toName}</Typography>
        </StyledTableCell>
        {/* <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row.landlineNumber}</Typography>
        </StyledTableCell> */}
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row.typeText}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row.status}</Typography>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

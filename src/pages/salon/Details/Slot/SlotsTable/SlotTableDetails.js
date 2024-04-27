"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  CircularProgress,
  styled,
  tableCellClasses,
  debounce,
} from "@mui/material";
import { useSelector } from "react-redux";
import axiosInstance from "@/utilities/configureAxios";
import { useRouter } from "next/router";
import QuickSearchToolbar from "@/components/SearchBar";
import { topSalonList } from "@/services/api";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // color: theme.palette.common.black,
    color: "#878A99",
    textTransform: "capitalize",
    fontWeight: 500,
    fontSize: 13,
    lineHeight: "19.5px",
    borderBottom: "1px solid #D7D7D7",
    minWidth: 120,
    fontWeight: "bold",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
    lineHeight: "19.5px",
    color: theme.palette.common.black,
    minWidth: 100,
    fontWeight: 400,
    borderBottom: "1px solid #D7D7D7",
    font: "poppin",
  },
}));

const SlotTbaleDetails = ({ topTenSalonData, AllData }) => {
  const [loading, setLoading] = useState(false);
  const [topTenSalon, setTopTenSalon] = useState([]);
  const [pagination, setPagination] = useState();
  const [filter, setFilter] = useState({
    search: "",
    status: 2,
  });

  const [searchText, setSearchText] = useState("");

  var status = [2];

  const getUserData = async (page) => {
    setLoading(true);
    try {
      const res = await topSalonList();
      setPagination(res?.meta?.pagination);
      setTopTenSalon(res?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching salon data:", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, [searchText]);

  // useEffect(() => {
  //  topTenSalonData = AllData
  // }, []);
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; // Number of items per page

  // Total number of items in your dataset
  const totalItems = pagination ? pagination.total : 0;

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to handle page change
  const handleChangePage = (event, page) => {
    setCurrentPage(page);
    getUserData(page);
    // You can perform any additional actions here, like fetching data for the new page.
  };
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleFilterClick = () => {
    getUserData();
  };

  const handleResetFilter = () => {
    setSearchText("");
  };

  const handleSearch = debounce((searchValue) => {
    setSearchText(searchValue);
    if (searchValue?.length > 0) {
      getUserData(1, searchValue);
    } else {
      getUserData(1, "");
    }
  }, 400);
  // console.log(topTenSalon);
  // console.log(`data from other component ${topTenSalonData} `)

  return (
    <TableContainer style={{ maxHeight: 400 }}>
      <Table aria-label="collapsible table" className="">
        <TableHead style={{ backgroundColor: "#F3F6F9" }}>
          <TableRow style={{ fontWeight: "500", color: "#000" }}>
            <StyledTableCell align="left">ID</StyledTableCell>
            <StyledTableCell align="center"> Day</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
            <StyledTableCell align="center">Interval</StyledTableCell>
            <StyledTableCell align="center">Start Time</StyledTableCell>
            <StyledTableCell align="center">End Time</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody
          style={{ overflow: "auto", maxHeight: "calc(100vh - 300px)" }}
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
          ) : topTenSalonData?.length > 0 ? (
            <>
              {topTenSalonData?.map((row, index) => (
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
  );
};

export default SlotTbaleDetails;

const Row = (props) => {
  const { row, salonDetails, setSalonDetails } = props;
  const [open, setOpen] = useState(false);
  const router = useRouter();

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
          style={{ width: "150px" }}
          align="left"
          sx={{ textTransform: "capitalize" }}
        >
          <Typography>{row?.id}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ maxWidth: "150px" }}>
          <Typography>{row?.dayText}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ maxWidth: "150px" }}>
          <Typography>{row?.statusText}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ width: "150px" }}>
          <Typography>{row?.interval}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ width: "150px" }}>
          <Typography>{row?.startTime}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ width: "150px" }}>
          <Typography>{row?.endTime}</Typography>
        </StyledTableCell>
        
      </TableRow>
    </React.Fragment>
  );
};

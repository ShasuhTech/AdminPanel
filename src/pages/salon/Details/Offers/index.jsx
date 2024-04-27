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
import moment from "moment";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { salonListByid } from "@/services/api";

const Offers = ({  }) => {

  const [data, setSalonData] = useState({});
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const id = router?.query?.id;
  const call = async () => {
    if (!id) {
      return;
    }
    const payload = {
      id,
      include: "offers",
    };
    try {
      setLoader(true);
      const resp = await salonListByid(payload);
      setLoader(false);
      setSalonData(resp?.data);
    } catch (error) {
      setLoader(false);
      console.error(error);
    }
  };

  useEffect(() => {
    if (Object.keys(data).length === 0 && data?.constructor === Object) {
      call();
    }
  }, [router]);


  // const [userSalonData, setUserSalonData] = useState([]);
  // const [pagination, setPagination] = useState();
  // const [filter, setFilter] = useState({
  //   search: "",
  //   status: 2,
  // });

  // const [searchText, setSearchText] = useState("");

  // const [currentPage, setCurrentPage] = useState(1);
  // const itemsPerPage = 15; // Number of items per page

  // // Total number of items in your dataset
  // const totalItems = pagination ? pagination.total : 0;

  // // Calculate the total number of pages
  // const totalPages = Math.ceil(totalItems / itemsPerPage);

  // // Function to handle page change
  // const handleChangePage = (event, page) => {
  //   setCurrentPage(page);
  //   getUserData(page);
  //   // You can perform any additional actions here, like fetching data for the new page.
  // };
  // const handleFilterChange = (event) => {
  //   const { name, value } = event.target;
  //   setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  // };

  // const handleFilterClick = () => {
  //   getUserData();
  // };

  // const handleResetFilter = () => {
  //   setSearchText("");
  // };

  // const handleSearch = debounce((searchValue) => {
  //   setSearchText(searchValue);
  //   if (searchValue?.length > 0) {
  //     getUserData(1, searchValue);
  //   } else {
  //     getUserData(1, "");
  //   }
  // }, 400);

  return (
    <TableContainer style={{ maxHeight: "auto", overflow: "scroll" }}>
      <Table aria-label="collapsible table" className="">
        <TableHead>
          <TableRow style={{ fontWeight: "500", color: "#000" }}>
            <StyledTableCell align="left">Id</StyledTableCell>
            <StyledTableCell align="left">Title</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="right">Offer Amount</StyledTableCell>
            <StyledTableCell align="right">Max Amount</StyledTableCell>
            <StyledTableCell align="center">Discount Type</StyledTableCell>
            <StyledTableCell align="center">Offer Percentage</StyledTableCell>
            <StyledTableCell align="center">Start Date</StyledTableCell>
            <StyledTableCell align="center">End Date</StyledTableCell>
            <StyledTableCell align="center">Type</StyledTableCell>
            <StyledTableCell align="center">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody
          style={{ overflow: "auto", maxHeight: "calc(100vh - 300px)" }}
        >
          {data?.offers?.length > 0 ? (
            <>
              {data?.offers?.map((row, index) => (
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

export default Offers;

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
        <StyledTableCell style={{ minWidth: "50px" }} align="left">
          <Typography>{row?.id}</Typography>
        </StyledTableCell>
        <StyledTableCell
          style={{ minWidth: "200px" }}
          align="left"
          sx={{ textTransform: "capitalize" }}
        >
          <Typography>{row?.title}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "250px" }}>
          <Typography>{row?.desc}</Typography>
        </StyledTableCell>
        <StyledTableCell align="right" style={{ minWidth: "150px" }}>
          <Typography>{row?.offerAmountInPaisa / 100 || 0}</Typography>
        </StyledTableCell>
        <StyledTableCell align="right" style={{ minWidth: "150px" }}>
          <Typography>{row?.maxAmountInPaisa / 100 || 0}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.discountTypeText}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.offerPercentage}%</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{moment(row?.startDate).format("DD-MM-YYYY")}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{moment(row?.endDate).format("DD-MM-YYYY")}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.typeText}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.statusText}</Typography>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

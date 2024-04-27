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
  Button,
} from "@mui/material";
import { useSelector } from "react-redux";
import axiosInstance from "@/utilities/configureAxios";
import { useRouter } from "next/router";
import QuickSearchToolbar from "@/components/SearchBar";
import moment from "moment";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { salonListByid } from "@/services/api";
import AprovalModal from "../../requestchange/ApprovalModal";

const RequestChange = ({}) => {
  const [data, setSalonData] = useState({});
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const handleClose = () => {
    setOpenModal(false);
  };
  const id = router?.query?.id;
  const call = async () => {
    if (!id) {
      return;
    }
    const payload = {
      id,
      include: "requestChange",
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
    <TableContainer>
      <Table aria-label="collapsible table">
      <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
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
          {loader ? (
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
          ) : data?.requestChange?.length > 0 ? (
            <>
              {data?.requestChange?.map((row, index) => (
                <Row key={index} row={row} setSelectedRow={setSelectedRow} setOpenModal={setOpenModal} />
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
      {openModal && (
        <AprovalModal
          open={openModal}
          handleClose={handleClose}
          data={selectedRow}
          showBtn={true}
        />
      )}
    </TableContainer>
  );
};

export default RequestChange;

const Row = (props) => {
  const { row, salonDetails, setSalonDetails, setSelectedRow,setOpenModal} = props;
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

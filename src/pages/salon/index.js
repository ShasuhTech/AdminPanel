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
import styled from "@emotion/styled";
import MiniDrawer from "@/components/VerticalSidebar";
import { useSelector } from "react-redux";
import { salonList } from "@/services/api";
import { eraseCookie } from "@/utilities/cookies";
import axiosInstance from "@/utilities/configureAxios";
// import moment from 'moment';

// import { axiosInstance } from 'src/utilities/configureAxios';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
    backgroundColor: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "blue",
  },

  // hide last border
  "&:last-of-type td, &:last-of-type th": {
    border: 0,
  },
}));

const Salons = () => {
  const [loading, setLoading] = useState(false);
  const [userSalonData, setUserSalonData] = useState([]);
  const [filter, setFilter] = useState({
    search: "",
    status: 2,
  });

  const token = useSelector((state) => state.auth.token);
  console.log("dsadsadasdsa", token);
  // const loading = useSelector(state => state.auth.loading);

  const initialFilterState = {
    search: "",
    status: 2,
  };

  // const URL = "https://salon-apis.deepmindz.co/admin/salon/list";

  // const headers = {
  //   headers: {
  //     // Authorization: `Bearer ${localStorage.getItem("token")}`,
  //     Authorization: `Bearer ${token}`,
  //   },
  // };

  // const getUserData = async () => {
  //   setLoading(true);
  //   try {
  //     const params = new URLSearchParams();
  //     params.append("status", `[${filter.status}]`);
  //     if (filter.search) {
  //       params.append("q", filter.search);
  //     }
  //     const res = await axios.get(URL + "?" + params.toString(), {
  //       headers: headers.headers,
  //     });
  //     setUserSalonData(res.data.data);
  //   } catch (err) {
  //     console.error("Error fetching salon data:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  var status = [2];

  const getUserData = async () => {
    setLoading(true);
    try {
      const payload = {};
      (payload.q = filter?.search), (payload.status = status);
      const res = await axiosInstance.get(
        `admin/salon/list?q=${payload?.search||''}&status=[2]`
      );
      setUserSalonData(res?.data?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.error("Error fetching salon data:", err);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleFilterClick = () => {
    getUserData();
  };

  const handleResetFilter = () => {
    setFilter(initialFilterState);
  };

  return (
    <div>
      {/* <MiniDrawer setData={setUserSalonData} /> */}
      <div item sx={{ marginTop: "5rem" }}>
        <Typography variant="h4" sx={{ color: "#000", marginBottom: "10px" }}>
          Salon Summary
        </Typography>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "10px",
              padding: "10px 20px",
              alignItems: "center",
              background: "#FFF",
              borderRadius: "12px",
              marginBottom: "10px",
            }}
          >
            {
              <TextField
                id="search"
                name="search"
                variant="outlined"
                placeholder="Search"
                size="small"
                value={filter.search}
                onChange={handleFilterChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            }
            <Button variant="outlined" onClick={handleFilterClick}>
              Filter
            </Button>
            <Button variant="outlined" onClick={handleResetFilter}>
              Reset
            </Button>
          </div>
        </div>
        <Paper sx={{ width: "100%", overflow: "scroll" }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <TableCell
                    align="left"
                    style={{ fontWeight: "500", color: "#000" }}
                  ></TableCell>
                  <TableCell
                    align="left"
                    style={{ fontWeight: "500", color: "#000" }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontWeight: "500",
                      color: "#000",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Contact Mobile Number
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontWeight: "500",
                      color: "#000",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Mobile Verified
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontWeight: "500",
                      color: "#000",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Landline Number
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ fontWeight: "500", color: "#000" }}
                  >
                    Geolocation
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontWeight: "500",
                      color: "#000",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Brand Mobile Number
                  </TableCell>

                  <TableCell
                    align="left"
                    style={{ fontWeight: "500", color: "#000" }}
                  >
                    Type
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ fontWeight: "500", color: "#000" }}
                  >
                    Capacity
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{ fontWeight: "500", color: "#000" }}
                  >
                    USP
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontWeight: "500",
                      color: "#000",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Live Status
                  </TableCell>
                  <TableCell
                    align="left"
                    style={{
                      fontWeight: "500",
                      color: "#000",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Slot Time
                  </TableCell>
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
                ) : userSalonData.length > 0 ? (
                  <>
                    {userSalonData.map((row, index) => (
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
        </Paper>
      </div>{" "}
    </div>
  );
};

export default Salons;

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
        <TableCell align="left" style={{ maxWidth: "50px" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(!open);
            }}
          ></IconButton>
        </TableCell>
        <TableCell align="left" sx={{ textTransform: "capitalize" }}>
          <Typography>{row.name}</Typography>
        </TableCell>
        <TableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row.contactMobileNumber}</Typography>
        </TableCell>
        <TableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row.isMobileVerified}</Typography>
        </TableCell>
        <TableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row.landlineNumber}</Typography>
        </TableCell>
        <TableCell
          align="left"
          style={{ minWidth: "150px", whiteSpace: "nowrap" }}
        >
          <Typography>{row?.geolocation}</Typography>
        </TableCell>
        <TableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.brandMobileNumber}</Typography>
        </TableCell>
        <TableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.type}</Typography>
        </TableCell>
        <TableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.capacity}</Typography>
        </TableCell>
        <TableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.usp}</Typography>
        </TableCell>
        <TableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.liveStatus}</Typography>
        </TableCell>
        <TableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.slotTime}</Typography>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

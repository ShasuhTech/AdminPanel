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
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";
import axiosInstance from "@/utilities/configureAxios";
import { useRouter } from "next/router";
import QuickSearchToolbar from "@/components/SearchBar";
import moment from "moment";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { salonListByid } from "@/services/api";
import SlotTable from "./SlotsTable";
import WorkingTable from "./WorkingTable";
import HolidayTable from "./HolidayTable";

const Slot = ({}) => {
  const [data, setSalonData] = useState({});
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const [servicesData, setServicesData] = useState();

  const id = router?.query?.id;
  const call = async () => {
    if (!id) {
      return;
    }
    const payload = {
      id,
      include: "slots",
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
    <Grid>
      <Grid>
        <Typography variant="h5" fontWeight={600} ml={2} mt={2} py={1}>
          Working
        </Typography>
        <WorkingTable data={data} />
      </Grid>
      <Grid >
        <Typography  variant="h5" fontWeight={600} ml={2} mt={2} py={1} >
          Slots
        </Typography>
        <SlotTable data={data} />
      </Grid>
      <Grid>
        <Typography variant="h5" fontWeight={600} ml={2} mt={2} py={1}>
          Holiday
        </Typography>
        <HolidayTable data={data} />
      </Grid>
    </Grid>
  );
};

export default Slot;

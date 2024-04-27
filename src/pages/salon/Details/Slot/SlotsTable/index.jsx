"use client";
import React, { useEffect, useState } from "react";
import { Typography, TableContainer, TableRow, Tabs, Tab } from "@mui/material";
import { useSelector } from "react-redux";
import axiosInstance from "@/utilities/configureAxios";
import { useRouter } from "next/router";
import QuickSearchToolbar from "@/components/SearchBar";
import moment from "moment";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { salonListByid } from "@/services/api";
import SlotTbaleDetails from "./SlotTableDetails";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const SlotTable = ({}) => {
  const [data, setSalonData] = useState({});
  const [selectedTab, setSelectedTab] = useState(0);
  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const [servicesData, setServicesData] = useState([]);
  const [pagination, setPagination] = useState();
  const [value, setValue] = useState("1");
  const [filterData, setFilterData] = useState([]);
  const [firstRender, setFirstRender] = useState(true);

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
      setPagination(resp?.data?.meta?.pagination);
      setLoader(false);
      setServicesData(resp?.data?.slots);
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

  useEffect(() => {
    if (firstRender && servicesData.length > 0) {
      const mondayData = servicesData.filter((item) => item.day === 1);
      setFilterData(mondayData);
      setFirstRender(false);
    }
  }, [firstRender, servicesData]);

  // const handleChangePage = (e, page) => {
  //  call()
  // };

  // const AllData = servicesData.filter(item => item.day === 1);
  // console.log('saara data',AllData)

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const filteredData = servicesData.filter(
      (item) => item.day === parseInt(newValue)
    );
    setFilterData(filteredData);
    console.log("Filtered data for day", newValue, ":", filteredData);
  };

  return (
    <TableContainer style={{ maxHeight: "auto", overflow: "overflow-set" }}>
      {/* <Tabs
        value={selectedTab}
        onChange={handleChangeTab}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          width: "100%",
          "& .MuiTabs-flexContainer": {
            justifyContent: "space-between",
            padding: "0 16px",
          },
        }}
      > */}
      <TabContext value={value}>
        <TabList
          onChange={handleChange}
          aria-label="lab API tabs example"
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "25px",
            borderBottom: "2px solid #ccc",
            marginBottom: "10px",
            padding: "10px 0",
            overflowX: "auto",
          }}
        >
          <Tab
            label="Monday"
            value="1"
            style={{
              margin: "0 30px",
              borderRadius: "20px",
              background: value === "1" ? "#000000" : "none",
              color: value === "1" ? "#fff" : "#000",
            }}
          />
          <Tab
            label="Tuesday"
            value="2"
            style={{
              margin: "0 30px",
              borderRadius: "20px",
              background: value === "2" ? "#000000" : "none",
              color: value === "2" ? "#fff" : "#000",
            }}
          />
          <Tab
            label="Wednesday"
            value="3"
            style={{
              margin: "0 30px",
              borderRadius: "20px",
              background: value === "3" ? "#000000" : "none",
              color: value === "3" ? "#fff" : "#000",
            }}
          />
          <Tab
            label="Thursday"
            value="4"
            style={{
              margin: "0 30px",
              borderRadius: "20px",
              background: value === "4" ? "#000000" : "none",
              color: value === "4" ? "#fff" : "#000",
            }}
          />
          <Tab
            label="Friday"
            value="5"
            style={{
              margin: "0 30px",
              borderRadius: "20px",
              background: value === "5" ? "#000000" : "none",
              color: value === "5" ? "#fff" : "#000",
            }}
          />
          <Tab
            label="Saturday"
            value="6"
            style={{
              margin: "0 30px",
              borderRadius: "20px",
              background: value === "6" ? "#000000" : "none",
              color: value === "6" ? "#fff" : "#000",
            }}
          />
          <Tab
            label="Sunday"
            value="7"
            style={{
              margin: "0 30px",
              borderRadius: "20px",
              background: value === "7" ? "#000000" : "none",
              color: value === "7" ? "#fff" : "#000",
            }}
          />
        </TabList>
      </TabContext>
      {/* </Tabs> */}

      {/* <SlotTbaleDetails /> */}
      <SlotTbaleDetails topTenSalonData={filterData} />
    </TableContainer>
  );
};

export default SlotTable;

const Row = (props) => {
  const { row } = props;

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
          style={{ width: "400px" }}
          align="left"
          sx={{ textTransform: "capitalize" }}
        >
          <Typography>{row?.id}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ maxWidth: "200px" }}>
          <Typography>{row?.slots?.dayText}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ maxWidth: "200px" }}>
          <Typography>{row?.slots?.statusText}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ width: "150px" }}>
          <Typography>{row?.slots?.interval}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ width: "150px" }}>
          <Typography>{row?.slots?.startTime}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ width: "150px" }}>
          <Typography>{row?.slots?.endTime}</Typography>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

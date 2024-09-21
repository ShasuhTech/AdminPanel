"use client";
import {
  Box,
  Grid,
  LinearProgress,
  Typography,
  linearProgressClasses,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import DetailsTable from "./DetailsTable";
import Barxchart from "@/components/Charts/BarChart";
import {
  getDashoardData,
  getTopSalonOrderDetails,
  schoolListDashboard,
} from "@/services/api";
import FullMap from "./Map";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import Seo from "@/components/Common/SEO";
import CustomButton from "@/components/CommonButton/CustomButton";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#405189" : "#308fe8",
  },
}));

const Home = () => {
  const router = useRouter();
  const [greeting, setGreeting] = useState("");

  const { data: responseData } = useQuery({
    queryKey: ["topSalonOrderDetails"],
    queryFn: async () => {
      const resp = await getTopSalonOrderDetails({
        startDate: new Date().toDateString(),
        endDate: new Date().toDateString(),
      });
      return resp.data;
    },
  });

  const salonSalesByLocation = responseData?.location || [];
  const salonRevenue = responseData?.revenueData || [];
  console.log(responseData, salonRevenue, "responseData");
  // console.log(salonRevenue,"salonRevenue")

  const {
    data: dataDash,
    status,
    isLoading,
    refetch,
  } = useQuery("dataDash", async () => {
    const res = await getDashoardData();
    return res?.data;
  });
  const {
    data: schoolList,
    status: schoolStatus,
    isLoading: schoolLoading,
    refetch: schoolRefetch,
  } = useQuery("schoolListDashboard", async () => {
    const res = await schoolListDashboard();
    return res?.data;
  });
  const mapData = [
    {
      cityName: "Noida",
      cityLatitude: 28.5355,
      cityLongitude: 77.391,
      totalOrders: 892,
      orderPercentage: "88.3",
    },
    {
      cityName: "Greater Noida",
      cityLatitude: 28.4744,
      cityLongitude: 77.504,
      totalOrders: 89,
      orderPercentage: "8.8",
    },
    {
      cityName: "Delhi",
      cityLatitude: 28.6667,
      cityLongitude: 77.2167,
      totalOrders: 16,
      orderPercentage: "60.6",
    },
    {
      cityName: "Gurgaon",
      cityLatitude: 28.6667,
      cityLongitude: 77.2167,
      totalOrders: 16,
      orderPercentage: "40.6",
    },
    {
      cityName: "Pune",
      cityLatitude: 28.6667,
      cityLongitude: 77.2167,
      totalOrders: 16,
      orderPercentage: "10.6",
    },
    {
      cityName: "Mumbai",
      cityLatitude: 28.6667,
      cityLongitude: 77.2167,
      totalOrders: 16,
      orderPercentage: "40.6",
    },
   
  ];

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      setGreeting("Good Morning, Admin");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon, Admin");
    } else {
      setGreeting("Good Night, Admin");
    }
  }, []);

  return (
    <Box>
      <Seo />
      {/* new cards */}
      <Grid className="font-bold w-[250px] h-[20px] text-[16px] mb-2">
        {greeting}
      </Grid>
      <Grid>Here&apos;s what&apos;s happening with your Dashboard today.</Grid>
      <Grid className="lg:w-[100%] md-[50%] w-[100%] lg:h-[100px] xl:h-[150px] mt-6">
        <div className="flex items-center  flex-wrap gap-4">
          {dataDash &&
            Object.keys(dataDash)?.map((item, ind) => {
              return (
                <div
                  key={ind}
                  // onClick={() => cardClick(item)}
                  className="border h-[120px] hover:bg-black justify-center items-center flex lg:w-[19%] w-[100%] shadow-lg bg-gray-700 cursor-pointer p-5 rounded-[15px]"
                >
                  <span className="text-white text-[20px] capitalize">
                    {item.replace(/([A-Z])/g, " $1").replace('Count','')}
                  </span>
                  <span className="text-white text-[20px] ml-4">
                    {dataDash[item]}
                  </span>
                </div>
              );
            })}
        </div>
      </Grid>

      {/* new graph and location */}
      <Grid className=" lg:flex gap-5 my-5 ">
        <Grid className="lg:w-[70%] bg-white rounded-lg overflow-auto">
          <Grid className="flex justify-between border-b text-center items-center gap-4 p-5">
            <span className={"font-bold text-[15px]"}>Revenue</span>
            <Grid className="gap-2 flex">
              <button className="bg-white text-black border border-black border-solid px-4 py-1 rounded-md font-medium focus:bg-black focus:text-white">
                All
              </button>
              <button className="bg-white text-black border border-black border-solid px-4 py-1 rounded-md font-medium focus:bg-black focus:text-white">
                1M
              </button>
              <button className="bg-white text-black border border-black border-solid px-4 py-1 rounded-md font-medium focus:bg-black focus:text-white">
                6M
              </button>
              <button className="bg-white text-black border border-black border-solid px-4 py-1 rounded-md font-medium focus:bg-black focus:text-white">
                1Y
              </button>
            </Grid>
          </Grid>

          {/* <Grid style={{ marginTop: "100px" }}>
            {responseData?.revenueData && (
              <Barxchart salonRevenue={responseData.revenueData} />
            )}
          </Grid> */}
          <Barxchart salonRevenue={""} />
        </Grid>
        <Grid className="lg:w-[30%] lg:mt-0 mt-5 overflow-hidden bg-white rounded-lg">
          <Grid className="flex justify-between  text-center items-center p-5">
            <span className={"text-[16px] font-semibold"}>
              Sales by Locations
            </span>
            <img
              src={"/images/ExportReport_1.svg"}
              className="w-[92.91px] h-[27.06px] cursor-pointer flex ml-auto mb-2"
            />
          </Grid>
          <div
            style={{
              width: "100%",
              height: "1px",
              backgroundColor: "#bacbcc",
            }}
          ></div>
          {/* <FullMap salonSalesByLocation={salonSalesByLocation} /> */}

          <Grid className="mb-5">
            {mapData.map((location, index) => (
              <Grid key={index} className="p-3">
                <Grid className="flex justify-between">
                  <span
                    className={"font-medium text-[15px] text-[#212529] mb-2"}
                  >
                    {location.cityName}
                  </span>
                  <span className={"font-medium text-[15px] text-[#212529]"}>
                    {location.orderPercentage}%
                  </span>
                </Grid>
                <BorderLinearProgress
                  variant="determinate"
                  value={parseFloat(location.orderPercentage)}
                  className=""
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* To 10 School Listig */}
      <Grid className="lg:w-[100%] md-[50%] w-[100%] lg:h-[700px] xl:h-[650px] gap-5">
        <Grid className="w-[100%] bg-white rounded-md  overflow-hidden border shadow-lg  lg:h-[700px] xl:h-[670px]">
          <Grid className="flex justify-between items-center">
            <Grid item>
              <Typography
                variant="h5"
                sx={{
                  p: 3,
                  fontSize: 16,
                  fontWeight: 500,
                  textAlign: "left",
                }}
              >
                Top 10 School
              </Typography>
            </Grid>
            <Grid item>
              <img
                src={"/images/GenerateReportButton.svg"}
                className="w-[125px] h-[27px] cursor-pointer mt-auto mb-auto mr-5"
              />
            </Grid>
          </Grid>
          <Grid className="h-[550px]">
            <DetailsTable
              topTenSchoolData={schoolList}
              loading={schoolLoading}
            />
          </Grid>
          <Grid className="flex justify-end m-3 mt-auto">
            <CustomButton
              onClick={() =>
                router.push({
                  pathname: "/school",
                  query: { title: "Report" },
                })
              }
            >
              View All
            </CustomButton>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

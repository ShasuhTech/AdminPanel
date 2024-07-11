import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Radio,
  Typography,
  linearProgressClasses,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import TrendingUp from "mdi-material-ui/TrendingUp";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { ChevronUpCircle } from "mdi-material-ui";
import { ChevronDownCircle } from "mdi-material-ui";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DetailsTable from "./DetailsTable";
import PieAnimation from "@/components/Charts/Dounght";
import Barxchart from "@/components/Charts/BarChart";
import { getTopSalonOrderDetails } from "@/services/api";
import FullMap from "./Map";
import { styled } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getSalonOrderDetails } from "@/services/api";
import Seo from "@/components/Common/SEO";
import { LineChart } from "@mui/x-charts";
import dayjs from "dayjs";

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
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

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

  const detailsData = responseData?.orderDetailsByTime || [];
  const doughnutData = responseData?.doughnut || [];
  const topTenSalonData = responseData?.topTenData || [];
  const salonSalesByLocation = responseData?.location || [];
  const salonRevenue = responseData?.revenueData || [];
  console.log(responseData, salonRevenue, "responseData");
  // console.log(salonRevenue,"salonRevenue")

  // const {
  //   data: detailsData,
  //   status,
  //   isLoading,
  //   refetch,
  // } = useQuery("adminCategory", async () => {
  //   const res = await getSalonOrderDetails();
  //   return res?.data;
  // });
  // console.log(detailsData)

  console.log(doughnutData, "doughnutData");

  const [greeting, setGreeting] = useState("");

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
      <Grid className="font-bold w-[177px] h-[20px] text-[16px] mb-2">
        {greeting}
      </Grid>
      <Grid>Here&apos;s what&apos;s happening with your Dashboard today.</Grid>
      <Grid className="lg:w-[100%] md-[50%] w-[100%] lg:h-[100px] xl:h-[150px]">
        <Grid className="w-[100%] lg:flex  items-center gap-5 lg:h-[100px] mt-[45px]">
          {detailsData.map((item, ind) => {
            return (
              <>
                <Grid className="lg:w-[316.89px] h-[145.39px] lg:my-0 my-3 bg-white  rounded  overflow-hidden  shadow-lg py-5 px-1">
                  <Grid>
                    <Grid className=" py-2 px-2  w-[100%]">
                      <Grid className="w-[100%] flex justify-between mb-5 -mt-3">
                        <span className="text-[13px] text-gray-500 font-medium">
                          DAILY BOOKINGS
                        </span>
                        {item?.growthToday >= 0 ? (
                          <Grid className="flex justify-between gap-1">
                            <img
                              src={"/images/UpArrowIcon.png"}
                              className="w-[12.48px] h-[13px] cursor-pointer"
                            />
                            <div className="w-[63px] h-[16px]  text-[12px] text-[#0AB39C]">
                              +{item?.growthToday}%
                            </div>
                          </Grid>
                        ) : (
                          <Grid className="flex justify-between gap-1">
                            <img
                              src={"/images/DownArrowIcon.png"}
                              className="w-[12.48px] h-[13px] cursor-pointer "
                            />
                            <div className="w-[63px] h-[16px] text-[12px] text-[#F06548]">
                              {item?.growthToday}%
                            </div>
                          </Grid>
                        )}
                      </Grid>

                      <Grid className="flex-col justify-between h-[69px]">
                        <span className="text-[22px] text-[#495057] font-bold">
                          {/* <CurrencyRupeeIcon style={{height:'22px', width:'15px'}}/> */}
                          {item?.todayTotal / 100}
                        </span>

                        <div className="flex justify-between">
                          <span
                            className="text-[12px] font-medium underline text-[#405189] cursor-pointer mt-8"
                            onClick={() =>
                              router.push(
                                `/report/booking?from=${new Date().toDateString()}&to=${new Date().toDateString()}`
                              )
                            }
                          >
                            View Daily Booking
                          </span>
                          {item?.growthToday >= 0 ? (
                            <img
                              src={"/images/TrendingIcon.png"}
                              className="w-[48px] h-[48px] cursor-pointer "
                            />
                          ) : (
                            <img
                              src={"/images/TrendingDownItem.png"}
                              className="w-[48px] h-[48px] cursor-pointer "
                            />
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {/* new montly card */}

                <Grid className="lg:w-[316.89px] h-[145.39px] lg:my-0 my-3 bg-white  rounded  overflow-hidden  shadow-lg py-5 px-1">
                  <Grid>
                    <Grid className=" py-2 px-2  w-[100%]">
                      <Grid className="w-[100%] flex justify-between mb-5 -mt-3">
                        <span className="text-[13px] text-gray-500 font-medium">
                          MONTHLY BOOKINGS
                        </span>
                        {item?.growthMonth >= 0 ? (
                          <Grid className="flex justify-between gap-1">
                            <img
                              src={"/images/UpArrowIcon.png"}
                              className="w-[12.48px] h-[13px] cursor-pointer "
                            />
                            <div className="w-[63px] h-[16px]  text-[12px] text-[#0AB39C]">
                              +{item?.growthMonth}%
                            </div>
                          </Grid>
                        ) : (
                          <Grid className="flex justify-between gap-1">
                            <img
                              src={"/images/DownArrowIcon.png"}
                              className="w-[12.48px] h-[13px] cursor-pointer "
                            />
                            <div className="w-[63px] h-[16px] text-[12px] text-[#F06548]">
                              {item?.growthMonth}%
                            </div>
                          </Grid>
                        )}
                      </Grid>

                      <Grid className="flex-col justify-between h-[69px]">
                        <span className="text-[22px] text-[#495057] font-bold">
                          {/* <CurrencyRupeeIcon style={{height:'22px', width:'15px'}}/> */}
                          {item?.currentMonthTotal / 100}
                        </span>

                        <div className="flex justify-between">
                          <span
                            className="text-[12px] font-medium underline text-[#405189] cursor-pointer mt-8"
                            onClick={() =>
                              router.push(
                                `/report/booking?from=${dayjs()
                                  .startOf("month")
                                  .toDate()}&to=${new Date().toDateString()}`
                              )
                            }
                          >
                            View Monthly Booking
                          </span>
                          {item?.growthMonth >= 0 ? (
                            <img
                              src={"/images/TrendingIcon.png"}
                              className="w-[48px] h-[48px] cursor-pointer "
                            />
                          ) : (
                            <img
                              src={"/images/TrendingDownItem.png"}
                              className="w-[48px] h-[48px] cursor-pointer "
                            />
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>

                {/* new yearly card */}
                <Grid className="lg:w-[316.89px] h-[145.39px] lg:my-0 my-3 bg-white  rounded  overflow-hidden  shadow-lg py-5 px-1">
                  <Grid>
                    <Grid className=" py-2 px-2  w-[100%]">
                      <Grid className="w-[100%] flex justify-between mb-5 -mt-3">
                        <span className="text-[13px] text-gray-500 font-medium">
                          YEARLY BOOKINGS
                        </span>
                        {item?.growthYear >= 0 ? (
                          <Grid className="flex justify-between gap-1">
                            <img
                              src={"/images/UpArrowIcon.png"}
                              className="w-[12.48px] h-[13px] cursor-pointer "
                            />
                            <div className="w-[63px] h-[16px] text-[12px] text-[#0AB39C]">
                              +{item?.growthYear}%
                            </div>
                          </Grid>
                        ) : (
                          <Grid className="flex justify-between gap-1">
                            <img
                              src={"/images/DownArrowIcon.png"}
                              className="w-[12.48px] h-[13px] cursor-pointer "
                            />
                            <div className="w-[63px] h-[16px]  text-[12px] text-[#F06548]">
                              {item?.growthYear}%
                            </div>
                          </Grid>
                        )}
                      </Grid>

                      <Grid className="flex-col justify-between h-[69px]">
                        <span className="text-[22px] text-[#495057] font-bold">
                          {/* <CurrencyRupeeIcon style={{height:'22px', width:'15px'}}/> */}
                          {item?.currentYearTotal / 100}
                        </span>

                        <div className="flex justify-between">
                          <span
                            className="text-[12px] font-medium underline text-[#405189] cursor-pointer mt-8"
                            onClick={() =>
                              router.push(
                                `/report/booking?from=${dayjs()
                                  .startOf("year")
                                  .toDate()}&to=${new Date().toDateString()}`
                              )
                            }
                          >
                            View Yearly Booking
                          </span>
                          {item?.growthYear >= 0 ? (
                            <img
                              src={"/images/TrendingIcon.png"}
                              className="w-[48px] h-[48px] cursor-pointer "
                            />
                          ) : (
                            <img
                              src={"/images/TrendingDownItem.png"}
                              className="w-[48px] h-[48px] cursor-pointer "
                            />
                          )}
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </>
            );
          })}
        </Grid>
      </Grid>
      {/*  */}

      {/* new graph and location */}
      <Grid className=" lg:flex gap-5 my-5 ">
        <Grid className="lg:w-[60%] bg-white rounded-lg overflow-auto">
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

          <Grid style={{ marginTop: "100px" }}>
            {responseData?.revenueData && (
              <Barxchart salonRevenue={responseData.revenueData} />
            )}
          </Grid>
        </Grid>
        <Grid className="lg:w-[40%] lg:mt-0 mt-5 overflow-hidden bg-white rounded-lg">
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
          <FullMap salonSalesByLocation={salonSalesByLocation} />

          <Grid className="mb-5">
            {salonSalesByLocation.map((location, index) => (
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

      {/*  */}
      <Grid className="lg:flex  gap-5  ">
        <Grid className="lg:w-[30%] md:w-[100%] p-4 bg-white rounded-md overflow-hidden border shadow-lg lg:h-[700px] xl:h-[670px]">
          <Grid className="display-flex">
            <span className="text-[16px] font-semibold">Order Details</span>
            <img
              src={"/images/ExportReport_1.svg"}
              className="w-[92.91px] h-[27.06px] cursor-pointer flex ml-auto mt-[-25px] mb-2"
            />

            <hr className=" w-full" />
          </Grid>
          <Grid className=" text-center justify-center items-center  my-[20px]">
            {doughnutData.length > 0 && (
              <PieAnimation doughnutData={doughnutData} />
            )}
            <Grid className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 md:grid-cols-2 gap-3 mt-2 justify-center items-center">
              {/* {doughnutData.slice(1).map((item, ind) => {
                return (
                  <Grid key={ind} className="flex items-center gap-1 mb-1">
                    <div
                      style={{ backgroundColor: item?.color }}
                      className="h-[20px] w-[20px] rounded-md"
                    ></div>
                    <Typography variant="h6" fontWeight={600}>
                      {item?.label}
                    </Typography>
                  </Grid>
                );
              })} */}
            </Grid>
          </Grid>
          <Grid className="my-5">
            {doughnutData.map((item, ind) => {
              return (
                <Grid
                  key={ind}
                  className={`flex justify-between ${
                    ind != 4 && "border-b border-dashed"
                  } py-2`}
                >
                  <Grid className="flex gap-1 text-center items-center">
                    <Grid
                      style={{ backgroundColor: item?.color }}
                      className="w-10 h-10 rounded-full text-white items-center flex justify-center text-center border"
                    >
                      <TrendingUp />
                    </Grid>
                    {/* <div style={{ color: "black" }}
                         className="text-[15px] text-black font-medium">
                          {item?.label}
                          </div>
                          <div style={{}}> <span style={{ color: item.color }}>●</span> Count</div> */}
                    <div className="text-[15px] text-black font-medium">
                      {item?.label}
                      <div style={{ fontSize: "12px", textAlign: "left" }}>
                        <span style={{ color: item.color }}>●</span>Count
                      </div>
                    </div>
                  </Grid>
                  <Grid className=" gap-1 text-center items-center">
                    <Typography
                      variant="h6"
                      lassName="text-[4px] "
                      style={{ color: "grey", fontWeight: "bolder" }}
                    >
                      <CurrencyRupeeIcon
                        style={{ width: "15px", height: "15px" }}
                      />{" "}
                      {item?.value / 100}
                    </Typography>
                    <Typography
                      variant="h6"
                      lassName="text-[5px] "
                      style={{ color: "#52b0e3", textAlign: "right" }}
                    >
                      {item?.count}
                    </Typography>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        <Grid className="lg:w-[70%] md-[50%] w-[100%] lg:h-[700px] xl:h-[650px] gap-5">
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
                  {/* Top 10 {process.env.NEXT_PUBLIC_TITLE} */}
                  Top 10 School
                </Typography>
              </Grid>
              <Grid item>
                <img
                  src={"/images/GenerateReportButton.svg"}
                  className="w-[125px] h-[27px] cursor-pointer mt-auto mb-auto mr-5"
                />
              </Grid>
              {false && (
                <Box sx={{ display: "flex", gap: 2 }}>
                  <Grid className="flex text-center items-center">
                    <Typography>Value</Typography>
                    <Radio
                      checked={selectedValue === "a"}
                      onChange={handleChange}
                      value="a"
                      name="radio-buttons"
                      slotProps={{ input: { "aria-label": "A" } }}
                    />
                  </Grid>
                  <Grid className="flex text-center items-center">
                    <Typography>Count</Typography>
                    <Radio
                      checked={selectedValue === "b"}
                      onChange={handleChange}
                      value="b"
                      name="radio-buttons"
                      slotProps={{ input: { "aria-label": "B" } }}
                    />
                  </Grid>
                </Box>
              )}
            </Grid>
            <Grid className="h-[550px]">
              <DetailsTable topTenSalonData={topTenSalonData} />
            </Grid>
            <Grid className="flex justify-end m-3 mt-auto">
              <Button
                onClick={() =>
                  router.push({
                    pathname: "/report",
                    query: { title: "Report" },
                  })
                }
              >
                View All
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;

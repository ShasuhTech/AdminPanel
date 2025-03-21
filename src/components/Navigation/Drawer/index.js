import React, { useState, useEffect } from "react";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useRouter } from "next/router";
import HomeIcon from "@mui/icons-material/Home";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Collapse, useMediaQuery } from "@mui/material";
import { eraseCookie } from "@/utilities/cookies";
import { Cookies } from "@/config/cookies";
import ServiceList from "@mui/icons-material/ListAltOutlined";
import SchoolIcon from "@mui/icons-material/School";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PermDataSettingIcon from "@mui/icons-material/PermDataSetting";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import AssignmentIcon from "@mui/icons-material/Assignment";
import PersonAddAltSharpIcon from "@mui/icons-material/PersonAddAltSharp";
import ManageAccountsSharpIcon from "@mui/icons-material/ManageAccountsSharp";

const drawerWidth = 250;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme, open }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  height: !open ? "100px" : "50px",
  backgroundColor: "#84484F",
  borderTopRightRadius: !open ? "10px" : "0px",
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DrawerList = ({
  path,
  text,
  Icon,
  children,
  open,
  title,
  ind,
  logout,
  handleDrawerOpen,
  handleDrawerClose,
}) => {
  const router = useRouter();
  // Check if this path is active
  const isActive = router.pathname === path;

  // Check if any child path is active
  const isParentActive =
    children && router.pathname.startsWith(path) && path !== "";

  // State for sublist open/closed
  const [sublistOpen, setSublistOpen] = useState(false);

  // Effect to automatically open parent when child is active
  useEffect(() => {
    if (isParentActive) {
      setSublistOpen(true);
    }
  }, [router.pathname, isParentActive]);

  const isMobile = useMediaQuery("(max-width:600px)");

  const toggleSublist = () => {
    setSublistOpen(!sublistOpen);
  };

  const handleItemClick = () => {
    if (!children) {
      router.push({
        pathname: path,
        query: { title: title },
      });
    } else if (logout) {
      eraseCookie(Cookies.TOKEN);
    } else {
      toggleSublist();
    }
  };

  return (
    <>
      <ListItem
        disablePadding
        sx={{ display: "block" }}
        className="transition-all duration-300 ease-in-out"
      >
        <ListItemButton
          button
          onClick={handleItemClick}
          sx={{
            justifyContent: "initial",
            padding: "5px",
            marginTop: "15px",
            height: "36px",
            paddingLeft: open ? "20px" : "10px",
            color: isActive || isParentActive ? "#000" : "#000000",
            backgroundColor:
              isActive || isParentActive ? "#FFFFFF" : "transparent",
            borderRadius: open ? "10px" : "0px",
            "&:hover": {
              backgroundColor:
                isActive || isParentActive ? "#FFFFFF" : "#D9D9D933",
              padding: "5px",
              height: "36px",
              paddingLeft: open ? "20px" : "10px",
              color: "transparent",
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 0, mr: 3.5, justifyContent: "center" }}>
            <Icon
              className={`${
                !(isActive || isParentActive) ? "text-white" : "text-black"
              } `}
              sx={!children && ind !== 1 && { fontSize: "15px" }}
              fill={!(isActive || isParentActive) ? "#fff" : "#fff"}
            />
          </ListItemIcon>
          <ListItemText
            primary={text}
            primaryTypographyProps={
              !children && ind !== 1
                ? { fontSize: "13px" }
                : { fontSize: "15px" }
            }
            className={`${
              isActive || isParentActive ? "text-black" : "text-[#fff]"
            } `}
          />
          {children && (
            <IconButton onClick={toggleSublist}>
              {sublistOpen ? (
                <KeyboardArrowUpIcon
                  className={`${
                    isActive || isParentActive ? "text-primary" : "text-white"
                  }`}
                />
              ) : (
                <KeyboardArrowDownIcon
                  className={`${
                    isActive || isParentActive ? "text-primary" : "text-white"
                  }`}
                />
              )}
            </IconButton>
          )}
        </ListItemButton>
      </ListItem>
      <Collapse
        in={sublistOpen}
        timeout={500}
        className="transition-all duration-300 ease-in-out"
      >
        {
          <List
            style={{
              width: "100%",
              transition: "transform 0.3s",
              padding: "0px 10px",
            }}
            component="div"
            className={`
            px-3 items-center justify-center text-center mr-6
            transition-all duration-300 ease-in-out
            ${
              sublistOpen
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95 hidden"
            }
          `}
          >
            {children}
          </List>
        }
      </Collapse>
    </>
  );
};

const DrawerPath = ({
  open,
  handleDrawerOpen,
  handleDrawerClose,
  viewportWidth,
}) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <>
      {isMobile && open && (
        <Drawer
          variant="permanent"
          open={open}
          className={"bg-[#0E0E0E] absolute"}
        >
          <List
            className="bg-[#0E0E0E] h-[840px] rounded-br-lg px-4 overflow-y-auto"
            style={{
              padding: "5px 5px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <img
              onClick={() => router.push("/")}
              src={open ? "/images/Logo.png" : "/images/Logo.png"}
              className={
                open
                  ? "w-[88px] h-[119px] cursor-pointer mt-3 ml-auto mr-auto mb-12"
                  : "w-[150px] h-[50px] cursor-pointer"
              }
            />
            <DrawerList
              path={"/"}
              text={"Dashboards"}
              Icon={DashboardIcon}
              open={open}
              title={"Dashboards"}
              ind={1}
            />

            <DrawerList
              path={"/school"}
              text={"School"}
              Icon={SchoolIcon}
              open={open}
            >
              <DrawerList
                path={"/school/school-list"}
                text={"School List"}
                Icon={ServiceList}
                open={open}
                title={"School >> School List"}
              />
            </DrawerList>
            <DrawerList
              path={"/student"}
              text={"Student"}
              Icon={SchoolIcon}
              open={open}
            >
              <DrawerList
                path={"/school"}
                text={"Student Entry"}
                Icon={ServiceList}
                open={open}
                title={"School >> School List"}
              />
            </DrawerList>
          </List>
          <Divider />
        </Drawer>
      )}
      {!isMobile && (
        <Drawer variant="permanent" open={open} className={"bg-primary"}>
          <List
            className="bg-[#0E0E0E] h-[100vh] rounded-br-lg  px-4 overflow-y-auto"
            style={{
              padding: "5px 5px",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <img
              onClick={() => router.push("/")}
              src={open ? "/images/Logo.png" : "/images/Logo.png"}
              className={
                open
                  ? "w-[88px] h-[119px] cursor-pointer mt-3 ml-auto mr-auto mb-12"
                  : "w-[150px] h-[50px] cursor-pointer"
              }
            />
            <DrawerList
              path={"/"}
              text={"Dashboards"}
              Icon={DashboardIcon}
              open={open}
              title={"Dashboards"}
              ind={1}
            />
            <DrawerList
              path={"/master"}
              text={"Master"}
              Icon={PermDataSettingIcon}
              open={open}
              title={"Master"}
              ind={1}
            />
            {/* School */}
            <DrawerList
              path={"/school"}
              text={"School"}
              Icon={SchoolIcon}
              open={open}
            >
              <DrawerList
                path={"/school/school-list"}
                text={"School List"}
                Icon={ServiceList}
                open={open}
                title={"School >> School List"}
              />
              <DrawerList
                path={"/school/school-overview"}
                text={"School Overview"}
                Icon={ServiceList}
                open={open}
                title={"School >> School Overview"}
              />
            </DrawerList>
            {/* Registration */}
            <DrawerList
              path={"/registration"}
              text={"Registration"}
              Icon={AppRegistrationIcon}
              open={open}
            >
              <DrawerList
                path={"/registration/student-enquiry"}
                text={"Student Enquiry"}
                Icon={ServiceList}
                open={open}
                title={"registration >> Student Enquiry"}
              />
              <DrawerList
                path={"/registration/student-registration"}
                text={"Student Registration"}
                Icon={ServiceList}
                open={open}
                title={"registration >> student registration"}
              />
              <DrawerList
                path={"/registration/registration-start-details"}
                text={"Registration Start Details"}
                Icon={ServiceList}
                open={open}
                title={"registration >> Registration Start Details"}
              />
              <DrawerList
                path={"/registration/followup-mood"}
                text={"Followup Mode"}
                Icon={ServiceList}
                open={open}
                title={"registration >> Followup Mode"}
              />
              <DrawerList
                path={"/registration/selection-process"}
                text={"Selection Process"}
                Icon={ServiceList}
                open={open}
                title={"registration >> Selection Process"}
              />

              <DrawerList
                path={"/registration/student-transfer"}
                text={"Student Transfer"}
                Icon={ServiceList}
                open={open}
                title={"registration >>Student Transfer"}
              />
              <DrawerList
                path={"/registration/time-slot-master"}
                text={"Time Slot Master"}
                Icon={ServiceList}
                open={open}
                title={"registration >>Time Slot Master"}
              />
              <DrawerList
                path={"/registration/age-criteria"}
                text={"Age Criteria"}
                Icon={ServiceList}
                open={open}
                title={"registration >>Age Criteria"}
              />
            </DrawerList>
            {/* Student */}
            <DrawerList
              path={"/student"}
              text={"Student"}
              Icon={PersonAddAltSharpIcon}
              open={open}
            >
              <DrawerList
                path={"/student/student-list"}
                text={"Student List"}
                Icon={ServiceList}
                open={open}
                title={"Student >> Student List"}
              />
              <DrawerList
                path={"/student/rollno-assign"}
                text={"Roll No Assign"}
                Icon={ServiceList}
                open={open}
                title={"Student >> Roll No Assign"}
              />
              <DrawerList
                path={"/student/feegroup-assign"}
                text={"Fee Group Assign"}
                Icon={ServiceList}
                open={open}
                title={"Student >> Fee Group Assign"}
              />
              <DrawerList
                path={"/student/transfer-certificate"}
                text={"Transfer Certificate"}
                Icon={ServiceList}
                open={open}
                title={"Student >> Transfer Certificate"}
              />
              <DrawerList
                path={"/student/dropout-details"}
                text={"Dropout Details"}
                Icon={ServiceList}
                open={open}
                title={"Student >> Dropout Details"}
              />
              <DrawerList
                path={"/student/promotion"}
                text={"Promotion"}
                Icon={ServiceList}
                open={open}
                title={"Promotion"}
              />
              <DrawerList
                path={"/student/student-updation"}
                text={"Field Updation"}
                Icon={ServiceList}
                open={open}
                title={"Field Updation"}
              />
              <DrawerList
                path={"/student/image-updation"}
                text={"Image Updation"}
                Icon={ServiceList}
                open={open}
                title={"Image Updation"}
              />
              <DrawerList
                path={"/student/certificate-setting"}
                text={"Certificate Setting"}
                Icon={ServiceList}
                open={open}
                title={"Certificate Setting"}
              />
              <DrawerList
                path={"/student/student-dynamic-report"}
                text={"Student Dynamic Report"}
                Icon={ServiceList}
                open={open}
                title={"Student Dynamic Report"}
              />
            </DrawerList>
            {/* Attendance */}
            <DrawerList
              path={"/attendance"}
              text={"Attendance"}
              Icon={AssignmentIcon}
              open={open}
            >
              <DrawerList
                path={"/attendance/attendance-entry"}
                text={"Attendance Entry"}
                Icon={ServiceList}
                open={open}
                title={"Attendance >> Attendance Entry"}
              />
              <DrawerList
                path={"/attendance/attendance-management"}
                text={"Attendance Management"}
                Icon={ServiceList}
                open={open}
                title={"Attendance >> Attendance Management"}
              />

              <DrawerList
                path={"/attendance/holiday-assigner"}
                text={"Holiday Assigner"}
                Icon={ServiceList}
                open={open}
                title={"Attendance >> Holiday Assigner"}
              />
              <DrawerList
                path={"/attendance/attendance-report"}
                text={"Attendance Report"}
                Icon={ServiceList}
                open={open}
                title={"Attendance >> Attendance Report"}
              />
              <DrawerList
                path={"/attendance/leave-approval"}
                text={"Leave Approval"}
                Icon={ServiceList}
                open={open}
                title={"Attendance >>Leave Approval"}
              />
            </DrawerList>
            {/* Staff */}
            <DrawerList
              path={"/staff"}
              text={"Staff"}
              Icon={ManageAccountsSharpIcon}
              open={open}
            >
              <DrawerList
                path={"/staff/staff-list"}
                text={"Staff List"}
                Icon={ServiceList}
                open={open}
                title={"Staff >> Staff List"}
              />
              <DrawerList
                path={"/staff/master"}
                text={"Master"}
                Icon={ServiceList}
                open={open}
                title={"Staff >> Master"}
              />
            </DrawerList>
            <DrawerList
              path={"/fee"}
              text={"Fee"}
              Icon={ManageAccountsSharpIcon}
              open={open}
            >
              <DrawerList
                path={"/fee/master"}
                text={"Master"}
                Icon={ServiceList}
                open={open}
                title={"Fee >> Master"}
              />
            </DrawerList>
          </List>
          <Divider />
        </Drawer>
      )}
    </>
  );
};

export default DrawerPath;

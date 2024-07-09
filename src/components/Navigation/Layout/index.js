import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerPath from "../Drawer";
import { useRouter } from "next/router";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HeaderText from "@/components/Header";
import {
  Badge,
  Breadcrumbs,
  Grid,
  ThemeProvider,
  createTheme,
  useMediaQuery,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import NotificationDropdown from "../Notification";
import UserDropdown from "../UserDropDown";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import DashboardCustomizeOutlined from "@mui/icons-material";
import { Link } from "mdi-material-ui";
import { useState } from "react";

const drawerWidth = 250;
const drawerWidth1 = 63;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginLeft: drawerWidth,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Layout({ children }) {
  const isMobile = useMediaQuery("(max-width:600px)"); // Adjust breakpoint as needed

  const [open, setOpen] = React.useState(false); // Initially set to false
  const router = useRouter();
  const [viewportWidth, setViewportWidth] =useState(window.innerWidth);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [ProfilePic, setProfilePic] = React.useState("");

  const handleResize = () => {
    setViewportWidth(window.innerWidth);
  };

  React.useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    // Close the drawer if viewport width is less than or equal to a certain value (e.g., 768 for mobile devices)
    if (viewportWidth <= 768) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [viewportWidth]);

  React.useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("Data"));
    setFirstName(storedData?.firstName);
    setLastName(storedData?.lastName === null ? "" : storedData?.lastName);
    setProfilePic(storedData?.profilePictureSlug);
    console.log("firstName", firstName);
    console.log("lastName", lastName);
  }, [firstName, lastName, ProfilePic]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  var pathName = router?.query?.title || router?.asPath || "";
  if (pathName === "/") {
    pathName = "Dashboard";
  }

  const pathWithoutQueryString = pathName.split("?")[0];
  const trimmedPath = pathWithoutQueryString.startsWith("/")
    ? pathWithoutQueryString.substring(1)
    : pathWithoutQueryString;
  const pathParts = trimmedPath
    .split(/\s*>>\s*|\s*\/\s*/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1));

  // const pathParts = pathName.split(/\s*>>\s*|\s*\/\s*/).map(part => part.charAt(0).toUpperCase() + part.slice(1));

  const theme = createTheme();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#F4F5FA",
        }}
      >
        <CssBaseline />
        <AppBar
          position="fixed"
          open={open}
          sx={{
            backgroundColor: "#151529 ",
            transition: (theme) =>
              theme.transitions.create(["background-color"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            ...(open && {
              marginLeft: drawerWidth,
              width: `calc(100% - ${drawerWidth - 10}px)`,
              transition: (theme) =>
                theme.transitions.create(["width", "margin"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
            }),
            ...(!open && {
              marginLeft: isMobile ? 0 : drawerWidth1,
              width: `calc(100% - ${isMobile ? 0 : drawerWidth1}px)`,
              transition: (theme) =>
                theme.transitions.create(["width", "margin"], {
                  easing: theme.transitions.easing.sharp,
                  duration: theme.transitions.duration.enteringScreen,
                }),
            }),
          }}
          className=" rounded-md"
        >
          <Toolbar className={`bg-[#ffffff]`}>
            <Grid className="flex text-center items-center w-[1100px]">
              <>
                {!open ? (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                      marginRight: 2,
                      ...(open && { display: "none" }),
                    }}
                  >
                    <MenuIcon className="text-white" />
                  </IconButton>
                ) : (
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerClose}
                    edge="start"
                    sx={{
                      marginRight: 2,
                      ...(!open && { display: "none" }),
                    }}
                  >
                    {/* <KeyboardDoubleArrowLeftIcon className="text-white" /> */}
                    <MenuIcon className="text-white" />
                  </IconButton>
                )}
                {/* <HeaderText title={'home'}/> */}
              </>
              {/* <Typography variant="h5" className="text-white capitalize whitespace-nowrap " style={{fontSize:'medium'}} >
                {pathName}
              </Typography> */}
              {/* <Grid container spacing={1} alignItems="center">
           {pathParts.map((part, index) => (
            <React.Fragment key={index}>
              {index > 0 && (
                 <Grid item>
                 <ChevronRightIcon className="text-white" />
                 </Grid>
        
                )}
      <Grid item>
        <Typography
          variant="h5"
          className={`capitalize whitespace-nowrap ${
            // index < part.length -1  ? "hover:underline text-blue-400 cursor-pointer " : "text-gray-400"
            // index === 3 ? 'text-gray-400' :  "hover:underline text-blue-400 cursor-pointer "
            index === pathParts.length - 1 ? 'text-gray-400' : 'hover:underline text-blue-400 cursor-pointer'
          }`}
          style={{ fontSize: "medium", textOverflow: "ellipsis", overflow: "hidden", maxWidth:'400px'}}
        >
          {part}
        </Typography>
          </Grid>
          </React.Fragment>
            ))}
    </Grid> */}

              {/* breadcrum start */}

              {pathParts
                .filter((part) => part.trim() !== "")
                .map((part, index) => {
                  let href = "/";

                  switch (part) {
                    case "Active":
                      href = "/salon/active";
                      break;
                    case "Salon Details":
                      href = "/salon/Details";
                      break;
                      case "Pending Combo":
                      href = "/salon/pending-combos"
                      break;
                      case "Pending-Offers":
                        href = "/salon/pending-offers"
                        break;
                    default:
                      href = "/";
                  }

                  // Check if it's the last part
                  const isLast = index === pathParts.length - 1;

                  return (
                    <React.Fragment key={index}>
                      {index !== 0 && (
                        <ChevronRightIcon className="text-white" />
                      )}
                      {pathParts.length === 1 ||
                      index !== pathParts.length - 1 ? (
                        <a
                          href={href}
                          style={{
                            color: "#60a5fa",
                            textDecoration: "underline",
                            fontSize: "medium",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            maxWidth: "400px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          <Typography
                            variant="h5"
                            style={{ fontSize: "medium" }}
                            color="inherit"
                          >
                            {part}
                          </Typography>
                        </a>
                      ) : (
                        <Typography
                          variant="h5"
                          style={{
                            color: "grey",
                            textDecoration: "none",
                            fontSize: "medium",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            maxWidth: "400px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {part}
                        </Typography>
                      )}

                      {/* {!isLast && <ChevronRightIcon className="text-white" />} */}
                    </React.Fragment>
                  );
                })}
              {/* breadcrum end*/}
            </Grid>

            <div
              className="flex items-end text-black gap-3 justify-end "
              style={{ marginLeft: "auto", marginRight: "10px" }}
            >
              <ThemeProvider theme={theme}>
                {/* <img
              src={"/images/Vector (1).png"}
              className="w-[16.5px] h-[16.5px] cursor-pointer mt-auto mb-auto"
                 />
                 <div style={{marginRight:'25px'}}><Badge badgeContent={8} color="error" overlap="circular"
        sx={{ ml: 2, cursor: "pointer"}}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}>
                     <NotificationDropdown color='action'/>
               </Badge></div> */}
              </ThemeProvider>
              <UserDropdown />
            </div>
          </Toolbar>
        </AppBar>
        {
          <DrawerPath
            viewportWidth={viewportWidth}
            open={open}
            handleDrawerClose={handleDrawerClose}
            handleDrawerOpen={handleDrawerOpen}
          />
        }
        <Box
          component="main"
          sx={{ flexGrow: 1, mt: 7, p: 3, width: "100%", overflow: "hidden" }}
        >
          {children}
        </Box>
      </Box>
    </>
  );
}

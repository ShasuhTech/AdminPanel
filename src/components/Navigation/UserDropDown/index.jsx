// ** React Imports
import { useState, Fragment, useEffect } from "react";

// ** Next Import
import { useRouter } from "next/router";

// ** MUI Imports
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

// ** Icons Imports
import CogOutline from "mdi-material-ui/CogOutline";
import CurrencyUsd from "mdi-material-ui/CurrencyUsd";
import EmailOutline from "mdi-material-ui/EmailOutline";
import LogoutVariant from "mdi-material-ui/LogoutVariant";
import AccountOutline from "mdi-material-ui/AccountOutline";
import MessageOutline from "mdi-material-ui/MessageOutline";
import HelpCircleOutline from "mdi-material-ui/HelpCircleOutline";
import { eraseCookie } from "@/utilities/cookies";
import { Cookies } from "@/config/cookies";

// ** Styled Components
const BadgeContentSpan = styled("span")(({ theme }) => ({
  width: 8,
  height: 8,
  borderRadius: "50%",
  backgroundColor: theme.palette.success.main,
  boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
}));

const UserDropdown = () => {
  // ** States
  const [anchorEl, setAnchorEl] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [ProfilePic, setProfilePic] = useState("");

  // ** Hooks
  const router = useRouter();

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("Data"));
    setFirstName(storedData?.firstName);
    setLastName(storedData?.lastName === null ? "" : storedData?.lastName);
    setProfilePic(storedData?.profilePictureSlug);
  }, [firstName, lastName, ProfilePic]);

  const handleDropdownOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = (url) => {
    if (url) {
      router.push(url);
    }
    setAnchorEl(null);
  };

  const handleProfilePage = () => {
    router.push("/profile");
    handleDropdownClose();
  };

  const styles = {
    py: 2,
    px: 4,
    width: "100%",
    display: "flex",
    alignItems: "center",
    color: "text.primary",
    textDecoration: "none",
    "& svg": {
      fontSize: "1.375rem",
      color: "text.secondary",
    },
  };

  return (
    <Fragment>
      <div className="profileDrop" onClick={handleDropdownOpen}>
        <div className="pro" style={{ position: "relative" }}>
          {/* <Avatar
            alt="John Doe"
            // onClick={handleDropdownOpen}
            sx={{ width: 32, height: 32 }}
            src={
              ProfilePic
                ? ProfilePic
                : `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0D8ABC&color=fff`
            }
          /> */}
          {/* <Badge
            overlap="circular"
            sx={{ ml: 2, cursor: "pointer" }}
            badgeContent={<BadgeContentSpan />}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            className="iconcercle"
          ></Badge> */}
        </div>
        {/* 
        <img
          src={"/images/ProfileText.png"}
          className="w-[90.36px] h-[37.5px] cursor-pointer mt-auto mb-auto"
        /> */}
        <div className="w-[90.36px] h-[37.5px] flex flex-col">
          <div className="h-[19.5px] text-[#495057] whitespace-nowrap">
            School Express
          </div>
          <div className="w-[49.48px] h-[18px] text-[#878A99]">Admin</div>
        </div>
      </div>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => handleDropdownClose()}
        sx={{ "& .MuiMenu-paper": { width: 230, marginTop: 4 } }}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Box sx={{ pt: 2, pb: 3, px: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {/* <Badge
              overlap="circular"
              badgeContent={<BadgeContentSpan />}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
              <Avatar
                alt="John Doe"
                src={
                  ProfilePic
                    ? ProfilePic
                    : `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0D8ABC&color=fff`
                }
                sx={{ width: "2.5rem", height: "2.5rem" }}
              />
            </Badge> */}
            <Box
              sx={{
                display: "flex",
                marginLeft: 3,
                alignItems: "flex-start",
                flexDirection: "column",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>
              School Express
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontSize: "0.8rem", color: "text.disabled" }}
              >
                Admin
              </Typography>
            </Box>
          </Box>
        </Box>
        <Divider sx={{ mt: 0, mb: 1 }} />
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}> */}
        <MenuItem sx={{ p: 0 }} onClick={() => handleProfilePage()}>
          <Box sx={styles}>
            <AccountOutline sx={{ marginRight: 2 }} />
            Profile
          </Box>
        </MenuItem>
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <EmailOutline sx={{ marginRight: 2 }} />
            Inbox
          </Box>
        </MenuItem>
        <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <MessageOutline sx={{ marginRight: 2 }} />
            Chat
          </Box>
        </MenuItem> */}
        {/* <Divider /> */}
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CogOutline sx={{ marginRight: 2 }} />
            Settings
          </Box>
        </MenuItem> */}
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <CurrencyUsd sx={{ marginRight: 2 }} />
            Pricing
          </Box>
        </MenuItem> */}
        {/* <MenuItem sx={{ p: 0 }} onClick={() => handleDropdownClose()}>
          <Box sx={styles}>
            <HelpCircleOutline sx={{ marginRight: 2 }} />
            FAQ
          </Box>
        </MenuItem> */}
        <Divider />
        <MenuItem
          sx={{ py: 2 }}
          onClick={() => {
            eraseCookie(Cookies.TOKEN);
            window.location.reload();
          }}
        >
          <LogoutVariant
            sx={{
              marginRight: 2,
              fontSize: "1.375rem",
              color: "text.secondary",
            }}
          />
          Logout
        </MenuItem>
      </Menu>
    </Fragment>
  );
};

export default UserDropdown;

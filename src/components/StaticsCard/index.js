// ** React Imports
import React from "react";

// ** MUI Imports
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";

// ** Icons Imports
import TrendingUp from "mdi-material-ui/TrendingUp";
import CurrencyUsd from "mdi-material-ui/CurrencyUsd";
import DotsVertical from "mdi-material-ui/DotsVertical";
import CellphoneLink from "mdi-material-ui/CellphoneLink";
import AccountOutline from "mdi-material-ui/AccountOutline";
import { Divider } from "@mui/material";
import CancelIcon from '@mui/icons-material/Cancel';
// ** Types
// Importing ThemeColor not required in JavaScript

const salesData = [
  {
    stats: "100k",
    title: "Total Orders",
    color: "primary",
    icon: React.createElement(TrendingUp, { sx: { fontSize: "1.75rem" } }),
  },
  {
    stats: "12.5k",
    title: "Completed Orders",
    color: "success",
    icon: React.createElement(AccountOutline, { sx: { fontSize: "1.75rem" } }),
  },
  {
    stats: "1.54k",
    color: "secondary",
    title: "Pending Orders",
    icon: React.createElement(CellphoneLink, { sx: { fontSize: "1.75rem" } }),
  },
  {
    stats: "$88k",
    color: "info",
    title: "Ongoing Orders",
    icon: React.createElement(CurrencyUsd, { sx: { fontSize: "1.75rem" } }),
  },
  {
    stats: "$88k",
    color: "warning",
    title: "Cancelled Orders",
    icon: React.createElement(CancelIcon, { sx: { fontSize: "1.75rem" } }),
  },
];

const renderStats = () => {
  return salesData.map((item, index) => (
    <Grid item xs={12} sm={5} key={index}>
      <Box key={index} sx={{ display: "flex", alignItems: "center",border:'1px solid',padding:'40px' }}>
        <Avatar
          variant="rounded"
          sx={{
            mr: 2,
            width: 44,
            height: 44,
            boxShadow: 3,
            color: "common.white",
            backgroundColor: `${item.color}.dark`,
          }}
        >
          {item.icon}
        </Avatar>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="H4">{item.title}</Typography>
          <Typography variant="h6">{item.stats}</Typography>
        </Box>
      </Box>
    </Grid>
  ));
};

const StatisticsCard = () => {
  return (
    <Card>
      <CardHeader
        title="Order Deatils"
        action={
          <IconButton
            size="small"
            aria-label="settings"
            className="card-more-options"
            sx={{ color: "text.secondary" }}
          >
            <DotsVertical />
          </IconButton>
        }
        subheader={
          <Divider />
          //   <Typography variant='body2'>
          //     <Box component='span' sx={{ fontWeight: 600, color: 'text.primary' }}>
          //       Total 48.5% growth
          //     </Box>{' '}
          //     😎 this month
          //   </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2.5,
            lineHeight: "2rem !important",
            letterSpacing: "0.15px !important",
          },
        }}
      />
      <CardContent sx={{ pt: (theme) => `${theme.spacing(3)} !important` }}>
        <Grid container spacing={[5, 0]}>
          {renderStats()}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default StatisticsCard;

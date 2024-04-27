import { Typography } from "@mui/material";
import React from "react";

const HeaderText = ({ title }) => {
  return (
    <Typography variant="h5" className="text-black">
      {title}
    </Typography>
  );
};

export default HeaderText;

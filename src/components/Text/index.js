import { Typography } from "@mui/material";
import React from "react";

const CommonText = ({
  showText,
  fontSize,
  children,
  fontWeight,
  onPress,
  color,
}) => {
  // Define styles based on props
  const styles = {
    fontWeight: fontWeight ? fontWeight : 'medium',
    color: color || 'black',
    fontSize:  '18px'
  };

  return (
    <p
      onPress={onPress}
      style={styles}
      className="p-0 m-0"
    >
      {showText || children}
    </p>
  );
};

export default CommonText;

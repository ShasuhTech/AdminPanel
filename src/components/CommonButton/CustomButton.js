import { bgcolor } from "@mui/system";
import React from "react";
import { Colors } from "../Colors";

const CustomButton = ({ onClick, children, disabled, bgColor, py, px,width }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`filter-btn ${
        bgColor ? `bg-${'#000'}` : "bg-blue-500"
      } rounded-md ${py ? `py-${py}` : "py-2.5"} ${
        px ? `px-${px}` : "px-7"
      } text-white font-bold`}

      style={bgcolor?{backgroundColor:bgcolor,width:width||'150px'}:{backgroundColor:Colors.blueColor,width:width||'150px'}}
    >
      {children}
    </button>
  );
};

export default CustomButton;

import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Magnify from "mdi-material-ui/Magnify";
import { Tooltip } from "@mui/material";

const QuickSearchToolbar = (props) => {
  const handleFilterClick = () => {
    if (props.onFilterClick) {
      props.onFilterClick();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleFilterClick();
    }
  };

  return (
    <Box
      sx={
        props.rootSx || {
          p: !props.isNotDataGrid ? 2 : 0,
          pb: 0,
          display: "flex",
          flexWrap: "wrap",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginLeft: props.isNotDataGrid ? 4 : 2,
        }
      }
    >
      <Tooltip title={props?.title ? props?.title : "Search by Name & Id"}>
        <TextField
          variant={"standard"}
          value={props.value}
          onChange={props.onChange}
          className="searchinput"
          placeholder={props?.title ? props?.title : "Search by Name & Id"}
          InputProps={{
            startAdornment: (
              <Magnify
                style={{ cursor: "pointer" }}
                fontSize="small"
                onClick={handleFilterClick}
              />
            ),
          }}
          onKeyDown={handleKeyDown}
          sx={{
            width: props.width
              ? "100%"
              : {
                  xs: 1,
                  sm: 250,
                },
          }}
        />
      </Tooltip>
    </Box>
  );
};

export default QuickSearchToolbar;

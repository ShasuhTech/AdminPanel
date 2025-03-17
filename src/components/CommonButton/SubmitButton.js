import { Button } from "@mui/material";
import React from "react";

const SubmitButton = ({children}) => {
  return (
    <Button
      className="border w-[120px] py-2.5"
      sx={{ py: 1, bgcolor: "rgb(59 130 246 )", fontWeight: "bold" }}
      type="submit"
      variant="contained"
      color="primary"
    >
     {children||"Submit"}
    </Button>
  );
};

export default SubmitButton;

import { Grid, TextField, Typography } from "@mui/material";
import React from "react";

const TextInput = ({
  label,
  value,
  required,
  onChange,
  variant,
  error,
  errorName,
  
}) => {
  return (
    <Grid item xs={5.8} gap={2}>
      <TextField
        fullWidth
        label={label}
        value={value}
        required={required}
        onChange={onChange}
        variant={variant || "outlined"}
      />
      {error && <Typography className="text-red-500 ">{errorName}</Typography>}
    </Grid>
  );
};

export default TextInput;

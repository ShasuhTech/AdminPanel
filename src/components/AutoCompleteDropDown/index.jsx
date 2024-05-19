import { Autocomplete, TextField } from "@mui/material";
import React from "react";

const AutoCompleteDropDown = ({
  id,
  name,
  options,
  getOptionLabel,
  value,
  onChange,
  onBlur,
  label,
  error,
  helperText,
  required,
  labelSize
}) => {

    const inputLabelProps = labelSize ? { style: { fontSize: 16 } } : { style: { fontSize: 16,fontWeight:'700' } };


  return (
    <>
      <Autocomplete
        id={id}
        name={name}
        options={options}
        getOptionLabel={getOptionLabel}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            error={error}
            helperText={helperText}
            required={required}
            fullWidth
            InputLabelProps={inputLabelProps}
          />
        )}
      />
    </>
  );
};

export default AutoCompleteDropDown;

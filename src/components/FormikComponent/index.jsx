import React from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDayjs from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const TextFieldComponent = ({
  field,
  form: { touched, errors },
  disabled,
  ...props
}) => (
  <TextField
    {...field}
    {...props}
    error={touched[field.name] && Boolean(errors[field.name])}
    helperText={touched[field.name] && errors[field.name]}
    variant="outlined"
    fullWidth
    disabled={disabled}
    margin="normal"
  />
);

const DatePickerField = ({ field, form, ...props }) => {
  const currentError = form.errors[field.name];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl required fullWidth margin="normal">
        <DatePicker
          {...field}
          {...props}
          inputFormat="MM/dd/yyyy"
          value={field.value ? dayjs(field.value) : null}
          onChange={(newValue) => {
            form.setFieldValue(field.name, newValue ? dayjs(newValue) : null);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              error={Boolean(currentError)}
              helperText={currentError}
              variant="outlined"
            />
          )}
        />
      </FormControl>
    </LocalizationProvider>
  );
};

const SelectField = ({ field, form, label, options, ...props }) => (
  <FormControl fullWidth margin="normal">
    <InputLabel>{label}</InputLabel>
    <Select
      fullWidth
      {...field}
      {...props}
      label={label}
      // value={field.value || ""}
    >
      {options?.map((option) => (
        <MenuItem
          fullWidth
          key={option.value || option.name || option || option.label}
          value={option?.value || option?.name || option || option?.label}
        >
          {option?.label || option?.name || option || option?.value}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const SelectFieldState = ({
  field,
  form,
  label,
  options,
  setAddressState,
  ...props
}) => {
  const handleChange = (event) => {
    const value = event.target.value;
    setAddressState(value);
    // Update the field value manually
    form.setFieldValue(field.name, value);
  };

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        fullWidth
        {...field}
        {...props}
        label={label}
        value={field.value || ""}
        onChange={handleChange}
      >
        {options?.map((option) => (
          <MenuItem
            fullWidth
            key={option.value || option.name || option}
            value={option.value || option.name || option}
          >
            {option.label || option.name || option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export { TextFieldComponent, DatePickerField, SelectField, SelectFieldState };

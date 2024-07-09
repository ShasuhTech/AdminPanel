import CustomButton from "@/components/CommonButton/CustomButton";
import Config from "@/utilities/Config";
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React, { useState } from "react";

const names = [];
const BulkAttendance = () => {
  const [addmissionDate, setaddmissionDate] = useState(new Date());
  const [personName, setPersonName] = React.useState([]);
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };
  const ITEM_HEIGHT = 150;
  const ITEM_PADDING_TOP = -10;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  Config.ClassList.forEach((classItem) => {
    Config.SectionList.forEach((sectionItem) => {
      names.push(`${classItem.value}-${sectionItem.value}`);
    });
  });
  return (
    <div className="mt-10">
      <Typography className="text-red-500 mb-4">
        NOTE: Attendance will be marked as Present for selected classes only
        apart from the students whose Adm. no. entered in Absent Adm No. field,
        their Attendance will be marked as Absent.
      </Typography>
      <Grid className="flex items-center justify-between gap-5 my-5">
        <DatePicker
          label="Date"
          value={null}
          fullWidth
          className="w-[100%]"
          onChange={(newValue) => {
            setaddmissionDate(newValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              fullWidth
              // required
              error={false}
              // helperText={<ErrorMessage name="dob" />}
            />
          )}
        />
        <FormControl sx={{ width: "100%" }}>
          <InputLabel id="demo-multiple-checkbox-label">
            Select Class and Section
          </InputLabel>

          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={personName}
            onChange={handleChange}
            input={<OutlinedInput label="Select Class and Section" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={personName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>

      <Grid className="my-2">
        <TextField
          multiline={3}
          placeholder=""
          label="Enter Adm No. of Absent Students in Selected Class only"
          fullWidth
        />
      </Grid>
      <Typography className="text-red-500 my-4">
        Adm No. must be entered in comma seperated like 5771,5572
      </Typography>

      <Grid className="flex justify-end mt-10 mb-5">
        <CustomButton>Submit</CustomButton>
      </Grid>
    </div>
  );
};

export default BulkAttendance;
// Adm No. must be entered in comma seperated like 5771.5572
// Enter Adm No. of Absent Students in Selected Class only

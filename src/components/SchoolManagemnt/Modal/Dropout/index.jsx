import SimpleModal from "@/components/Modal/SimpleModal";
import Config from "@/utilities/Config";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const DropOutModal = ({ open, handleClose, data }) => {
  console.log(data, "===ddsd");
  const [selectRollNo, setSelectRollNo] = useState();
  const [value, setValue] = React.useState("1");
  const [dropOutDate, setDropOutDate] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <SimpleModal open={open} handleClose={handleClose} width={900}>
      <div className="flex flex-col items-center justify-center">
        Drop Out Details
      </div>
      <Grid container spacing={2} sx={{ py: 2, px: 2, alignItems: "center" }}>
        <Grid item xs={12} sm={12} md={4}>
          <Typography>Admission No</Typography>
          <Typography className="border  py-4 px-2 rounded-lg">
            {data?.admission_number}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography>Name</Typography>
          <Typography className="border  py-4 px-2 rounded-lg">
            {(
              (data?.name?.first_name || "") +
              " " +
              (data?.name?.middle_name || "") +
              " " +
              (data?.name?.last_name || "")
            ).trim()}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Typography>Class - Section</Typography>
          <Typography className="border  py-4 px-2 rounded-lg">
            {data?.class + " - " + data?.section}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <DatePicker
            label="Dropout Date"
            value={dropOutDate}
            fullWidth
            className="w-[100%]"
            onChange={(newValue) => {
              setDropOutDate(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                fullWidth
                // required
                // error={false}
                // helperText={<ErrorMessage name="dob" />}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="Reason"
            variant="outlined"
            required
          />
        </Grid>
      </Grid>
      <Grid className="flex gap-2 justify-end">
        <Button variant="contained" size="large">
          Save
        </Button>
        <Button variant="contained" size="large">
          Back To Institute
        </Button>
      </Grid>
      
    </SimpleModal>
  );
};

export default DropOutModal;

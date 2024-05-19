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

const TransferCertificate = ({ open, handleClose, data }) => {
  console.log(data, "===ddsd");
  const [selectRollNo, setSelectRollNo] = useState();
  const [value, setValue] = React.useState("1");
  const [dropOutDate, setDropOutDate] = useState();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <SimpleModal open={open} handleClose={handleClose} width={900}>
      <div className="flex flex-col text-[20px]">
        Transfer Certificate
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
        <Grid item xs={12} sm={12} md={4}>
          <DatePicker
            label="Apply Date"
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
        <Grid item xs={12} sm={12} md={4}>
          <DatePicker
            label="TC Date"
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
        <Grid item xs={12} sm={12} md={12}>
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
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="Work Day"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="Attendance"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="Stud. Charancter"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="Last Exam"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="NCC Details"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="Sub Studied"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="Additional Subject"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="Failed"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="Next School"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
        <DatePicker
            label="Last Fee Paid Date"
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
        <Grid item xs={12} sm={12} md={4}>
        <DatePicker
            label="Dues Clear Date"
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
        <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Promotion</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectRollNo}
                label="Class"
                onChange={(e) => setselectRollNo(e.target.value)}
              >
                {Config.ClassList.map((item, ind) => (
                  <MenuItem key={ind} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        <Grid item xs={12} sm={6} md={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Promoted Class</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectRollNo}
                label="Class"
                onChange={(e) => setselectRollNo(e.target.value)}
              >
                {Config.ClassList.map((item, ind) => (
                  <MenuItem key={ind} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="Games Played"
            variant="outlined"
            required
          />
        </Grid>
          <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="Progress in Studies"
            variant="outlined"
            required
          />
        </Grid>
          

          <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="Progress in Studies"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="Fee paid Remark"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="Office Incharge"
            variant="outlined"
            required
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <TextField
            fullWidth
            value={selectRollNo}
            onChange={(e) => setSelectRollNo(e.target.value)}
            id="outlined-basic"
            label="Remark"
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



export default TransferCertificate;



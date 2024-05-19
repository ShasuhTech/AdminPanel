import SimpleModal from "@/components/Modal/SimpleModal";
import Config from "@/utilities/Config";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const StudentDetails = ({ open, handleClose, data }) => {
  const [academicSession, setAcademicSession] = useState();
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <SimpleModal open={open} handleClose={handleClose} width={900}>
      <div className="flex flex-col items-center justify-center">
        Student Details
      </div>
      <Grid>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">
            Academic Session
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={academicSession}
            label="Academic Session"
            fullWidth
            onChange={(e) => setAcademicSession(e.target.value)}
          >
            {Config.SectionList.map((item, ind) => (
              <MenuItem key={ind} value={item.label}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example" sx={{fontSize:'40px'}}>
              <Tab label="Fees" value="1" />
              <Tab label="Attendance" value="2" />
              <Tab label="Exam" value="3" />
              <Tab label="Library" value="4" />
            </TabList>
          </Box>
          <TabPanel value="1">Fees</TabPanel>
          <TabPanel value="2">Attendance</TabPanel>
          <TabPanel value="3">Exam</TabPanel>
          <TabPanel value="4">Library</TabPanel>
        </TabContext>
      </Box>
    </SimpleModal>
  );
};

export default StudentDetails;

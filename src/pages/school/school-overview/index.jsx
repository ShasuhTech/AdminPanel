"use client";
import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  CircularProgress,
  TablePagination,
  MenuItem,
  Select,
  Menu,
  IconButton,
  InputLabel,
  TextField,
  Button,
  Checkbox,
  ListItemText,
} from "@mui/material";
import {
  GetStudentLsit,
  addServices,
  adminCategory,
  serviceList,
} from "@/services/api";
import QuickSearchToolbar from "@/components/SearchBar";
import { toast } from "react-toastify";
import { exportToCSV } from "@/components/Common";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import CustomButton from "@/components/CommonButton/CustomButton";
import FormControl from "@mui/material/FormControl";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import { Plus } from "mdi-material-ui";
import { useQuery } from "react-query";
import moment from "moment";
import StudentDetails from "@/components/SchoolManagemnt/Modal/DetailsModal";
import Config from "@/utilities/Config";
import YearWiseDetails from "./yearwise-details";
import SchoolOverviewData from "./detailstable";

const SchoolOverview = () => {
  const [searchText, setSearchText] = useState("");
  const router = useRouter();

  const {
    data: studentData,
    status: studentStatus,
    isLoading: studentLoading,
    refetch: studentRefetch,
  } = useQuery("studentData", async () => {
    const res = await GetStudentLsit();
    console.log(res, "---sdf");
    return res?.data;
  });
  const [studentDetailsModal, setstudentDetailsModal] = useState(false);
  const handleclose = () => {
    setstudentDetailsModal(false);
  };
  const handleOpen = () => {
    setstudentDetailsModal(true);
  };
  const [selectClass, setSelectClass] = useState();
  const [selectSection, setSelectSection] = useState();
  const [selectRollNo, setSelectRollNo] = useState();
  const [priorities, setPriorities] = useState([]);

  // Function to handle changes in selection
  const handlePriorityChange = (event) => {
    const {
      target: { value },
    } = event;
    setPriorities(typeof value === "string" ? value.split(",") : value);
  };

  // useEffect to perform an action whenever priorities change
  useEffect(() => {
    if (priorities.length > 0) {
      console.log(`Priorities changed to: ${priorities.join(", ")}`);
      // You can replace the console.log with any other logic you need to execute
    }
  }, [priorities]);
  return (
    <div className="">
      <div sx={{ marginTop: "5rem" }} style={{ backgroundColor: "#fff" }}>
        <Grid container spacing={2} sx={{ py: 2, px: 2, alignItems: "center" }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Class</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectClass}
                label="Class"
                onChange={(e) => setSelectClass(e.target.value)}
              >
                {Config.ClassList.map((item, ind) => (
                  <MenuItem key={ind} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
         
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="priority-multiple-select-label">
                Priorities
              </InputLabel>
              <Select
                labelId="priority-multiple-select-label"
                id="priority-multiple-select"
                multiple
                label="Priorities"
                value={priorities}
                onChange={handlePriorityChange}
                renderValue={(selected) => selected.join(", ")}
              >
                {[1, 2, 3, 4, 5, 6].map((level) => (
                  <MenuItem key={level} value={level}>
                    <Checkbox checked={priorities.indexOf(level) > -1} />
                    <ListItemText primary={`Priority ${level}`} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">School</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectClass}
                label="Class"
                onChange={(e) => setSelectClass(e.target.value)}
              >
                {Config.ClassList.map((item, ind) => (
                  <MenuItem key={ind} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={1}>
            <Button variant="contained" size="large">
              Submit
            </Button>
          </Grid>
          <Grid item xs={12} sm={12} md={1}>
            <Button variant="contained" size="large" color="error">
              Reset
            </Button>
          </Grid>
        </Grid>
        <Grid className="mb-4">
          <Typography variant="h5" sx={{mb:1,mt:2}}>Year Wise Details</Typography>
        <YearWiseDetails />
        </Grid>
        <Grid className="mb-4">
          <Typography variant="h5" sx={{mb:1,mt:2}}>OverView Details</Typography>
        <SchoolOverviewData />
        </Grid>
      
      </div>{" "}
    </div>
  );
};

export default SchoolOverview;


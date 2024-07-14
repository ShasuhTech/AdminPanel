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
  MenuItem,
  Select,
  InputLabel,
  TextField,
  Button,
  Checkbox,
  Tooltip,
} from "@mui/material";
import { GetStudentLsit } from "@/services/api";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import FormControl from "@mui/material/FormControl";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import Config from "@/utilities/Config";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { addAttendance, addMarkAttendance } from "@/services/Attendance";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const ClassWiseAttendance = () => {
  const router = useRouter();
  const [selectClass, setSelectClass] = useState();
  const [selectSection, setSelectSection] = useState();
  const [allMarkDone, setAllMarkDone] = useState(false);
  const [allSmsDone, setAllSmsDone] = useState(false);
  const [markedAttendance, setMarkedAttendance] = useState([]);
  const [markedSms, setMarkedSms] = useState([]);
  const [selectDate, setSelectDate] = useState(dayjs(new Date()));

  const [updatedAttendance, setUpdatedAttendance] = useState({});



  const handleAllMarkDoneChange = (e) => {
    const checked = e.target.checked;
    setAllMarkDone(checked);
    setMarkedAttendance(
      checked ? studentData.map((student) => student._id) : []
    );
  };

  const handleAllSmsDoneChange = (e) => {
    const checked = e.target.checked;
    setAllSmsDone(checked);
    setMarkedSms(checked ? studentData.map((student) => student._id) : []);
  };

  const handleAttendanceChange = (id, checked) => {
    if (checked) {
      setMarkedAttendance((prev) => [...prev, id]);
    } else {
      setMarkedAttendance((prev) => prev.filter((item) => item !== id));
      setAllMarkDone(false);
    }
  };

  const handleSmsChange = (id, checked) => {
    if (checked) {
      setMarkedSms((prev) => [...prev, id]);
    } else {
      setMarkedSms((prev) => prev.filter((item) => item !== id));
      setAllSmsDone(false);
    }
  };

  const { mutate, data:studentData, error, isLoading:studentLoading } = useMutation(addAttendance);

  const filterHandler = () => {
    if (selectClass && selectSection && selectDate) {
      const payload = {
        class: selectClass,
        section: selectSection,
        date: selectDate,
      };
      mutate(payload);
    }else{
      toast.error("Please select all the fields");
    }
  };

  const { mutate:mutateMark, data:markData, errormarkError, isLoading:markLoading } = useMutation(addMarkAttendance);

  const handleSubmit = () => {
    if(markedAttendance&&selectDate){
      const payload = {
        studentIds: markedAttendance,
        markedSms: markedSms,
        date: selectDate
      };
      mutateMark(payload);
      filterHandler()
    }else{
      toast.error("Please select all the fields");
    }
  };


  const handleAttendanceMArkChange = (studentId, feeGroup) => {
    console.log(studentId, feeGroup, 'studentId, feeGroup');
    setUpdatedAttendance(prev => ({ ...prev, [studentId]: feeGroup }));
  };

  useEffect(() => {
    if (studentData) {
      const initialFeeGroups = {};
      studentData.forEach(student => {
        initialFeeGroups[student._id] = student.fee_group || "";
      });
      setUpdatedAttendance(initialFeeGroups);
    }
  }, [studentData]);

  return (
    <div className="">
      <div sx={{ marginTop: "5rem" }} style={{ backgroundColor: "#fff" }}>
        <Grid container spacing={2} sx={{ py: 2, px: 2, alignItems: "center" }}>
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="Date"
              value={selectDate}
              fullWidth
              className="w-[100%]"
              onChange={(newValue) => {
                setSelectDate(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  fullWidth
                  error={false}
                />
              )}
            />
          </Grid>
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
              <InputLabel id="demo-simple-select-label">Section</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectSection}
                label="Section"
                onChange={(e) => setSelectSection(e.target.value)}
              >
                {Config.SectionList.map((item, ind) => (
                  <MenuItem key={ind} value={item.label}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={12} md={3}>
            <Button variant="contained" size="large" onClick={filterHandler} disabled={studentLoading}>
            {studentLoading ? 'Loading...' : 'Student List'}
            </Button>
            {error && <div className="text-red-500">Error fetching data</div>}
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="center">Roll No</StyledTableCell>
                  <StyledTableCell align="center">Name</StyledTableCell>
                  <StyledTableCell align="center">Admission No</StyledTableCell>
                  <StyledTableCell align="center">
                    Attendance{" "}
                    <Tooltip title="Select All">
                      <Checkbox
                        checked={allMarkDone}
                        onChange={handleAllMarkDoneChange}
                      />
                    </Tooltip>
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">Remark</StyledTableCell> */}
                  <StyledTableCell align="center">
                    Send SMS{" "}
                    <Tooltip title="Select All">
                      <Checkbox
                        checked={allSmsDone}
                        onChange={handleAllSmsDoneChange}
                      />
                    </Tooltip>
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody style={{ height: "auto", position: "relative" }}>
                {studentLoading ? (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <div
                        style={{
                          position: "relative",
                          height: "200px",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <CircularProgress />
                      </div>
                    </TableCell>
                  </TableRow>
                ) : studentData?.length > 0 ? (
                  <>
                    {studentData?.map((row, index) => (
                      <Row
                        key={index}
                        row={row}
                        index={index}
                        router={router}
                        handleAttendanceChange={handleAttendanceChange}
                        handleSmsChange={handleSmsChange}
                        markedAttendance={markedAttendance}
                        markedSms={markedSms}
                        handleAttendanceMArkChange={handleAttendanceMArkChange}
                        currentAttendanceStatus={updatedAttendance[row._id] || ""}
                      />
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={12}>
                      <div
                        style={{
                          position: "relative",
                          height: "200px",
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        No Data Found
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid className="flex items-center justify-end p-8">
            <Button variant="contained" size="large" onClick={handleSubmit}>
              Submit
            </Button>
          </Grid>
        </Paper>
      </div>
    </div>
  );
};

export default ClassWiseAttendance;

const Row = (props) => {
  const {
    row,
    index,
    router,
    handleAttendanceChange,
    handleSmsChange,
    markedAttendance,
    markedSms,
    handleAttendanceMArkChange,
    currentAttendanceStatus
  } = props;

  const isAttendanceChecked = markedAttendance.includes(row._id);
  const isSmsChecked = markedSms.includes(row._id);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            fontWeight: "600",
            color: "#000",
            overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "250px" }}>
          <Typography>
            {(
              (row?.name?.first_name || "") +
              " " +
              (row?.name?.middle_name || "") +
              " " +
              (row?.name?.last_name || "")
            ).trim()}
          </Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "250px" }}>
          <Typography>{row?.admission_number}</Typography>
        </StyledTableCell>
        {/* <StyledTableCell key={row._id} align="center" style={{ minWidth: "200px" }}>
          {!row?.attendance_marked?<Checkbox
            checked={markedAttendance.includes(row._id)}
            onChange={(e) => handleAttendanceChange(row._id, e.target.checked)}
          />:<Typography>Present</Typography>}
        </StyledTableCell> */}
        <StyledTableCell key={row._id} align="center" style={{ minWidth: "200px" }}>
        <FormControl fullWidth>
            <InputLabel id="fee-group-select-label">Attendance Type</InputLabel>
            <Select
              labelId="fee-group-select-label"
              id="fee-group-select"
              value={currentAttendanceStatus}
              label="Attendance Type"
              onChange={(e) => handleAttendanceMArkChange(row._id, e.target.value)}
            >
              {Config?.AttendanceType?.map((item, ind) => (
                <MenuItem key={ind} value={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </StyledTableCell>

        

        {/* <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Typography>{"Remark"}</Typography>
        </StyledTableCell> */}
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Checkbox
            checked={isSmsChecked}
            onChange={(e) => handleSmsChange(row._id, e.target.checked)}
          />
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

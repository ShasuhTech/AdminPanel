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
  FormControlLabel,
} from "@mui/material";
import { GetStudentLsit } from "@/services/api";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import SimpleModal from "@/components/Modal/SimpleModal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import * as Yup from "yup";
import Config from "@/utilities/Config";

const TimeSlotMaster = () => {
  const [searchText, setSearchText] = useState("");
  const [folloeupModeModal, setFolloeupModeModal] = useState(false);
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
  const handleclose = () => {
    setFolloeupModeModal(false);
  };
  const handleOpen = () => {
    setFolloeupModeModal(true);
  };


  return (
    <div className="">
      <div sx={{ marginTop: "5rem" }} style={{ backgroundColor: "#fff" }}>
        <Grid container spacing={2} sx={{ py: 2, px: 2, alignItems: "center" }}>
          <Grid item xs={12} sm={12} md={12} className="flex gap-2 justify-end">
            <Button variant="contained" onClick={handleOpen} size="large">
              Add Time Slot
            </Button>
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="left">Sl.No</StyledTableCell>
                  <StyledTableCell align="left">Slot Name</StyledTableCell>
                  <StyledTableCell align="left">Class</StyledTableCell>
                  <StyledTableCell align="left">Date</StyledTableCell>
                  <StyledTableCell align="left">Slot Time</StyledTableCell>
                  <StyledTableCell align="left">End Tiem</StyledTableCell>
                  <StyledTableCell align="left">Number Of Student</StyledTableCell>
                  <StyledTableCell align="left">Total Schedule</StyledTableCell>
                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                  height: "auto",
                  position: "relative",
                }}
              >
                {false ? (
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
                ) : true ? (
                  <>
                    {[1, 1, 1, 1]?.map((row, index) => (
                      <Row
                        key={index}
                        row={row}
                        index={index}
                        router={router}
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
        </Paper>
      </div>{" "}
      <TimeSlotModal open={folloeupModeModal} handleClose={handleclose} />
     
    </div>
  );
};

export default TimeSlotMaster;

const Row = (props) => {
  const { row, salonDetails, setSalonDetails, index, router } = props;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            background: open ? "#E5EFFC" : "",
            fontWeight: "600",
            color: "#000",
            overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "100px" }}>
          <Typography>{"1"}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{"10"}</Typography>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{"01/07/2023"}</Typography>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{"10:00 AM"}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "100px" }}>
        <Typography>{"10:00 AM"}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{"2"}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{"0"}</Typography>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "200px", gap: 2 }}>
          <Button variant="outlined">Edit</Button>
          <Button sx={{ marginLeft: "10px" }} variant="outlined" color="error">
            Delete
          </Button>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

const TimeSlotModal = ({ open, handleClose }) => {
  return (
    <SimpleModal open={open} handleClose={handleClose}>
      <Typography variant="h5">Time Slot</Typography>

      <Formik
        initialValues={{
          name: "",
          email: "",
          date: null,
          time: null,
          Class: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          date: Yup.date().required("Required"),
          time: Yup.date().required("Required"),
        })}
        validateOnBlur
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          isSubmitting,
          status,
          handleChange,
          handleBlur,
          values,
          setFieldValue,
          errors,
          touched,
        }) => (
          <Form>
            <Grid container spacing={2} mt={2}>
            <Grid item xs={12} sm={12} md={6} className="">
                <DatePicker
                  label="Date"
                  name="date"
                  fullWidth
                  className="w-[100%]"
                  inputFormat="MM/dd/yyyy"
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
                <ErrorMessage name="date" component="div" />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="class"
                  as={TextField}
                  select
                  label="Class"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  value={values.class}
                  helperText={<ErrorMessage name="class" />}
                >
                  {Config?.ClassList.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={12} sm={12} md={6} className="">
              <TimePicker
                  label="Start Time"
                  name="time"
                  className="w-[100%]"
                  renderInput={(params) => <TextField {...params} />}
                />
                <ErrorMessage name="time" component="div" />
              </Grid>
              <Grid item xs={12} sm={12} md={6} className="">
              <TimePicker
                  label="End Time"
                  name="time"
                  className="w-[100%]"
                  renderInput={(params) => <TextField {...params} />}
                />
                <ErrorMessage name="time" component="div" />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="first_name"
                  as={TextField}
                  label="Slot Name"
                  variant="outlined"
                  // required
                  value={values.first_name}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  helperText={<ErrorMessage name="first_name" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="first_name"
                  as={TextField}
                  label="No Of Student"
                  variant="outlined"
                  // required
                  value={values.first_name}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  helperText={<ErrorMessage name="first_name" />}
                />
              </Grid>
              
              <Grid item xs={12} sx={{display:'flex',justifyContent:'flex-end'}}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </SimpleModal>
  );
};



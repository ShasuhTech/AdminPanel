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
  TextField,
  Button,
} from "@mui/material";
import {
  AddTimeSlot,
  DeleteTimeSlotId,
  GetTimeSlotList,
  updateTimeSlot,
} from "@/services/api";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import SimpleModal from "@/components/Modal/SimpleModal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

import * as Yup from "yup";
import Config from "@/utilities/Config";
import { toast } from "react-toastify";
import moment from "moment";
import dayjs from "dayjs";
import SubmitButton from "@/components/CommonButton/SubmitButton";

const TimeSlotMaster = () => {

  const [folloeupModeModal, setFolloeupModeModal] = useState(false);
  const [selectedRow, setselectedRow] = useState("");
  const router = useRouter();
  const {
    data: timeslotData,
    isLoading: timeslotLoading,
    refetch: timeslotRefetch,
  } = useQuery("GetTimeSlotList", async () => {
    const res = await GetTimeSlotList();
    return res?.data;
  });
  const handleclose = () => {
    setFolloeupModeModal(false);
    timeslotRefetch();
  };
  const handleOpen = () => {
    setFolloeupModeModal(true);
    setselectedRow("");
  };

  const deleteHoliday = async (id) => {
    alert("Are You sure you want to delete");
    try {
      const res = await DeleteTimeSlotId(id);
      if (res?.success) {
        timeslotRefetch();
        toast.success("Successfully Deleted...");
      }
    } catch (error) {}
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
                  <StyledTableCell align="left">
                    Number Of Student
                  </StyledTableCell>
                  {/* <StyledTableCell align="left">Total Schedule</StyledTableCell> */}
                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                  height: "auto",
                  position: "relative",
                }}
              >
                {timeslotLoading ? (
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
                ) : timeslotData?.length > 0 ? (
                  <>
                    {timeslotData?.map((row, index) => (
                      <Row
                        key={index}
                        row={row}
                        index={index}
                        router={router}
                        deleteHoliday={deleteHoliday}
                        setselectedRow={setselectedRow}
                        setFolloeupModeModal={setFolloeupModeModal}
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
      <TimeSlotModal
        open={folloeupModeModal}
        handleClose={handleclose}
        selectedRow={selectedRow}
      />
    </div>
  );
};

export default TimeSlotMaster;

const Row = (props) => {
  const {
    row,
    index,
    deleteHoliday,
    setselectedRow,
    setFolloeupModeModal,
  } = props;

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
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "100px" }}>
          <Typography>{row?.slot_name}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{row?.class}</Typography>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{moment(row?.date).format("DD/MM/YYYY")}</Typography>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{moment(row?.start_time).format("hh:mm A")}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "100px" }}>
          <Typography>{moment(row?.end_time).format("hh:mm A")}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{row?.no_of_students}</Typography>
        </StyledTableCell>
        {/* <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{"0"}</Typography>
        </StyledTableCell> */}

        <StyledTableCell align="left" style={{ minWidth: "200px", gap: 2 }}>
          <Button
            onClick={() => {
              setselectedRow(row);
              setFolloeupModeModal(true);
            }}
            variant="outlined"
          >
            Edit
          </Button>
          <Button
            onClick={() => deleteHoliday(row?._id)}
            sx={{ marginLeft: "10px" }}
            variant="outlined"
            color="error"
          >
            Delete
          </Button>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

const TimeSlotModal = ({ open, handleClose, selectedRow }) => {
  const initialValues = {
    slotName: selectedRow?.slot_name || "",
    numberOfStudents: selectedRow?.no_of_students || "",
    date: selectedRow?.date ? dayjs(selectedRow.date) : dayjs(new Date()),
    startTime: selectedRow?.start_time ? dayjs(selectedRow.start_time) : null,
    endTime: selectedRow?.end_time ? dayjs(selectedRow.end_time) : null,
    class: selectedRow?.class || "",
  };

  const validationSchema = Yup.object({
    slotName: Yup.string().required("Required"),
    numberOfStudents: Yup.number().required("Required").positive().integer(),
    date: Yup.date().required("Required"),
    startTime: Yup.date().required("Required"),
    endTime: Yup.date().required("Required"),
    class: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    setSubmitting(true);
    setStatus(null);
  
    const payload = {
      date: values.date.toISOString(),
      start_time: values.startTime.toISOString(),
      end_time: values.endTime.toISOString(),
      class: values.class,
      no_of_students: values.numberOfStudents,
      slot_name: values.slotName,
      ...(selectedRow?._id && { id: selectedRow._id }),
    };
  
    try {
      const response = selectedRow
        ? await updateTimeSlot(payload)
        : await AddTimeSlot(payload);
  
      if (response) {
        toast.success(`Time slot ${selectedRow ? "updated" : "created"} successfully`);
        handleClose();
      }
    } catch (error) {
      const errorMessage = "Something went wrong. Please try again.";
      toast.error(errorMessage);
      setStatus({ error: errorMessage });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SimpleModal open={open} handleClose={handleClose}>
      <Typography variant="h5">Time Slot</Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur
        onSubmit={handleSubmit}
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
              <Grid item xs={12} sm={12} md={6}>
                <DatePicker
                  label="Date"
                  name="date"
                  inputFormat="MM/dd/yyyy"
                  value={values.date}
                  fullWidth
                  className="w-full"
                  onChange={(value) => setFieldValue("date", value)}
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
              <Grid item xs={12} sm={12} md={6}>
                <TimePicker
                  label="Start Time"
                  name="startTime"
                  fullWidth
                  className="w-full"
                  value={values.startTime}
                  onChange={(value) => setFieldValue("startTime", value)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
                <ErrorMessage name="startTime" component="div" />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TimePicker
                  label="End Time"
                  name="endTime"
                  value={values.endTime}
                  className="w-full"
                  onChange={(value) => setFieldValue("endTime", value)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <ErrorMessage name="endTime" component="div" />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="slotName"
                  as={TextField}
                  label="Slot Name"
                  variant="outlined"
                  value={values.slotName}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={<ErrorMessage name="slotName" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="numberOfStudents"
                  as={TextField}
                  label="Number of Students"
                  variant="outlined"
                  type="number"
                  value={values.numberOfStudents}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={<ErrorMessage name="numberOfStudents" />}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <SubmitButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {!selectedRow ? " Submit" : "Update"}
                </SubmitButton>
              </Grid>
              {/* {status && status.error && (
                <Grid item xs={12}>
                  <Typography color="error">{status.error}</Typography>
                </Grid>
              )} */}
            </Grid>
          </Form>
        )}
      </Formik>
    </SimpleModal>
  );
};

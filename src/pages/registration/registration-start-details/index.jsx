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
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import {
  AddRegistrationStart,
  DeleteRegistrationStartId,
  GetRegistrationStartList,
  updateRegistrationStart,
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
import SubmitButton from "@/components/CommonButton/SubmitButton";
import dayjs from "dayjs";
import moment from "moment";

const RegistrationStartDetails = () => {
  const [registrationStartModal, setregistrationStartModal] = useState(false);
  const [guidanceUploadModal, setguidanceUploadModal] = useState(false);
  const [selectedRow, setselectedRow] = useState("");
  const router = useRouter();

  const {
    data: registrationStartData,
    status: registrationStartStatus,
    isLoading: registrationStartLoading,
    refetch: registrationStartRefetch,
  } = useQuery("GetRegistrationStartList", async () => {
    const res = await GetRegistrationStartList();
    return res?.data;
  });
  const handleclose = () => {
    setregistrationStartModal(false);
  };
  const handleOpen = () => {
    setregistrationStartModal(true);
    setselectedRow("");
  };
  const handlecloseUpload = () => {
    setguidanceUploadModal(false);
  };
  const handleOpenUpload = () => {
    setguidanceUploadModal(true);
  };

  useEffect(() => {
    registrationStartRefetch();
  }, [registrationStartModal]);

  const deleteRegistration = async (id) => {
    alert("Are You sure you want to delete");
    try {
      const res = await DeleteRegistrationStartId(id);
      if (res?.success) {
        registrationStartRefetch();
        toast.success("Successfully Deleted...");
      }
    } catch (error) {}
  };

  return (
    <div className="">
      <div sx={{ marginTop: "5rem" }} style={{ backgroundColor: "#fff" }}>
        <Grid container spacing={2} sx={{ py: 2, px: 2, alignItems: "center" }}>
          <Grid item xs={12} sm={12} md={12} className="flex justify-end gap-2">
            <Button variant="contained" onClick={handleOpen} size="large">
              Add Registration Start Details
            </Button>
            <Button variant="contained" onClick={handleOpenUpload} size="large">
              Upload Guidance
            </Button>
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="left">Sl.No</StyledTableCell>
                  <StyledTableCell align="left">Class</StyledTableCell>
                  <StyledTableCell align="left">Start Date</StyledTableCell>
                  <StyledTableCell align="left">Start Time</StyledTableCell>
                  <StyledTableCell align="left">End Date</StyledTableCell>
                  <StyledTableCell align="left">End Time</StyledTableCell>
                  <StyledTableCell align="left">Result Date</StyledTableCell>
                  <StyledTableCell align="left">Result Time</StyledTableCell>
                  <StyledTableCell align="left">Final Date</StyledTableCell>
                  <StyledTableCell align="left">Final TIme</StyledTableCell>
                  <StyledTableCell align="left">Registration Fee</StyledTableCell>
                  <StyledTableCell align="left">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                  height: "auto",
                  position: "relative",
                }}
              >
                {registrationStartLoading ? (
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
                ) : registrationStartData?.length > 0 ? (
                  <>
                    {registrationStartData?.map((row, index) => (
                      <Row
                        key={index}
                        row={row}
                        index={index}
                        router={router}
                        deleteRegistration={deleteRegistration}
                        setselectedRow={setselectedRow}
                        setregistrationStartModal={setregistrationStartModal}
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
      <RegStartModal
        open={registrationStartModal}
        handleClose={handleclose}
        selectedRow={selectedRow}
      />
      <GuidanceUpload
        open={guidanceUploadModal}
        handleClose={handlecloseUpload}
      />
    </div>
  );
};

export default RegistrationStartDetails;

const Row = (props) => {
  const {
    row,
    index,
    deleteRegistration,
    setselectedRow,
    setregistrationStartModal,
  } = props;

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            fontWeight: "600",
            color: "#000",
            // overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "100px" }}>
          <Typography>{row?.class}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <Typography>{moment(row?.start_date).format("DD/MM/YYYY")}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <Typography>{moment(row?.start_time).format("hh:mm A")}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <Typography>{moment(row?.end_date).format("DD/MM/YYYY")}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <Typography>{moment(row?.end_time).format("hh:mm A")}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <Typography>{moment(row?.result_date).format("DD/MM/YYYY")}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <Typography>{moment(row?.result_time).format("hh:mm A")}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <Typography>{moment(row?.final_date).format("DD/MM/YYYY")}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <Typography>{moment(row?.final_time).format("hh:mm A")}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <Typography>{(row?.registration_fee)}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "200px", gap: 2 }}>
          <Button
            onClick={() => {
              setselectedRow(row);
              setregistrationStartModal(true);
            }}
            variant="outlined"
          >
            Edit
          </Button>
          <Button
            onClick={() => deleteRegistration(row?._id)}
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

const RegStartModal = ({ open, handleClose, selectedRow }) => {
  const initialValues = {
    class: selectedRow?.class || "",
    start_date: selectedRow?.start_date
      ? dayjs(selectedRow.start_date)
      : dayjs(),
    start_time: selectedRow?.start_time ? dayjs(selectedRow.start_time) : null,
    end_date: selectedRow?.end_date ? dayjs(selectedRow.end_date) : dayjs(),
    end_time: selectedRow?.end_time ? dayjs(selectedRow.end_time) : null,
    result_date: selectedRow?.result_date
      ? dayjs(selectedRow.result_date)
      : dayjs(),
    result_time: selectedRow?.result_time
      ? dayjs(selectedRow.result_time)
      : null,
    final_date: selectedRow?.final_date
      ? dayjs(selectedRow.final_date)
      : dayjs(),
    final_time: selectedRow?.final_time ? dayjs(selectedRow.final_time) : null,
    registration_fee: selectedRow?.registration_fee || "",
  };

  const validationSchema = Yup.object({
    class: Yup.string().required("Required"),
    start_date: Yup.date().required("Required"),
    start_time: Yup.date().required("Required"),
    end_date: Yup.date().required("Required"),
    end_time: Yup.date().required("Required"),
    result_date: Yup.date().required("Required"),
    result_time: Yup.date().required("Required"),
    final_date: Yup.date().required("Required"),
    final_time: Yup.date().required("Required"),
    registration_fee: Yup.number().required("Required").positive(),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    // setSubmitting(true);
    // setStatus(null);
    const payload = {
      class: values.class,
      start_date: values.start_date ? values.start_date.toISOString() : null,
      start_time: values.start_time ? values.start_time.toISOString() : null,
      end_date: values.end_date ? values.end_date.toISOString() : null,
      end_time: values.end_time ? values.end_time.toISOString() : null,
      result_date: values.result_date ? values.result_date.toISOString() : null,
      result_time: values.result_time ? values.result_time.toISOString() : null,
      final_date: values.final_date ? values.final_date.toISOString() : null,
      final_time: values.final_time ? values.final_time.toISOString() : null,
      registration_fee: values.registration_fee,
      ...(selectedRow?._id && { id: selectedRow._id }),
    };

    try {
      const response = selectedRow
        ? await updateRegistrationStart(payload)
        : await AddRegistrationStart(payload);

      if (response) {
        toast.success(
          `Registration Start ${
            selectedRow ? "updated" : "created"
          } successfully`
        );
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
      <Typography variant="h5">Registration Start Details</Typography>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          values,
          setFieldValue,
        }) => (
          <Form>
            <Grid container spacing={2} mt={2}>
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
                >
                  {Config?.ClassList.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
                <ErrorMessage
                  className="text-red-500"
                  component="div"
                  name="class"
                />
              </Grid>

              <Grid item xs={12} sm={12} md={6} className="">
                <DatePicker
                  label="Start Date"
                  name="start_date"
                  value={values.start_date}
                  fullWidth
                  className="w-[100%]"
                  inputFormat="MM/dd/yyyy"
                  onChange={(value) => setFieldValue("start_date", value)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
                <ErrorMessage
                  className="text-red-500"
                  name="start_date"
                  component="div"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} className="">
                <DatePicker
                  label="End Date"
                  name="end_date"
                  fullWidth
                  value={values.end_date}
                  className="w-[100%]"
                  inputFormat="MM/dd/yyyy"
                  onChange={(value) => setFieldValue("end_date", value)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
                <ErrorMessage
                  className="text-red-500"
                  name="end_date"
                  component="div"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TimePicker
                  label="Start Time"
                  name="start_time"
                  className="w-[100%]"
                  value={values.start_time}
                  onChange={(value) => setFieldValue("start_time", value)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <ErrorMessage
                  className="text-red-500"
                  name="start_time"
                  component="div"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TimePicker
                  label="End Time"
                  name="end_time"
                  className="w-[100%]"
                  value={values.end_time}
                  onChange={(value) => setFieldValue("end_time", value)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <ErrorMessage
                  className="text-red-500"
                  name="end_time"
                  component="div"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} className="">
                <DatePicker
                  label="Result Date"
                  name="result_date"
                  fullWidth
                  className="w-[100%]"
                  value={values.result_date}
                  onChange={(value) => setFieldValue("result_date", value)}
                  inputFormat="MM/dd/yyyy"
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
                <ErrorMessage
                  className="text-red-500"
                  name="result_date"
                  component="div"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TimePicker
                  label="Result Time"
                  name="result_time"
                  className="w-[100%]"
                  value={values.result_time}
                  onChange={(value) => setFieldValue("result_time", value)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <ErrorMessage
                  className="text-red-500"
                  name="result_time"
                  component="div"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} className="">
                <DatePicker
                  label="Final Date"
                  name="final_date"
                  fullWidth
                  className="w-[100%]"
                  inputFormat="MM/dd/yyyy"
                  value={values.final_date}
                  onChange={(value) => setFieldValue("final_date", value)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
                <ErrorMessage
                  className="text-red-500"
                  name="final_date"
                  component="div"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TimePicker
                  label="Final Time"
                  name="final_time"
                  className="w-[100%]"
                  value={values.final_time}
                  onChange={(value) => setFieldValue("final_time", value)}
                  renderInput={(params) => <TextField {...params} />}
                />
                <ErrorMessage
                  className="text-red-500"
                  name="final_time"
                  component="div"
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="registration_fee"
                  as={TextField}
                  label="Registration Fee"
                  variant="outlined"
                  type="number"
                  value={values.registration_fee}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  helperText={
                    <ErrorMessage
                      className="text-red-500"
                      name="registration_fee"
                      component="div"
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} className="flex justify-end">
                <SubmitButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {!selectedRow ? " Submit" : "Update"}
                </SubmitButton>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </SimpleModal>
  );
};

const GuidanceUpload = ({ open, handleClose }) => {
  return (
    <SimpleModal open={open} handleClose={handleClose}>
      <p>Upload Guidance</p>
      <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10, mt: 2 }}>
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow style={{ fontWeight: "500", color: "#000" }}>
                <StyledTableCell align="left">Action</StyledTableCell>
                <StyledTableCell align="left">Name</StyledTableCell>
                <StyledTableCell align="left">Browser</StyledTableCell>
                <StyledTableCell align="left">View</StyledTableCell>
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
                  {[1]?.map((row, index) => (
                    <RowUpload key={index} row={row} index={index} />
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
    </SimpleModal>
  );
};

const RowUpload = (props) => {
  const { row, salonDetails, setSalonDetails, index, router } = props;

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
          {/* <Typography>{index + 1}</Typography> */}
          <FormControlLabel control={<Checkbox defaultChecked />} label="" />
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "100px" }}>
          <Typography>{row?.name || "Guidance"}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <input type="file" />
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "50px" }}>
          <Button variant="outlined">View</Button>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "250px", gap: 2 }}>
          <Button variant="outlined">Save</Button>
          <Button sx={{ marginLeft: "10px" }} variant="outlined" color="error">
            Delete
          </Button>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

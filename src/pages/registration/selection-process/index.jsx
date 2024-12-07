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
  TextField,
  Button,
  Checkbox,
  FormControl,
} from "@mui/material";
import {
  AddSelectionProcess,
  DeleteSelectionProcessId,
  GetSelectionProcessList,
  GetStudentLsit,
  updateSelectionProcess,
  // GetStudentLsit,
} from "@/services/api";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import SimpleModal from "@/components/Modal/SimpleModal";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import Config from "@/utilities/Config";
import { toast } from "react-toastify";

const SelectionProcess = () => {
  const [searchText, setSearchText] = useState("");
  const [openSelectionProcessModal, setOpenSelectionProcessModal] =
    useState(false);
  const router = useRouter();
  const [selectedRow, setselectedRow] = useState("");

  const {
    data: studentData,
    status: studentStatus,
    isLoading: studentLoading,
    refetch: studentRefetch,
  } = useQuery("studentDataaa", async () => {
    const payload = { status: "Registration" };
    const res = await GetStudentLsit();
    return res?.data;
  });

  const {
    data: selectionProcessData,
    status: selectionProcesstStatus,
    isLoading: selectionProcessLoading,
    refetch: selectionProcessRefetch,
  } = useQuery("GetSelectionProcessList", async () => {
    const res = await GetSelectionProcessList();
    return res?.data;
  });
  const handleclose = () => {
    setOpenSelectionProcessModal(false);
    selectionProcessRefetch();
    studentRefetch();
  };
  const handleOpen = () => {
    setOpenSelectionProcessModal(true);
  };

  const deleteHoliday = async (id) => {
    alert("Are You sure you want to delete");
    try {
      const res = await DeleteSelectionProcessId(id);
      if (res?.success) {
        selectionProcessRefetch();
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
              Selection Process
            </Button>
          </Grid>
        </Grid>
        <Paper sx={{ width: "100%", overflow: "scroll", boxShadow: 10 }}>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow style={{ fontWeight: "500", color: "#000" }}>
                  <StyledTableCell align="left">Sl.No</StyledTableCell>
                  <StyledTableCell align="left">Application</StyledTableCell>
                  <StyledTableCell align="left">Name</StyledTableCell>
                  <StyledTableCell align="left">Total Marks</StyledTableCell>
                  <StyledTableCell align="left">Marks in(%)</StyledTableCell>
                  <StyledTableCell align="left">Select Status</StyledTableCell>
                  <StyledTableCell align="left">Select</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody
                style={{
                  height: "auto",
                  position: "relative",
                }}
              >
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
                        deleteHoliday={deleteHoliday}
                        setselectedRow={setselectedRow}
                        setFolloeupModeModal={setOpenSelectionProcessModal}
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
        open={openSelectionProcessModal}
        handleClose={handleclose}
        selectedRow={selectedRow}
      />
    </div>
  );
};

export default SelectionProcess;

const Row = (props) => {
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const { row, index, deleteHoliday, setselectedRow, setFolloeupModeModal } =
    props;

  const [selectStatus, setSelectStatus] = React.useState("");

  const handleChange = (event) => {
    setSelectStatus(event.target.value);
  };

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            // background: open ? "#E5EFFC" : "",
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
          <Typography>{"1271"}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{"Rahat Tufail"}</Typography>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{"1020"}</Typography>
        </StyledTableCell>

        <StyledTableCell align="left" style={{ minWidth: "150px" }}>
          <Typography>{"20%"}</Typography>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "200px", gap: 2 }}>
          <FormControl fullWidth>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectStatus}
              onChange={handleChange}
            >
              {Config.SelectionStatus.map((item) => {
                return (
                  <MenuItem key={item.label} value={item.label}>
                    {item.label}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </StyledTableCell>
        <StyledTableCell align="left" style={{ minWidth: "100px" }}>
          <Checkbox {...label} />
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

const RegStartModal = ({ open, handleClose, selectedRow }) => {
  const initialValues = {
    class: "",
    selectionStatus: "",
    fromRegNo: "",
    toRegNo: "",
    select_criteria1: "",
    select_condition1: "",
    select_value1: "",
    select_criteria2: "",
    select_condition2: "",
    select_value2: "",
    select_criteria3: "",
    select_condition3: "",
    select_value3: "",
  };

  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    const payload = {
      class: values.class,
      selectionStatus: values.selectionStatus,
      fromRegNo: values.fromRegNo,
      toRegNo: values.toRegNo,

      ...(selectedRow?._id && { id: selectedRow._id }),
    };
    payload.criteria = [
      {
        selectCriteria: values.select_criteria1,
        condition: values.select_condition1,
        criteriaValue: values.select_value1,
      },
      {
        selectCriteria: values.select_criteria2,
        condition: values.select_condition2,
        criteriaValue: values.select_value2,
      },

      {
        selectCriteria: values.select_criteria3,
        condition: values.select_condition3,
        criteriaValue: values.select_value3,
      },
    ];

    console.log(payload, "-f");

    try {
      const response = selectedRow
        ? await updateSelectionProcess(payload)
        : await AddSelectionProcess(payload);

      if (response) {
        toast.success(
          `Selection Process ${
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
    <SimpleModal open={open} handleClose={handleClose} width={1000}>
      <Typography variant="h5">Selection Process</Typography>

      <Formik
        initialValues={initialValues}
        // validationSchema={Yup.object({
        //   name: Yup.string().required("Required"),
        //   email: Yup.string()
        //     .email("Invalid email address")
        //     .required("Required"),
        //   date: Yup.date().required("Required"),
        //   time: Yup.date().required("Required"),
        // })}
        // validateOnBlur
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
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="selectionStatus"
                  as={TextField}
                  select
                  label="Selection Status"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  value={values.selectionStatus}
                  helperText={<ErrorMessage name="selectionStatus" />}
                >
                  {Config?.SelectionStatus.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="fromRegNo"
                  as={TextField}
                  label="From Reg No"
                  variant="outlined"
                  // required
                  value={values.fromRegNo}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  helperText={<ErrorMessage name="fromRegNo" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="toRegNo"
                  as={TextField}
                  label="To Reg No"
                  variant="outlined"
                  // required
                  value={values.toRegNo}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  helperText={<ErrorMessage name="toRegNo" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={5}>
                <Field
                  name="select_criteria1"
                  as={TextField}
                  select
                  label="Select Criteria"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  value={values.select_criteria1}
                  helperText={<ErrorMessage name="select_criteria1" />}
                >
                  {Config?.SelectionCriteria.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Field
                  name="select_condition1"
                  as={TextField}
                  select
                  label="Condition"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  value={values.select_condition1}
                  helperText={<ErrorMessage name="select_condition1" />}
                >
                  {Config?.MathematicalCondition.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={12} md={5}>
                <Field
                  name="select_value1"
                  as={TextField}
                  label="Criteria Value"
                  variant="outlined"
                  // required
                  value={values.select_value1}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  helperText={<ErrorMessage name="select_value1" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={5}>
                <Field
                  name="select_criteria2"
                  as={TextField}
                  select
                  label="Select Criteria"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  value={values.select_criteria2}
                  helperText={<ErrorMessage name="select_criteria2" />}
                >
                  {Config?.SelectionCriteria.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Field
                  name="select_condition2"
                  as={TextField}
                  select
                  label="Condition"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  value={values.select_condition2}
                  helperText={<ErrorMessage name="select_condition2" />}
                >
                  {Config?.MathematicalCondition.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={12} md={5}>
                <Field
                  name="select_value2"
                  as={TextField}
                  label="Criteria Value"
                  variant="outlined"
                  // required
                  value={values.select_value2}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  helperText={<ErrorMessage name="select_value2" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={5}>
                <Field
                  name="select_criteria3"
                  as={TextField}
                  select
                  label="Select Criteria"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  value={values.select_criteria3}
                  helperText={<ErrorMessage name="select_criteria3" />}
                >
                  {Config?.SelectionCriteria.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={12} md={2}>
                <Field
                  name="select_condition3"
                  as={TextField}
                  select
                  label="Condition"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  value={values.select_condition3}
                  helperText={<ErrorMessage name="select_condition3" />}
                >
                  {Config?.MathematicalCondition.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={12} md={5}>
                <Field
                  name="select_value3"
                  as={TextField}
                  label="Criteria Value"
                  variant="outlined"
                  // required
                  value={values.select_value3}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  helperText={<ErrorMessage name="select_value3" />}
                />
              </Grid>

              <Grid item xs={12}>
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

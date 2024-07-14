import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Button,
  Box,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  CircularProgress,
  Typography,
} from "@mui/material";
import SimpleModal from "@/components/Modal/SimpleModal";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import {
  AddFollowup,
  DeleteStudentById,
  GetFollowupList,
  updateFollowup,
} from "@/services/api";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import Config from "@/utilities/Config";
import moment from "moment";
import { toast } from "react-toastify";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

const TextFieldComponent = ({
  field,
  form: { touched, errors },
  disabled,
  ...props
}) => (
  <TextField
    {...field}
    {...props}
    error={touched[field.name] && Boolean(errors[field.name])}
    helperText={touched[field.name] && errors[field.name]}
    variant="outlined"
    fullWidth
    disabled={disabled}
    margin="normal"
    required
  />
);

const DatePickerField = ({ field, form, ...props }) => {
  const currentError = form.errors[field.name];

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl required fullWidth margin="normal">
        <DatePicker
          {...field}
          {...props}
          inputFormat="MM/dd/yyyy"
          value={field.value ? dayjs(field.value) : null}
          onChange={(newValue) => {
            form.setFieldValue(field.name, newValue ? dayjs(newValue) : null);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              fullWidth
              error={Boolean(currentError)}
              helperText={currentError}
              variant="outlined"
            />
          )}
        />
      </FormControl>
    </LocalizationProvider>
  );
};

const SelectField = ({ field, form, label, options, ...props }) => (
  <FormControl required fullWidth margin="normal">
    <InputLabel>{label}</InputLabel>
    <Select required fullWidth {...field} {...props} label={label}>
      {options.map((option) => (
        <MenuItem fullWidth key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const FollowUpModal = ({ open, handleClose, data }) => {
  const [SlectedRow, setSlectedRow] = useState(null);
  useEffect(() => {
    setSlectedRow(null);
  }, [open]);

  const initialValues = {
    enquiry_no: data?.enquiry_id || "",
    firstName: data?.name?.first_name || "",
    lastName: data?.name?.last_name || "",
    middleName: data?.name?.middle_name || "",
    followUpdate: dayjs(SlectedRow?.follow_up_date) || dayjs(new Date()),
    nextfollowUpdate:
      dayjs(SlectedRow?.next_follow_up_date) || dayjs(new Date()),
    modeOfFollowup: SlectedRow?.follow_up_mode || "",
    followUp: SlectedRow?.follow_ups || "",
    remarks: SlectedRow?.remarks || "",

    // followUpdate: dayjs(new Date()),
    // nextfollowUpdate: dayjs(new Date()),
    // modeOfFollowup: "",
    // followUp: "",
    // remarks: "",
  };

  const validationSchema = Yup.object({
    followUpdate: Yup.date().required("Required"),
    nextfollowUpdate: Yup.date().required("Required"),
    modeOfFollowup: Yup.string().required("Required"),
    followUp: Yup.string().required("Required"),
    remarks: Yup.string().required("Required"),
  });

  const fields = [
    {
      id: "enquiry_no",
      label: "Enquiry No",
      name: "enquiry_no",
      disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "firstName",
      label: "First Name",
      name: "firstName",
      disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "middleName",
      label: "Middle Name",
      name: "middleName",
      disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "lastName",
      label: "Last Name",
      name: "lastName",
      disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "followUpdate",
      label: "FollowUp Date",
      name: "followUpdate",
      component: DatePickerField,
    },
    {
      id: "nextfollowUpdate",
      label: "Next FollowUp Date",
      name: "nextfollowUpdate",
      component: DatePickerField,
    },
    {
      id: "modeOfFollowup",
      label: "Mode Of FollowUp",
      name: "modeOfFollowup",
      component: SelectField,
      options: Config.ModeOfFollowUp,
    },
    {
      id: "followUp",
      label: "Follow Up",
      name: "followUp",
      component: TextFieldComponent,
    },
    {
      id: "remarks",
      label: "Remarks",
      name: "remarks",
      component: TextFieldComponent,
    },
  ];

  const router = useRouter();

  const {
    data: studentData,
    isLoading: studentLoading,
    refetch: studentRefetch,
  } = useQuery("followupdata", async () => {
    const paylaod = { student_id: data?._id };
    if (!data?._id) {
      return;
    }
    const res = await GetFollowupList(paylaod);
    return res?.data;
  });

  useEffect(() => {
    studentRefetch();
  }, [data]);

  const handleSubmit = async (values, actions) => {
    const payload = {
      student_id: data?._id,
      next_follow_up_date: dayjs(values.nextfollowUpdate),
      follow_ups: values.followUp,
      remarks: values.remarks,
      follow_up_mode: values.modeOfFollowup,
      follow_up_date: dayjs(values.followUpdate),
      enquiry_id: data.enquiry_id,
    };

    try {
      if (!SlectedRow) {
        const resp = await AddFollowup(payload);
        if (resp?.success) {
          toast.success("FollowUp Added successfully");
          actions.resetForm();
          studentRefetch();
        }
      } else {
        const resp = await updateFollowup(payload);
        if (resp?.success) {
          toast.success("FollowUp Updated successfully");
          actions.resetForm();
          studentRefetch();
        }
      }
    } catch (error) {
      toast.error("Failed to add FollowUp");
    }
  };

  const handleDltBtn = async (id) => {
    try {
      const resp = await DeleteStudentById(id);
      if (resp?.success) {
        toast.success("FollowUp Deleted successfully");
        studentRefetch();
      }
    } catch (error) {
      toast.error("Failed to delete FollowUp");
    }
  };

  const handleEditBtn = (item) => {
    setSlectedRow(item);
  };

  // useEffect(() => {
  //   if (SlectedRow) {
  //     setValues({
  //       enquiry_no: data.enquiry_id || "",
  //       firstName: data?.name?.first_name || "",
  //       lastName: data?.name?.last_name || "",
  //       middleName: data?.name?.middle_name || "",
  //       followUpdate: dayjs(SlectedRow.follow_up_date) || dayjs(new Date()),
  //       nextfollowUpdate: dayjs(SlectedRow.next_follow_up_date) || dayjs(new Date()),
  //       modeOfFollowup: SlectedRow.follow_up_mode || "",
  //       followUp: SlectedRow.follow_ups || "",
  //       remarks: SlectedRow.remarks || "",
  //     });
  //   }
  // }, [SlectedRow, setValues, data]);

  return (
    <SimpleModal
      open={open}
      handleClose={handleClose}
      width={"80%"}
      height={"900px"}
      style={{ overflow: "scroll" }}
    >
      <Typography variant="h5">FollowUp Details</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setValues }) => (
          <Form>
            <Box className="flex w-[100%] flex-wrap gap-2">
              {fields.map((field) => (
                <Box key={field.id} className="lg:w-[32.5%] gap-2 w-[100%]">
                  <Field
                    name={field.name}
                    label={field.label}
                    component={field.component}
                    options={field.options}
                    disabled={field.disabled}
                  />
                </Box>
              ))}
            </Box>
            <div className="flex justify-end my-5">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <Paper
        sx={{
          width: "100%",
          overflow: "scroll",
          boxShadow: 5,
          height: "400px",
        }}
      >
        <TableContainer sx={{ overflowX: "auto" }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow style={{ fontWeight: "500", color: "#000" }}>
                <StyledTableCell align="center">Sl.No</StyledTableCell>
                <StyledTableCell align="center">Date</StyledTableCell>
                <StyledTableCell align="center">Next FollowUp</StyledTableCell>
                <StyledTableCell align="center">Mode</StyledTableCell>
                <StyledTableCell align="center">Followups</StyledTableCell>
                <StyledTableCell align="center">Remarks</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
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
                  {studentData.map((row, index) => (
                    <Row
                      key={index}
                      row={row}
                      index={index}
                      handleDltBtn={handleDltBtn}
                      handleEditBtn={handleEditBtn}
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
    </SimpleModal>
  );
};

const Row = ({ row, index, handleDltBtn, handleEditBtn }) => (
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
      <StyledTableCell align="center" style={{ minWidth: "50px" }}>
        <Typography>{index + 1}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" style={{ minWidth: "100px" }}>
        <Typography>
          {moment(row.follow_up_date).format("DD-MM-YYYY")}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center" style={{ minWidth: "100px" }}>
        <Typography>
          {moment(row.next_follow_up_date).format("DD-MM-YYYY")}
        </Typography>
      </StyledTableCell>
      <StyledTableCell align="center" style={{ minWidth: "50px" }}>
        <Typography>{row.follow_up_mode}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" style={{ minWidth: "150px" }}>
        <Typography textTransform={"capitalize"}>{row.follow_ups}</Typography>
      </StyledTableCell>
      <StyledTableCell align="center" style={{ minWidth: "250px" }}>
        <Typography textTransform={"capitalize"}>{row.remarks}</Typography>
      </StyledTableCell>
      <StyledTableCell align="left" style={{ minWidth: "200px", gap: 2 }}>
        <Button
          onClick={() => handleEditBtn(row)}
          sx={{ marginRight: "10px" }}
          variant="outlined"
          color="primary"
        >
          Edit
        </Button>
        <Button
          onClick={() => handleDltBtn(row._id)}
          variant="outlined"
          color="error"
        >
          Delete
        </Button>
      </StyledTableCell>
    </TableRow>
  </React.Fragment>
);

export default FollowUpModal;

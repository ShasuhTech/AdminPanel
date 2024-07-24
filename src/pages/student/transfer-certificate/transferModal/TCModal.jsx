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

const TransferCertificateModal = ({ open, handleClose, data }) => {
  const [SlectedRow, setSlectedRow] = useState(null);
  useEffect(() => {
    setSlectedRow(null);
  }, [open]);

  const initialValues = {
    admission_no: data?.admission_no || "",
    firstName: data?.name?.first_name || "",
    lastName: data?.name?.last_name || "",
    middleName: data?.name?.middle_name || "",
    class: data?.class || "",
    section: data?.section || "",
    tc_number: data?.tc_number || "",
    apply_date: dayjs(data?.apply_date) || dayjs(new Date()),
    tc_date: dayjs(data?.tc_date) || dayjs(new Date()),
    reason: data?.reason || "",
    work_day: data?.work_day || "",
    attendance: data?.attendance || "",
    stud_character: data?.stud_character || "",
    last_exam: data?.last_exam || "",
    ncc_details: data?.ncc_details || "",
    sub_studied: data?.sub_studied || "",
    additional_subject: data?.additional_subject || "",
    failed: data?.failed || "",
    next_school: data?.next_school || "",
    last_fee_paid_date: dayjs(data?.last_fee_paid_date) || dayjs(new Date()),
    dues_clear_date: dayjs(data?.dues_clear_date) || dayjs(new Date()),
    promotion: data?.promotion || "",
    promotted_class: data?.promotted_class || "",
    games_played: data?.games_played || "",
    progress_in_studies: data?.progress_in_studies || "",
    fee_paid_remark: data?.fee_paid_remark || "",
    office_incharge: data?.office_incharge || "",
    remark: data?.remark || "",
  };

  const validationSchema = Yup.object({
    admission_no: Yup.string().required("Admission No is required"),
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    middleName: Yup.string(),
    class: Yup.string().required("Class is required"),
    section: Yup.string().required("Section is required"),
    tc_number: Yup.string(),
    apply_date: Yup.date().required("Apply Date is required"),
    tc_date: Yup.date().required("Tc Date is required"),
    reason: Yup.string().required("Reason is required"),
    work_day: Yup.string(),
    attendance: Yup.string(),
    stud_character: Yup.string(),
    last_exam: Yup.string(),
    ncc_details: Yup.string(),
    sub_studied: Yup.string(),
    additional_subject: Yup.string(),
    failed: Yup.string(),
    next_school: Yup.string(),
    last_fee_paid_date: Yup.date().required("Last Fee Paid Date is required"),
    dues_clear_date: Yup.date().required("Dues Clear Date is required"),
    promotion: Yup.string().required("Promotion is required"),
    promotted_class: Yup.string().required("Promotted Class is required"),
    games_played: Yup.string(),
    progress_in_studies: Yup.string(),
    fee_paid_remark: Yup.string(),
    office_incharge: Yup.string(),
    remark: Yup.string(),
  });

  const fields = [
    {
      id: "admission_no",
      label: "Admission No",
      name: "admission_no",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "firstName",
      label: "First Name",
      name: "firstName",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "middleName",
      label: "Middle Name",
      name: "middleName",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "lastName",
      label: "Last Name",
      name: "lastName",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "class",
      label: "Class",
      name: "class",
      component: SelectField,
      options: Config.ClassList,
    },
    {
      id: "section",
      label: "Section",
      name: "section",
      component: SelectField,
      options: Config.SectionList,
    },
    {
      id: "tc_number",
      label: "Tc No.",
      name: "tc_number",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "apply_date",
      label: "Apply Date",
      name: "apply_date",
      component: DatePickerField,
    },
    {
      id: "tc_date",
      label: "Tc Date",
      name: "tc_date",
      component: DatePickerField,
    },
    {
      id: "reason",
      label: "Reason",
      name: "reason",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "work_day",
      label: "Work Day",
      name: "work_day",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "attendance",
      label: "Attendance",
      name: "attendance",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "stud_character",
      label: "Stud. Character",
      name: "stud_character",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "last_exam",
      label: "Last Exam",
      name: "last_exam",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "ncc_details",
      label: "NCC Details",
      name: "ncc_details",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "sub_studied",
      label: "Sub Studied",
      name: "sub_studied",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "additional_subject",
      label: "Additional Subject",
      name: "additional_subject",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "failed",
      label: "Failed",
      name: "failed",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "next_school",
      label: "Next School",
      name: "next_school",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "last_fee_paid_date",
      label: "Last Fee Paid Date",
      name: "last_fee_paid_date",
      component: DatePickerField,
    },
    {
      id: "dues_clear_date",
      label: "Dues Clear Date",
      name: "dues_clear_date",
      component: DatePickerField,
    },
    {
      id: "promotion",
      label: "Promotion",
      name: "promotion",
      component: SelectField,
      options: Config.ClassList,
    },
    {
      id: "promotted_class",
      label: "Promotted Class",
      name: "promotted_class",
      component: SelectField,
      options: Config.ClassList,
    },
    {
      id: "games_played",
      label: "Games Played",
      name: "games_played",
      component: TextFieldComponent,
    },
    {
      id: "progress_in_studies",
      label: "Progress in Studies",
      name: "progress_in_studies",
      component: TextFieldComponent,
    },
    {
      id: "fee_paid_remark",
      label: "Fee Paid Remark",
      name: "fee_paid_remark",
      component: TextFieldComponent,
    },
    {
      id: "office_incharge",
      label: "Office Incharge",
      name: "office_incharge",
      component: TextFieldComponent,
    },
    {
      id: "remark",
      label: "Remark",
      name: "remark",
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

  return (
    <SimpleModal
      open={open}
      handleClose={handleClose}
      width={"80%"}
      height={"800px"}
    >
      <Typography variant="h5">Transfer Certificate</Typography>
      <div className="overflow-scroll">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ values, setValues }) => (
            <Form>
              <Box className="flex w-[100%] flex-wrap gap-4 overflow-scroll">
                {fields.map((field) => (
                  <Box key={field.id} className="lg:w-[32.5%] w-[100%]">
                    <Field
                      name={field.name}
                      label={field.label}
                      component={field.component}
                      options={field.options}
                      disabled={field.disabled}
                      values={values}
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
      </div>
    </SimpleModal>
  );
};

export default TransferCertificateModal;

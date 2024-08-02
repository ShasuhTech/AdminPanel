import CustomButton from "@/components/CommonButton/CustomButton";
import SubmitButton from "@/components/CommonButton/SubmitButton";
import { AddFollowup, GetFollowupList, updateFollowup } from "@/services/api";
import Config from "@/utilities/Config";
// import Config from "@/utilities/Config";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";

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
    // required
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
  <FormControl fullWidth margin="normal">
    <InputLabel>{label}</InputLabel>
    <Select fullWidth {...field} {...props} label={label}>
      {options.map((option) => (
        <MenuItem fullWidth key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
);

const PayInformation = () => {
  const [valuesRadio, setValuesRadio] = useState({
    salaryGenApplicable: "",
    employeePfLimit: "",
    employerPfLimit: "",
    taxRegion: "",
    employeePensionLimit: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValuesRadio({
      ...valuesRadio,
      [name]: value,
    });
  };

  const data = "";
  const initialValues = {
    designation: data?.designation || "",
    designationDate: dayjs(data?.designationDate) || dayjs(new Date()),
    school_name: data?.school_name || "",
    department: data?.department || "",
    departmentDate: dayjs(data?.departmentDate) || dayjs(new Date()),
    payment: data?.payment || "",
    appointmentDate: dayjs(data?.appointmentDate) || dayjs(new Date()),
    bank: data?.bank || "",
    confirmation_date: dayjs(data?.confirmation_date) || dayjs(new Date()),
    bank_account_no: data?.bank_account_no || "",
    saving_bank_name: data?.saving_bank_name || "",
    bank_ifsc_code: data?.bank_ifsc_code || "",
    probation_upto: dayjs(data?.probation_upto) || dayjs(new Date()),
    org_name_in_form_16: data?.org_name_in_form_16 || "",
    nature_of_appointment: data?.nature_of_appointment || "",
    nature_of_appointment_date:
      dayjs(data?.nature_of_appointment_date) || dayjs(new Date()),
    leave_category: data?.leave_category || "",
    staff_category: data?.staff_category || "",
    staff_category_date: dayjs(data?.staff_category_date) || dayjs(new Date()),
    vol_pf: data?.vol_pf || "",
    pf_no: data?.pf_no || "",
    pension_no: data?.pension_no || "",
    uan_no: data?.uan_no || "",
    pan_no: data?.pan_no || "",
    esi_no: data?.esi_no || "",
    date_of_leaving: dayjs(data?.date_of_leaving) || dayjs(new Date()),
    calculation_mode: data?.calculation_mode || "",
    increment_date: dayjs(data?.increment_date) || dayjs(new Date()),
    salary_upto: dayjs(data?.salary_upto) || dayjs(new Date()),
    pay_scale: data?.pay_scale || "",
    pay_scale_date: dayjs(data?.pay_scale_date) || dayjs(new Date()),
    reason: data?.reason || "",
    grade_pay: data?.grade_pay || "",
    grade_pay_date: dayjs(data?.grade_pay_date) || dayjs(new Date()),
    leaving_remark: data?.leaving_remark || "",
    basic_pay: data?.basic_pay || "",
    basic_pay_date: dayjs(data?.basic_pay_date) || dayjs(new Date()),
    gross: data?.gross || "",
    net_pay: data?.net_pay || "",
    pf_type: data?.pf_type || "",
    pf_joining_date: dayjs(data?.pf_joining_date) || dayjs(new Date()),
  };

  const validationSchema = Yup.object({
    designation: Yup.string().required("Designation is required"),
    designationDate: Yup.date().required("Designation Date is required"),
    school_name: Yup.string().required("School Name is required"),
    department: Yup.string().required("Department is required"),
    departmentDate: Yup.date().required("Department Date is required"),
    payment: Yup.string().required("Payment is required"),
    appointmentDate: Yup.date().required("Appointment Date is required"),
    bank: Yup.string().required("Bank is required"),
    confirmation_date: Yup.date().required("Confirmation Date is required"),
    bank_account_no: Yup.string().required("Bank Account No is required"),
    saving_bank_name: Yup.string().required("Saving Bank Name is required"),
    bank_ifsc_code: Yup.string().required("Bank IFSC Code is required"),
    probation_upto: Yup.date().required("Probation Upto is required"),
    org_name_in_form_16: Yup.string().required(
      "Org Name in Form 16 is required"
    ),
    nature_of_appointment: Yup.string().required(
      "Nature Of Appointment is required"
    ),
    nature_of_appointment_date: Yup.date().required(
      "Nature Of Appointment Date is required"
    ),
    leave_category: Yup.string().required("Leave Category is required"),
    staff_category: Yup.string().required("Staff Category is required"),
    staff_category_date: Yup.date().required("Staff Category Date is required"),
    vol_pf: Yup.string().required("Vol PF is required"),
    pf_no: Yup.string().required("PF No is required"),
    pension_no: Yup.string().required("Pension No is required"),
    uan_no: Yup.string().required("UAN No is required"),
    pan_no: Yup.string().required("Pan No is required"),
    esi_no: Yup.string().required("ESI No is required"),
    date_of_leaving: Yup.date().required("Date Of Leaving is required"),
    calculation_mode: Yup.string().required("Calculation Mode is required"),
    increment_date: Yup.date().required("Increment Date is required"),
    salary_upto: Yup.date().required("Salary Upto is required"),
    pay_scale: Yup.string().required("Pay Scale is required"),
    pay_scale_date: Yup.date().required("Pay Scale Date is required"),
    reason: Yup.string().required("Reason is required"),
    grade_pay: Yup.string().required("Grade Pay is required"),
    grade_pay_date: Yup.date().required("Grade Pay Date is required"),
    leaving_remark: Yup.string().required("Leaving Remark is required"),
    basic_pay: Yup.string().required("Basic Pay is required"),
    basic_pay_date: Yup.date().required("Basic Pay Date is required"),
    gross: Yup.string().required("Gross is required"),
    net_pay: Yup.string().required("Net Pay is required"),
    pf_type: Yup.string().required("PF Type is required"),
    pf_joining_date: Yup.date().required("PF Joining Date is required"),
  });

  const fields = [
    {
      id: "designation",
      label: "Designation",
      name: "designation",
      component: SelectField,
      options: Config.occupations,
    },
    {
      id: "designationDate",
      label: "Designation Date",
      name: "designationDate",
      component: DatePickerField,
    },
    {
      id: "school_name",
      label: "school_name",
      name: "school_name",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "department",
      label: "Department",
      name: "department",
      component: SelectField,
      options: Config.occupations,
    },
    {
      id: "departmentDate",
      label: "Department Date",
      name: "departmentDate",
      component: DatePickerField,
    },
    {
      id: "payment",
      label: "Payment",
      name: "payment",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "appointmentDate",
      label: "Appointment Date",
      name: "appointmentDate",
      component: DatePickerField,
    },
    {
      id: "bank",
      label: "Bank",
      name: "bank",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "confirmation_date",
      label: "Confirmation Date",
      name: "confirmation_date",
      component: DatePickerField,
    },
    {
      id: "bank_account_no",
      label: "Bank Account No",
      name: "bank_account_no",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "saving_bank_name",
      label: "Saving Bank Name",
      name: "saving_bank_name",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "bank_ifsc_code",
      label: "Bank IFSC Code",
      name: "bank_ifsc_code",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "probation_upto",
      label: "Probation Upto",
      name: "probation_upto",
      component: DatePickerField,
    },
    {
      id: "org_name_in_form_16",
      label: "Org name in Form 16",
      name: "org_name_in_form_16",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "nature_of_appointment",
      label: "Nature Of Appointment",
      name: "nature_of_appointment",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "nature_of_appointment_date",
      label: "Nature Of Appointment Date",
      name: "nature_of_appointment_date",
      component: DatePickerField,
    },
    {
      id: "leave_category",
      label: "Leave Category",
      name: "leave_category",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "staff_category",
      label: "Staff Category",
      name: "staff_category",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "staff_category_date",
      label: "Staff Category Date",
      name: "staff_category_date",
      component: DatePickerField,
    },
    {
      id: "vol_pf",
      label: "Vol PF",
      name: "vol_pf",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "pf_no",
      label: "PF No",
      name: "pf_no",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "pension_no",
      label: "Pension No",
      name: "pension_no",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "uan_no",
      label: "UAN No",
      name: "uan_no",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "pan_no",
      label: "Pan No",
      name: "pan_no",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "esi_no",
      label: "ESI No",
      name: "esi_no",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "date_of_leaving",
      label: "Date Of Leaving",
      name: "date_of_leaving",
      component: DatePickerField,
    },
    {
      id: "calculation_mode",
      label: "Calculation Mode",
      name: "calculation_mode",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "increment_date",
      label: "Increment Date",
      name: "increment_date",
      component: DatePickerField,
    },
    {
      id: "salary_upto",
      label: "Salary Upto",
      name: "salary_upto",
      component: DatePickerField,
    },
    {
      id: "pay_scale",
      label: "Pay Scale",
      name: "pay_scale",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "pay_scale_date",
      label: "Pay Scale Date",
      name: "pay_scale_date",
      component: DatePickerField,
    },
    {
      id: "reason",
      label: "Reason",
      name: "reason",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "grade_pay",
      label: "Grade Pay",
      name: "grade_pay",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "grade_pay_date",
      label: "Grade Pay Date",
      name: "grade_pay_date",
      component: DatePickerField,
    },
    {
      id: "leaving_remark",
      label: "Leaving Remark",
      name: "leaving_remark",
      component: TextFieldComponent,
    },
    {
      id: "basic_pay",
      label: "Basic Pay",
      name: "basic_pay",
      component: TextFieldComponent,
    },
    {
      id: "basic_pay_date",
      label: "Basic Pay Date",
      name: "basic_pay_date",
      component: DatePickerField,
    },
    {
      id: "gross",
      label: "Gross",
      name: "gross",
      component: TextFieldComponent,
    },
    {
      id: "net_pay",
      label: "Net Pay",
      name: "net_pay",
      component: TextFieldComponent,
    },
    {
      id: "pf_type",
      label: "Pf Type",
      name: "pf_type",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "pf_joining_date",
      label: "Pf Joining Date",
      name: "pf_joining_date",
      component: DatePickerField,
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
    console.log(values, "----values");
    const payload = {
      //   student_id: data?._id,
      //   next_follow_up_date: dayjs(values.nextfollowUpdate),
      //   follow_ups: values.followUp,
      //   remarks: values.remarks,
      //   follow_up_mode: values.modeOfFollowup,
      //   follow_up_date: dayjs(values.followUpdate),
      //   enquiry_id: data.enquiry_id,
    };

    // try {
    //   if (!SlectedRow) {
    //     const resp = await AddFollowup(payload);
    //     if (resp?.success) {
    //       toast.success("FollowUp Added successfully");
    //       actions.resetForm();
    //       studentRefetch();
    //     }
    //   } else {
    //     const resp = await updateFollowup(payload);
    //     if (resp?.success) {
    //       toast.success("FollowUp Updated successfully");
    //       actions.resetForm();
    //       studentRefetch();
    //     }
    //   }
    // } catch (error) {
    //   toast.error("Failed to add FollowUp");
    // }
  };

  console.log(initialValues, "===sferw");

  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setValues }) => (
          <Form>
            <Box className="flex w-[100%] flex-wrap mt-7">
              {fields.map((field) => (
                <Box key={field.id} className="lg:w-[32.5%]  mr-3 w-[100%]">
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
            <Box className="flex flex-wrap  my-7">
              <Box className="lg:w-[32.5%]  mr-3 w-[100%]">
                <RadioGroupComponent
                  label="Salary Gen. Applicable"
                  name="salaryGenApplicable"
                  value={valuesRadio.salaryGenApplicable}
                  onChange={handleChange}
                />
              </Box>
              <Box className="lg:w-[32.5%]  mr-3 w-[100%]">
                <RadioGroupComponent
                  label="Employee PF Limit"
                  name="employeePfLimit"
                  value={valuesRadio.employeePfLimit}
                  onChange={handleChange}
                />
              </Box>
              <Box className="lg:w-[32.5%]  mr-3 w-[100%]">
                <RadioGroupComponent
                  label="Employer PF Limit"
                  name="employerPfLimit"
                  value={valuesRadio.employerPfLimit}
                  onChange={handleChange}
                />
              </Box>
              <Box className="lg:w-[32.5%]  mr-3 mt-6 w-[100%]">
                <RadioGroupComponent
                  label="Tax Region"
                  name="taxRegion"
                  value={valuesRadio.taxRegion}
                  onChange={handleChange}
                />
              </Box>
              <Box className="lg:w-[32.5%] mt-6 mr-3 w-[100%]">
                <RadioGroupComponent
                  label="Employee Pension Limit"
                  name="employeePensionLimit"
                  value={valuesRadio.employeePensionLimit}
                  onChange={handleChange}
                />
              </Box>
            </Box>
            <Box className="flex gap-10 my-7">
              <CustomButton  width={200}>Pay Head Details</CustomButton>
              <CustomButton width={170}>LIC Details</CustomButton>
            </Box>

            <div className="flex justify-end my-5">
             <SubmitButton></SubmitButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default PayInformation;

const RadioGroupComponent = ({ label, name, value, onChange }) => {
  return (
    <FormControl>
      <FormLabel id={`${name}-label`}>{label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby={`${name}-label`}
        name={name}
        value={value}
        onChange={onChange}
      >
        <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
        <FormControlLabel value="No" control={<Radio />} label="No" />
      </RadioGroup>
    </FormControl>
  );
};

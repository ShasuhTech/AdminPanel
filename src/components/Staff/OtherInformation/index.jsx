import CustomButton from "@/components/CommonButton/CustomButton";
import { AddFollowup, GetFollowupList, updateFollowup } from "@/services/api";
import Config from "@/utilities/Config";
// import Config from "@/utilities/Config";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
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
import React, { useEffect } from "react";
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

const OtherInformation = () => {
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

  const passportDetails = [
    {
      id: "passport_no",
      label: "Passport No",
      name: "passport_no",
      component: TextFieldComponent,
    },
    {
      id: "passport_issue_place",
      label: "Passport Issue Place",
      name: "passport_issue_place",
      component: TextFieldComponent,
    },
    {
      id: "passport_issue_date",
      label: "Passport Issue Date",
      name: "passport_issue_date",
      component: DatePickerField,
    },
    {
      id: "passport_expiry_date",
      label: "Passport Expiry Date",
      name: "passport_expiry_date",
      component: DatePickerField,
    },
  ];
  const visaDetails = [
    {
      id: "visa_no",
      label: "Visa No",
      name: "visa_no",
      component: TextFieldComponent,
    },
    {
      id: "visa_issue_place",
      label: "Visa Issue Place",
      name: "visa_issue_place",
      component: TextFieldComponent,
    },
    {
      id: "visa_issue_date",
      label: "Visa Issue Date",
      name: "visa_issue_date",
      component: DatePickerField,
    },
    {
      id: "visa_expiry_date",
      label: "Visa Expiry Date",
      name: "visa_expiry_date",
      component: DatePickerField,
    },
  ];
  const otherDetails = [
    {
      id: "honors",
      label: "Honors/Awards",
      name: "honors",
      component: TextFieldComponent,
    },
    {
      id: "sports",
      label: "Sports",
      name: "sports",
      component: TextFieldComponent,
    },
    {
      id: "dramatic",
      label: "Dramatic",
      name: "dramatic",
      component: TextFieldComponent,
    },
    {
      id: "literacy",
      label: "Literacy",
      name: "literacy",
      component: TextFieldComponent,
    },
    {
      id: "music",
      label: "Music/Dance",
      name: "music",
      component: TextFieldComponent,
    },
    {
      id: "other",
      label: "Other",
      name: "other",
      component: TextFieldComponent,
    },
    {
      id: "identification_marks",
      label: "Identification Marks",
      name: "identification_marks",
      component: TextFieldComponent,
    },
    {
      id: "interview_board",
      label: "Interview Board",
      name: "interview_board",
      component: TextFieldComponent,
    },
    {
      id: "observation_at_the_time_of_interview",
      label: "Observation At the Time Of Interview",
      name: "observation_at_the_time_of_interview",
      component: TextFieldComponent,
    },
    {
      id: "any_other_relevent_information",
      label: "Any Other Relevent Information",
      name: "any_other_relevent_information",
      component: TextFieldComponent,
    },
  ];

  const spouseDetails = [
    {
      id: "spouse_name",
      label: "Name",
      name: "spouse_name",
      component: TextFieldComponent,
    },
    {
      id: "spouse_date_of_birth",
      label: "Date Of Birth",
      name: "spouse_date_of_birth",
      component: DatePickerField,
    },
    {
      id: "spouse_mobile",
      label: "Number",
      name: "spouse_mobile",
      component: TextFieldComponent,
    },
    {
      id: "spouse_qualification",
      label: "Qualification",
      name: "spouse_qualification",
      component: SelectField,
      options: Config.qualifications,
    },
    {
      id: "spouse_employer_details",
      label: "Employer Details",
      name: "spouse_employer_details",
      component: TextFieldComponent,
    },
  ];
  const childrenDetails = [
    {
      id: "children_name",
      label: "Name",
      name: "children_name",
      component: TextFieldComponent,
    },
    {
      id: "children_gender",
      label: "Gender",
      name: "children_gender",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "children_date_of_birth",
      label: "Date Of Birth",
      name: "children_date_of_birth",
      component: DatePickerField,
    },
    {
      id: "children_mobile",
      label: "Number",
      name: "children_mobile",
      component: TextFieldComponent,
    },
    {
      id: "children_institute_name",
      label: "Institute Name",
      name: "children_institute_name",
      component: TextFieldComponent,
    },
  ];
  const qualificationDetails = [
    {
      id: "qualification_name",
      label: "Qualification",
      name: "qualification_name",
      component: SelectField,
      options: Config.qualifications,
    },
    {
      id: "qualification_passing_year",
      label: "Passing Year",
      name: "qualification_passing_year",
      component: TextFieldComponent,
    },
    {
      id: "qualification_univercity",
      label: "Univercity",
      name: "qualification_univercity",
      component: DatePickerField,
    },
    {
      id: "qualification_institution",
      label: "Institution",
      name: "qualification_institution",
      component: TextFieldComponent,
    },
    {
      id: "qualification_percentage",
      label: "Division/Percentage",
      name: "qualification_percentage",
      component: TextFieldComponent,
    },
    {
      id: "qualification_medium",
      label: "Medium Of Instruction",
      name: "qualification_medium",
      component: SelectField,
      options: Config.Boards,
    },
    {
      id: "qualification_main_subject",
      label: "Main Subject",
      name: "qualification_main_subject",
      component: SelectField,
      options: Config.Boards,
    },
  ];
  const specializedDetails = [
    {
      id: "specialized_name_of_training",
      label: "Name Of Training",
      name: "pecialized_name_of_training",
      component: TextFieldComponent,
    },
    {
      id: "specialized_place_of_training",
      label: "Place Of Training",
      name: "specialized_place_of_training",
      component: TextFieldComponent,
    },
    {
      id: "specialized_date_from",
      label: "Date From",
      name: "specialized_date_from",
      component: DatePickerField,
    },
    {
      id: "specialized_date_to",
      label: "Date To",
      name: "specialized_date_to",
      component: DatePickerField,
    },
    {
      id: "specialized_organized_by",
      label: "Organized By",
      name: "specialized_organized_by",
      component: TextFieldComponent,
    },
    {
      id: "specialized_resource_person",
      label: "Resource Person",
      name: "specialized_resource_person",
      component: TextFieldComponent,
    },
  ];
  const dependentDetails = [
    {
      id: "dependent_name",
      label: "Dependent Name",
      name: "pecialized_name",
      component: TextFieldComponent,
    },
    {
      id: "dependent_relationship",
      label: "Relationship",
      name: "dependent_relationship",
      component: TextFieldComponent,
    },
    {
      id: "dependent_date_of_birth",
      label: "Date Of Birth",
      name: "dependent_date_of_birth",
      component: DatePickerField,
    },
    {
      id: "dependent_mobile",
      label: "Mobile No",
      name: "dependent_mobile",
      component: TextFieldComponent,
    },
    {
      id: "dependent_remark",
      label: "Remark",
      name: "dependent_remark",
      component: TextFieldComponent,
    },
  ];

  const preExperienceDetails = [
    {
      id: "preExperience_organization_name",
      label: "Organisation Name",
      name: "preExperience_organization_name",
      component: TextFieldComponent,
    },
    {
      id: "preExperience_date_from",
      label: "Date From",
      name: "preExperience_date_from",
      component: DatePickerField,
    },
    {
      id: "preExperience_date_to",
      label: "Date To",
      name: "preExperience_date_to",
      component: DatePickerField,
    },
    {
      id: "preExperience_designation_name",
      label: "Designation Name",
      name: "preExperience_designation_name",
      component: TextFieldComponent,
    },
    {
      id: "preExperience_job_description",
      label: "Job Description",
      name: "preExperience_job_description",
      component: TextFieldComponent,
    },
    {
      id: "preExperience_salary_drawn",
      label: "Salary Drawn",
      name: "preExperience_salary_drawn",
      component: TextFieldComponent,
    },
    {
      id: "preExperience_reason_for_leaving",
      label: "Reason For Leaving",
      name: "preExperience_reason_for_leaving",
      component: TextFieldComponent,
    },
  ];

  const pfNomineeDetails = [
    {
      id: "pf_nominee_nominee_name",
      label: "Nominee Name",
      name: "pf_nominee_nominee_name",
      component: TextFieldComponent,
    },
    {
      id: "pf_nominee_relationship",
      label: "Relationship",
      name: "pf_nominee_relationship",
      component: TextFieldComponent,
    },
    {
      id: "pf_nominee_date_of_birth",
      label: "Date of Birth",
      name: "pf_nominee_date_of_birth",
      component: DatePickerField,
    },

    {
      id: "pf_nominee_percentage_of_share",
      label: "Percentage Of Share",
      name: "pf_nominee_percentage_of_share",
      component: TextFieldComponent,
    },
  ];
  const referenceDetails = [
    {
      id: "reference_name",
      label: "Reference Name",
      name: "reference_name",
      component: TextFieldComponent,
    },
    {
      id: "reference_designation_name",
      label: "Designation Name",
      name: "reference_designation_name",
      component: TextFieldComponent,
    },
    {
      id: "reference_address",
      label: "Address",
      name: "reference_address",
      component: TextFieldComponent,
    },
  ];

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
            {/* Uncomment and modify if needed for other fields */}
            {/* <FormSection title="General Information" details={fields} /> */}
            <FormSection title="Passport Details" details={passportDetails} />
            <FormSection title="Visa Details" details={visaDetails} />
            <FormSection title="Other Details" details={otherDetails} />
            <FormSection title="Spouse Details" details={spouseDetails} />
            <FormSection title="Children Details" details={childrenDetails} />
            <FormSection
              title="Qualification Details"
              details={qualificationDetails}
            />
            <FormSection
              title="Training Details"
              details={specializedDetails}
            />
            <FormSection title="Dependent Details" details={dependentDetails} />
            <FormSection
              title="Previous Experience Details"
              details={preExperienceDetails}
            />
            <FormSection
              title="Pf Nominee Details"
              details={pfNomineeDetails}
            />
            <FormSection title="Reference Details" details={referenceDetails} />

            <div className="flex justify-end my-5">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default OtherInformation;

const FormSection = ({ title, details }) => (
  <Box className='mt-7'>
    <span className="font-bold text-[18px] mt-7 "  >
      {title}
    </span>
    <Grid className="border rounded-lg mt-3 px-6">
      <Box className="flex w-full flex-wrap py-3 justify-between">
        {details.map((field) => (
          <Box key={field.id} className="lg:w-[49%] w-full">
            <Field {...field} />
          </Box>
        ))}
      </Box>
    </Grid>
  </Box>
);

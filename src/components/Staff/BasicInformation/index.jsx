import CustomButton from "@/components/CommonButton/CustomButton";
import { AddFollowup, GetFollowupList, updateFollowup } from "@/services/api";
import Config from "@/utilities/Config";
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

const BasicInformation = () => {
  const data = "";
  const initialValues = {
    employee_code: data?.employee_code || "",
    file_no: data?.file_no || "",
    gender: data?.gender || "",
    first_name: data?.name?.first_name || "",
    lastName: data?.name?.last_name || "",
    middleName: data?.name?.middle_name || "",
    date_of_birth: data?.date_of_birth || "",
    nationality: data?.nationality || "",
    appointment_date: dayjs(data?.appointment_date) || dayjs(new Date()),
    joining_date: dayjs(data?.joining_date) || dayjs(new Date()),
    father_name: data?.father_name || "",
    mother_name: data?.mother_name || "",
    father_occupation: data?.father_occupation || "",
    mother_tounge: data?.mother_tounge || "",
    religion: data?.religion || "",
    social_category: data?.social_category || "",
    marital_status: data?.marital_status || "",
    blood_group: data?.blood_group || "",
    adhar_card_no: data?.adhar_card_no || "",
    cast: data?.cast || "",
    place_of_birth: data?.place_of_birth || "",
    weight: data?.weight || "",
    height: data?.height || "",
    mobile_no: data?.mobile_no || "",
    wedding_date: dayjs(data?.wedding_date) || dayjs(new Date()),
    qualification_for_printing: data?.qualification_for_printing || "",
    email_id: data?.email_id || "",
    class: data?.class || "",
    section: data?.section || "",
    reporting_person: data?.reporting_person || "",
    rejoin_reason: data?.rejoin_reason || "",
    persent_address: data?.persent_address || "",
    persent_country: data?.persent_country || "",
    persent_state: data?.persent_state || "",
    persent_city: data?.persent_city || "",
    persent_pincode: data?.persent_pincode || "",
    persent_number: data?.persent_number || "",
    permanent_address: data?.permanent_address || "",
    permanent_country: data?.permanent_country || "",
    permanent_state: data?.permanent_state || "",
    permanent_city: data?.permanent_city || "",
    permanent_pincode: data?.permanent_pincode || "",
    permanent_number: data?.permanent_number || "",
  };

  const validationSchema = Yup.object({
    employee_code: Yup.string().required("Employee Code is required"),
    file_no: Yup.string().required("File No is required"),
    gender: Yup.string().required("Gender is required"),
    first_name: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    middleName: Yup.string(),
    date_of_birth: Yup.date().required("Date of Birth is required"),
    nationality: Yup.string().required("Nationality is required"),
    appointment_date: Yup.date().required("Appointment Date is required"),
    joining_date: Yup.date().required("Joining Date is required"),
    father_name: Yup.string(),
    mother_name: Yup.string(),
    father_occupation: Yup.string(),
    mother_tounge: Yup.string(),
    religion: Yup.string(),
    social_category: Yup.string(),
    marital_status: Yup.string().required("Marital Status is required"),
    blood_group: Yup.string(),
    adhar_card_no: Yup.string(),
    cast: Yup.string(),
    place_of_birth: Yup.string().required("Place of Birth is required"),
    weight: Yup.number(),
    height: Yup.number(),
    mobile_no: Yup.string().required("Mobile No is required"),
    wedding_date: Yup.date(),
    qualification_for_printing: Yup.string(),
    email_id: Yup.string().email("Invalid Email").required("Email is required"),
    class: Yup.string().required("Class is required"),
    section: Yup.string().required("Section is required"),
    reporting_person: Yup.string(),
    rejoin_reason: Yup.string(),
    persent_address: Yup.string(),
    persent_country: Yup.string(),
    persent_state: Yup.string(),
    persent_city: Yup.string(),
    persent_pincode: Yup.string(),
    persent_number: Yup.string(),
    permanent_address: Yup.string(),
    permanent_country: Yup.string(),
    permanent_state: Yup.string(),
    permanent_city: Yup.string(),
    permanent_pincode: Yup.string(),
    permanent_number: Yup.string(),
  });

  const fields = [
    {
      id: "employee_code",
      label: "Employee Code",
      name: "employee_code",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "file_no",
      label: "File No",
      name: "file_no",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "gender",
      label: "Gender",
      name: "gender",
      component: SelectField,
      options: Config.genders,
    },

    {
      id: "first_name",
      label: "First Name",
      name: "first_name",
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
      id: "date_of_birth",
      label: "Date of birth",
      name: "date_of_birth",
      component: DatePickerField,
    },

    {
      id: "nationality",
      label: "Nationality",
      name: "nationality",
      component: SelectField,
      options: Config.Nationalities,
    },
    {
      id: "appointment_date",
      label: "Appointment Date",
      name: "appointment_date",
      component: DatePickerField,
    },
    {
      id: "joining_date",
      label: "Joining Date",
      name: "joining_date",
      component: DatePickerField,
    },
    {
      id: "father_name",
      label: "Father Name",
      name: "father_name",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "mother_name",
      label: "Mother Name",
      name: "mother_name",
      // disabled: true,
      component: TextFieldComponent,
    },

    {
      id: "father_occupation",
      label: "Father Occupation",
      name: "father_occupation",
      component: SelectField,
      options: Config.occupations,
    },
    {
      id: "mother_tounge",
      label: "Mother Tounge",
      name: "mother_tounge",
      component: SelectField,
      options: Config.MotherTongues,
    },
    {
      id: "religion",
      label: "Religion",
      name: "religion",
      component: SelectField,
      options: Config.IndianReligions,
    },
    {
      id: "social_category",
      label: "Social Category",
      name: "social_category",
      component: SelectField,
      options: Config.SocialCategories,
    },
    {
      id: "marital_status",
      label: "Marital Status",
      name: "marital_status",
      component: SelectField,
      options: Config.MaritalStatus,
    },
    {
      id: "blood_group",
      label: "Blood Group",
      name: "blood_group",
      component: SelectField,
      options: Config.BloodGroups,
    },
    {
      id: "adhar_card_no",
      label: "Adhar Card No",
      name: "adhar_card_no",
      // disabled: true,
      component: TextFieldComponent,
    },

    {
      id: "cast",
      label: "Cast",
      name: "cast",
      component: SelectField,
      options: Config.AllCastes,
    },
    {
      id: "place_of_birth",
      label: "Place Of Birth",
      name: "place_of_birth",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "weight",
      label: "Weight",
      name: "weight",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "height",
      label: "Height",
      name: "height",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "mobile_no",
      label: "Mobile No",
      name: "mobile_no",
      // disabled: true,
      component: TextFieldComponent,
    },

    {
      id: "wedding_date",
      label: "Wedding Date",
      name: "wedding_date",
      component: DatePickerField,
    },
    {
      id: "qualification_for_printing",
      label: "Qualification For Printing",
      name: "qualification_for_printing",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "email_id",
      label: "Email Id",
      name: "email_id",
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
      id: "reporting_person",
      label: "Reporting Person",
      name: "reporting_person",
      component: SelectField,
      options: Config.SectionList,
    },
    {
      id: "rejoin_reason",
      label: "Rejoin Reason",
      name: "rejoin_reason",
      // disabled: true,
      component: TextFieldComponent,
    },
  ];

  const persentAddress = [
    {
      id: "persent_address",
      label: "Address",
      name: "persent_address",
      component: TextFieldComponent,
    },

    {
      id: "persent_country",
      label: "Country",
      name: "persent_country",
      component: SelectField,
      options: Config.CountryDta,
    },
    {
      id: "persent_state",
      label: "State",
      name: "persent_state",
      component: SelectField,
      options: Config.SectionList,
    },
    {
      id: "persent_city",
      label: "City",
      name: "persent_city",
      component: SelectField,
      options: Config.SectionList,
    },
    {
      id: "persent_pincode",
      label: "Pincode",
      name: "persent_pincode",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "persent_number",
      label: "Mobile No.",
      name: "persent_number",
      // disabled: true,
      component: TextFieldComponent,
    },
  ];
  const permanentAddress = [
    {
      id: "permanent_address",
      label: "Address",
      name: "permanent_address",
      component: TextFieldComponent,
    },

    {
      id: "permanent_country",
      label: "Country",
      name: "permanent_country",
      component: SelectField,
      options: Config.CountryDta,
    },
    {
      id: "permanent_state",
      label: "State",
      name: "permanent_state",
      component: SelectField,
      options: Config.SectionList,
    },
    {
      id: "permanent_city",
      label: "City",
      name: "permanent_city",
      component: SelectField,
      options: Config.SectionList,
    },
    {
      id: "permanent_pincode",
      label: "Pincode",
      name: "permanent_pincode",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "permanent_number",
      label: "Mobile No.",
      name: "permanent_number",
      // disabled: true,
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
            <Box className="flex w-[100%] flex-wrap justify-between mt-7">
              {fields.map((field) => (
                <Box key={field.id} className="lg:w-[32.5%]  w-[100%]">
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
            <Typography
              className="font-bold text-[20px] mt-5"
              sx={{ mt: 2, mb: 1, fontSize: "20px" }}
              variant="h5"
            >
              Persent Address
            </Typography>
            <Grid className="border rounded-lg p-6">
              <Box className="flex w-[100%] flex-wrap justify-between mt-7">
                {persentAddress.map((field) => (
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
            </Grid>
            <Typography
              className="font-bold text-[20px] mt-5"
              sx={{ mt: 2, mb: 1, fontSize: "20px" }}
              variant="h5"
            >
              Permanent Address
            </Typography>
            <Grid className="border rounded-lg p-6">
              <Box className="flex w-[100%] flex-wrap justify-between mt-7">
                {permanentAddress.map((field) => (
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
            </Grid>
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

export default BasicInformation;

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  TextField,
  MenuItem,
  Button,
  Typography,
  FormControl,
  Select,
  InputLabel,
  Autocomplete,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as Yup from "yup";
import { Plus, PlusBox } from "mdi-material-ui";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomButton from "@/components/CommonButton/CustomButton";

const validationSchema = Yup.object().shape({
  // name: Yup.string().required("Name is required"),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  // gender: Yup.string().required("Gender is required"),
});

const genders = [
  {
    value: "male",
    label: "Male",
  },
  {
    value: "female",
    label: "Female",
  },
  {
    value: "other",
    label: "Other",
  },
];

const AdditionalDetails = () => {
  // const classes = useStyles();
  const [emergencyToggle, setEmergencyToggle] = useState(false);
  const [authorisedToggle, setauthorisedToggle] = useState(false);
  const handleSubmit = async (values, { setSubmitting, setStatus }) => {
    console.log(values, { setSubmitting, setStatus }, "-dsfsdfdsfsfsd");
    try {
      // Simulate form submission delay (you can replace this with actual API call)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Handle form submission
      console.log(values);
      setStatus({ success: true });
    } catch (error) {
      setStatus({ success: false });
    }
    setSubmitting(false);
  };

  const qualifications = [
    { id: "1", name: "High School" },
    { id: "2", name: "Bachelor's Degree" },
    { id: "3", name: "Master's Degree" },
    { id: "4", name: "PhD" },
    { id: "5", name: "Professional Certification" },
  ];

  const cities = [
    { id: "1", name: "New York" },
    { id: "2", name: "Los Angeles" },
    { id: "3", name: "Chicago" },
    { id: "4", name: "Houston" },
    { id: "5", name: "Phoenix" },
    { id: "6", name: "Philadelphia" },
    { id: "7", name: "San Antonio" },
    { id: "8", name: "San Diego" },
    { id: "9", name: "Dallas" },
    { id: "10", name: "San Jose" },
  ];

  return (
    <Formik
      initialValues={{
        admission_no: "",
        sibling_adm_no: "",
        fee_no: "",
        parent_id: "",
        second_language: "",
        thrid_language: "",
        living_with: "",
        meals: "",
        place_of_birth: "",
        country: [],
        certificate_no: "",
        certificate_date: "",
        certificate_corp_no: "",
        school_name: "",
        tc_no: "",
        leavign_reason: "",
        syllabus: "",
        class: "",
        tc_date: "",
        address: "",
        tc_date: "",
        previous_address: "",
        previous_city:'',
        previous_state:'',
        previous_country:'',
        previous_pincode:'',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        status,
        handleChange,
        handleBlur,
        values,
        setFieldValue,
      }) => (
        <Form>
            <p>All aditional field added here</p>

          <div className="flex  mt-[40px] flex-wrap w-[100%] gap-4">
            <div className="w-[48.5%]">
              <Field
                name="second_language"
                as={TextField}
                select
                label="Second Language"
                variant="outlined"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={false}
                helperText={<ErrorMessage name="second_language" />}
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
            </div>
            <div className="w-[48.5%]">
              <Field
                name="thrid_language"
                as={TextField}
                select
                label="Third Language"
                variant="outlined"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={false}
                helperText={<ErrorMessage name="thrid_language" />}
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
            </div>
            <div className="w-[48.5%]">
              <Field
                name="living_with"
                as={TextField}
                select
                label="Living With"
                variant="outlined"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={false}
                helperText={<ErrorMessage name="living_with" />}
              >
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
            </div>
            <div className="w-[48.5%]">
              <Autocomplete
                options={cities}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Meals"
                    variant="outlined"
                    fullWidth
                    error={false}
                    helperText={<ErrorMessage name="meals" />}
                  />
                )}
                value={null}
                onChange={(event, value) =>
                  setFieldValue("meals", value ? value.name : "")
                }
                onBlur={() => {}}
              />
            </div>
          </div>

          <div className="mt-[20px] ">
            <span className="font-black text-[18px] ">Birth Details</span>
            <div className=" border  p-6 rounded-2xl mt-3">
              <div className="flex  flex-wrap w-[100%] gap-4">
                <div className="w-[32.5%]">
                  <Field
                    name="place_of_birth"
                    as={TextField}
                    label="Place of Birth"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="place_of_birth" />}
                  />
                </div>
                <div className="w-[32.5%]">
                  <Autocomplete
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        variant="outlined"
                        fullWidth
                        error={false}
                        helperText={<ErrorMessage name="country" />}
                      />
                    )}
                    value={null}
                    onChange={(event, value) =>
                      setFieldValue("country", value ? value.name : "")
                    }
                    onBlur={() => {}}
                  />
                </div>

                <div className="w-[32.5%]">
                  <Field
                    name="certificate_no"
                    as={TextField}
                    label="Certificate No"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="certificate_no" />}
                  />
                </div>
                <div className="w-[32.5%]">
                  <DatePicker
                    label="Date Of Birth"
                    value={null}
                    fullWidth
                    className="w-[100%]"
                    onChange={(newValue) => {
                      setFieldValue("certificate_date", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        error={false}
                        helperText={<ErrorMessage name="certificate_date" />}
                      />
                    )}
                  />
                </div>
                <div className="w-[32.5%]">
                  <Field
                    name="certificate_corp_no"
                    as={TextField}
                    label="Certificate Corp No"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="certificate_corp_no" />}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[20px] mb-5">
            <span className="font-black text-[18px] ">
              Perivios School Details
            </span>
            <div className=" border  p-6 rounded-2xl mt-3">
              <div className="flex  flex-wrap w-[100%] gap-4">
                <div className="w-[32.5%]">
                  <Field
                    name="school_name"
                    as={TextField}
                    label="School Name"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="school_name" />}
                  />
                </div>
                <div className="w-[32.5%]">
                  <Field
                    name="tc_no"
                    as={TextField}
                    label="TC No"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="tc_no" />}
                  />
                </div>
                <div className="w-[32.5%]">
                  <Field
                    name="leavign_reason"
                    as={TextField}
                    label="Leaving Reason"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="leavign_reason" />}
                  />
                </div>
                <div className="w-[32.5%]">
                  <Field
                    name="syllabus"
                    as={TextField}
                    select
                    label="Syllabus"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="syllabus" />}
                  >
                    {genders.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                <div className="w-[32.5%]">
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
                    helperText={<ErrorMessage name="class" />}
                  >
                    {genders.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                <div className="w-[32.5%]">
                  <DatePicker
                    label="TC Birth"
                    value={null}
                    fullWidth
                    className="w-[100%]"
                    onChange={(newValue) => {
                      setFieldValue("tc_date", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        error={false}
                        helperText={<ErrorMessage name="tc_date" />}
                      />
                    )}
                  />
                </div>
                <div className="w-[66%]">
                  <Field
                    name="previous_address"
                    as={TextField}
                    label="Address"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="previous_address" />}
                  />
                </div>
                <div className="w-[32.5%]">
                  <Autocomplete
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Country"
                        variant="outlined"
                        fullWidth
                        error={false}
                        helperText={<ErrorMessage name="previous_country" />}
                      />
                    )}
                    value={null}
                    onChange={(event, value) =>
                      setFieldValue("previous_country", value ? value.name : "")
                    }
                    onBlur={() => {}}
                  />
                </div>
                <div className="w-[32.5%]">
                  <Autocomplete
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="State"
                        variant="outlined"
                        fullWidth
                        error={false}
                        helperText={<ErrorMessage name="previous_state" />}
                      />
                    )}
                    value={null}
                    onChange={(event, value) =>
                      setFieldValue("previous_state", value ? value.name : "")
                    }
                    onBlur={() => {}}
                  />
                </div>
                <div className="w-[32.5%]">
                  <Autocomplete
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="City"
                        variant="outlined"
                        fullWidth
                        error={false}
                        helperText={<ErrorMessage name="previous_city" />}
                      />
                    )}
                    value={null}
                    onChange={(event, value) =>
                      setFieldValue("previous_city", value ? value.name : "")
                    }
                    onBlur={() => {}}
                  />
                </div>
                <div className="w-[32.5%]">
                  <Field
                    name="previous_pincode"
                    as={TextField}
                    label="Pincode"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="previous_pincode" />}
                  />
                </div>
              </div>
            </div>
          </div>

          {status && status.success === false && (
            <Typography className={classes.error} variant="body1">
              Form submission failed. Please try again.
            </Typography>
          )}
          <div className="flex justify-end mr-12 mb-5 ">
            <CustomButton
              type="submit"
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              className="bg-red-200 py-1 px-5"
              sx={{ py: 1, px: 5, fontWeight: "bold", fontSize: "16px" }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </CustomButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AdditionalDetails;

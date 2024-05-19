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

// const useStyles = makeStyles((theme) => ({
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: theme.spacing(2),
//   },
//   error: {
//     color: 'red',
//   },
// }));

const ParentDetails = () => {
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
        name: "",
        email: "",
        gender: "",

        admission_no: "",
        fee_no: "",
        parent_id: "",
        father_name: "",
        qualifications: [],
        occupation: "",
        designation: "",
        org_name: "",
        org_address: "",
        email: "",
        city: "",
        state: "",
        nationality: "",
        satate: "",
        annual_income: "",
        country: "",
        telephone: "",
        pincode: "",
        mobile: "",
        mother_name: "",
        mother_qualification: [],
        mother_occupation: "",
        mother_designation: "",
        mother_org_name: "",
        mother_org_address: "",
        mother_email: "",
        mother_nationality: "",
        mother_satate: "",
        mother_annual_income: "",
        mother_country: "",
        mother_telephone: "",
        mother_state: "",
        mother_pincode: "",
        mother_mobile: "",
        guardian_name: "",
        guardian_relation: "",
        guardian_mobile_no: "",
        guardian_email: "",
        guardian_address: "",
        father_image: "",
        mother_image: "",
        guardian_image: null,
        emergency_name: "",
        emergency_relation: "",
        emergency_phone_no: "",
        emergency_remark: "",
        authorised_name: "",
        authorised_relation: "",
        authorised_phone_no: "",
        authorised_remark: "",
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
          <div className="mt-[40px] ">
            <span className="font-black text-[18px] ">Father's Details</span>
            <p>sibling details get by id later</p>
            <div className=" border  p-6 rounded-2xl mt-3">
              <div className="lg:flex w-[100%] gap-4">
                <div className=" lg:w-[20%] w-[100%]  flex justify-center items-center ">
                  <div className="w-[200px] h-[200px] rounded-full ">
                    <div>
                      <img
                        src={"/images/user.png"}
                        alt="Picture of the author"
                        // width={150}
                        className="border rounded-full object-contain w-[200px] h-[200px]"
                        // height={150}
                      />
                      {/* <div >
                <CameraAltIcon  fontSize={'large'} className="border absolute left-[400px] top-[390px] z-[999] "/>
            </div> */}
                    </div>
                  </div>
                </div>

                <div className="flex  flex-wrap lg:w-[80%] w-[100%] gap-4">
                  <div className="lg:w-[66%] w-[100%]">
                    <Field
                      name="father_name"
                      as={TextField}
                      label="Father's Name"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="father_name" />}
                    />
                  </div>
                  <div className="lg:w-[32%] w-[100%]">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="qualifications-label">
                        Qualifications
                      </InputLabel>
                      <Field
                        name="qualifications"
                        as={Select}
                        label="qualifications"
                        multiple
                        value={values.qualifications}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={false}
                        renderValue={(selected) =>
                          selected
                            .map(
                              (value) =>
                                qualifications.find((qual) => qual.id === value)
                                  ?.name || ""
                            )
                            .join(", ")
                        }
                      >
                        {qualifications.map((qualification) => (
                          <MenuItem
                            key={qualification.id}
                            value={qualification.id}
                          >
                            {qualification.name}
                          </MenuItem>
                        ))}
                      </Field>
                      <ErrorMessage name="qualifications" component="div" />
                    </FormControl>
                  </div>
                  <div className="lg:w-[32%] w-[100%]">
                    <Field
                      name="occupation"
                      as={TextField}
                      select
                      label="Occupation"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="occupation" />}
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>
                  <div className="lg:w-[32.5%] w-[100%]">
                    <Field
                      name="designation"
                      as={TextField}
                      select
                      label="Designation"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="designation" />}
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>
                  <div className="lg:w-[32.5%] w-[100%]">
                    <Field
                      name="org_name"
                      as={TextField}
                      label="Org Name"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="org_name" />}
                    />
                  </div>
                  <div className="w-[66%]">
                    <Field
                      name="org_address"
                      as={TextField}
                      label="Org Address"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="org_address" />}
                    />
                  </div>
                  <div className="lg:w-[32%] w-[100%]">
                    <Field
                      name="email"
                      as={TextField}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="email" />}
                    />
                  </div>
                </div>
              </div>

              <div className="  flex-wrap flex mt-5  gap-4">
                <div className="lg:w-[32.5%] w-[100%]">
                  <Autocomplete
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nationality"
                        variant="outlined"
                        fullWidth
                        error={false}
                        helperText={<ErrorMessage name="nationality" />}
                      />
                    )}
                    value={null}
                    onChange={(event, value) =>
                      setFieldValue("nationality", value ? value.name : "")
                    }
                    onBlur={() => {}}
                  />
                </div>
                <div className="lg:w-[32.5%] w-[100%]">
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
                <div className="lg:w-[32.5%] w-[100%]">
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
                        helperText={<ErrorMessage name="state" />}
                      />
                    )}
                    value={null}
                    onChange={(event, value) =>
                      setFieldValue("state", value ? value.name : "")
                    }
                    onBlur={() => {}}
                  />
                </div>
                <div className="lg:w-[32.5%] w-[100%]">
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
                        helperText={<ErrorMessage name="city" />}
                      />
                    )}
                    value={null}
                    onChange={(event, value) =>
                      setFieldValue("city", value ? value.name : "")
                    }
                    onBlur={() => {}}
                  />
                </div>
                <div className="lg:w-[32.5%] w-[100%]">
                  <Field
                    name="pincode"
                    as={TextField}
                    label="Pincode"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="pincode" />}
                  />
                </div>
                <div className="lg:w-[32.5%] w-[100%]">
                  <Field
                    name="annual_income"
                    as={TextField}
                    label="Annual Income"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="annual_income" />}
                  />
                </div>
                <div className="lg:w-[32.5%] w-[100%]">
                  <Field
                    name="telephone"
                    as={TextField}
                    label="Telephone"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="telephone" />}
                  />
                </div>
                <div className="lg:w-[32.5%] w-[100%]">
                  <Field
                    name="mobile"
                    as={TextField}
                    label="Mobile"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="mobile" />}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[20px] ">
            <span className="font-black text-[18px] ">Mother's Details</span>
            <div className=" border  p-6 rounded-2xl mt-3">
              <div className="lg:flex w-[100%] gap-4">
                <div className=" lg:w-[20%] w-[100%]  flex justify-center items-center ">
                  <div className="w-[200px] h-[200px] rounded-full ">
                    <div>
                      <img
                        src={"/images/user.png"}
                        alt="Picture of the author"
                        className="border rounded-full object-contain w-[200px] h-[200px]"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex  flex-wrap lg:w-[80%] w-[100%] gap-4">
                  <div className="lg:w-[66%] w-[100%]">
                    <Field
                      name="mother_name"
                      as={TextField}
                      label="Mother's Name"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="mother_name" />}
                    />
                  </div>
                  <div className="lg:w-[32%] w-[100%]">
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="qualifications-label">
                        Qualifications
                      </InputLabel>
                      <Field
                        name="mother_qualification"
                        as={Select}
                        label="Qualifications"
                        multiple
                        value={values.mother_qualification}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        error={false}
                        renderValue={(selected) =>
                          selected
                            .map(
                              (value) =>
                                qualifications.find((qual) => qual.id === value)
                                  ?.name || ""
                            )
                            .join(", ")
                        }
                      >
                        {qualifications.map((qualification) => (
                          <MenuItem
                            key={qualification.id}
                            value={qualification.id}
                          >
                            {qualification.name}
                          </MenuItem>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="mother_qualification"
                        component="div"
                      />
                    </FormControl>
                  </div>
                  <div className="lg:w-[32%] w-[100%]">
                    <Field
                      name="mother_occupation"
                      as={TextField}
                      select
                      label="Occupation"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="mother_occupation" />}
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>
                  {/* <div className="lg:w-[32.5%] w-[100%]">
                    <Field
                      name="mother_designation"
                      as={TextField}
                      select
                      label="Designation"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="mother_designation" />}
                    >
                      {genders.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </div> */}
                  <div className="lg:w-[32.5%] w-[100%]">
                    <Field
                      name="mother_org_name"
                      as={TextField}
                      label="Org Name"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="mother_org_name" />}
                    />
                  </div>
                  <div className="lg:w-[66%] w-[100%]">
                    <Field
                      name="mother_org_address"
                      as={TextField}
                      label="Org Address"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="mother_org_address" />}
                    />
                  </div>
                  <div className="lg:w-[32%] w-[100%]">
                    <Field
                      name="mother_email"
                      as={TextField}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="mother_email" />}
                    />
                  </div>
                </div>
              </div>

              <div className="  flex-wrap flex mt-5  gap-4">
                <div className="lg:w-[32.5%] w-[100%]">
                  <Autocomplete
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Nationality"
                        variant="outlined"
                        fullWidth
                        error={false}
                        helperText={<ErrorMessage name="nationality" />}
                      />
                    )}
                    value={null}
                    onChange={(event, value) =>
                      setFieldValue("nationality", value ? value.name : "")
                    }
                    onBlur={() => {}}
                  />
                </div>
                <div className="lg:w-[32.5%] w-[100%]">
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
                <div className="lg:w-[32.5%] w-[100%]">
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
                        helperText={<ErrorMessage name="state" />}
                      />
                    )}
                    value={null}
                    onChange={(event, value) =>
                      setFieldValue("state", value ? value.name : "")
                    }
                    onBlur={() => {}}
                  />
                </div>
                <div className="lg:w-[32.5%] w-[100%]">
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
                        helperText={<ErrorMessage name="city" />}
                      />
                    )}
                    value={null}
                    onChange={(event, value) =>
                      setFieldValue("city", value ? value.name : "")
                    }
                    onBlur={() => {}}
                  />
                </div>
                <div className="lg:w-[32.5%] w-[100%]">
                  <Field
                    name="pincode"
                    as={TextField}
                    label="Pincode"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="pincode" />}
                  />
                </div>
                <div className="lg:w-[32.5%] w-[100%]">
                  <Field
                    name="annual_income"
                    as={TextField}
                    label="Annual Income"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="annual_income" />}
                  />
                </div>
                <div className="lg:w-[32.5%] w-[100%]">
                  <Field
                    name="telephone"
                    as={TextField}
                    label="Telephone"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="telephone" />}
                  />
                </div>
                <div className="lg:w-[32.5%] w-[100%]">
                  <Field
                    name="mobile"
                    as={TextField}
                    label="Mobile"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="mobile" />}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-[20px] ">
            <span className="font-black text-[18px] ">Guardian Details</span>
            <div className=" border  p-6 rounded-2xl mt-3">
              <div className=" lg:flex w-[100%] gap-4">
                <div className=" lg:w-[20%] w-[100%]  flex justify-center items-center ">
                  <div className="w-[200px] h-[200px] rounded-full ">
                    <div>
                      <img
                        src={"/images/user.png"}
                        alt="Picture of the author"
                        className="border rounded-full object-contain w-[200px] h-[200px]"
                      />
                      {/* <input
            type="file"
            className="border rounded-full"
            onChange={(event) => {
              setFieldValue('guardian_image', event.currentTarget.files[0]);
            }}
          /> */}
                      <ErrorMessage name="guardian_image" component="div" />
                    </div>
                  </div>
                </div>

                <div className="flex  flex-wrap lg:w-[80%] w-[100%] gap-4">
                  <div className="lg:lg:w-[49%] w-[100%]">
                    <Field
                      name="guardian_name"
                      as={TextField}
                      label="Guardian Name"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="guardian_name" />}
                    />
                  </div>
                  <div className="lg:w-[49%] w-[100%]">
                    <Field
                      name="guardian_relation"
                      as={TextField}
                      label="Relation"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="guardian_relation" />}
                    />
                  </div>
                  <div className="lg:w-[49%] w-[100%]">
                    <Field
                      name="guardian_mobile_no"
                      as={TextField}
                      label="Mobile No"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="guardian_mobile_no" />}
                    />
                  </div>
                  <div className="lg:w-[49%] w-[100%]">
                    <Field
                      name="guardian_email"
                      as={TextField}
                      label="Email"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="guardian_email" />}
                    />
                  </div>
                  <div className="lg:w-[49%] w-[100%]">
                    <Field
                      name="guardian_address"
                      as={TextField}
                      label="Address"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="guardian_address" />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:flex justify-between mt-5 mb-5">
            <div className="border mb-5 p-4 lg:w-[49%] w-[100%] rounded-xl">
              <div className="flex justify-between items-center ">
                <span className="font-black text-[16px] ">
                  Emergency Contact
                </span>
                <div
                  className="cursor-pointer"
                  onClick={() => setEmergencyToggle(true)}
                >
                  <PlusBox sx={{ fontSize: 25 }} />
                </div>
              </div>
              {emergencyToggle && (
                <div className="flex  flex-wrap w-[100%] justify-between mt-10">
                  <div className="lg:w-[49%] w-[100%] mb-3">
                    <Field
                      name="emergency_name"
                      as={TextField}
                      label="Name"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="emergency_name" />}
                    />
                  </div>
                  <div className="lg:w-[49%] w-[100%]">
                    <Field
                      name="emergency_relation"
                      as={TextField}
                      label="Relation"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="emergency_relation" />}
                    />
                  </div>
                  <div className="lg:w-[49%] w-[100%]">
                    <Field
                      name="emergency_phone_no"
                      as={TextField}
                      label="Mobile No"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="emergency_phone_no" />}
                    />
                  </div>
                  <div className="lg:w-[49%] w-[100%]">
                    <Field
                      name="emergency_remark"
                      as={TextField}
                      label="Remark"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="emergency_remark" />}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="border p-4 lg:w-[49%] w-[100%] rounded-xl h-auto">
              <div className="flex justify-between items-center ">
                <span className="font-black text-[16px] ">
                  Authorised Pickup Details
                </span>
                <div
                  className="cursor-pointer"
                  onClick={() => setauthorisedToggle(true)}
                >
                  <PlusBox sx={{ fontSize: 25 }} />
                </div>
              </div>
              {authorisedToggle && (
                <div className="flex  flex-wrap w-[100%] justify-between mt-10">
                  <div className="lg:w-[49%] w-[100%] mb-3">
                    <Field
                      name="authorised_name"
                      as={TextField}
                      label="Name"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="authorised_name" />}
                    />
                  </div>
                  <div className="lg:w-[49%] w-[100%]">
                    <Field
                      name="authorised_relation"
                      as={TextField}
                      label="Relation"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="authorised_relation" />}
                    />
                  </div>
                  <div className="lg:w-[49%] w-[100%]">
                    <Field
                      name="authorised_phone_no"
                      as={TextField}
                      label="Mobile No"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="authorised_phone_no" />}
                    />
                  </div>
                  <div className="lg:w-[49%] w-[100%]">
                    <Field
                      name="authorised_remark"
                      as={TextField}
                      label="Remark"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="authorised_remark" />}
                    />
                  </div>
                </div>
              )}
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

export default ParentDetails;

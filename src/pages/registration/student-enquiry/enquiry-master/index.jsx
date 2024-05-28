import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/TextInput";
import {
  Autocomplete,
  Checkbox,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomButton from "@/components/CommonButton/CustomButton";
import { AddStudent, StateData, cityData } from "@/services/api";
import { useQuery } from "react-query";
import Config from "@/utilities/Config";
import moment from "moment";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const EnquiryMaster = ({ setSlectedTab, studenData }) => {
  const router = useRouter();

  const [presentState, setPresentState] = useState("");
  const [confirmAddress, setConfrimAddress] = useState(false);
  const {
    data: allState,
    status: stateStatus,
    isLoading: stateIsloading,
    refetch: stateRefetch,
  } = useQuery("StateData", async () => {
    const payload = {};
    const res = await StateData(payload);
    return res?.data;
  });
  // const {
  //   data: allCountry,
  //   status: countryStatus,
  //   isLoading: countryIsloadimng,
  //   refetch: coutryFetch,
  // } = useQuery("countryData", async () => {
  //   const payload = {};
  //   const res = await countryData(payload);
  //   return res?.data;
  // });
  const {
    data: allcity,
    status: cityStatus,
    isLoading: cityIsloadimng,
    refetch: ciftyRefetch,
  } = useQuery("cityData", async () => {
    const payload = {
      state: presentState || studenData?.address?.present_address?.state,
    };
    if (presentState || studenData?.address?.present_address?.state) {
      const res = await cityData(payload);
      return res?.data;
    }
  });

  useEffect(() => {
    // if (presentState) {
    ciftyRefetch(studenData?.address?.present_address?.state);
    // }
  }, [presentState, studenData?.address?.present_address?.state]);

  const genders = [
    {
      value: "1",
      label: "Male",
    },
    {
      value: "2",
      label: "Female",
    },
    {
      value: "3",
      label: "Other",
    },
  ];

  const handleSubmit = async (values) => {
    console.log(values, "-dsfsdfdsfsfsd");
    const payload = {};
    payload.search = values.search;
    payload.enquiry_id = values.enquiry_id;
    payload.enquiry_id = values.enquiry_id;
    payload.name = {
      first_name: values?.first_name,
      middle_name: values?.middle_name,
      last_name: values?.last_name,
    };
    payload.gender = values?.gender;
    payload.selected_status = values?.selected_status;
    payload.date_of_birth = moment(values?.dob).format("YYYY-MM-DD");
    payload.class = values?.class;
    payload.present_class = values?.present_class;
    payload.joining_year = values?.joining_year;
    payload.present_school = values?.present_school;
    payload.reason = values?.reason;
    payload.nationality = values?.nationality;
    payload.social_category = values?.social_category;
    payload.email = values?.email;
    payload.same_present_add = values?.same_present_add;
    payload.emergency_number = values?.emergency_no;
    (payload.present_address = {
      country: values.present_country,
      city: values.present_city,
      state: values.present_state,
      pin_code: values.present_pincode,
      address: values.present_address,
      locality: values.present_locality,
    }),
      (payload.permanent_address = {
        country: confirmAddress
          ? values.present_country
          : values.permanent_country,
        city: confirmAddress ? values.present_city : values.permanent_city,
        state: confirmAddress ? values.present_state : values.permanent_State,
        pin_code: confirmAddress
          ? values.present_pincode
          : values.permanent_pincode,
        address: confirmAddress
          ? values.present_address
          : values.permanent_address,
        locality: confirmAddress
          ? values.present_locality
          : values.permanent_locality,
      });
    payload.father_name = values?.father_name;
    payload.father_qualifications = values?.father_qualifications;
    payload.father_occupation = values?.father_occupation;
    payload.father_email = values?.father_email;
    payload.father_email = values?.father_email;
    payload.father_org_name = values?.father_org_name;
    payload.father_org_address = values?.father_org_address;
    payload.father_nationality = values?.father_nationality;
    payload.father_country = values?.father_country;
    payload.father_state = values?.father_state;
    payload.father_city = values?.father_city;
    payload.father_pincode = values?.father_pincode;
    payload.father_annual_income = values?.father_annual_income;
    payload.father_mobile = values?.father_mobile;
    payload.mother_name = values?.mother_name;
    payload.mother_qualifications = values?.mother_qualifications;
    payload.mother_occupation = values?.mother_occupation;
    payload.mother_email = values?.mother_email;
    payload.mother_email = values?.mother_email;
    payload.mother_org_name = values?.mother_org_name;
    payload.mother_org_address = values?.mother_org_address;
    payload.mother_nationality = values?.mother_nationality;
    payload.mother_country = values?.mother_country;
    payload.mother_state = values?.mother_state;
    payload.mother_city = values?.mother_city;
    payload.mother_pincode = values?.mother_pincode;
    payload.mother_annual_income = values?.mother_annual_income;
    payload.mother_mobile = values?.mother_mobile;

    console.log(payload, "----payload");
    try {
      const resp = await AddStudent(payload);
      if (resp?.success === true) {
        toast.success("Student Details Add successfully");
        setSlectedTab(2);
      }
      console.log(resp?.success, "-sdcdsf");
      // Handle form submission
      console.log(values);
      // setStatus({ success: true });
    } catch (error) {
      // setStatus({ success: false });
    }
    // setSubmitting(false);
  };
  const initialValues = {
    search: studenData?.search || "",
    enquiry_id: studenData?.enquiry_id || "",
    first_name: studenData?.name?.first_name || "",
    middle_name: studenData?.name?.middle_name || "",
    last_name: studenData?.name?.last_name || "",
    gender: studenData?.gender || "",
    dob: studenData?.date_of_birth || new Date(),
    class: studenData?.class || "",
    present_class: studenData?.present_class || "",
    joining_year: studenData?.joining_year || "",
    present_school: studenData?.present_school || "",
    selected_status: studenData?.selected_status || "",
    reason: studenData?.reason || "",
    nationality: studenData?.nationality || "",
    social_category: studenData?.social_category || "",
    email: studenData?.email || "",
    same_present_add: studenData?.same_present_add || "",
    emergency_no: studenData?.emergency_number || "",
    present_address: studenData?.address?.present_address?.address || "",
    present_city: studenData?.address?.present_address?.city || "",
    present_state: studenData?.address?.present_address?.state || "",
    present_pincode: studenData?.address?.present_address?.pin_code || "",
    present_locality: studenData?.address?.present_address?.locality || "",
    present_country: studenData?.address?.present_address?.country || "india",
    present_telephone: studenData?.address?.present_address?.telephone || "",
    permanent_address: studenData?.address?.permanent_address?.address || "",
    permanent_city: studenData?.address?.permanent_address?.city || "",
    permanent_state: studenData?.address?.permanent_address?.state || "",
    permanent_pincode: studenData?.address?.permanent_address?.pin_code || "",
    permanent_locality: studenData?.address?.permanent_address?.locality || "",
    permanent_country:
      studenData?.address?.permanent_address?.country || "india",
    permanent_telephone:
      studenData?.address?.permanent_address?.telephone || "",

    father_name: "",
    father_qualifications: "",
    father_occupation: "",
    father_email: "",
    father_org_name: "",
    father_org_address: "",
    father_nationality: "",
    father_country: "",
    father_state: "",
    father_city: "",
    father_pincode: "",
    father_annual_income: "",
    father_mobile: "",

    mother_name: "",
    mother_qualifications: "",
    mother_occupation: "",
    mother_email: "",
    mother_org_name: "",
    mother_org_address: "",
    mother_nationality: "",
    mother_country: "",
    mother_state: "",
    mother_city: "",
    mother_pincode: "",
    mother_annual_income: "",
    mother_mobile: "",
  };

  const optionalString = Yup.string()
    .nullable()
    .transform((_, val) => (val === "" ? null : val));

  const validationSchema = Yup.object().shape({
    search: optionalString,
    enquiry_id: optionalString,
    first_name: Yup.string().required("First name is required"),
    middle_name: optionalString,
    last_name: Yup.string().required("Last name is required"),
    gender: Yup.string().required("Gender is required"),
    dob: Yup.date().required("Date of birth is required").nullable(),
    class: optionalString,
    present_class: optionalString,
    joining_year: optionalString,
    present_school: optionalString,
    reason: optionalString,
    nationality: optionalString,
    social_category: optionalString,
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    same_present_add: optionalString,
    emergency_no: Yup.string().required("Emergency number is required"),

    present_address: optionalString,
    present_city: optionalString,
    present_state: optionalString,
    present_pincode: optionalString,
    present_locality: optionalString,
    present_country: optionalString.default("india"),
    present_telephone: optionalString,

    permanent_address: optionalString,
    permanent_city: optionalString,
    permanent_state: optionalString,
    permanent_pincode: optionalString,
    permanent_locality: optionalString,
    permanent_country: optionalString.default("india"),
    permanent_telephone: optionalString,

    father_name: optionalString,
    father_qualifications: optionalString,
    father_occupation: optionalString,
    father_email: Yup.string().email("Invalid email format"),
    father_org_name: optionalString,
    father_org_address: optionalString,
    father_nationality: optionalString,
    father_country: optionalString,
    father_state: optionalString,
    father_city: optionalString,
    father_pincode: optionalString,
    father_annual_income: Yup.number()
      .nullable()
      .transform((_, val) => (val === "" ? null : val)),
    father_mobile: optionalString,

    mother_name: optionalString,
    mother_qualifications: optionalString,
    mother_occupation: optionalString,
    mother_email: Yup.string().email("Invalid email format"),
    mother_org_name: optionalString,
    mother_org_address: optionalString,
    mother_nationality: optionalString,
    mother_country: optionalString,
    mother_state: optionalString,
    mother_city: optionalString,
    mother_pincode: optionalString,
    mother_annual_income: Yup.number()
      .nullable()
      .transform((_, val) => (val === "" ? null : val)),
    mother_mobile: optionalString,
  });

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

  console.log(new Date());
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
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
          <div className="mt-[40px] ">
            <div className=" ">
              <div className="lg:flex w-[100%] gap-4">
                <div className="flex  flex-wrap lg:w-[100%] w-[100%] gap-4">
                  <div className="lg:w-[100%] w-[100%]">
                    <Field
                      name="search"
                      as={TextField}
                      label="Search"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      value={values.search}
                      helperText={<ErrorMessage name="search" />}
                    />
                  </div>

                  {/* Not Required */}

                  <div className="lg:w-[32.5%] w-[100%]">
                    <Field
                      name="enquiry_id"
                      as={TextField}
                      label="Enquiry Id"
                      variant="outlined"
                      // required
                      value={values.enquiry_id}
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="enquiry_id" />}
                    />
                  </div>
                  <div className="lg:w-[32.5%]  w-[100%]">
                    <Field
                      name="first_name"
                      as={TextField}
                      label="First Name"
                      variant="outlined"
                      // required
                      value={values.first_name}
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="first_name" />}
                    />
                  </div>
                  <div className="lg:w-[32.5%]  w-[100%]">
                    <Field
                      name="middle_name"
                      as={TextField}
                      label="Middle Name"
                      variant="outlined"
                      fullWidth
                      value={values.middle_name}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="middle_name" />}
                    />
                  </div>
                  <div className="lg:w-[32.5%]  w-[100%]">
                    <Field
                      name="last_name"
                      as={TextField}
                      label="Last Name"
                      variant="outlined"
                      // required
                      value={values.last_name}
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="last_name" />}
                    />
                  </div>
                  <div className="lg:w-[32.5%]  w-[100%]">
                    <Field
                      name="gender"
                      as={TextField}
                      select
                      label="Gender"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      value={values.gender}
                      helperText={<ErrorMessage name="gender" />}
                    >
                      {genders?.map((option) => (
                        <MenuItem key={option.label} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>

                  <div className="lg:w-[32.5%]  w-[100%]">
                    <DatePicker
                      label="Date Of Birth"
                      value={null}
                      fullWidth
                      className="w-[100%]"
                      onChange={(newValue) => {
                        setFieldValue("dob", newValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          fullWidth
                          // required
                          error={false}
                          helperText={<ErrorMessage name="dob" />}
                        />
                      )}
                    />
                  </div>
                  <div className="lg:w-[32.4%]  w-[100%]">
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
                  </div>
                  <div className="lg:w-[32.4%]  w-[100%]">
                    <Field
                      name="present_class"
                      as={TextField}
                      select
                      label="Present Class"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      value={values.present_class}
                      helperText={<ErrorMessage name="present_class" />}
                    >
                      {Config?.ClassList.map((option) => (
                        <MenuItem key={option.label} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>

                  <div className="lg:w-[32.4%]  w-[100%]">
                    <Field
                      name="joining_year"
                      as={TextField}
                      select
                      label="Joining Year"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      value={values.joining_year}
                      helperText={<ErrorMessage name="joining_year" />}
                    >
                      {Config?.joiningYear.map((option) => (
                        <MenuItem key={option.label} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>
                  {
                    <div className="lg:w-[32.4%]  w-[100%]">
                      <Field
                        name="selected_status"
                        as={TextField}
                        select
                        label="Selected Status"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.selected_status}
                        helperText={<ErrorMessage name="selected_status" />}
                      >
                        {Config?.StreamList.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                  }
                  <div className="lg:w-[32.5%]  w-[100%]">
                    <Field
                      name="present_school"
                      as={TextField}
                      label="Present School"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.present_school}
                      error={false}
                      helperText={<ErrorMessage name="present_school" />}
                    />
                  </div>
                  <div className="lg:w-[32.5%]  w-[100%]">
                    <Field
                      name="reason"
                      as={TextField}
                      label="Reason"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.reason}
                      error={false}
                      helperText={<ErrorMessage name="reason" />}
                    />
                  </div>
                  <div className="lg:w-[32.5%]  w-[100%]">
                    <Field
                      name="nationality"
                      as={TextField}
                      select
                      label="Nationality"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      value={values.nationality}
                      helperText={<ErrorMessage name="nationality" />}
                    >
                      {Config?.Nationalities?.map((option) => (
                        <MenuItem key={option.label} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>
                  <div className="lg:w-[32.5%]  w-[100%]">
                    <Field
                      name="social_category"
                      as={TextField}
                      select
                      label="Social Ctegory"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      value={values.social_category}
                      helperText={<ErrorMessage name="social_category" />}
                    >
                      {Config?.SocialCategories?.map((option) => (
                        <MenuItem key={option.label} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>
                  <div className="lg:w-[32.5%]  w-[100%]">
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
                  <div className="lg:w-[32.5%]  w-[100%]">
                    <Field
                      name="emergency_no"
                      as={TextField}
                      label="Emergency No"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      // onChange={handleChange}
                      onChange={(event) => {
                        const value = event.target.value;
                        // Allow only numbers and limit the length to 10
                        if (/^\d*$/.test(value) && value.length <= 10) {
                          // setFieldValue(values.emergency_no, value);
                          setFieldValue("emergency_no", value);
                        }
                      }}
                      error={false}
                      helperText={<ErrorMessage name="emergency_no" />}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-[20px] ">
                <span className="font-black text-[18px] ">Persent Address</span>
                <div className=" border  p-6 rounded-2xl mt-3">
                  <div className=" w-[100%] ">
                    <div className="w-[100%] mb-5">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Persent Address"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                    <div className="flex  flex-wrap gap-4">
                      <div className="lg:w-[32.5%]  w-[100%]">
                        {
                          <Autocomplete
                            options={[]}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Country"
                                variant="outlined"
                                fullWidth
                                error={false}
                                helperText={
                                  <ErrorMessage name="present_country" />
                                }
                              />
                            )}
                            value={
                              allState?.find(
                                (option) =>
                                  option?.name === values?.present_country
                              ) || null
                            }
                            onChange={(event, value) => {
                              setFieldValue(
                                "present_country",
                                value ? value.name : ""
                              ); // Update Formik's state with the selected state's name
                            }}
                            onBlur={handleBlur}
                          />
                        }
                      </div>
                      <div className="lg:w-[32.5%]  w-[100%]">
                        {
                          <Field
                            name="present_state"
                            as={TextField}
                            select
                            label="State"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={(event) => {
                              const selectedState = event.target.value;
                              setFieldValue("present_state", selectedState);
                              setPresentState(selectedState);
                            }}
                            error={false}
                            value={values.present_state}
                            helperText={<ErrorMessage name="present_state" />}
                          >
                            {allState?.length > 0 &&
                              allState.map((option) => (
                                <MenuItem
                                  key={option.name}
                                  onChange={(e) =>
                                    setPresentState(e?.target?.value)
                                  }
                                  value={option.name}
                                >
                                  {option.name}
                                </MenuItem>
                              ))}
                          </Field>
                        }
                      </div>
                      <div className="lg:w-[32.5%]  w-[100%]">
                        <Field
                          name="present_city"
                          as={TextField}
                          select
                          label="City"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          value={values.present_city}
                          helperText={<ErrorMessage name="present_city" />}
                        >
                          {allcity?.length > 0 &&
                            allcity.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                        </Field>
                      </div>

                      <div className="lg:w-[32.5%]  w-[100%]">
                        <Field
                          name="present_pincode"
                          as={TextField}
                          label="Pincode"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          helperText={<ErrorMessage name="present_pincode" />}
                        />
                      </div>
                      <div className="lg:w-[32.5%]  w-[100%]">
                        <Field
                          name="present_locality"
                          as={TextField}
                          label="Locality"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          helperText={<ErrorMessage name="present_locality" />}
                        />
                      </div>
                      <div className="lg:w-[32.5%]  w-[100%]">
                        <Field
                          name="present_telephone"
                          as={TextField}
                          label="Telephone"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          helperText={<ErrorMessage name="present_telephone" />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[20px] mb-[60px]">
                <div className="flex items-center gap-3">
                  <span className="font-black text-[18px] ">
                    Permanent Address
                  </span>
                  <div className="flex items-center">
                    <Checkbox
                      value={confirmAddress}
                      onChange={() => setConfrimAddress(!confirmAddress)}
                    />
                    <Typography variant="h6" fontWeight={"bold"}>
                      Same as Present Address
                    </Typography>
                  </div>
                </div>
                <div className=" border  p-6 rounded-2xl mt-3">
                  <div className=" w-[100%] ">
                    <div className="w-[100%] mb-5">
                      <Field
                        name="permanent_address"
                        as={TextField}
                        label="Persent Address"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={
                          !confirmAddress
                            ? values?.permanent_address
                            : values.present_address
                        }
                        error={false}
                        helperText={<ErrorMessage name="permanent_address" />}
                      />
                    </div>
                    <div className="flex  flex-wrap gap-4">
                      <div className="lg:w-[32.5%]  w-[100%]">
                        {
                          <Autocomplete
                            options={[]}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                label="Country"
                                variant="outlined"
                                fullWidth
                                error={false}
                                helperText={
                                  <ErrorMessage name="permanent_country" />
                                }
                              />
                            )}
                            value={
                              allState?.find((option) =>
                                option?.name === !confirmAddress
                                  ? values?.permanent_country
                                  : values?.current_country
                              ) || null
                            }
                            onChange={(event, value) => {
                              setFieldValue(
                                "permanent_country",
                                value ? value.name : ""
                              ); // Update Formik's state with the selected state's name
                            }}
                            onBlur={handleBlur}
                          />
                        }
                      </div>

                      <div className="lg:w-[32.5%]  w-[100%]">
                        <Field
                          name="permanent_state"
                          as={TextField}
                          select
                          label="State"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          value={
                            confirmAddress
                              ? values.present_state
                              : values.permanent_state
                          }
                          helperText={<ErrorMessage name="permanent_state" />}
                        >
                          {allState?.length > 0 &&
                            allState.map((option) => (
                              <MenuItem key={option.name} value={option.name}>
                                {option.name}
                              </MenuItem>
                            ))}
                        </Field>
                      </div>
                      <div className="lg:w-[32.5%]  w-[100%]">
                        <Field
                          name="permanent_city"
                          as={TextField}
                          select
                          label="City"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          value={
                            confirmAddress
                              ? values.present_city
                              : values.permanent_city
                          }
                          helperText={<ErrorMessage name="permanent_city" />}
                        >
                          {allcity?.length > 0 &&
                            allcity.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                        </Field>
                      </div>
                      {/* <div className="lg:w-[32.5%]  w-[100%]">
                    <Field
                      name="permanent_country"
                      as={TextField}
                      label="Country"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      value={
                        !confirmAddress
                          ? values?.permanent_country
                          : values.present_country
                      }
                      helperText={<ErrorMessage name="permanent_country" />}
                    />
                  </div> */}
                      <div className="lg:w-[32.5%]  w-[100%]">
                        <Field
                          name="permanent_pincode"
                          as={TextField}
                          label="Pincode"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={
                            !confirmAddress
                              ? values?.permanent_pincode
                              : values.present_pincode
                          }
                          error={false}
                          helperText={<ErrorMessage name="permanent_pincode" />}
                        />
                      </div>
                      <div className="lg:w-[32.5%]  w-[100%]">
                        <Field
                          name="permanent_locality"
                          as={TextField}
                          label="Locality"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          value={
                            !confirmAddress
                              ? values?.permanent_locality
                              : values.present_locality
                          }
                          helperText={
                            <ErrorMessage name="permanent_locality" />
                          }
                        />
                      </div>
                      <div className="lg:w-[32.5%]  w-[100%]">
                        <Field
                          name="permanent_telephone"
                          as={TextField}
                          label="Telephone"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={
                            !confirmAddress
                              ? values?.permanent_telephone
                              : values.present_telephone
                          }
                          error={false}
                          helperText={
                            <ErrorMessage name="permanent_telephone" />
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[40px] ">
                <span className="font-black text-[18px] ">
                  Father's Details
                </span>

                <div className=" border  p-6 rounded-2xl mt-3">
                  <div className="flex  flex-wrap lg:w-[100%] w-[100%] gap-4">
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
                    <div className="lg:w-[32.5%] w-[100%]">
                      <Field
                        name="father_qualifications"
                        as={TextField}
                        select
                        label="Qualification"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={
                          <ErrorMessage name="father_qualifications" />
                        }
                      >
                        {Config?.qualifications?.map((option) => (
                          <MenuItem key={option?.name} value={option?.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    <div className="lg:w-[32.5%] w-[100%]">
                      <Field
                        name="father_occupation"
                        as={TextField}
                        select
                        label="Occupation"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="father_occupation" />}
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
                        name="father_email"
                        as={TextField}
                        label="Email"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="father_email" />}
                      />
                    </div>
                    <div className="lg:w-[32.5%] w-[100%]">
                      <Field
                        name="father_org_name"
                        as={TextField}
                        label="Org Name"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="father_org_name" />}
                      />
                    </div>
                    <div className="lg:w-[66%] w-[100%]">
                      <Field
                        name="father_org_address"
                        as={TextField}
                        label="Org Address"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="father_org_address" />}
                      />
                    </div>
                    <div className="lg:w-[32.5%]  w-[100%]">
                      <Field
                        name="father_nationality"
                        as={TextField}
                        select
                        label="Nationality"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.father_nationality}
                        helperText={<ErrorMessage name="father_nationality" />}
                      >
                        {Config?.Nationalities?.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>

                    <div className="lg:w-[32.5%]  w-[100%]">
                      {
                        <Autocomplete
                          options={[]}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Country"
                              variant="outlined"
                              fullWidth
                              error={false}
                              helperText={
                                <ErrorMessage name="father_country" />
                              }
                            />
                          )}
                          value={
                            allState?.find(
                              (option) =>
                                option?.name === values?.present_country
                            ) || null
                          }
                          onChange={(event, value) => {
                            setFieldValue(
                              "father_country",
                              value ? value.name : ""
                            ); // Update Formik's state with the selected state's name
                          }}
                          onBlur={handleBlur}
                        />
                      }
                    </div>
                    <div className="lg:w-[32.5%]  w-[100%]">
                      {
                        <Field
                          name="father_state"
                          as={TextField}
                          select
                          label="State"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={(event) => {
                            const selectedState = event.target.value;
                            setFieldValue("father_state", selectedState);
                            setPresentState(selectedState);
                          }}
                          error={false}
                          value={values.father_state}
                          helperText={<ErrorMessage name="father_state" />}
                        >
                          {allState?.length > 0 &&
                            allState.map((option) => (
                              <MenuItem
                                key={option.name}
                                onChange={(e) =>
                                  setPresentState(e?.target?.value)
                                }
                                value={option.name}
                              >
                                {option.name}
                              </MenuItem>
                            ))}
                        </Field>
                      }
                    </div>
                    <div className="lg:w-[32.5%]  w-[100%]">
                      <Field
                        name="father_city"
                        as={TextField}
                        select
                        label="City"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.father_city}
                        helperText={<ErrorMessage name="father_city" />}
                      >
                        {allcity?.length > 0 &&
                          allcity.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                      </Field>
                    </div>

                    <div className="lg:w-[32.5%]  w-[100%]">
                      <Field
                        name="father_pincode"
                        as={TextField}
                        label="Pincode"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="father_pincode" />}
                      />
                    </div>
                    <div className="lg:w-[32.5%]  w-[100%]">
                      <Field
                        name="father_annual_income"
                        as={TextField}
                        label="Annual Income"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={
                          <ErrorMessage name="father_annual_income" />
                        }
                      />
                    </div>
                    <div className="lg:w-[32.5%]  w-[100%]">
                      <Field
                        name="father_mobile"
                        as={TextField}
                        label="Mobile Number"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="father_mobile" />}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[20px] ">
                <span className="font-black text-[18px] ">
                  Mother's Details
                </span>
                <div className=" border  p-6 rounded-2xl mt-3">
                  <div className="flex  flex-wrap lg:w-[100%] w-[100%] gap-4">
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
                    <div className="lg:w-[32.5%] w-[100%]">
                      <Field
                        name="mother_qualifications"
                        as={TextField}
                        select
                        label="Qualification"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={
                          <ErrorMessage name="mother_qualifications" />
                        }
                      >
                        {Config?.qualifications?.map((option) => (
                          <MenuItem key={option?.name} value={option?.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    <div className="lg:w-[32.5%] w-[100%]">
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

                    <div className="lg:w-[32.5%] w-[100%]">
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
                    <div className="lg:w-[32.5%]  w-[100%]">
                      <Field
                        name="mother_nationality"
                        as={TextField}
                        select
                        label="Nationality"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.mother_nationality}
                        helperText={<ErrorMessage name="mother_nationality" />}
                      >
                        {Config?.Nationalities?.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>

                    <div className="lg:w-[32.5%]  w-[100%]">
                      {
                        <Autocomplete
                          options={[]}
                          getOptionLabel={(option) => option.name}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Country"
                              variant="outlined"
                              fullWidth
                              error={false}
                              helperText={
                                <ErrorMessage name="mother_country" />
                              }
                            />
                          )}
                          value={
                            allState?.find(
                              (option) =>
                                option?.name === values?.present_country
                            ) || null
                          }
                          onChange={(event, value) => {
                            setFieldValue(
                              "mother_country",
                              value ? value.name : ""
                            ); // Update Formik's state with the selected state's name
                          }}
                          onBlur={handleBlur}
                        />
                      }
                    </div>
                    <div className="lg:w-[32.5%]  w-[100%]">
                      {
                        <Field
                          name="mother_state"
                          as={TextField}
                          select
                          label="State"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={(event) => {
                            const selectedState = event.target.value;
                            setFieldValue("mother_state", selectedState);
                            setPresentState(selectedState);
                          }}
                          error={false}
                          value={values.mother_state}
                          helperText={<ErrorMessage name="mother_state" />}
                        >
                          {allState?.length > 0 &&
                            allState.map((option) => (
                              <MenuItem
                                key={option.name}
                                onChange={(e) =>
                                  setPresentState(e?.target?.value)
                                }
                                value={option.name}
                              >
                                {option.name}
                              </MenuItem>
                            ))}
                        </Field>
                      }
                    </div>
                    <div className="lg:w-[32.5%]  w-[100%]">
                      <Field
                        name="mother_city"
                        as={TextField}
                        select
                        label="City"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.mother_city}
                        helperText={<ErrorMessage name="mother_city" />}
                      >
                        {allcity?.length > 0 &&
                          allcity.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                      </Field>
                    </div>

                    <div className="lg:w-[32.5%]  w-[100%]">
                      <Field
                        name="mother_pincode"
                        as={TextField}
                        label="Pincode"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="mother_pincode" />}
                      />
                    </div>
                    <div className="lg:w-[32.5%]  w-[100%]">
                      <Field
                        name="mother_annual_income"
                        as={TextField}
                        label="Annual Income"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={
                          <ErrorMessage name="mother_annual_income" />
                        }
                      />
                    </div>
                    <div className="lg:w-[32.5%]  w-[100%]">
                      <Field
                        name="mother_mobile"
                        as={TextField}
                        label="Mobile Number"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="mother_mobile" />}
                      />
                    </div>
                  </div>

                  <div className="  flex-wrap flex mt-5  gap-4"></div>
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
              onClick={handleSubmit}
              // disabled={isSubmitting}
              className="bg-blue-500 py-1 px-5"
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

export default EnquiryMaster;

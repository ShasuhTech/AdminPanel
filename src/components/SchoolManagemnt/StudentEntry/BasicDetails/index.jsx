import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/TextInput";
import {
  Autocomplete,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Select } from "antd";
import CustomButton from "@/components/CommonButton/CustomButton";
import {
  AddStudent,
  StateData,
  UpdateStudent,
  cityData,
  countryData,
} from "@/services/api";
import { useQuery } from "react-query";
import Config from "@/utilities/Config";
import moment from "moment";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { CountrySelect } from "@/components/StateAndCity";

const BasicDetails = ({ setSlectedTab, studenData }) => {
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
    payload.admission_number = values?.admission_no;
    payload.fee_number = values?.fee_no;
    payload.sibling_admission_number = values?.sibling_adm_no;
    // payload.parent_id = values?.parent_id; // no required
    payload.name = {
      first_name: values?.first_name,
      middle_name: values?.middle_name,
      last_name: values?.last_name,
    };
    // payload.name.first_name = values?.first_name;
    // payload.name.middle_name = values?.middle_name;
    // payload.name.last_name = values?.last_name;
    payload.class = values?.class;
    payload.section = values?.section;
    payload.stream = values?.stream;
    payload.fee_group = values?.fee_group;
    payload.fee_apply_form = values?.fee_apply_form;
    payload.date_of_birth = moment(values?.dob).format("YYYY-MM-DD");
    payload.joining_date = moment(values?.doj).format("YYYY-MM-DD");
    payload.admission_date = moment(values?.doa).format("YYYY-MM-DD");
    payload.roll_number = values?.roll_no;
    payload.gender = values?.gender;
    payload.emergency_number = values?.emergency_no;
    // payload.admitted_class = values?.admitted_class;
    payload.house = values?.house;
    payload.admission = values?.admission;
    payload.religion = values?.religion;
    payload.mother_tongue = values?.mother_tongue;
    payload.caste = values?.caste;
    payload.social_category = values?.social_category;
    payload.nationality = values?.nationality;
    payload.concession_type = values?.concession_type;
    payload.blood_group = values?.blood_group;
    payload.boarding_category = values?.boarding_category;
    payload.board_reg_no = values?.board_reg_no;
    payload.board = values?.board;
    payload.board_roll_no = values?.board_roll_no;
    payload.email_id = values?.email_id;
    payload.school_bus = values?.school_bus;
    payload.adhar_card_no = values?.adhar_card_no;
    payload.route_stop_name = values?.route_stop_name;
    payload.payment_mode = values?.payment_mode;
    (payload.remark = values?.remark),
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
    payload.student_status = "Admission";
    payload.enquiry_id = studenData?.enquiry_id;

    console.log(payload, "----payload");
    try {
      if (!studenData) {
        const resp = await AddStudent(payload);
        if (resp?.success === true) {
          toast.success("Student Details Add successfully");
          setSlectedTab(2);
        }
        console.log(resp?.success, "-sdcdsf");
        // Handle form submission
        console.log(values);
        // setStatus({ success: true });
      } else {
        const resp = await UpdateStudent(payload);
        if (resp?.success === true) {
          toast.success("Student Details Updated successfully");
          setSlectedTab(2);
        }
        console.log(resp?.success, "-sdcdsf");
        // Handle form submission
        console.log(values);
        // setStatus({ success: true });
      }
    } catch (error) {
      // setStatus({ success: false });
    }
    // setSubmitting(false);
  };
  const initialValues = {
    search: studenData.search || "",
    sibling_adm_no: studenData?.sibling_admission_number || "",
    admission_no: studenData?.admission_number || "",
    fee_no: studenData?.fee_number || "",
    parent_id: studenData || "",
    first_name: studenData?.name?.first_name || "",
    middle_name: studenData?.name?.middle_name || "",
    last_name: studenData?.name?.last_name || "",
    class: studenData?.class || "",
    section: studenData?.section || "",
    stream: studenData?.stream || "",
    fee_group: studenData?.fee_group || "",
    fee_apply_form: studenData?.fee_apply_form || "",
    dob: studenData?.date_of_birth || new Date(),
    doj: studenData?.joining_date || new Date(),
    doa: studenData?.admission_date || new Date(),
    admission: studenData?.admission || "",
    roll_no: studenData?.roll_number || "",
    gender: studenData?.gender || "",
    // father_name: studenData? studenData ||'',
    // mother_name: studenData? studenData ||'',
    emergency_no: studenData?.emergency_number || "",
    // admitted_class: studenData? studenData ||'',
    house: studenData?.house || "",
    social_category: studenData?.social_category || "",
    religion: studenData?.religion || "",
    caste: studenData?.caste || "",
    mother_tongue: studenData?.mother_tongue || "",
    concession_type: studenData?.concession_type || "",
    nationality: studenData?.nationality || "",
    blood_group: studenData?.blood_group || "",
    boarding_category: studenData?.boarding_category || "",
    board_reg_no: studenData?.board_reg_no || "",
    board: studenData?.board || "",
    board_roll_no: studenData?.board_roll_no || "",
    email_id: studenData?.email_id || "",
    school_bus: studenData?.school_bus || "",
    adhar_card_no: studenData?.adhar_card_no || "",
    route_stop_name: studenData?.route_stop_name || "",
    sms_no: studenData || "",
    remark: studenData?.remark || "",
    fee_remark: studenData || "",
    payment_mode: studenData?.payment_mode || "",
    student_type: studenData?.student_type || "",
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
  };

  const validationSchema = Yup.object().shape({
    // name: Yup.string().required("Name is required"),
    // admission_no: Yup.string().required("Admission no is required"),
    // fee_no: Yup.string().required("Fee no is required"),
    // parent_id: Yup.string().required("Parent id is required"),
    // first_name: Yup.string().required("First name is required"),
    // last_name: Yup.string().required("Last Name is required"),
    // class: Yup.string().required("Class Name is required"),
    // section: Yup.string().required("Section is required"),
    // stream: Yup.string().required("Stream is required"),
    // fee_group: Yup.string().required("Fee Group is required"),
    // fee_apply_form: Yup.string().required("Fee Apply From is required"),
    // // dob: Yup.required("Date of birth is required"),
    // // doj: Yup.required("Date of join is required"),
    // // doa: Yup.string().required("Date of admission is required"),
    // fee_apply_form: Yup.string().required("Fee Apply From is required"),
    // fee_apply_form: Yup.string().required("Fee Apply From is required"),
    // fee_apply_form: Yup.string().required("Fee Apply From is required"),
    // gender: Yup.string().required("Gender is required"),
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
                  {/* Not Required */}
                  {/* <div className="lg:w-[66%] w-[100%]">
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
                  </div> */}

                  {/* Not Required */}

                  {/* <div className="lg:w-[32%] w-[100%]">
                    <Field
                      name="parent_id"
                      as={TextField}
                      label="Parent Id"
                      variant="outlined"
                      // required
                      value={values.parent_id}
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="parent_id" />}
                    />
                  </div> */}
                  <div className="lg:w-[32%]  w-[100%]">
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
                  <div className="lg:w-[32.2%] w-[100%]">
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
                  <div className="lg:w-[32.2%] w-[100%]">
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

                  <div className="lg:w-[32.2%]  w-[100%]">
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
                  <div className="lg:w-[32.2%]  w-[100%]">
                    <Field
                      name="section"
                      as={TextField}
                      select
                      label="Section"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      value={values.section}
                      helperText={<ErrorMessage name="section" />}
                    >
                      {Config?.SectionList.map((option) => (
                        <MenuItem key={option.label} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>
                  {Number(values.class) >= 10 && (
                    <div className="lg:w-[32.4%]  w-[100%]">
                      <Field
                        name="stream"
                        as={TextField}
                        select
                        label="Stream"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.stream}
                        helperText={<ErrorMessage name="stream" />}
                      >
                        {Config?.StreamList.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                  )}

                  <div className="lg:w-[32.2%] w-[100%]">
                    <Field
                      name="admission_no"
                      as={TextField}
                      label="Admission No"
                      variant="outlined"
                      // required
                      fullWidth
                      value={values.admission_no}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={
                        touched.admission_no && Boolean(errors.admission_no)
                      }
                      inputProps={{
                        maxLength: 10,
                        autoComplete: "admission_no",
                      }}
                      helperText={touched.admission_no && errors.admission_no}
                    />
                  </div>
                  {/* <div className="lg:w-[32.2%] w-[100%]">
                    <Field
                      name="sibling_adm_no"
                      as={TextField}
                      label="sibling Adm No"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.sibling_adm_no}
                      error={false}
                      helperText={<ErrorMessage name="sibling_adm_no" />}
                    />
                  </div> */}
                  {/* <div className="lg:w-[32%] w-[100%]">
                    <Field
                      name="fee_no"
                      as={TextField}
                      label="Fee No"
                      variant="outlined"
                      fullWidth
                      // required
                      onBlur={handleBlur}
                      value={values.fee_no}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="fee_no" />}
                    />
                  </div> */}
                  <div className="lg:w-[32%]  w-[100%]">
                    <Field
                      name="admission"
                      as={TextField}
                      select
                      label="Admission"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      value={values.admission}
                      helperText={<ErrorMessage name="admission" />}
                    >
                      {Config?.AdmissionType?.map((option) => (
                        <MenuItem key={option.label} value={option.label}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>
                  <div className="lg:w-[32.2%] w-[100%]">
                    <Field
                      name="roll_no"
                      as={TextField}
                      label="Roll No"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="roll_no" />}
                    />
                  </div>
                </div>
              </div>

              <div className="  flex-wrap flex mt-5  gap-4">
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="fee_group"
                    as={TextField}
                    select
                    label="Fee Group"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    value={values.fee_group}
                    helperText={<ErrorMessage name="fee_group" />}
                  >
                    {Config?.FeeGroup?.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="fee_apply_form"
                    as={TextField}
                    select
                    label="Fee Apply Form"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    value={values.fee_apply_form}
                    helperText={<ErrorMessage name="fee_apply_form" />}
                  >
                    {Config?.FeeApplyFrom?.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
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
                <div className="lg:w-[32.2%] w-[100%]">
                  <DatePicker
                    label="Date Of Join"
                    value={null}
                    fullWidth
                    className="w-[100%]"
                    onChange={(newValue) => {
                      setFieldValue("doj", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        // required
                        error={false}
                        helperText={<ErrorMessage name="doj" />}
                      />
                    )}
                  />
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
                  <DatePicker
                    label="Date Of Admission"
                    value={null}
                    fullWidth
                    required
                    className="w-[100%]"
                    onChange={(newValue) => {
                      setFieldValue("doa", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        // required
                        error={false}
                        helperText={<ErrorMessage name="doa" />}
                      />
                    )}
                  />
                </div>

                <div className="lg:w-[32.2%] w-[100%]">
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
                {/* <div className="lg:w-[32.2%] w-[100%]">
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

                <div className="lg:w-[32.2%] w-[100%]">
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
                </div> */}

                <div className="lg:w-[32.2%] w-[100%]">
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
                {/* <div className="lg:w-[32.2%] w-[100%]">
                  <Autocomplete
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Admitted Class"
                        variant="outlined"
                        fullWidth
                        error={false}
                        helperText={<ErrorMessage name="admitted_class" />}
                      />
                    )}
                    value={null}
                    onChange={(event, value) =>
                      setFieldValue("admitted_class", value ? value.name : "")
                    }
                    onBlur={() => {}}
                  />
                </div> */}
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="house"
                    as={TextField}
                    select
                    label="House"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    value={values.house}
                    helperText={<ErrorMessage name="house" />}
                  >
                    {Config?.HouseTypes?.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
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

                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="religion"
                    as={TextField}
                    select
                    label="Religion"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    value={values.religion}
                    helperText={<ErrorMessage name="religion" />}
                  >
                    {Config?.IndianReligions?.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="caste"
                    as={TextField}
                    select
                    label="Caste"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    value={values.caste}
                    helperText={<ErrorMessage name="caste" />}
                  >
                    {Config?.AllCastes?.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="mother_tongue"
                    as={TextField}
                    select
                    label="Mother Tongue"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    value={values.mother_tongue}
                    helperText={<ErrorMessage name="mother_tongue" />}
                  >
                    {Config?.MotherTongues?.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="concession_type"
                    as={TextField}
                    select
                    label="Concession Type"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    value={values.concession_type}
                    helperText={<ErrorMessage name="concession_type" />}
                  >
                    {Config?.SchoolConcessionTypes?.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
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
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="blood_group"
                    as={TextField}
                    select
                    label="Blood Group"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    value={values.blood_group}
                    helperText={<ErrorMessage name="blood_group" />}
                  >
                    {Config?.BloodGroups?.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="boarding_category"
                    as={TextField}
                    select
                    label="Boarding Category"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    value={values.boarding_category}
                    helperText={<ErrorMessage name="boarding_category" />}
                  >
                    {Config?.BoardingCategories?.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="board_reg_no"
                    as={TextField}
                    label="Board Reg No"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="board_reg_no" />}
                  />
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="board"
                    as={TextField}
                    select
                    label="Board"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    value={values.board}
                    helperText={<ErrorMessage name="board" />}
                  >
                    {Config?.Boards?.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="board_roll_no"
                    as={TextField}
                    label="Board Roll No"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="board_roll_no" />}
                  />
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="email_id"
                    as={TextField}
                    label="Email"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="email_id" />}
                  />
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="school_bus"
                    as={TextField}
                    select
                    label="School Bus"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    value={values.school_bus}
                    helperText={<ErrorMessage name="school_bus" />}
                  >
                    {Config?.SchoolBusOptions?.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="route_stop_name"
                    as={TextField}
                    label="Route & Stop Name"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="route_stop_name" />}
                  />
                </div>
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="adhar_card_no"
                    as={TextField}
                    label="Aadhar Card No"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="adhar_card_no" />}
                  />
                </div>
                {/* <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="sms_no"
                    as={TextField}
                    label="SMS No"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="sms_no" />}
                  />
                </div> */}
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="payment_mode"
                    as={TextField}
                    select
                    label="Payment Mode"
                    variant="outlined"
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    value={values.payment_mode}
                    helperText={<ErrorMessage name="payment_mode" />}
                  >
                    {Config?.PaymentTypes?.map((option) => (
                      <MenuItem key={option.label} value={option.label}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Field>
                </div>
                {/* <div className="lg:w-[32.2%] w-[100%]">
                  <Autocomplete
                    options={cities}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Payment Mode"
                        variant="outlined"
                        fullWidth
                        error={false}
                        helperText={<ErrorMessage name="payment_mode" />}
                      />
                    )}
                    value={null}
                    onChange={(event, value) =>
                      setFieldValue("payment_mode", value ? value.name : "")
                    }
                    onBlur={() => {}}
                  />
                </div> */}
                <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="remark"
                    as={TextField}
                    label="Remark"
                    variant="outlined"
                    fullWidth
                    multiline
                    rows={2}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="remark" />}
                  />
                </div>
                {/* <div className="lg:w-[32.2%] w-[100%]">
                  <Field
                    name="fee_remark"
                    as={TextField}
                    label="Fee Remark"
                    variant="outlined"
                    multiline
                    rows={2}
                    fullWidth
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={false}
                    helperText={<ErrorMessage name="fee_remark" />}
                  />
                </div> */}
              </div>
            </div>
          </div>
          {/* Persent Address */}
          {
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
                    <div className="lg:w-[32.2%] w-[100%]">
                      <CountrySelect
                        name="present_country"
                        label="Country"
                        value={values.present_country}
                      />
                    </div>
                    <div className="lg:w-[32.2%] w-[100%]">
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
                    <div className="lg:w-[32.2%] w-[100%]">
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

                    <div className="lg:w-[32.2%] w-[100%]">
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
                    <div className="lg:w-[32.2%] w-[100%]">
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
                    {/* <div className="lg:w-[32.2%] w-[100%]">
                          <Field
                            name="present_telephone"
                            as={TextField}
                            label="Telephone"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="present_telephone" />
                            }
                          />
                        </div> */}
                  </div>
                </div>
              </div>
            </div>
          }
          {/* Permanent Address */}
          {
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
                    <div className="lg:w-[32.2%] w-[100%]">
                      <CountrySelect
                        name="permanent_country"
                        label="Country"
                        value={values.permanent_country}
                      />
                    </div>

                    <div className="lg:w-[32.2%] w-[100%]">
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
                    <div className="lg:w-[32.2%] w-[100%]">
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
                    {/* <div className="lg:w-[32.2%] w-[100%]">
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
                    <div className="lg:w-[32.2%] w-[100%]">
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
                    <div className="lg:w-[32.2%] w-[100%]">
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
                        helperText={<ErrorMessage name="permanent_locality" />}
                      />
                    </div>
                    {/* <div className="lg:w-[32.2%] w-[100%]">
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
                        </div> */}
                  </div>
                </div>
              </div>
            </div>
          }
          {false && (
            <>
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
                      <div className="lg:w-[32.2%] w-[100%]">
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
                      <div className="lg:w-[32.2%] w-[100%]">
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
                      <div className="lg:w-[32.2%] w-[100%]">
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

                      <div className="lg:w-[32.2%] w-[100%]">
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
                      <div className="lg:w-[32.2%] w-[100%]">
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
                      <div className="lg:w-[32.2%] w-[100%]">
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
                      <div className="lg:w-[32.2%] w-[100%]">
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

                      <div className="lg:w-[32.2%] w-[100%]">
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
                      <div className="lg:w-[32.2%] w-[100%]">
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
                      {/* <div className="lg:w-[32.2%] w-[100%]">
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
                      <div className="lg:w-[32.2%] w-[100%]">
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
                      <div className="lg:w-[32.2%] w-[100%]">
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
                      <div className="lg:w-[32.2%] w-[100%]">
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
            </>
          )}

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
              // onClick={handleSubmit}
              // disabled={isSubmitting}
              className="bg-blue-500 py-1 px-5"
              sx={{ py: 1, px: 5, fontWeight: "bold", fontSize: "16px" }}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </CustomButton>
          </div>
          {/* <div className="bg-black gap-5  py-5 w-[80%] flex items-center justify-center fixed z-[999] bottom-0">
            <CustomButton>New</CustomButton>
            <CustomButton>Edit</CustomButton>
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

            <CustomButton>Details</CustomButton>
            <CustomButton>Tc</CustomButton>
            <CustomButton>Dropouts</CustomButton>
            <CustomButton>Audit Logs</CustomButton>
          </div> */}
        </Form>
      )}
    </Formik>
  );
};

export default BasicDetails;

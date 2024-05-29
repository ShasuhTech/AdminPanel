import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/TextInput";
import {
  Autocomplete,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Select } from "antd";
import CustomButton from "@/components/CommonButton/CustomButton";
import { AddStudent, StateData, cityData, countryData } from "@/services/api";
import { useQuery } from "react-query";
import Config from "@/utilities/Config";
import moment from "moment";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { StyledTableCell } from "@/styles/TableStyle/indx";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StudentRegistration = ({ setSlectedTab, studenData }) => {
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
    admission_no: studenData?.admission_number || "",
    first_name: studenData?.name?.first_name || "",
    middle_name: studenData?.name?.middle_name || "",
    last_name: studenData?.name?.last_name || "",
    class: studenData?.class || "",
    section: studenData?.section || "",
    gender: studenData?.gender || "",
    blood_group: studenData?.blood_group || "",
    emergency_no: studenData?.emergency_number || "",
    mother_tongue: studenData?.mother_tongue || "",
    religion: studenData?.religion || "",
    dob: studenData?.date_of_birth || new Date(),
    social_category: studenData?.social_category || "",
    locality: studenData?.locality || "",
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
    father_telephone: "",
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
    mother_telephone: "",

    guardian_name: "",
    guardian_relation: "",
    guardian_mobile_no: "",
    guardian_email: "",
    guardian_address: "",

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

    // Other Details
    any_physical_disability: "",
    any_treatment_undertaken: "",
    any_allergies: "",
    interest_hobbies: "",
    sports_game: "",
    co_curriclar_activities: "",
    any_other_relevent_information: "",

    // Previous School Details
    school_name: "",
    school_reconised_by: "",
    school_city_name: "",
    medium_of_instruction: "",
    year_of_passing: "",

    subject_english_max_marks: "",
    subject_english_marks_obtained: "",
    subject_english_grade: "",
    subject_english_percentage: "",

    subject_hindi_max_marks: "",
    subject_hindi_marks_obtained: "",
    subject_hindi_grade: "",
    subject_hindi_percentage: "",

    subject_mathematics_max_marks: "",
    subject_mathematics_marks_obtained: "",
    subject_mathematics_grade: "",
    subject_mathematics_percentage: "",

    subject_science_max_marks: "",
    subject_science_marks_obtained: "",
    subject_science_grade: "",
    subject_science_percentage: "",

    subject_social_sceince_max_marks: "",
    subject_social_sceince_marks_obtained: "",
    subject_social_sceince_grade: "",
    subject_social_sceince_percentage: "",

    subject_third_language_max_marks: "",
    subject_third_language_marks_obtained: "",
    subject_third_language_grade: "",
    subject_third_language_percentage: "",

    pre_subject_english_max_marks: "",
    pre_subject_english_marks_obtained: "",
    pre_subject_english_grade: "",
    pre_subject_english_percentage: "",

    pre_subject_hindi_max_marks: "",
    pre_subject_hindi_marks_obtained: "",
    pre_subject_hindi_grade: "",
    pre_subject_hindi_percentage: "",

    pre_subject_mathematics_max_marks: "",
    pre_subject_mathematics_marks_obtained: "",
    pre_subject_mathematics_grade: "",
    pre_subject_mathematics_percentage: "",

    pre_subject_science_max_marks: "",
    pre_subject_science_marks_obtained: "",
    pre_subject_science_grade: "",
    pre_subject_science_percentage: "",

    pre_subject_social_sceince_max_marks: "",
    pre_subject_social_sceince_marks_obtained: "",
    pre_subject_social_sceince_grade: "",
    pre_subject_social_sceince_percentage: "",

    pre_subject_total_max_marks: "",
    pre_subject_total_marks_obtained: "",
    pre_subject_total_grade: "",
    pre_subject_total_percentage: "",

    pre_Board_subject_english_max_marks: "",
    pre_Board_subject_english_marks_obtained: "",
    pre_Board_subject_english_grade: "",
    pre_Board_subject_english_percentage: "",

    pre_Board_subject_hindi_max_marks: "",
    pre_Board_subject_hindi_marks_obtained: "",
    pre_Board_subject_hindi_grade: "",
    pre_Board_subject_hindi_percentage: "",

    pre_Board_subject_mathematics_max_marks: "",
    pre_Board_subject_mathematics_marks_obtained: "",
    pre_Board_subject_mathematics_grade: "",
    pre_Board_subject_mathematics_percentage: "",

    pre_Board_subject_science_max_marks: "",
    pre_Board_subject_science_marks_obtained: "",
    pre_Board_subject_science_grade: "",
    pre_Board_subject_science_percentage: "",

    pre_Board_subject_social_sceince_max_marks: "",
    pre_Board_subject_social_sceince_marks_obtained: "",
    pre_Board_subject_social_sceince_grade: "",
    pre_Board_subject_social_sceince_percentage: "",

    pre_Board_subject_total_max_marks: "",
    pre_Board_subject_total_marks_obtained: "",
    pre_Board_subject_total_grade: "",
    pre_Board_subject_total_percentage: "",

    board_details: "",
    Board_subject_english_max_marks: "",
    Board_subject_english_marks_obtained: "",
    Board_subject_english_grade: "",
    Board_subject_english_percentage: "",

    Board_subject_hindi_max_marks: "",
    Board_subject_hindi_marks_obtained: "",
    Board_subject_hindi_grade: "",
    Board_subject_hindi_percentage: "",

    Board_subject_mathematics_max_marks: "",
    Board_subject_mathematics_marks_obtained: "",
    Board_subject_mathematics_grade: "",
    Board_subject_mathematics_percentage: "",

    Board_subject_science_max_marks: "",
    Board_subject_science_marks_obtained: "",
    Board_subject_science_grade: "",
    Board_subject_science_percentage: "",

    Board_subject_social_sceince_max_marks: "",
    Board_subject_social_sceince_marks_obtained: "",
    Board_subject_social_sceince_grade: "",
    Board_subject_social_sceince_percentage: "",

    Board_subject_economic_max_marks: "",
    Board_subject_economic_marks_obtained: "",
    Board_subject_economic_grade: "",
    Board_subject_economic_percentage: "",

    Board_subject_second_language_max_marks: "",
    Board_subject_second_language_marks_obtained: "",
    Board_subject_second_language_grade: "",
    Board_subject_second_language_percentage: "",

    Board_subject_total_max_marks: "",
    Board_subject_total_marks_obtained: "",
    Board_subject_total_grade: "",
    Board_subject_total_percentage: "",

    // Stream Details
    stream_details: "",
    stream_common_subject: "",
    stream_group1: "",
    stream_group2: "",
    stream_group3: "",
    stream_group4: "",
    stream_group5: "",

    any_sibling_school:'',
    sibling_same_inst_admission_no1:'',
    sibling_same_inst_name1:'',
    sibling_same_inst_class_section1:'',
    sibling_same_inst_admission_no2:'',
    sibling_same_inst_name2:'',
    sibling_same_inst_class_section2:'',

    any_other_sibling_school:'',
    sibling_other_inst_admission_no1:'',
    sibling_other_inst_name1:'',
    sibling_other_inst_class_section1:'',
    sibling_other_inst_admission_no2:'',
    sibling_other_inst_name2:'',
    sibling_other_inst_class_section2:'',

   




    
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
    <Card className="px-5">
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
                    <div className="lg:w-[66%] w-[100%]">
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
                    <div className="lg:w-[32.5%]  w-[100%]">
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
                  </div>
                </div>

                <div className="  flex-wrap flex mt-5  gap-4">
                  <div className="lg:w-[32.5%]  w-[100%]">
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
                  <div className="lg:w-[32.5%]  w-[100%]">
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
                  <div className="lg:w-[32.5%]  w-[100%]">
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
                      name="social_category"
                      as={TextField}
                      select
                      label="Locality"
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
                </div>
              </div>
            </div>
            <div className="mt-[40px] ">
              <span className="font-black text-[18px] ">Father's Details</span>
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
                      <Field
                        name="qualification"
                        as={TextField}
                        select
                        label="Qualification"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="qualification" />}
                      >
                        {Config?.qualifications?.map((option) => (
                          <MenuItem key={option?.name} value={option?.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Field>
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
                      <Field
                        name="mother_qualification"
                        as={TextField}
                        select
                        label="Qualification"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={
                          <ErrorMessage name="mother_qualification" />
                        }
                      >
                        {Config?.qualifications?.map((option) => (
                          <MenuItem key={option?.name} value={option?.name}>
                            {option.name}
                          </MenuItem>
                        ))}
                      </Field>
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
                        helperText={<ErrorMessage name="permanent_locality" />}
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
                        helperText={<ErrorMessage name="permanent_telephone" />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[20px] ">
              <span className="font-black text-[18px] ">Other Details</span>
              <div className=" border  p-6 rounded-2xl mt-3">
                <div className=" w-[100%] ">
                  <div className="flex  flex-wrap gap-4">
                    <div className="lg:w-[32.5%] w-[100%] ">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Any Physical Disability"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%]">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Any Treatment Undertak/Required"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%] mb-2 ">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Any Allergies"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                  </div>
                  <div className="flex  flex-wrap gap-4">
                    <div className="lg:w-[32.5%] w-[100%] ">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Interest And Hobbies"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%] ">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Sports/Games"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%] ">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Co-Curriclar Activities"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%] ">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Any Other Relevent Information"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-[20px] ">
              <span className="font-black text-[18px] ">
                Previous School Details
              </span>
              <div className=" border  p-6 rounded-2xl mt-3">
                <div className=" lg:flex w-[100%] gap-4">
                  <div className="flex  flex-wrap lg:w-[100%] w-[100%] gap-4">
                    <div className="lg:lg:w-[32.5%] w-[100%]">
                      <Field
                        name="guardian_name"
                        as={TextField}
                        label="School Name"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="guardian_name" />}
                      />
                    </div>
                    <div className="lg:w-[32.4%]  w-[100%]">
                      <Field
                        name="class"
                        as={TextField}
                        select
                        label="School Reconised By"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.class}
                        helperText={<ErrorMessage name="class" />}
                      >
                        {Config?.Boards.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    <div className="lg:lg:w-[32.5%] w-[100%]">
                      <Field
                        name="guardian_name"
                        as={TextField}
                        label="City Name"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="guardian_name" />}
                      />
                    </div>
                    <div className="lg:w-[32.4%]  w-[100%]">
                      <Field
                        name="class"
                        as={TextField}
                        select
                        label="Medium Of Instruction"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.class}
                        helperText={<ErrorMessage name="class" />}
                      >
                        {Config?.Boards.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    <div className="lg:lg:w-[32.5%] w-[100%]">
                      <Field
                        name="guardian_name"
                        as={TextField}
                        label="Year Of Passing"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="guardian_name" />}
                      />
                    </div>
                    <Typography
                      className="text-red-500 font-bold"
                      style={{ fontWeight: "bold" }}
                    >
                      DETAILS OF THE PERFORMANCE OF THE CHILD IN THE PREVIOUS
                      YEARS(NOT APPLICABLE FOR NUR & PREP & I)
                    </Typography>
                    <TableContainer sx={{ overflowX: "auto" }}>
                      <Table aria-label="collapsible table">
                        <TableHead>
                          <TableRow
                            style={{ fontWeight: "500", color: "#000" }}
                          >
                            <StyledTableCell align="center">
                              Name
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Marks
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Grade
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Grade Point
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Achievements In Previous School
                            </StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody
                          style={{
                            height: "auto",
                            position: "relative",
                          }}
                        >
                          <>
                            {[
                              "ENGLISH",
                              "HINDI",
                              "MATHEMATICS",
                              "SCIENCE",
                              "SOCIAL SCIENCE",
                              "THIRD LANGUAGE",
                            ]?.map((row, index) => (
                              <Row
                                key={index}
                                row={row}
                                index={index}
                                router={router}
                              />
                            ))}
                          </>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[20px] ">
              <span className="font-black text-[18px] ">
                Marks Grades Obtained In The Previous School
              </span>
              <div className=" border  p-6 rounded-2xl mt-3">
                <div className=" lg:flex w-[100%] gap-4">
                  <div className="flex  flex-wrap lg:w-[100%] w-[100%] gap-4">
                    <TableContainer sx={{ overflowX: "auto" }}>
                      <Table aria-label="collapsible table">
                        <TableHead>
                          <TableRow
                            style={{ fontWeight: "500", color: "#000" }}
                          >
                            <StyledTableCell align="center">
                              Subjects
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Max. Marks
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Marks Obatined
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Grade
                            </StyledTableCell>
                            <StyledTableCell align="center">%</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody
                          style={{
                            height: "auto",
                            position: "relative",
                          }}
                        >
                          <>
                            {[
                              "ENGLISH",
                              "HINDI",
                              "MATHEMATICS",
                              "SCIENCE",
                              "SOCIAL SCIENCE",
                              "Total",
                            ]?.map((row, index) => (
                              <Row
                                key={index}
                                row={row}
                                index={index}
                                router={router}
                              />
                            ))}
                          </>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[20px] ">
              <span className="font-black text-[18px] ">Pre Board Details</span>
              <div className=" border  p-6 rounded-2xl mt-3">
                <div className=" lg:flex w-[100%] gap-4">
                  <div className="flex  flex-wrap lg:w-[100%] w-[100%] gap-4">
                    <TableContainer sx={{ overflowX: "auto" }}>
                      <Table aria-label="collapsible table">
                        <TableHead>
                          <TableRow
                            style={{ fontWeight: "500", color: "#000" }}
                          >
                            <StyledTableCell align="center">
                              Subjects
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Max. Marks
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Marks Obatined
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Grade
                            </StyledTableCell>
                            <StyledTableCell align="center">%</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody
                          style={{
                            height: "auto",
                            position: "relative",
                          }}
                        >
                          <>
                            {[
                              "ENGLISH",
                              "HINDI",
                              "MATHEMATICS",
                              "SCIENCE",
                              "SOCIAL SCIENCE",
                              "Total",
                            ]?.map((row, index) => (
                              <Row
                                key={index}
                                row={row}
                                index={index}
                                router={router}
                              />
                            ))}
                          </>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[20px] ">
              <span className="font-black text-[18px] ">Board Details</span>
              <div className=" border  p-6 rounded-2xl mt-3">
                <div className=" lg:flex w-[100%] gap-4">
                  <div className="flex  flex-wrap lg:w-[100%] w-[100%] gap-4">
                    <div className="lg:w-[32.5%]  w-[100%]">
                      <Field
                        name="present_city"
                        as={TextField}
                        select
                        label="Board"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.present_city}
                        helperText={<ErrorMessage name="present_city" />}
                      >
                        {Config.Boards.map((option) => (
                          <MenuItem key={option?.value} value={option?.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>

                    <TableContainer sx={{ overflowX: "auto" }}>
                      <Table aria-label="collapsible table">
                        <TableHead>
                          <TableRow
                            style={{ fontWeight: "500", color: "#000" }}
                          >
                            <StyledTableCell align="center">
                              Subjects
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Max. Marks
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Marks Obatined
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Grade
                            </StyledTableCell>
                            <StyledTableCell align="center">%</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody
                          style={{
                            height: "auto",
                            position: "relative",
                          }}
                        >
                          <>
                            {[
                              "ENGLISH",
                              "HINDI",
                              "MATHEMATICS",
                              "SCIENCE",
                              "SOCIAL SCIENCE",
                              "Economic/Computer/Other",
                              "Second Language(Hindi)",
                              "Total",
                            ]?.map((row, index) => (
                              <Row
                                key={index}
                                row={row}
                                index={index}
                                router={router}
                              />
                            ))}
                          </>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[20px] ">
              <span className="font-black text-[18px] ">Stream Details</span>
              <div className=" border  p-6 rounded-2xl mt-3">
                <div className=" w-[100%] ">
                  <div className="flex  flex-wrap gap-4">
                    <div className="lg:w-[32.5%]  w-[100%]">
                      {
                        <Field
                          name="present_state"
                          as={TextField}
                          select
                          label="Stream"
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
                        label="Common Subject"
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
                        name="present_city"
                        as={TextField}
                        select
                        label="Group 1"
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
                        name="present_city"
                        as={TextField}
                        select
                        label="Group 2"
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
                        name="present_city"
                        as={TextField}
                        select
                        label="Group 3"
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
                        name="present_city"
                        as={TextField}
                        select
                        label="Group 4"
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
                        name="present_city"
                        as={TextField}
                        select
                        label="Group 5"
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
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[20px] ">
              <span className="font-black text-[18px] ">Documents Upload</span>
              <div className=" border  p-6 rounded-2xl mt-3">
                <TableContainer sx={{ overflowX: "auto" }}>
                  <Table aria-label="collapsible table">
                    <TableHead>
                      <TableRow style={{ fontWeight: "500", color: "#000" }}>
                        <StyledTableCell align="center">Sl.No</StyledTableCell>
                        <StyledTableCell align="center">Name</StyledTableCell>
                        <StyledTableCell align="center">Select</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody
                      style={{
                        height: "auto",
                        position: "relative",
                      }}
                    >
                      <>
                        {[
                          "DOB CERTIFICATE",
                          "AADHAR CARD",
                          "STUDENT REPORT CARD",
                          "FATHER ID PRROF",
                          "MOTHER ID PROOF",
                          "HEALTH RECORD",
                          "TERM AND REPORT",
                          "ADMISSION FORM",
                        ]?.map((row, index) => (
                          <Row1
                            key={index}
                            row={row}
                            index={index}
                            router={router}
                          />
                        ))}
                      </>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
            <div className="mt-[20px] ">
              <span className="font-black text-[18px] ">
                Details Of Sibling Studying in The Institution
              </span>
              <div className=" border  p-6 rounded-2xl mt-3">
                <div className="flex items-center justify-center gap-4">
                  <Typography>Any Sibling in this School?</Typography>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className=" w-[100%] ">
                  <div className="flex  flex-wrap gap-4">
                    <div className="lg:w-[32.5%] w-[100%] mb-5">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Admission No"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%] mb-5">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%]  mb-5">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Class & Section"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                  </div>
                  <div className="flex  flex-wrap gap-4">
                    <div className="lg:w-[32.5%] w-[100%] mb-5">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Admission No"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%] mb-5">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%]  mb-5">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Class & Section"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-[20px] ">
              <span className="font-black text-[18px] ">
                Details Of Sibling Studying in Other Institution
              </span>
              <div className=" border  p-6 rounded-2xl mt-3">
                <div className="flex items-center justify-center gap-4">
                  <Typography>Any Sibling in this School?</Typography>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div className=" w-[100%] ">
                  <div className="flex  flex-wrap gap-4">
                    <div className="lg:w-[32.5%] w-[100%] mb-5">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Admission No"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%] mb-5">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%]  mb-5">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Class & Section"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                  </div>
                  <div className="flex  flex-wrap gap-4">
                    <div className="lg:w-[32.5%] w-[100%] mb-5">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Admission No"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%] mb-5">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%]  mb-5">
                      <Field
                        name="present_address"
                        as={TextField}
                        label="Class & Section"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="present_address" />}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {status && status.success === false && (
              <Typography className={classes.error} variant="body1">
                Form submission failed. Please try again.
              </Typography>
            )}
            <div className="flex justify-end mr-12 my-5 ">
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
    </Card>
  );
};

export default StudentRegistration;

const Row = (props) => {
  const { row, salonDetails, setSalonDetails, index, router } = props;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            background: open ? "#E5EFFC" : "",
            fontWeight: "600",
            color: "#000",
            overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        {/* <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell> */}
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <TextField id="outlined-basic" fullWidth variant="outlined" />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <TextField id="outlined-basic" fullWidth variant="outlined" />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <TextField id="outlined-basic" fullWidth variant="outlined" />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <TextField id="outlined-basic" fullWidth variant="outlined" />
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};
const Row1 = (props) => {
  const { row, salonDetails, setSalonDetails, index, router } = props;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            background: open ? "#E5EFFC" : "",
            fontWeight: "600",
            color: "#000",
            overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Checkbox {...label} />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <input type="file" />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Typography>View</Typography>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

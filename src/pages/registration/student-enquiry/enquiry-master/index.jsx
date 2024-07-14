import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import {
  Autocomplete,
  Checkbox,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomButton from "@/components/CommonButton/CustomButton";
import {
  AddStudent,
  GetStudentListById,
  StateData,
  UpdateStudent,
  cityData,
} from "@/services/api";
import { useQuery } from "react-query";
import Config from "@/utilities/Config";
import moment from "moment";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "@/components/StateAndCity";
import CitySelectPersent from "@/components/StateAndCity/City/persentCIty";
import CitySelectPermanent from "@/components/StateAndCity/City/PermanentCity";
import CitySelectFather from "@/components/StateAndCity/City/FatherCity";
import CitySelectMother from "@/components/StateAndCity/City/MotherCity";
import SimpleModal from "@/components/Modal/SimpleModal";
import dayjs from "dayjs";

const EnquiryMaster = ({ handleClose, open, data }) => {
  const router = useRouter();
  const [studenData, setStudentData] = useState({});
  const [presentState, setPresentState] = useState("");
  const [permanentState, setPermanentState] = useState("");
  const [fatherState, setFatherState] = useState("");
  const [motherState, setMotherState] = useState("");
  const [confirmAddress, setConfirmAddress] = useState(false);

  const { id } = router.query;

  const studentDetails = async () => {
    try {
      if (!data) return;
      const resp = await GetStudentListById(data);
      console.log(resp, "resp");
      setStudentData(resp?.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    studentDetails();
  }, [data]);
  useEffect(() => {
    setConfirmAddress(studenData?.same_present_address);
  }, [studenData]);
  console.log(confirmAddress, "-confirmAddress");
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

  const handleSubmit = async (values, actions) => {
    console.log(values, "-dsfsdfdsfsfsd");
    const payload = {};

    payload.search = values.search;
    // payload.enquiry_id = values.enquiry_id; // auto generate
    payload.class = values?.class;
    payload.name = {
      first_name: values?.first_name,
      middle_name: values?.middle_name,
      last_name: values?.last_name,
    };
    payload.gender = values?.gender;
    payload.date_of_birth = values?.dob;
    payload.present_class = values?.present_class;
    payload.joining_year = values?.joining_year;
    payload.selected_status = values?.selected_status;
    payload.previous_school_details = {
      school_name: values?.present_school,
      leaving_reason: values?.reason,
    };
    // payload.present_school = values?.present_school;
    // payload.reason = values?.reason;
    payload.nationality = values?.nationality;
    payload.social_category = values?.social_category;
    payload.email = values?.email;
    payload.emergency_number = values?.emergency_no;
    (payload.same_present_address = confirmAddress),
      (payload.present_address = {
        country: values.present_country,
        city: values.present_city,
        state: values.present_state,
        pin_code: values.present_pincode,
        address: values.present_address,
        locality: values.present_locality,
        telephone: values.present_telephone,
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
        telephone: confirmAddress
          ? values.present_telephone
          : values.permanent_telephone,
      });

    payload.father_detail = {
      fathers_name: values?.father_name,
      father_qualification: values?.father_qualifications,
      father_occupation: values?.father_occupation,
      father_email: values?.father_email,
      father_org_name: values?.father_org_name,
      father_org_address: values?.father_org_address,
      father_annual_income: values?.father_annual_income,
      father_phone: values?.father_mobile,
      mothers_name: values?.mother_name,
      mother_qualification: values?.mother_qualifications,
      mother_occupation: values?.mother_occupation,
      mother_email: values?.mother_email,
      mother_email: values?.mother_email,
      mother_org_name: values?.mother_org_name,
      mother_org_address: values?.mother_org_address,
      mother_annual_income: values?.mother_annual_income,
      mother_phone: values?.mother_mobile,
      father_address: {
        city: values?.father_city,
        pin_code: values?.father_pincode,
        state: values?.father_state,
        country: values?.father_country,
        nationality: values?.father_nationality,
      },
      mother_address: {
        city: values?.mother_city,
        pin_code: values?.mother_pincode,
        state: values?.mother_state,
        country: values?.mother_country,
        nationality: values?.mother_nationality,
      },
    };
    if (data) {
      payload.enquiry_id = studenData?.enquiry_id;
    }

    console.log(payload, "----payload");
    if (data) {
      // alert('jjj')
      try {
        const resp = await UpdateStudent(payload);
        if (resp?.success === true) {
          toast.success("Student Details Updated successfully");
          handleClose();
        }
        console.log(resp?.success, "-sdcdsf");
        console.log(values);
      } catch (error) {}
    } else {
      try {
        const resp = await AddStudent(payload);
        if (resp?.success === true) {
          toast.success("Student Details Add successfully");
          handleClose();
          setTimeout(() => {
            // Reset the form to its initial values
            actions.resetForm();
            actions.setSubmitting(false); // Set isSubmitting to false to re-enable the submit button
          }, 500);
        }
      } catch (error) {}
    }
  };

  const defaultValues = {
    search: "",
    enquiry_id: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    gender: "",
    dob: dayjs(new Date()),
    class: "",
    present_class: "",
    joining_year: "",
    present_school: "",
    selected_status: "",
    reason: "",
    nationality: "",
    social_category: "",
    email: "",
    same_present_add: "",
    emergency_no: "",
    present_address: "",
    present_city: "",
    present_state: "",
    present_pincode: "",
    present_locality: "",
    present_country: "India",
    present_telephone: "",
    permanent_address: "",
    permanent_city: "",
    permanent_state: "",
    permanent_pincode: "",
    permanent_locality: "",
    permanent_country: "India",
    permanent_telephone: "",
    father_name: "",
    father_qualifications: "",
    father_occupation: "",
    father_email: "",
    father_org_name: "",
    father_org_address: "",
    father_nationality: "",
    father_country: "India",
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
    mother_country: "India",
    mother_state: "",
    mother_city: "",
    mother_pincode: "",
    mother_annual_income: "",
    mother_mobile: "",
  };

  const initialValues =
    data && studenData
      ? {
          ...defaultValues,
          search: (studenData && studenData.search) || defaultValues.search,
          enquiry_id:
            (studenData && studenData.enquiry_id) || defaultValues.enquiry_id,
          first_name:
            (studenData && studenData.name?.first_name) ||
            defaultValues.first_name,
          middle_name:
            (studenData && studenData.name?.middle_name) ||
            defaultValues.middle_name,
          last_name:
            (studenData && studenData.name?.last_name) ||
            defaultValues.last_name,
          gender: (studenData && studenData.gender) || defaultValues.gender,
          dob:
            (studenData && dayjs(studenData.date_of_birth)) ||
            defaultValues.dob,
          class: (studenData && studenData.class) || defaultValues.class,
          present_class:
            (studenData && studenData?.present_class) ||
            defaultValues.present_class,
          joining_year:
            (studenData && studenData.joining_year) ||
            defaultValues.joining_year,
          present_school:
            (studenData && studenData.present_school) ||
            defaultValues.present_school,
          selected_status:
            (studenData && studenData.selected_status) ||
            defaultValues.selected_status,
          reason:
            (studenData &&
              studenData.previous_school_details?.leaving_reason) ||
            defaultValues.reason,
          nationality:
            (studenData && studenData.nationality) || defaultValues.nationality,
          social_category:
            (studenData && studenData.social_category) ||
            defaultValues.social_category,
          email: (studenData && studenData.email) || defaultValues.email,
          same_present_add:
            (studenData && studenData.same_present_add) ||
            defaultValues.same_present_add,
          emergency_no:
            (studenData && studenData.emergency_number) ||
            defaultValues.emergency_no,
          present_address:
            (studenData && studenData.address?.present_address?.address) ||
            defaultValues.present_address,
          present_city:
            (studenData && studenData.address?.present_address?.city) ||
            defaultValues.present_city,
          present_state:
            (studenData && studenData.address?.present_address?.state) ||
            defaultValues.present_state,
          present_pincode:
            (studenData && studenData.address?.present_address?.pin_code) ||
            defaultValues.present_pincode,
          present_locality:
            (studenData && studenData.address?.present_address?.locality) ||
            defaultValues.present_locality,
          present_country:
            (studenData && studenData.address?.present_address?.country) ||
            defaultValues.present_country,
          present_telephone:
            (studenData && studenData.address?.present_address?.telephone) ||
            defaultValues.present_telephone,
          permanent_address:
            (studenData && studenData.address?.permanent_address?.address) ||
            defaultValues.permanent_address,
          permanent_city:
            (studenData && studenData.address?.permanent_address?.city) ||
            defaultValues.permanent_city,
          permanent_state:
            (studenData && studenData.address?.permanent_address?.state) ||
            defaultValues.permanent_state,
          permanent_pincode:
            (studenData && studenData.address?.permanent_address?.pin_code) ||
            defaultValues.permanent_pincode,
          permanent_locality:
            (studenData && studenData.address?.permanent_address?.locality) ||
            defaultValues.permanent_locality,
          permanent_country:
            (studenData && studenData.address?.permanent_address?.country) ||
            defaultValues.permanent_country,
          permanent_telephone:
            (studenData && studenData.address?.permanent_address?.telephone) ||
            defaultValues.permanent_telephone,
          father_name:
            (studenData && studenData.parent?.fathers_name) ||
            defaultValues.father_name,
          father_qualifications:
            (studenData && studenData.parent?.father_qualification) ||
            defaultValues.father_qualifications,
          father_occupation:
            (studenData && studenData.parent?.father_occupation) ||
            defaultValues.father_occupation,
          father_email:
            (studenData && studenData.parent?.father_email) ||
            defaultValues.father_email,
          father_org_name:
            (studenData && studenData.parent?.father_org_name) ||
            defaultValues.father_org_name,
          father_org_address:
            (studenData && studenData.parent?.father_org_address) ||
            defaultValues.father_org_address,
          father_nationality:
            (studenData && studenData.parent?.father_address?.nationality) ||
            defaultValues.father_nationality,
          father_country:
            (studenData && studenData.parent?.father_address?.country) ||
            defaultValues.father_country,
          father_state:
            (studenData && studenData.parent?.father_address?.state) ||
            defaultValues.father_state,
          father_city:
            (studenData && studenData.parent?.father_address?.city) ||
            defaultValues.father_city,
          father_pincode:
            (studenData && studenData.parent?.father_address?.pin_code) ||
            defaultValues.father_pincode,
          father_annual_income:
            (studenData && studenData.parent?.father_annual_income) ||
            defaultValues.father_annual_income,
          father_mobile:
            (studenData && studenData.parent?.father_phone) ||
            defaultValues.father_mobile,
          mother_name:
            (studenData && studenData.parent?.mothers_name) ||
            defaultValues.mother_name,
          mother_qualifications:
            (studenData && studenData.parent?.mother_qualification) ||
            defaultValues.mother_qualifications,
          mother_occupation:
            (studenData && studenData.parent?.mother_occupation) ||
            defaultValues.mother_occupation,
          mother_email:
            (studenData && studenData.parent?.mother_email) ||
            defaultValues.mother_email,
          mother_org_name:
            (studenData && studenData.parent?.mother_org_name) ||
            defaultValues.mother_org_name,
          mother_org_address:
            (studenData && studenData.parent?.mother_org_address) ||
            defaultValues.mother_org_address,
          mother_nationality:
            (studenData && studenData.parent?.mother_address?.nationality) ||
            defaultValues.mother_nationality,
          mother_country:
            (studenData && studenData.parent?.mother_address?.country) ||
            defaultValues.mother_country,
          mother_state:
            (studenData && studenData.parent?.mother_address?.state) ||
            defaultValues.mother_state,
          mother_city:
            (studenData && studenData.parent?.mother_address?.city) ||
            defaultValues.mother_city,
          mother_pincode:
            (studenData && studenData.parent?.mother_address?.pin_code) ||
            defaultValues.mother_pincode,
          mother_annual_income:
            (studenData && studenData.parent?.mother_annual_income) ||
            defaultValues.mother_annual_income,
          mother_mobile:
            (studenData && studenData.parent?.mother_phone) ||
            defaultValues.mother_mobile,
        }
      : defaultValues;

  const optionalString = Yup.string()
    .nullable()
    .transform((_, val) => (val === "" ? null : val));

  const validationSchema = Yup.object().shape({
    // search: optionalString,
    // enquiry_id: optionalString,
    // first_name: Yup.string().required("First name is required"),
    // middle_name: optionalString,
    // last_name: Yup.string().required("Last name is required"),
    // gender: Yup.string().required("Gender is required"),
    // dob: Yup.date().required("Date of birth is required").nullable(),
    // class: optionalString,
    // present_class: optionalString,
    // joining_year: optionalString,
    // present_school: optionalString,
    // reason: optionalString,
    // nationality: optionalString,
    // social_category: optionalString,
    // email: Yup.string()
    //   .email("Invalid email format")
    //   .required("Email is required"),
    // same_present_add: optionalString,
    // emergency_no: Yup.string().required("Emergency number is required"),
    // present_address: optionalString,
    // present_city: optionalString,
    // present_state: optionalString,
    // present_pincode: optionalString,
    // present_locality: optionalString,
    // present_country: optionalString.default("india"),
    // present_telephone: optionalString,
    // permanent_address: optionalString,
    // permanent_city: optionalString,
    // permanent_state: optionalString,
    // permanent_pincode: optionalString,
    // permanent_locality: optionalString,
    // permanent_country: optionalString.default("india"),
    // permanent_telephone: optionalString,
    // father_name: optionalString,
    // father_qualifications: optionalString,
    // father_occupation: optionalString,
    // father_email: Yup.string().email("Invalid email format"),
    // father_org_name: optionalString,
    // father_org_address: optionalString,
    // father_nationality: optionalString,
    // father_country: optionalString,
    // father_state: optionalString,
    // father_city: optionalString,
    // father_pincode: optionalString,
    // father_annual_income: Yup.number()
    //   .nullable()
    //   .transform((_, val) => (val === "" ? null : val)),
    // father_mobile: optionalString,
    // mother_name: optionalString,
    // mother_qualifications: optionalString,
    // mother_occupation: optionalString,
    // mother_email: Yup.string().email("Invalid email format"),
    // mother_org_name: optionalString,
    // mother_org_address: optionalString,
    // mother_nationality: optionalString,
    // mother_country: optionalString,
    // mother_state: optionalString,
    // mother_city: optionalString,
    // mother_pincode: optionalString,
    // mother_annual_income: Yup.number()
    //   .nullable()
    //   .transform((_, val) => (val === "" ? null : val)),
    // mother_mobile: optionalString,
  });
  console.log(initialValues, "---");
  return (
    <SimpleModal open={open} handleClose={handleClose} width={"80%"}>
      <Typography variant="h5">Follow Up</Typography>
      <div className="overflow-scroll h-[750px]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={data ? true : false}
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
                      {/* Not Required */}

                      {/* <div className="lg:w-[32.5%] w-[100%]">
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
                  </div> */}
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
                          {Config.genders?.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Field>
                      </div>

                      <div className="lg:w-[32.5%]  w-[100%]">
                        <DatePicker
                          label="Date Of Birth"
                          value={
                            values.dob ? dayjs(values.dob) : dayjs(new Date())
                          }
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
                              <MenuItem key={option.value} value={option.value}>
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
                    <span className="font-black text-[18px] ">
                      Present Address
                    </span>
                    <div className=" border  p-6 rounded-2xl mt-3">
                      <div className=" w-[100%] ">
                        <div className="w-[100%] mb-5">
                          <Field
                            name="present_address"
                            as={TextField}
                            label="Present Address"
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
                            <CountrySelect
                              name="present_country"
                              label="Present Country"
                              value={values.present_country}
                            />
                          </div>
                          <div className="lg:w-[32.5%]  w-[100%]">
                            <StateSelect
                              name="present_state"
                              label="Present State"
                              value={values.present_state}
                              onChange={(event) => {
                                const selectedState = event.target.value;
                                setFieldValue("present_state", selectedState);
                                setPresentState(selectedState);
                              }}
                              state={presentState}
                            />
                            {/* {
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
                        } */}
                          </div>
                          <div className="lg:w-[32.5%]  w-[100%]">
                            <CitySelectPersent
                              name="present_city"
                              label="Present City"
                              value={values.present_city}
                              state={presentState}
                            />
                            {/* <Field
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
                        </Field> */}
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
                              helperText={
                                <ErrorMessage name="present_pincode" />
                              }
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
                              helperText={
                                <ErrorMessage name="present_locality" />
                              }
                            />
                          </div>
                          {/* <div className="lg:w-[32.5%]  w-[100%]">
                            <Field
                              name="present_telephone"
                              as={TextField}
                              label="Telephone"
                              variant="outlined"
                              fullWidth
                              onBlur={handleBlur}
                              // onChange={handleChange}
                              onChange={(event) => {
                                const value = event.target.value;
                                // Allow only numbers and limit the length to 10
                                if (/^\d*$/.test(value) && value.length <= 10) {
                                  // setFieldValue(values.emergency_no, value);
                                  setFieldValue("present_telephone", value);
                                }
                              }}
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
                  <div className="mt-[20px] mb-[60px]">
                    <div className="flex items-center gap-3">
                      <span className="font-black text-[18px] ">
                        Permanent Address
                      </span>
                      <div className="flex items-center">
      <Checkbox
        checked={confirmAddress}
        onChange={(e) => setConfirmAddress(e.target.checked)}
      />
      <Typography variant="h6" fontWeight="bold">
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
                            label="Permanent Address"
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
                            helperText={
                              <ErrorMessage name="permanent_address" />
                            }
                          />
                        </div>
                        <div className="flex  flex-wrap gap-4">
                          <div className="lg:w-[32.5%]  w-[100%]">
                            <CountrySelect
                              name="permanent_country"
                              label="Permanet Country"
                              value={values.permanent_country}
                            />
                          </div>

                          <div className="lg:w-[32.5%]  w-[100%]">
                            <StateSelect
                              name="permanent_state"
                              label="Permanent State"
                              value={
                                confirmAddress
                                  ? values.present_state
                                  : values.permanent_state
                              }
                              // onChange={handleChange}
                              onChange={(event) => {
                                const selectedState = event.target.value;
                                setFieldValue("permanent_state", selectedState);
                                setPermanentState(selectedState);
                              }}
                            />
                          </div>
                          <div className="lg:w-[32.5%]  w-[100%]">
                            <CitySelectPermanent
                              name="permanent_city"
                              label="Permanent City"
                              // value={values.permanent_city}
                              value={
                                confirmAddress
                                  ? values.present_city
                                  : values.permanent_city
                              }
                              state={permanentState}
                            />
                          </div>

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
                              helperText={
                                <ErrorMessage name="permanent_pincode" />
                              }
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
                          {/* <div className="lg:w-[32.5%]  w-[100%]">
                            <Field
                              name="permanent_telephone"
                              as={TextField}
                              label="Telephone"
                              variant="outlined"
                              fullWidth
                              onBlur={handleBlur}
                              // onChange={handleChange}
                              onChange={(event) => {
                                const value = event.target.value;
                                if (/^\d*$/.test(value) && value.length <= 10) {
                                  setFieldValue("permanent_telephone", value);
                                }
                              }}
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

                  <div className="mt-[40px] ">
                    <span className="font-black text-[18px] ">
                      {` Father's Details`}
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
                              <MenuItem
                                key={option?.value}
                                value={option?.value}
                              >
                                {option.label}
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
                            helperText={
                              <ErrorMessage name="father_occupation" />
                            }
                          >
                            {Config.occupations.map((option) => (
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
                            helperText={
                              <ErrorMessage name="father_org_address" />
                            }
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
                            helperText={
                              <ErrorMessage name="father_nationality" />
                            }
                          >
                            {Config?.Nationalities?.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>

                        <div className="lg:w-[32.5%]  w-[100%]">
                          <CountrySelect
                            name="father_country"
                            label="Country"
                            value={values.father_country}
                          />
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <StateSelect
                            name="father_state"
                            label="State"
                            value={values.father_state}
                            onChange={(event) => {
                              const selectedState = event.target.value;
                              setFieldValue("father_state", selectedState);
                              setFatherState(selectedState);
                            }}
                          />
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <CitySelectFather
                            name="father_city"
                            label="City"
                            value={values.father_city}
                            state={fatherState}
                          />
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
                            // onChange={handleChange}
                            onChange={(event) => {
                              const value = event.target.value;
                              if (/^\d*$/.test(value) && value.length <= 10) {
                                setFieldValue("father_mobile", value);
                              }
                            }}
                            error={false}
                            helperText={<ErrorMessage name="father_mobile" />}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-[20px] ">
                    <span className="font-black text-[18px] ">
                      {`  Mother's Details`}
                    </span>
                    <div className=" border  p-6 rounded-2xl mt-3">
                      <div className="flex  flex-wrap lg:w-[100%] w-[100%] gap-4">
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
                              <MenuItem
                                key={option?.value}
                                value={option?.value}
                              >
                                {option.label}
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
                            helperText={
                              <ErrorMessage name="mother_occupation" />
                            }
                          >
                            {Config.occupations.map((option) => (
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
                            helperText={
                              <ErrorMessage name="mother_org_address" />
                            }
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
                            helperText={
                              <ErrorMessage name="mother_nationality" />
                            }
                          >
                            {Config?.Nationalities?.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>

                        <div className="lg:w-[32.5%]  w-[100%]">
                          <CountrySelect
                            name="mother_country"
                            label="Country"
                            value={values.mother_country}
                          />
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <StateSelect
                            name="mother_state"
                            label="State"
                            value={values.mother_state}
                            onChange={(event) => {
                              const selectedState = event.target.value;
                              setFieldValue("mother_state", selectedState);
                              setMotherState(selectedState);
                            }}
                          />
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <CitySelectMother
                            name="mother_city"
                            label="City"
                            value={values.mother_city}
                            state={motherState}
                          />
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
                            // onChange={handleChange}
                            onChange={(event) => {
                              const value = event.target.value;
                              if (/^\d*$/.test(value) && value.length <= 10) {
                                setFieldValue("mother_mobile", value);
                              }
                            }}
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
              <div className="flex justify-end mr-12 my-5 ">
                <CustomButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  // onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-blue-500 py-1 px-5 "
                  sx={{ py: 1, px: 5, fontWeight: "bold", fontSize: "16px" }}
                >
                  {data
                    ? isSubmitting
                      ? "Updating..."
                      : "Update"
                    : isSubmitting
                    ? "Submitting..."
                    : "Submit"}
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </SimpleModal>
  );
};

export default EnquiryMaster;

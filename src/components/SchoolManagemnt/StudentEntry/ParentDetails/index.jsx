import React, { useEffect, useState } from "react";
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
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as Yup from "yup";
import { Plus, PlusBox } from "mdi-material-ui";
import CustomButton from "@/components/CommonButton/CustomButton";
import { CountrySelect, StateSelect } from "@/components/StateAndCity";
import Config from "@/utilities/Config";
import CitySelectFather from "@/components/StateAndCity/City/FatherCity";
import CitySelectMother from "@/components/StateAndCity/City/MotherCity";
import { useRouter } from "next/router";
import { GetStudentListById } from "@/services/api";

const validationSchema = Yup.object().shape({
  // name: Yup.string().required("Name is required"),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  // gender: Yup.string().required("Gender is required"),
});

const ParentDetails = ({ studenData }) => {
  // const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  // const [studenData, setStudentData] = useState({});

  // const studentDetails = async () => {
  //   try {
  //     if (!id) return;
  //     const resp = await GetStudentListById(id);
  //     console.log(resp, "resp");
  //     setStudentData(resp?.data[0]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // useEffect(() => {
  //   studentDetails();
  // }, [id]);
  const [emergencyToggle, setEmergencyToggle] = useState(false);
  const [authorisedToggle, setauthorisedToggle] = useState(false);
  const [fatherState, setFatherState] = useState("");
  const [motherState, setMotherState] = useState("");
  const [confirmAddress, setConfrimAddress] = useState(false);
  const handleSubmit = async (values, event) => {
    console.log(values, "-dsfsdfdsfsfsd");
    const payload = {};

    payload.admission_number = values?.admission_no;

    payload.father_detail = {
      fathers_name: values?.father_name,
      father_qualifications: values?.father_qualifications,
      father_occupation: values?.father_occupation,
      father_email: values?.father_email,
      father_org_name: values?.father_org_name,
      father_org_address: values?.father_org_address,
      father_annual_income: values?.father_annual_income,
      father_mobile: values?.father_mobile,
      mothers_name: values?.mother_name,
      mother_qualification: values?.mother_qualifications,
      mother_occupation: values?.mother_occupation,
      mother_email: values?.mother_email,
      mother_email: values?.mother_email,
      mother_org_name: values?.mother_org_name,
      mother_org_address: values?.mother_org_address,
      mother_annual_income: values?.mother_annual_income,
      mother_mobile: values?.mother_mobile,
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

    payload.guardian_details = {
      guardian_name: values.guardian_name,
      relation: values.guardian_relation,
      mobile_number: values.guardian_mobile_no,
      email: values.guardian_email,
      address: values.guardian_address,
    };
    payload.sibling_detail = {
      admission_number: values.sibling_same_inst_admission_no1,
      class: values.sibling_same_inst_class1,
      section: values.sibling_same_inst_section1,
      name: values.sibling_same_inst_name1,
    };
    payload.sibling_detail_in_other_institution = {
      admission_number: values.sibling_other_inst_admission_no1,
      class: values.sibling_other_inst_class1,
      section: values.sibling_other_inst_section1,
      name: values.sibling_other_inst_name1,
    };
    payload.student_status = "Admission";
    payload.enquiry_id = studenData?.enquiry_id;

    console.log(payload, "----payload");
    try {
      const resp = await UpdateStudent(payload);
      if (resp?.success === true) {
        toast.success("Student Details Add successfully");
        // setSlectedTab(2);
        handleClose();
      }
      console.log(resp?.success, "-sdcdsf");
      // Handle form submission
      console.log(values);
      // setStatus({ success: true });
    } catch (error) {
      // setStatus({ success: false });
    }
  };
  const initialValues = id
    ? {
        search: studenData.search || "",
        admission_no: studenData.admission_number || "",

        father_name: studenData.parent?.fathers_name || "",
        father_qualifications: studenData.parent?.father_qualification || "",
        father_occupation: studenData.parent?.father_occupation || "",
        father_designation: studenData.parent?.father_designation || "",
        father_email: studenData.parent?.father_email || "",
        father_org_name: studenData.parent?.father_org_name || "",
        father_org_address: studenData.parent?.father_org_address || "",
        father_nationality:
          studenData.parent?.father_address?.nationality || "",
        father_country: studenData.parent?.father_address?.country || "India",
        father_state: studenData.parent?.father_address?.state || "",
        father_city: studenData.parent?.father_address?.city || "",
        father_pincode: studenData.parent?.father_address?.pin_code || "",
        father_annual_income: studenData.parent?.father_annual_income || "",
        father_telephone: studenData.parent?.father_telephone || "",
        father_mobile: studenData.parent?.father_phone || "",
        mother_name: studenData.parent?.mothers_name || "",
        mother_qualifications: studenData.parent?.mother_qualification || "",
        mother_occupation: studenData.parent?.mother_occupation || "",
        mother_email: studenData.parent?.mother_email || "",
        mother_org_name: studenData.parent?.mother_org_name || "",
        mother_org_address: studenData.parent?.mother_org_address || "",
        mother_nationality:
          studenData.parent?.mother_address?.nationality || "",
        mother_country: studenData.parent?.mother_address?.country || "India",
        mother_state: studenData.parent?.mother_address?.state || "",
        mother_city: studenData.parent?.mother_address?.city || "",
        mother_pincode: studenData.parent?.mother_address?.pin_code || "",
        mother_annual_income: studenData.parent?.mother_annual_income || "",
        mother_mobile: studenData.parent?.mother_phone || "",
        mother_telephone: studenData.parent?.mother_telephone || "",
        guardian_name: studenData.guardian_details?.guardian_name || "",
        guardian_relation: studenData.guardian_details?.relation || "",
        guardian_mobile_no: studenData.guardian_details?.mobile_number || "",
        guardian_email: studenData.guardian_details?.email || "",
        guardian_address: studenData.guardian_details?.address || "",
        any_sibling_school: "",
        sibling_same_inst_admission_no1:
          studenData?.sibling_detail?.admission_number || "",
        sibling_same_inst_name1: studenData?.sibling_detail?.name || "",
        sibling_same_inst_class1: studenData?.sibling_detail?.class || "",
        sibling_same_inst_section1: studenData?.sibling_detail?.section || "",

        // sibling_same_inst_admission_no2:  studenData?.sibling_detail?.admission_number ||"",
        // sibling_same_inst_name2:  studenData?.sibling_detail?.admission_number ||"",
        // sibling_same_inst_class_section2:  studenData?.sibling_detail?.admission_number ||"",

        any_other_sibling_school:
          studenData?.sibling_detail_in_other_institution?.admission_number ||
          "",
        sibling_other_inst_admission_no1:
          studenData?.sibling_detail_in_other_institution?.admission_number ||
          "",
        sibling_other_inst_name1:
          studenData?.sibling_detail_in_other_institution?.admission_number ||
          "",
        sibling_other_inst_class1:
          studenData?.sibling_detail_in_other_institution?.class || "",
        sibling_other_inst_section1:
          studenData?.sibling_detail_in_other_institution?.section || "",

        // sibling_other_inst_admission_no2:  studenData?.sibling_detail_in_other_institution?.admission_number ||"",
        // sibling_other_inst_name2: studenData?.sibling_detail_in_other_institution?.admission_number || "",
        // sibling_other_inst_class_section2:  studenData?.sibling_detail_in_other_institution?.admission_number ||"",
      }
    : {
        search: "",
        admission_no: "",
        father_name: "",
        father_qualifications: "",
        father_occupation: "",
        father_designation: "",
        father_email: "",
        father_org_name: "",
        father_org_address: "",
        father_nationality: "",
        father_country: "India",
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
        mother_country: "India",
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
        any_sibling_school: "",
        sibling_same_inst_admission_no1: "",
        sibling_same_inst_name1: "",
        sibling_same_inst_class1: "",
        sibling_same_inst_section1: "",
        sibling_same_inst_admission_no2: "",
        sibling_same_inst_name2: "",
        sibling_same_inst_class2: "",
        sibling_same_inst_section2: "",
        any_other_sibling_school: "",
        sibling_other_inst_admission_no1: "",
        sibling_other_inst_name1: "",
        sibling_other_inst_section1: "",
        sibling_other_inst_class1: "",
        sibling_other_inst_admission_no2: "",
        sibling_other_inst_name2: "",
        sibling_other_inst_class2: "",
        sibling_other_inst_section2: "",
      };

  return (
    <Formik
      initialValues={initialValues}
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
          {/* Father Details */}
          {
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
                          <MenuItem key={option?.label} value={option?.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    <div className="lg:w-[32%] w-[100%]">
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
                        {Config.occupations.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    <div className="lg:w-[32.5%] w-[100%]">
                      <Field
                        name="father_designation"
                        as={TextField}
                        label="Designation"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="father_designation" />}
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
                    <div className="w-[66%]">
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
                    <div className="lg:w-[32%] w-[100%]">
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
                  </div>
                </div>

                <div className="  flex-wrap flex mt-5  gap-4">
                  <div className="lg:w-[32.5%] w-[100%]">
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
                      {Config.Nationalities.map((option) => (
                        <MenuItem key={option?.label} value={option?.label}>
                          {option?.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>
                  <div className="lg:w-[32.5%] w-[100%]">
                    <CountrySelect
                      name="father_country"
                      label="Country"
                      value={values.father_country}
                    />
                  </div>
                  <div className="lg:w-[32.5%] w-[100%]">
                    <StateSelect
                      name="father_state"
                      label="Father's State"
                      value={values.father_state}
                      onChange={(event) => {
                        const selectedState = event.target.value;
                        setFieldValue("father_state", selectedState);
                        setFatherState(selectedState);
                      }}
                    />
                    {/* <Autocomplete
                        options={cities}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="State"
                            variant="outlined"
                            fullWidth
                            error={false}
                            helperText={<ErrorMessage name="father_state" />}
                          />
                        )}
                        value={null}
                        onChange={(event, value) =>
                          setFieldValue("father_state", value ? value.name : "")
                        }
                        onBlur={() => {}}
                      /> */}
                  </div>
                  <div className="lg:w-[32.5%] w-[100%]">
                    <CitySelectFather
                      name="father_city"
                      label="Father's City"
                      value={values.father_city}
                      state={fatherState}
                    />
                    {/* <Autocomplete
                        options={cities}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="City"
                            variant="outlined"
                            fullWidth
                            error={false}
                            helperText={<ErrorMessage name="father_city" />}
                          />
                        )}
                        value={null}
                        onChange={(event, value) =>
                          setFieldValue("father_city", value ? value.name : "")
                        }
                        onBlur={() => {}}
                      /> */}
                  </div>
                  <div className="lg:w-[32.5%] w-[100%]">
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
                  <div className="lg:w-[32.5%] w-[100%]">
                    <Field
                      name="father_annual_income"
                      as={TextField}
                      label="Annual Income"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="father_annual_income" />}
                    />
                  </div>
                  {/* <div className="lg:w-[32.5%] w-[100%]">
                        <Field
                          name="father_telephone"
                          as={TextField}
                          label="Telephone"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          helperText={<ErrorMessage name="father_telephone" />}
                        />
                      </div> */}
                  <div className="lg:w-[32.5%] w-[100%]">
                    <Field
                      name="father_mobile"
                      as={TextField}
                      label="Mobile"
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
          }
          {/* Mother Details */}
          {
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
                          <MenuItem key={option?.label} value={option?.value}>
                            {option.label}
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
                        {Config.occupations.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    <div className="lg:w-[32.5%] w-[100%]">
                      <Field
                        name="mother_designation"
                        as={TextField}
                        label="Designation"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="mother_designation" />}
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
                      {Config.Nationalities.map((option) => (
                        <MenuItem key={option?.label} value={option?.label}>
                          {option?.label}
                        </MenuItem>
                      ))}
                    </Field>
                  </div>
                  <div className="lg:w-[32.5%] w-[100%]">
                    <CountrySelect
                      name="mother_country"
                      label="Country"
                      value={values.mother_country}
                    />
                  </div>
                  <div className="lg:w-[32.5%] w-[100%]">
                    <StateSelect
                      name="mother_state"
                      label="Mother's State"
                      value={values.mother_state}
                      onChange={(event) => {
                        const selectedState = event.target.value;
                        setFieldValue("mother_state", selectedState);
                        setMotherState(selectedState);
                      }}
                    />
                  </div>
                  <div className="lg:w-[32.5%] w-[100%]">
                    <CitySelectMother
                      name="mother_city"
                      label="Mother's City"
                      value={values.mother_city}
                      state={motherState}
                    />
                  </div>
                  <div className="lg:w-[32.5%] w-[100%]">
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
                  <div className="lg:w-[32.5%] w-[100%]">
                    <Field
                      name="mother_annual_income"
                      as={TextField}
                      label="Annual Income"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="mother_annual_income" />}
                    />
                  </div>
                  {/* <div className="lg:w-[32.5%] w-[100%]">
                        <Field
                          name="mother_telephone"
                          as={TextField}
                          label="Telephone"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          helperText={<ErrorMessage name="mother_telephone" />}
                        />
                      </div> */}
                  <div className="lg:w-[32.5%] w-[100%]">
                    <Field
                      name="mother_mobile"
                      as={TextField}
                      label="Mobile"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="mother_mobile" />}
                    />
                  </div>
                </div>
              </div>
            </div>
          }
          {/* Guardian Details */}
          {
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
          }
          {
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
                        name="sibling_same_inst_admission_no1"
                        as={TextField}
                        label="Admission No"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={
                          <ErrorMessage name="sibling_same_inst_admission_no1" />
                        }
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%] mb-5">
                      <Field
                        name="sibling_same_inst_name1"
                        as={TextField}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={
                          <ErrorMessage name="sibling_same_inst_name1" />
                        }
                      />
                    </div>
                    <div className="w-[100%] lg:w-[15.5%]  mb-5">
                      <Field
                        name="sibling_same_inst_class1"
                        as={TextField}
                        select
                        label="Class"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.sibling_same_inst_class1}
                        helperText={
                          <ErrorMessage name="sibling_same_inst_class1" />
                        }
                      >
                        {Config.ClassList.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    <div className="w-[100%] lg:w-[15.5%]  mb-5">
                      <Field
                        name="sibling_same_inst_section1"
                        as={TextField}
                        select
                        label="Section"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.sibling_same_inst_section1}
                        helperText={
                          <ErrorMessage name="sibling_same_inst_section1" />
                        }
                      >
                        {Config.SectionList.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                  </div>
                  <div className="flex  flex-wrap gap-4">
                    <div className="lg:w-[32.5%] w-[100%] mb-5">
                      <Field
                        name="sibling_same_inst_admission_no2"
                        as={TextField}
                        label="Admission No"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={
                          <ErrorMessage name="sibling_same_inst_admission_no2" />
                        }
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%] mb-5">
                      <Field
                        name="sibling_same_inst_name2"
                        as={TextField}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={
                          <ErrorMessage name="sibling_same_inst_name2" />
                        }
                      />
                    </div>
                    {/* <div className="w-[100%] lg:w-[32.5%]  mb-5">
                          <Field
                            name="sibling_same_inst_class_section2"
                            as={TextField}
                            label="Class & Section"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="sibling_same_inst_class_section2" />
                            }
                          />
                        </div> */}
                    <div className="w-[100%] lg:w-[15.5%]  mb-5">
                      <Field
                        name="sibling_same_inst_class2"
                        as={TextField}
                        select
                        label="Class"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.sibling_same_inst_class2}
                        helperText={
                          <ErrorMessage name="sibling_same_inst_class2" />
                        }
                      >
                        {Config.ClassList.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    <div className="w-[100%] lg:w-[15.5%]  mb-5">
                      <Field
                        name="sibling_same_inst_section2"
                        as={TextField}
                        select
                        label="Section"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.sibling_same_inst_section2}
                        helperText={
                          <ErrorMessage name="sibling_same_inst_section2" />
                        }
                      >
                        {Config.SectionList.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          {/* Sibling Details other */}
          {
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
                        name="sibling_other_inst_admission_no1"
                        as={TextField}
                        label="Admission No"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={
                          <ErrorMessage name="sibling_other_inst_admission_no1" />
                        }
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%] mb-5">
                      <Field
                        name="sibling_other_inst_name1"
                        as={TextField}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={
                          <ErrorMessage name="sibling_other_inst_name1" />
                        }
                      />
                    </div>
                    {/* <div className="w-[100%] lg:w-[32.5%]  mb-5">
                          <Field
                            name="sibling_other_inst_class_section1"
                            as={TextField}
                            label="Class & Section"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="sibling_other_inst_class_section1" />
                            }
                          />
                        </div> */}
                    <div className="w-[100%] lg:w-[15.5%]  mb-5">
                      <Field
                        name="sibling_other_inst_class1"
                        as={TextField}
                        select
                        label="Class"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.sibling_other_inst_class1}
                        helperText={
                          <ErrorMessage name="sibling_other_inst_class1" />
                        }
                      >
                        {Config.ClassList.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    <div className="w-[100%] lg:w-[15.5%]  mb-5">
                      <Field
                        name="sibling_other_inst_section1"
                        as={TextField}
                        select
                        label="Section"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.sibling_other_inst_section1}
                        helperText={
                          <ErrorMessage name="sibling_other_inst_section1" />
                        }
                      >
                        {Config.SectionList.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                  </div>
                  <div className="flex  flex-wrap gap-4">
                    <div className="lg:w-[32.5%] w-[100%] mb-5">
                      <Field
                        name="sibling_other_inst_admission_no2"
                        as={TextField}
                        label="Admission No"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={
                          <ErrorMessage name="sibling_other_inst_admission_no2" />
                        }
                      />
                    </div>
                    <div className="w-[100%] lg:w-[32.5%] mb-5">
                      <Field
                        name="sibling_other_inst_name2"
                        as={TextField}
                        label="Name"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={
                          <ErrorMessage name="sibling_other_inst_name2" />
                        }
                      />
                    </div>
                    {/* <div className="w-[100%] lg:w-[32.5%]  mb-5">
                          <Field
                            name="sibling_other_inst_class_section2"
                            as={TextField}
                            label="Class & Section"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="sibling_other_inst_class_section2" />
                            }
                          />
                        </div> */}
                    <div className="w-[100%] lg:w-[15.5%]  mb-5">
                      <Field
                        name="sibling_other_inst_class_2"
                        as={TextField}
                        select
                        label="Class"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.sibling_other_inst_class_2}
                        helperText={
                          <ErrorMessage name="sibling_other_inst_class_2" />
                        }
                      >
                        {Config.ClassList.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    <div className="w-[100%] lg:w-[15.5%]  mb-5">
                      <Field
                        name="sibling_other_inst_section2"
                        as={TextField}
                        select
                        label="Section"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.sibling_other_inst_section2}
                        helperText={
                          <ErrorMessage name="sibling_other_inst_section2" />
                        }
                      >
                        {Config.SectionList.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
          <div className="lg:flex justify-between mt-5 mb-5">
            <div className="border mb-5 p-4 lg:w-[49%] w-[100%] rounded-xl">
              <div className="flex justify-between items-center ">
                <span className="font-black text-[16px] ">
                  Emergency Contact
                </span>
                {/* <div
                  className="cursor-pointer"
                  onClick={() => setEmergencyToggle(true)}
                >
                  <PlusBox sx={{ fontSize: 25 }} />
                </div> */}
              </div>
              {
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
              }
            </div>

            <div className="border mb-5 p-4 lg:w-[49%] w-[100%] rounded-xl">
              <div className="flex justify-between items-center ">
                <span className="font-black text-[16px] ">
                  Authorised Pickup Details
                </span>
              </div>
              {
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
              }
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

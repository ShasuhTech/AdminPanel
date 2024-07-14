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
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import * as Yup from "yup";
import { Plus, PlusBox } from "mdi-material-ui";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CustomButton from "@/components/CommonButton/CustomButton";
import Config from "@/utilities/Config";
import { CountrySelect } from "@/components/StateAndCity";
import { StateData, cityData } from "@/services/api";
import { useQuery } from "react-query";
import { useRouter } from "next/router";

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

const AdditionalDetails = ({ studenData }) => {
  const [presentState, setPresentState] = useState("");
  const [permanentState, setPermanentState] = useState("");
  const [fatherState, setFatherState] = useState("");
  const [motherState, setMotherState] = useState("");
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
    ciftyRefetch()
  }, [presentState, studenData?.address?.present_address?.state])
  
  const router = useRouter();
  const { id } = router.query;
  // const classes = useStyles();
  const [emergencyToggle, setEmergencyToggle] = useState(false);
  const [authorisedToggle, setauthorisedToggle] = useState(false);
  const handleSubmit = async (values, event) => {
    console.log(values, "-dsfsdfdsfsfsd");
    const payload = {};

    payload.admission_number = values?.admission_no;
    payload.previous_school_details = {
      school_name: values.school_name,
      recognised_by: values.school_reconised_by,
      medium_of_instruction: values.medium_of_instruction,
      year_of_passing: values.year_of_passing,
      tc_number: values.tc_number,
      leaving_reason: values.previous_leaving,
      Syllabus: values.Syllabus,
      class: values.pre_class,
      tc_birth: values.tc_birth,
      address: values.Pre_address,
      state: values.previous_state,
      city: values.previous_city,
      country: values.previous_country,
      pin_code: values.previous_pincode,
    };
    payload.second_language= values.second_language;
    payload.third_language= values.thrid_language;
    payload.birth_details={
      date_of_birth: values.date_of_birth,
      place_of_birth: values.place_of_birth,
      certificate_number: values.certificate_no,
      country:values?.country,
      certificate_crop_number:values?.certificate_corp_no,
      

    }
 

    payload.other_details = {
      any_physical_disablity: values.any_physical_disability,
      any_treatment_undertaken_or_required: values.any_treatment_undertaken,
      any_allergies: values.any_allergies,
      interest_and_hobbies: values.interest_hobbies,
      sports: values.sports_game,
      co_curricular_activities: values.co_curriclar_activities,
      any_other_relevant_information: values.any_other_relevent_information,
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
        second_language:studenData?.second_language|| "",
        thrid_language:studenData?.third_language|| "",
        place_of_birth: studenData?.birth_details?.place_of_birth||"",
        country:studenData?.birth_details?.country|| "",
        certificate_no: studenData?.birth_details?.certificate_number|| "",
        date_of_birth:studenData?.birth_details?.date_of_birth|| "",
        certificate_corp_no:studenData?.birth_details?.certificate_crop_number|| "",
        school_name: studenData?.previous_school_details?.school_name || "",
        school_reconised_by:
          studenData?.previous_school_details?.recognised_by || "",
        previous_country:
          studenData?.previous_school_details?.country || "India",
        previous_state: studenData?.previous_school_details?.state || "",
        previous_city: studenData?.previous_school_details?.city || "",
        previous_pincode: studenData?.previous_school_details?.pin_code || "",
        medium_of_instruction:
          studenData?.previous_school_details?.medium_of_instruction || "",
        year_of_passing:
          studenData?.previous_school_details?.year_of_passing || "",
        tc_number: studenData?.previous_school_details?.tc_number || "",
        previous_leaving:
          studenData?.previous_school_details?.leaving_reason || "",
      }
    : {
        second_language: "",
        thrid_language: "",
        place_of_birth: "",
        country: "",
        certificate_no: "",
        date_of_birth: "",
        certificate_corp_no: "",
        school_name: "",
        school_reconised_by: "",
        previous_country: "India",
        previous_state: "",
        previous_city: "",
        previous_pincode: "",
        medium_of_instruction: "",
        year_of_passing: "",
        tc_number: "",
        previous_leaving: "",
      };

  console.log(initialValues, "initialValues");
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
          {/* <p>All aditional field added here</p> */}

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
                {Config.MotherTongues.map((option) => (
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
                {Config.MotherTongues.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
            </div>
            {/* <div className="w-[48.5%]">
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
            </div> */}
            <div className="w-[48.5%]">
              {/* <Autocomplete
                options={Config.cities}
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
              /> */}
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
                <CountrySelect
                      name="country"
                      label="Country"
                      value={values.country}
                    />
                  {/* <Autocomplete
                    options={Config.cities}
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
                  /> */}

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
                      setFieldValue("date_of_birth", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        error={false}
                        helperText={<ErrorMessage name="date_of_birth" />}
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
          {/* <div className="mt-[20px] mb-5">
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
                    options={Config.cities}
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
                    options={Config.cities}
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
                    options={Config.cities}
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
          </div> */}
          {
            <div className="mt-[20px] ">
              <span className="font-black text-[18px] ">
                Previous School Details
              </span>
              <div className=" border  p-6 rounded-2xl mt-3">
                <div className=" lg:flex w-[100%] gap-4">
                  <div className="flex  flex-wrap lg:w-[100%] w-[100%] gap-4">
                    <div className="lg:lg:w-[32.5%] w-[100%]">
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
                    <div className="lg:w-[32.4%]  w-[100%]">
                      <Field
                        name="school_reconised_by"
                        as={TextField}
                        select
                        label="School Reconised By"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.school_reconised_by}
                        helperText={<ErrorMessage name="school_reconised_by" />}
                      >
                        {Config?.Boards.map((option) => (
                          <MenuItem key={option.label} value={option.label}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Field>
                    </div>
                    <div className="lg:w-[32.5%]  w-[100%]">
                      <Field
                        name="Pre_address"
                        as={TextField}
                        label="Address"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="Pre_address" />}
                      />
                    </div>
                    <div className="lg:w-[32.5%]  w-[100%]">
                      <CountrySelect
                        name="previous_country"
                        label="Country"
                        value={values.previous_country}
                      />
                    </div>
                    <div className="lg:w-[32.5%]  w-[100%]">
                      {
                        <Field
                          name="previous_state"
                          as={TextField}
                          select
                          label="State"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={(event) => {
                            const selectedState = event.target.value;
                            setFieldValue("previous_state", selectedState);
                            setPresentState(selectedState);
                          }}
                          error={false}
                          value={values.previous_state}
                          helperText={<ErrorMessage name="previous_state" />}
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
                        name="previous_city"
                        as={TextField}
                        select
                        label="City"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.previous_city}
                        helperText={<ErrorMessage name="previous_city" />}
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
                    <div className="lg:w-[32.5%]  w-[100%]">
                      <Field
                        name="previous_leaving"
                        as={TextField}
                        label="Leaving Reason"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="previous_leaving" />}
                      />
                    </div>
                    <div className="lg:w-[32.5%]  w-[100%]">
                      <Field
                        name="tc_number"
                        as={TextField}
                        label=" TC No"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="tc_number" />}
                      />
                    </div>
                    <div className="lg:w-[32.5%]  w-[100%]">
                      <DatePicker
                        label="TC Date"
                        value={null}
                        fullWidth
                        className="w-[100%]"
                        onChange={(newValue) => {
                          setFieldValue("tc_birth", newValue);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            fullWidth
                            // required
                            error={false}
                            helperText={<ErrorMessage name="tc_birth" />}
                          />
                        )}
                      />
                    </div>
                    {/* <div className="lg:lg:w-[32.5%] w-[100%]">
                          <Field
                            name="school_city_name"
                            as={TextField}
                            label="City Name"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="school_city_name" />
                            }
                          />
                        </div> */}
                    <div className="lg:w-[32.4%]  w-[100%]">
                      <Field
                        name="medium_of_instruction"
                        as={TextField}
                        select
                        label="Medium Of Instruction"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        value={values.medium_of_instruction}
                        helperText={
                          <ErrorMessage name="medium_of_instruction" />
                        }
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
                        name="year_of_passing"
                        as={TextField}
                        label="Year Of Passing"
                        variant="outlined"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={false}
                        helperText={<ErrorMessage name="year_of_passing" />}
                      />
                    </div>
                    {/* <Typography
                          className="text-red-500 font-bold"
                          style={{ fontWeight: "bold" }}
                        >
                          DETAILS OF THE PERFORMANCE OF THE CHILD IN THE
                          PREVIOUS YEARS(NOT APPLICABLE FOR NUR & PREP & I)
                        </Typography> */}
                    {/* <TableContainer sx={{ overflowX: "auto" }}>
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
                            style={{ height: "auto", position: "relative" }}
                          >
                            {[
                              "ENGLISH",
                              "HINDI",
                              "MATHEMATICS",
                              "SCIENCE",
                              "SOCIAL SCIENCE",
                              "THIRD LANGUAGE",
                            ].map((row, index) => (
                              <Row
                                key={index}
                                row={row}
                                index={index}
                                values={values}
                              />
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer> */}
                  </div>
                </div>
              </div>
            </div>
          }

          {status && status.success === false && (
            <Typography className={classes.error} variant="body1">
              Form submission failed. Please try again.
            </Typography>
          )}
          <div className="flex justify-end mr-12 my-5  ">
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

"use client";
import React, { useEffect, useState } from "react";
import { Typography, Grid, MenuItem, TextField } from "@mui/material";
import { Close } from "mdi-material-ui";
import { Field, Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/CommonButton/CustomButton";
import TextInput from "@/components/TextInput";
import SimpleModal from "@/components/Modal/SimpleModal";
import { AddSchool } from "@/services/School";
import { toast } from "react-toastify";
import {
  CitySelect,
  CountrySelect,
  StateSelect,
} from "@/components/StateAndCity";
import Config from "@/utilities/Config";
import { useQuery } from "react-query";
import { StateData, cityData } from "@/services/api";

const AddServiceModal = ({ open, onClose, selectedItem }) => {
  const [state, setState] = useState(selectedItem?.address?.state || "");
  const {
    data: allState,
    isLoading: stateIsLoading,
    refetch,
  } = useQuery("StateData", async () => {
    const res = await StateData();
    return res?.data;
  });

  useEffect(() => {
    refetch();
  }, [state]);
  const {
    data: allCity,
    isLoading: cityIsLoading,
    refetch: cityRefetch,
  } = useQuery(
    "cityData",
    async () => {
      const payload = { state };
      if (state) {
        const res = await cityData(payload);
        return res?.data;
      }
    },
    { enabled: !!state } // Only fetch when state is defined
  );

  useEffect(() => {
    if (state) cityRefetch();
    setState(selectedItem?.address?.state)
  }, [state, cityRefetch, selectedItem]);
  console.log(state,'--')
  const lazy_array = [
    { name: "School Name", value: "school_name" },
    { name: "Contact Person Name", value: "contact_person" },
    { name: "School Affiliation Code", value: "affiliation_code" },
    { name: "School Website", value: "website" },
    { name: "Designation", value: "designation" },
    { name: "Enrollment Id", value: "enrollment_id" },
    { name: "Phone No", value: "phone_no" },
    { name: "Email Id", value: "email_id" },
    { name: "Password", value: "password" },
    { name: "School Address", value: "address" },
    { name: "Street", value: "street" },
    { name: "country", value: "country", data: Config.CountryDta },
    { name: "state", value: "state", data: allState },
    { name: "city", value: "city", data: allCity },
    { name: "Pin Code", value: "pin_code" },
  ];

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const emailRegex =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const SignupSchema = Yup.object().shape({
    school_name: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("School Name Required"),
    address: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("School Address Required"),
    affiliation_code: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Affiliation Code Required"),
    // website: Yup.string()
    //   .min(2, "Too Short!")
    //   .max(50, "Too Long!")
    //   .required("website Name Required"),
    designation: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Designation Required"),
    contact_person: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Contact Person Required"),
    password: Yup.string()
      .min(8, "Too Short!")
      .max(20, "Too Long!")
      .required("Password Required"),
    enrollment_id: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Enrollment Id Required"),
    email_id: Yup.string()
      .email("Invalid email")
      .matches(emailRegex, "Email is not valid !")
      .required("Email Required"),
    phone_no: Yup.string()
      .min(10, "Enter Valid Phone Number!")
      .max(10, "Enter Valid Phone Number!")
      .matches(phoneRegExp, "Phone Number is not valid !")
      .required("Enter Mobile Number"),
    country: Yup.string().required("Country Required"),
    state: Yup.string().required("State Required"),
    city: Yup.string().required("City Required"),
    street: Yup.string().required("Street Required"),
    pin_code: Yup.string().required("Pin Code Required"),
  });

  const handleSubmit = async (values) => {
    console.log(values, "-values");
    const payload = {
      school_name: values.school_name,
      affiliation_code: values.affiliation_code,
      website: values.website,
      designation: values.designation,
      contact_person_name: values.contact_person,
      enrollment_id: values.enrollment_id,
      phone: values.phone_no,
      email: values.email_id,
      password: values.password,
    };
    payload.address = {
      street: values.street,
      country: values.country,
      state: values.state,
      city: values.city,
      pin: values.pin_code,
      address: values.address,
    };
    console.log(payload);
    try {
      const resp = await AddSchool(payload);
      toast.success("Successfully Added");
      onClose();
      console.log(resp);
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }

    // setSubmitting(false);
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <SimpleModal
        open={open}
        handleClose={handleClose}
        aria-labelledby="add-service-modal-title"
        aria-describedby="add-service-modal-description"
      >
        <Grid className="lg:w-[800px] w-[400px] h-[100%]">
          <Grid className="flex justify-between items-center text-center">
            <Typography
              variant="h5"
              fontWeight={"bold"}
              id="add-service-modal-title"
              gutterBottom
              mt={1}
            >
              Add School
            </Typography>
            
          </Grid>

          <Grid container gap={2} mt={3} className="">
            <Formik
              initialValues={{
                school_name: selectedItem?.school_name || "",
                address: selectedItem?.address?.address || "",
                affiliation_code: selectedItem?.affiliation_code || "",
                website: selectedItem?.website || "",
                designation: selectedItem?.designation || "",
                contact_person: selectedItem?.contact_person_name || "",
                enrollment_id: selectedItem?.enrollment_id || "",
                phone_no: selectedItem?.phone || "",
                email_id: selectedItem?.email || "",
                password: selectedItem?.password || "",
                street: selectedItem?.address?.street || "",
                city: selectedItem?.address?.city || "",
                state: selectedItem?.address?.state || "",
                country: selectedItem?.address?.country || "",
                pin_code: selectedItem?.address?.pin || "",
              }}
              onSubmit={handleSubmit}
              validationSchema={SignupSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                isSubmitting,
                errors,
                touched,
              }) => (
                <>
                  {lazy_array.map((e, i) => (
                    <>
                      {e.name === "country" ? (
                        <Field
                          name={e.value}
                          as={TextField}
                          select
                          label={e.name}
                          variant="outlined"
                          // fullWidth
                          required
                          className="w-[48%]"
                          onChange={handleChange(e.value)}
                          value={values[e.value]}
                          error={Boolean(errors[e.value] && touched[e.value])}
                          helperText={
                            errors[e.value] && touched[e.value]
                              ? errors[e.value]
                              : ""
                          }
                        >
                          {e?.data.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Field>
                      ) : e.name === "state" ? (
                        <Field
                          name={e.value}
                          as={TextField}
                          select
                          label={e.name}
                          variant="outlined"
                          // fullWidth
                          className="w-[48%]"
                          required
                          onChange={(event) => {
                            handleChange(event);
                            setState(event.target.value);
                          }}
                          value={values[e.value]}
                          error={Boolean(errors[e.value] && touched[e.value])}
                          helperText={
                            errors[e.value] && touched[e.value]
                              ? errors[e.value]
                              : ""
                          }
                        >
                          {allState?.map((option) => (
                            <MenuItem key={option.name} value={option.name}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Field>
                      ) : e.name === "city" ? (
                        <Field
                          name={e.value}
                          as={TextField}
                          select
                          label={e.name}
                          variant="outlined"
                          // fullWidth
                          className="w-[48%]"
                          required
                          onChange={handleChange(e.value)}
                          value={values[e.value]}
                          error={Boolean(errors[e.value] && touched[e.value])}
                          helperText={
                            errors[e.value] && touched[e.value]
                              ? errors[e.value]
                              : ""
                          }
                        >
                          {e?.data?.map((option) => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </Field>
                      ) : (
                        <TextInput
                          key={i}
                          label={e.name}
                          name={e.value}
                          value={values[e.value]}
                          required
                          // className='w-[48%]'

                          onChange={handleChange(e.value)}
                          variant="outlined"
                          error={Boolean(errors[e.value] && touched[e.value])}
                          helperText={
                            errors[e.value] && touched[e.value]
                              ? errors[e.value]
                              : ""
                          }
                          sx={{ mb: 2 }}
                        />
                      )}
                    </>
                  ))}
                  <Grid className="gap-5 flex mb-2 mt-32">
                    <Grid>
                      <CustomButton onClick={handleClose}>Cancel</CustomButton>
                    </Grid>
                    <Grid>
                      <CustomButton onClick={handleSubmit}>Submit</CustomButton>
                    </Grid>
                  </Grid>
                </>
              )}
            </Formik>
          </Grid>
        </Grid>
      </SimpleModal>
    </>
  );
};

export default AddServiceModal;

import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
} from "@mui/material";
import { Close } from "mdi-material-ui";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomButton from "@/components/CommonButton/CustomButton";
import TextInput from "@/components/TextInput";
import SimpleModal from "@/components/Modal/SimpleModal";
import { AddSchool } from "@/services/School";

export const AddServiceModal = ({ open, onClose }) => {
  const lazy_array = [
    { name: "School Name", value: "school_name" },
    { name: "School Address", value: "address" },
    { name: "Contact Person Name", value: "contact_person" },
    { name: "School Affiliation Code", value: "affiliation_code" },
    { name: "School Website", value: "website" },
    { name: "Designation", value: "designation" },
    { name: "Enrollment Id", value: "enrollment_id" },
    { name: "Phone No", value: "phone_no" },
    { name: "Email Id", value: "email_id" },
    { name: "Password", value: "password" },
  ];
  //   const { phone_number: prefillPhone_number, email: prefillEMail } =
  //     route.params;

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
  });

  const handleSubmit = async (values, event) => {
    const payload = {
      email: values?.email_id,
      address: values?.address,
      affiliation_code: values?.affiliation_code,
      website: values?.website,
      designation: values?.designation,
      phone: values?.phone_no,
      password: values?.password,
      contact_person_name: values?.contact_person_name
    };
  
    try {
      const resp = await AddSchool(payload);
      console.log(resp);
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
  
    console.log(values, "--values");
    event.setSubmitting(false);
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
        <Grid className=" lg:w-[800px] w-[400px] h-[100%]">
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
            <Grid
              onClick={handleClose}
              className="absolute  right-4 cursor-pointer font-bold top-3"
            >
              <Close />
            </Grid>
          </Grid>
          <Grid container gap={2} mt={3} justifyContent={"center"}>
            <Formik
              initialValues={{
                school_name: "",
                address: "",
                affiliation_code: "",
                website: "",
                designation: "",
                contact_person: "",
                enrollment_id: "",
                phone_no: "",
                email_id: "",
                password: "",
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
                  {lazy_array.map((e, i) => {
                    return (
                      <TextInput
                        key={i}
                        label={[e.name]}
                        value={values[e.value]}
                        required={true}
                        onChange={handleChange(e.value)}
                        variant="outlined"
                        error={errors[e.value] && touched[e.value]}
                        errorName={errors[e.value]}
                        sx={5.8}
                        gap={2}
                      />
                    );
                  })}
                  <Grid className=" gap-5 flex mb-2 mt-10">
                    <Grid>
                      <CustomButton
                        onClick={handleClose}
                       
                      >
                        Cancel
                      </CustomButton>
                    </Grid>
                    <Grid>
                      <CustomButton onClick={handleSubmit} >
                        Submit
                      </CustomButton>
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

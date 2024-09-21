import React from "react";
import { SelectField, TextFieldComponent } from "@/components/FormikComponent";
import Config from "@/utilities/Config";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import SubmitButton from "@/components/CommonButton/SubmitButton";

// Reusable Form Field Component
const FormField = ({ field, errors, touched }) => (
  <Box className="lg:w-[49%] w-[100%]">
    <Field
      name={field.name}
      label={field.label}
      component={field.component}
      options={field.options}
      disabled={field.disabled}
    />
    {/* {errors[field.name] && touched[field.name] ? (
      <Typography color="error" variant="caption">
        {errors[field.name]}
      </Typography>
    ) : null} */}
  </Box>
);

const SchoolBasicInfo = () => {
  const data = "";
  const fields = [
    { id: "school_name", label: "School Name", name: "school_name", component: TextFieldComponent },
    { id: "abbervation", label: "School Abbreviation", name: "abbervation", component: TextFieldComponent },
    { id: "registration_no", label: "Registration No", name: "registration_no", component: TextFieldComponent },
    { id: "borad", label: "Board", name: "borad", component: SelectField, options: Config.Boards },
    { id: "school_code", label: "School Code", name: "school_code", component: TextFieldComponent },
    { id: "pf_code", label: "PF Code", name: "pf_code", component: TextFieldComponent },
    { id: "society_name", label: "Society Name", name: "society_name", component: TextFieldComponent },
    { id: "preferred_language", label: "Preferred Language", name: "preferred_language", component: TextFieldComponent },
  ];

  // Example: Website Section
  const website = [
    { id: "website", label: "Website", name: "website", component: TextFieldComponent },
    { id: "sub_domain", label: "Sub Domain", name: "sub_domain", component: TextFieldComponent },
  ];

  const addressData = [
    { id: "address", label: "Address", name: "address", component: TextFieldComponent },
    { id: "country", label: "Country", name: "country", component: SelectField, options: Config.CountryDta },
    { id: "state", label: "State", name: "state", component: SelectField, options: Config.CountryDta },
    { id: "city", label: "City", name: "city", component: SelectField, options: Config.CountryDta },
    { id: "pincode", label: "Pin Code", name: "pincode", component: TextFieldComponent },
    { id: "phone", label: "Phone No", name: "phone", component: TextFieldComponent },
  ];

  const contactData = [
    { id: "contact_name", label: "Contact Name", name: "contact_name", component: TextFieldComponent },
    { id: "contact_email", label: "Contact Email", name: "contact_email", component: TextFieldComponent },
    { id: "contact_no", label: "Contact No", name: "contact_no", component: TextFieldComponent },
  ];

  const AdminData = [
    { id: "first_name", label: "First Name", name: "first_name", component: TextFieldComponent },
    { id: "last_name", label: "Last Name", name: "last_name", component: TextFieldComponent },
    { id: "mobile_no", label: "Mobile No", name: "mobile_no", component: TextFieldComponent },
    { id: "email", label: "Email", name: "email", component: TextFieldComponent },
  ];

  // Initial Values for Formik
  const initialValues = {
    school_name: data?.school_name || "",
    abbervation: data?.abbervation || "",
    registration_no: data?.registration_no || "",
    borad: data?.borad || "",
    school_code: data?.school_code || "",
    pf_code: data?.pf_code || "",
    society_name: data?.society_name || "",
    preferred_language: data?.preferred_language || "",
    website: data?.website || "",
    sub_domain: data?.sub_domain || "",
    address: data?.address || "",
    country: data?.country || "",
    state: data?.state || "",
    city: data?.city || "",
    pincode: data?.pincode || "",
    phone: data?.phone || "",
    contact_name: data?.contact_name || "",
    contact_email: data?.contact_email || "",
    contact_no: data?.contact_no || "",
    first_name: data?.admin?.first_name || "",
    last_name: data?.admin?.last_name || "",
    mobile_no: data?.admin?.mobile_no || "",
    email: data?.admin?.email || "",
  };

  // Validation Schema
  const validationSchema = Yup.object({
    school_name: Yup.string().required("School Name is required"),
    abbervation: Yup.string().required("School Abbreviation is required"),
    registration_no: Yup.string().required("Registration No is required"),
    borad: Yup.string().required("Board is required"),
    school_code: Yup.string().required("School Code is required"),
    pf_code: Yup.string().required("PF Code is required"),
    society_name: Yup.string().required("Society Name is required"),
    preferred_language: Yup.string().required("Preferred Language is required"),
    website: Yup.string().url("Invalid website URL"),
    sub_domain: Yup.string().required("Sub Domain is required"),
    address: Yup.string().required("Address is required"),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    city: Yup.string().required("City is required"),
    pincode: Yup.string().required("Pin Code is required"),
    phone: Yup.string().required("Phone No is required"),
    contact_name: Yup.string().required("Contact Name is required"),
    contact_email: Yup.string().email("Invalid email").required("Contact Email is required"),
    contact_no: Yup.string().required("Contact No is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    mobile_no: Yup.string().required("Mobile No is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (values, actions) => {
    console.log(values, "--values");
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form>
            {/* School Basic Info Section */}
            <Box className="border p-4 rounded-lg mt-4">
              <Typography variant="h5" style={{ fontSize: "17px" }}>
                School Basic Info
              </Typography>
              <Box className="flex w-[100%] flex-wrap gap-2">
                {fields.map((field) => (
                  <FormField key={field.id} field={field} errors={errors} touched={touched} />
                ))}
              </Box>
            </Box>

            {/* Website Section */}
            <Box className="border p-4 rounded-lg mt-4">
              <Typography variant="h5" style={{ fontSize: "17px" }}>
                Website
              </Typography>
              <Box className="flex w-[100%] flex-wrap gap-2">
                {website.map((field) => (
                  <FormField key={field.id} field={field} errors={errors} touched={touched} />
                ))}
              </Box>
            </Box>

            {/* Address Section */}
            <Box className="border p-4 rounded-lg mt-4">
              <Typography variant="h5" style={{ fontSize: "17px" }}>
                Address
              </Typography>
              <Box className="flex w-[100%] flex-wrap gap-2">
                {addressData.map((field) => (
                  <FormField key={field.id} field={field} errors={errors} touched={touched} />
                ))}
              </Box>
            </Box>

            {/* Contact Section */}
            <Box className="border p-4 rounded-lg mt-4">
              <Typography variant="h5" style={{ fontSize: "17px" }}>
                Contact
              </Typography>
              <Box className="flex w-[100%] flex-wrap gap-2">
                {contactData.map((field) => (
                  <FormField key={field.id} field={field} errors={errors} touched={touched} />
                ))}
              </Box>
            </Box>

            {/* Admin Section */}
            <Box className="border p-4 rounded-lg mt-4">
              <Typography variant="h5" style={{ fontSize: "17px" }}>
                Admin User
              </Typography>
              <Box className="flex w-[100%] flex-wrap gap-2">
                {AdminData.map((field) => (
                  <FormField key={field.id} field={field} errors={errors} touched={touched} />
                ))}
              </Box>
            </Box>

            {/* Submit Button */}
            <div className="flex justify-end my-5">
              <SubmitButton type="submit" variant="contained" color="primary">
                Submit
              </SubmitButton>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SchoolBasicInfo;

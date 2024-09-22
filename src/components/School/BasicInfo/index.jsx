'use client'
import React, { useEffect, useState } from "react";
import { SelectField, TextFieldComponent } from "@/components/FormikComponent";
import Config from "@/utilities/Config";
import {  Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import SubmitButton from "@/components/CommonButton/SubmitButton";
import { cityData, StateData } from "@/services/api";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { AddSchool, updateSchool } from "@/services/School";

// Reusable Form Field Component
const FormField = ({ field, errors, touched, handleChange }) => (
  <Box className="lg:w-[49%] w-[100%]">
    <Field
      name={field.name}
      label={field.label}
      component={field.component}
      options={field.options}
      disabled={field.disabled}
      onChange={(event) => handleChange(event, field.name)}
    />
    {/* {errors[field.name] && touched[field.name] && (
      <Typography color="error" variant="caption">
        {errors[field.name]}
      </Typography>
    )} */}
  </Box>
);

const SchoolBasicInfo = ({data}) => {
  // const data = {_id:'66ef307da3b72c522fbb1cfe'};

  const [state, setState] = useState(data?.state || "");

  // Fetch state data
  const { data: allState, refetch: refetchStates } = useQuery(
    "StateData",
    async () => {
      const res = await StateData();
      return res?.data;
    }
  );

  // Fetch city data based on selected state
  const { data: allCity, refetch: refetchCities } = useQuery(
    "cityData",
    async () => {
      if (state) {
        const res = await cityData({ state });
        return res?.data;
      }
    },
    { enabled: !!state }
  );

  // Refetch cities when state changes
  useEffect(() => {
    if (state) refetchCities();
  }, [state, refetchCities]);

  const fields = [
    {
      id: "school_name",
      label: "School Name",
      name: "school_name",
      component: TextFieldComponent,
    },
    {
      id: "abbervation",
      label: "School Abbreviation",
      name: "abbervation",
      component: TextFieldComponent,
    },
    {
      id: "registration_no",
      label: "Registration No",
      name: "registration_no",
      component: TextFieldComponent,
    },
    {
      id: "borad",
      label: "Board",
      name: "borad",
      component: SelectField,
      options: Config.Boards,
    },
    {
      id: "school_code",
      label: "School Code",
      name: "school_code",
      component: TextFieldComponent,
    },
    {
      id: "pf_code",
      label: "PF Code",
      name: "pf_code",
      component: TextFieldComponent,
    },
    {
      id: "society_name",
      label: "Society Name",
      name: "society_name",
      component: TextFieldComponent,
    },
    {
      id: "preferred_language",
      label: "Preferred Language",
      name: "preferred_language",
      component: TextFieldComponent,
    },
  ];

  const websiteFields = [
    {
      id: "website",
      label: "Website",
      name: "website",
      component: TextFieldComponent,
    },
    {
      id: "sub_domain",
      label: "Sub Domain",
      name: "sub_domain",
      component: TextFieldComponent,
    },
  ];

  const addressFields = [
    {
      id: "address",
      label: "Address",
      name: "address",
      component: TextFieldComponent,
    },
    {
      id: "country",
      label: "Country",
      name: "country",
      component: SelectField,
      options: Config.CountryDta,
    },
    {
      id: "state",
      label: "State",
      name: "state",
      component: SelectField,
      options: allState,
    },
    {
      id: "city",
      label: "City",
      name: "city",
      component: SelectField,
      options: allCity,
    },
    {
      id: "pincode",
      label: "Pin Code",
      name: "pincode",
      component: TextFieldComponent,
    },
    {
      id: "phone",
      label: "Phone No",
      name: "phone",
      component: TextFieldComponent,
    },
  ];

  const contactFields = [
    {
      id: "contact_name",
      label: "Contact Name",
      name: "contact_name",
      component: TextFieldComponent,
    },
    {
      id: "contact_email",
      label: "Contact Email",
      name: "contact_email",
      component: TextFieldComponent,
    },
    {
      id: "contact_no",
      label: "Contact No",
      name: "contact_no",
      component: TextFieldComponent,
    },
  ];

  const adminFields = [
    {
      id: "first_name",
      label: "First Name",
      name: "first_name",
      component: TextFieldComponent,
    },
    {
      id: "last_name",
      label: "Last Name",
      name: "last_name",
      component: TextFieldComponent,
    },
    {
      id: "mobile_no",
      label: "Mobile No",
      name: "mobile_no",
      component: TextFieldComponent,
    },
    {
      id: "email",
      label: "Email",
      name: "email",
      component: TextFieldComponent,
    },
  ];

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
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    mobile_no: data?.mobile_no || "",
    email: data?.email || "",
  };

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
    contact_email: Yup.string()
      .email("Invalid email")
      .required("Contact Email is required"),
    contact_no: Yup.string().required("Contact No is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    mobile_no: Yup.string().required("Mobile No is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleChange = (event, setFieldValue, fieldName) => {
    const { value } = event.target;
    if (fieldName === "state") setState(value);
    setFieldValue(fieldName, value);
  };

  const handleSubmit = async (values) => {
    const payload = values;
    if(data){
      payload.id=data?._id
    }
    console.log(payload);
    try {
      if (data) {
        const resp = await updateSchool(payload);
      toast.success("Successfully Updated");

      } else {
        const resp = await AddSchool(payload);
      toast.success("Successfully Added");

      }
      // onClose();
      console.log(resp);
    } catch (error) {
      console.error(error);
      // Handle error appropriately
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, setFieldValue }) => (
          <Form>
            {/* Reusable form sections */}
            {[
              { title: "School Basic Info", fields },
              { title: "Website", fields: websiteFields },
              { title: "Address", fields: addressFields },
              { title: "Contact", fields: contactFields },
              { title: "Admin User", fields: adminFields },
            ].map((section, index) => (
              <Box key={index} className="border p-4 rounded-lg mt-4">
                <Typography variant="h5" style={{ fontSize: "17px" }}>
                  {section.title}
                </Typography>
                <Box className="flex w-[100%] flex-wrap gap-2">
                  {section.fields.map((field) => (
                    <FormField
                      key={field.id}
                      field={field}
                      errors={errors}
                      touched={touched}
                      handleChange={(event) =>
                        handleChange(event, setFieldValue, field.name)
                      }
                    />
                  ))}
                </Box>
              </Box>
            ))}

            <Box className="flex justify-end p-4">
              <SubmitButton />
            </Box>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SchoolBasicInfo;

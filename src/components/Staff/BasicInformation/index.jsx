import SubmitButton from "@/components/CommonButton/SubmitButton";
import {
  DatePickerField,
  SelectField,
  TextFieldComponent,
} from "@/components/FormikComponent";
import {
  AddStaffDetails,
  cityData,
  getStallById,
  StateData,
  UpdateStaffDetails,
} from "@/services/api";
import Config from "@/utilities/Config";
import { Button, FormControl, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";

const BasicInformation = ({ setSlectedTab ,data}) => {
  const router = useRouter();
  const id = router?.query?.id;

  const defaultValues = {
    employee_code: "",
    file_no: "",
    gender: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    date_of_birth: "",
    nationality: "",
    appointment_date: dayjs(),
    joining_date: dayjs(),
    father_name: "",
    mother_name: "",
    father_occupation: "",
    mother_tongue: "",
    religion: "",
    social_category: "",
    marital_status: "",
    blood_group: "",
    adhar_card_no: "",
    caste: "",
    place_of_birth: "",
    weight: "",
    height: "",
    mobile_no: "",
    wedding_date: dayjs(),
    qualification_for_printing: "",
    email_id: "",
    class: "",
    section: "",
    reporting_person: "",
    rejoin_reason: "",

  };
  const initialValues = data
    ? {
        ...defaultValues,
        employee_code: data?.employee_code || "",
        file_no: data?.file_no || "",
        gender: data?.gender || "",
        first_name: data?.first_name || "",
        last_name: data?.last_name || "",
        middle_name: data?.middle_name || "",
        date_of_birth: data?.date_of_birth || "",
        nationality: data?.nationality || "",
        appointment_date: data?.appointment_date
          ? dayjs(data.appointment_date)
          : dayjs(),
        joining_date: data?.joining_date ? dayjs(data.joining_date) : dayjs(),
        father_name: data?.father_name || "",
        mother_name: data?.mother_name || "",
        father_occupation: data?.father_occupation || "",
        mother_tongue: data?.mother_tongue || "",
        religion: data?.religion || "",
        social_category: data?.social_category || "",
        marital_status: data?.marital_status || "",
        blood_group: data?.blood_group || "",
        adhar_card_no: data?.adhar_card_no || "",
        caste: data?.caste || "",
        place_of_birth: data?.place_of_birth || "",
        weight: data?.weight || "",
        height: data?.height || "",
        mobile_no: data?.mobile_no || "",
        wedding_date: data?.wedding_date ? dayjs(data.wedding_date) : dayjs(),
        qualification_for_printing: data?.qualification_for_printing || "",
        email_id: data?.email_id || "",
        class: data?.class || "",
        section: data?.section || "",
        reporting_person: data?.reporting_person || "",
        rejoin_reason: data?.rejoin_reason || "",

      }
    : defaultValues;

  // const data = "";
  // const initialValues = {

  // };

  const validationSchema = Yup.object({
    employee_code: Yup.string().required("Employee Code is required"),
    file_no: Yup.string().required("File No is required"),
    gender: Yup.string().required("Gender is required"),
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    middle_name: Yup.string(),
    date_of_birth: Yup.date().required("Date of Birth is required"),
    nationality: Yup.string().required("Nationality is required"),
    appointment_date: Yup.date().required("Appointment Date is required"),
    joining_date: Yup.date().required("Joining Date is required"),
    father_name: Yup.string(),
    mother_name: Yup.string(),
    father_occupation: Yup.string(),
    mother_tongue: Yup.string(),
    religion: Yup.string(),
    social_category: Yup.string(),
    marital_status: Yup.string().required("Marital Status is required"),
    blood_group: Yup.string(),
    adhar_card_no: Yup.string(),
    caste: Yup.string(),
    place_of_birth: Yup.string().required("Place of Birth is required"),
    weight: Yup.number(),
    height: Yup.number(),
    mobile_no: Yup.string().required("Mobile No is required"),
    wedding_date: Yup.date(),
    qualification_for_printing: Yup.string(),
    email_id: Yup.string().email("Invalid Email").required("Email is required"),
    class: Yup.string().required("Class is required"),
    section: Yup.string().required("Section is required"),
    reporting_person: Yup.string(),
    rejoin_reason: Yup.string(),
    present_address: Yup.string(),
    present_country: Yup.string(),
    present_state: Yup.string(),
    present_city: Yup.string(),
    present_pincode: Yup.string(),
    present_number: Yup.string(),
    permanent_address: Yup.string(),
    permanent_country: Yup.string(),
    permanent_state: Yup.string(),
    permanent_city: Yup.string(),
    permanent_pincode: Yup.string(),
    permanent_number: Yup.string(),
  });

  const fields = [
    {
      id: "employee_code",
      label: "Employee Code",
      name: "employee_code",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "file_no",
      label: "File No",
      name: "file_no",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "gender",
      label: "Gender",
      name: "gender",
      component: SelectField,
      options: Config.genders,
    },

    {
      id: "first_name",
      label: "First Name",
      name: "first_name",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "middle_name",
      label: "Middle Name",
      name: "middle_name",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "last_name",
      label: "Last Name",
      name: "last_name",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "date_of_birth",
      label: "Date of birth",
      name: "date_of_birth",
      component: DatePickerField,
    },

    {
      id: "nationality",
      label: "Nationality",
      name: "nationality",
      component: SelectField,
      options: Config.Nationalities,
    },
    {
      id: "appointment_date",
      label: "Appointment Date",
      name: "appointment_date",
      component: DatePickerField,
    },
    {
      id: "joining_date",
      label: "Joining Date",
      name: "joining_date",
      component: DatePickerField,
    },
    {
      id: "father_name",
      label: "Father Name",
      name: "father_name",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "mother_name",
      label: "Mother Name",
      name: "mother_name",
      // disabled: true,
      component: TextFieldComponent,
    },

    {
      id: "father_occupation",
      label: "Father Occupation",
      name: "father_occupation",
      component: SelectField,
      options: Config.occupations,
    },
    {
      id: "mother_tongue",
      label: "Mother Tounge",
      name: "mother_tongue",
      component: SelectField,
      options: Config.MotherTongues,
    },
    {
      id: "religion",
      label: "Religion",
      name: "religion",
      component: SelectField,
      options: Config.IndianReligions,
    },
    {
      id: "social_category",
      label: "Social Category",
      name: "social_category",
      component: SelectField,
      options: Config.SocialCategories,
    },
    {
      id: "marital_status",
      label: "Marital Status",
      name: "marital_status",
      component: SelectField,
      options: Config.MaritalStatus,
    },
    {
      id: "blood_group",
      label: "Blood Group",
      name: "blood_group",
      component: SelectField,
      options: Config.BloodGroups,
    },
    {
      id: "adhar_card_no",
      label: "Adhar Card No",
      name: "adhar_card_no",
      // disabled: true,
      component: TextFieldComponent,
    },

    {
      id: "caste",
      label: "caste",
      name: "caste",
      component: SelectField,
      options: Config.AllCastes,
    },
    {
      id: "place_of_birth",
      label: "Place Of Birth",
      name: "place_of_birth",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "weight",
      label: "Weight",
      name: "weight",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "height",
      label: "Height",
      name: "height",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "mobile_no",
      label: "Mobile No",
      name: "mobile_no",
      // disabled: true,
      component: TextFieldComponent,
    },

    {
      id: "wedding_date",
      label: "Wedding Date",
      name: "wedding_date",
      component: DatePickerField,
    },
    {
      id: "qualification_for_printing",
      label: "Qualification For Printing",
      name: "qualification_for_printing",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "email_id",
      label: "Email Id",
      name: "email_id",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "class",
      label: "Class",
      name: "class",
      component: SelectField,
      options: Config.ClassList,
    },
    {
      id: "section",
      label: "Section",
      name: "section",
      component: SelectField,
      options: Config.SectionList,
    },
    {
      id: "reporting_person",
      label: "Reporting Person",
      name: "reporting_person",
      component: SelectField,
      options: Config.SectionList,
    },
    {
      id: "rejoin_reason",
      label: "Rejoin Reason",
      name: "rejoin_reason",
      // disabled: true,
      component: TextFieldComponent,
    },
  ];


  const handleSubmit = async (values, actions) => {
    console.log(values, "----values");
    const payload = {
      ...values,
      id: id,
    };
    console.log(payload, "payload");

    try {
      if (!id) {
        const resp = await AddStaffDetails(payload);
        console.log(resp, "resp");
        if (resp?.success) {
          toast.success("Staff Added successfully");
          actions.resetForm();
          setSlectedTab(2);
          router.replace(`/staff/add-staff/?id=${resp?.data?._id}`);
        }
      } else {
        const resp = await UpdateStaffDetails(payload);
        if (resp?.success) {
          toast.success("Staff Updated successfully");
          actions.resetForm();
          setSlectedTab(2);
          router.replace(`/staff/add-staff/?id=${resp?.data?._id}`);
        }
      }
    } catch (error) {
      toast.error("Failed to add Saff");
    }
  };


  return (
    <>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setValues }) => (
          <Form>
            <Box className="flex w-[100%] flex-wrap justify-between mt-7">
              {fields.map((field) => (
                <Box key={field.id} className="lg:w-[32.5%]  w-[100%]">
                  <Field
                    name={field.name}
                    label={field.label}
                    component={field.component}
                    options={field.options}
                    disabled={field.disabled}
                    values={values}
                  />
                </Box>
              ))}
            </Box>
            <div className="flex justify-end my-5">
              <SubmitButton type="submit" variant="contained" color="primary">
                {id ? "Update" : " Submit"}
              </SubmitButton>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default BasicInformation;

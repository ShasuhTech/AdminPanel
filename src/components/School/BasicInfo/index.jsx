import React from "react";
import {
  SelectField,
  TextFieldComponent,
} from "@/components/FormikComponent";
import Config from "@/utilities/Config";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";

const SchoolBasicInfo = () => {
  const data = "";
  const fields = [
    {
      id: "school_name",
      label: "School Name",
      name: "school_name",
      component: TextFieldComponent,
    },
    {
      id: "abbervation",
      label: "School Abbervation",
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
      options: Config.CountryDta,
    },
    {
      id: "city",
      label: "City",
      name: "city",
      component: SelectField,
      options: Config.CountryDta,
    },
    {
      id: "pincode",
      label: "PinCode",
      name: "pincode",
      component: TextFieldComponent,
    },
    {
      id: "phone",
      label: "Phone No",
      name: "phone",
      component: TextFieldComponent,
    },
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
    {
      id: "phone",
      label: "Phone No",
      name: "phone",
      component: TextFieldComponent,
    },
    {
      id: "phone",
      label: "Phone No",
      name: "phone",
      component: TextFieldComponent,
    },
  ];

  const AdminData = [
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
  const SlectedRow = "";
  const initialValues = {
    enquiry_no: data?.enquiry_id || "",
    firstName: data?.name?.first_name || "",
    lastName: data?.name?.last_name || "",
    middleName: data?.name?.middle_name || "",
    followUpdate: dayjs(SlectedRow?.follow_up_date) || dayjs(new Date()),
    nextfollowUpdate:
      dayjs(SlectedRow?.next_follow_up_date) || dayjs(new Date()),
    modeOfFollowup: SlectedRow?.follow_up_mode || "",
    followUp: SlectedRow?.follow_ups || "",
    remarks: SlectedRow?.remarks || "",
  };

  const validationSchema = Yup.object({
    followUpdate: Yup.date().required("Required"),
    nextfollowUpdate: Yup.date().required("Required"),
    modeOfFollowup: Yup.string().required("Required"),
    followUp: Yup.string().required("Required"),
    remarks: Yup.string().required("Required"),
  });

  const handleSubmit = async (values, actions) => {
    const payload = {
      student_id: data?._id,
      next_follow_up_date: dayjs(values.nextfollowUpdate),
      follow_ups: values.followUp,
      remarks: values.remarks,
      follow_up_mode: values.modeOfFollowup,
      follow_up_date: dayjs(values.followUpdate),
      enquiry_id: data.enquiry_id,
    };
    console.log(payload, "--payload");
    // try {
    //   if (!SlectedRow) {
    //     const resp = await AddFollowup(payload);
    //     if (resp?.success) {
    //       toast.success("FollowUp Added successfully");
    //       actions.resetForm();
    //       studentRefetch();
    //     }
    //   } else {
    //     const resp = await updateFollowup(payload);
    //     if (resp?.success) {
    //       toast.success("FollowUp Updated successfully");
    //       actions.resetForm();
    //       studentRefetch();
    //     }
    //   }
    // } catch (error) {
    //   toast.error("Failed to add FollowUp");
    // }
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setValues }) => (
          <Form>
            <Box className="flex w-[100%] flex-wrap gap-2">
              {fields.map((field) => (
                <Box key={field.id} className="lg:w-[32.5%] gap-2 w-[100%]">
                  <Field
                    name={field.name}
                    label={field.label}
                    component={field.component}
                    options={field.options}
                    disabled={field.disabled}
                  />
                </Box>
              ))}
            </Box>
            <Box className="border p-4 rounded-lg mt-4">
              <Typography variant="h5" style={{ fontSize: "17px" }}>
                Admin User
              </Typography>
              <Box className="flex w-[100%] flex-wrap gap-2">
                {AdminData.map((field) => (
                  <Box key={field.id} className="lg:w-[49%] gap-2 w-[100%]">
                    <Field
                      name={field.name}
                      label={field.label}
                      component={field.component}
                      options={field.options}
                      disabled={field.disabled}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
            <div className="flex justify-end my-5">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SchoolBasicInfo;

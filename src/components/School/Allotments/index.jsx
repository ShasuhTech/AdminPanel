'use client'

import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Box } from "@mui/system";
import SubmitButton from "@/components/CommonButton/SubmitButton";
import { AddSchool, updateSchool } from "@/services/School";
import { toast } from "react-toastify";

const SchoolAllotments = ({ data }) => {
  // const data = { _id: "66ef307da3b72c522fbb1cfe" };

  const optionsGroups = {
    Academic_cms: [
      "Homework Report",
      "Tutorials",
      "Homework",
      "Assignment",
      "Time Table",
      "Syllabus",
      "Question Bank",
      "Date sheet",
      "Annual Plan",
      "Annual Calender",
    ],
    admission: [
      "Student Promotion",
      "Student Activity",
      "Roll No Allotment",
      "Student Image Import",
      "Student Field Wise Modification",
      "Student Excel Import",
      "Student Official Multi",
      "Student Report",
      "Student Information",
      "Certification Slc",
      "Student Subject",
    ],
    fee: [
      "Fee Refund",
      "Online Fee Payment",
      "Student Fee Report",
      "Student Fee Account",
      "Fine",
      "Cheque Bounce",
      "Student Concession",
      "Fee Certificate",
      "Student Fee Component Structure",
      "Manage Fee Concession",
      "Student Fee Collection",
    ],
    lesson_planing: [
      "Teacher Diary",
      "lesson Planing Reports",
      "Lesson Creation",
      "Teacher Mapping",
      "Time Entry",
    ],
    library: [
      "Library Reports",
      "Library Settings",
      "Library New Entry",
      "Library Activities",
      "Library Stock",
      "Library Search Engine",
      "Library Pass",
    ],
    payroll: [
      "Payroll settings",
      "Payroll Employee Info",
      "Payroll Salary Change",
      "Payroll field wise Modification",
      "Payroll Projected Salary",
      "Payroll Payment Info",
      "Payroll Salary Generation",
      "Payroll Salary Arrear",
      "Payroll Hourly Pay",
      "Payroll Reports",
    ],
    recruitment: ["Create Job Post", "Application Reports"],
    registration: [
      "Registration Criteria",
      "Registration Rules",
      "Registration Fee",
      "Registration Batch",
      "Registration Instruction",
      "Registration Selection",
      "Registration Form",
      "Registration Reports",
    ],
    result: [
      "Promotion And Demotion",
      "Board Roll No",
      "Remark Info",
      "Result Report",
      "Evaluation Sheet",
      "CBSE Result Procession",
      "Result Configuration",
      "Result Settings",
      "Freeze Unfreeze Terms",
      "Mark Sheet Final Setting",
      "Process Final Result",
      "Remark Entry",
      "Terms and Subject Marks Setting",
      "Remarks Field",
      "Subject Description Indicators",
      "Result Visibility",
      "Marks Entry",
      "Exam Date Sheet",
    ],
    school_setup: [
      "Template Library",
      "Holiday Calendar",
      "Houses",
      "Subject",
      "Academic Session",
      "Admission Number Formate",
      "Vendor Management",
      "Mange Department",
      "Class and Section",
      "Other Setting",
      "Group",
      "Manage Designation",
      "Config",
      "Hostel And Room",
      "Transport",
      "Bank And Branches",
      "Class Section Subject Mapping",
      "Leave Remark",
    ],
    sms: [
      "Student Whatsapp Message",
      "Attendance Sms",
      "Student Fee Sms",
      "Student General Sms",
      "Sms Logs",
      "Employee Leaves Sms",
      "Student Library Sms",
      "Group Sms",
      "Enquiry Sms",
      "Employee Salary Sms",
      "Result Sms",
      "Registration Sms",
      "Employee General Sms",
      "Group Import",
      "Employee Library Sms",
      "Student Transport Sms",
      "Employee Increment Sms",
      "General Group Sms",
      "Sms Template",
      "Excel Import Sms",
      "Employee Arrear And Bonus Sms",
      "Employee Income Tax Sms",
      "Student Sms",
      "Student General Notification",
      "Notification Log",
      "Attendance Notifications",
      "Student Fee Notifications",
      "Student Transport Notifications",
    ],
    staff_Attendance: [
      "Attendance",
      "Assign Holiday",
      "Attendance Log",
      "Shift Setting",
      "Department Shift Assignment",
      "Employee Shift Allotment",
      "Leave Type",
      "Leave Name",
      "Leave Structure",
      "Remark Configuration",
      "Red Mark Allotment",
      "Red Mark Report",
      "Advance Leave",
      "Financial Session",
      "Attendance Regularization",
      "Employee Attendance Consolidated Report",
      "Work From Home Request",
      "Geo Fence Location",
      "Geo Fence Location Allotment",
      "Leave Summary Report",
      "Monthly Attendance Summary Report",
      "Machine Id Allotment",
      "Employee Details",
    ],
    student_attendance: [
      "Student Attendance Report",
      "Student Attendance And Leave",
      "Smart Card Student Attendance",
    ],
    user: ["User Log", "User Info", "User Permission", "User"],
    visitor_management: [
      "Visitor Management Settings",
      "Schedule Meeting",
      "Time Tracking",
      "Bulk Visit",
      "Visitors Enquiry",
      "Unschedule Meeting",
    ],
    web_cms: [
      "Circular",
      "Publication",
      "Media Press",
      "Award And Achievement",
      "Thought Of The Day",
      "Slider",
      "News",
      "Video Gallery",
      "Bulletin Board",
      "Category",
      "Event",
      "Gallery",
    ],
    web_manager: ["Web Page", "Page Section", "Media Asset", "Menu Manager"],
  };

  const getInitialValues = () => {
    const initialValues = {};
    Object.keys(optionsGroups).forEach((groupKey) => {
      initialValues[`selected${capitalize(groupKey)}`] = [];
      initialValues[`selectAll${capitalize(groupKey)}`] = false;
    });
    return initialValues;
  };

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const [initialValues, setInitialValues] = useState(getInitialValues);
  const [loading, setLoading] = useState(true);

  // Dynamically set Yup validation schema
  const getValidationSchema = () => {
    const validationSchema = {};
    Object.keys(optionsGroups).forEach((groupKey) => {
      validationSchema[`selected${capitalize(groupKey)}`] = Yup.array().min(
        1,
        `At least one ${groupKey} option must be selected`
      );
    });
    return Yup.object().shape(validationSchema);
  };

  // Fetch data for autofill
  useEffect(() => {
    const fetchFormData = async () => {
      try {

        const updatedInitialValues = getInitialValues();
        Object.keys(data).forEach((key) => {
          updatedInitialValues[key] = data[key] || [];
          updatedInitialValues[
            `selectAll${capitalize(key.replace("selected", ""))}`
          ] =
            data[key]?.length ===
            optionsGroups[key.replace("selected", "")]?.length;
        });

        setInitialValues(updatedInitialValues);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchFormData();
  }, [data]);

  // Handle select all toggle for any group
  const handleSelectAll = (
    values,
    setFieldValue,
    group,
    selectAllField,
    optionsField
  ) => {
    if (values[selectAllField]) {
      setFieldValue(optionsField, []);
      setFieldValue(selectAllField, false);
    } else {
      setFieldValue(optionsField, group);
      setFieldValue(selectAllField, true);
    }
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    const payload = values;
    if (data) {
      payload.id = data?._id;
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

  // Show loader while data is being fetched
  if (loading) {
    return <CircularProgress />;
  }

  return (
    <div className="h-[100%] overflow-scroll mb-10">
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        // validationSchema={getValidationSchema()}
        onSubmit={handleSubmit}
      >
        {({
          values,
          handleChange,
          handleSubmit,
          setFieldValue,
          errors,
          isSubmitting,
        }) => (
          <Form onSubmit={handleSubmit}>
            <FormGroup className="mt-10">
              {/* For each group of options */}
              {Object.keys(optionsGroups).map((groupKey) => (
                <div key={groupKey} style={{ marginBottom: "20px" }}>
                  <Box className="flex  items-center justify-between ">
                    <Typography variant="h6" fontWeight={"600"}>
                      {groupKey.replace("_", " ").toUpperCase()}
                    </Typography>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={
                            values[
                              `selectAll${
                                groupKey.charAt(0).toUpperCase() +
                                groupKey.slice(1)
                              }`
                            ]
                          }
                          onChange={() =>
                            handleSelectAll(
                              values,
                              setFieldValue,
                              optionsGroups[groupKey],
                              `selectAll${
                                groupKey.charAt(0).toUpperCase() +
                                groupKey.slice(1)
                              }`,
                              `selected${
                                groupKey.charAt(0).toUpperCase() +
                                groupKey.slice(1)
                              }`
                            )
                          }
                        />
                      }
                      label={`Select All`}
                    />
                  </Box>
                  <Box className="border  p-6 rounded-lg">
                    {optionsGroups[groupKey].map((option, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Field
                            type="checkbox"
                            name={`selected${
                              groupKey.charAt(0).toUpperCase() +
                              groupKey.slice(1)
                            }`}
                            value={option}
                            as={Checkbox}
                            checked={values[
                              `selected${
                                groupKey?.charAt(0)?.toUpperCase() +
                                groupKey?.slice(1)
                              }`
                            ]?.includes(option)}
                            onChange={handleChange}
                          />
                        }
                        label={option}
                      />
                    ))}
                  </Box>
                  {/* Display validation error for each group */}
                  {errors[
                    `selected${
                      groupKey.charAt(0).toUpperCase() + groupKey.slice(1)
                    }`
                  ] && (
                    <FormHelperText error>
                      {
                        errors[
                          `selected${
                            groupKey.charAt(0).toUpperCase() + groupKey.slice(1)
                          }`
                        ]
                      }
                    </FormHelperText>
                  )}
                </div>
              ))}

              {/* Submit button with loading state */}
              <Box className="justify-end  flex">
                <SubmitButton
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
                </SubmitButton>
              </Box>
            </FormGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SchoolAllotments;

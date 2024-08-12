import { UpdateStaffDetails } from "@/services/api";
import Config from "@/utilities/Config";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import {
  DatePickerField,
  SelectField,
  TextFieldComponent,
} from "@/components/FormikComponent";
import dayjs from "dayjs";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const OtherInformation = ({ data, staffRefetch, setSlectedTab }) => {
  const router = useRouter();
  const id = router?.query?.id;

  const defaultValues = {
    // Passport Details
    passport_no: "",
    passport_issue_place: "",
    passport_issue_date: null,
    passport_expiry_date: null,

    // Visa Details
    visa_no: "",
    visa_issue_place: "",
    visa_issue_date: null,
    visa_expiry_date: null,

    // Other Details
    honors: "",
    sports: "",
    dramatic: "",
    literacy: "",
    music: "",
    other: "",
    identification_marks: "",
    interview_board: "",
    observation_at_the_time_of_interview: "",
    any_other_relevent_information: "",

    // Spouse Details
    spouse_name: "",
    spouse_date_of_birth: null,
    spouse_mobile: "",
    spouse_qualification: "",
    spouse_employer_details: "",

    // Children Details
    children_name: "",
    children_gender: "",
    children_date_of_birth: null,
    children_mobile: "",
    children_institute_name: "",

    // Qualification Details
    qualification_name: "",
    qualification_passing_year: "",
    qualification_univercity: "",
    qualification_institution: "",
    qualification_percentage: "",
    qualification_medium: "",
    qualification_main_subject: "",

    // Specialized Details
    specialized_name_of_training: "",
    specialized_place_of_training: "",
    specialized_date_from: null,
    specialized_date_to: null,
    specialized_organized_by: "",
    specialized_resource_person: "",

    // Dependent Details
    dependent_name: "",
    dependent_relationship: "",
    dependent_date_of_birth: null,
    dependent_mobile: "",
    dependent_remark: "",

    // Pre Experience Details
    preExperience_organization_name: "",
    preExperience_date_from: null,
    preExperience_date_to: null,
    preExperience_designation_name: "",
    preExperience_job_description: "",
    preExperience_salary_drawn: "",
    preExperience_reason_for_leaving: "",

    // PF Nominee Details
    pf_nominee_nominee_name: "",
    pf_nominee_relationship: "",
    pf_nominee_date_of_birth: null,
    pf_nominee_percentage_of_share: "",

    // Reference Details
    reference_name: "",
    reference_designation_name: "",
    reference_address: "",
  };

  const initialValues = data
    ? {
        // Passport Details
        passport_no: data?.additionalDetails?.passport_no || "",
        passport_issue_place: data?.additionalDetails?.passport_issue_place || "",
        passport_issue_date: data?.additionalDetails?.passport_issue_date
          ? dayjs(data.passport_issue_date)
          : dayjs(new Date()),
        passport_expiry_date: data?.additionalDetails?.passport_expiry_date
          ? dayjs(data.passport_expiry_date)
          : dayjs(new Date()),

        // Visa Details
        visa_no: data?.additionalDetails?.visa_no || "",
        visa_issue_place: data?.additionalDetails?.visa_issue_place || "",
        visa_issue_date: data?.additionalDetails?.visa_issue_date
          ? dayjs(data.visa_issue_date)
          : dayjs(new Date()),
        visa_expiry_date: data?.additionalDetails?.visa_expiry_date
          ? dayjs(data.visa_expiry_date)
          : dayjs(new Date()),

        // Other Details
        honors: data?.additionalDetails?.honors || "",
        sports: data?.additionalDetails?.sports || "",
        dramatic: data?.additionalDetails?.dramatic || "",
        literacy: data?.additionalDetails?.literacy || "",
        music: data?.additionalDetails?.music || "",
        other: data?.additionalDetails?.other || "",
        identification_marks: data?.additionalDetails?.identification_marks || "",
        interview_board: data?.additionalDetails?.interview_board || "",
        observation_at_the_time_of_interview:
          data?.additionalDetails?.observation_at_the_time_of_interview || "",
        any_other_relevent_information:
          data?.additionalDetails?.any_other_relevent_information || "",

        // Spouse Details
        spouse_name: data?.additionalDetails?.spouse_name || "",
        spouse_date_of_birth: data?.additionalDetails?.spouse_date_of_birth
          ? dayjs(data.spouse_date_of_birth)
          : dayjs(new Date()),
        spouse_mobile: data?.additionalDetails?.spouse_mobile || "",
        spouse_qualification: data?.additionalDetails?.spouse_qualification || "",
        spouse_employer_details: data?.additionalDetails?.spouse_employer_details || "",

        // Children Details
        children_name: data?.additionalDetails?.children_name || "",
        children_gender:
          data?.additionalDetails?.children_gender ||
          ( ""),
        children_date_of_birth: data?.additionalDetails?.children_date_of_birth
          ? dayjs(data.children_date_of_birth)
          : dayjs(new Date()),
        children_mobile: data?.additionalDetails?.children_mobile || "",
        children_institute_name: data?.additionalDetails?.children_institute_name || "",

        // Qualification Details
        qualification_name:
          data?.additionalDetails?.qualification_name ||
          ( ""),
        qualification_passing_year:
          data?.additionalDetails?.qualification_passing_year || "",
        qualification_univercity:
          data?.additionalDetails?.qualification_univercity || "",
        qualification_institution:
          data?.additionalDetails?.qualification_institution || "",
        qualification_percentage:
          data?.additionalDetails?.qualification_percentage || "",
        qualification_medium:
          data?.additionalDetails?.qualification_medium ||
          ( ""),
        qualification_main_subject:
          data?.additionalDetails?.qualification_main_subject ||
          ( ""),

        // Specialized Details
        specialized_name_of_training:
          data?.additionalDetails?.specialized_name_of_training || "",
        specialized_place_of_training:
          data?.additionalDetails?.specialized_place_of_training || "",
        specialized_date_from: data?.additionalDetails?.specialized_date_from
          ? dayjs(data.specialized_date_from)
          : dayjs(new Date()),
        specialized_date_to: data?.additionalDetails?.specialized_date_to
          ? dayjs(data.specialized_date_to)
          : dayjs(new Date()),
        specialized_organized_by:
          data?.additionalDetails?.specialized_organized_by || "",
        specialized_resource_person:
          data?.additionalDetails?.specialized_resource_person || "",

        // Dependent Details
        dependent_name: data?.additionalDetails?.dependent_name || "",
        dependent_relationship: data?.additionalDetails?.dependent_relationship || "",
        dependent_date_of_birth: data?.additionalDetails?.dependent_date_of_birth
          ? dayjs(data.dependent_date_of_birth)
          : dayjs(new Date()),
        dependent_mobile: data?.additionalDetails?.dependent_mobile || "",
        dependent_remark: data?.additionalDetails?.dependent_remark || "",

        // Pre Experience Details
        preExperience_organization_name:
          data?.additionalDetails?.preExperience_organization_name || "",
        preExperience_date_from: data?.additionalDetails?.preExperience_date_from
          ? dayjs(data.preExperience_date_from)
          : dayjs(new Date()),
        preExperience_date_to: data?.additionalDetails?.preExperience_date_to
          ? dayjs(data.preExperience_date_to)
          : dayjs(new Date()),
        preExperience_designation_name:
          data?.additionalDetails?.preExperience_designation_name || "",
        preExperience_job_description:
          data?.additionalDetails?.preExperience_job_description || "",
        preExperience_salary_drawn:
          data?.additionalDetails?.preExperience_salary_drawn || "",
        preExperience_reason_for_leaving:
          data?.additionalDetails?.preExperience_reason_for_leaving || "",

        // PF Nominee Details
        pf_nominee_nominee_name: data?.additionalDetails?.pf_nominee_nominee_name || "",
        pf_nominee_relationship: data?.additionalDetails?.pf_nominee_relationship || "",
        pf_nominee_date_of_birth: data?.additionalDetails?.pf_nominee_date_of_birth
          ? dayjs(data.pf_nominee_date_of_birth)
          : dayjs(new Date()),
        pf_nominee_percentage_of_share:
          data?.additionalDetails?.pf_nominee_percentage_of_share || "",

        // Reference Details
        reference_name: data?.additionalDetails?.reference_name || "",
        reference_designation_name:
          data?.additionalDetails?.reference_designation_name || "",
        reference_address: data?.additionalDetails?.reference_address || "",
      }
    : defaultValues;

  const validationSchema = Yup.object({
    // Passport Details
    passport_no: Yup.string().required("Passport No is required"),
    passport_issue_place: Yup.string().required(
      "Passport Issue Place is required"
    ),
    passport_issue_date: Yup.date().required("Passport Issue Date is required"),
    passport_expiry_date: Yup.date().required(
      "Passport Expiry Date is required"
    ),

    // Visa Details
    visa_no: Yup.string().required("Visa No is required"),
    visa_issue_place: Yup.string().required("Visa Issue Place is required"),
    visa_issue_date: Yup.date().required("Visa Issue Date is required"),
    visa_expiry_date: Yup.date().required("Visa Expiry Date is required"),

    // Other Details
    honors: Yup.string().required("Honors/Awards is required"),
    sports: Yup.string().required("Sports is required"),
    dramatic: Yup.string().required("Dramatic is required"),
    literacy: Yup.string().required("Literacy is required"),
    music: Yup.string().required("Music/Dance is required"),
    other: Yup.string().required("Other is required"),
    identification_marks: Yup.string().required(
      "Identification Marks is required"
    ),
    interview_board: Yup.string().required("Interview Board is required"),
    observation_at_the_time_of_interview: Yup.string().required(
      "Observation At the Time Of Interview is required"
    ),
    any_other_relevent_information: Yup.string().required(
      "Any Other Relevant Information is required"
    ),

    // Spouse Details
    spouse_name: Yup.string().required("Spouse Name is required"),
    spouse_date_of_birth: Yup.date().required(
      "Spouse Date Of Birth is required"
    ),
    spouse_mobile: Yup.string().required("Spouse Mobile Number is required"),
    spouse_qualification: Yup.string().required(
      "Spouse Qualification is required"
    ),
    spouse_employer_details: Yup.string().required(
      "Spouse Employer Details is required"
    ),

    // Children Details
    children_name: Yup.string().required("Child Name is required"),
    children_gender: Yup.string().required("Child Gender is required"),
    children_date_of_birth: Yup.date().required(
      "Child Date Of Birth is required"
    ),
    children_mobile: Yup.string().required("Child Mobile Number is required"),
    children_institute_name: Yup.string().required(
      "Child Institute Name is required"
    ),

    // Qualification Details
    qualification_name: Yup.string().required("Qualification is required"),
    qualification_passing_year: Yup.string().required(
      "Passing Year is required"
    ),
    qualification_univercity: Yup.string().required("University is required"),
    qualification_institution: Yup.string().required("Institution is required"),
    qualification_percentage: Yup.string().required(
      "Division/Percentage is required"
    ),
    qualification_medium: Yup.string().required(
      "Medium Of Instruction is required"
    ),
    qualification_main_subject: Yup.string().required(
      "Main Subject is required"
    ),

    // Specialized Details
    specialized_name_of_training: Yup.string().required(
      "Name Of Training is required"
    ),
    specialized_place_of_training: Yup.string().required(
      "Place Of Training is required"
    ),
    specialized_date_from: Yup.date().required("Date From is required"),
    specialized_date_to: Yup.date().required("Date To is required"),
    specialized_organized_by: Yup.string().required("Organized By is required"),
    specialized_resource_person: Yup.string().required(
      "Resource Person is required"
    ),

    // Dependent Details
    dependent_name: Yup.string().required("Dependent Name is required"),
    dependent_relationship: Yup.string().required("Relationship is required"),
    dependent_date_of_birth: Yup.date().required("Date Of Birth is required"),
    dependent_mobile: Yup.string().required("Mobile Number is required"),
    dependent_remark: Yup.string().required("Remark is required"),

    // Pre Experience Details
    preExperience_organization_name: Yup.string().required(
      "Organisation Name is required"
    ),
    preExperience_date_from: Yup.date().required("Date From is required"),
    preExperience_date_to: Yup.date().required("Date To is required"),
    preExperience_designation_name: Yup.string().required(
      "Designation Name is required"
    ),
    preExperience_job_description: Yup.string().required(
      "Job Description is required"
    ),
    preExperience_salary_drawn: Yup.string().required(
      "Salary Drawn is required"
    ),
    preExperience_reason_for_leaving: Yup.string().required(
      "Reason For Leaving is required"
    ),

    // PF Nominee Details
    pf_nominee_nominee_name: Yup.string().required("Nominee Name is required"),
    pf_nominee_relationship: Yup.string().required("Relationship is required"),
    pf_nominee_date_of_birth: Yup.date().required("Date of Birth is required"),
    pf_nominee_percentage_of_share: Yup.string().required(
      "Percentage Of Share is required"
    ),

    // Reference Details
    reference_name: Yup.string().required("Reference Name is required"),
    reference_designation_name: Yup.string().required(
      "Designation Name is required"
    ),
    reference_address: Yup.string().required("Address is required"),
  });

  const passportDetails = [
    {
      id: "passport_no",
      label: "Passport No",
      name: "passport_no",
      component: TextFieldComponent,
    },
    {
      id: "passport_issue_place",
      label: "Passport Issue Place",
      name: "passport_issue_place",
      component: TextFieldComponent,
    },
    {
      id: "passport_issue_date",
      label: "Passport Issue Date",
      name: "passport_issue_date",
      component: DatePickerField,
    },
    {
      id: "passport_expiry_date",
      label: "Passport Expiry Date",
      name: "passport_expiry_date",
      component: DatePickerField,
    },
  ];
  const visaDetails = [
    {
      id: "visa_no",
      label: "Visa No",
      name: "visa_no",
      component: TextFieldComponent,
    },
    {
      id: "visa_issue_place",
      label: "Visa Issue Place",
      name: "visa_issue_place",
      component: TextFieldComponent,
    },
    {
      id: "visa_issue_date",
      label: "Visa Issue Date",
      name: "visa_issue_date",
      component: DatePickerField,
    },
    {
      id: "visa_expiry_date",
      label: "Visa Expiry Date",
      name: "visa_expiry_date",
      component: DatePickerField,
    },
  ];
  const otherDetails = [
    {
      id: "honors",
      label: "Honors/Awards",
      name: "honors",
      component: TextFieldComponent,
    },
    {
      id: "sports",
      label: "Sports",
      name: "sports",
      component: TextFieldComponent,
    },
    {
      id: "dramatic",
      label: "Dramatic",
      name: "dramatic",
      component: TextFieldComponent,
    },
    {
      id: "literacy",
      label: "Literacy",
      name: "literacy",
      component: TextFieldComponent,
    },
    {
      id: "music",
      label: "Music/Dance",
      name: "music",
      component: TextFieldComponent,
    },
    {
      id: "other",
      label: "Other",
      name: "other",
      component: TextFieldComponent,
    },
    {
      id: "identification_marks",
      label: "Identification Marks",
      name: "identification_marks",
      component: TextFieldComponent,
    },
    {
      id: "interview_board",
      label: "Interview Board",
      name: "interview_board",
      component: TextFieldComponent,
    },
    {
      id: "observation_at_the_time_of_interview",
      label: "Observation At the Time Of Interview",
      name: "observation_at_the_time_of_interview",
      component: TextFieldComponent,
    },
    {
      id: "any_other_relevent_information",
      label: "Any Other Relevent Information",
      name: "any_other_relevent_information",
      component: TextFieldComponent,
    },
  ];

  const spouseDetails = [
    {
      id: "spouse_name",
      label: "Name",
      name: "spouse_name",
      component: TextFieldComponent,
    },
    {
      id: "spouse_date_of_birth",
      label: "Date Of Birth",
      name: "spouse_date_of_birth",
      component: DatePickerField,
    },
    {
      id: "spouse_mobile",
      label: "Number",
      name: "spouse_mobile",
      component: TextFieldComponent,
    },
    {
      id: "spouse_qualification",
      label: "Qualification",
      name: "spouse_qualification",
      component: SelectField,
      options: Config.qualifications,
    },
    {
      id: "spouse_employer_details",
      label: "Employer Details",
      name: "spouse_employer_details",
      component: TextFieldComponent,
    },
  ];
  const childrenDetails = [
    {
      id: "children_name",
      label: "Name",
      name: "children_name",
      component: TextFieldComponent,
    },
    {
      id: "children_gender",
      label: "Gender",
      name: "children_gender",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "children_date_of_birth",
      label: "Date Of Birth",
      name: "children_date_of_birth",
      component: DatePickerField,
    },
    {
      id: "children_mobile",
      label: "Number",
      name: "children_mobile",
      component: TextFieldComponent,
    },
    {
      id: "children_institute_name",
      label: "Institute Name",
      name: "children_institute_name",
      component: TextFieldComponent,
    },
  ];
  const qualificationDetails = [
    {
      id: "qualification_name",
      label: "Qualification",
      name: "qualification_name",
      component: SelectField,
      options: Config.qualifications,
    },
    {
      id: "qualification_passing_year",
      label: "Passing Year",
      name: "qualification_passing_year",
      component: TextFieldComponent,
    },
    {
      id: "qualification_univercity",
      label: "Univercity",
      name: "qualification_univercity",
      component: DatePickerField,
    },
    {
      id: "qualification_institution",
      label: "Institution",
      name: "qualification_institution",
      component: TextFieldComponent,
    },
    {
      id: "qualification_percentage",
      label: "Division/Percentage",
      name: "qualification_percentage",
      component: TextFieldComponent,
    },
    {
      id: "qualification_medium",
      label: "Medium Of Instruction",
      name: "qualification_medium",
      component: SelectField,
      options: Config.Boards,
    },
    {
      id: "qualification_main_subject",
      label: "Main Subject",
      name: "qualification_main_subject",
      component: SelectField,
      options: Config.Boards,
    },
  ];
  const specializedDetails = [
    {
      id: "specialized_name_of_training",
      label: "Name Of Training",
      name: "pecialized_name_of_training",
      component: TextFieldComponent,
    },
    {
      id: "specialized_place_of_training",
      label: "Place Of Training",
      name: "specialized_place_of_training",
      component: TextFieldComponent,
    },
    {
      id: "specialized_date_from",
      label: "Date From",
      name: "specialized_date_from",
      component: DatePickerField,
    },
    {
      id: "specialized_date_to",
      label: "Date To",
      name: "specialized_date_to",
      component: DatePickerField,
    },
    {
      id: "specialized_organized_by",
      label: "Organized By",
      name: "specialized_organized_by",
      component: TextFieldComponent,
    },
    {
      id: "specialized_resource_person",
      label: "Resource Person",
      name: "specialized_resource_person",
      component: TextFieldComponent,
    },
  ];
  const dependentDetails = [
    {
      id: "dependent_name",
      label: "Dependent Name",
      name: "pecialized_name",
      component: TextFieldComponent,
    },
    {
      id: "dependent_relationship",
      label: "Relationship",
      name: "dependent_relationship",
      component: TextFieldComponent,
    },
    {
      id: "dependent_date_of_birth",
      label: "Date Of Birth",
      name: "dependent_date_of_birth",
      component: DatePickerField,
    },
    {
      id: "dependent_mobile",
      label: "Mobile No",
      name: "dependent_mobile",
      component: TextFieldComponent,
    },
    {
      id: "dependent_remark",
      label: "Remark",
      name: "dependent_remark",
      component: TextFieldComponent,
    },
  ];

  const preExperienceDetails = [
    {
      id: "preExperience_organization_name",
      label: "Organisation Name",
      name: "preExperience_organization_name",
      component: TextFieldComponent,
    },
    {
      id: "preExperience_date_from",
      label: "Date From",
      name: "preExperience_date_from",
      component: DatePickerField,
    },
    {
      id: "preExperience_date_to",
      label: "Date To",
      name: "preExperience_date_to",
      component: DatePickerField,
    },
    {
      id: "preExperience_designation_name",
      label: "Designation Name",
      name: "preExperience_designation_name",
      component: TextFieldComponent,
    },
    {
      id: "preExperience_job_description",
      label: "Job Description",
      name: "preExperience_job_description",
      component: TextFieldComponent,
    },
    {
      id: "preExperience_salary_drawn",
      label: "Salary Drawn",
      name: "preExperience_salary_drawn",
      component: TextFieldComponent,
    },
    {
      id: "preExperience_reason_for_leaving",
      label: "Reason For Leaving",
      name: "preExperience_reason_for_leaving",
      component: TextFieldComponent,
    },
  ];

  const pfNomineeDetails = [
    {
      id: "pf_nominee_nominee_name",
      label: "Nominee Name",
      name: "pf_nominee_nominee_name",
      component: TextFieldComponent,
    },
    {
      id: "pf_nominee_relationship",
      label: "Relationship",
      name: "pf_nominee_relationship",
      component: TextFieldComponent,
    },
    {
      id: "pf_nominee_date_of_birth",
      label: "Date of Birth",
      name: "pf_nominee_date_of_birth",
      component: DatePickerField,
    },

    {
      id: "pf_nominee_percentage_of_share",
      label: "Percentage Of Share",
      name: "pf_nominee_percentage_of_share",
      component: TextFieldComponent,
    },
  ];
  const referenceDetails = [
    {
      id: "reference_name",
      label: "Reference Name",
      name: "reference_name",
      component: TextFieldComponent,
    },
    {
      id: "reference_designation_name",
      label: "Designation Name",
      name: "reference_designation_name",
      component: TextFieldComponent,
    },
    {
      id: "reference_address",
      label: "Address",
      name: "reference_address",
      component: TextFieldComponent,
    },
  ];

  const handleSubmit = async (values, actions) => {
    console.log(values, "----values");

    // Ensure id is defined before proceeding
    if (!id) {
      toast.warning("Please fill in the basic information first.");
      return;
    }

    const payload = {
      id: id,
      tab: 3,
      ...values,
    };

    console.log(payload, "payload");

    try {
      const resp = await UpdateStaffDetails(payload);
      if (resp?.success) {
        toast.success("Staff updated successfully.");
        actions.resetForm();
        staffRefetch();
        setSlectedTab(4);
      } else {
        toast.error("Failed to update staff.");
      }
    } catch (error) {
      toast.error("Failed to update staff.");
      console.error("Error updating staff:", error);
    }
  };

  console.log(initialValues, "===sferw");

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
            {/* Uncomment and modify if needed for other fields */}
            {/* <FormSection title="General Information" details={fields} /> */}
            <FormSection
              title="Passport Details"
              details={passportDetails}
              values={values}
            />
            <FormSection
              title="Visa Details"
              details={visaDetails}
              values={values}
            />
            <FormSection
              title="Other Details"
              details={otherDetails}
              values={values}
            />
            <FormSection
              title="Spouse Details"
              details={spouseDetails}
              values={values}
            />
            <FormSection
              title="Children Details"
              details={childrenDetails}
              values={values}
            />
            <FormSection
              title="Qualification Details"
              details={qualificationDetails}
              values={values}
            />
            <FormSection
              title="Training Details"
              details={specializedDetails}
              values={values}
            />
            <FormSection
              title="Dependent Details"
              details={dependentDetails}
              values={values}
            />
            <FormSection
              title="Previous Experience Details"
              details={preExperienceDetails}
              values={values}
            />
            <FormSection
              title="Pf Nominee Details"
              details={pfNomineeDetails}
              values={values}
            />
            <FormSection
              title="Reference Details"
              details={referenceDetails}
              values={values}
            />

            <div className="flex justify-end my-5">
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default OtherInformation;

const FormSection = ({ title, details, values }) => (
  <Box className="mt-7">
    <span className="font-bold text-[18px] mt-7 ">{title}</span>
    <Grid className="border rounded-lg mt-3 px-6">
      <Box className="flex w-full flex-wrap py-3 justify-between">
        {details.map((field) => (
          <Box key={field.id} className="lg:w-[49%] w-full">
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
    </Grid>
  </Box>
);

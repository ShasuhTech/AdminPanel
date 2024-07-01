import React, { useState } from "react";
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

const validationSchema = Yup.object().shape({
  // name: Yup.string().required("Name is required"),
  // email: Yup.string().email("Invalid email").required("Email is required"),
  // gender: Yup.string().required("Gender is required"),
});

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

const AdditionalDetails = ({studenData}) => {
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
  const router = useRouter();
  const { id } = router.query;
  // const classes = useStyles();
  const [emergencyToggle, setEmergencyToggle] = useState(false);
  const [authorisedToggle, setauthorisedToggle] = useState(false);
  const handleSubmit = async (values, event) => {
    console.log(values, "-dsfsdfdsfsfsd");
    const payload = {};

    payload.admission_number = values?.admission_no;
    payload.fee_number = values?.fee_no;
    payload.sibling_admission_number = values?.sibling_adm_no;
    payload.name = {
      first_name: values?.first_name,
      middle_name: values?.middle_name,
      last_name: values?.last_name,
    };
    payload.class = values?.class;
    payload.section = values?.section;
    payload.stream = values?.stream;
    payload.gender = values?.gender;
    payload.blood_group = values?.blood_group;
    payload.emergency_number = values?.emergency_no;
    payload.mother_tongue = values?.mother_tongue;
    payload.religion = values.religion;
    payload.date_of_birth = moment(values?.dob).format("YYYY-MM-DD");
    payload.social_category = values?.social_category;
    (payload.locality = values.locality),
      (payload.father_detail = {
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
      });
    (payload.remark = values?.remark),
      (payload.present_address = {
        country: values.present_country,
        city: values.present_city,
        state: values.present_state,
        pin_code: values.present_pincode,
        address: values.present_address,
        locality: values.present_locality,
      }),
      (payload.permanent_address = {
        country: confirmAddress
          ? values.present_country
          : values.permanent_country,
        city: confirmAddress ? values.present_city : values.permanent_city,
        state: confirmAddress ? values.present_state : values.permanent_State,
        pin_code: confirmAddress
          ? values.present_pincode
          : values.permanent_pincode,
        address: confirmAddress
          ? values.present_address
          : values.permanent_address,
        locality: confirmAddress
          ? values.present_locality
          : values.permanent_locality,
      });

    payload.guardian_details = {
      guardian_name: values.guardian_name,
      relation: values.guardian_relation,
      mobile_number: values.guardian_mobile_no,
      email: values.guardian_email,
      address: values.guardian_address,
    };

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
    payload.other_details = {
      any_physical_disablity: values.any_physical_disability,
      any_treatment_undertaken_or_required: values.any_treatment_undertaken,
      any_allergies: values.any_allergies,
      interest_and_hobbies: values.interest_hobbies,
      sports: values.sports_game,
      co_curricular_activities: values.co_curriclar_activities,
      any_other_relevant_information: values.any_other_relevent_information,
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
    payload.student_status = "Register";
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
  const initialValues =
    id 
      ? {
          search: studenData.search || "",
          admission_no: studenData.admission_number || "",
          first_name: studenData.name?.first_name || "",
          middle_name: studenData.name?.middle_name || "",
          last_name: studenData.name?.last_name || "",
          class: studenData.class || "",
          section: studenData.section || "",
          stream: studenData.stream || "",
          gender: studenData.gender || "",
          blood_group: studenData.blood_group || "",
          emergency_no: studenData.emergency_number || "",
          mother_tongue: studenData.mother_tongue || "",
          religion: studenData.religion || "",
          dob: studenData.date_of_birth || new Date(),
          social_category: studenData.social_category || "",
          locality: studenData.locality || "",
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
          same_present_add: studenData.same_present_add || "",
          emergency_no: studenData.emergency_number || "",
          present_address: studenData.address?.present_address?.address || "",
          present_city: studenData.address?.present_address?.city || "",
          present_state: studenData.address?.present_address?.state || "",
          present_pincode: studenData.address?.present_address?.pin_code || "",
          present_locality: studenData.address?.present_address?.locality || "",
          present_country:
            studenData.address?.present_address?.country || "india",
          present_telephone:
            studenData.address?.present_address?.telephone || "",
          permanent_address:
            studenData.address?.permanent_address?.address || "",
          permanent_city: studenData.address?.permanent_address?.city || "",
          permanent_state: studenData.address?.permanent_address?.state || "",
          permanent_pincode:
            studenData.address?.permanent_address?.pin_code || "",
          permanent_locality:
            studenData.address?.permanent_address?.locality || "",
          permanent_country:
            studenData.address?.permanent_address?.country || "india",
          permanent_telephone:
            studenData.address?.permanent_address?.telephone || "",
          any_physical_disability:
            studenData.other_details?.any_physical_disablity || "",
          any_treatment_undertaken:
            studenData.other_details?.any_treatment_undertaken_or_required ||
            "",
          any_allergies: studenData.other_details?.any_allergies || "",
          interest_hobbies:
            studenData.other_details?.interest_and_hobbies || [],
          sports_game: studenData.other_details?.sports || [],
          co_curriclar_activities:
            studenData.other_details?.co_curricular_activities || [],
          any_other_relevent_information:
            studenData.other_details?.any_other_relevant_information || "",
          school_name: studenData?.previous_school_details?.school_name || "",
          school_reconised_by:
            studenData?.previous_school_details?.recognised_by || "",
          // school_city_name: "",
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
          Syllabus: studenData?.previous_school_details?.Syllabus || "",
          pre_class: "",
          tc_birth: "",
          Pre_address: "",
          Pre_state: "",
          pre_city: "",
          pre_country: "",
          pre_pin_code: "",
          subject_english_max_marks: "",
          subject_english_marks_obtained: "",
          subject_english_grade: "",
          subject_english_percentage: "",
          subject_hindi_max_marks: "",
          subject_hindi_marks_obtained: "",
          subject_hindi_grade: "",
          subject_hindi_percentage: "",
          subject_mathematics_max_marks: "",
          subject_mathematics_marks_obtained: "",
          subject_mathematics_grade: "",
          subject_mathematics_percentage: "",
          subject_science_max_marks: "",
          subject_science_marks_obtained: "",
          subject_science_grade: "",
          subject_science_percentage: "",
          subject_social_sceince_max_marks: "",
          subject_social_sceince_marks_obtained: "",
          subject_social_sceince_grade: "",
          subject_social_sceince_percentage: "",
          subject_third_language_max_marks: "",
          subject_third_language_marks_obtained: "",
          subject_third_language_grade: "",
          subject_third_language_percentage: "",
          pre_subject_english_max_marks: "",
          pre_subject_english_marks_obtained: "",
          pre_subject_english_grade: "",
          pre_subject_english_percentage: "",
          pre_subject_hindi_max_marks: "",
          pre_subject_hindi_marks_obtained: "",
          pre_subject_hindi_grade: "",
          pre_subject_hindi_percentage: "",
          pre_subject_mathematics_max_marks: "",
          pre_subject_mathematics_marks_obtained: "",
          pre_subject_mathematics_grade: "",
          pre_subject_mathematics_percentage: "",
          pre_subject_science_max_marks: "",
          pre_subject_science_marks_obtained: "",
          pre_subject_science_grade: "",
          pre_subject_science_percentage: "",
          pre_subject_social_sceince_max_marks: "",
          pre_subject_social_sceince_marks_obtained: "",
          pre_subject_social_sceince_grade: "",
          pre_subject_social_sceince_percentage: "",
          pre_subject_total_max_marks: "",
          pre_subject_total_marks_obtained: "",
          pre_subject_total_grade: "",
          pre_subject_total_percentage: "",
          pre_Board_subject_english_max_marks: "",
          pre_Board_subject_english_marks_obtained: "",
          pre_Board_subject_english_grade: "",
          pre_Board_subject_english_percentage: "",
          pre_Board_subject_hindi_max_marks: "",
          pre_Board_subject_hindi_marks_obtained: "",
          pre_Board_subject_hindi_grade: "",
          pre_Board_subject_hindi_percentage: "",
          pre_Board_subject_mathematics_max_marks: "",
          pre_Board_subject_mathematics_marks_obtained: "",
          pre_Board_subject_mathematics_grade: "",
          pre_Board_subject_mathematics_percentage: "",
          pre_Board_subject_science_max_marks: "",
          pre_Board_subject_science_marks_obtained: "",
          pre_Board_subject_science_grade: "",
          pre_Board_subject_science_percentage: "",
          pre_Board_subject_social_sceince_max_marks: "",
          pre_Board_subject_social_sceince_marks_obtained: "",
          pre_Board_subject_social_sceince_grade: "",
          pre_Board_subject_social_sceince_percentage: "",
          pre_Board_subject_total_max_marks: "",
          pre_Board_subject_total_marks: "",
          pre_Board_subject_total_marks_obtained: "",
          pre_Board_subject_total_grade: "",
          pre_Board_subject_total_percentage: "",
          board_details: "",
          Board_subject_english_max_marks: "",
          Board_subject_english_marks_obtained: "",
          Board_subject_english_grade: "",
          Board_subject_english_percentage: "",
          Board_subject_hindi_max_marks: "",
          Board_subject_hindi_marks_obtained: "",
          Board_subject_hindi_grade: "",
          Board_subject_hindi_percentage: "",
          Board_subject_mathematics_max_marks: "",
          Board_subject_mathematics_marks_obtained: "",
          Board_subject_mathematics_grade: "",
          Board_subject_mathematics_percentage: "",
          Board_subject_science_max_marks: "",
          Board_subject_science_marks_obtained: "",
          Board_subject_science_grade: "",
          Board_subject_science_percentage: "",
          Board_subject_social_sceince_max_marks: "",
          Board_subject_social_sceince_marks_obtained: "",
          Board_subject_social_sceince_grade: "",
          Board_subject_social_sceince_percentage: "",
          Board_subject_economic_max_marks: "",
          Board_subject_economic_marks_obtained: "",
          Board_subject_economic_grade: "",
          Board_subject_economic_percentage: "",
          Board_subject_second_language_max_marks: "",
          Board_subject_second_language_marks_obtained: "",
          Board_subject_second_language_grade: "",
          Board_subject_second_language_percentage: "",
          Board_subject_total_max_marks: "",
          Board_subject_total_marks_obtained: "",
          Board_subject_total_grade: "",
          Board_subject_total_percentage: "",
          // Stream Details
          stream_details: "",
          stream_common_subject: "",
          stream_group1: "",
          stream_group2: "",
          stream_group3: "",
          stream_group4: "",
          stream_group5: "",
          // Sibling Details
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
          first_name: "",
          middle_name: "",
          last_name: "",
          class: "",
          section: "",
          stream: "",
          gender: "",
          blood_group: "",
          emergency_no: "",
          mother_tongue: "",
          religion: "",
          dob: new Date(),
          social_category: "",
          locality: "",
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
          same_present_add: "",
          emergency_no: "",
          present_address: "",
          present_city: "",
          present_state: "",
          present_pincode: "",
          present_locality: "",
          present_country: "india",
          present_telephone: "",
          permanent_address: "",
          permanent_city: "",
          permanent_state: "",
          permanent_pincode: "",
          permanent_locality: "",
          permanent_country: "india",
          permanent_telephone: "",
          any_physical_disability: "",
          any_treatment_undertaken: "",
          any_allergies: "",
          interest_hobbies: [],
          sports_game: [],
          co_curriclar_activities: [],
          any_other_relevent_information: "",
          school_name: "",
          school_reconised_by: "",
          // school_city_name: "",
          previous_country: "India",
          previous_state: "",
          previous_city: "",
          previous_pincode: "",
          medium_of_instruction: "",
          year_of_passing: "",
          tc_number: "",
          previous_leaving: "",
          Syllabus: "",
          pre_class: "",
          tc_birth: "",
          Pre_address: "",
          Pre_state: "",
          pre_city: "",
          pre_country: "",
          pre_pin_code: "",
          subject_english_max_marks: "",
          subject_english_marks_obtained: "",
          subject_english_grade: "",
          subject_english_percentage: "",
          subject_hindi_max_marks: "",
          subject_hindi_marks_obtained: "",
          subject_hindi_grade: "",
          subject_hindi_percentage: "",
          subject_mathematics_max_marks: "",
          subject_mathematics_marks_obtained: "",
          subject_mathematics_grade: "",
          subject_mathematics_percentage: "",
          subject_science_max_marks: "",
          subject_science_marks_obtained: "",
          subject_science_grade: "",
          subject_science_percentage: "",
          subject_social_sceince_max_marks: "",
          subject_social_sceince_marks_obtained: "",
          subject_social_sceince_grade: "",
          subject_social_sceince_percentage: "",
          subject_third_language_max_marks: "",
          subject_third_language_marks_obtained: "",
          subject_third_language_grade: "",
          subject_third_language_percentage: "",
          pre_subject_english_max_marks: "",
          pre_subject_english_marks_obtained: "",
          pre_subject_english_grade: "",
          pre_subject_english_percentage: "",
          pre_subject_hindi_max_marks: "",
          pre_subject_hindi_marks_obtained: "",
          pre_subject_hindi_grade: "",
          pre_subject_hindi_percentage: "",
          pre_subject_mathematics_max_marks: "",
          pre_subject_mathematics_marks_obtained: "",
          pre_subject_mathematics_grade: "",
          pre_subject_mathematics_percentage: "",
          pre_subject_science_max_marks: "",
          pre_subject_science_marks_obtained: "",
          pre_subject_science_grade: "",
          pre_subject_science_percentage: "",
          pre_subject_social_sceince_max_marks: "",
          pre_subject_social_sceince_marks_obtained: "",
          pre_subject_social_sceince_grade: "",
          pre_subject_social_sceince_percentage: "",
          pre_subject_total_max_marks: "",
          pre_subject_total_marks_obtained: "",
          pre_subject_total_grade: "",
          pre_subject_total_percentage: "",
          pre_Board_subject_english_max_marks: "",
          pre_Board_subject_english_marks_obtained: "",
          pre_Board_subject_english_grade: "",
          pre_Board_subject_english_percentage: "",
          pre_Board_subject_hindi_max_marks: "",
          pre_Board_subject_hindi_marks_obtained: "",
          pre_Board_subject_hindi_grade: "",
          pre_Board_subject_hindi_percentage: "",
          pre_Board_subject_mathematics_max_marks: "",
          pre_Board_subject_mathematics_marks_obtained: "",
          pre_Board_subject_mathematics_grade: "",
          pre_Board_subject_mathematics_percentage: "",
          pre_Board_subject_science_max_marks: "",
          pre_Board_subject_science_marks_obtained: "",
          pre_Board_subject_science_grade: "",
          pre_Board_subject_science_percentage: "",
          pre_Board_subject_social_sceince_max_marks: "",
          pre_Board_subject_social_sceince_marks_obtained: "",
          pre_Board_subject_social_sceince_grade: "",
          pre_Board_subject_social_sceince_percentage: "",
          pre_Board_subject_total_max_marks: "",
          pre_Board_subject_total_marks_obtained: "",
          pre_Board_subject_total_grade: "",
          pre_Board_subject_total_percentage: "",
          board_details: "",
          Board_subject_english_max_marks: "",
          Board_subject_english_marks_obtained: "",
          Board_subject_english_grade: "",
          Board_subject_english_percentage: "",
          Board_subject_hindi_max_marks: "",
          Board_subject_hindi_marks_obtained: "",
          Board_subject_hindi_grade: "",
          Board_subject_hindi_percentage: "",
          Board_subject_mathematics_max_marks: "",
          Board_subject_mathematics_marks_obtained: "",
          Board_subject_mathematics_grade: "",
          Board_subject_mathematics_percentage: "",
          Board_subject_science_max_marks: "",
          Board_subject_science_marks_obtained: "",
          Board_subject_science_grade: "",
          Board_subject_science_percentage: "",
          Board_subject_social_sceince_max_marks: "",
          Board_subject_social_sceince_marks_obtained: "",
          Board_subject_social_sceince_grade: "",
          Board_subject_social_sceince_percentage: "",
          Board_subject_economic_max_marks: "",
          Board_subject_economic_marks_obtained: "",
          Board_subject_economic_grade: "",
          Board_subject_economic_percentage: "",
          Board_subject_second_language_max_marks: "",
          Board_subject_second_language_marks_obtained: "",
          Board_subject_second_language_grade: "",
          Board_subject_second_language_percentage: "",
          Board_subject_total_max_marks: "",
          Board_subject_total_marks_obtained: "",
          Board_subject_total_grade: "",
          Board_subject_total_percentage: "",
          // Stream Details
          stream_details: "",
          stream_common_subject: "",
          stream_group1: "",
          stream_group2: "",
          stream_group3: "",
          stream_group4: "",
          stream_group5: "",
          // Sibling Details
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
            <p>All aditional field added here</p>

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
                {genders.map((option) => (
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
                {genders.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Field>
            </div>
            <div className="w-[48.5%]">
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
            </div>
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
                        helperText={<ErrorMessage name="country" />}
                      />
                    )}
                    value={null}
                    onChange={(event, value) =>
                      setFieldValue("country", value ? value.name : "")
                    }
                    onBlur={() => {}}
                  />
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
                      setFieldValue("certificate_date", newValue);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        error={false}
                        helperText={<ErrorMessage name="certificate_date" />}
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
                            helperText={
                              <ErrorMessage name="school_reconised_by" />
                            }
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
                              helperText={
                                <ErrorMessage name="previous_state" />
                              }
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
                            helperText={
                              <ErrorMessage name="previous_pincode" />
                            }
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
                            helperText={
                              <ErrorMessage name="previous_leaving" />
                            }
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

export default AdditionalDetails;

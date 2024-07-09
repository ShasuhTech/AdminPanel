import React, { useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik, useFormik } from "formik";
import * as Yup from "yup";
import TextInput from "@/components/TextInput";
import {
  Autocomplete,
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Select } from "antd";
import CustomButton from "@/components/CommonButton/CustomButton";
import {
  AddStudent,
  GetStudentListById,
  StateData,
  UpdateStudent,
  cityData,
  countryData,
} from "@/services/api";
import { useQuery } from "react-query";
import Config from "@/utilities/Config";
import moment from "moment";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { StyledTableCell } from "@/styles/TableStyle/indx";
import { CountrySelect, StateSelect } from "@/components/StateAndCity";
import CitySelectFather from "@/components/StateAndCity/City/FatherCity";
import CitySelectMother from "@/components/StateAndCity/City/MotherCity";
import SimpleModal from "@/components/Modal/SimpleModal";
import dayjs from "dayjs";
const label = { inputProps: { "aria-label": "Checkbox demo" } };

const StudentRegistration = ({
  setSlectedTab,
  open,
  handleClose,
  data,
  resetInitialValues,
  setresetInitialValues,
}) => {
  const [studenData, setStudentData] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const studentDetails = async () => {
    try {
      if (!id) return;
      const resp = await GetStudentListById(id);
      console.log(resp, "resp");
      setStudentData(resp?.data[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    studentDetails();
  }, [id]);
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
    // if (presentState) {
    ciftyRefetch(studenData?.address?.present_address?.state);
    // }
  }, [presentState, studenData?.address?.present_address?.state]);


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
    payload.date_of_birth = dayjs(values?.dob);
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
    id && !resetInitialValues
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
          dob: studenData.date_of_birth || dayjs(new Date()),
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
          dob: dayjs(new Date()),
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

  const resetBtn = () => {
    router.replace("/registration/student-registration");
    setresetInitialValues(true);
    // handleClose();
  };

  console.log(new Date());
  return (
    <SimpleModal open={open} handleClose={handleClose} width={"80%"}>
      <div className="flex justify-between">
        <Typography variant="h5">Student Registration</Typography>
        {router?.query?.id && (
          <div className="mr-10">
            <Button onClick={resetBtn} variant="outlined" className=" ">
              Reset Fileds
            </Button>
          </div>
        )}
      </div>
      <div className="overflow-scroll h-[750px]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize={router?.query?.id ? true : false}
        >
          {({
            isSubmitting,
            status,
            handleChange,
            handleBlur,
            values,
            setFieldValue,
            errors,
            touched,
          }) => (
            <Form>
              {/* Basic Details */}
              {
                <div className="mt-[40px] ">
                  <div className=" ">
                    <div className="lg:flex w-[100%] gap-4">
                      <div className=" lg:w-[20%] w-[100%]  flex justify-center items-center ">
                        <div className="w-[200px] h-[200px] rounded-full ">
                          <div>
                            <img
                              src={"/images/user.png"}
                              alt="Picture of the author"
                              className="border rounded-full object-contain w-[200px] h-[200px]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex  flex-wrap lg:w-[80%] w-[100%] gap-4">
                        {/* Not Required */}
                        <div className="lg:w-[66%] w-[100%]">
                          <Field
                            name="search"
                            as={TextField}
                            label="Search"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.search}
                            helperText={<ErrorMessage name="search" />}
                          />
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="admission_no"
                            as={TextField}
                            label="Admission No"
                            variant="outlined"
                            // required
                            fullWidth
                            value={values.admission_no}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={
                              touched.admission_no &&
                              Boolean(errors.admission_no)
                            }
                            inputProps={{
                              maxLength: 10,
                              autoComplete: "admission_no",
                            }}
                            helperText={
                              touched.admission_no && errors.admission_no
                            }
                          />
                        </div>
                        {/* Not Required */}

                        {/* <div className="lg:w-[32%] w-[100%]">
                    <Field
                      name="parent_id"
                      as={TextField}
                      label="Parent Id"
                      variant="outlined"
                      // required
                      value={values.parent_id}
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      helperText={<ErrorMessage name="parent_id" />}
                    />
                  </div> */}
                        <div className="lg:w-[32%]  w-[100%]">
                          <Field
                            name="first_name"
                            as={TextField}
                            label="First Name"
                            variant="outlined"
                            // required
                            value={values.first_name}
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={<ErrorMessage name="first_name" />}
                          />
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="middle_name"
                            as={TextField}
                            label="Middle Name"
                            variant="outlined"
                            fullWidth
                            value={values.middle_name}
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={<ErrorMessage name="middle_name" />}
                          />
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="last_name"
                            as={TextField}
                            label="Last Name"
                            variant="outlined"
                            // required
                            value={values.last_name}
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={<ErrorMessage name="last_name" />}
                          />
                        </div>

                        <div className="lg:w-[32.4%]  w-[100%]">
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
                            value={values.class}
                            helperText={<ErrorMessage name="class" />}
                          >
                            {Config?.ClassList.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="lg:w-[32%]  w-[100%]">
                          <Field
                            name="section"
                            as={TextField}
                            select
                            label="Section"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.section}
                            helperText={<ErrorMessage name="section" />}
                          >
                            {Config?.SectionList.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        {Number(values.class) >= 10 && (
                          <div className="lg:w-[32.4%]  w-[100%]">
                            <Field
                              name="stream"
                              as={TextField}
                              select
                              label="Stream"
                              variant="outlined"
                              fullWidth
                              onBlur={handleBlur}
                              onChange={handleChange}
                              error={false}
                              value={values.stream}
                              helperText={<ErrorMessage name="stream" />}
                            >
                              {Config?.StreamList.map((option) => (
                                <MenuItem
                                  key={option.label}
                                  value={option.label}
                                >
                                  {option.label}
                                </MenuItem>
                              ))}
                            </Field>
                          </div>
                        )}

                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="gender"
                            as={TextField}
                            select
                            label="Gender"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.gender}
                            helperText={<ErrorMessage name="gender" />}
                          >
                            {Config.genders?.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                      </div>
                    </div>

                    <div className="  flex-wrap flex mt-5  gap-4">
                      <div className="lg:w-[32.5%]  w-[100%]">
                        <Field
                          name="blood_group"
                          as={TextField}
                          select
                          label="Blood Group"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          value={values.blood_group}
                          helperText={<ErrorMessage name="blood_group" />}
                        >
                          {Config?.BloodGroups?.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Field>
                      </div>
                      <div className="lg:w-[32.5%]  w-[100%]">
                        <Field
                          name="emergency_no"
                          as={TextField}
                          label="Emergency No"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          // onChange={handleChange}
                          onChange={(event) => {
                            const value = event.target.value;
                            // Allow only numbers and limit the length to 10
                            if (/^\d*$/.test(value) && value.length <= 10) {
                              // setFieldValue(values.emergency_no, value);
                              setFieldValue("emergency_no", value);
                            }
                          }}
                          error={false}
                          helperText={<ErrorMessage name="emergency_no" />}
                        />
                      </div>
                      <div className="lg:w-[32.5%]  w-[100%]">
                        <Field
                          name="mother_tongue"
                          as={TextField}
                          select
                          label="Mother Tongue"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          value={values.mother_tongue}
                          helperText={<ErrorMessage name="mother_tongue" />}
                        >
                          {Config?.MotherTongues?.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Field>
                      </div>
                      <div className="lg:w-[32.5%]  w-[100%]">
                        <Field
                          name="religion"
                          as={TextField}
                          select
                          label="Religion"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          value={values.religion}
                          helperText={<ErrorMessage name="religion" />}
                        >
                          {Config?.IndianReligions?.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Field>
                      </div>
                      <div className="lg:w-[32.5%]  w-[100%]">
                        <DatePicker
                          label="Date Of Birth"
                           value={
                            values.dob ? dayjs(values.dob) : dayjs(new Date())
                          }
                          fullWidth
                          className="w-[100%]"
                          onChange={(newValue) => {
                            setFieldValue("dob", newValue);
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="outlined"
                              fullWidth
                              // required
                              error={false}
                              helperText={<ErrorMessage name="dob" />}
                            />
                          )}
                        />
                      </div>
                      <div className="lg:w-[32.5%]  w-[100%]">
                        <Field
                          name="social_category"
                          as={TextField}
                          select
                          label="Social Ctegory"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          value={values.social_category}
                          helperText={<ErrorMessage name="social_category" />}
                        >
                          {Config?.SocialCategories?.map((option) => (
                            <MenuItem key={option.label} value={option.label}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Field>
                      </div>
                      {/* <div className="lg:w-[32.5%]  w-[100%]">
                        <Field
                          name="locality"
                          as={TextField}
                          label="Locality"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          helperText={<ErrorMessage name="locality" />}
                        />
                        
                      </div> */}
                    </div>
                  </div>
                </div>
              }
              {/* Father Details */}
              {
                <div className="mt-[40px] ">
                  <span className="font-black text-[18px] ">
                   {` Father's Details`}
                  </span>
                  <div className=" border  p-6 rounded-2xl mt-3">
                    <div className="lg:flex w-[100%] gap-4">
                      <div className=" lg:w-[20%] w-[100%]  flex justify-center items-center ">
                        <div className="w-[200px] h-[200px] rounded-full ">
                          <div>
                            <img
                              src={"/images/user.png"}
                              alt="Picture of the author"
                              // width={150}
                              className="border rounded-full object-contain w-[200px] h-[200px]"
                              // height={150}
                            />
                            {/* <div >
                <CameraAltIcon  fontSize={'large'} className="border absolute left-[400px] top-[390px] z-[999] "/>
            </div> */}
                          </div>
                        </div>
                      </div>

                      <div className="flex  flex-wrap lg:w-[80%] w-[100%] gap-4">
                        <div className="lg:w-[66%] w-[100%]">
                          <Field
                            name="father_name"
                            as={TextField}
                            label="Father's Name"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={<ErrorMessage name="father_name" />}
                          />
                        </div>
                        <div className="lg:w-[32%] w-[100%]">
                          <Field
                            name="father_qualifications"
                            as={TextField}
                            select
                            label="Qualification"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="father_qualifications" />
                            }
                          >
                            {Config?.qualifications?.map((option) => (
                              <MenuItem
                                key={option?.label}
                                value={option?.value}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="lg:w-[32%] w-[100%]">
                          <Field
                            name="father_occupation"
                            as={TextField}
                            select
                            label="Occupation"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="father_occupation" />
                            }
                          >
                            {Config.occupations.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="lg:w-[32.5%] w-[100%]">
                          <Field
                            name="father_designation"
                            as={TextField}
                            label="Designation"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="father_designation" />
                            }
                          />
                        </div>
                        <div className="lg:w-[32.5%] w-[100%]">
                          <Field
                            name="father_org_name"
                            as={TextField}
                            label="Org Name"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={<ErrorMessage name="father_org_name" />}
                          />
                        </div>
                        <div className="w-[66%]">
                          <Field
                            name="father_org_address"
                            as={TextField}
                            label="Org Address"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="father_org_address" />
                            }
                          />
                        </div>
                        <div className="lg:w-[32%] w-[100%]">
                          <Field
                            name="father_email"
                            as={TextField}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={<ErrorMessage name="father_email" />}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="  flex-wrap flex mt-5  gap-4">
                      <div className="lg:w-[32.5%] w-[100%]">
                        <Field
                          name="father_nationality"
                          as={TextField}
                          select
                          label="Nationality"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          value={values.father_nationality}
                          helperText={
                            <ErrorMessage name="father_nationality" />
                          }
                        >
                          {Config.Nationalities.map((option) => (
                            <MenuItem key={option?.label} value={option?.label}>
                              {option?.label}
                            </MenuItem>
                          ))}
                        </Field>
                      </div>
                      <div className="lg:w-[32.5%] w-[100%]">
                        <CountrySelect
                          name="father_country"
                          label="Country"
                          value={values.father_country}
                        />
                      </div>
                      <div className="lg:w-[32.5%] w-[100%]">
                        <StateSelect
                          name="father_state"
                          label="Father's State"
                          value={values.father_state}
                          onChange={(event) => {
                            const selectedState = event.target.value;
                            setFieldValue("father_state", selectedState);
                            setFatherState(selectedState);
                          }}
                        />
                        {/* <Autocomplete
                        options={cities}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="State"
                            variant="outlined"
                            fullWidth
                            error={false}
                            helperText={<ErrorMessage name="father_state" />}
                          />
                        )}
                        value={null}
                        onChange={(event, value) =>
                          setFieldValue("father_state", value ? value.name : "")
                        }
                        onBlur={() => {}}
                      /> */}
                      </div>
                      <div className="lg:w-[32.5%] w-[100%]">
                        <CitySelectFather
                          name="father_city"
                          label="Father's City"
                          value={values.father_city}
                          state={fatherState}
                        />
                        {/* <Autocomplete
                        options={cities}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="City"
                            variant="outlined"
                            fullWidth
                            error={false}
                            helperText={<ErrorMessage name="father_city" />}
                          />
                        )}
                        value={null}
                        onChange={(event, value) =>
                          setFieldValue("father_city", value ? value.name : "")
                        }
                        onBlur={() => {}}
                      /> */}
                      </div>
                      <div className="lg:w-[32.5%] w-[100%]">
                        <Field
                          name="father_pincode"
                          as={TextField}
                          label="Pincode"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          helperText={<ErrorMessage name="father_pincode" />}
                        />
                      </div>
                      <div className="lg:w-[32.5%] w-[100%]">
                        <Field
                          name="father_annual_income"
                          as={TextField}
                          label="Annual Income"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          helperText={
                            <ErrorMessage name="father_annual_income" />
                          }
                        />
                      </div>
                      {/* <div className="lg:w-[32.5%] w-[100%]">
                        <Field
                          name="father_telephone"
                          as={TextField}
                          label="Telephone"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          helperText={<ErrorMessage name="father_telephone" />}
                        />
                      </div> */}
                      <div className="lg:w-[32.5%] w-[100%]">
                        <Field
                          name="father_mobile"
                          as={TextField}
                          label="Mobile"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          helperText={<ErrorMessage name="father_mobile" />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              }
              {/* Mother Details */}
              {
                <div className="mt-[20px] ">
                  <span className="font-black text-[18px] ">
                    {`Mother's Details`}
                  </span>
                  <div className=" border  p-6 rounded-2xl mt-3">
                    <div className="lg:flex w-[100%] gap-4">
                      <div className=" lg:w-[20%] w-[100%]  flex justify-center items-center ">
                        <div className="w-[200px] h-[200px] rounded-full ">
                          <div>
                            <img
                              src={"/images/user.png"}
                              alt="Picture of the author"
                              className="border rounded-full object-contain w-[200px] h-[200px]"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex  flex-wrap lg:w-[80%] w-[100%] gap-4">
                        <div className="lg:w-[66%] w-[100%]">
                          <Field
                            name="mother_name"
                            as={TextField}
                            label="Mother's Name"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={<ErrorMessage name="mother_name" />}
                          />
                        </div>

                        <div className="lg:w-[32%] w-[100%]">
                          <Field
                            name="mother_qualifications"
                            as={TextField}
                            select
                            label="Qualification"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="mother_qualifications" />
                            }
                          >
                            {Config?.qualifications?.map((option) => (
                              <MenuItem
                                key={option?.label}
                                value={option?.value}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="lg:w-[32%] w-[100%]">
                          <Field
                            name="mother_occupation"
                            as={TextField}
                            select
                            label="Occupation"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="mother_occupation" />
                            }
                          >
                            {Config.occupations.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="lg:w-[32.5%] w-[100%]">
                          <Field
                            name="mother_designation"
                            as={TextField}
                            label="Designation"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="mother_designation" />
                            }
                          />
                        </div>

                        <div className="lg:w-[32.5%] w-[100%]">
                          <Field
                            name="mother_org_name"
                            as={TextField}
                            label="Org Name"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={<ErrorMessage name="mother_org_name" />}
                          />
                        </div>
                        <div className="lg:w-[66%] w-[100%]">
                          <Field
                            name="mother_org_address"
                            as={TextField}
                            label="Org Address"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="mother_org_address" />
                            }
                          />
                        </div>
                        <div className="lg:w-[32%] w-[100%]">
                          <Field
                            name="mother_email"
                            as={TextField}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={<ErrorMessage name="mother_email" />}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="  flex-wrap flex mt-5  gap-4">
                      <div className="lg:w-[32.5%] w-[100%]">
                        <Field
                          name="mother_nationality"
                          as={TextField}
                          select
                          label="Nationality"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          value={values.mother_nationality}
                          helperText={
                            <ErrorMessage name="mother_nationality" />
                          }
                        >
                          {Config.Nationalities.map((option) => (
                            <MenuItem key={option?.label} value={option?.label}>
                              {option?.label}
                            </MenuItem>
                          ))}
                        </Field>
                      </div>
                      <div className="lg:w-[32.5%] w-[100%]">
                        <CountrySelect
                          name="mother_country"
                          label="Country"
                          value={values.mother_country}
                        />
                      </div>
                      <div className="lg:w-[32.5%] w-[100%]">
                        <StateSelect
                          name="mother_state"
                          label="Mother's State"
                          value={values.mother_state}
                          onChange={(event) => {
                            const selectedState = event.target.value;
                            setFieldValue("mother_state", selectedState);
                            setMotherState(selectedState);
                          }}
                        />
                      </div>
                      <div className="lg:w-[32.5%] w-[100%]">
                        <CitySelectMother
                          name="mother_city"
                          label="Mother's City"
                          value={values.mother_city}
                          state={motherState}
                        />
                      </div>
                      <div className="lg:w-[32.5%] w-[100%]">
                        <Field
                          name="mother_pincode"
                          as={TextField}
                          label="Pincode"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          helperText={<ErrorMessage name="mother_pincode" />}
                        />
                      </div>
                      <div className="lg:w-[32.5%] w-[100%]">
                        <Field
                          name="mother_annual_income"
                          as={TextField}
                          label="Annual Income"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          helperText={
                            <ErrorMessage name="mother_annual_income" />
                          }
                        />
                      </div>
                      {/* <div className="lg:w-[32.5%] w-[100%]">
                        <Field
                          name="mother_telephone"
                          as={TextField}
                          label="Telephone"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          helperText={<ErrorMessage name="mother_telephone" />}
                        />
                      </div> */}
                      <div className="lg:w-[32.5%] w-[100%]">
                        <Field
                          name="mother_mobile"
                          as={TextField}
                          label="Mobile"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          helperText={<ErrorMessage name="mother_mobile" />}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              }
              {/* Guardian Details */}
              {
                <div className="mt-[20px] ">
                  <span className="font-black text-[18px] ">
                    Guardian Details
                  </span>
                  <div className=" border  p-6 rounded-2xl mt-3">
                    <div className=" lg:flex w-[100%] gap-4">
                      <div className=" lg:w-[20%] w-[100%]  flex justify-center items-center ">
                        <div className="w-[200px] h-[200px] rounded-full ">
                          <div>
                            <img
                              src={"/images/user.png"}
                              alt="Picture of the author"
                              className="border rounded-full object-contain w-[200px] h-[200px]"
                            />
                            {/* <input
            type="file"
            className="border rounded-full"
            onChange={(event) => {
              setFieldValue('guardian_image', event.currentTarget.files[0]);
            }}
          /> */}
                            <ErrorMessage
                              name="guardian_image"
                              component="div"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex  flex-wrap lg:w-[80%] w-[100%] gap-4">
                        <div className="lg:lg:w-[49%] w-[100%]">
                          <Field
                            name="guardian_name"
                            as={TextField}
                            label="Guardian Name"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={<ErrorMessage name="guardian_name" />}
                          />
                        </div>
                        <div className="lg:w-[49%] w-[100%]">
                          <Field
                            name="guardian_relation"
                            as={TextField}
                            label="Relation"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="guardian_relation" />
                            }
                          />
                        </div>
                        <div className="lg:w-[49%] w-[100%]">
                          <Field
                            name="guardian_mobile_no"
                            as={TextField}
                            label="Mobile No"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="guardian_mobile_no" />
                            }
                          />
                        </div>
                        <div className="lg:w-[49%] w-[100%]">
                          <Field
                            name="guardian_email"
                            as={TextField}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={<ErrorMessage name="guardian_email" />}
                          />
                        </div>
                        <div className="lg:w-[49%] w-[100%]">
                          <Field
                            name="guardian_address"
                            as={TextField}
                            label="Address"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="guardian_address" />
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {/* Persent Address */}
              {
                <div className="mt-[20px] ">
                  <span className="font-black text-[18px] ">
                    Persent Address
                  </span>
                  <div className=" border  p-6 rounded-2xl mt-3">
                    <div className=" w-[100%] ">
                      <div className="w-[100%] mb-5">
                        <Field
                          name="present_address"
                          as={TextField}
                          label="Persent Address"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          error={false}
                          helperText={<ErrorMessage name="present_address" />}
                        />
                      </div>
                      <div className="flex  flex-wrap gap-4">
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <CountrySelect
                            name="present_country"
                            label="Country"
                            value={values.present_country}
                          />
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          {
                            <Field
                              name="present_state"
                              as={TextField}
                              select
                              label="State"
                              variant="outlined"
                              fullWidth
                              onBlur={handleBlur}
                              onChange={(event) => {
                                const selectedState = event.target.value;
                                setFieldValue("present_state", selectedState);
                                setPresentState(selectedState);
                              }}
                              error={false}
                              value={values.present_state}
                              helperText={<ErrorMessage name="present_state" />}
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
                            name="present_city"
                            as={TextField}
                            select
                            label="City"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.present_city}
                            helperText={<ErrorMessage name="present_city" />}
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
                            name="present_pincode"
                            as={TextField}
                            label="Pincode"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={<ErrorMessage name="present_pincode" />}
                          />
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="present_locality"
                            as={TextField}
                            label="Locality"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="present_locality" />
                            }
                          />
                        </div>
                        {/* <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="present_telephone"
                            as={TextField}
                            label="Telephone"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="present_telephone" />
                            }
                          />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              }
              {/* Permanent Address */}
              {
                <div className="mt-[20px] mb-[60px]">
                  <div className="flex items-center gap-3">
                    <span className="font-black text-[18px] ">
                      Permanent Address
                    </span>
                    <div className="flex items-center">
                      <Checkbox
                        value={confirmAddress}
                        onChange={() => setConfrimAddress(!confirmAddress)}
                      />
                      <Typography variant="h6" fontWeight={"bold"}>
                        Same as Present Address
                      </Typography>
                    </div>
                  </div>
                  <div className=" border  p-6 rounded-2xl mt-3">
                    <div className=" w-[100%] ">
                      <div className="w-[100%] mb-5">
                        <Field
                          name="permanent_address"
                          as={TextField}
                          label="Persent Address"
                          variant="outlined"
                          fullWidth
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={
                            !confirmAddress
                              ? values?.permanent_address
                              : values.present_address
                          }
                          error={false}
                          helperText={<ErrorMessage name="permanent_address" />}
                        />
                      </div>
                      <div className="flex  flex-wrap gap-4">
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <CountrySelect
                            name="permanent_country"
                            label="Country"
                            value={values.permanent_country}
                          />
                        </div>

                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="permanent_state"
                            as={TextField}
                            select
                            label="State"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={
                              confirmAddress
                                ? values.present_state
                                : values.permanent_state
                            }
                            helperText={<ErrorMessage name="permanent_state" />}
                          >
                            {allState?.length > 0 &&
                              allState.map((option) => (
                                <MenuItem key={option.name} value={option.name}>
                                  {option.name}
                                </MenuItem>
                              ))}
                          </Field>
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="permanent_city"
                            as={TextField}
                            select
                            label="City"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={
                              confirmAddress
                                ? values.present_city
                                : values.permanent_city
                            }
                            helperText={<ErrorMessage name="permanent_city" />}
                          >
                            {allcity?.length > 0 &&
                              allcity.map((option) => (
                                <MenuItem key={option} value={option}>
                                  {option}
                                </MenuItem>
                              ))}
                          </Field>
                        </div>
                        {/* <div className="lg:w-[32.5%]  w-[100%]">
                    <Field
                      name="permanent_country"
                      as={TextField}
                      label="Country"
                      variant="outlined"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      error={false}
                      value={
                        !confirmAddress
                          ? values?.permanent_country
                          : values.present_country
                      }
                      helperText={<ErrorMessage name="permanent_country" />}
                    />
                  </div> */}
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="permanent_pincode"
                            as={TextField}
                            label="Pincode"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={
                              !confirmAddress
                                ? values?.permanent_pincode
                                : values.present_pincode
                            }
                            error={false}
                            helperText={
                              <ErrorMessage name="permanent_pincode" />
                            }
                          />
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="permanent_locality"
                            as={TextField}
                            label="Locality"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={
                              !confirmAddress
                                ? values?.permanent_locality
                                : values.present_locality
                            }
                            helperText={
                              <ErrorMessage name="permanent_locality" />
                            }
                          />
                        </div>
                        {/* <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="permanent_telephone"
                            as={TextField}
                            label="Telephone"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={
                              !confirmAddress
                                ? values?.permanent_telephone
                                : values.present_telephone
                            }
                            error={false}
                            helperText={
                              <ErrorMessage name="permanent_telephone" />
                            }
                          />
                        </div> */}
                      </div>
                    </div>
                  </div>
                </div>
              }
              {/* Other Details */}
              {
                <div className="mt-[20px] ">
                  <span className="font-black text-[18px] ">Other Details</span>
                  <div className=" border  p-6 rounded-2xl mt-3">
                    <div className=" w-[100%] ">
                      <div className="flex  flex-wrap gap-4">
                        <div className="lg:w-[32.5%] w-[100%] ">
                          <Field
                            name="any_physical_disability"
                            as={TextField}
                            select
                            label="Any Physical Disability"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.any_physical_disability}
                            helperText={
                              <ErrorMessage name="any_physical_disability" />
                            }
                          >
                            {Config?.TrueFalse.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="w-[100%] lg:w-[32.5%]">
                          <Field
                            name="any_treatment_undertaken"
                            as={TextField}
                            select
                            label="Any Treatment Undertak/Required"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.any_treatment_undertaken}
                            helperText={
                              <ErrorMessage name="any_treatment_undertaken" />
                            }
                          >
                            {Config?.TrueFalse.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="w-[100%] lg:w-[32.5%] mb-2 ">
                          <Field
                            name="any_allergies"
                            as={TextField}
                            select
                            label="Any Allergies"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.any_allergies}
                            helperText={<ErrorMessage name="any_allergies" />}
                          >
                            {Config?.TrueFalse.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                      </div>
                      <div className="flex  flex-wrap gap-4">
                        <div className="lg:w-[32.5%] w-[100%] ">
                          <Field
                            name="interest_hobbies"
                            as={TextField}
                            label="Interest And Hobbies"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="interest_hobbies" />
                            }
                          />
                        </div>
                        <div className="w-[100%] lg:w-[32.5%] ">
                          <Field
                            name="sports_game"
                            as={TextField}
                            label="Sports/Games"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={<ErrorMessage name="sports_game" />}
                          />
                        </div>
                        <div className="w-[100%] lg:w-[32.5%] ">
                          <Field
                            name="co_curriclar_activities"
                            as={TextField}
                            label="Co-Curriclar Activities"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="co_curriclar_activities" />
                            }
                          />
                        </div>
                        <div className="w-[100%] lg:w-[32.5%] ">
                          <Field
                            name="any_other_relevent_information"
                            as={TextField}
                            label="Any Other Relevent Information"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="any_other_relevent_information" />
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {/* Previous details */}
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
                        <Typography
                          className="text-red-500 font-bold"
                          style={{ fontWeight: "bold" }}
                        >
                          DETAILS OF THE PERFORMANCE OF THE CHILD IN THE
                          PREVIOUS YEARS(NOT APPLICABLE FOR NUR & PREP & I)
                        </Typography>
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
              {/* Previous Schoole details */}
              {false && (
                <div className="mt-[20px] ">
                  <span className="font-black text-[18px] ">
                    Marks Grades Obtained In The Previous School
                  </span>
                  <div className=" border  p-6 rounded-2xl mt-3">
                    <div className=" lg:flex w-[100%] gap-4">
                      <div className="flex  flex-wrap lg:w-[100%] w-[100%] gap-4">
                        <TableContainer sx={{ overflowX: "auto" }}>
                          <Table aria-label="collapsible table">
                            <TableHead>
                              <TableRow
                                style={{ fontWeight: "500", color: "#000" }}
                              >
                                <StyledTableCell align="center">
                                  Subjects
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Max. Marks
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Marks Obatined
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Grade
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  %
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody
                              style={{
                                height: "auto",
                                position: "relative",
                              }}
                            >
                              <>
                                {[
                                  "ENGLISH",
                                  "HINDI",
                                  "MATHEMATICS",
                                  "SCIENCE",
                                  "SOCIAL SCIENCE",
                                  "Total",
                                ]?.map((row, index) => (
                                  <RowPre
                                    key={index}
                                    row={row}
                                    index={index}
                                    router={router}
                                    values={values}
                                  />
                                ))}
                              </>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Prebaord details */}
              {false && (
                <div className="mt-[20px] ">
                  <span className="font-black text-[18px] ">
                    Pre Board Details
                  </span>
                  <div className=" border  p-6 rounded-2xl mt-3">
                    <div className=" lg:flex w-[100%] gap-4">
                      <div className="flex  flex-wrap lg:w-[100%] w-[100%] gap-4">
                        <TableContainer sx={{ overflowX: "auto" }}>
                          <Table aria-label="collapsible table">
                            <TableHead>
                              <TableRow
                                style={{ fontWeight: "500", color: "#000" }}
                              >
                                <StyledTableCell align="center">
                                  Subjects
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Max. Marks
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Marks Obatined
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Grade
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  %
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody
                              style={{
                                height: "auto",
                                position: "relative",
                              }}
                            >
                              <>
                                {[
                                  "ENGLISH",
                                  "HINDI",
                                  "MATHEMATICS",
                                  "SCIENCE",
                                  "SOCIAL SCIENCE",
                                  "Total",
                                ]?.map((row, index) => (
                                  <RowPreBoard
                                    key={index}
                                    row={row}
                                    index={index}
                                    router={router}
                                  />
                                ))}
                              </>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Board details */}
              {false && (
                <div className="mt-[20px] ">
                  <span className="font-black text-[18px] ">Board Details</span>
                  <div className=" border  p-6 rounded-2xl mt-3">
                    <div className=" lg:flex w-[100%] gap-4">
                      <div className="flex  flex-wrap lg:w-[100%] w-[100%] gap-4">
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="board_details"
                            as={TextField}
                            select
                            label="Board"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.board_details}
                            helperText={<ErrorMessage name="board_details" />}
                          >
                            {Config.Boards.map((option) => (
                              <MenuItem
                                key={option?.value}
                                value={option?.value}
                              >
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>

                        <TableContainer sx={{ overflowX: "auto" }}>
                          <Table aria-label="collapsible table">
                            <TableHead>
                              <TableRow
                                style={{ fontWeight: "500", color: "#000" }}
                              >
                                <StyledTableCell align="center">
                                  Subjects
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Max. Marks
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Marks Obatined
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  Grade
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                  %
                                </StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody
                              style={{
                                height: "auto",
                                position: "relative",
                              }}
                            >
                              <>
                                {[
                                  "ENGLISH",
                                  "HINDI",
                                  "MATHEMATICS",
                                  "SCIENCE",
                                  "SOCIAL SCIENCE",
                                  "Economic/Computer/Other",
                                  "Second Language(Hindi)",
                                  "Total",
                                ]?.map((row, index) => (
                                  <RowBoard
                                    key={index}
                                    row={row}
                                    index={index}
                                    router={router}
                                  />
                                ))}
                              </>
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Stream Details */}
              {
                <div className="mt-[20px] ">
                  <span className="font-black text-[18px] ">
                    Stream Details
                  </span>
                  <div className=" border  p-6 rounded-2xl mt-3">
                    <div className=" w-[100%] ">
                      <div className="flex  flex-wrap gap-4">
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="stream_details"
                            as={TextField}
                            select
                            label="Stream"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.stream_details}
                            helperText={<ErrorMessage name="stream_details" />}
                          >
                            {Config.StreamList.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="stream_common_subject"
                            as={TextField}
                            select
                            label="Common Subject"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.stream_common_subject}
                            helperText={
                              <ErrorMessage name="stream_common_subject" />
                            }
                          >
                            {Config.StreamList.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="stream_group1"
                            as={TextField}
                            select
                            label="Group 1"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.stream_group1}
                            helperText={<ErrorMessage name="stream_group1" />}
                          >
                            {Config.StreamList.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="stream_group2"
                            as={TextField}
                            select
                            label="Group 2"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.stream_group2}
                            helperText={<ErrorMessage name="stream_group2" />}
                          >
                            {Config.StreamList.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="stream_group3"
                            as={TextField}
                            select
                            label="Group 3"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.stream_group3}
                            helperText={<ErrorMessage name="stream_group3" />}
                          >
                            {Config.StreamList.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="stream_group4"
                            as={TextField}
                            select
                            label="Group 4"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.stream_group4}
                            helperText={<ErrorMessage name="stream_group4" />}
                          >
                            {Config.StreamList.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="lg:w-[32.5%]  w-[100%]">
                          <Field
                            name="stream_group5"
                            as={TextField}
                            select
                            label="Group 5"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.stream_group5}
                            helperText={<ErrorMessage name="stream_group5" />}
                          >
                            {Config.StreamList.map((option) => (
                              <MenuItem key={option} value={option}>
                                {option}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {/* Document Upload */}
              {false && (
                <div className="mt-[20px] ">
                  <span className="font-black text-[18px] ">
                    Documents Upload
                  </span>
                  <div className=" border  p-6 rounded-2xl mt-3">
                    <TableContainer sx={{ overflowX: "auto" }}>
                      <Table aria-label="collapsible table">
                        <TableHead>
                          <TableRow
                            style={{ fontWeight: "500", color: "#000" }}
                          >
                            <StyledTableCell align="center">
                              Sl.No
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Name
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              Select
                            </StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                            <StyledTableCell align="center"></StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody
                          style={{
                            height: "auto",
                            position: "relative",
                          }}
                        >
                          <>
                            {[
                              "DOB CERTIFICATE",
                              "AADHAR CARD",
                              "STUDENT REPORT CARD",
                              "FATHER ID PRROF",
                              "MOTHER ID PROOF",
                              "HEALTH RECORD",
                              "TERM AND REPORT",
                              "ADMISSION FORM",
                            ]?.map((row, index) => (
                              <Row1
                                key={index}
                                row={row}
                                index={index}
                                router={router}
                              />
                            ))}
                          </>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </div>
                </div>
              )}
              {/* Sibling Details */}
              {
                <div className="mt-[20px] ">
                  <span className="font-black text-[18px] ">
                    Details Of Sibling Studying in The Institution
                  </span>
                  <div className=" border  p-6 rounded-2xl mt-3">
                    <div className="flex items-center justify-center gap-4">
                      <Typography>Any Sibling in this School?</Typography>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <div className=" w-[100%] ">
                      <div className="flex  flex-wrap gap-4">
                        <div className="lg:w-[32.5%] w-[100%] mb-5">
                          <Field
                            name="sibling_same_inst_admission_no1"
                            as={TextField}
                            label="Admission No"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="sibling_same_inst_admission_no1" />
                            }
                          />
                        </div>
                        <div className="w-[100%] lg:w-[32.5%] mb-5">
                          <Field
                            name="sibling_same_inst_name1"
                            as={TextField}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="sibling_same_inst_name1" />
                            }
                          />
                        </div>
                        <div className="w-[100%] lg:w-[15.5%]  mb-5">
                          <Field
                            name="sibling_same_inst_class1"
                            as={TextField}
                            select
                            label="Class"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.sibling_same_inst_class1}
                            helperText={
                              <ErrorMessage name="sibling_same_inst_class1" />
                            }
                          >
                            {Config.ClassList.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="w-[100%] lg:w-[15.5%]  mb-5">
                          <Field
                            name="sibling_same_inst_section1"
                            as={TextField}
                            select
                            label="Section"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.sibling_same_inst_section1}
                            helperText={
                              <ErrorMessage name="sibling_same_inst_section1" />
                            }
                          >
                            {Config.SectionList.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                      </div>
                      <div className="flex  flex-wrap gap-4">
                        <div className="lg:w-[32.5%] w-[100%] mb-5">
                          <Field
                            name="sibling_same_inst_admission_no2"
                            as={TextField}
                            label="Admission No"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="sibling_same_inst_admission_no2" />
                            }
                          />
                        </div>
                        <div className="w-[100%] lg:w-[32.5%] mb-5">
                          <Field
                            name="sibling_same_inst_name2"
                            as={TextField}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="sibling_same_inst_name2" />
                            }
                          />
                        </div>
                        {/* <div className="w-[100%] lg:w-[32.5%]  mb-5">
                          <Field
                            name="sibling_same_inst_class_section2"
                            as={TextField}
                            label="Class & Section"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="sibling_same_inst_class_section2" />
                            }
                          />
                        </div> */}
                        <div className="w-[100%] lg:w-[15.5%]  mb-5">
                          <Field
                            name="sibling_same_inst_class2"
                            as={TextField}
                            select
                            label="Class"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.sibling_same_inst_class2}
                            helperText={
                              <ErrorMessage name="sibling_same_inst_class2" />
                            }
                          >
                            {Config.ClassList.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="w-[100%] lg:w-[15.5%]  mb-5">
                          <Field
                            name="sibling_same_inst_section2"
                            as={TextField}
                            select
                            label="Section"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.sibling_same_inst_section2}
                            helperText={
                              <ErrorMessage name="sibling_same_inst_section2" />
                            }
                          >
                            {Config.SectionList.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              }
              {/* Sibling Details other */}
              {
                <div className="mt-[20px] ">
                  <span className="font-black text-[18px] ">
                    Details Of Sibling Studying in Other Institution
                  </span>
                  <div className=" border  p-6 rounded-2xl mt-3">
                    <div className="flex items-center justify-center gap-4">
                      <Typography>Any Sibling in this School?</Typography>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                        >
                          <FormControlLabel
                            value="female"
                            control={<Radio />}
                            label="Yes"
                          />
                          <FormControlLabel
                            value="male"
                            control={<Radio />}
                            label="No"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <div className=" w-[100%] ">
                      <div className="flex  flex-wrap gap-4">
                        <div className="lg:w-[32.5%] w-[100%] mb-5">
                          <Field
                            name="sibling_other_inst_admission_no1"
                            as={TextField}
                            label="Admission No"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="sibling_other_inst_admission_no1" />
                            }
                          />
                        </div>
                        <div className="w-[100%] lg:w-[32.5%] mb-5">
                          <Field
                            name="sibling_other_inst_name1"
                            as={TextField}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="sibling_other_inst_name1" />
                            }
                          />
                        </div>
                        {/* <div className="w-[100%] lg:w-[32.5%]  mb-5">
                          <Field
                            name="sibling_other_inst_class_section1"
                            as={TextField}
                            label="Class & Section"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="sibling_other_inst_class_section1" />
                            }
                          />
                        </div> */}
                        <div className="w-[100%] lg:w-[15.5%]  mb-5">
                          <Field
                            name="sibling_other_inst_class1"
                            as={TextField}
                            select
                            label="Class"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.sibling_other_inst_class1}
                            helperText={
                              <ErrorMessage name="sibling_other_inst_class1" />
                            }
                          >
                            {Config.ClassList.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="w-[100%] lg:w-[15.5%]  mb-5">
                          <Field
                            name="sibling_other_inst_section1"
                            as={TextField}
                            select
                            label="Section"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.sibling_other_inst_section1}
                            helperText={
                              <ErrorMessage name="sibling_other_inst_section1" />
                            }
                          >
                            {Config.SectionList.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                      </div>
                      <div className="flex  flex-wrap gap-4">
                        <div className="lg:w-[32.5%] w-[100%] mb-5">
                          <Field
                            name="sibling_other_inst_admission_no2"
                            as={TextField}
                            label="Admission No"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="sibling_other_inst_admission_no2" />
                            }
                          />
                        </div>
                        <div className="w-[100%] lg:w-[32.5%] mb-5">
                          <Field
                            name="sibling_other_inst_name2"
                            as={TextField}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="sibling_other_inst_name2" />
                            }
                          />
                        </div>
                        {/* <div className="w-[100%] lg:w-[32.5%]  mb-5">
                          <Field
                            name="sibling_other_inst_class_section2"
                            as={TextField}
                            label="Class & Section"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            helperText={
                              <ErrorMessage name="sibling_other_inst_class_section2" />
                            }
                          />
                        </div> */}
                        <div className="w-[100%] lg:w-[15.5%]  mb-5">
                          <Field
                            name="sibling_other_inst_class_2"
                            as={TextField}
                            select
                            label="Class"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.sibling_other_inst_class_2}
                            helperText={
                              <ErrorMessage name="sibling_other_inst_class_2" />
                            }
                          >
                            {Config.ClassList.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
                        <div className="w-[100%] lg:w-[15.5%]  mb-5">
                          <Field
                            name="sibling_other_inst_section2"
                            as={TextField}
                            select
                            label="Section"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            onChange={handleChange}
                            error={false}
                            value={values.sibling_other_inst_section2}
                            helperText={
                              <ErrorMessage name="sibling_other_inst_section2" />
                            }
                          >
                            {Config.SectionList.map((option) => (
                              <MenuItem key={option.label} value={option.label}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Field>
                        </div>
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
              <div className="flex justify-end mr-12 my-5 ">
                <CustomButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  // onClick={handleSubmit}
                  // disabled={isSubmitting}
                  className="bg-blue-500 py-1 px-5"
                  sx={{ py: 1, px: 5, fontWeight: "bold", fontSize: "16px" }}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </CustomButton>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </SimpleModal>
  );
};

export default StudentRegistration;

const Row = (props) => {
  const { row, index } = props;
  const [open, setOpen] = useState(false);

  const getSubjectKey = (subject) => {
    return subject.toLowerCase().replace(" ", "_");
  };

  const subjectKey = getSubjectKey(row);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            background: open ? "#E5EFFC" : "",
            fontWeight: "600",
            color: "#000",
            overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`subject_${subjectKey}_max_marks`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`subject_${subjectKey}_marks_obtained`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`subject_${subjectKey}_grade`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`subject_${subjectKey}_percentage`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};
const RowPre = (props) => {
  const { row, index } = props;
  const [open, setOpen] = useState(false);

  const getSubjectKey = (subject) => {
    return subject.toLowerCase().replace(" ", "_");
  };

  const subjectKey = getSubjectKey(row);
  console.log(subjectKey);
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            background: open ? "#E5EFFC" : "",
            fontWeight: "600",
            color: "#000",
            overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`pre_subject_${subjectKey}_max_marks`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`pre_subject_${subjectKey}_marks_obtained`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`pre_subject_${subjectKey}_grade`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`pre_subject_${subjectKey}_percentage`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};
const RowPreBoard = (props) => {
  const { row, index } = props;
  const [open, setOpen] = useState(false);

  const getSubjectKey = (subject) => {
    return subject.toLowerCase().replace(" ", "_");
  };

  const subjectKey = getSubjectKey(row);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            background: open ? "#E5EFFC" : "",
            fontWeight: "600",
            color: "#000",
            overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`pre_Board_subject_${subjectKey}_max_marks`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`pre_Board_subject_${subjectKey}_marks_obtained`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`pre_Board_subject_${subjectKey}_grade`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>

        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`pre_Board_subject_${subjectKey}_percentage`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};
const RowBoard = (props) => {
  const { row, index } = props;
  const [open, setOpen] = useState(false);

  const getSubjectKey = (subject) => {
    return subject.toLowerCase().replace(" ", "_");
  };

  const subjectKey = getSubjectKey(row);

  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            background: open ? "#E5EFFC" : "",
            fontWeight: "600",
            color: "#000",
            overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`Board_subject_${subjectKey}_max_marks`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`Board_subject_${subjectKey}_marks_obtained`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`Board_subject_${subjectKey}_grade`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>

        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Field
            name={`Board_subject_${subjectKey}_percentage`}
            as={TextField}
            variant="outlined"
            fullWidth
          />
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};
const Row1 = (props) => {
  const { row, salonDetails, setSalonDetails, index, router } = props;
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <React.Fragment>
      <TableRow
        sx={{
          "& > *": {
            borderBottom: "unset",
            background: open ? "#E5EFFC" : "",
            fontWeight: "600",
            color: "#000",
            overflow: "scroll",
            cursor: "pointer",
          },
        }}
      >
        <StyledTableCell align="center" style={{ minWidth: "150px" }}>
          <Typography>{index + 1}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "100px" }}>
          <Typography>{row}</Typography>
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Checkbox {...label} />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <input type="file" />
        </StyledTableCell>
        <StyledTableCell align="center" style={{ minWidth: "200px" }}>
          <Typography>View</Typography>
        </StyledTableCell>
      </TableRow>
    </React.Fragment>
  );
};

import CustomButton from "@/components/CommonButton/CustomButton";
import SubmitButton from "@/components/CommonButton/SubmitButton";
import {
  DatePickerField,
  SelectField,
  TextFieldComponent,
} from "@/components/FormikComponent";
import {
  GetAccountTypeList,
  GetDepartmentList,
  GetDesignationList,
  GetEducationalQualificationList,
  GetNatureOfAppointmentList,
  GetOccupationList,
  GetStaffCategoryList,
  GetSubjectList,
  UpdateStaffDetails,
} from "@/services/api";
import Config from "@/utilities/Config";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { Field, Form, Formik, useField } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";

const PayInformation = ({ data, setSlectedTab, staffRefetch }) => {
  const [valuesRadio, setValuesRadio] = useState({
    salaryGenApplicable: "Yes",
    employeePfLimit: "Yes",
    employerPfLimit: "Yes",
    taxRegion: "Yes",
    employeePensionLimit: "Yes",
  });

  console.log(valuesRadio, "--valuesRadio");

  const router = useRouter();
  const id = router?.query?.id;

  const { data: AccountTyepData } = useQuery("GetAccountTypeList", async () => {
    const res = await GetAccountTypeList();
    return res?.data;
  });

  const { data: StaffCategoryData } = useQuery(
    "GetStaffCategoryList",
    async () => {
      const res = await GetStaffCategoryList();
      return res?.data;
    }
  );

  const { data: StaffDepartmentData } = useQuery(
    "GetDepartmentList",
    async () => {
      const res = await GetDepartmentList();
      return res?.data;
    }
  );

  const { data: StaffDesignationData } = useQuery(
    "GetDesignationList",
    async () => {
      const res = await GetDesignationList();
      return res?.data;
    }
  );

  const { data: StaffQualificationData } = useQuery(
    "GetEducationalQualificationList",
    async () => {
      const res = await GetEducationalQualificationList();
      return res?.data;
    }
  );

  const { data: StaffNatureOfAppointmentData } = useQuery(
    "GetNatureOfAppointmentList",
    async () => {
      const res = await GetNatureOfAppointmentList();
      return res?.data;
    }
  );

  const { data: StaffOccupationData } = useQuery(
    "GetOccupationList",
    async () => {
      const res = await GetOccupationList();
      return res?.data;
    }
  );
  const { data: StaffSubjectData } = useQuery("GetSubjectList", async () => {
    const res = await GetSubjectList();
    return res?.data;
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValuesRadio({
      ...valuesRadio,
      [name]: value,
    });
  };

  const initialValues = {
    designation: data?.payInfo?.designation || "",
    designationDate: dayjs(data?.payInfo?.designationDate) || dayjs(new Date()),
    school_name: data?.payInfo?.school_name || "",
    department: data?.payInfo?.department || "",
    departmentDate: dayjs(data?.payInfo?.departmentDate) || dayjs(new Date()),
    payment: data?.payInfo?.payment || "",
    appointmentDate: dayjs(data?.payInfo?.appointmentDate) || dayjs(new Date()),
    bank: data?.payInfo?.bank || "",
    confirmation_date:
      dayjs(data?.payInfo?.confirmation_date) || dayjs(new Date()),
    bank_account_no: data?.payInfo?.bank_account_no || "",
    saving_bank_name: data?.payInfo?.saving_bank_name || "",
    bank_ifsc_code: data?.payInfo?.bank_ifsc_code || "",
    probation_upto: dayjs(data?.payInfo?.probation_upto) || dayjs(new Date()),
    org_name_in_form_16: data?.payInfo?.org_name_in_form_16 || "",
    nature_of_appointment: data?.payInfo?.nature_of_appointment || "",
    nature_of_appointment_date:
      dayjs(data?.payInfo?.nature_of_appointment_date) || dayjs(new Date()),
    leave_category: data?.payInfo?.leave_category || "",
    staff_category: data?.payInfo?.staff_category || "",
    staff_category_date:
      dayjs(data?.payInfo?.staff_category_date) || dayjs(new Date()),
    vol_pf: data?.payInfo?.vol_pf || "",
    pf_no: data?.payInfo?.pf_no || "",
    pension_no: data?.payInfo?.pension_no || "",
    uan_no: data?.payInfo?.uan_no || "",
    pan_no: data?.payInfo?.pan_no || "",
    esi_no: data?.payInfo?.esi_no || "",
    date_of_leaving: dayjs(data?.payInfo?.date_of_leaving) || dayjs(new Date()),
    calculation_mode: data?.payInfo?.calculation_mode || "",
    increment_date: dayjs(data?.payInfo?.increment_date) || dayjs(new Date()),
    salary_upto: dayjs(data?.payInfo?.salary_upto) || dayjs(new Date()),
    pay_scale: data?.payInfo?.pay_scale || "",
    pay_scale_date: dayjs(data?.payInfo?.pay_scale_date) || dayjs(new Date()),
    reason: data?.payInfo?.reason || "",
    grade_pay: data?.payInfo?.grade_pay || "",
    grade_pay_date: dayjs(data?.payInfo?.grade_pay_date) || dayjs(new Date()),
    leaving_remark: data?.payInfo?.leaving_remark || "",
    basic_pay: data?.payInfo?.basic_pay || "",
    basic_pay_date: dayjs(data?.payInfo?.basic_pay_date) || dayjs(new Date()),
    gross: data?.payInfo?.gross || "",
    net_pay: data?.payInfo?.net_pay || "",
    pf_type: data?.payInfo?.pf_type || "",
    pf_joining_date: dayjs(data?.payInfo?.pf_joining_date) || dayjs(new Date()),
    salaryGenApplicable: "",
    employeePfLimit: "",
    employerPfLimit: "",
    taxRegion: "",
    employeePensionLimit: "",
  };

  console.log(initialValues, "initialValues");
  const validationSchema = Yup.object({
    designation: Yup.string().required("Designation is required"),
    designationDate: Yup.date().required("Designation Date is required"),
    school_name: Yup.string().required("School Name is required"),
    department: Yup.string().required("Department is required"),
    departmentDate: Yup.date().required("Department Date is required"),
    payment: Yup.string().required("Payment is required"),
    appointmentDate: Yup.date().required("Appointment Date is required"),
    bank: Yup.string().required("Bank is required"),
    confirmation_date: Yup.date().required("Confirmation Date is required"),
    bank_account_no: Yup.string().required("Bank Account No is required"),
    saving_bank_name: Yup.string().required("Saving Bank Name is required"),
    bank_ifsc_code: Yup.string().required("Bank IFSC Code is required"),
    probation_upto: Yup.date().required("Probation Upto is required"),
    org_name_in_form_16: Yup.string().required(
      "Org Name in Form 16 is required"
    ),
    nature_of_appointment: Yup.string().required(
      "Nature Of Appointment is required"
    ),
    nature_of_appointment_date: Yup.date().required(
      "Nature Of Appointment Date is required"
    ),
    leave_category: Yup.string().required("Leave Category is required"),
    staff_category: Yup.string().required("Staff Category is required"),
    staff_category_date: Yup.date().required("Staff Category Date is required"),
    vol_pf: Yup.string().required("Vol PF is required"),
    pf_no: Yup.string().required("PF No is required"),
    pension_no: Yup.string().required("Pension No is required"),
    uan_no: Yup.string().required("UAN No is required"),
    pan_no: Yup.string().required("Pan No is required"),
    esi_no: Yup.string().required("ESI No is required"),
    date_of_leaving: Yup.date().required("Date Of Leaving is required"),
    calculation_mode: Yup.string().required("Calculation Mode is required"),
    increment_date: Yup.date().required("Increment Date is required"),
    salary_upto: Yup.date().required("Salary Upto is required"),
    pay_scale: Yup.string().required("Pay Scale is required"),
    pay_scale_date: Yup.date().required("Pay Scale Date is required"),
    reason: Yup.string().required("Reason is required"),
    grade_pay: Yup.string().required("Grade Pay is required"),
    grade_pay_date: Yup.date().required("Grade Pay Date is required"),
    leaving_remark: Yup.string().required("Leaving Remark is required"),
    basic_pay: Yup.string().required("Basic Pay is required"),
    basic_pay_date: Yup.date().required("Basic Pay Date is required"),
    gross: Yup.string().required("Gross is required"),
    net_pay: Yup.string().required("Net Pay is required"),
    pf_type: Yup.string().required("PF Type is required"),
    pf_joining_date: Yup.date().required("PF Joining Date is required"),
  });

  const fields = [
    {
      id: "designation",
      label: "Designation",
      name: "designation",
      component: SelectField,
      options: StaffDesignationData,
    },
    {
      id: "designationDate",
      label: "Designation Date",
      name: "designationDate",
      component: DatePickerField,
    },
    {
      id: "school_name",
      label: "School Name",
      name: "school_name",
      component: TextFieldComponent,
    },
    {
      id: "department",
      label: "Department",
      name: "department",
      component: SelectField,
      options: StaffDepartmentData,
    },
    {
      id: "departmentDate",
      label: "Department Date",
      name: "departmentDate",
      component: DatePickerField,
    },
    {
      id: "payment",
      label: "Payment",
      name: "payment",
      component: SelectField,
      options: Config.PaymentTypes,
    },
    {
      id: "appointmentDate",
      label: "Appointment Date",
      name: "appointmentDate",
      component: DatePickerField,
    },
    {
      id: "bank",
      label: "Bank",
      name: "bank",
      component: TextFieldComponent,
    },
    {
      id: "confirmation_date",
      label: "Confirmation Date",
      name: "confirmation_date",
      component: DatePickerField,
    },
    {
      id: "bank_account_no",
      label: "Bank Account No",
      name: "bank_account_no",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "saving_bank_name",
      label: "Saving Bank Name",
      name: "saving_bank_name",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "bank_ifsc_code",
      label: "Bank IFSC Code",
      name: "bank_ifsc_code",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "probation_upto",
      label: "Probation Upto",
      name: "probation_upto",
      component: DatePickerField,
    },
    {
      id: "org_name_in_form_16",
      label: "Org name in Form 16",
      name: "org_name_in_form_16",
      // component: SelectField,
      // options: Config.genders,
      component: TextFieldComponent,
    },
    {
      id: "nature_of_appointment",
      label: "Nature Of Appointment",
      name: "nature_of_appointment",
      component: SelectField,
      options: StaffNatureOfAppointmentData,
    },
    {
      id: "nature_of_appointment_date",
      label: "Nature Of Appointment Date",
      name: "nature_of_appointment_date",
      component: DatePickerField,
    },
    {
      id: "leave_category",
      label: "Leave Category",
      name: "leave_category",
      component: SelectField,
      options: Config.AttendanceType,
    },
    {
      id: "staff_category",
      label: "Staff Category",
      name: "staff_category",
      component: SelectField,
      options: StaffCategoryData,
    },
    {
      id: "staff_category_date",
      label: "Staff Category Date",
      name: "staff_category_date",
      component: DatePickerField,
    },
    {
      id: "vol_pf",
      label: "Vol PF",
      name: "vol_pf",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "pf_no",
      label: "PF No",
      name: "pf_no",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "pension_no",
      label: "Pension No",
      name: "pension_no",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "uan_no",
      label: "UAN No",
      name: "uan_no",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "pan_no",
      label: "Pan No",
      name: "pan_no",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "esi_no",
      label: "ESI No",
      name: "esi_no",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "date_of_leaving",
      label: "Date Of Leaving",
      name: "date_of_leaving",
      component: DatePickerField,
    },
    {
      id: "calculation_mode",
      label: "Calculation Mode",
      name: "calculation_mode",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "increment_date",
      label: "Increment Date",
      name: "increment_date",
      component: DatePickerField,
    },
    {
      id: "salary_upto",
      label: "Salary Upto",
      name: "salary_upto",
      component: DatePickerField,
    },
    {
      id: "pay_scale",
      label: "Pay Scale",
      name: "pay_scale",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "pay_scale_date",
      label: "Pay Scale Date",
      name: "pay_scale_date",
      component: DatePickerField,
    },
    {
      id: "reason",
      label: "Reason",
      name: "reason",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "grade_pay",
      label: "Grade Pay",
      name: "grade_pay",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "grade_pay_date",
      label: "Grade Pay Date",
      name: "grade_pay_date",
      component: DatePickerField,
    },
    {
      id: "leaving_remark",
      label: "Leaving Remark",
      name: "leaving_remark",
      component: TextFieldComponent,
    },
    {
      id: "basic_pay",
      label: "Basic Pay",
      name: "basic_pay",
      component: TextFieldComponent,
    },
    {
      id: "basic_pay_date",
      label: "Basic Pay Date",
      name: "basic_pay_date",
      component: DatePickerField,
    },
    {
      id: "gross",
      label: "Gross",
      name: "gross",
      component: TextFieldComponent,
    },
    {
      id: "net_pay",
      label: "Net Pay",
      name: "net_pay",
      component: TextFieldComponent,
    },
    {
      id: "pf_type",
      label: "Pf Type",
      name: "pf_type",
      component: SelectField,
      options: Config.genders,
    },
    {
      id: "pf_joining_date",
      label: "Pf Joining Date",
      name: "pf_joining_date",
      component: DatePickerField,
    },
  ];

  const handleSubmit = async (values, actions) => {
    if (!id) {
      toast.warning("Please fill in the basic information first.");
      return;
    }
    const payload = {
      id: id,
      tab: 2,
      ...values,
      valuesRadio,
    };

    try {
      const resp = await UpdateStaffDetails(payload);
      if (resp?.success) {
        toast.success("Staff updated successfully.");
        actions.resetForm();
        staffRefetch();
        setSlectedTab(3);
      } else {
        toast.error("Failed to update staff.");
      }
    } catch (error) {
      toast.error("Failed to update staff.");
      console.error("Error updating staff:", error);
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
            <Box className="flex w-[100%] flex-wrap mt-7">
              {fields.map((field) => (
                <Box key={field.id} className="lg:w-[32.2%]  mr-3 w-[100%]">
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
            {/* <Box className="flex flex-wrap  my-7">
              <Box className="lg:w-[32.5%]  mr-3 w-[100%]">
                <RadioGroupComponent
                  label="Salary Gen. Applicable"
                  name="salaryGenApplicable"
                  value={valuesRadio.salaryGenApplicable}
                  onChange={handleChange}
                />
              </Box>
              <Box className="lg:w-[32.5%]  mr-3 w-[100%]">
                <RadioGroupComponent
                  label="Employee PF Limit"
                  name="employeePfLimit"
                  value={valuesRadio.employeePfLimit}
                  onChange={handleChange}
                />
              </Box>
              <Box className="lg:w-[32.5%]  mr-3 w-[100%]">
                <RadioGroupComponent
                  label="Employer PF Limit"
                  name="employerPfLimit"
                  value={valuesRadio.employerPfLimit}
                  onChange={handleChange}
                />
              </Box>
              <Box className="lg:w-[32.5%]  mr-3 mt-6 w-[100%]">
                <RadioGroupComponent
                  label="Tax Region"
                  name="taxRegion"
                  value={valuesRadio.taxRegion}
                  onChange={handleChange}
                />
              </Box>
              <Box className="lg:w-[32.5%] mt-6 mr-3 w-[100%]">
                <RadioGroupComponent
                  label="Employee Pension Limit"
                  name="employeePensionLimit"
                  value={valuesRadio.employeePensionLimit}
                  onChange={handleChange}
                />
              </Box>
            </Box> */}
            <div className="flex flex-wrap my-7">
              <div className="lg:w-[32.5%] mr-3 w-[100%]">
                <RadioGroupComponent
                  label="Salary Gen. Applicable"
                  name="salaryGenApplicable"
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
              <div className="lg:w-[32.5%] mr-3 w-[100%]">
                <RadioGroupComponent
                  label="Employee PF Limit"
                  name="employeePfLimit"
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
              <div className="lg:w-[32.5%] mr-3 w-[100%]">
                <RadioGroupComponent
                  label="Employer PF Limit"
                  name="employerPfLimit"
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
              <div className="lg:w-[32.5%] mr-3 mt-6 w-[100%]">
                <RadioGroupComponent
                  label="Tax Region"
                  name="taxRegion"
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
              <div className="lg:w-[32.5%] mt-6 mr-3 w-[100%]">
                <RadioGroupComponent
                  label="Employee Pension Limit"
                  name="employeePensionLimit"
                  options={[
                    { label: "Yes", value: "Yes" },
                    { label: "No", value: "No" },
                  ]}
                />
              </div>
            </div>

            <div className="flex justify-end my-5">
              <SubmitButton type="submit" variant="contained" color="primary">
                {id ? "Update" : " Submit"}
              </SubmitButton>
            </div>
          </Form>
        )}
      </Formik>

      <Box className="flex gap-10 my-7">
        <CustomButton width={200}>Pay Head Details</CustomButton>
        <CustomButton width={170}>LIC Details</CustomButton>
      </Box>
    </>
  );
};

export default PayInformation;

const RadioGroupComponent = ({ label, name, options }) => {
  const [field, meta, helpers] = useField(name);

  return (
    <div className="my-4">
      <span className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </span>
      <div className="flex space-x-4">
        {options?.map((option) => (
          <label key={option.value} className="flex items-center">
            <input
              type="radio"
              {...field}
              value={option.value}
              checked={field.value === option.value}
              className="form-radio text-blue-600"
            />
            <span className="ml-2">{option.label}</span>
          </label>
        ))}
      </div>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

import SubmitButton from "@/components/CommonButton/SubmitButton";
import {
  DatePickerField,
  SelectField,
  TextFieldComponent,
} from "@/components/FormikComponent";
import SimpleModal from "@/components/Modal/SimpleModal";
import {
  AddStaffDetails,
  cityData,
  getStallById,
  GetStudentListById,
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

const FeeCollectionDetails = ({ open, handleClose, data }) => {
  const [studentData, setStudentData] = useState([]);
  const router = useRouter();
  const id = data?._id||router?.query?.id;
  const studentDetails = async() => {
    try {
      if (!id) {
        return;
      }
      const resp =await GetStudentListById(id);
      console.log(resp,'resp')

      setStudentData(resp?.data[0]);
    } catch (error) {}
  };
  useEffect(() => {
    studentDetails();
  }, [id, router]);
  // const id = router?.query?.id;
  console.log(data, "=datadata");
  const defaultValues = {
    collection: "",
    ac_type: "",
    rec_date: "",
    rec_name: "",
    first_name: "",
    last_name: "",
    middle_name: "",
    fee_no: "",
    admission_no: "",
    date_of_birth: "",
    father_name: "",
    mother_name: "",

    fee_installment_fee: "",
    late_fee: "",
    redm_fee: "",
    discount_fee: "",
    cheque_bounce: "",
    pay_mode: "",
    instrument_no: "",
    instrument_date: dayjs(),
    bank_name: "",
    amount: "",
    amount_inc_charges: "",
    due: "",
    service: "",
    paid: "",
    balance: "",
    remarks: "",
  };
  const initialValues = studentData
    ? {
        ...defaultValues,
        collection: studentData?.collection || "",
        ac_type: studentData?.ac_type || "",
        rec_date: studentData?.rec_date || "",
        rec_name: studentData?.rec_name || "",
        first_name: studentData?.name?.first_name || "",
        last_name: studentData?.name?.last_name || "",
        middle_name: studentData?.name?.middle_name || "",
        fee_no: studentData?.admission_number || "",
        admission_no: studentData?.admission_number || "",
        date_of_birth: studentData?.date_of_birth || "",
        father_name: studentData?.parent?.fathers_name || "",
        mother_name: studentData?.parent?.mothers_name || "",

        fee_installment_fee: studentData?.fee_installment_fee || "",
        late_fee: studentData?.late_fee || "",
        redm_fee: studentData?.redm_fee || "",
        discount_fee: studentData?.discount_fee || "",
        cheque_bounce: studentData?.cheque_bounce || "",
        pay_mode: studentData?.pay_mode || "",
        instrument_no: studentData?.instrument_no || "",
        instrument_date: studentData?.instrument_date
          ? dayjs(studentData.instrument_date)
          : dayjs(),

        bank_name: studentData?.bank_name || "",
        amount: studentData?.amount || "",
        amount_inc_charges: studentData?.amount_inc_charges || "",
        due: studentData?.due || "",
        service: studentData?.service || "",
        paid: studentData?.paid || "",
        balance: studentData?.balance || "",
        remarks: studentData?.remarks || "",
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
      id: "collection",
      label: "Collection",
      name: "collection",
      component: SelectField,
      options: [
        {
          value: "1",
          label: "School",
        },
        {
          value: "2",
          label: "Bank",
        },
      ],
      // disabled: true,
    },
    {
      id: "ac_type",
      label: "A/C Type",
      name: "ac_type",
      component: SelectField,
      // disabled: true,
      options: Config.genders,
    },
    {
      id: "rec_date",
      label: "Receipt Date",
      name: "rec_date",
      component: DatePickerField,
      disabled: true,
    },
    {
      id: "rec_name",
      label: "Receipt Name",
      name: "rec_name",
      component: TextFieldComponent,
      disabled: true,
    },

    {
      id: "first_name",
      label: "First Name",
      name: "first_name",
      component: TextFieldComponent,
      disabled: true,
    },
    {
      id: "middle_name",
      label: "Middle Name",
      name: "middle_name",
      disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "last_name",
      label: "Last Name",
      name: "last_name",
      disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "fee_no",
      label: "Fee No",
      name: "fee_no",
      disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "admission_no",
      label: "Admission No",
      name: "admission_no",
      disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "date_of_birth",
      label: "Date of birth",
      name: "date_of_birth",
      disabled: true,
      component: DatePickerField,
    },
    {
      id: "father_name",
      label: "Father Name",
      name: "father_name",
      disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "mother_name",
      label: "Mother Name",
      name: "mother_name",
      disabled: true,
      component: TextFieldComponent,
    },
  ];

  const fieldsFee = [
    {
      id: "fee_installment_fee",
      label: "Fee Installment Fee",
      name: "fee_installment_fee",
      component: SelectField,
      options: [
        {
          value: "36083",
          label: "Qtr1",
        },
        {
          value: "Qtr2",
          label: "Qtr2",
        },
        {
          value: "Qtr3",
          label: "Qtr3",
        },
        {
          value: "Qtr4",
          label: "Qtr4",
        },
      ],
      // disabled: true,
    },

    {
      id: "late_fee",
      label: "Late Fee",
      name: "late_fee",
      component: TextFieldComponent,
    },

    {
      id: "redm_fee",
      label: "Readm Fee",
      name: "redm_fee",
      component: TextFieldComponent,
    },

    {
      id: "discount_fee",
      label: "Discount Fee",
      name: "discount_fee",
      component: TextFieldComponent,
    },
    {
      id: "cheque_bounce",
      label: "Cheque Bounce Amount",
      name: "cheque_bounce",
      component: TextFieldComponent,
    },
    {
      id: "pay_mode",
      label: "Pay Mode",
      name: "pay_mode",
      component: SelectField,
      options: [
        {
          label: "Cash",
          value: "1",
        },
        {
          label: "Online",
          value: "2",
        },
        {
          label: "Upi",
          value: "3",
        },
        {
          label: "Cheque",
          value: "4",
        },
      ],
    },
    {
      id: "instrument_no",
      label: "Instrument No",
      name: "instrument_no",
      component: TextFieldComponent,
    },
    {
      id: "instrument_date",
      label: "Instrument Date",
      name: "instrument_date",
      component: DatePickerField,
    },
    {
      id: "bank_name",
      label: "Bank Name",
      name: "bank_name",
      component: SelectField,
      options: [
        {
          label: "SBI",
          value: "1",
        },
        {
          label: "HDFC",
          value: "2",
        },
        {
          label: "ICICI",
          value: "3",
        },
        {
          label: "BOI",
          value: "4",
        },
      ],
    },
    {
      id: "amount",
      label: "Amount",
      name: "amount",
      component: TextFieldComponent,
    },
    {
      id: "amount_inc_charges",
      label: "Amount (Inc Charges)",
      name: "amount_inc_charges",
      component: TextFieldComponent,
    },
  ];

  const FinalFields = [
    {
      id: "due",
      label: "Due",
      name: "due",
      component: TextFieldComponent,
    },
    {
      id: "service",
      label: "Service",
      name: "service",
      component: TextFieldComponent,
    },
    {
      id: "paid",
      label: "Paid",
      name: "paid",
      component: TextFieldComponent,
    },
    {
      id: "balance",
      label: "Balance",
      name: "balance",
      component: TextFieldComponent,
    },
    {
      id: "remarks",
      label: "Remarks",
      name: "remarks",
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

    // try {
    //   if (!id) {
    //     const resp = await AddStaffDetails(payload);
    //     console.log(resp, "resp");
    //     if (resp?.success) {
    //       toast.success("Staff Added successfully");
    //       actions.resetForm();
    //       setSlectedTab(2);
    //       router.replace(`/staff/add-staff/?id=${resp?.data?._id}`);
    //     }
    //   } else {
    //     const resp = await UpdateStaffDetails(payload);
    //     if (resp?.success) {
    //       toast.success("Staff Updated successfully");
    //       actions.resetForm();
    //       setSlectedTab(2);
    //       router.replace(`/staff/add-staff/?id=${resp?.data?._id}`);
    //     }
    //   }
    // } catch (error) {
    //   toast.error("Failed to add Saff");
    // }
  };

  return (
    <SimpleModal
      open={open}
      handleClose={handleClose}
      width={"90%"}
      height={"95%"}
    >
      <Typography variant="h5">Fee Collection</Typography>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, setValues }) => (
          <Form>
            <Box className="flex w-[100%] flex-wrap gap-3 mt-7 border py-2 px-4 rounded-lg">
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
            <Box className="flex w-[100%] flex-wrap gap-3 mt-7 border py-2 px-4 rounded-lg">
              {fieldsFee.map((field) => (
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
            <Box className="flex w-[100%] flex-wrap gap-3 mt-7 border px-4  py-2 rounded-lg">
              {FinalFields.map((field) => (
                <Box key={field.id} className="lg:w-[32%]  w-[100%]">
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
    </SimpleModal>
  );
};

export default FeeCollectionDetails;

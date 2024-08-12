import SubmitButton from "@/components/CommonButton/SubmitButton";
import {
  SelectField,
  SelectFieldCity,
  SelectFieldState,
  TextFieldComponent,
} from "@/components/FormikComponent";
import { cityData, StateData, UpdateStaffDetails } from "@/services/api";
import Config from "@/utilities/Config";
import { Checkbox, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import * as Yup from "yup";

const AddressDetails = ({ setSlectedTab, data, staffRefetch }) => {
  const [presentState, setPresentState] = useState("");
  const [permanentState, setPermanentState] = useState("");
  const [confirmAddress, setConfirmAddress] = useState(false);

  const router = useRouter();
  const id = router?.query?.id;
  useEffect(() => {
    setPresentState(data?.present_state);
    setPermanentState(data?.permanent_state);
  }, [data]);

  const { data: allState } = useQuery("StateData", async () => {
    const payload = {};
    const res = await StateData(payload);
    return res?.data;
  });
  const { data: allStatePermanent } = useQuery(
    "StateDataPermanent",
    async () => {
      const payload = {};
      const res = await StateData(payload);
      return res?.data;
    }
  );

  const { data: allcity, refetch: ciftyRefetch } = useQuery(
    "cityData1",
    async () => {
      const payload = {
        state: presentState || data?.present_state,
      };
      if (presentState) {
        const res = await cityData(payload);
        return res?.data;
      }
    }
  );

  useEffect(() => {
    ciftyRefetch(data?.present_state);
  }, [presentState, data?.present_state, data]);

  const { data: allcityPermanent, refetch: ciftyRefetchPermanent } = useQuery(
    "cityDataPermannt1",
    async () => {
      const payload = {
        state: permanentState || data?.permanent_state,
      };
      if (permanentState) {
        const res = await cityData(payload);
        return res?.data;
      }
    }
  );

  useEffect(() => {
    ciftyRefetchPermanent();
  }, [permanentState, data]);

  const defaultValues = {
    present_address: "",
    present_country: "",
    present_state: "",
    present_city: data?.present_city || "",
    present_pincode: "",
    present_number: "",

    permanent_address: "",
    permanent_country: "",
    permanent_state: "",
    permanent_city: "",
    permanent_pincode: "",
    permanent_number: "",
  };
  const initialValues = data
    ? {
        ...defaultValues,
        present_address: data?.present_address ? data?.present_address : "",
        present_country: data?.present_country ? data?.present_country : "",
        present_state: data?.present_state || "",
        present_city: data?.present_city || "",
        present_pincode: data?.present_pincode || "",
        present_number: data?.present_number || "",

        permanent_address: confirmAddress
          ? data?.present_address
          : data?.permanent_address || "",
        permanent_country: confirmAddress
          ? data?.present_country
          : data?.permanent_country || "",
        permanent_state: confirmAddress
          ? data?.present_state
          : data?.permanent_state || "",
        permanent_city: confirmAddress
          ? data?.present_city
          : data?.permanent_city || "",
        permanent_pincode: confirmAddress
          ? data?.present_pincode
          : data?.permanent_pincode || "",
        permanent_number: confirmAddress
          ? data?.present_number
          : data?.permanent_number || "",
      }
    : defaultValues;

  const validationSchema = Yup.object({
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

  const persentAddress = [
    {
      id: "present_address",
      label: "Address",
      name: "present_address",
      component: TextFieldComponent,
    },

    {
      id: "present_country",
      label: "Country",
      name: "present_country",
      component: SelectField,
      options: Config.CountryDta,
    },
    {
      id: "present_state",
      label: "State",
      name: "present_state",
      component: SelectFieldState,
      options: allState,
      setPresentState: setPresentState,
    },
    {
      id: "present_city",
      label: "City",
      name: "present_city",
      component: SelectField,
      options: allcity,
    },
    {
      id: "present_pincode",
      label: "Pincode",
      name: "present_pincode",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "present_number",
      label: "Mobile No.",
      name: "present_number",
      // disabled: true,
      component: TextFieldComponent,
    },
  ];
  const permanentAddress = [
    {
      id: "permanent_address",
      label: "Address",
      name: "permanent_address",
      component: TextFieldComponent,
    },

    {
      id: "permanent_country",
      label: "Country",
      name: "permanent_country",
      component: SelectField,
      options: Config.CountryDta,
    },
    {
      id: "permanent_state",
      label: "State",
      name: "permanent_state",
      component: SelectFieldState,
      options: allStatePermanent,
      setPermanentState: setPermanentState,
    },
    {
      id: "permanent_city",
      label: "City",
      name: "permanent_city",
      component: SelectField,
      options: allcityPermanent,
    },
    {
      id: "permanent_pincode",
      label: "Pincode",
      name: "permanent_pincode",
      // disabled: true,
      component: TextFieldComponent,
    },
    {
      id: "permanent_number",
      label: "Mobile No.",
      name: "permanent_number",
      // disabled: true,
      component: TextFieldComponent,
    },
  ];

  const handleSubmit = async (values, actions) => {
    if (!id) {
      toast.warning("Please fill in the basic information first.");
      return;
    }
    const payload = {
      ...values,
      id: id,
    };
    try {
      const resp = await UpdateStaffDetails(payload);
      if (resp?.success) {
        toast.success("Staff updated successfully.");
        actions.resetForm();
        staffRefetch();
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
            <>
              <Typography
                className="font-bold text-[20px] mt-5"
                sx={{ mt: 2, mb: 1, fontSize: "20px" }}
                variant="h5"
              >
                Persent Address
              </Typography>
              <Grid className="border rounded-lg p-6">
                <Box className="flex w-[100%] flex-wrap justify-between ">
                  {persentAddress.map((field) => (
                    <Box key={field.id} className="lg:w-[32.5%] w-[100%]">
                      <Field
                        name={field.name}
                        label={field.label}
                        component={field.component}
                        options={field.options}
                        disabled={field.disabled}
                        values={values}
                        setAddressState={field.setPresentState}
                      />
                    </Box>
                  ))}
                </Box>
              </Grid>
            </>
            <div className="flex items-center">
              <Checkbox
                value={confirmAddress}
                onChange={() => setConfirmAddress(!confirmAddress)}
              />
              <Typography variant="h6" fontWeight={"bold"}>
                Same as Present Address
              </Typography>
            </div>
            <>
              <Typography
                className="font-bold text-[20px] mt-5"
                sx={{ mt: 2, mb: 1, fontSize: "20px" }}
                variant="h5"
              >
                Permanent Address
              </Typography>
              <Grid className="border rounded-lg px-6 py-4">
                <Box className="flex w-[100%] flex-wrap justify-between ">
                  {permanentAddress.map((field) => (
                    <Box key={field.id} className="lg:w-[32.5%] w-[100%]">
                      <Field
                        name={field.name}
                        label={field.label}
                        component={field.component}
                        options={field.options}
                        disabled={field.disabled}
                        values={values}
                        setAddressState={field.setPermanentState}
                      />
                    </Box>
                  ))}
                </Box>
              </Grid>
            </>
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

export default AddressDetails;

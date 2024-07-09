import { StateData, cityData } from "@/services/api";
import Config from "@/utilities/Config";
import { Autocomplete, MenuItem, TextField } from "@mui/material";
import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const ParentDetails = ({ values, handleBlur, handleChange, setFieldValue }) => {
  const [presentState, setPresentState] = useState("");

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
    isLoading: cityIsloading,
    refetch: cityRefetch,
  } = useQuery("cityData", async () => {
    const payload = {
      state: presentState,
    };
    if (presentState) {
      const res = await cityData(payload);
      return res?.data;
    }
  });

  useEffect(() => {
    if (presentState) {
      cityRefetch();
    }
  }, [presentState]);

  return (
    <div>
      <div className="mt-[40px]">
        <span className="font-black text-[18px]">{`Father's Details`}</span>
        <div className="border p-6 rounded-2xl mt-3">
          <div className="lg:flex w-[100%] gap-4">
            <div className="lg:w-[20%] w-[100%] flex justify-center items-center">
              <div className="w-[200px] h-[200px] rounded-full">
                <div>
                  <img
                    src={"/images/user.png"}
                    alt="Picture of the author"
                    className="border rounded-full object-contain w-[200px] h-[200px]"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap lg:w-[80%] w-[100%] gap-4">
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
                  helperText={<ErrorMessage name="father_qualifications" />}
                >
                  {Config?.qualifications?.map((option) => (
                    <MenuItem key={option?.name} value={option?.name}>
                      {option.name}
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
                  helperText={<ErrorMessage name="father_occupation" />}
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
                  select
                  label="Designation"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  helperText={<ErrorMessage name="father_designation" />}
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
                  helperText={<ErrorMessage name="father_org_address" />}
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

          <div className="flex-wrap flex mt-5 gap-4">
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
                helperText={<ErrorMessage name="father_nationality" />}
              >
                {Config.Nationalities.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Field>
            </div>
            <div className="lg:w-[32.5%] w-[100%]">
              <Autocomplete
                options={allState || []}
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
                value={values.father_state || null}
                onChange={(event, value) => {
                  setFieldValue("father_state", value ? value.name : "");
                  setPresentState(value ? value.name : "");
                }}
                onBlur={handleBlur}
              />
            </div>
            <div className="lg:w-[32.5%] w-[100%]">
              <Field
                name="father_city"
                as={TextField}
                select
                label="City"
                variant="outlined"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={false}
                value={values.father_city}
                helperText={<ErrorMessage name="father_city" />}
              >
                {allcity?.length > 0 &&
                  allcity.map((option) => (
                    <MenuItem key={option.name} value={option.name}>
                      {option.name}
                    </MenuItem>
                  ))}
              </Field>
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
                helperText={<ErrorMessage name="father_annual_income" />}
              />
            </div>
            <div className="lg:w-[32.5%] w-[100%]">
              <Field
                name="father_mobile_no"
                as={TextField}
                label="Mobile No"
                variant="outlined"
                fullWidth
                onBlur={handleBlur}
                onChange={handleChange}
                error={false}
                helperText={<ErrorMessage name="father_mobile_no" />}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDetails;

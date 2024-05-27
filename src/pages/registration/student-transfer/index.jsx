"use client";
import { Button, Card, Grid, MenuItem, TextField } from "@mui/material";
import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import * as Yup from "yup";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Config from "@/utilities/Config";

const index = () => {
  return (
    <Card sx={{ p: 4 }}>
      <Formik
        initialValues={{
          name: "",
          email: "",
          date: null,
          time: null,
          Class: "",
        }}
        validationSchema={Yup.object({
          name: Yup.string().required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          date: Yup.date().required("Required"),
          time: Yup.date().required("Required"),
        })}
        validateOnBlur
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
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
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="first_name"
                  as={TextField}
                  label="Application No"
                  variant="outlined"
                  // required
                  value={values.first_name}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  helperText={<ErrorMessage name="first_name" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="first_name"
                  as={TextField}
                  label="Full Name"
                  variant="outlined"
                  // required
                  value={values.first_name}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  helperText={<ErrorMessage name="first_name" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="first_name"
                  as={TextField}
                  label="Father Name"
                  variant="outlined"
                  // required
                  value={values.first_name}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  helperText={<ErrorMessage name="first_name" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} className="">
                <DatePicker
                  label="Admitted Date"
                  name="date"
                  fullWidth
                  className="w-[100%]"
                  inputFormat="MM/dd/yyyy"
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
                <ErrorMessage name="date" component="div" />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="class"
                  as={TextField}
                  select
                  label="Transfered Aca Year"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  value={values.Class}
                  helperText={<ErrorMessage name="class" />}
                >
                  {Config?.ClassList.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="class"
                  as={TextField}
                  select
                  label="Section"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  value={values.Class}
                  helperText={<ErrorMessage name="class" />}
                >
                  {Config?.SectionList.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>

              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="class"
                  as={TextField}
                  select
                  label="Stream"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  value={values.Class}
                  helperText={<ErrorMessage name="class" />}
                >
                  {Config?.StreamList.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="class"
                  as={TextField}
                  select
                  label="Fee Group"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  value={values.Class}
                  helperText={<ErrorMessage name="class" />}
                >
                  {Config?.FeeGroup.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="class"
                  as={TextField}
                  select
                  label="Fee Applicable From"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  value={values.Class}
                  helperText={<ErrorMessage name="class" />}
                >
                  {Config?.FeeGroup.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="class"
                  as={TextField}
                  select
                  label="Document Submitted"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  value={values.Class}
                  helperText={<ErrorMessage name="class" />}
                >
                  {Config?.FeeGroup.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="class"
                  as={TextField}
                  select
                  label="Fee Applicable To"
                  variant="outlined"
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  value={values.Class}
                  helperText={<ErrorMessage name="class" />}
                >
                  {Config?.FeeGroup.map((option) => (
                    <MenuItem key={option.label} value={option.label}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Field>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="first_name"
                  as={TextField}
                  label="Add No Starts From"
                  variant="outlined"
                  // required
                  value={values.first_name}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  helperText={<ErrorMessage name="first_name" />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Field
                  name="first_name"
                  as={TextField}
                  label="Fee No Starts From"
                  variant="outlined"
                  // required
                  value={values.first_name}
                  fullWidth
                  onBlur={handleBlur}
                  onChange={handleChange}
                  error={false}
                  helperText={<ErrorMessage name="first_name" />}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "flex-end" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Transfer
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default index;

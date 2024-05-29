// pages/index.js
'use client'
import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { TextField, MenuItem, Select, FormControl, InputLabel, Button, Box } from '@mui/material';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Validation schema
const validationSchema = Yup.object({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  birthDate: Yup.date().required('Required').nullable(),
  country: Yup.string().required('Required'),
});

// Initial values
const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  birthDate: null,
  country: '',
};

// Custom components for form fields
const TextFieldComponent = ({ field, form: { touched, errors }, ...props }) => (
  <TextField
    {...field}
    {...props}
    error={touched[field.name] && Boolean(errors[field.name])}
    helperText={touched[field.name] && errors[field.name]}
    variant="outlined"
    fullWidth
    margin="normal"
  />
);

const DatePickerField = ({ field, form, ...props }) => {
  const currentError = form.errors[field.name];

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DesktopDatePicker
        {...field}
        {...props}
        inputFormat="MM/dd/yyyy"
        renderInput={(params) => (
          <TextField
            {...params}
            error={Boolean(currentError)}
            helperText={currentError}
            fullWidth
            margin="normal"
          />
        )}
        value={field.value || null}
        onChange={(newValue) => form.setFieldValue(field.name, newValue)}
      />
    </LocalizationProvider>
  );
};

const SelectField = ({ field, form, label, ...props }) => (
  <FormControl fullWidth margin="normal">
    <InputLabel>{label}</InputLabel>
    <Select {...field} {...props} label={label}>
      <MenuItem value=""><em>None</em></MenuItem>
      <MenuItem value="USA">USA</MenuItem>
      <MenuItem value="Canada">Canada</MenuItem>
      <MenuItem value="Mexico">Mexico</MenuItem>
    </Select>
  </FormControl>
);

// Main draggable form component
const DraggableForm = () => {
  const [fields, setFields] = React.useState([
    { id: 'firstName', label: 'First Name', name: 'firstName', component: TextFieldComponent },
    { id: 'lastName', label: 'Last Name', name: 'lastName', component: TextFieldComponent },
    { id: 'email', label: 'Email', name: 'email', component: TextFieldComponent },
    { id: 'birthDate', label: 'Birth Date', name: 'birthDate', component: DatePickerField },
    { id: 'country', label: 'Country', name: 'country', component: SelectField },
  ]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedFields = Array.from(fields);
    const [removed] = reorderedFields.splice(result.source.index, 1);
    reorderedFields.splice(result.destination.index, 0, removed);

    setFields(reorderedFields);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {() => (
        <Form>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable-form-fields">
              {(provided) => (
                <Box {...provided.droppableProps} ref={provided.innerRef}>
                  {fields.map((field, index) => (
                    <Draggable key={field.id} draggableId={field.id} index={index}>
                      {(provided) => (
                        <Box
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          mb={2}
                          sx={{
                            backgroundColor: 'white',
                            border: '1px solid lightgrey',
                            borderRadius: '4px',
                            padding: '8px',
                          }}
                        >
                          <Field
                            name={field.name}
                            label={field.label}
                            component={field.component}
                          />
                        </Box>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          </DragDropContext>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default DraggableForm;

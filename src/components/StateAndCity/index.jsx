import React, { useEffect } from 'react';
import { Field } from 'formik';
import { useQuery } from 'react-query';
import { MenuItem, TextField } from '@mui/material';
import { StateData, cityData } from '@/services/api';
import Config from '@/utilities/Config';

// StateSelect Component
const StateSelect = ({ name, label, value, onChange,state }) => {
  
    const { data: allState, isLoading: stateIsLoading,refetch } = useQuery('StateData', async () => {
    const res = await StateData();
    return res?.data;
  });

  useEffect(() => {
    refetch();
  },[state])
//   if (stateIsLoading) return <p>Loading...</p>;

  return (
    <Field
      name={name}
      as={TextField}
      select
      label={label}
      variant="outlined"
      fullWidth
      onChange={onChange}
      value={value}
    >
      {allState?.length > 0 &&
        allState.map((option) => (
          <MenuItem key={option.name} value={option.name}>
            {option.name}
          </MenuItem>
        ))}
    </Field>
  );
};

// CitySelect Component
const CitySelect = ({ name, label, value, state }) => {
    console.log(state,'--state')
  const { data: allCity, isLoading: cityIsLoading, refetch: cityRefetch } = useQuery(
    'cityData',
    async () => {
      const payload = { state };
      if (state) {
        const res = await cityData(payload);
        return res?.data;
      }
    },
    { enabled: !!state } // Only fetch when state is defined
  );

  useEffect(() => {
    if (state) cityRefetch();
  }, [state, cityRefetch]);


  return (
    <Field
      name={name}
      as={TextField}
      select
      label={label}
      variant="outlined"
      fullWidth
      value={value}
    >
      {allCity?.length > 0 &&
        allCity.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
    </Field>
  );
};

const CountrySelect = ({ name, label, value, onChange,state }) => {
  
   

  return (
    <Field
      name={name}
      as={TextField}
      select
      label={label}
      variant="outlined"
      fullWidth
      onChange={onChange}
      value={value}
    >
      {Config.CountryDta.map((option) => (
          <MenuItem key={option.label} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
    </Field>
  );
};


export { StateSelect, CitySelect,CountrySelect };

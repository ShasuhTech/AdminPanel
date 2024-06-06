import { cityData } from "@/services/api";
import { MenuItem, TextField } from "@mui/material";
import { Field } from "formik";
import { useEffect } from "react";
import { useQuery } from "react-query";

const CitySelectMother = ({ name, label, value, state }) => {
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

export default CitySelectMother
import CustomButton from "@/components/CommonButton/CustomButton";
import {
  GetAssignById,
  addAssignTeacherList,
  updateAssignList,
} from "@/services/Attendance";
import Config from "@/utilities/Config";
import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useQuery } from "react-query";

const AssignTeacherModal = ({ open, handleClose, selectedItem }) => {
  const names = [];
  const [classSectionName, setClassSectionName] = React.useState([]);

  const submitHandler = async () => {
    const payload = {
      class_section: classSectionName,
    };

    try {
      if (!selectedItem?._id) {
        await addAssignTeacherList(payload);
      } else {
        await updateAssignList({ ...payload, id: selectedItem._id });
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const { data: AssignData, refetch: AssignRefetch } = useQuery(
    "GetHolidayById",
    async () => {
      if (!selectedItem?._id) return null;
      const res = await GetAssignById(selectedItem._id);
      return res?.data;
    },
    {
      enabled: !!selectedItem?._id,
    }
  );

  useEffect(() => {
    if (selectedItem?._id) {
      AssignRefetch();
    }
  }, [selectedItem?._id]);

  useEffect(() => {
    if (selectedItem?._id) {
      if (AssignData) {
        console.log("Fetched Holiday Data:", AssignData);
        setClassSectionName(AssignData?.class_section || []);

        // setRemark(AssignData?.remark || "");
      }
    } else {
      // Reset to initial state when selectedItem?._id is undefined
      setClassSectionName([]);
      // setRemark("");
    }
  }, [AssignData, selectedItem?._id]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setClassSectionName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  Config.ClassList.forEach((classItem) => {
    Config.SectionList.forEach((sectionItem) => {
      names.push(`${classItem.value}-${sectionItem.value}`);
    });
  });
  const ITEM_HEIGHT = 90;
  const ITEM_PADDING_TOP = -10;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const teacherName = [
    { label: "Ramesh", id: 1 },
    { label: "Suresh", id: 2 },
    { label: "Ganesh", id: 3 },
    { label: "Ashok", id: 4 },
    { label: "Akash", id: 5 },
    { label: "Vinay", id: 6 },
    { label: "abc", id: 7 },
  ];
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    // border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "10px",
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      width={"800px"}
    >
      <Box sx={style}>
        <Typography id="modal-title" mb={3} component="h4">
          Assign Attandance
        </Typography>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={teacherName}
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} label="Select Teacher" />
          )}
        />
        <FormControl sx={{ width: "100%", mt: 2 }}>
          <InputLabel id="demo-multiple-checkbox-label">
            Select Class and Section
          </InputLabel>

          <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            multiple
            value={classSectionName}
            onChange={handleChange}
            input={<OutlinedInput label="Select Class and Section" />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {names.map((name) => (
              <MenuItem key={name} value={name}>
                <Checkbox checked={classSectionName.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Grid className="flex justify-end mt-6">
          <CustomButton onClick={submitHandler} variant="contained">
            {!selectedItem?._id ? "Submit" : "Update"}
          </CustomButton>
        </Grid>
      </Box>
    </Modal>
  );
};

export default AssignTeacherModal;

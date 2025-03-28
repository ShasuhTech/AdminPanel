"use client";
import CustomButton from "@/components/CommonButton/CustomButton";
import {
  GetHolidayById,
  addHolidayList,
  updateHolidayList,
} from "@/services/Attendance";
import Config from "@/utilities/Config";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Modal,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";

const holidayList = [
  { id: 1, name: "Holiday" },
  { id: 2, name: "Working" },
  { id: 3, name: "Halfday" },
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const HolidayAssignModal = ({ open, handleClose, selectedItem }) => {
  const names = [];
  const [classSectionName, setClassSectionName] = useState([]);
  const [dateFrom, setDateFrom] = useState(dayjs(new Date()));
  const [dateTo, setDateTo] = useState(dayjs(new Date()));
  const [holidayType, setHolidayType] = useState("");
  const [remark, setRemark] = useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setClassSectionName(typeof value === "string" ? value.split(",") : value);
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

  const submitHandler = async () => {
    const payload = {
      from: dateFrom,
      holiday_type: holidayType,
      class_section: classSectionName,
      remark: remark,
    };
    if (value !== "single") {
      payload.to = dateTo;
    }

    try {
      if (!selectedItem?._id) {
        await addHolidayList(payload);
      } else {
        await updateHolidayList({ ...payload, id: selectedItem._id });
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const { data: HolidayData, refetch: HolidayRefetch } = useQuery(
    "GetHolidayById",
    async () => {
      if (!selectedItem?._id) return null;
      const res = await GetHolidayById(selectedItem._id);
      return res?.data;
    },
    {
      enabled: !!selectedItem?._id,
    }
  );

  useEffect(() => {
    if (selectedItem?._id) {
      HolidayRefetch();
    }
  }, [selectedItem?._id]);

  useEffect(() => {
    if (selectedItem?._id) {
      if (HolidayData) {
        console.log("Fetched Holiday Data:", HolidayData);
        setClassSectionName(HolidayData?.class_section || []);
        setDateFrom(
          HolidayData?.from ? dayjs(HolidayData?.from) : dayjs(new Date())
        );
        setDateTo(HolidayData?.to ? dayjs(HolidayData?.to) : dayjs(new Date()));
        setHolidayType(HolidayData?.holiday_type || "");
        setRemark(HolidayData?.remark || "");
      }
    } else {
      // Reset to initial state when selectedItem?._id is undefined
      setClassSectionName([]);
      setDateFrom(dayjs(new Date()));
      setDateTo(dayjs(new Date()));
      setHolidayType("");
      setRemark("");
    }
  }, [HolidayData, selectedItem?._id]);

  const [value, setValue] = React.useState("single");

  const handleChangeradio = (event) => {
    setValue(event.target.value);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" mb={3} component="h4">
          Holiday Assigner
        </Typography>
        <FormControl>
          <FormLabel id="demo-row-radio-buttons-group-label">
            Holiday Type
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={value}
            onChange={handleChangeradio}
            className="mb-5"
          >
            <FormControlLabel
              value={"single"}
              control={<Radio />}
              label="Single"
            />
            <FormControlLabel
              value="multiple"
              control={<Radio />}
              label="Multiple"
            />
          </RadioGroup>
        </FormControl>
        <div className="flex items-center justify-center gap-5 mb-5">
          <div className="w-[100%] ">
            <DatePicker
              label={value !== "single" ? "From Date" : "Date"}
              value={dateFrom}
              className="w-full"
              onChange={(newValue) => setDateFrom(newValue)}
              renderInput={(params) => (
                <TextField {...params} variant="outlined" />
              )}
            />
          </div>
          {value !== "single" && (
            <div className="w-[100%]">
              <DatePicker
                label="To Date"
                value={dateTo}
                className="w-full"
                fullWidth
                onChange={(newValue) => setDateTo(newValue)}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" fullWidth />
                )}
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-center gap-5 mb-5">
          <Box sx={{ width: "100%" }}>
            <FormControl fullWidth>
              <InputLabel id="holiday-type-label">Holiday Type</InputLabel>
              <Select
                labelId="holiday-type-label"
                id="holiday-type"
                value={holidayType}
                label="Holiday Type"
                onChange={(e) => setHolidayType(e.target.value)}
              >
                {holidayList.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ width: "50%" }}>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="class-section-label">
                Select Class and Section
              </InputLabel>
              <Select
                labelId="class-section-label"
                id="class-section"
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
          </Box>
        </div>
        <Box sx={{ width: "100%" }}>
          <TextField
            id="remark"
            label="Remark"
            fullWidth
            value={remark}
            variant="outlined"
            onChange={(e) => setRemark(e.target.value)}
          />
        </Box>

        <Grid className="flex justify-end mt-6">
          <CustomButton onClick={submitHandler} variant="contained">
            {!selectedItem?._id ? "Submit" : "Update"}
          </CustomButton>
        </Grid>
      </Box>
    </Modal>
  );
};

export default HolidayAssignModal;

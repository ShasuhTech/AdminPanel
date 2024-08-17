"use client";
import CustomButton from "@/components/CommonButton/CustomButton";
import { AddConfigs, updateConfigs } from "@/services/api";
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

const ClassAssignModal = ({ open, handleClose, selectedItem }) => {
  console.log(selectedItem, "-selectedItem");
  const [remark, setRemark] = useState("");
  useEffect(() => {
    setRemark(selectedItem?.name);
  }, [selectedItem]);

  const submitHandler = async () => {
    const payload = {
      name: remark,
      type: "Class",
    };

    try {
      if (!selectedItem?._id) {
        await AddConfigs(payload);
        setRemark("");
      } else {
        await updateConfigs({ ...payload, id: selectedItem._id });
        setRemark("");
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        handleClose();
        setRemark("");
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" mb={3} component="h4">
          Class
        </Typography>

        <Box sx={{ width: "100%" }}>
          <TextField
            id="name"
            label="Name"
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

export default ClassAssignModal;

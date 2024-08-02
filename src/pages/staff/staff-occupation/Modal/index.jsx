"use client";
import CustomButton from "@/components/CommonButton/CustomButton";
import {
  AddAccountType,
  AddDepartment,
  AddOccupation,
  GetAccountTypeId,
  updateAccountType,
  updateDepartment,
  updateOccupation,
} from "@/services/api";
import { GetHolidayById } from "@/services/Attendance";
import Config from "@/utilities/Config";
import { Box, Grid, Modal, TextField, Typography } from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";

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

const StaffOccupationModal = ({ open, handleClose, selectedItem }) => {
  console.log(selectedItem, "--selectedItem");
  const [remark, setRemark] = useState("");
  useEffect(() => {
    setRemark(selectedItem?.name || "");
  }, [selectedItem]);

  const submitHandler = async () => {
    const payload = {
      name: remark,
    };

    try {
      if (!selectedItem?._id) {
        const res = await AddOccupation(payload);
        if (res?.success) {
          toast.success("Successfully Added...");
          handleClose();
        }
      } else {
        const res = await updateOccupation({
          ...payload,
          id: selectedItem._id,
        });
        if (res?.success) {
          toast.success("Successfully Updated...");
          handleClose();
        }
      }
    } catch (error) {
      console.error(error);
    }
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
          Staff Occupation
        </Typography>

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

export default StaffOccupationModal;

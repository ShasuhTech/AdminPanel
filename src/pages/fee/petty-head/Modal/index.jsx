"use client";
import CustomButton from "@/components/CommonButton/CustomButton";
import {
  AddConfigs,
  AddConfigsFee,
  AddConfigsPettyHead,
  updateConfigs,
  updateConfigsFee,
  updateConfigsPettyHead,
} from "@/services/api";
import { Box, Grid, Modal, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
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

const CreateConfigModal = ({ open, handleClose, selectedItem }) => {
  const [pettyHeadData, setpettyHeadData] = useState({
    label: "",
    amount: "",
    priority: "",
  });

  useEffect(() => {
    setpettyHeadData({
      label: selectedItem?.petty_head,
      amount: selectedItem?.amount,
      priority: selectedItem?.priority_no,
    });
  }, [selectedItem]);

  const submitHandler = async () => {
    const payload = {
      petty_head: pettyHeadData.label,
      amount: pettyHeadData.amount,
      priority_no: pettyHeadData.priority,
    };

    try {
      if (!selectedItem?._id) {
        await AddConfigsPettyHead(payload);
        toast.success("Successfully Added...");
        setpettyHeadData({});
      } else {
        await updateConfigsPettyHead({ ...payload, id: selectedItem._id });
        toast.success("Successfully Updated...");
        setpettyHeadData({});
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
        setpettyHeadData({});
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" mb={3} component="h4">
          Petty Head
        </Typography>
        <Box sx={{ width: "100%" }}>
          <TextField
            id="name"
            label="Petty Head"
            required
            fullWidth
            value={pettyHeadData.label}
            variant="outlined"
            onChange={(e) =>
              setpettyHeadData((prevData) => ({
                ...prevData,
                label: e.target.value,
              }))
            }
          />
          <TextField
            id="amount"
            label="Amount"
            required
            fullWidth
            value={pettyHeadData.amount}
            sx={{ my: 2 }}
            variant="outlined"
            onChange={(e) =>
              setpettyHeadData((prevData) => ({
                ...prevData,
                amount: e.target.value,
              }))
            }
          />
          <TextField
            id="no"
            label="Priority No"
            required
            fullWidth
            value={pettyHeadData.priority}
            variant="outlined"
            onChange={(e) =>
              setpettyHeadData((prevData) => ({
                ...prevData,
                priority: e.target.value,
              }))
            }
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

export default CreateConfigModal;

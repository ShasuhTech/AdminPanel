"use client";
import CustomButton from "@/components/CommonButton/CustomButton";
import { AddConfigs, AddConfigsFee, updateConfigs, updateConfigsFee } from "@/services/api";
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

  const [remark, setRemark] = useState("");
  useEffect(() => {
    setRemark(selectedItem?.name);
  }, [selectedItem]);

  const submitHandler = async () => {
    const payload = {
      name: remark,
      type: "Bank",
    };

    try {
      if (!selectedItem?._id) {
        await AddConfigsFee(payload);
        toast.success('Successfully Added...')
        setRemark("");
      } else {
        await updateConfigsFee({ ...payload, id: selectedItem._id });
        toast.success('Successfully Updated...')
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
         Bank
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

export default CreateConfigModal;

"use client";
import CustomButton from "@/components/CommonButton/CustomButton";
import { AddConfigs, AddConfigsFee, AddConfigsFeeAccount, updateConfigs, updateConfigsFee, updateConfigsFeeAccount } from "@/services/api";
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

  const [feeAccount, setFeeAccount] = useState("");
  const [reportHeader, setReportHeader] = useState("");
  useEffect(() => {
    setFeeAccount(selectedItem?.feeAccount);
    setReportHeader(selectedItem?.reportHeader);
  }, [selectedItem]);

  const submitHandler = async () => {
    const payload = {
      feeAccount: feeAccount,
      reportHeader: reportHeader,
      // logo: logo, image added lated
    };

    try {
      if (!selectedItem?._id) {
        await AddConfigsFeeAccount(payload);
        toast.success('Successfully Added...')
        setFeeAccount("");
        setReportHeader("");
      } else {
        await updateConfigsFeeAccount({ ...payload, id: selectedItem._id });
        toast.success('Successfully Updated...')
        setFeeAccount("");
        setReportHeader("");
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
        setFeeAccount("");
        setReportHeader("");
      }}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" mb={3} component="h4">
        Account
        </Typography>
        <Box sx={{ width: "100%" }}>
          <TextField
            id="fee"
            label="Fee Account"
            fullWidth
            value={feeAccount}
            variant="outlined"
            onChange={(e) => setFeeAccount(e.target.value)}
          />
        </Box>
        <Box sx={{ width: "100%",mt:2 }}>
          <TextField
            id="report"
            label="Report Header"
            fullWidth
            value={reportHeader}
            variant="outlined"
            onChange={(e) => setReportHeader(e.target.value)}
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

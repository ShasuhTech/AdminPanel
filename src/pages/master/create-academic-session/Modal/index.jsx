"use client";
import CustomButton from "@/components/CommonButton/CustomButton";
import {
  AddAccountType,
  AddConfigs,
  GetAccountTypeId,
  updateAccountType,
  updateConfigs,
} from "@/services/api";
import { GetHolidayById } from "@/services/Attendance";
import Config from "@/utilities/Config";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { DatePicker } from "@mui/x-date-pickers";

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

const AccountTypeModal = ({ open, handleClose, selectedItem }) => {
  console.log(selectedItem, "--selectedItem");

  const [dateFrom, setDateFrom] = useState(dayjs(new Date()));
  const [dateTo, setDateTo] = useState(dayjs(new Date()));
  const [sessionStart, setSessionStart] = useState("");
  const [sessionEnd, setSessionEnd] = useState("");
  const [showParentLogin, setShowParentLogin] = useState(true);
  const [enablePayment, setEnablePayment] = useState(true);

  // useEffect(() => {
  //   setRemark(selectedItem?.name || "");
  // }, [selectedItem]);

  const submitHandler = async () => {
    const payload = {
      fromDate: dateFrom,
      toDate: dateTo,
      sessionStart: sessionStart,
      sessionEnd: sessionEnd,
      showParentLogin: showParentLogin,
      enablePayment: enablePayment,
      type:'Academic Session'
    };

    try {
      if (!selectedItem?._id) {
        const res = await AddConfigs(payload);
        if (res?.success) {
          toast.success("Successfully Added...");
        }
      } else {
        const res = await updateConfigs({
          ...payload,
          id: selectedItem._id,
        });
        if (res?.success) {
          toast.success("Successfully Updated...");
        }
      }
      handleClose();
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
          Academic Session
        </Typography>

        <Box sx={{ width: "100%" }}>
          <div className="flex items-center justify-center gap-5 mb-5">
            <div className="w-[100%] ">
              <TextField
                id="remark"
                label="Session Start"
                fullWidth
                value={sessionStart}
                variant="outlined"
                onChange={(e) => setSessionStart(e.target.value)}
              />
            </div>
            {
              <TextField
                id="remark"
                label="Session End"
                fullWidth
                value={sessionEnd}
                variant="outlined"
                onChange={(e) => setSessionEnd(e.target.value)}
              />
            }
          </div>
          <div className="flex items-center justify-center gap-5 mb-5">
            <div className="w-[100%] ">
              <DatePicker
                label={"Start Date"}
                value={dateFrom}
                className="w-full"
                onChange={(newValue) => setDateFrom(newValue)}
                renderInput={(params) => (
                  <TextField {...params} variant="outlined" />
                )}
              />
            </div>
            {
              <div className="w-[100%]">
                <DatePicker
                  label="End Date"
                  value={dateTo}
                  className="w-full"
                  fullWidth
                  onChange={(newValue) => setDateTo(newValue)}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" fullWidth />
                  )}
                />
              </div>
            }
          </div>

          <FormGroup className="flex items-center flex-1">
            <FormControlLabel
              required
              control={
                <Checkbox
                  checked={showParentLogin}
                  onChange={(e) => setShowParentLogin(e.target.checked)}
                />
              }
              label="Show in parent login"
            />
            <FormControlLabel
              required
              control={
                <Checkbox
                  checked={enablePayment}
                  onChange={(e) => setEnablePayment(e.target.checked)}
                />
              }
              label="Enable payment gateway in parent login"
            />
          </FormGroup>
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

export default AccountTypeModal;

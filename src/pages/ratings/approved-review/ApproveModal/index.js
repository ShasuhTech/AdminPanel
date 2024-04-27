import CommonButton from "@/components/CommonButton";
import Confirmation from "@/components/Modal/Confirmation";
import SimpleModal from "@/components/Modal/SimpleModal";
import { requestChangeAproval } from "@/services/api";
import { Close } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";

const AprovalModal = ({ open, handleClose, data, showBtn, selectedData }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [status, setstatus] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpen = (status) => {
    console.log(status);
    setOpenConfirmation(true);
    setstatus(status);
    // handleClose()
  };
  console.log(data, "dhhh");
  const handleCloseConfirm = () => {
    setOpenConfirmation(false);
  };
  //   ||2 ,'reject 3'
  const approveDetails = async () => {
    const payload = {
      requestId: data?.id,
      status: status === "accept" ? 2 : 3,
      addressId: data?.salon?.address?.id,
    };
    try {
      const resp = await requestChangeAproval(payload);
      if (resp?.code === 200) {
        toast.success(resp?.data?.message || "Successfully Approved");
        handleCloseConfirm();
        handleClose();
        getUserData();
      }
      console.log(resp);
    } catch (error) {
      //   toast.error(error.message); // Fix error message
    }
  };

  // const images = data?.data.filter(item => item.id === data?.id)[0]?.changeRequested.images || [];
  const text = data.map((ele) => {
    return ele.fromName;
  });

  return (
    <SimpleModal open={open} handleClose={handleClose} width={856}>
      <Grid
        onClick={handleClose}
        className="absolute  right-10 cursor-pointer font-bold top-10"
      >
        <Close />
      </Grid>
      <Typography variant="h5" fontWeight={"500"} className="modal_header">
        Review Details
      </Typography>
      <Box
        style={{ maxHeight: "80vh", overflowY: "auto" }}
        className="overflow_deisgn"
      >
        <Grid
          className="flex py-3 "
          item
          xs={12}
          style={{ display: "flex", alignItems: "center", gap: "55px" }}
        >
          <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <CalendarMonthIcon />
            20 February 2024
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <AccessTimeIcon />
            09:45 Am
          </p>
        </Grid>
        <div className="border_bottom pb-5">
          <Grid
            item
            xs={12}
            style={{ display: "flex", alignItems: "center", gap: "60px" }}
            className="py-3"
          >
            <div className="font_color">
              <h5 className="fontsize">Customer Name:</h5>
              <p>Booking ID:</p>
            </div>
            <div className="font_color">
              <h5 className="fontsize2">{selectedData.toName}</h5>
              <p>Looks-1234</p>
            </div>
          </Grid>
          <Grid
            item
            xs={12}
            style={{ display: "flex", alignItems: "center", gap: "90px" }}
          >
            <div className="font_color">
              <h5 className="fontsize">Salon Name:</h5>
              <p>Salon ID:</p>
            </div>
            <div className="font_color">
              <h5 className="fontsize2">Looks</h5>
              <p>{selectedData.fromName}</p>
            </div>
          </Grid>
        </div>
        <div className="py-3">
          <Typography variant="h6" className="mb-2 font_set">
            Ratings Given:
          </Typography>
          <div className="flex gap-2 startSizes py-2">
            <StarIcon />
            <StarIcon />
            <StarIcon />
            <StarIcon />
            {/* <StarHalfIcon /> */}
          </div>
        </div>
        <div className="pt-2">
          <Typography variant="h6" className="mb-2 font_set">
            Rating Text:
          </Typography>
          <div className="flex gap-2  pb-2">
            <button className="btn-demand">Demanding</button>
            <button className="btn-demand">Not Friendly</button>
          </div>
        </div>
        <div className="pt-2">
          <Typography variant="h6" className="mb-2 font_set">
            Comment Text:
          </Typography>
          <div className="pb-2 font-comment">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit
            </p>
          </div>
        </div>
      </Box>
      {!showBtn && (
        <Grid className="mt-[50px] gap-3 flex justify-end">
          <button
            onClick={() => handleClickOpen("reject")}
            className="bg-reject text-white  font-bold py-2 px-12 rounded-md"
          >
            Reject
          </button>
          <button
            onClick={() => handleClickOpen("accept")}
            className="bg-approve text-white  font-bold py-2 px-12 rounded-md"
          >
            Approve
          </button>
        </Grid>
      )}
      {openConfirmation && (
        <Confirmation
          open={openConfirmation}
          handleClose={handleCloseConfirm}
          onClick={approveDetails}
          message={`${status}`}
          message2={`${data.salon.name}`}
        />
      )}
    </SimpleModal>
  );
};

export default AprovalModal;

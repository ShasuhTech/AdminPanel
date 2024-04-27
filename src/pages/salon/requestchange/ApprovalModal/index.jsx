import CommonButton from "@/components/CommonButton";
import Confirmation from "@/components/Modal/Confirmation";
import SimpleModal from "@/components/Modal/SimpleModal";
import { requestChangeAproval } from "@/services/api";
import { Close } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Image from "next/image";
import React from "react";
import { useState } from "react";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const AprovalModal = ({ open, handleClose, data, showBtn,updateDocumentList }) => {
  console.log(data, "puneetsingh");
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [status, setstatus] = useState(false);
  const [openRemarksModal, setOpenRemarksModal] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [remarksError, setRemarksError] = useState(""); 
  const router = useRouter();

  const handleClickOpen = (status) => {
    console.log(status);
    if(status === 'reject'){
      setOpenRemarksModal(true)
    }else{
      setOpenConfirmation(true)
    }

    setstatus(status);

    router.push('/salon/requestchange')
    // handleClose()
  };


  const handleRemarksChange = (e) => {
    const { value } = e.target;
    setRemarks(value);
    // Check for errors and update the error state
    if (value.trim() === "") {
      setRemarksError("Remarks cannot be empty");
    } else {
      setRemarksError("");
    }
  };


  const handleRemarksModalClose = () => {
    setOpenRemarksModal(false);
    setstatus(""); 
    setRemarks("");
  };

  // const handleRemarksSubmit = () => {
  //   setOpenRemarksModal(false);
  //   setOpenConfirmation(true);
  // };
  const handleRemarksSubmit = () => {
    // Check if remarks are empty
    if (remarks.trim() === "") {
      setRemarksError("Remarks cannot be empty");
    } else {
      setRemarksError("");
      // Proceed with submission logic
      setOpenRemarksModal(false);
      setOpenConfirmation(true);
    }
  };

  const handleCloseConfirm = () => {
    setOpenConfirmation(false);
  };
  const approveDetails = async () => {
    let payload = {
      requestId: data?.id,
      status: status === "accept" ? 2 : 3,
      addressId: data?.salon?.address?.id,
    };
    if (status === "reject") {
      payload = {
        ...payload,
        remarks: remarks 
      };
    }
    try {
      const resp = await requestChangeAproval(payload);
      if (resp?.code === 200) {
        toast.success(resp?.data?.message || "Successfully Approved");
        handleCloseConfirm();
        handleClose();
       updateDocumentList()
      }
      console.log(resp);
    } catch (error) {
      //   toast.error(error.message); // Fix error message
    }
  };

  // const images = data?.data.filter(item => item.id === data?.id)[0]?.changeRequested.images || [];

  return (
    <SimpleModal open={open} handleClose={handleClose} width={856}>
      <Grid
        onClick={handleClose}
        className="absolute  right-10 cursor-pointer font-bold top-10"
      >
        <Close />
      </Grid>
      <Typography variant="h5" fontWeight={"500"} className="modal_header">
        Requested Details
      </Typography>
      <Box
        style={{ maxHeight: "80vh", overflowY: "auto" }}
        className="overflow_deisgn"
      >
        <div className="flex flex-wrap justify-center">
          {/* Display images */}
         
          {/* Display inside image */}
          {data.changeRequested.insideImage && (
            <div className="w-full mt-4">
              <span className=" font-bold" style={{ fontSize: "17px" }}>
            Salon Images
          </span>
              <div className="flex flex-wrap gap-5">
                <Grid className=" my-2 bg-white  rounded  overflow-hidden  px-1 ">
                <span className="text-center text-[15px] ">Inside Image</span>
                  {/* <Image
                    src={data.changeRequested.insideImage.url}
                    alt="Inside Image"
                    width={300}
                    height={250}
                    className="object-cover border rounded-lg cursor-pointer"
                  /> */}
                   <img
                src={data.changeRequested.insideImage.url}
                alt="Inside Image"
                className="w-[300px] h-[200px] object-cover border rounded-lg cursor-pointer"
              />
                </Grid>
              
                <Grid className=" my-2 bg-white  rounded  overflow-hidden  px-1 ">
                <span className="text-center text-[15px] ">Outside Image</span>
                  {/* <Image
                    src={data.changeRequested.outsideImage.url}
                    alt="outside Image"
                    width={300}
                    height={250}
                    className="object-cover border rounded-lg cursor-pointer"
                  /> */}
                     <img
                src={data.changeRequested.outsideImage.url}
                alt="Outside Image"
                className="w-[300px] h-[200px] object-cover border rounded-lg cursor-pointer"
              />
                </Grid>
              </div>
            </div>
          )}
          {/* Display outside image */}
          {/* {data.changeRequested.outsideImage && (
            <div className="w-full mt-4">
              <Typography variant="h6" className="mb-2 font_set">
                Outside Image:
              </Typography>
              <div className="flex flex-wrap ">
                <Grid className=" my-2 bg-white  rounded  overflow-hidden  px-1 custom_img">
                  <Image
                    src={data.changeRequested.outsideImage.url}
                    alt="Outside Image"
                    width={200}
                    height={200}
                  />
                </Grid>
              </div>
            </div>
          )} */}
          {/* Display video */}
          {data?.changeRequested?.video && (
            <div className="w-full mt-10">
               <span className=" font-bold mb-5" style={{ fontSize: "17px" }}>
            Salon Video
            </span>
              <div className="fflex flex-wrap">
                <Grid className=" my-2 bg-white  rounded  overflow-hidden  px-1 custom_vedio">
                  <ReactPlayer
                    url={data.changeRequested.video.url}
                    controls
                    width={300}
                    height={180}
                    style={{marginTop:'35px'}}
                  />
                </Grid>
              </div>
            </div>
          )}

          {/* gallery image */}
          {data.changeRequested.images &&
            data.changeRequested.images.length > 0 && (
              <div className="w-full mt-10">
                 <span className=" font-bold mb-5" style={{ fontSize: "17px" }}>
                 Salon Gallery
            </span>
                <div className="flex flex-wrap ">
                  {data.changeRequested.images.map((image, index) => (
                    <Grid
                      key={index}
                      className=" my-2 bg-white  rounded  overflow-hidden  px-1 custom_img"
                    >
                      <Image
                        src={image.url}
                        alt={`Image ${index}`}
                        width={200}
                        height={200}
                      />
                    </Grid>
                    // <div key={index} className="m-2 border border-gray-300 rounded-lg overflow-hidden">

                    // </div>
                  ))}
                </div>
              </div>
            )}

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
            onClick={() => handleClickOpen("approve")}
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


<Dialog open={openRemarksModal} onClose={handleRemarksModalClose} sx={{borderRadius:'20px'}}>
        <DialogTitle style={{fontWeight:'bold', marginBottom:'20px'}}>Enter Remarks</DialogTitle>
        <DialogContent sx={{width:'450px' }}>
          <DialogContentText sx={{marginBottom:'5px',fontWeight:'bold'}}>
            Please enter remarks for rejecting the Salon:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="remarks"
            label="Remarks"
            type="text"
            fullWidth
            value={remarks}
            // onChange={(e) => setRemarks(e.target.value)}
            onChange={handleRemarksChange} 
            error={!!remarksError} 
            helperText={remarksError}
          />
        </DialogContent>
        <DialogActions >
          <Button onClick={handleRemarksModalClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleRemarksSubmit} variant="contained" style={{marginRight:'15px', marginLeft:'15px'}}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </SimpleModal>

    
  );
};

export default AprovalModal;

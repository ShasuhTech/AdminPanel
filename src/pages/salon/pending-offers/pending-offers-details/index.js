import { pendingOfferList, updateStatusCustomOffers } from "@/services/api";
import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Typography,
  Paper,
  Grid,
  TableContainer,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  Table,
  CircularProgress,
  Box,
  Autocomplete,
  Pagination,
  Radio,
  TablePagination,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
 
 
} from "@mui/material";
import { useRouter } from "next/router";
import moment from "moment";
import Confirmation from "@/components/Modal/Confirmation";
import { toast } from "react-toastify";

const PendingOffersDetails = () => {
  const [loading, setLoading] = useState(false);
  const [offerDetails, setOfferDetails] = useState(null);
  const [pagination, setPagination] = useState({});
  const router = useRouter();
  const [openRemarksModal, setOpenRemarksModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState("1");
  const [open, setOpen] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [remarks, setRemarks] = useState("");
  const [remarksError, setRemarksError] = useState(""); 
  // const [searchText, setSearchText] = useState("");
  // const [selectedSalon, setSelectedSalon] = useState(null);

  const handleActionChange = (event) => {
    setSelectedAction(event.target.value);
    if (event.target.value === "reject") {
      setOpenRemarksModal(true);
    } else {
      setOpenConfirmation(true);
    }
  };

  const handleConfirmationClose = () => {
    setOpenConfirmation(false);
    setSelectedAction("");
    setSelectedAction("1")
  };

  const handleConfirmationProceed = async () => {
    setOpenConfirmation(false);
    try {
      let payload = {
        offerId: router.query.id,
        salonId: offerDetails?.salonId,
        status: selectedAction === "approve" ? 1 : 4,
      };
      if (selectedAction === "reject") {
        payload = {
          ...payload,
          remarks: remarks 
        };
      }
      const res = await updateStatusCustomOffers(payload);
      if (res.success) {
        toast.success("Offer status updated successfully.");
        router.push("/salon/pending-offers");
      } else {
        toast.error("Failed to update offer status.");
      }
    } catch (error) {
        toast.error("Error occurred while updating offer status:", error);
      
    }
  };

  const handleRemarksModalClose = () => {
    setOpenRemarksModal(false);
    setSelectedAction(""); 
    setRemarks("");
    setSelectedAction('1')
  };

  const handleRemarksSubmit = () => {
    if (remarks.trim() === "") {
      setRemarksError("Remarks cannot be empty");
    } else {
      setRemarksError("");
      // Proceed with submission logic
      setOpenRemarksModal(false);
      setOpenConfirmation(true);
    }
    // setOpenRemarksModal(false);
    // setOpenConfirmation(true);
  };


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await pendingOfferList();
        const foundOffer = res.data.find((offer) => offer.id === Number(router.query.id));
        setOfferDetails(foundOffer);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching offer details:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [router.query.id]);

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


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      {loading ? (
        <p className="text-gray-700">Loading...</p>
      ) : offerDetails ? (

        <div style={{backgroundColor:'white', width:'95%', height:'vh', paddingTop:'15px', paddingLeft:'20px',paddingBottom:'20px'}}>
            <FormControl style={{marginLeft:'85%'}}>
            <Select value={selectedAction} onChange={handleActionChange} defaultValue="Change Status" style={{width:'140px', height:'40px',}}>
            <MenuItem value="1" disabled>Update Status</MenuItem>
              <MenuItem value="approve">Approve</MenuItem>
              <MenuItem value="reject">Reject</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{marginTop:'15px'}}></Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight:'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Offer Title :</Typography>
  </Box>
  <Box sx={{ width: '80%', fontWeight: 'normal' }}>
    <Typography align='left' sx={{ fontWeight: 'normal' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    {offerDetails.title}
    </Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight:'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Salon Name:</Typography>
  </Box>
  <Box sx={{ width: '80%', fontWeight: 'normal' }}>
    <Typography align='left' sx={{ fontWeight: 'normal' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    {offerDetails.name}
    </Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight:'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Offer Image :</Typography>
  </Box>
  <Box sx={{ width: '80%', fontWeight: 'normal' }}>
  <div style={{width:'200px', height:'150px',marginLeft:'1%',border:'solid #dad9de 2px', borderRadius:'5px', marginBottom:'25px'}}>
      <img src={offerDetails.slug} style={{width:'100%', height:'100%', }}/>
      </div>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Description :</Typography>
  </Box>
  <Box sx={{ width: '80%', textTransform: 'capitalize' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{offerDetails.desc}</Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Status :</Typography>
  </Box>
  <Box sx={{ width: '80%', textTransform: 'capitalize' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{offerDetails.statusText}</Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
<Box sx={{ width: '20%' }}>
  <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Offer Discount % :</Typography>
</Box>
<Box sx={{ width: '80%', textTransform: 'capitalize' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
  <Typography align='left'>
    {offerDetails.offerPercentage ? `${offerDetails.offerPercentage}%` : "0%"}
  </Typography>
</Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight:'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Max Amount :</Typography>
  </Box>
  <Box sx={{ width: '80%', fontWeight: 'normal' }}>
    <Typography align='left' sx={{ fontWeight: 'normal' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    {offerDetails?.maxAmountInPaisa === null ? '₹ 0' : (`₹ ${offerDetails?.maxAmountInPaisa}`)}
    </Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>User Limit :</Typography>
  </Box>
  <Box sx={{ width: '80%' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{offerDetails?.userLimit} </Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Start Date :</Typography>
  </Box>
  <Box sx={{ width: '80%', textTransform: 'capitalize' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{moment(offerDetails?.startDate).format('DD/MM/YYYY')}</Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>End Date :</Typography>
  </Box>
  <Box sx={{ width: '80%', textTransform: 'capitalize' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{moment(offerDetails?.endDate).format('DD/MM/YYYY')}</Typography>
  </Box>
</Box>
</div>
      ) : (
        <p className="text-gray-700">Offer not found.</p>
      )}

      {offerDetails && offerDetails.type === 1 && offerDetails.salonOfferUser && (
        <div style={{backgroundColor:'white', width:'95%', height:'vh', paddingTop:'15px', paddingLeft:'20px',paddingBottom:'20px'}}>
         <table style={{ borderCollapse: 'collapse', width: '90%' , marginTop:'25px'}}>
            <thead>
              <tr>
                <th style={{ border: '2px solid #ddd', padding: '8px' }}>ID</th>
                <th style={{ border: '2px solid #ddd', padding: '8px' }}>First Name</th>
                <th style={{ border: '2px solid #ddd', padding: '8px' }}>Last Name</th>
                <th style={{ border: '2px solid #ddd', padding: '8px' }}>Contact Mobile Number</th>
              </tr>
            </thead>
            <tbody>
              {offerDetails.salonOfferUser.map((offerUser) => (
                <tr key={offerUser.id}>
                  <td style={{ border: '2px solid #ddd', padding: '8px' }}>{offerUser.id}</td>
                  <td style={{ border: '2px solid #ddd', padding: '8px' }}>{offerUser.firstName}</td>
                  <td style={{ border: '2px solid #ddd', padding: '8px' }}>{offerUser.lastName}</td>
                  <td style={{ border: '2px solid #ddd', padding: '8px' }}>{offerUser.contactMobileNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
 
      )}

      {offerDetails && offerDetails.type === 2 && offerDetails.salonOfferCategory && (
       <div style={{backgroundColor:'white', width:'95%', height:'vh', paddingTop:'15px', paddingLeft:'20px',paddingBottom:'20px'}}>
          <table style={{ borderCollapse: 'collapse', width: '90%' , marginTop:'25px'}}>
            <thead>
              <tr>
                <th style={{ border: '2px solid #ddd', padding: '8px' }}>ID</th>
                <th style={{ border: '2px solid #ddd', padding: '8px' }}>Category Text</th>
              </tr>
            </thead>
            <tbody>
              {offerDetails.salonOfferCategory.map((category) => (
                <tr key={category.id}>
                  <td style={{ border: '2px solid #ddd', padding: '8px' }}>{category.id}</td>
                  <td style={{ border: '2px solid #ddd', padding: '8px' }}>{category.categoryText}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
      
      )}

{offerDetails && offerDetails.type === 3 && offerDetails.salonOfferService && (
     <div style={{backgroundColor:'white', width:'95%', height:'vh', paddingTop:'15px', paddingLeft:'20px',paddingBottom:'20px'}}>
        <table style={{ borderCollapse: 'collapse', width: '90%' , marginTop:'25px'}}>
          <thead>
            <tr>
              <th style={{ border: '2px solid #ddd', padding: '8px' }}>ID</th>
              <th style={{ border: '2px solid #ddd', padding: '8px' }}>Service Name</th>
              <th style={{ border: '2px solid #ddd', padding: '8px' }}>Description</th>
              <th style={{ border: '2px solid #ddd', padding: '8px' }}>Category ID</th>
              <th style={{ border: '2px solid #ddd', padding: '8px' }}>Min Time</th>
              <th style={{ border: '2px solid #ddd', padding: '8px' }}>Max Time</th>
            </tr>
          </thead>
          <tbody>
            {offerDetails.salonOfferService.map((service) => (
              <tr key={service.id}>
                <td style={{ border: '2px solid #ddd', padding: '8px' }}>{service.id}</td>
                <td style={{ border: '2px solid #ddd', padding: '8px' }}>{service.offerService.name}</td>
                <td style={{ border: '2px solid #ddd', padding: '8px' }}>{service.offerService.desc}</td>
                <td style={{ border: '2px solid #ddd', padding: '8px' }}>{service.offerService.categoryId}</td>
                <td style={{ border: '2px solid #ddd', padding: '8px' }}>{service.offerService.minTime}</td>
                <td style={{ border: '2px solid #ddd', padding: '8px' }}>{service.offerService.maxTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

    )}

     {offerDetails && offerDetails.type === 4 && offerDetails.salonOfferSlot && (
    <div style={{backgroundColor:'white', width:'95%', height:'vh', paddingTop:'15px', paddingLeft:'20px',paddingBottom:'20px'}}>
        <table style={{ borderCollapse: 'collapse', width: '90%' , marginTop:'25px'}}>
          <thead>
            <tr>
              <th style={{ border: '2px solid #ddd', padding: '8px' }}>ID</th>
              <th style={{ border: '2px solid #ddd', padding: '8px' }}>Day</th>
              <th style={{ border: '2px solid #ddd', padding: '8px' }}>Status</th>
              <th style={{ border: '2px solid #ddd', padding: '8px' }}>Start Time</th>
              <th style={{ border: '2px solid #ddd', padding: '8px' }}>End Time</th>
              <th style={{ border: '2px solid #ddd', padding: '8px' }}>Interval</th>
              <th style={{ border: '2px solid #ddd', padding: '8px' }}>Is Break</th>
            </tr>
          </thead>
          <tbody>
            {offerDetails.salonOfferSlot.map((slot) => (
              <tr key={slot.id}>
                <td style={{ border: '2px solid #ddd', padding: '8px' }}>{slot.id}</td>
                <td style={{ border: '2px solid #ddd', padding: '8px' }}>{slot.offerSlot.day}</td>
                <td style={{ border: '2px solid #ddd', padding: '8px' }}>{slot.offerSlot.status}</td>
                <td style={{ border: '2px solid #ddd', padding: '8px' }}>{slot.offerSlot.startTime}</td>
                <td style={{ border: '2px solid #ddd', padding: '8px' }}>{slot.offerSlot.endTime}</td>
                <td style={{ border: '2px solid #ddd', padding: '8px' }}>{slot.offerSlot.interval}</td>
                <td style={{ border: '2px solid #ddd', padding: '8px' }}>{slot.offerSlot.isBreak ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
        
    )}
    <Confirmation
        open={openConfirmation}
        handleClose={handleConfirmationClose}
        onClick={handleConfirmationProceed}
        message={`${selectedAction}`}
        message2={`${offerDetails?.title}`}
      />
      <Dialog open={openRemarksModal} onClose={handleRemarksModalClose}>
        <DialogTitle style={{fontWeight:'bold', marginBottom:'20px'}}>Enter Remarks</DialogTitle>
        <DialogContent sx={{width:'450px' }}>
          <DialogContentText sx={{marginBottom:'5px',fontWeight:'bold'}}>
            Please enter remarks for rejecting the offer:
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
        <DialogActions>
          <Button onClick={handleRemarksModalClose} variant="outlined" color="error">
            Cancel
          </Button>
          <Button onClick={handleRemarksSubmit} variant= 'contained' style={{marginRight:'15px', marginLeft:'15px'}}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>

  );
};

export default PendingOffersDetails;

"use client";
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

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from "dayjs";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import AddIcon from '@mui/icons-material/Add';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { pendingCombosList, updateStatusCustomCombo } from "@/services/api";
import { useRouter } from "next/router";
import moment from "moment";
import Confirmation from "@/components/Modal/Confirmation";
import { toast } from 'react-toastify';



const PendingComboList = () => {
    const [selectValue, setSelectValue ]= useState(1)
    const [title, setTitle ]= useState('')
    const [comboPrice, setComboPrice ]= useState('')
    const [image, setImage] = useState(null);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);
    const [pagination, setPagination] = useState(null)
    const [data, setData] = useState([])
    const [comboDetails, setComboDetails] = useState([])
    const[desc, setDesc] = useState('')
    const router = useRouter();
    const [selectedAction, setSelectedAction] = useState("1");
    const [openConfirmation, setOpenConfirmation] = useState(false);
    const [openRemarksModal, setOpenRemarksModal] = useState(false);
    const [remarks, setRemarks] = useState("");
    const [remarksError, setRemarksError] = useState(""); 


    useEffect(()=>{
      getUserData()
      console.log('id', router.query.id)
      setImage(comboDetails?.slug)
      setDesc(comboDetails?.desc)
    },[router.query.id])

    let totalAmount = 0;
comboDetails?.ItemsCustom?.forEach(row => {
  totalAmount += row.regularPrice ; 
});

    const getUserData = async () => {
        // setLoading(true);
        try {
          const payload = {
            status:3,
            include:"ItemsCustom"
            // status: filter?.status,
          };
          const res = await pendingCombosList(payload);
          setPagination(res?.meta?.pagination);
          setData(res?.data);
          console.log('data', res.data)
          const foundOffer = res.data.find((combo) => combo.id === Number(router.query.id));
          setComboDetails(foundOffer);
          console.log('comboDetails', foundOffer)
        //   setLoading(false);
        } catch (err) {
        //   setLoading(false);
          console.error("Error fetching salon data:", err);
        }
      };


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
        // setSelectedAction("");
        setSelectedAction("1")
      };
    
      const handleConfirmationProceed = async () => {
        setOpenConfirmation(false);
        console.log('ye mera approved hai')
        try {
          let payload = {
            comboId: comboDetails?.id,
            salonId: comboDetails?.salonId,
            status: selectedAction === "approve" ? 1 : 4,
          };
          if (selectedAction === "reject") {
            payload = {
              ...payload,
              remarks: remarks 
            };
          }
          console.log('ye mera approved hai 2 ')
          const res = await updateStatusCustomCombo(payload);
          if (res.success) {
            console.log("Offer status updated successfully.");
            toast.success('Offer status updated successfully')
            // getUserData({});
            router.push('/salon/pending-combos')
          } else {
            console.error("Failed to update offer status.");
            toast.error('Failed to update offer status')
          }
        } catch (error) {
          console.error("Error occurred while updating offer status:", error);
          toast.error('Error occurred while updating offer status')
        }
        setSelectedAction("1")
       
      };
    
      const handleRemarksModalClose = () => {
        setOpenRemarksModal(false);
        setSelectedAction(""); 
        setRemarks("");
        setSelectedAction("1")
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


    const handleImageChange = (e) => {
      const file = e.target.files[0];
      // You can add validation for file type, size, etc. here if needed
      setImage(URL.createObjectURL(file));
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


  return (
    
  <div style={{backgroundColor:'white', width:'95%', height:'vh', paddingTop:'15px', paddingLeft:'20px',paddingBottom:'20px'}}>

<FormControl style={{marginLeft:'85%'}}>
            <Select value={selectedAction} onChange={handleActionChange} defaultValue="Change Status" style={{width:'140px', height:'40px',}}>
            <MenuItem value="1" disabled>Update Status</MenuItem>
              <MenuItem value="approve">Approve</MenuItem>
              <MenuItem value="reject">Reject</MenuItem>
            </Select>
          </FormControl>
         



<Box sx={{marginTop:'15px'}}>

<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight:'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Combo Title :</Typography>
  </Box>
  <Box sx={{ width: '80%', fontWeight: 'normal' }}>
    <Typography align='left' sx={{ fontWeight: 'normal' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    {comboDetails?.name ? comboDetails?.name : ''}
    </Typography>
  </Box>
</Box>

    
  
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight:'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Combo Image :</Typography>
  </Box>
  <Box sx={{ width: '80%', fontWeight: 'normal' }}>
  <div style={{width:'200px', height:'150px',marginLeft:'',border:'solid #dad9de 2px', borderRadius:'5px', marginBottom:'25px'}}>
      <img src={comboDetails?.slug} style={{width:'100%', height:'100%', }}/>
      </div>
  </Box>
</Box>
  



<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Description :</Typography>
  </Box>
  <Box sx={{ width: '80%', textTransform: 'capitalize' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{comboDetails?.desc}</Typography>
  </Box>
</Box>

<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight:'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Combo Price :</Typography>
  </Box>
  <Box sx={{ width: '80%', fontWeight: 'normal' }}>
    <Typography align='left' sx={{ fontWeight: 'normal' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    {`₹ ${(comboDetails?.finalNetAmountInPaisa)}`}
    </Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Booking Limit :</Typography>
  </Box>
  <Box sx={{ width: '80%' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{comboDetails?.bookingLimit} </Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Start Date :</Typography>
  </Box>
  <Box sx={{ width: '80%', textTransform: 'capitalize' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{moment(comboDetails?.startDate).format('DD/MM/YYYY')}</Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>End Date :</Typography>
  </Box>
  <Box sx={{ width: '80%', textTransform: 'capitalize' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{moment(comboDetails?.endDate).format('DD/MM/YYYY')}</Typography>
  </Box>
</Box>

           
</Box>

<Box sx={{marginTop:'25px', }}>
    <Grid container spacing={2} className="flex justify-between">
        <Grid item>
         <Typography variant="h5" style={{}}>Services Added</Typography>
        </Grid>
       
    </Grid>


    <table style={{ borderCollapse: 'collapse', width: '90%' , marginTop:'25px'}}>
      <thead>
        <tr>
          <th style={{ border: '2px solid #ddd', padding: '8px' }}>Service Id</th>
          <th style={{ border: '2px solid #ddd', padding: '8px' }}>Category Name</th>
          <th style={{ border: '2px solid #ddd', padding: '8px' }}>Description</th>
          <th style={{ border: '2px solid #ddd', padding: '8px' }}>Amount</th>
          
        </tr>
      </thead>
      <tbody>
        {comboDetails?.ItemsCustom?.map((row, index) => (
          <tr key={index}>
            <td style={{ border: '2px solid #ddd', padding: '8px' }}>{row.serviceId}</td>
            <td style={{ border: '2px solid #ddd', padding: '8px' }}>{row.name}</td>
            <td style={{ border: '2px solid #ddd', padding: '8px' }}>{row.name}</td>
            <td style={{ border: '2px solid #ddd', padding: '8px' }}>₹ {(row.regularPrice)}</td>
          </tr>
        ))}
         <tr>
                        <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight:'bold' }} colSpan="3">Total</td>
                        <td style={{ border: '1px solid #ddd', padding: '8px', fontWeight:'bold' }}>₹ {totalAmount}</td>
                    </tr>
      </tbody>
    </table>
    
</Box>

<Confirmation
        open={openConfirmation}
        handleClose={handleConfirmationClose}
        onClick={handleConfirmationProceed}
        message={`${selectedAction}`}
        message2={comboDetails?.name}
      />
      <Dialog open={openRemarksModal} onClose={handleRemarksModalClose} sx={{borderRadius:'20px'}}>
        <DialogTitle style={{fontWeight:'bold', marginBottom:'20px'}}>Enter Remarks</DialogTitle>
        <DialogContent sx={{width:'450px' }}>
          <DialogContentText sx={{marginBottom:'5px',fontWeight:'bold'}}>
            Please enter remarks for rejecting the combo:
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


  </div>



  );
};

export default PendingComboList;


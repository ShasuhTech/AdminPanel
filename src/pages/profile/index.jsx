"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
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
  tableCellClasses,
  styled,
  Pagination,
  TablePagination,
  Box,
  TextField,
  InputLabel,
  MenuItem,
  CardContent,
  Card,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import { serviceList } from "@/services/api";
import QuickSearchToolbar from "@/components/SearchBar";
import { exportToCSV } from "@/components/Common";
import CustomButton from "@/components/CommonButton/FilterButton";
import ResetButton from "@/components/CommonButton/ResetButton";
import Select from '@mui/material/Select';
import axios from "axios";
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRouter } from "next/router";
import moment from "moment";
import { PhotoCamera } from "@mui/icons-material";
 
 
 
 
const ProfileDetails = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [gender, setGender] = useState(1)
  const [DOB, setDOB] = useState('')
  const [ProfilePic, setProfilePic] = useState('')
  const [open, setOpen] = useState(false);
  const [kycMobile, setKYCMobile] = useState('')
  const [kycDone, setKYCDone] = useState('')
  const [mobileVerified, setMobileVerified] = useState('')
  const [createdAt, setCreatedAt] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);
  const[imageURL, setImageURL] = useState(null)
  const [loading, setLoading] = useState(false);
 
  const router = useRouter();
 
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("Data"));
    setFirstName(storedData?.firstName)
    setLastName(storedData?.lastName === null? "" : storedData?.lastName )
    setEmail(storedData?.email)
    setMobileNumber(storedData?.contactMobileNumber)
    setDOB(storedData?.dob)
    setGender(storedData?.gender)
    setProfilePic(storedData?.profilePictureSlug)
    setKYCMobile(storedData?.kycMobileNumber)
    setCreatedAt(storedData?.createdAt)
    setKYCDone(storedData?.isKycDone)
    setMobileVerified(storedData?.isMobileVerified)
  }, []);
 
 
 
 
  const handleChange = (e)=>{
    setGender(e.target.value)
 
  }
 
  const handleEditProfile = () => {
    // setOpen(true);
   
  router.push("/profile/editProfile");
 
};
 
const handlePopUpClose = () => {
  setOpen(false);
  // setStatus(6)
}
 
const handleBackButton = () => {
 
  router.push("/profile");
 
};
 
 
// const handleImageChange = async(e) => {
//   const file = e.target.files[0];
//   setSelectedImage(file);
 
//   if (file) {
//     const reader = new FileReader();
//     reader.onload = () => {
//       const imageUrl = reader.result;
//       console.log('Image URL:', imageUrl);
//       setImageURL(imageUrl)
//     };
//     reader.readAsDataURL(file);
 
// try{
//   const response = await axios.post('https://salon-apis.deepmindz.co/admin/auth/login', imageURL)
//   console.log(response?.data?.data?.profilePictureSlug)
// }catch(e){
//   console.log("image is not uploaded")
 
// }
   
//   }
 
 
// };
 
const handleImageChange = async(e) => {
  const file = e.target.files[0];
  setSelectedImage(file);
 
//   setLoading(true);
//   // return axiosInstance
//   return axios.create({ baseURL: 'https://salon-apis.deepmindz.co/',
//     timeout: 30000,})
//     .post('/file-object/upload-url', {
//       n: '1',
//       path: `customer/${data?.data?.id}/profile`,
//       extensions: [arg1.file.type.split('/')[1]],
//       fileNames: [arg1.file.name],
//     })
//     .then((res) => {
//       if (res.data.success) {
//         return axios
//           .put(res.data.data[0].url, arg1.file, {
//             headers: { 'Content-Type': arg1.file.type },
//           })
//           .then(async (s3Response) => {
//             if (s3Response.status === 200) {
//               toast.success('Successfully Uploaded');
//               const data1 = res.data.data[0];
//               setImageURL({
//                 key: data1?.key,
//                 signedUrl: data1?.signedUrl,
//               });
//               setLoading(false);
//             }
//           })
//           .catch((err) => {
//             setLoading(false);
//             toast.error('An error occurred while trying to upload file.');
//             throw err;
//           });
//       }
//     })
//     .catch((err) => {
//       setLoading(false);
//       throw err;
//     });
 
//       const payload = {
//         profilePictureSlug: imageUrl
//       };
 
//       // Send the POST request with the data object
//       axios.post('https://salon-apis.deepmindz.co/admin/auth/login', payload)
//         .then(response => {
//           console.log(response?.data?.data?.profilePictureSlug);
//         })
//         .catch(error => {
//           console.error("Error:", error);
//         });
   
   
 
};
 
 
 
 
  return (
 
<Grid container spacing={6}>
 
  <Grid item xs={12}>
    <Typography variant='h4' sx={{color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.25px', fontFamily:'Sora, sans-serif'}}>My Profile</Typography>
    <Typography sx={{ mt: 2,mb:-3, whiteSpace: 'nowrap' , fontWeight: 'normal' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Welcome to your Dashboard.</Typography>
  </Grid>
 
  <Grid item xs={12}>
  <Card sx={{borderRadius:'10px' }}>
 
  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb:2, ml:2, mt:2}}>
  <Box sx={{ width:'90%', fontSize:'40px'}}>
    <Typography variant="h1" sx={{ fontWeight:'normal' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Inter, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize:'40px'}}>{firstName} {lastName}</Typography>
  </Box>
  {/* <Box sx={{ width: '10%' }}>
   <Button sx={{}}  onClick={handleEditProfile}>Edit</Button>
  </Box> */}
 
</Box>
<div style={{ backgroundColor: '#e8e8eb', height: '1px', width: '100%' }} />
 
 
<Box sx={{ pt: 2, pb: 1 , pl:2}}>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
  <Box sx={{ width: '20%' }}>
    <Typography align='justify' sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'  }} >
      Profile Picture :
    </Typography>
  </Box>
  {/* <Box sx={{ width: '80%' }}>
         <div class="rounded-full overflow-hidden w-[100px] h-[100px] ">
          {ProfilePic ?<img src={ProfilePic} alt="profile pic" className="w-[100px] h-[100px]"/>:  <img src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0D8ABC&color=fff`} alt="Image" className="w-[100px] h-[100px]"/>}
 
 </div>
  </Box> */}
 
<Box sx={{ width: '80%', marginTop: '15px', pl: 2, position: 'relative' }} >
            <div className="rounded-full overflow-hidden w-[100px] h-[100px] ">
              {selectedImage ? (
                <img src={URL.createObjectURL(selectedImage)} alt="Image" className="w-[100px] h-[100px]"/>
              ) : (
                // <img src={ProfilePic} alt="Profile Pic" className="w-[100px] h-[100px]"/>
               
                  ProfilePic?(<img src={ProfilePic} alt="Profile Pic" className="w-[100px] h-[100px]"/>):(<img src={`https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=0D8ABC&color=fff`} alt="Image" className="w-[100px] h-[100px]"/>)
               
              )}
              <label htmlFor="icon-button-file" style={{ position: 'absolute', bottom: '-10px', left: '10%', transform: 'translateX(-50%)' }}>
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="icon-button-file"
                  type="file"
                  onChange={handleImageChange}
                />
                <IconButton
                  color="white"  
                  aria-label="upload picture"
                  component="span"
                  sx={{ backgroundColor: 'white', border:'1px solid black'}}
                >
                  <PhotoCamera />
                </IconButton>
              </label>
            </div>
          </Box>
 
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight:'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>First Name :</Typography>
  </Box>
  <Box sx={{ width: '80%', fontWeight: 'normal' }}>
    <Typography align='left' sx={{ fontWeight: 'normal' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    {firstName}
    </Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Last Name :</Typography>
  </Box>
  <Box sx={{ width: '80%' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{lastName} </Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Email :</Typography>
  </Box>
  <Box sx={{ width: '80%', textTransform: 'capitalize' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{email}</Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Contact Number :</Typography>
  </Box>
  <Box sx={{ width: '80%', textTransform: 'capitalize' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{mobileNumber}</Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Gender :</Typography>
  </Box>
  <Box sx={{ width: '80%' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{gender}</Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold',color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif' }}>DOB :</Typography>
  </Box>
  <Box sx={{ width: '80%' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif' }}>
    <Typography align='left'>{DOB}</Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif' }}>KYC Mobile Number :</Typography>
  </Box>
  <Box sx={{ width: '80%' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{kycMobile}</Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Is KYC Done :</Typography>
  </Box>
  <Box sx={{ width: '80%' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{kycDone}</Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>Is Mobile Verified :</Typography>
  </Box>
  <Box sx={{ width: '80%', textTransform: 'capitalize' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{mobileVerified}</Typography>
  </Box>
</Box>
<Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>CreatedAt :</Typography>
  </Box>
  <Box sx={{ width: '80%' ,color:'rgba(76, 78, 100, 0.87)',letterSpacing:'0.15px', fontFamily:'Poppins, sans-serif'}}>
    <Typography align='left'>{moment(createdAt).format('DD/MM/YYYY')}</Typography>
  </Box>
</Box>
{/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' }}>State :</Typography>
  </Box>
  <Box sx={{ width: '80%' }}>
    <Typography align='left'>up</Typography>
  </Box>
</Box> */}
{/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' }}>City :</Typography>
  </Box>
  <Box sx={{ width: '80%' }}>
    <Typography align='left'>UP</Typography>
  </Box>
</Box> */}
{/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' }}>Pincode :</Typography>
  </Box>
  <Box sx={{ width: '80%' }}>
    <Typography align='left'>110027</Typography>
  </Box>
</Box> */}
{/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' }}>Years in business :</Typography>
  </Box>
  <Box sx={{ width: '80%' }}>
    <Typography align='left'>2024</Typography>
  </Box>
</Box> */}
{/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold' }}>Number of Employees :</Typography>
  </Box>
  <Box sx={{ width: '80%' }}>
    <Typography align='left'>50 employee</Typography>
  </Box>
</Box> */}
{/* <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
  <Box sx={{ width: '20%' }}>
    <Typography sx={{ fontWeight: 'bold', color:'#afb0b3' }}>Business Profile :</Typography>
  </Box>
  <Box sx={{ width: '80%' , color:'#afb0b3' }}>
    <Typography align='left'>profile thik hai</Typography>
  </Box>
</Box> */}
 
</Box>
</Card>
</Grid>
</Grid>
 
 
  );
};
 
export default ProfileDetails;



 

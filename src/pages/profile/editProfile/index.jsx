"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Grid,
  TextField,
  Select,
  MenuItem,
  Card,
  IconButton,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import { PhotoCamera } from "@mui/icons-material";
import axios from "axios";

const EditProfile = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [gender, setGender] = useState(1);
  const [DOB, setDOB] = useState('');
  const [ProfilePic, setProfilePic] = useState('')
  const [selectedImage, setSelectedImage] = useState(null);
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    mobileNumber: false,
    gender: false,
    DOB: false
  });
  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    gender: '',
    DOB: ''
  });
  const [formValid, setFormValid] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false); 
  const router = useRouter();

  useEffect(() => {
    setFormValid(validateForm());
  }, [firstName, lastName, email, mobileNumber, gender, DOB]);

  useEffect(() => {
    if (formSubmitted) {
      setFormValid(validateForm());
    }
  }, [formSubmitted]);

  useEffect(()=>{

    const storedData = JSON.parse(localStorage.getItem("Data"));
    if(!storedData){
      return
    }
    setFirstName(storedData?.firstName)
    setLastName(storedData?.lastName)
    setEmail(storedData?.email)
    setMobileNumber(storedData?.contactMobileNumber)
    setDOB(storedData?.dob)
    setGender(storedData?.gender === null ? 1:storedData?.gender )
    setProfilePic(storedData?.profilePictureSlug)
  },[])

  const validateForm = () => {
    const errors = {};
    let valid = true;

    if ((touchedFields.firstName || formSubmitted) && (firstName.trim() === '' || firstName === null)  ) {
      errors.firstName = 'First Name is required';
      valid = false;
    }

    if ((touchedFields.lastName || formSubmitted) && (lastName === null || lastName.trim()=== '')  ) {
      errors.lastName = 'Last Name is required';
      valid = false;
    }

    if ((touchedFields.email || formSubmitted) && (email === null || email.trim()=== '')  ) {
      errors.email = 'Email is required';
      valid = false;
    }

    if ((touchedFields.mobileNumber || formSubmitted) && (mobileNumber === null || mobileNumber.trim()=== '') ) {
      errors.mobileNumber = 'Mobile Number is required';
      valid = false;
    }

    if ((touchedFields.gender || formSubmitted) && (gender === null )) {
      errors.gender = 'Gender is required';
      valid = false;
    }

    if ((touchedFields.DOB || formSubmitted) && (DOB === null || DOB.trim()=== '')) {
      errors.DOB = 'Date of Birth is required';
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTouchedFields({ ...touchedFields, [name]: true });
    if (name === "gender") {
      setGender(value);
    } else {
      eval(`set${name.charAt(0).toUpperCase() + name.slice(1)}(value)`);
    }
  };

  const handleBackButton = () => {
    router.push("/profile");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleUpdateProfile = async () => {
    setFormSubmitted(true);
    if (!validateForm()) {
      return;
    }

    try {
      const response = await axios.post("YOUR_UPDATE_PROFILE_API_ENDPOINT", {
        firstName,
        lastName,
        email,
        mobileNumber,
        gender,
        DOB,
        profilePic: selectedImage,
      });
      // Handle success response
    } catch (error) {
      // Handle error
      console.error('Error updating profile:', error);
    }
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Typography variant='h4' sx={{ color:'rgba(76, 78, 100, 0.87)', letterSpacing:'0.25px', fontFamily:'Sora, sans-serif' }}>My Profile</Typography>
        <Typography sx={{ mt: 2, mb: -3, whiteSpace: 'nowrap', fontWeight: 'normal', color: 'rgba(76, 78, 100, 0.87)', letterSpacing: '0.15px', fontFamily: 'Poppins, sans-serif' }}>Welcome to your Dashboard.</Typography>
      </Grid>

      <Grid item xs={12}>
        <Card sx={{ borderRadius: '10px' }}>
          {/* Profile details */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, ml: 2, mt: 2 }}>
            <Box sx={{ width: '90%', fontSize: '40px' }}>
              <Typography variant="h1" sx={{ fontWeight: 'normal', color: 'rgba(76, 78, 100, 0.87)', letterSpacing: '0.15px', fontFamily: 'Inter, sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"', fontSize: '40px' }}>PROFILE DETAILS</Typography>
            </Box>
            <Box sx={{ width: '10%' }}>
              <Button sx={{}} onClick={handleBackButton}>Back</Button>
            </Box>
          </Box>
          <div style={{ backgroundColor: '#e8e8eb', height: '1px', width: '100%' }} />

          {/* Profile pic upload */}
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

          <Box sx={{ pt: 4, pb: 1, pl: 2 }}>
            {/* Form fields */}
            <TextField
              id="outlined-size-small"
              label='First Name'
              value={firstName}
              error={!!formErrors.firstName && (touchedFields.firstName || formSubmitted)}
              helperText={formErrors.firstName}
              style={{ marginLeft:'1%' , width:'45%', paddingBottom:'25px'}}
              onChange={handleChange}
              name="firstName"
            />
            <TextField
              id="outlined-size-small"
              label='Last Name'
              value={lastName}
              error={!!formErrors.lastName && (touchedFields.lastName || formSubmitted)}
              helperText={formErrors.lastName}
              style={{ marginLeft:'1%' , width:'50%' , paddingBottom:'25px'}}
              onChange={handleChange}
              name="lastName"
            />
            <TextField
              id="outlined-size-small"
              label='Email'
              value={email}
              error={!!formErrors.email && (touchedFields.email || formSubmitted)}
              helperText={formErrors.email}
              style={{ marginLeft:'1%' , width:'45%', paddingBottom:'25px'}}
              onChange={handleChange}
              name="email"
            />
            <TextField
              id="outlined-size-small"
              label='Mobile Number'
              value={mobileNumber}
              error={!!formErrors.mobileNumber && (touchedFields.mobileNumber || formSubmitted)}
              helperText={formErrors.mobileNumber}
              style={{ marginLeft:'1%' , width:'50%', paddingBottom:'25px'}}
              onChange={handleChange}
              name="mobileNumber"
            />
            <Select
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={gender}
              error={!!formErrors.gender && (touchedFields.gender || formSubmitted)}
              style={{ width:'45%', height:'55px', marginLeft:'1%'}}
              onChange={handleChange}
              name="gender"
            >
              <MenuItem value={1} disabled>Select Gender</MenuItem>
              <MenuItem value={10}>Male</MenuItem>
              <MenuItem value={20}>Female</MenuItem>
            </Select>
            <TextField
              id="outlined-size-small"
              label='DOB'
              value={DOB}
              error={!!formErrors.DOB && (touchedFields.DOB || formSubmitted)}
              helperText={formErrors.DOB}
              style={{ marginLeft:'1%' , width:'50%', paddingBottom:'25px'}}
              onChange={handleChange}
              name="DOB"
            />
          </Box>

          <Button
            sx={{ marginRight: '15px', marginLeft: '80%', marginBottom: '25px' }}
            variant="contained"
            disabled={!formValid}
            onClick={handleUpdateProfile}
          >
            Update
          </Button>
          <Button sx={{ marginBottom: '25px' }} variant="outlined" color="error" onClick={handleBackButton}>Cancel</Button>
        </Card>
      </Grid>
    </Grid>
  );
};

export default EditProfile;

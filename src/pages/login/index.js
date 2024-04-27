"use client";

import React, { useState } from "react";
import {
  Grid,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  IconButton,
  Box,
  FormHelperText,
  CircularProgress,
  Button,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "next/link";
import { LoadingButton } from "@mui/lab";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
// import { login } from "../../../redux/auth/action";
import { useDispatch } from "react-redux";

// Icons Imports
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

import logoImage from "/public/images/salon-logo.png";
import { useRouter } from "next/navigation";
import { login } from "../../redux/auth/action";
import { loginUser } from "@/services/api";
// import toast from "react-hot-toast";
import { getCookie, setCookie } from "@/utilities/cookies";
import { Cookies } from "@/config/cookies";
import { useEffect } from "react";
import { toast } from 'react-toastify';

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

const defaultValues = {
  password: "",
  email: "",
};

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    const payload = {
      email: formData?.email,
      password: formData?.password,
    };
    try {
      setLoading(true);
      const responseData = await loginUser(payload); 
      if (responseData?.data?.code === 200) {
        router.push("/");
        setCookie(Cookies.TOKEN, responseData?.data?.data?.token, 366);
        localStorage.setItem("token", responseData?.data?.data?.token);
        localStorage.setItem('Data', JSON.stringify(responseData?.data?.data));
        window.location.reload();
      }
      toast.success('Login successfull')
      setLoading(false);
    } catch (error) {
      setLoading(false);
     
      // toast.error(error.response.data.errors.email[0]);
      if (error?.response?.status === 422) {
        console.log('login eror hai kya')
        
        const responseData = error?.response?.data
        if (responseData) {
          console.log(responseData?.errors?.email[0])
          toast.error(responseData?.errors?.email[0]);
        } 
      } else if(error?.response?.status === 401){
        const responseData = error?.response?.data
        if (responseData) {
          console.log(responseData.message)
          toast.error(responseData.message);
        } 
      }

     
      
    }
  };

  useEffect(() => {
    const token = getCookie(Cookies.TOKEN);

    if (token) {
      router.push("/");
    }
  }, [router]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{
        height: "100vh",
        backgroundImage: `url(images/loginBackground.svg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        marginTop:'0px',
        // backgroundColor:'#F4F5FA'
        padding:'10px'
      }}
    >
      <Grid
        item
        xs={12}
        sm={6}
        lg={3.5}
        container
        justifyContent="center"
        alignItems="center"
        className=" bg-white rounded-lg shadow-2xl px-5 py-12 mb-12 border"
      >
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center",marginTop:'10px',marginBottom:'10px' }}>
          <Image src={logoImage} alt="Logo" width={200} height={200} />
        </Grid>

        <Grid item xs={12}>
          {/* <Typography
            variant="h4"
            gutterBottom
            align="center"
            justifyContent={"center"}
          >
            Login
          </Typography> */}
        </Grid>
        <Box sx={{ mb: 2}}>
          <Typography variant="h5" sx={{ fontWeight: 600, marginBottom: 1 }}>
          Welcome to Style Lounge Admin! 👋🏻
          </Typography>
          {/* <Typography variant="body1">
            Please sign-in to your account and start the adventure
          </Typography> */}
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            fullWidth
            sx={{ marginBottom: 2 }}
            error={!!errors?.email}
          >
            <InputLabel htmlFor="email"></InputLabel>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="Enter Email Address / Username"
                  fullWidth
                  variant="outlined"
                />
              )}
            />
             <Typography className="text-red-500 w-[100%]">{errors?.email?.message}</Typography>
          </FormControl>

          <FormControl
            fullWidth
            sx={{ marginBottom: 2 }}
            error={!!errors?.password || !!loginError}
          >
            <InputLabel htmlFor="password"></InputLabel>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter Password"
                  fullWidth
                  variant="outlined"
                  style={{ width: "100%" }}
                  // FormHelperTextProps={errors?.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <EyeOffOutline /> : <EyeOutline />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            {/* <FormHelperText>
              {errors?.password?.message}{" "}
              {loginError && "Email or password is invalid"}
            </FormHelperText> */}
            <Typography className="text-red-500 w-[100%]">{errors?.password?.message}</Typography>

          </FormControl>
          <button
            className="bg-[#1976d2] w-[100%] p-3 mt-12 text-center active:bg-[#49a3fd] rounded-md text-white disabled:bg-slate-500 disabled:text-black disabled:cursor-not-allowed flex justify-center items-center gap-2"
            disabled={loading}
          >
            {loading && <CircularProgress size={20} />}
            Login
          </button>
          {/* <Button type="submit" size="large" variant="contained" sx={{ backgroundColor: "#1976d2"}}>Login</Button> */}
        </form>
        {/* <Typography
          variant="body2"
          sx={{ marginTop: 2 }}
          color="text.secondary"
          align="center"
        >
          Don&apos;t have an account yet?{" "}
          <Box
            component="span"
            onClick={() => {
            }}
            style={{ cursor: "pointer" }}
          >
            Sign up here
          </Box>
        </Typography> */}
      </Grid>
    </Grid>
  );
};

export default LoginPage;


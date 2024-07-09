import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/globals.css"; // corrected path for globals.css
import { QueryClient, QueryClientProvider } from "react-query";
// import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useState, useEffect } from "react";
import Layout from "@/components/Navigation/Layout";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LoginPage from "./login";
import { getCookie, setCookie } from "@/utilities/cookies";
import { Cookies } from "@/config/cookies";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define a new QueryClient instance
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const [token, setToken] = useState(null); //Store token due to hydration error
  const [loading, setLoading] = useState(true);
  const theme = createTheme({
    palette: {
      mode: 'light', // Change to 'dark' if you want a dark theme
    },
  });
  useEffect(() => {
    setCookie(
      Cookies.TOKEN,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjMsInJvbGUiOiJhZG1pbiIsImlzc3VlZEF0IjoiMjAyNC0wNy0wOVQxODoyNjozNS4wMDZaIiwiaWF0IjoxNzIwNTQ5NTk1LCJleHAiOjE3MjA4MDg3OTV9.IXo2_AW_f1_2LWqRYw3e2mUByqf2iMK9fRY9wJVtM4w",
      366
    );
    const token = getCookie(Cookies.TOKEN);
    // eraseCookie(Cookies.TOKEN)  // If  you want to remove the cookie on load (optional
    setToken(token);
    setLoading(false); // Set loading to false once token is fetched
  }, [token]); // Fetch token only on the client side

  return (
    <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <CssBaseline />

      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">

          {loading ? ( // Show loading indicator while fetching token
            <div></div>
          ) : !token ? (
            <div className="">
              <LoginPage />
            </div>
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
          <ToastContainer />
        </LocalizationProvider>
      </Provider>
    </QueryClientProvider>
    </ThemeProvider>
  );
}

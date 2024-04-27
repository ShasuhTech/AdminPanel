import { Provider } from "react-redux";
import store from "../redux/store";
import "../styles/globals.css"; // corrected path for globals.css
import { QueryClient, QueryClientProvider } from "react-query";
import { CssBaseline, createTheme } from "@mui/material";
import { useState, useEffect } from "react";
import Layout from "@/components/Navigation/Layout";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import LoginPage from "./login";
import { getCookie } from "@/utilities/cookies";
import { Cookies } from "@/config/cookies";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Define a new QueryClient instance
const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const [token, setToken] = useState(null); //Store token due to hydration error
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getCookie(Cookies.TOKEN);
    // eraseCookie(Cookies.TOKEN)  // If  you want to remove the cookie on load (optional
    setToken(token);
    setLoading(false); // Set loading to false once token is fetched
  }, [token]); // Fetch token only on the client side

  return (
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
  );
}

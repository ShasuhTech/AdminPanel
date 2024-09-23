import { loginUser } from "../../services/api";
import { uiActions } from "../uislice/reducer";
import { authActions } from "./reducer";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = (email, password) => async (dispatch) => {
  // debugger
  dispatch(uiActions.setGlobalLoading(true));

  try {
    // debugger
    const responseData = await loginUser(email, password);
    console.log("responseData", responseData);
    setCookie(Cookies.TOKEN, responseData?.data?.token, 366);

    localStorage.setItem("token", responseData.data.token);
    // dispatch(authActions.login({ token: responseData.data.token }));
    // dispatch({ type: LOGIN_SUCCESS, payload: responseData });
  } catch (error) {
    console.log(error)
    // dispatch({ type: LOGIN_FAILURE, payload: error.message });
  } finally {
    dispatch(uiActions.setGlobalLoading(false));
  }

  // try {
    
  //   const response = await fetch(
  //     "https://salon-apis.deepmindz.co/admin/auth/login",
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     }
  //   );

  //   if (!response.ok) {
  //     throw new Error("Invalid email or password");
  //   }

  //   const responseData = await response.json();
  //   console.log("responseData", responseData);
  //   dispatch(authActions.login({ token: responseData.data.token }));
  //   localStorage.setItem("token", responseData.data.token);
  //   console.log("responseData", responseData.data.token);
  //   window.location.replace("/home");
  // } catch (error) {
  //   console.log("errror", error);
  //   throw error;
  // }
};

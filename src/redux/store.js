import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import authReducer from "./auth/reducer";
import uiReducer from "./uislice/reducer";
import { configureStore } from "@reduxjs/toolkit";
import dataReducer from './api/index';

const rootReducer = combineReducers({
  auth: authReducer,
  ui: uiReducer,
  data: dataReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

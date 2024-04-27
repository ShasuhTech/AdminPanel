const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  isGlobalLoading: false,
};

const uislice = createSlice({
  name: "uislice",
  initialState,
  reducers: {
    setGlobalLoading: (state, action) => {
      state.isGlobalLoading = action.payload;
    },
  },
});

export const uiActions = uislice.actions;

export default uislice.reducer;

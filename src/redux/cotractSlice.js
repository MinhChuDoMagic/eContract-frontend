import { createSlice } from "@reduxjs/toolkit";

export const contractSlice = createSlice({
  name: "contract",
  initialState: {
    file: null,
    recipients: null,
    message: "",
  },
  reducers: {
    setContract: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.file = action.payload.file;
      state.recipients = action.payload.recipients;
      state.message = action.payload.message;
    },
    resetContract: (state, action) => {
      state.file = null;
      state.recipients = null;
      state.message = "";
    },
  },
});

export const { setContract, resetContract } = contractSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectContract = (state) => state.contract;

export default contractSlice.reducer;

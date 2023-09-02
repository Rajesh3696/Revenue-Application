/*
 */

// import { connectRouter } from "connected-react-router";

// export default (history) => ({
//   router: connectRouter(history),
// });

import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: { userData: {} },
  reducers: {
    getData: (state, action) => {
      console.log(action);
      state.userData = action.payload;
    },
  },
});

// this is for dispatch
export const { getData } = todoSlice.actions;

// this is for configureStore
export default todoSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

//initialState
const initialState = {
  numOfCakes: 10,
};

//Slice
const cakeSlice = createSlice({
  name: "cake",
  initialState,
  reducers: {
    ordered: (state) => {
      state.numOfCakes--;
    },
    restocked: (state, action) => {
      if (!action.payload) {
        action.payload = 1;
      }
      state.numOfCakes += action.payload;
    },
  },
});

export default cakeSlice.reducer;
export const { ordered, restocked } = cakeSlice.actions;

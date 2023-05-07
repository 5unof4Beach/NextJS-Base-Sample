import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DelegateState {
  value: string;
  powerVote: number;
  power: string;
}

const initialState: DelegateState = {
  value: "",
  powerVote: 0,
  power: "",
};

export const delegateSlice = createSlice({
  name: "delegate",
  initialState,
  reducers: {
    setDelegate: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setPowerVote: (state, action) => {
      state.powerVote = action.payload;
    },
    setPower: (state, action) => {
      state.power = action.payload;
    },
  },
});

export const { setDelegate, setPowerVote, setPower } = delegateSlice.actions;
export default delegateSlice.reducer;

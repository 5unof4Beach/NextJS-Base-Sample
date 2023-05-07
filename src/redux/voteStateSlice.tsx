import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface VoteState {
  value: number;
}

const initialState: VoteState = {
  value: 1,
};

export const voteChoiceSlice = createSlice({
  name: "voteState",
  initialState,
  reducers: {
    swapVote: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
  },
});

export const { swapVote } = voteChoiceSlice.actions;
export default voteChoiceSlice.reducer;

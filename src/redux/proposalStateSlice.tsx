import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProposalState {
  stateChoice: number;
  value: number;
}

const initialState: ProposalState = {
  stateChoice: 1,
  value: 0,
};

export const proposalStateSlice = createSlice({
  name: "proposalState",
  initialState,
  reducers: {
    setAllow: (state, action: PayloadAction<any>) => {
      state.value = action.payload;
    },
    setStateProposal: (state, action: PayloadAction<any>) => {
      state.stateChoice = action.payload;
    },
  },
});

export const { setAllow, setStateProposal } = proposalStateSlice.actions;
export default proposalStateSlice.reducer;

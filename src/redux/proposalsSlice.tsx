import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ListProposalState {
  listAllProposal: any;
  listAddressProposal: any;
  listApproveProposal: any;
  listQueue: any;
  listExecute: any;
  listSuccess: any;
  searchProposal: any;
}

const initialState: ListProposalState = {
  listAllProposal: [],
  listAddressProposal: [],
  listApproveProposal: [],
  listQueue: [],
  listExecute: [],
  listSuccess: [],
  searchProposal: [],
};

export const proposalsSlice = createSlice({
  name: "listProposal",
  initialState,
  reducers: {
    setListProposal: (state, action: PayloadAction<any>) => {
      state.listAllProposal = action.payload;
    },
    setListAddressProposal: (state, action: PayloadAction<any>) => {
      state.listAddressProposal = action.payload;
    },
    setListApproveProposal: (state, action: PayloadAction<any>) => {
      state.listApproveProposal = action.payload;
    },
    setListQueue: (state, action: PayloadAction<any>) => {
      state.listQueue = action.payload;
    },
    setListExecute: (state, action: PayloadAction<any>) => {
      state.listExecute = action.payload;
    },
    setListSuccess: (state, action: PayloadAction<any>) => {
      state.listSuccess = action.payload;
    },
    setSearchProposal: (state, action: PayloadAction<any>) => {
      state.searchProposal = action.payload;
    },
  },
});

export const {
  setListProposal,
  setListAddressProposal,
  setListApproveProposal,
  setSearchProposal,
  setListQueue,
  setListSuccess,
  setListExecute,
} = proposalsSlice.actions;
export default proposalsSlice.reducer;

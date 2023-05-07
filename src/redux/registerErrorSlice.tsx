import { createSlice } from "@reduxjs/toolkit";

interface RegisterErrorState {
  proposalName: string;
  target: string;
  calldata: string;
  startDate: number;
  endDate: number;
  description: string;
  duplicateName: string;
  duplicateDes: string;
  startBigEnd: string;
  endLessStart: string;
  check: boolean;
}

const initialState: RegisterErrorState = {
  proposalName: "",
  target: "",
  calldata: "",
  startDate: 0,
  endDate: 0,
  description: "",
  duplicateName: "",
  duplicateDes: "",
  startBigEnd: "",
  endLessStart: "",
  check: false,
};

export const registerErrorSlice = createSlice({
  name: "registerError",
  initialState,
  reducers: {
    setErrProposalName: (state, action) => {
      state.proposalName = action.payload;
    },
    setErrTarget: (state, action) => {
      state.target = action.payload;
    },
    setErrCalldata: (state, action) => {
      state.calldata = action.payload;
    },
    setErrStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    setErrEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    setErrDescription: (state, action) => {
      state.description = action.payload;
    },
    setDuplicateName: (state, action) => {
      state.duplicateName = action.payload;
    },
    setDuplicateDes: (state, action) => {
      state.duplicateDes = action.payload;
    },
    setErrStartBigEnd: (state, action) => {
      state.startBigEnd = action.payload;
    },
    setErrEndLessStart: (state, action) => {
      state.endLessStart = action.payload;
    },
    setCheck: (state, action) => {
      state.check = action.payload;
    },
  },
});

export const {
  setErrProposalName,
  setErrTarget,
  setErrCalldata,
  setErrStartDate,
  setErrEndDate,
  setErrDescription,
  setDuplicateName,
  setDuplicateDes,
  setErrStartBigEnd,
  setErrEndLessStart,
  setCheck,
} = registerErrorSlice.actions;
export default registerErrorSlice.reducer;

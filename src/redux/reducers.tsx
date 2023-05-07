import { combineReducers } from "@reduxjs/toolkit";
import accountSlice from "./accountSlice";
import delegateSlice from "./delegateSlice";
import proposalsSlice from "./proposalsSlice";
import voteStateSlice from "./voteStateSlice";
import proposalStateSlice from "./proposalStateSlice";
import registerErrorSlice from "./registerErrorSlice";

export const reducer = combineReducers({
  listProposal: proposalsSlice,
  proposalState: proposalStateSlice,
  delegate: delegateSlice,
  account: accountSlice,
  voteState: voteStateSlice,
  registerError: registerErrorSlice,
});

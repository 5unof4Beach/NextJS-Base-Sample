import { axiosWrapper } from "../helpers/axiosInstance";

const baseUrl = `/dao`;

const getProposal = async (proposalId: string) => {
  return await axiosWrapper.get(
    `${baseUrl}/get-proposal?proposalId=${proposalId}`
  );
};

const getTotalVotes = async (proposalId: string) => {
  return await axiosWrapper.get(
    `${baseUrl}/get-total-vote?proposalId=${proposalId}`
  );
};

const getAll = async () => {
  return await axiosWrapper.get(baseUrl);
};

const getById = async (id: string) => {
  return await axiosWrapper.get(`${baseUrl}/${id}`);
};

const getHashProposal = async (
  voteState: string,
  targets: any,
  values: any,
  calldatas: any,
  description: any
) => {
  return await axiosWrapper.get(
    `${baseUrl}/${voteState}/get-hash-proposal?targets=${targets}&values=${values}&calldatas=${calldatas}&description=${description}`
  );
};

const getListProposal = async (account: string) => {
  return await axiosWrapper.get(
    `${baseUrl}/get-list-proposal-of-address?account=${account}`
  );
};

const getListAddressVote = async (proposalId: string) => {
  return await axiosWrapper.get(
    `${baseUrl}/get-list-address-vote?proposalId=${proposalId}`
  );
};

const getProposalVotes = async (proposalId: string) => {
  return await axiosWrapper.get(
    `${baseUrl}/proposal-votes?proposalId=${proposalId}`
  );
};

const getHasVoted = async (
  proposalId: string,
  account: string,
  type: string
) => {
  return await axiosWrapper.get(
    `${baseUrl}/${type}/has-voted?proposalId=${proposalId}&account=${account}`
  );
};

const getPowerVotePercent = async (proposalId: string, account: string, type: string) => {
  return await axiosWrapper.get(
    `${baseUrl}/${type}/power-vote-percent?proposalId=${proposalId}&account=${account}`
  );
};

const getPowerVoteAccount = async (account: string, type: string) => {
  return await axiosWrapper.get(
    `${baseUrl}/${type}/get-power?account=${account}`
  );
};

const getPower = async (address: string, type: string) => {
  return await axiosWrapper.get(
    `${baseUrl}/${type}/get-power?account=${address}`
  );
};

const getDaoProposal = async (proposalId: string, type: string) => {
  return await axiosWrapper.get(
    `${baseUrl}/${type}/get-proposal?proposalId=${proposalId}`
  );
};

export const daoService = {
  getAll,
  getById,
  getProposal,
  getTotalVotes,
  getHashProposal,
  getListProposal,
  getListAddressVote,
  getProposalVotes,
  getHasVoted,
  getPowerVotePercent,
  getPowerVoteAccount,
  getPower,
  getDaoProposal,
};

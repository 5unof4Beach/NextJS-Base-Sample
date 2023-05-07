import { axiosWrapper } from "helpers/axiosInstance";

const baseUrl = "/proposal";

const getProposal = async (proposalId: string) => {
  return await axiosWrapper.get(
    `${baseUrl}/get-proposal?proposal_id=${proposalId}`
  );
};

const getAllProposals = async () => {
  return await axiosWrapper.get(`${baseUrl}/get-all-proposal`);
};

const updateAllProposals = async () => {
  return await axiosWrapper.post(`${baseUrl}/update-all-proposal-state`, {});
};

const createProposal = async (
  proposalId: string,
  proposalName: string,
  issued_by: string,
  start_date: any,
  end_date: any,
  description: string
) => {
  return await axiosWrapper.post(`${baseUrl}/create-proposal`, {
    proposal_id: proposalId,
    proposal_name: proposalName,
    issued_by: issued_by,
    start_date: start_date,
    end_date: end_date,
    description: description,
    total_votes: 0,
    total_address: 0,
  });
};

const castVote = async (
  proposal_id: string,
  wallet_address: string,
  support: number
) => {
  return await axiosWrapper.post(`${baseUrl}/cast-vote`, {
    proposal_id,
    wallet_address,
    support,
  });
};

// const getPowerVotePercent = async (proposalId: string, account: string, type: string) => {
//   return await axiosWrapper.get(
//     `${baseUrl}/get-vote-percent?proposal_id=${proposalId}&wallet_address=${account}`
//   );
// };

const registerProposal = async (
  proposal_name: string,
  issued_by: string,
  start_date: number,
  end_date: number,
  proposal_type: string,
  description: string,
  targets: string[] = [],
  values: number[] = [],
  calldatas: string[] = []
) => {
  return await axiosWrapper.post(`${baseUrl}/register-proposal`, {
    proposal_name,
    issued_by,
    start_date,
    end_date,
    proposal_type,
    description,
    targets,
    values,
    calldatas,
  });
};

const getProposalByState = async (state: number) => {
  return await axiosWrapper.get(
    `${baseUrl}/get-proposal-by-state?state=${state}&sort_decrease=true`
  );
};

const getProposalByUser = async (address: string) => {
  return await axiosWrapper.get(
    `${baseUrl}/get-proposal-by-user?wallet_address=${address}&sort_decrease=true`
  );
};

const approveProposal = async (proposal_id: string) => {
  return await axiosWrapper.post(`${baseUrl}/approve-proposal`, {
    proposal_id: proposal_id,
  });
};

const getProposalNotApproved = async () => {
  return await axiosWrapper.get(
    `${baseUrl}/get-proposal-not-approved?sort_decrease=false`
  );
};

const searchProposalByName = async (proposalName: string) => {
  return await axiosWrapper.get(
    `${baseUrl}/get-proposal-by-name?proposal_name=${proposalName}`
  );
}

export const proposalService = {
  createProposal,
  getProposal,
  getAllProposals,
  castVote,
  updateAllProposals,
  registerProposal,
  getProposalByState,
  getProposalByUser,
  approveProposal,
  getProposalNotApproved,
  searchProposalByName
};

import { axiosWrapper } from "../helpers/axiosInstance";

const baseUrl = `/card`;

const getVotingUints = async (address: string) => {
  return await axiosWrapper.get(
    `${baseUrl}/get-voting-units?address=${address}`
  );
};

const getAll = async () => {
  return await axiosWrapper.get(`${baseUrl}`);
};

const getById = async (id: string) => {
  return await axiosWrapper.get(`${baseUrl}/${id}`);
};

const getTotalNft = async () => {
  return await axiosWrapper.get(`${baseUrl}/get-total-nft`);
};

const getTotalRewards = async () => {
  return await axiosWrapper.get(`${baseUrl}/get-total-rewards`);
};

export const cardService = {
  getVotingUints,
  getAll,
  getById,
  getTotalNft,
  getTotalRewards,
};

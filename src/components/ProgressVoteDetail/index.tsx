import { Flex, Spacer } from "@chakra-ui/layout";
import { Text, Progress, Checkbox } from "@chakra-ui/react";
import { css } from "@emotion/css";
import config from "../../abi/contract.json";
import { ethers } from "ethers";
import { proposalService, userService } from "services";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalState } from "store";

enum ProposalSupport {
  NO,
  YES,
  ABSTAIN,
}

declare let window: any;

export default function ProgressVoteDetail({
  progressInfo,
  hasVoted,
  handleVote,
  onChangeVote,
  walletAddress,
  voters,
}: any) {
  const { index, support, progress, proposalId, proposalState } = progressInfo;
  const [isChecked, setChecked] = useState<boolean>(false);
  const [connectedAccount] = useGlobalState("connectedAccount");

  useEffect(() => {
    const result = voters.filter(
      (vote: any) => vote.address == walletAddress && vote.support == support
    );
    result.length ? setChecked(true) : setChecked(false);
  }, [hasVoted, walletAddress, support, voters]);

  // redux
  const voteState = useSelector((state: any) => state.voteState.value);

  const dispatch = useDispatch();

  const handleSubmitVote = async (e: any) => {
    try {
      if (e.target.checked) {
        handleVote(true);
        const support = e.target.value;
        if (!window.ethereum) {
          return;
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // let wallet_address = "";
        // await provider.send("eth_requestAccounts", []).then((accounts) => {
        //   if (accounts.length > 0) {
        //     wallet_address = accounts[0];
        //   }
        // });
        userService.getUser(connectedAccount).then((res) => {
          if (!res.data.success) {
            userService.createUser(connectedAccount);
          }
        });
        const signer = provider.getSigner();
        const contracts = new ethers.Contract(
          voteState === 1
            ? config.MesmeCardGovernor.address
            : config.MesmeCoinGovernor.address,
          voteState === 1
            ? config.MesmeCardGovernor.abi
            : config.MesmeCoinGovernor.abi,
          signer
        );
        await contracts.castVote(proposalId, support);
        await proposalService.castVote(proposalId, connectedAccount, support);
        // const web3 = new Web3(window.ethereum);
        // web3.eth
        //   .subscribe(
        //     "logs",
        //     {
        //       address:
        //         voteState === 1
        //           ? config.MesmeCardGovernor.address
        //           : config.MesmeCoinGovernor.address,
        //     },
        //     (error: any, result: any) => {
        //       if (error) console.log(error);
        //       if (!error)
        //         setTimeout(async () => {
        //           const proposals = await proposalService.getAllProposals();
        //           const arrProposal = proposals?.data.data || [];
        //           dispatch(
        //             setListProposal(
        //               arrProposal.filter((item: any) => {
        //                 if (voteState === 1) {
        //                   return (
        //                     item.is_approved && item.proposal_type === "ERC721"
        //                   );
        //                 }
        //                 return (
        //                   item.is_approved && item.proposal_type === "ERC20"
        //                 );
        //               })
        //             )
        //           );
        //           const proposalsAddress =
        //             await proposalService.getProposalByUser(connectedAccount);
        //           const arrProposalsAddress = proposalsAddress?.data.data || [];
        //           dispatch(
        //             setListAddressProposal(
        //               arrProposalsAddress.filter((item: any) => {
        //                 if (voteState === 1) {
        //                   return (
        //                     item.is_approved && item.proposal_type === "ERC721"
        //                   );
        //                 }
        //                 return (
        //                   item.is_approved && item.proposal_type === "ERC20"
        //                 );
        //               })
        //             )
        //           );
        //         }, 1000);
        //     }
        //   )
        //   .on("data", function (log: any) {})
        //   .on("changed", function (log: any) {});
        onChangeVote();
        setChecked(true);
      }
    } catch (error) {
      setChecked(false);
      handleVote(false);
    }
  };

  return (
    <Flex className={progressVoteDetailContainer}>
      <Flex
        className="progressInfo"
        flexDirection="row"
        justify="space-between"
        w="100%"
      >
        <Checkbox
          colorScheme="green"
          value={support}
          onChange={handleSubmitVote}
          isDisabled={proposalState != 1 || hasVoted}
          isChecked={isChecked}
          mr="8px"
        />

        <Text
          fontSize="14px"
          lineHeight="21px"
          fontWeight="400"
        >{`${index}. ${ProposalSupport[support]}`}</Text>
        <Spacer />
        <Text fontSize="14px" lineHeight="21px" fontWeight="700">{`${
          Math.round(progress * 100) / 100
        }%`}</Text>
      </Flex>
      <Flex w="100%">
        <Progress
          value={progress}
          background="#000000"
          borderRadius="1000px"
          border="1px solid #0C6967"
          w="100%"
          sx={{
            "& > div": {
              background:
                "linear-gradient(270deg, #0AB39C 0%, #1A306A 100%), linear-gradient(0deg, #0AB39C, #0AB39C)",
            },
          }}
        />
      </Flex>
    </Flex>
  );
}
const progressVoteDetailContainer = css`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  min-width: 30%;
  max-width: calc(33% - 16px);
  font-family: "Noto Sans";
  font-style: normal;
`;

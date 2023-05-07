import React, { useEffect, useRef, useState } from "react";
import { Flex, Spacer, Stack } from "@chakra-ui/layout";
import { Text, Image, Button, useDisclosure } from "@chakra-ui/react";
import { css } from "@emotion/css";

import ProgressVoteDetail from "components/ProgressVoteDetail";
import VotingDescription from "components/VotingDescription";
import WalletRank from "components/WalletRank";
import moment from "moment";
import { daoService, proposalService } from "services";

enum ProposalState {
  Pending,
  Active,
  Canceled,
  Defeated,
  Succeeded,
  Queued,
  Expired,
  Executed,
}

import { useGlobalState } from "../../store";
import { ethers } from "ethers";
import config from "../../abi/contract.json";
import AllowModal from "components/AllowModal";
import Web3 from "web3";
import { useDispatch } from "react-redux";
import {
  setListProposal,
  setListAddressProposal,
  setListSuccess,
  setListQueue,
} from "redux/proposalsSlice";
import { useSelector } from "react-redux";
import Countdown from "components/CountdownTimer";

declare let window: any;

export default function ProposalDetail({
  proposal,
  onChangeVote,
  stateChoice,
  isAdmin,
}: any) {
  const {
    start_date,
    end_date,
    proposal_name,
    proposal_state,
    proposal_id,
    total_votes,
    description,
    for_votes,
    against_votes,
    abstain_votes,
    total_address,
    voters,
    is_approved,
    proposal_type,
  } = proposal;
  const [dropDown, setDropDown] = useState<boolean>(false);
  const [hasVoted, setHasVoted] = useState<boolean>(false);
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [proposalState, setProposalState] = useState("1");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>(null);

  const handleVote = (value: boolean) => {
    setHasVoted(value);
  };

  // redux
  const dispatch = useDispatch();
  const voteState = useSelector((state: any) => state.voteState.value);

  useEffect(() => {
    if (connectedAccount) {
      daoService
        .getHasVoted(
          proposal_id,
          connectedAccount,
          voteState === 1 ? "card" : "coin"
        )
        .then((res) => {
          if (res.status == 200) {
            setHasVoted(res.data.data.status);
          }
        });
    }
  }, [proposal_id, connectedAccount, voteState]);

  useEffect(() => {
    setProposalState(proposal_state);
  }, [proposal_state]);

  // const [end, setEnd] = useState<number>(0);
  // useEffect(() => {
  //   daoService
  //     .getDaoProposal(proposal_id, proposal_type === "ERC721" ? "card" : "coin")
  //     .then((resp) => {
  //       setEnd(resp.data.data.endDate);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);

  const progressInfos: any[] = [
    {
      index: 1,
      support: 1,
      progress: total_votes ? (for_votes / total_votes) * 100 : 0,
      proposalId: proposal_id,
      proposalState: proposal_state,
    },
    {
      index: 2,
      support: 0,
      progress: total_votes ? (against_votes / total_votes) * 100 : 0,
      proposalId: proposal_id,
      proposalState: proposal_state,
    },
    {
      index: 3,
      support: 2,
      progress: total_votes ? (abstain_votes / total_votes) * 100 : 0,
      proposalId: proposal_id,
      proposalState: proposal_state,
    },
  ];

  const onDropDown = () => {
    setDropDown(true);
  };

  const onUpDown = () => {
    setDropDown(false);
  };

  const handleQueue = async () => {
    // console.log("Queue");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
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
    const targets = ["0x0000000000000000000000000000000000000000"];
    const values = [0];
    const calldatas = ["0x00"];
    const desHash = await ethers.utils.keccak256(
      ethers.utils.toUtf8Bytes(description)
    );
    await contracts.queue(targets, values, calldatas, desHash);
    handleReload();
  };

  // const handleExecute = async () => {
  //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   await provider.send("eth_requestAccounts", []);
  //   const signer = provider.getSigner();
  //   const contracts = new ethers.Contract(
  //     voteState === 1
  //       ? config.MesmeCardGovernor.address
  //       : config.MesmeCoinGovernor.address,
  //     voteState === 1
  //       ? config.MesmeCardGovernor.abi
  //       : config.MesmeCoinGovernor.abi,
  //     signer
  //   );
  //   const targets = ["0x0000000000000000000000000000000000000000"];
  //   const values = [0];
  //   const calldatas = ["0x00"];
  //   const desHash = await ethers.utils.keccak256(
  //     ethers.utils.toUtf8Bytes(description)
  //   );
  //   await contracts.execute(targets, values, calldatas, desHash);
  //   handleReload();
  // };

  const handleReload = () => {
    const web3 = new Web3(window.ethereum);
    web3.eth
      .subscribe(
        "logs",
        {
          address:
            voteState === 1
              ? config.MesmeCardGovernor.address
              : config.MesmeCoinGovernor.address,
        },
        (error: any, result: any) => {
          if (error) console.log(error);
          if (!error) console.log(result);
          setTimeout(async () => {
            const proposals = await proposalService.getAllProposals();
            const results = proposals?.data.data || [];
            dispatch(
              setListProposal(
                results.filter((item: any) => {
                  if (voteState === 1) {
                    return item.is_approved && item.proposal_type === "ERC721";
                  }
                  return item.is_approved && item.proposal_type === "ERC20";
                })
              )
            );
            proposalService.getAllProposals().then((resp) => {
              const results = resp?.data.data || [];
              dispatch(
                setListSuccess(
                  results.filter((item: any) => {
                    if (voteState === 1) {
                      return (
                        item.proposal_type === "ERC721" &&
                        item.proposal_state === "4"
                      );
                    }
                    return (
                      item.proposal_type === "ERC20" &&
                      item.proposal_state === "4"
                    );
                  })
                )
              );
            });
          }, 5000);
        }
      )
      .on("data", function (log: any) {})
      .on("changed", function (log: any) {});
  };

  const handleSign = async () => {
    if (!window.ethereum) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
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
    const proposal = await proposalService.getProposal(proposal_id);
    const end = await proposal.data.data.end_date;
    const start = await new Date().getTime();
    const timeDiffSeconds = await Math.floor((end - start) / 1000);
    const blockNumber = await Math.floor(timeDiffSeconds / 6);
    await contracts.createProposal(
      proposal.data.data.target,
      proposal.data.data.values,
      proposal.data.data.calldatas,
      proposal.data.data.description.toString(),
      blockNumber
    );
    const web3 = new Web3(window.ethereum);
    web3.eth
      .subscribe(
        "logs",
        {
          address:
            voteState === 1
              ? config.MesmeCardGovernor.address
              : config.MesmeCoinGovernor.address,
        },
        (error: any, result: any) => {
          if (error) console.log(error);
          if (!error)
            setTimeout(async () => {
              const proposals = await proposalService.getAllProposals();
              const arrProposal = proposals?.data.data || [];
              dispatch(
                setListProposal(
                  arrProposal.filter((item: any) => {
                    if (voteState === 1) {
                      return (
                        item.is_approved && item.proposal_type === "ERC721"
                      );
                    }
                    return item.is_approved && item.proposal_type === "ERC20";
                  })
                )
              );
              const proposalsAddress = await proposalService.getProposalByUser(
                connectedAccount
              );
              const arrProposalsAddress = proposalsAddress?.data.data || [];
              dispatch(
                setListAddressProposal(
                  arrProposalsAddress.filter((item: any) => {
                    if (voteState === 1) {
                      return (
                        item.is_approved && item.proposal_type === "ERC721"
                      );
                    }
                    return item.is_approved && item.proposal_type === "ERC20";
                  })
                )
              );
            }, 39000);
        }
      )
      .on("data", function (log: any) {})
      .on("changed", function (log: any) {});
  };

  return (
    <Flex className={proposalDetailContainer}>
      <Flex
        className={proposalHeader}
        flexDirection="row"
        borderBottom={dropDown ? "1px solid #422574" : "none"}
      >
        <Text className={proposalTitle}>{proposal_name}</Text>
        <Text fontSize="12px" fontWeight="400">
          {`Ended ${moment(end_date).format("DD MMMM YYYY")}`}
        </Text>
        {stateChoice === 2 ? (
          <></>
        ) : (
          <Text
            className={
              proposal_state == ProposalState.Active ||
              proposal_state == ProposalState.Succeeded ||
              proposal_state == ProposalState.Executed
                ? proposalStatusGreen
                : proposalStatusRed
            }
          >
            {ProposalState[proposal_state]}
          </Text>
        )}
        <Text className={proposalId}>{`ID #${proposal_id}`}</Text>
        <Spacer />
        {stateChoice === 2 && new Date().getTime() <= end_date ? (
          <>
            <Button
              color="#FFFFFF"
              fontSize="16px"
              w="10%"
              h="30px"
              bg="#7D31AF"
              borderRadius="100px"
              textAlign="center"
              onClick={onOpen}
            >
              Allow
            </Button>
            <AllowModal
              isOpen={isOpen}
              onClose={onClose}
              btnRef={btnRef}
              proposalId={proposal_id}
              voteState={voteState}
            ></AllowModal>
            <Button
              color="#FFFFFF"
              fontSize="16px"
              w="10%"
              h="30px"
              bg="#7D31AF"
              borderRadius="100px"
              textAlign="center"
            >
              Reject
            </Button>
          </>
        ) : (
          <></>
        )}
        {is_approved === true &&
          proposal_state === 0 &&
          stateChoice == 3 &&
          new Date().getTime() >= start_date &&
          new Date().getTime() <= end_date && (
            <Button
              color="#FFFFFF"
              fontSize="16px"
              w="10%"
              h="30px"
              bg="#7D31AF"
              borderRadius="100px"
              textAlign="center"
              onClick={handleSign}
            >
              Sign
            </Button>
          )}
        {dropDown ? (
          <Image
            src="images/up-cicle-icon.svg"
            boxSize="28px"
            onClick={onUpDown}
            alt=""
          />
        ) : (
          <Image
            src="images/down-cicle-icon.svg"
            boxSize="28px"
            onClick={onDropDown}
            alt=""
          />
        )}
      </Flex>
      {dropDown && (
        <>
          <Stack mb="24px" w="100%" px="25px">
            {is_approved === true &&
              proposal_state !== 0 &&
              (stateChoice === 1 ||
                stateChoice === 4 ||
                stateChoice === 5 ||
                stateChoice === 3) && (
                <Flex className={listProgressVote}>
                  {progressInfos.map((progressInfo) => (
                    <ProgressVoteDetail
                      progressInfo={progressInfo}
                      hasVoted={hasVoted}
                      handleVote={handleVote}
                      onChangeVote={onChangeVote}
                      walletAddress={connectedAccount}
                      voters={voters}
                      key={progressInfo.index}
                    />
                  ))}
                </Flex>
              )}
            {proposalState === "4" && isAdmin ? (
              <Flex className={btnProposalDetail}>
                <button className="btn" onClick={handleQueue}>
                  Queue
                </button>
              </Flex>
            ) : (
              <></>
            )}
            {/* {proposalState === "5" && isAdmin ? (
              <Flex className={btnProposalDetail}>
                <button className="btn" onClick={handleExecute}>
                  Execute
                </button>
              </Flex>
            ) : (
              <></>
            )} */}
            {stateChoice !== 2 &&
              proposal_state !== 0 &&
              is_approved === true && (
                <>
                  <Flex
                    flexDirection="row"
                    alignItems="center"
                    className={timeProgress}
                  >
                    <Text mr="8px">In Progress: Epoch 49</Text>
                    <Flex className={timeCountDown}>
                      <Image
                        boxSize="18px"
                        mt="-2px"
                        src="images/icon-time.svg"
                      />
                      <Text fontWeight="700">
                        {proposal_state === "1" &&
                        new Date().getTime() <= end_date ? (
                          <Countdown endDate={end_date}></Countdown>
                        ) : (
                          <>0d : 00h : 00m : 00s</>
                        )}
                      </Text>
                    </Flex>
                    <Text ml="8px">
                      Vote on current epoch proposals to get your full reward.
                    </Text>
                  </Flex>
                  <Text className={textNote}>
                    Note: Vote on current epoch proposals to get your full
                    reward.
                  </Text>
                </>
              )}
            <VotingDescription {...proposal} />
            <WalletRank {...proposal} />
          </Stack>
        </>
      )}
    </Flex>
  );
}

const btnProposalDetail = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const proposalDetailContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 24px;
  width: 100%;
  background: rgba(46, 26, 84, 0.8);
  border-radius: 8px;
  margin-top: 16px;
`;

const proposalHeader = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 24px 16px;
  gap: 18px;
  height: 44px;
  width: 100%;
`;
const proposalTitle = css`
  padding: 0px 16px 0px 0px;
  height: 24px;
  border-right: 1px solid #422574;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 24px;
`;
const proposalStatusGreen = css`
  height: 26px;
  background: rgba(25, 251, 155, 0.1);
  border-radius: 1000px;
  color: #19fb9b;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  padding: 4px 8px;
`;

const proposalStatusRed = css`
  height: 26px;
  background: rgba(255, 41, 91, 0.1);
  border-radius: 1000px;
  color: #ff295b;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
  padding: 4px 8px;
`;

const proposalId = css`
  padding: 4px 8px;
  height: 26px;
  background: rgba(25, 251, 155, 0.1);
  border-radius: 1000px;
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 18px;
`;

const listProgressVote = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 24px 0px;
  gap: 24px;
  width: 100%;
`;

const timeProgress = css`
  font-family: "Noto Sans";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
`;

const textNote = css`
  font-family: "Noto Sans";
  font-style: italic;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  color: #ffffff;
  margin-top: 12px;
`;

const timeCountDown = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 4px 8px;
  gap: 4px;
  height: 32px;
  background: rgba(46, 26, 84, 0.8);
  border-radius: 100px;
  font-family: "Noto Sans";
  font-style: normal;
  font-size: 16px;
  line-height: 24px;
`;

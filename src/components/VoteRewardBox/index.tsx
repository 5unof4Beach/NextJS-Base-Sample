import { Heading, Box, Wrap, Flex, Spacer } from "@chakra-ui/layout";
import { css } from "@emotion/css";
import { Image, Text, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CreateProposalModal from "components/CreateProposalModal";
import { cardService, daoService } from "services";
import { useGlobalState } from "../../store";
import DelegateModel from "components/Delegate";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setPower, setPowerVote } from "redux/delegateSlice";

export default function VoteRewardBox() {
  const [open, setOpen] = useState(false);
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [totalStaked, setTotalStaked] = useState();
  const [totalVotingReward, setTotalVotingReward] = useState();
  const [openDelegate, setOpenDelegate] = useState(false);
  // const [powerVote, setPowerVote] = useState(0);
  // const [power, setPower] = useState("");

  // redux
  const voteState = useSelector((state: any) => state.voteState.value);
  const powerVote = useSelector((state: any) => state.delegate.powerVote);
  const power = useSelector((state: any) => state.delegate.power);
  const dispatch = useDispatch();

  useEffect(() => {
    if (connectedAccount) {
      daoService
        .getPowerVoteAccount(
          connectedAccount,
          voteState === 1 ? "card" : "coin"
        )
        .then((res) => {
          if (res.status == 200)
            dispatch(setPowerVote(res?.data?.data?.amount));
        })
        .catch((err) => {
          console.log(err);
        });

      daoService
        .getPower(connectedAccount, voteState === 1 ? "card" : "coin")
        .then((resp) => {
          dispatch(setPower(resp?.data.data.amount));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [connectedAccount, dispatch, voteState]);

  useEffect(() => {
    cardService
      .getTotalNft()
      .then((resp) => {
        setTotalStaked(resp?.data.data.total_nft);
      })
      .catch((err) => {
        console.log(err);
      });
    cardService
      .getTotalRewards()
      .then((resp) => {
        setTotalVotingReward(resp?.data.data.total_rewards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Flex flexDirection="column">
        <Box className={voteRewardEarnBox}>
          <Heading className={voteRewardEarnHeader}>
            Vote - Earn Rewards
          </Heading>
          <Wrap mt="15px">
            <Image src="/images/icon-logo.png" boxSize="40px" alt="Icon Logo" />
            <Text fontWeight="400px" fontSize="24px" lineHeight="33px">
              MES: 0
            </Text>
          </Wrap>
        </Box>
        <Flex flexDirection="row" mt="60px">
          <Box className={voteRewardCard}>
            <Text fontSize="16px" lineHeight="24px" fontWeight="normal">
              Total Holders
            </Text>
            <Text fontSize="24px" lineHeight="36px" fontWeight="bold">
              {totalStaked
                ? new Intl.NumberFormat("de-DE").format(Number(totalStaked))
                : 0}{" "}
            </Text>
          </Box>
          <Spacer />
          <Box className={voteRewardCard}>
            <Text fontSize="16px" lineHeight="24px" fontWeight="normal">
              Total Voting Rewards
            </Text>
            <Text fontSize="24px" lineHeight="36px" fontWeight="bold">
              {totalVotingReward
                ? new Intl.NumberFormat("de-DE").format(
                    Number(totalVotingReward)
                  )
                : 0}{" "}
              MES
            </Text>
          </Box>
          <Spacer />
          <Box className={voteRewardCard}>
            <Text fontSize="16px" lineHeight="24px" fontWeight="normal">
              Your Voting Power
            </Text>
            <Text fontSize="24px" lineHeight="36px" fontWeight="bold">
              {powerVote ? powerVote : 0}{" "}
              {voteState === 1 ? <>Power</> : <>Balance</>}
            </Text>
            <Text
              fontSize="12px"
              lineHeight="18px"
              fontWeight="normal"
              mt="-11px"
            >
              --
            </Text>
          </Box>
          <Spacer />
          <Box className={voteRewardCard}>
            <Text fontSize="16px" lineHeight="24px" fontWeight="normal">
              Your Voting Reward
            </Text>
            <Button
              color="#FFFFFF"
              fontSize="16px"
              w="100%"
              h="44px"
              bg="#7D31AF"
              borderRadius="100px"
              textAlign="center"
              onClick={() => setOpen(true)}
            >
              Register Proposal
            </Button>
          </Box>
          <Spacer />
          <Box className={voteRewardCard}>
            <Text fontSize="16px" lineHeight="24px" fontWeight="normal">
              {voteState === 1 ? "Power" : "Balance"} {power}
            </Text>
            <Button
              color="#FFFFFF"
              fontSize="16px"
              w="100%"
              h="44px"
              bg="#7D31AF"
              borderRadius="100px"
              textAlign="center"
              onClick={() => setOpenDelegate(true)}
            >
              Delegate
            </Button>
          </Box>
        </Flex>
      </Flex>
      {open && (
        <CreateProposalModal closeProposal={setOpen}></CreateProposalModal>
      )}
      {openDelegate && (
        <DelegateModel closeDelegate={setOpenDelegate}></DelegateModel>
      )}
    </>
  );
}

const voteRewardEarnBox = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 112px;
  font-family: "Noto Sans";
  font-style: normal;
`;
const voteRewardEarnHeader = css`
  font-family: "Noto Sans";
  font-weight: 700;
  font-size: 40px;
  line-height: 54px;
`;

const voteRewardCard = css`
  font-family: "Noto Sans";
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 20px 16px;
  gap: 16px;
  width: 290px;
  height: 148px;
  background-image: url("images/card_vote_background.png");
  background-repeat: no-repeat;
  background-size: 100%;
`;

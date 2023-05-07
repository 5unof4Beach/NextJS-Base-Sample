import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { css } from "@emotion/css";
import moment from "moment";
import { useGlobalState } from "../../store";
import { daoService } from "services";
import { TagsFilled } from "@ant-design/icons";
import { useSelector } from "react-redux";

export default function VotingDescription(props: any) {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const {
    start_date,
    end_date,
    proposal_id,
    total_votes,
    total_address,
    description,
  } = props;

  const [votingPower, setVotingPower] = useState(0);
  const voteState = useSelector((state: any) => state.voteState.value);

  useEffect(() => {
    if (proposal_id && connectedAccount) {
      daoService
        .getPowerVotePercent(
          proposal_id,
          connectedAccount,
          voteState === 1 ? "card" : "coin"
        )
        .then((res) => {
          if (res.status == 200) {
            setVotingPower(res.data?.data.percent);
          }
        });
    }
  }, [proposal_id, connectedAccount, total_votes, total_address]);

  return (
    <Flex w="100%" pt="30px" justify="space-between">
      <Box w="790px">
        <Flex flexDirection="row" align="center">
          <TagsFilled />
          <Text fontSize="16px" lineHeight="24px" fontWeight="700" ml="8px">
            Description
          </Text>
        </Flex>

        <Text
          color="#FFFFFF"
          fontSize="14px"
          fontFamily="Noto Sans"
          lineHeight="21px"
          fontWeight="400"
          mt="6px"
        >
          {description}
        </Text>
      </Box>
      <Box className={voteInfoCard}>
        <Heading
          color="#FFFFFF"
          fontSize="16px"
          lineHeight="24px"
          fontWeight="700"
        >
          Vote Infomation
        </Heading>
        <Center>
          <Divider alignContent="center" variant="solid" w="351px" mt="16px" />
        </Center>
        <Flex mt="16px" justify="space-between" align="center">
          <Box className={voteInfoHeader}>
            <VStack spacing="16px" align="left">
              <Text>Voting System</Text>
              <Text>Start Date</Text>
              <Text>End Date</Text>
              <Text>Total Voting</Text>
              <Text>Total Power</Text>
              <Text>Your Voting Power</Text>
            </VStack>
          </Box>
          <Box className={voteInfoData}>
            <VStack spacing="16px" align="right">
              <Text>GenericProposal</Text>
              <Text>
                {start_date ? moment(start_date).format("DD MMMM YYYY") : ""}
              </Text>
              <Text>
                {end_date ? moment(end_date).format("DD MMMM YYYY") : ""}
              </Text>
              <Text>{total_address}</Text>
              <Text>{new Intl.NumberFormat("de-DE").format(total_votes)}</Text>
              <Text>
                {votingPower ? Math.round(votingPower * 10000) / 100 : 0}%
              </Text>
            </VStack>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

const voteInfoCard = css`
  font-family: "Noto Sans";
  width: 376px;
  height: 294px;
  padding: 16px 24px;
  margin-left: 66px;
  background-image: url("images/vote_info_background.png");
  background-repeat: no-repeat;
  background-size: 100%;
`;

const voteInfoHeader = css`
  font-family: "Noto Sans";
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 16px;
  color: #ffffff;
`;

const voteInfoData = css`
  font-family: "Noto Sans";
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  margin-bottom: 16px;
  color: #ffffff;
  text-align: right;
`;

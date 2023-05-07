// src/pages/index.tsx
import type { NextPage } from "next";
import Head from "next/head";
import { css } from "@emotion/css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import VoteRewardBox from "../components/VoteRewardBox";
import ProposalsVote from "../components/ProposalsVote";
import NextLink from "next/link";
import {
  VStack,
  Heading,
  Box,
  LinkOverlay,
  LinkBox,
  Wrap,
  Flex,
  Spacer,
} from "@chakra-ui/layout";

declare let window: any;

const Home: NextPage = () => {
  const [balance, setBalance] = useState<string | undefined>();
  const [currentAccount, setCurrentAccount] = useState<string | undefined>();
  const [chainId, setChainId] = useState<number | undefined>();
  const [chainname, setChainName] = useState<string | undefined>();

  useEffect(() => {
    //get ETH balance and network info only when having currentAccount
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return;

    //client side code
    if (!window.ethereum) {
      alert("please install MetaMask");
      return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider
      .getBalance(currentAccount)
      .then((result) => {
        setBalance(ethers.utils.formatEther(result));
      })
      .catch((e) => console.log(e));

    provider
      .getNetwork()
      .then((result) => {
        setChainId(result.chainId);
        setChainName(result.name);
      })
      .catch((e) => console.log(e));
  }, [currentAccount]);

  //click connect
  const onClickConnect = () => {
    //client side code
    if (!window.ethereum) {
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0]);
      })
      .catch((e) => console.log(e));
  };

  //click disconnect
  const onClickDisconnect = () => {
    setBalance(undefined);
    setCurrentAccount(undefined);
  };

  return (
    <div className={container}>
      <Head>
        <title>Mesme DAO Community</title>
      </Head>
      <VoteRewardBox />
      <ProposalsVote />
    </div>
  );
};

export default Home;

const container = css`
  color: white;
`;

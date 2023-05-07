import { ethers } from "ethers";
import { setGlobalState, getGlobalState } from "../store";
import config from "../abi/contract.json";

declare let window: any;

const connectWallet = () => {
  //client side code
  if (!window.ethereum) {
    // console.log("please install MetaMask");
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider
    .send("eth_requestAccounts", [])
    .then((accounts) => {
      if (accounts.length > 0) {
        // console.log(accounts[0]);
        provider
          .getSigner(accounts[0])
          .getAddress()
          .then((resp) => {
            // console.log(resp);
            setGlobalState("connectedAccount", resp);
          });
      }
    })
    .catch((e) => console.log(e));
};

//click disconnect
const disconnectWallet = () => {
  // console.log("onClickDisConnect");
  setGlobalState("balance", "");
  setGlobalState("connectedAccount", "");
};

const isWallectConnected = async () => {
  try {
    if (!window.ethereum) return console.log("Please install Metamask");
    const accounts = await window.ethereum.request({ method: "eth_accounts" });

    window.ethereum.on("chainChanged", (chainId: any) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      await isWallectConnected();
    });

    if (accounts.length) {
      // setGlobalState("connectedAccount", accounts[0]);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      provider
        .send("eth_requestAccounts", [])
        .then((accounts) => {
          if (accounts.length > 0) {
            provider
              .getSigner(accounts[0])
              .getAddress()
              .then((resp) => {
                setGlobalState("connectedAccount", resp);
              });
          }
        })
        .catch((e) => console.log(e));
    } else {
      setGlobalState("connectedAccount", "");
    }
  } catch (error) {
    console.log(error);
  }
};

const getTotalStaked = async () => {
  if (!window.ethereum) {
    // console.log("please install MetaMask");
    return 0;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const contracts = new ethers.Contract(
    config.CardMainnet.BscAddress,
    config.CardMainnet.abi,
    signer
  );

  const total = await contracts.totalSupply();
  setGlobalState("totalStaked", total.toNumber());
};

const getTotalVotingReward = async () => {
  if (!window.ethereum) {
    // console.log("please install MetaMask");
    return 0;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider
    .getBalance(config.MesmeCardGovernor.address)
    .then((result) => {
      let totalReward = ethers.utils.formatEther(result);
      setGlobalState("totalVotingReward", Number(totalReward));
    })
    .catch((e) => console.log(e));
};

const getInfoAccount = async () => {
  const connectedAccount = getGlobalState("connectedAccount");
  if (!connectedAccount || !ethers.utils.isAddress(connectedAccount)) return;

  //client side code
  if (!window.ethereum) {
    alert("please install MetaMask");
    return;
  }

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  provider
    .getBalance(connectedAccount)
    .then((result) => {
      setGlobalState("balance", ethers.utils.formatEther(result));
    })
    .catch((e) => console.log(e));

  provider
    .getNetwork()
    .then((result) => {
      setGlobalState("chainId", result.chainId);
      setGlobalState("chainName", result.name);
    })
    .catch((e) => console.log(e));
};

export const blockchainService = {
  isWallectConnected,
  connectWallet,
  disconnectWallet,
  getTotalStaked,
  getTotalVotingReward,
  getInfoAccount,
};

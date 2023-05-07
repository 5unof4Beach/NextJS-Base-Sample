import NextLink from "next/link";
import {
  Flex,
  Button,
  Spacer,
  Heading,
  LinkBox,
  LinkOverlay,
  Image,
  Text,
} from "@chakra-ui/react";
import { useGlobalState } from "../../store";
import { blockchainService, proposalService } from "services";
import { swapVote } from "redux/voteStateSlice";
import { useDispatch } from "react-redux";
import {
  setListAddressProposal,
  setListApproveProposal,
  setListProposal,
  setListQueue,
  setListSuccess,
} from "redux/proposalsSlice";
import { useSelector } from "react-redux";

export default function Header() {
  const [connectedAccount] = useGlobalState("connectedAccount");

  const formatDisplayAccount = () => {
    if (!connectedAccount) return "";
    return (
      connectedAccount.substring(0, 4) +
      "..." +
      connectedAccount.substring(connectedAccount.length - 5)
    );
  };

  // redux
  const dispatch = useDispatch();
  const stateChoice = useSelector(
    (state: any) => state.proposalState.stateChoice
  );

  const handleReload = (stateChoice: number, voteState: number) => {
    switch (stateChoice) {
      case 1:
        proposalService
          .getAllProposals()
          .then((resp) => {
            const results = resp?.data.data || [];
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
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case 2:
        proposalService
          .getProposalByState(0)
          .then((resp) => {
            const results = resp?.data.data || [];
            dispatch(
              setListApproveProposal(
                results.filter((item: any) => {
                  if (voteState === 1) {
                    return (
                      item.is_approved === false &&
                      item.proposal_type === "ERC721"
                    );
                  }
                  return (
                    item.is_approved === false && item.proposal_type === "ERC20"
                  );
                })
              )
            );
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case 3:
        proposalService
          .getProposalByUser(connectedAccount)
          .then((resp) => {
            const results = resp?.data.data || [];
            dispatch(
              setListAddressProposal(
                results.filter((item: any) => {
                  if (voteState === 1) {
                    return item.proposal_type === "ERC721";
                  }
                  return item.proposal_type === "ERC20";
                })
              )
            );
          })
          .catch((err) => {
            console.log(err);
          });
        break;
      case 4:
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
                  item.proposal_type === "ERC20" && item.proposal_state === "4"
                );
              })
            )
          );
        });
        break;
      case 5:
        proposalService.getAllProposals().then((resp) => {
          const results = resp?.data.data || [];
          dispatch(
            setListQueue(
              results.filter((item: any) => {
                if (voteState === 1) {
                  return (
                    item.proposal_type === "ERC721" &&
                    item.proposal_state === "5"
                  );
                }
                return (
                  item.proposal_type === "ERC20" && item.proposal_state === "5"
                );
              })
            )
          );
        });
        break;
    }
    // proposalService
    //   .getAllProposals()
    //   .then((resp) => {
    //     dispatch(
    //       setListProposal(
    //         resp?.data.data.filter((item: any) => {
    //           if (voteState === 1) {
    //             return item.is_approved && item.proposal_type === "ERC721";
    //           }
    //           return item.is_approved && item.proposal_type === "ERC20";
    //         })
    //       )
    //     );
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const handleSwapCard = () => {
    dispatch(swapVote(1));
    handleReload(stateChoice, 1);
  };

  const handleSwapCoin = () => {
    dispatch(swapVote(2));
    handleReload(stateChoice, 2);
  };

  return (
    <Flex as="header" alignItems="center" h="100px" bg="rgba(46, 26, 84, 0.5)">
      <LinkBox className="header" ml="160px">
        <NextLink href={"/"} passHref>
          <LinkOverlay>
            <Heading size="md">
              <Image src="/images/mesme-logo.svg" w="200px" h="66px" alt="" />
            </Heading>
          </LinkOverlay>
        </NextLink>
      </LinkBox>
      <Spacer />
      <Button
        onClick={handleSwapCard}
        mr="50px"
        color="#FFFFFF"
        fontSize="16px"
        w="166px"
        h="44px"
        bg="#7D31AF"
        borderRadius="100px"
      >
        Card
      </Button>
      <Button
        onClick={handleSwapCoin}
        mr="50px"
        color="#FFFFFF"
        fontSize="16px"
        w="166px"
        h="44px"
        bg="#7D31AF"
        borderRadius="100px"
      >
        Coin
      </Button>
      {connectedAccount ? (
        <Flex
          flexDirection="row"
          gap="8px"
          mr="160px"
          color="#FFFFFF"
          fontSize="16px"
          w="166px"
          h="44px"
          bg="#7D31AF"
          p="4px 8px"
          borderRadius="100px"
          align="center"
        >
          <Image boxSize="36px" src="/images/metamask-icon.svg"></Image>
          <Text>{formatDisplayAccount()}</Text>
        </Flex>
      ) : (
        <Button
          mr="160px"
          color="#FFFFFF"
          fontSize="16px"
          w="166px"
          h="44px"
          bg="#7D31AF"
          borderRadius="100px"
          onClick={() => blockchainService.connectWallet()}
        >
          Connect Wallet
        </Button>
      )}
    </Flex>
  );
}

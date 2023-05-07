import { Flex, Spacer } from "@chakra-ui/layout";
import {
  Select,
  Text,
  Button,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { SearchOutlined } from "@ant-design/icons";
import { css } from "@emotion/css";
import ProposalDetail from "components/ProposalDetail";
import { useEffect, useState } from "react";
import { proposalService, userService } from "services";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalState } from "store";
import {
  setListProposal,
  setListAddressProposal,
  setListApproveProposal,
  setListQueue,
  setListExecute,
  setListSuccess,
} from "redux/proposalsSlice";
import { setStateProposal } from "redux/proposalStateSlice";

export default function ProposalsVote() {
  // const [proposals, setProposals] = useState<any[] | undefined>([]);
  const [voteChange, setVoteChange] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const updatedProposals = useSelector(
    (state: any) => state.listProposal.listAllProposal
  );
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [search, setSearch] = useState<string>("");

  // redux
  const dispatch = useDispatch();
  const proposals = useSelector(
    (state: any) => state.listProposal.listAllProposal
  );
  const proposalsApprove = useSelector(
    (state: any) => state.listProposal.listApproveProposal
  );
  const proposalsAddress = useSelector(
    (state: any) => state.listProposal.listAddressProposal
  );
  const proposalsQueue = useSelector(
    (state: any) => state.listProposal.listQueue
  );
  const proposalsSucceeded = useSelector(
    (state: any) => state.listProposal.listSuccess
  );
  const stateProposal = useSelector(
    (state: any) => state.proposalState.stateChoice
  );
  const voteState = useSelector((state: any) => state.voteState.value);

  useEffect(() => {
    // console.log(1111111);
    const fetchData = async () => {
      if (updatedProposals.length > 0) {
        dispatch(setListProposal(updatedProposals));
      } else {
        const listProposal = await proposalService.getAllProposals();
        const arrProposal = listProposal?.data.data || [];
        dispatch(
          setListProposal(
            arrProposal.filter((item: any) => {
              if (voteState === 1) {
                return item.is_approved && item.proposal_type === "ERC721";
              }
              return item.is_approved && item.proposal_type === "ERC20";
            })
          )
        );
      }
    };
    fetchData();
  }, [
    voteChange,
    updatedProposals.length > 0 ? updatedProposals : "",
    dispatch,
    voteState,
  ]);

  useEffect(() => {
    userService
      .isAdmin(connectedAccount)
      .then((resp) => {
        setIsAdmin(resp?.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [connectedAccount]);

  const handleVoteChange = () => {
    setVoteChange((prevState) => !prevState);
  };

  const handleChoice = async (e: any) => {
    switch (e.target.value) {
      case "All":
        dispatch(setStateProposal(1));
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
      case "Approve":
        dispatch(setStateProposal(2));
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
      case "Proposal":
        dispatch(setStateProposal(3));
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
      case "Succeeded":
        dispatch(setStateProposal(4));
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
      case "Queue":
        dispatch(setStateProposal(5));
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
  };

  const [searchPro, setSearchPro] = useState(null);

  const handleChangeSearchProposal = async () => {
    const docSearch = document.querySelector(".Input") as HTMLInputElement;
    const inputSearch = docSearch.value;
    if (inputSearch !== "") {
      setSearch(inputSearch);
      const pSearch = await proposalService.searchProposalByName(inputSearch);
      if (pSearch?.data === "failed") {
        setSearchPro(null);
      } else {
        setSearchPro(pSearch?.data.data);
      }
    } else {
      setSearch("");
      setSearchPro(null);
    }
  };

  const handleChangeSearchInput = () => {
    const docSearch = document.querySelector(".Input") as HTMLInputElement;
    const inputSearch = docSearch.value;
    setTimeout(() => {
      if (inputSearch === "") {
        setSearch("");
        setSearchPro(null);
      }
    }, 1000);
  };

  return (
    <Flex w="100%" my="40px" flexDirection="column" id="proposalVoteContainer">
      <Flex
        flexDirection="row"
        justify="space-between"
        className={searchBoxContainer}
      >
        <Flex flexDirection="row" align="center">
          <Text fontWeight="700" fontSize="20px" mr="24px">
            Proposals
          </Text>
          <Select
            className={selectStatusBox}
            defaultValue="all"
            _focus={{ outline: "none" }}
            onChange={handleChoice}
          >
            <option value="All">All</option>
            <option value="Proposal">Proposal</option>
            <option value="Succeeded">Succeeded</option>
            {isAdmin === true ? (
              <>
                <option value="Queue">Queue</option>
                <option value="Approve">Approved</option>
                {/* <option value="Execute">Execute</option> */}
              </>
            ) : (
              <></>
            )}
          </Select>
        </Flex>
        <Spacer />
        <Flex className={searchBox}>
          <InputGroup>
            <Input
              className="Input"
              border="none"
              placeholder="Search proposals"
              _focus={{ outline: "none" }}
              onChange={handleChangeSearchInput}
            />
            <InputRightElement
              pointerEvents="all"
              onClick={handleChangeSearchProposal}
            >
              <SearchOutlined
                style={{
                  color: "rgba(255, 255, 255, 0.5)",
                  fontWeight: "900",
                  strokeWidth: "300",
                }}
              />
            </InputRightElement>
          </InputGroup>
        </Flex>
      </Flex>
      {search !== "" ? (
        <>
          {searchPro !== null ? (
            <ProposalDetail
              proposal={searchPro}
              onChangeVote={handleVoteChange}
              stateChoice={stateProposal}
              isAdmin={isAdmin}
            />
          ) : (
            <div className="exist">
              <span>DOES NOT EXIST</span>
            </div>
          )}
        </>
      ) : (
        <>
          {stateProposal === 1 && proposals && proposals.length > 0 && (
            <Flex className={listProposals} flexDirection="column">
              {proposals.map((proposal: any) => (
                <ProposalDetail
                  proposal={proposal}
                  onChangeVote={handleVoteChange}
                  stateChoice={stateProposal}
                  isAdmin={isAdmin}
                  key={proposal._id}
                />
              ))}
            </Flex>
          )}
          {stateProposal === 2 &&
            proposalsApprove &&
            proposalsApprove.length > 0 && (
              <Flex className={listProposals} flexDirection="column">
                {proposalsApprove.map((proposal: any) => (
                  <ProposalDetail
                    proposal={proposal}
                    // onChangeVote={handleVoteChange}
                    stateChoice={stateProposal}
                    key={proposal._id}
                  />
                ))}
              </Flex>
            )}
          {stateProposal === 3 &&
            proposalsAddress &&
            proposalsAddress.length > 0 && (
              <Flex className={listProposals} flexDirection="column">
                {proposalsAddress.map((proposal: any) => (
                  <ProposalDetail
                    proposal={proposal}
                    // onChangeVote={handleVoteChange}
                    stateChoice={stateProposal}
                    isAdmin={isAdmin}
                    key={proposal._id}
                  />
                ))}
              </Flex>
            )}
          {stateProposal === 4 &&
            proposalsSucceeded &&
            proposalsSucceeded.length > 0 && (
              <Flex className={listProposals} flexDirection="column">
                {proposalsSucceeded.map((proposal: any) => (
                  <ProposalDetail
                    proposal={proposal}
                    onChangeVote={handleVoteChange}
                    isAdmin={isAdmin}
                    stateChoice={stateProposal}
                    key={proposal._id}
                  />
                ))}
              </Flex>
            )}
          {stateProposal === 5 &&
            proposalsQueue &&
            proposalsQueue.length > 0 && (
              <Flex className={listProposals} flexDirection="column">
                {proposalsQueue.map((proposal: any) => (
                  <ProposalDetail
                    proposal={proposal}
                    onChangeVote={handleVoteChange}
                    stateChoice={stateProposal}
                    isAdmin={isAdmin}
                    key={proposal._id}
                  />
                ))}
              </Flex>
            )}
        </>
      )}
    </Flex>
  );
}

const searchBoxContainer = css`
  font-family: "Noto Sans";
  font-style: normal;
  color: #ffffff;
`;

const selectStatusBox = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 16px;
  gap: 2px;
  width: 144px;
  height: 41px;
  background: rgba(46, 26, 84, 0.8);
  border-radius: 100px;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 400;
  font-size: 14px;
  line-height: 21px;
  border: none;
  option {
    background: rgba(46, 26, 84, 0.8);
  }
`;

const searchBox = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 10px;
  gap: 15px;
  width: 320px;
  height: 41px;
  background: rgba(46, 26, 84, 0.8);
  border-radius: 100px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

const listProposals = css`
  width: 100%;
`;

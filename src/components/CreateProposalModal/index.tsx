import { Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { css } from "@emotion/css";

import {
  setCheck,
  setDuplicateDes,
  setDuplicateName,
  setErrCalldata,
  setErrDescription,
  setErrEndDate,
  setErrEndLessStart,
  setErrProposalName,
  setErrStartBigEnd,
  setErrStartDate,
  setErrTarget,
} from "redux/registerErrorSlice";
import { proposalService } from "services/proposal-service";
import { useGlobalState } from "store";
import {
  setListAddressProposal,
  setListApproveProposal,
} from "redux/proposalsSlice";

type Props = {
  closeProposal: Function;
};

export default function CreateProposalModal(props: Props) {
  const { closeProposal } = props;
  const [proposals, setProposals] = useState([]);
  const [isChecked, setIsChecked] = useState<boolean>(true);
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const handleClose = () => {
    dispatch(setErrProposalName(""));
    dispatch(setDuplicateName(""));
    dispatch(setErrDescription(""));
    dispatch(setDuplicateDes(""));
    dispatch(setErrStartDate(""));
    dispatch(setErrEndDate(""));
    dispatch(setErrStartBigEnd(""));
    dispatch(setErrEndLessStart(""));
    dispatch(setErrTarget(""));
    dispatch(setErrCalldata(""));
    closeProposal(false);
  };

  // useState
  const [connectedAccount] = useGlobalState("connectedAccount");

  // redux
  const voteState = useSelector((state: any) => state.voteState.value);
  const regisErr = useSelector((state: any) => state.registerError);
  // console.log(regisErr);
  const dispatch = useDispatch();

  useEffect(() => {
    proposalService
      .getAllProposals()
      .then((resp) => {
        setProposals(resp?.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const inputValue = () => {
    const proposalName = document.querySelector(
      "#ten-proposal"
    ) as HTMLInputElement;
    const proposalNameValue = proposalName.value;
    const issued_by = connectedAccount;
    const startDate = document.querySelector(".start-date") as HTMLInputElement;
    const startDateString = startDate.value;
    const dateStart = new Date(Date.parse(startDateString));
    const timestampStart = dateStart.getTime();
    const endDate = document.querySelector(".end-date") as HTMLInputElement;
    const endDateString = endDate.value;
    const dateEnd = new Date(Date.parse(endDateString));
    const timestampEnd = dateEnd.getTime();
    const proposal_type = voteState === 1 ? "ERC721" : "ERC20";
    let targets = [];
    const values = [0];
    let calldatas = [];
    const target = document.getElementById("targets") as HTMLInputElement;
    targets.push(target.value);
    const calldata = document.getElementById("calldatas") as HTMLInputElement;
    calldatas.push(calldata.value);
    const description = document.querySelector(
      ".desription"
    ) as HTMLTextAreaElement;
    const descriptionValue = description.value;
    return {
      proposalName: proposalNameValue,
      issuedBy: issued_by,
      startDateString: startDateString,
      timestampStart: timestampStart,
      endDateString: endDateString,
      timestampEnd: timestampEnd,
      proposalType: proposal_type,
      values: values,
      targets: targets,
      calldatas: calldatas,
      description: descriptionValue,
    };
  };

  const handleCheck = () => {
    const {
      proposalName,
      startDateString,
      timestampStart,
      endDateString,
      timestampEnd,
      targets,
      calldatas,
      description,
    } = inputValue();
    let ok = true;
    const duplicateName = proposals.some((item: any) => {
      return item.proposal_name === proposalName;
    });
    if (proposalName === "") {
      ok = false;
      dispatch(setErrProposalName("Required not blank"));
    } else {
      dispatch(setErrProposalName(""));
    }
    if (duplicateName) {
      ok = false;
      dispatch(setDuplicateName("Proposal name is already exist"));
    } else {
      dispatch(setDuplicateName(""));
    }
    const duplicateDes = proposals.some((item: any) => {
      return item.description === description;
    });
    if (description === "") {
      ok = false;
      dispatch(setErrDescription("Required not blank"));
    } else {
      dispatch(setErrDescription(""));
    }
    if (duplicateDes) {
      ok = false;
      dispatch(setDuplicateDes("Description is already exist"));
    } else {
      dispatch(setDuplicateDes(""));
    }
    if (startDateString === "") {
      ok = false;
      dispatch(setErrStartDate("Required not blank"));
    } else {
      dispatch(setErrStartDate(""));
    }
    if (endDateString === "") {
      ok = false;
      dispatch(setErrEndDate("Required not blank"));
    } else {
      dispatch(setErrEndDate(""));
    }
    if (timestampStart > timestampEnd) {
      ok = false;
      dispatch(setErrStartBigEnd("Start Date must be less than End Date"));
      dispatch(setErrEndLessStart("End Date must be greater than Start Date"));
    } else {
      dispatch(setErrStartBigEnd(""));
      dispatch(setErrEndLessStart(""));
    }
    if (targets[0] === "") {
      ok = false;
      dispatch(setErrTarget("Required not blank"));
    } else {
      dispatch(setErrTarget(""));
    }
    if (calldatas[0] === "") {
      ok = false;
      dispatch(setErrCalldata("Required not blank"));
    } else {
      dispatch(setErrCalldata(""));
    }
    if (ok) {
      setIsChecked(false);
      setIsSubmit(true);
    }
  };

  const handleSubmit = () => {
    const {
      proposalName,
      issuedBy,
      timestampStart,
      timestampEnd,
      proposalType,
      values,
      targets,
      calldatas,
      description,
      startDateString,
      endDateString,
    } = inputValue();
    let ok = true;
    const duplicateName = proposals.some((item: any) => {
      return item.proposal_name === proposalName;
    });
    if (proposalName === "") {
      ok = false;
      dispatch(setErrProposalName("Required not blank"));
    } else {
      dispatch(setErrProposalName(""));
    }
    if (duplicateName) {
      ok = false;
      dispatch(setDuplicateName("Proposal Name already exist"));
    } else {
      dispatch(setDuplicateName(""));
    }
    const duplicateDes = proposals.some((item: any) => {
      return item.description === description;
    });
    if (description === "") {
      ok = false;
      dispatch(setErrDescription("Required not blank"));
    } else {
      dispatch(setErrDescription(""));
    }
    if (duplicateDes) {
      ok = false;
      dispatch(setDuplicateDes("Description already exist"));
    } else {
      dispatch(setDuplicateDes(""));
    }
    if (startDateString === "") {
      ok = false;
      dispatch(setErrStartDate("Required not blank"));
    } else {
      dispatch(setErrStartDate(""));
    }
    if (endDateString === "") {
      ok = false;
      dispatch(setErrEndDate("Required not blank"));
    } else {
      dispatch(setErrEndDate(""));
    }
    if (timestampStart > timestampEnd) {
      ok = false;
      dispatch(setErrStartBigEnd("Start Date must be less than End Date"));
      dispatch(setErrEndLessStart("End Date must be greater than Start Date"));
    } else {
      dispatch(setErrStartBigEnd(""));
      dispatch(setErrEndLessStart(""));
    }
    if (targets[0] === "") {
      ok = false;
      dispatch(setErrTarget("Required not blank"));
    } else {
      dispatch(setErrTarget(""));
    }
    if (calldatas[0] === "") {
      ok = false;
      dispatch(setErrCalldata("Required not blank"));
    } else {
      dispatch(setErrCalldata(""));
    }
    if (ok) {
      registerProposal(
        proposalName,
        issuedBy,
        timestampStart,
        timestampEnd,
        proposalType,
        description,
        targets,
        values,
        calldatas
      );
      setIsChecked(true);
      setIsSubmit(false);
      // handleReload();
      handleClose();
    }
  };

  // const handleReload = async () => {
  //   await proposalService
  //     .getProposalByUser(connectedAccount)
  //     .then((resp) => {
  //       dispatch(
  //         setListAddressProposal(
  //           resp?.data.data.filter((item: any) => {
  //             if (voteState === 1) {
  //               return (
  //                 item.is_approved === false && item.proposal_type === "ERC721"
  //               );
  //             }
  //             return (
  //               item.is_approved === false && item.proposal_type === "ERC20"
  //             );
  //           })
  //         )
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const registerProposal = async (
    proposalNameValue: string,
    issued_by: string,
    timestampStart: number,
    timestampEnd: number,
    proposal_type: string,
    descriptionValue: string,
    targets: string[] = [],
    values: number[] = [],
    calldatas: string[] = []
  ) => {
    await proposalService.registerProposal(
      proposalNameValue,
      issued_by,
      timestampStart,
      timestampEnd,
      proposal_type,
      descriptionValue,
      targets,
      values,
      calldatas
    );
  };

  return (
    <>
      <div className="modal">
        <div className="wrapper-proposal">
          <div className="proposal-child">
            <div className="icon-close" onClick={handleClose}>
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.32692 6.25041L11.0379 2.53947C11.214 2.36366 11.313 2.12509 11.3133 1.87623C11.3135 1.62738 11.2148 1.38864 11.039 1.21251C10.8632 1.03639 10.6246 0.937328 10.3758 0.937108C10.1269 0.936888 9.8882 1.03553 9.71208 1.21134L6.00114 4.92228L2.2902 1.21134C2.11408 1.03522 1.87521 0.936279 1.62614 0.936279C1.37707 0.936279 1.1382 1.03522 0.962076 1.21134C0.785955 1.38746 0.687012 1.62633 0.687012 1.87541C0.687012 2.12448 0.785955 2.36335 0.962076 2.53947L4.67301 6.25041L0.962076 9.96134C0.785955 10.1375 0.687012 10.3763 0.687012 10.6254C0.687012 10.8745 0.785955 11.1133 0.962076 11.2895C1.1382 11.4656 1.37707 11.5645 1.62614 11.5645C1.87521 11.5645 2.11408 11.4656 2.2902 11.2895L6.00114 7.57853L9.71208 11.2895C9.8882 11.4656 10.1271 11.5645 10.3761 11.5645C10.6252 11.5645 10.8641 11.4656 11.0402 11.2895C11.2163 11.1133 11.3153 10.8745 11.3153 10.6254C11.3153 10.3763 11.2163 10.1375 11.0402 9.96134L7.32692 6.25041Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="proposal-title">
              <span>Register Proposal</span>
            </div>
            <div>
              <div className="name-proposal">
                <div className="title">
                  {regisErr.proposalName !== "" ? (
                    <span className={styleErr}>Proposal Name</span>
                  ) : (
                    <span>Proposal Name</span>
                  )}
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.376 0.839999L5.056 3.72L7.968 2.904L8.224 4.872L5.568 5.064L7.312 7.384L5.536 8.328L4.32 5.88L3.248 8.312L1.408 7.384L3.136 5.064L0.496 4.856L0.8 2.904L3.648 3.72L3.328 0.839999H5.376Z"
                      fill="#FF3225"
                    />
                  </svg>
                </div>
                <div className="text-input">
                  <input type="text" id="ten-proposal"></input>
                </div>
                {regisErr.duplicateName !== "" ? (
                  <span>{regisErr.duplicateName}</span>
                ) : (
                  <></>
                )}
                <div className="title title1">
                  {regisErr.target ? (
                    <span className={styleErr}>Targets</span>
                  ) : (
                    <span>Targets</span>
                  )}
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.376 0.839999L5.056 3.72L7.968 2.904L8.224 4.872L5.568 5.064L7.312 7.384L5.536 8.328L4.32 5.88L3.248 8.312L1.408 7.384L3.136 5.064L0.496 4.856L0.8 2.904L3.648 3.72L3.328 0.839999H5.376Z"
                      fill="#FF3225"
                    />
                  </svg>
                </div>
                <div className="text-input">
                  <input type="text" id="targets"></input>
                </div>
                <div className="title title1">
                  {regisErr.calldata ? (
                    <span className={styleErr}>Calldatas</span>
                  ) : (
                    <span>Calldatas</span>
                  )}
                  <svg
                    width="9"
                    height="9"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.376 0.839999L5.056 3.72L7.968 2.904L8.224 4.872L5.568 5.064L7.312 7.384L5.536 8.328L4.32 5.88L3.248 8.312L1.408 7.384L3.136 5.064L0.496 4.856L0.8 2.904L3.648 3.72L3.328 0.839999H5.376Z"
                      fill="#FF3225"
                    />
                  </svg>
                </div>
                <div className="text-input">
                  <input type="text" id="calldatas"></input>
                </div>
                <div className="content2">
                  <div className="content2-title">
                    <div className="title">
                      <span>Voting System</span>
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 9 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.376 0.839999L5.056 3.72L7.968 2.904L8.224 4.872L5.568 5.064L7.312 7.384L5.536 8.328L4.32 5.88L3.248 8.312L1.408 7.384L3.136 5.064L0.496 4.856L0.8 2.904L3.648 3.72L3.328 0.839999H5.376Z"
                          fill="#FF3225"
                        />
                      </svg>
                    </div>
                    <div className="text-input">
                      <input
                        type="text"
                        defaultValue="Generic Proposal"
                        readOnly
                      ></input>
                    </div>
                  </div>
                  <div className="date">
                    <div className="date-input1">
                      <div className="title">
                        {regisErr.startDate ? (
                          <span className={styleErr}>Start Date</span>
                        ) : (
                          <span>Start Date</span>
                        )}
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 9 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.376 0.839999L5.056 3.72L7.968 2.904L8.224 4.872L5.568 5.064L7.312 7.384L5.536 8.328L4.32 5.88L3.248 8.312L1.408 7.384L3.136 5.064L0.496 4.856L0.8 2.904L3.648 3.72L3.328 0.839999H5.376Z"
                            fill="#FF3225"
                          />
                        </svg>
                      </div>
                      <div className="dinput">
                        {/* <input type="date" className="start-date"></input> */}
                        <Input
                          placeholder="Select Date and Time"
                          size="md"
                          bg="#8b8694"
                          type="datetime-local"
                          className="start-date"
                        />
                      </div>
                      {regisErr.startBigEnd ? (
                        <span>{regisErr.startBigEnd}</span>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div className="date-input2">
                      <div className="title">
                        {regisErr.endDate ? (
                          <span className={styleErr}>End Date</span>
                        ) : (
                          <span>End Date</span>
                        )}
                        <svg
                          width="9"
                          height="9"
                          viewBox="0 0 9 9"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M5.376 0.839999L5.056 3.72L7.968 2.904L8.224 4.872L5.568 5.064L7.312 7.384L5.536 8.328L4.32 5.88L3.248 8.312L1.408 7.384L3.136 5.064L0.496 4.856L0.8 2.904L3.648 3.72L3.328 0.839999H5.376Z"
                            fill="#FF3225"
                          />
                        </svg>
                      </div>
                      <div className="dinput">
                        {/* <input type="date" className="end-date"></input> */}
                        <Input
                          placeholder="Select Date and Time"
                          size="md"
                          bg="#8b8694"
                          type="datetime-local"
                          className="end-date"
                        />
                      </div>
                      {regisErr.endLessStart ? (
                        <span>{regisErr.endLessStart}</span>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-area">
                  <div className="title">
                    {regisErr.description ? (
                      <span className={styleErr}>Description</span>
                    ) : (
                      <span>Description</span>
                    )}
                    <svg
                      width="9"
                      height="9"
                      viewBox="0 0 9 9"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.376 0.839999L5.056 3.72L7.968 2.904L8.224 4.872L5.568 5.064L7.312 7.384L5.536 8.328L4.32 5.88L3.248 8.312L1.408 7.384L3.136 5.064L0.496 4.856L0.8 2.904L3.648 3.72L3.328 0.839999H5.376Z"
                        fill="#FF3225"
                      />
                    </svg>
                  </div>
                  <div className="text-area-input">
                    <textarea className="text-area-child desription"></textarea>
                  </div>
                  {regisErr.duplicateDes ? (
                    <span>{regisErr.duplicateDes}</span>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="button-group">
                  <div className="cancel">
                    <button className="btn" onClick={handleClose}>
                      Cancel
                    </button>
                  </div>
                  <div className="submit">
                    {isChecked && (
                      <button className="btn" onClick={handleCheck}>
                        Check
                      </button>
                    )}
                    {isSubmit && (
                      <button className="btn" onClick={handleSubmit}>
                        Submit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const styleErr = css`
  color: red;
`;

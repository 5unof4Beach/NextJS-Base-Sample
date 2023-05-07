import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch } from "react-redux";
import { setListApproveProposal } from "redux/proposalsSlice";
import { proposalService } from "services";

interface Props {
  isOpen: any;
  onClose: any;
  btnRef: any;
  proposalId: string;
  voteState: number;
}

export default function AllowModal(props: Props) {
  const { isOpen, onClose, btnRef, proposalId, voteState } = props;

  const dispatch = useDispatch();

  const handleAllow = async () => {
    await proposalService.approveProposal(proposalId);
    await proposalService
      .getProposalByState(0)
      .then((resp) => {
        const results = resp?.data.data || [];
        dispatch(
          setListApproveProposal(
            results.filter((item: any) => {
              if (voteState === 1) {
                return (
                  item.is_approved === false && item.proposal_type === "ERC721"
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
    onClose();
  };
  return (
    <>
      <Modal
        onClose={onClose}
        finalFocusRef={btnRef}
        isOpen={isOpen}
        scrollBehavior="inside"
      >
        <ModalOverlay></ModalOverlay>
        <ModalContent>
          <ModalHeader>Confirm Allow</ModalHeader>
          <ModalCloseButton />
          <ModalFooter>
            <Flex
              width="100vw"
              justifyContent="center"
              alignItems="center"
              gap="50px"
            >
              <Button onClick={handleAllow} width="25%">
                Yes
              </Button>
              <Button onClick={onClose} width="25%">
                No
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

import {
  Box,
  Center,
  Divider,
  Flex,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { css } from "@emotion/css";
import React from "react";

const data = [
  {
    wallet: "0xF977414...aceC",
    amount: "20",
  },
  {
    wallet: "0xF977834...aceC",
    amount: "20",
  },
  {
    wallet: "0xF972814...aceC",
    amount: "40",
  },
  {
    wallet: "0xF977414...aceC",
    amount: "30",
  },
  {
    wallet: "0xF947814...aceC",
    amount: "5",
  },
  {
    wallet: "0xF977314...aceC",
    amount: "10",
  },
  {
    wallet: "0xF977214...aceC",
    amount: "35",
  },
  {
    wallet: "0xF977414...aceC",
    amount: "25",
  },
  {
    wallet: "0xF974814...aceC",
    amount: "60",
  },
  {
    wallet: "0xF972814...aceC",
    amount: "20",
  },
  {
    wallet: "0xF975814...aceC",
    amount: "30",
  },
  {
    wallet: "0xF974814...aceC",
    amount: "10",
  },
  {
    wallet: "0xF973814...aceC",
    amount: "25",
  },
  {
    wallet: "0xF975814...aceC",
    amount: "25",
  },
  {
    wallet: "0xF957814...aceC",
    amount: "10.",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "10",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "10",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20",
  },
];

interface Props {
  isOpen: any;
  onClose: any;
  btnRef: any;
}

export default function WalletInfoModal(props: Props) {
  const { isOpen, onClose, btnRef } = props;
  return (
    <Modal
      onClose={onClose}
      finalFocusRef={btnRef}
      isOpen={isOpen}
      scrollBehavior="inside"
      isCentered
    >
      <ModalOverlay />
      <ModalContent className={ModalBorder}>
        <ModalHeader>
          <Flex justify="space-between" align="center">
            <Box>
              <Text
                color="#FFFFFF"
                fontSize="12px"
                fontFamily="Noto Sans"
                lineHeight="18px"
                fontWeight="700"
              >
                Mesme
              </Text>
              <Text
                color="#FFFFFF"
                fontSize="12px"
                fontFamily="Noto Sans"
                lineHeight="18px"
                fontWeight="700"
                w="100%"
              >
                Voting Wallet
              </Text>
            </Box>
            <Box>
              <Text
                color="#FFFFFF"
                fontSize="14px"
                fontFamily="Noto Sans"
                lineHeight="21px"
                fontWeight="700"
              >
                36.015.869
              </Text>
            </Box>
          </Flex>
          <Center>
            <Divider
              alignContent="center"
              variant="solid"
              w="468px"
              mt="16px"
            />
          </Center>
        </ModalHeader>
        <ModalCloseButton
          className={ModalCloseBtn}
          _focus={{ boxShadow: "none" }}
          _hover={{ background: "#7d31af" }}
        />
        <ModalBody
          sx={{
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(0, 0, 0, 0.5)",
              border: "1px solid rgba(255, 255, 255, 0.5)",
              borderRadius: "24px",
            },
          }}
        >
          <Flex justify="space-between" align="center">
            <Box>
              <Text
                color="#A9A9A9"
                fontSize="12px"
                fontFamily="Noto Sans"
                lineHeight="18px"
                fontWeight="400"
                mb="16px"
              >
                Wallet
              </Text>
              <List
                spacing="16px"
                color="#FFFFFF"
                fontSize="12px"
                fontFamily="Noto Sans"
                lineHeight="18px"
                fontWeight="400"
                w="100%"
              >
                {data.map((item, index) => (
                  <ListItem key={index}>{item.wallet}</ListItem>
                ))}
              </List>
            </Box>
            <Box>
              <Text
                color="#A9A9A9"
                fontSize="12px"
                fontFamily="Noto Sans"
                lineHeight="18px"
                fontWeight="400"
                align="right"
                mb="16px"
              >
                Amount
              </Text>
              <List
                spacing="16px"
                color="#FFFFFF"
                fontSize="12px"
                fontFamily="Noto Sans"
                lineHeight="18px"
                fontWeight="700"
                w="100%"
              >
                {data.map((item, index) => (
                  <ListItem key={index}>{item.amount}</ListItem>
                ))}
              </List>
            </Box>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

const ModalCloseBtn = css`
  color: #ffffff;
  border-radius: 1000px;
  background: #7d31af;
  width: 32px;
  height: 32px;
  right: -18px;
  top: -17px;
`;

const ModalBorder = css`
  border: 1px solid;
  border-image-slice: 1;
  border-image-source: linear-gradient(to right, #2beef4, #607eee, #8f4bde);
  background-color: #000000;
`;

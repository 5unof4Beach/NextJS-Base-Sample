import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { css } from "@emotion/css";
import { RightOutlined } from "@ant-design/icons";
import { useRef } from "react";
import WalletInfoModal from "components/WalletInfoModal";
import React from "react";

const data = [
  {
    wallet: "0xF977814...aceC",
    amount: "20.000.000",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20.000.000",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20.000.000",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20.000.000",
  },
  {
    wallet: "0xF977814...aceC",
    amount: "20.000.000",
  },
];

export default function WalletInfo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>(null);

  return (
    <Box className={walletInfoCard}>
      <Flex justify="space-between" align="center">
        <Box>
          <Text
            color="#FFFFFF"
            fontSize="12px"
            fontFamily="Noto Sans"
            lineHeight="18px"
            fontWeight="700"
          >
            Ethereum
          </Text>
          <Text
            color="#FFFFFF"
            fontSize="12px"
            fontFamily="Noto Sans"
            lineHeight="18px"
            fontWeight="700"
            w="100%"
          >
            KNC-USDC & KNC-WBTC
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
        <Divider alignContent="center" variant="solid" w="255px" mt="16px" />
      </Center>
      <Flex mt="20px" justify="space-between" align="center">
        <Box>
          <Text
            color="#A9A9A9"
            fontSize="12px"
            fontFamily="Noto Sans"
            lineHeight="18px"
            fontWeight="400"
            mb="8px"
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
            mb="8px"
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
      <Flex justify="end" mt="20px" mr="10px">
        <Button
          rightIcon={<RightOutlined style={{ width: '6px', height: '10.5px' }} />}
          w="62px"
          color="#7D31AF"
          fontSize="12px"
          fontFamily="Noto Sans"
          fontStyle="normal"
          lineHeight="18px"
          fontWeight="600"
          boxShadow="none"
          variant="link"
          _focus={{ boxShadow: "none" }}
          ref={btnRef}
          onClick={onOpen}
        >
          View more
        </Button>
        <WalletInfoModal isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      </Flex>
    </Box>
  );
}

const walletInfoCard = css`
  font-family: "Noto Sans";
  padding: 16px;
  width: 287px;
  height: 326px;
  background-image: url("images/wallet_info_background.svg");
  background-repeat: no-repeat;
  background-size: 100%;
`;

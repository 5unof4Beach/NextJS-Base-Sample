import { RightOutlined } from "@ant-design/icons";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  List,
  ListItem,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { css } from "@emotion/css";
import WalletInfoModal from "components/WalletInfoModal";
import React, { useRef, useState, useEffect } from "react";

const dataYes = [
  {
    wallet: "0xF977814...aceC",
    amount: "10",
  },
  {
    wallet: "0xF977813...aceC",
    amount: "20",
  },
  {
    wallet: "0xF977812...aceC",
    amount: "40",
  },
  {
    wallet: "0xF977811...aceC",
    amount: "10",
  },
  {
    wallet: "0xF977810...aceC",
    amount: "20",
  },
];

const dataNo = [
  {
    wallet: "0xF947814...aceC",
    amount: "5",
  },
  {
    wallet: "0xF947813...aceC",
    amount: "20",
  },
  {
    wallet: "0xF947812...aceC",
    amount: "10",
  },
  {
    wallet: "0xF947811...aceC",
    amount: "10",
  },
  {
    wallet: "0xF947810...aceC",
    amount: "5",
  },
];

const dataAbstain = [
  {
    wallet: "0xF977514...aceC",
    amount: "10",
  },
  {
    wallet: "0xF977513...aceC",
    amount: "10",
  },
  {
    wallet: "0xF977512...aceC",
    amount: "20",
  },
  {
    wallet: "0xF977511...aceC",
    amount: "5",
  },
  {
    wallet: "0xF977510...aceC",
    amount: "5",
  },
];

export default function WalletRank(props: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<any>(null);
  const [walletAddressYes, setWalletAddressYes] = useState<any[]>(dataYes);
  const [walletAddressNo, setWalletAddressNo] = useState<any[]>(dataNo);
  const [walletAddressAbstain, setWalletAddressAbstain] = useState<any[]>(dataAbstain);
  const [amountYes, setAmountYes] = useState(0);
  const [amountNo, setAmountNo] = useState(0);
  const [amountAbstain, setAmountAbstain] = useState(0);
  const { voters } = props;

  const formatDisplayAddress = (walletAddress: string) => {
    if (!walletAddress) return "";
    return (
      walletAddress.substring(0, 9) +
      "..." +
      walletAddress.substring(walletAddress.length - 4)
    );
  };

  useEffect(() => {
    if (voters) {
      let yes = 0;
      let no = 0;
      let abstain = 0;
      let listYes = [];
      let listNo = [];
      let listAbstain = [];
      voters.forEach((element: any) => {
        if (element.support == 1) {
          yes += element.vote;
          listYes.push({
            wallet: formatDisplayAddress(element.address),
            amount: new Intl.NumberFormat("de-DE").format(element.vote),
          });
        } else if (element.support == 0) {
          no += element.vote;
          listNo.push({
            wallet: formatDisplayAddress(element.address),
            amount: new Intl.NumberFormat("de-DE").format(element.vote),
          });
        } else if (element.support == 2) {
          abstain += element.vote;
          listAbstain.push({
            wallet: formatDisplayAddress(element.address),
            amount: new Intl.NumberFormat("de-DE").format(element.vote),
          });
        }
      });
      listYes.push(...dataYes);
      listNo.push(...dataNo);
      listAbstain.push(...dataAbstain);
      setWalletAddressYes(listYes);
      setWalletAddressNo(listNo);
      setWalletAddressAbstain(listAbstain);
      setAmountYes(yes);
      setAmountNo(no);
      setAmountAbstain(abstain);
    }
  }, [voters]);

  return (
    <Flex w="100%" pt="32px" justify="space-between">
      <Box className={walletTopRankCard}>
        <Flex className={zIndex} justify="space-between" align="center">
          <HStack spacing="2px">
            <Image src="/images/rank-icon.svg" alt="Rank Icon" />
            <Text
              color="#FFFFFF"
              fontSize="12px"
              fontFamily="Noto Sans"
              lineHeight="18px"
              fontWeight="700"
            >
              YES
            </Text>
          </HStack>
          <Box>
            <Text
              color="#FFFFFF"
              fontSize="14px"
              fontFamily="Noto Sans"
              lineHeight="21px"
              fontWeight="700"
            >
              {amountYes ? new Intl.NumberFormat("de-DE").format(amountYes) : 0}
            </Text>
          </Box>
        </Flex>
        <Center className={zIndex}>
          <Divider alignContent="center" variant="solid" w="418px" />
        </Center>
        <Flex
          className={zIndex}
          mt="20px"
          justify="space-between"
          align="center"
        >
          <Box>
            <Text
              color="#A9A9A9"
              fontSize="12px"
              fontFamily="Noto Sans"
              lineHeight="18px"
              fontWeight="400"
              mb="12px"
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
              {walletAddressYes.slice(0, 5).map((item, index) => (
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
              {walletAddressYes.slice(0, 5).map((item, index) => (
                <ListItem key={index}>{item.amount}</ListItem>
              ))}
            </List>
          </Box>
        </Flex>
        <Flex className={zIndex} justify="end" mt="20px" mr="10px">
          <Button
            rightIcon={
              <RightOutlined style={{ width: "6px", height: "10.5px" }} />
            }
            w="62px"
            mt="-5px"
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
        <Box className={ellipseCard}></Box>
      </Box>
      <Box className={walletRankInfoCard}>
        <Flex justify="space-between" align="center">
          <Box>
            <Text
              color="#FFFFFF"
              fontSize="12px"
              fontFamily="Noto Sans"
              lineHeight="18px"
              fontWeight="700"
            >
              NO
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
              {amountNo ? new Intl.NumberFormat("de-DE").format(amountNo) : 0}
            </Text>
          </Box>
        </Flex>
        <Center>
          <Divider alignContent="center" variant="solid" w="418px" mt="16px" />
        </Center>
        <Flex mt="20px" justify="space-between" align="center">
          <Box>
            <Text
              color="#A9A9A9"
              fontSize="12px"
              fontFamily="Noto Sans"
              lineHeight="18px"
              fontWeight="400"
              mb="12px"
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
              {walletAddressNo.slice(0, 5).map((item, index) => (
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
              {walletAddressNo.slice(0, 5).map((item, index) => (
                <ListItem key={index}>{item.amount}</ListItem>
              ))}
            </List>
          </Box>
        </Flex>
        <Flex justify="end" mt="20px" mr="10px">
          <Button
            rightIcon={
              <RightOutlined style={{ width: "6px", height: "10.5px" }} />
            }
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
      <Box className={walletRankInfoCard}>
        <Flex justify="space-between" align="center">
          <Box>
            <Text
              color="#FFFFFF"
              fontSize="12px"
              fontFamily="Noto Sans"
              lineHeight="18px"
              fontWeight="700"
            >
              ABSTAIN
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
              {amountAbstain
                ? new Intl.NumberFormat("de-DE").format(amountAbstain)
                : 0}
            </Text>
          </Box>
        </Flex>
        <Center>
          <Divider alignContent="center" variant="solid" w="418px" mt="16px" />
        </Center>
        <Flex mt="20px" justify="space-between" align="center">
          <Box>
            <Text
              color="#A9A9A9"
              fontSize="12px"
              fontFamily="Noto Sans"
              lineHeight="18px"
              fontWeight="400"
              mb="12px"
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
              {walletAddressAbstain.slice(0, 5).map((item, index) => (
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
              {walletAddressAbstain.slice(0, 5).map((item, index) => (
                <ListItem key={index}>{item.amount}</ListItem>
              ))}
            </List>
          </Box>
        </Flex>
        <Flex justify="end" mt="20px" mr="10px">
          <Button
            rightIcon={
              <RightOutlined style={{ width: "6px", height: "10.5px" }} />
            }
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
    </Flex>
  );
}

const walletTopRankCard = css`
  font-family: "Noto Sans";
  width: 450px;
  height: 332px;
  padding: 16px;
  border-radius: 8px;
  background-image: url("images/wallet-top-rank-background.svg");
  background-repeat: no-repeat;
  background-size: 100%;
  box-shadow: 0px 0px 50px rgba(186, 134, 0, 0.25);
`;

const ellipseCard = css`
  position: relative;
  z-index: 1;
  top: -291px;
  width: 417x;
  height: 300px;
  background: rgb(57, 39, 18);
  border-radius: 50%;
  filter: blur(50px);
  transform: matrix(1, 0, 0, -1, 0, 0);
`;

const walletRankInfoCard = css`
  font-family: "Noto Sans";
  padding: 16px;
  width: 450x;
  height: 311px;
  border-radius: 8px;
  background-image: url("images/wallet-rank-info-background.svg");
  background-repeat: no-repeat;
  background-size: 100%;
`;

const zIndex = css`
  z-index: 2;
  position: relative;
`;

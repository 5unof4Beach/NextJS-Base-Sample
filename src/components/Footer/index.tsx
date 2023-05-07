import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import { css } from "@emotion/css";

export default function Footer() {
  return (
    <Flex gap="76" px="180" bg="#030007" w="100%">
      <Box py="84" w="33.33%">
        <HStack>
          <Image src="/images/mesme-logo.svg" alt="Mesme Logo" />
        </HStack>
        <Text
          maxWidth="200px"
          mt="2"
          color="#FFFFFF"
          fontFamily="Noto Sans"
          opacity="0.6"
          fontWeight="400"
          fontSize="12px"
          lineHeight="18px"
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
          minus recusandae quas tempore delectus dolorum necessitatibus, maiores
          accusamus quod magnam nesciunt corrupti debitis repudiandae facilis,
          fugit voluptatibus dolores voluptas et!
        </Text>
      </Box>
      <Box py="84" w="33.33%">
        <Stack direction="row" spacing="30">
          <Stack minW="36" flex="1" spacing="8">
            <Text
              color="#FFFFFF"
              fontFamily="Noto Sans"
              fontSize="16px"
              lineHeight="24px"
              fontWeight="700"
            >
              Learn more
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button
                className={moreInfoButton}
                variant="link"
                _focus={{ boxShadow: "none" }}
              >
                How to use
              </Button>
              <Button
                className={moreInfoButton}
                variant="link"
                _focus={{ boxShadow: "none" }}
              >
                Download
              </Button>
              <Button
                className={moreInfoButton}
                variant="link"
                _focus={{ boxShadow: "none" }}
              >
                FAQs
              </Button>
            </Stack>
          </Stack>
          <Stack minW="36" flex="1" spacing="8">
            <Text
              color="#FFFFFF"
              fontFamily="Noto Sans"
              fontSize="16px"
              lineHeight="24px"
              fontWeight="700"
            >
              Legal
            </Text>
            <Stack spacing="3" shouldWrapChildren>
              <Button
                className={moreInfoButton}
                variant="link"
                _focus={{ boxShadow: "none" }}
              >
                Terms of use
              </Button>
              <Button
                className={moreInfoButton}
                variant="link"
                _focus={{ boxShadow: "none" }}
              >
                Privacy Policy
              </Button>
              <Button
                className={moreInfoButton}
                variant="link"
                _focus={{ boxShadow: "none" }}
              >
                Site map
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Box py="84" w="33.33%">
        <InputGroup w="100%" h="32px">
          <Input
            borderRadius="5px"
            borderColor="#8F4BDE"
            focusBorderColor="#8F4BDE"
            placeholder="Your email here"
            _placeholder={{
              color: "#FFFFFF",
              fontFamily: "Noto Sans",
              fontSize: "14px",
              lineHeight: "21px",
              opacity: 0.8,
              fontWeight: 400,
            }}
            overflow="hidden"
          />
          <InputRightElement width="90px">
            <Button
              color="#FFFFFF"
              colorScheme="#8F4BDE"
              bgColor="#8F4BDE"
              fontSize="14px"
              lineHeight="21px"
              fontWeight="400"
              borderLeftRadius="0"
            >
              Subscribe
            </Button>
          </InputRightElement>
        </InputGroup>
        <HStack py="27">
          <Image
            boxSize="30px"
            src="/images/twitter-logo.svg"
            alt="Twitter Logo"
          />
          <Image
            boxSize="30px"
            src="/images/instagram-logo.svg"
            alt="Instagram Logo"
          />
          <Image
            boxSize="30px"
            src="/images/reddit-logo.svg"
            alt="Reddit Logo"
          />
        </HStack>
      </Box>
    </Flex>
  );
}

const moreInfoButton = css`
  font-family: "Noto Sans";
  color: #ffffff;
  font-size: 14px;
  line-height: 21px;
  font-weight: 400;
  opacity: 0.6;
`;

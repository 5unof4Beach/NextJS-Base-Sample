import React, { ReactNode } from "react";
import { Container } from "@chakra-ui/react";
import { css } from "@emotion/css";
import Header from "./Header";
import Footer from "./Footer";

type Props = {
  children: ReactNode;
};

export function Layout(props: Props) {
  return (
    <div className={layout}>
      <Header />
      <Container pl="160px" pr="160px" maxW="100%" mt="45px">
        {props.children}
      </Container>
      <Footer />
    </div>
  );
}

const layout = css`
  width: 100%;
  background-image: url("images/background-top.png");
  background-repeat: no-repeat;
  background-size: 100%;
  background-color: #0d001e;
  background-position-y: -90px;
  font-family: Noto Sans;
  font-size: 16px;
`;

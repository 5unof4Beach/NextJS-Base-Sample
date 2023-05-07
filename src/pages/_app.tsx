// src/pages/_app.tsx
import { useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Layout } from "components/layout";
import "../styles/global.css";
import { Provider } from "react-redux";
import store from "redux/configureStore";
import { useGlobalState } from "../store";
import { blockchainService } from "services";

function MyApp({ Component, pageProps }: AppProps) {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const AnyComponent = Component as any;
  useEffect(() => {
    const checkConnect = async () => {
      // check connect metamask, listen event change account and network
      await blockchainService.isWallectConnected();
    };
    checkConnect();
  }, []);

  useEffect(() => {
    const getInfo = async () => {
      await blockchainService.getInfoAccount();
      await blockchainService.getTotalStaked();
      await blockchainService.getTotalVotingReward();
    };
    if (connectedAccount) {
      getInfo();
    }
  }, [connectedAccount]);

  return (
    <Provider store={store}>
      <ChakraProvider>
        <Layout>
          <AnyComponent {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;

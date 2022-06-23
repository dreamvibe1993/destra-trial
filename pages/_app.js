import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { registerServiceWorker } from "../services/serviceWorker/register";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  registerServiceWorker();
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;

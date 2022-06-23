import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { registerServiceWorker } from "../services/serviceWorker/register";
import "../styles/globals.css";
import { useAuth } from "../services/hooks/useAuth/useAuth";
import { AppContext } from "../utils/contexts/app-context";
import { Navbar } from "../components/navbar/navbar";

/* 
  TODO:
  * items limit discrepancy
*/

function MyApp({ Component, pageProps }) {
  registerServiceWorker();
  const authStatus = useAuth();

  return (
    <ChakraProvider>
      <AppContext.Provider value={authStatus}>
        <Navbar />
        <Component {...pageProps} />
      </AppContext.Provider>
    </ChakraProvider>
  );
}

export default MyApp;

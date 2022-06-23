import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { AppContext } from "../../../utils/contexts/app-context";
import { useAuth } from "../../hooks/useAuth/useAuth";

export const Protect = ({ children }) => {
  const { isUserAuth, refreshTokens } = useAuth();
  const router = useRouter();

  if (isUserAuth === 0) return <Spinner />;

  if (isUserAuth === -1) router.push("/login");

  if (isUserAuth === 1)
    return (
      <AppContext.Provider value={refreshTokens}>
        <div>{children}</div>
      </AppContext.Provider>
    );
};

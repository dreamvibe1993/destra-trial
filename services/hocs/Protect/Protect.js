import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAuth } from "../../hooks/useAuth/useAuth";

export const Protect = ({ children }) => {
  const { isUserAuth } = useAuth();
  const router = useRouter();

  if (isUserAuth === 0) return <Spinner />;

  if (isUserAuth === -1) router.push("/login");

  if (isUserAuth === 1) return <div>{children}</div>;
};

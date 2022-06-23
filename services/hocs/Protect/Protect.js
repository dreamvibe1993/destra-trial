import { Flex, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { useAppContext } from "../../../utils/contexts/app-context";

export const Protect = ({ children }) => {
  const router = useRouter();
  const { isUserAuth } = useAppContext();

  if (isUserAuth === 0)
    return (
      <Flex h={'calc(100vh - 100px)'} w="100%" align={"center"} justify="center">
        <Spinner />
      </Flex>
    );

  if (isUserAuth === -1) router.push("/login");

  if (isUserAuth === 1) return <div>{children}</div>;
};

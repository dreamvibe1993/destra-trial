import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";

export const ErrorAlert = ({ errorMessage }) => (
  <Alert status="error">
    <Flex direction={["row", "row"]} align={"flex=start"}>
      <Flex direction={"column"} h="100%" justify={"flex-start"}>
        <AlertIcon />
      </Flex>
      <Flex justify={"space-between"} w="100%" direction={"column"}>
        <AlertTitle flex={1} textAlign="center">
          Oops.
        </AlertTitle>
        <AlertDescription>{errorMessage}</AlertDescription>
      </Flex>
    </Flex>
  </Alert>
);

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
    <AlertIcon />
    <Flex direction={["column", "row"]} align={"center"}>
      <AlertTitle>Oops.</AlertTitle>
      <AlertDescription>{errorMessage}</AlertDescription>
    </Flex>
  </Alert>
);

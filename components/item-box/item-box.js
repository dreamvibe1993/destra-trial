import React from "react";
import { Box, Text } from "@chakra-ui/react";

export const ItemBox = (item) => {
  return (
    <Box p={3} border={"1px"} w={"250px"}>
      <Text color="blue.700" mb={3}>
        {item.name}
      </Text>
      <Text>{item.category}</Text>
    </Box>
  );
};

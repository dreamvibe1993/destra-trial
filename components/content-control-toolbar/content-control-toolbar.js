import { Flex, Select, Spinner, Text } from "@chakra-ui/react";
import React from "react";

export const ContentControlToolbar = ({
  total = 10,
  itemsLimit = 10,
  changePagesLimit = () => {},
  itemsQuantityOptions = [
    { value: "10", text: "10 записей" },
    { value: "8", text: "8 записей" },
    { value: "5", text: "5 записей" },
  ],
}) => {
  return (
    <Flex
      align={"center"}
      direction={["column", "row"]}
      w="100%"
      justify="space-between"
      mb={5}
    >
      {total?.count ? (
        <Text noOfLines={1}>Найдено: {total?.count}</Text>
      ) : (
        <Spinner size={"xs"} />
      )}

      <Flex
        align={"center"}
        mb={[2, 0]}
        w={["100%", "auto"]}
        justify="space-between"
      >
        <Text noOfLines={1} mr={2}>
          Показывать на странице по
        </Text>
        <Select
          placeholder="Select option"
          w={["90%", "auto"]}
          defaultValue={itemsLimit}
          onChange={changePagesLimit}
        >
          {itemsQuantityOptions.map((option) => {
            return (
              <option value={option.value} key={option.text}>
                {option.text}
              </option>
            );
          })}
        </Select>
      </Flex>
      <Flex align={"center"} w={["100%", "auto"]} justify="space-between">
        <Text mr={2}>Сортировать</Text>
        <Select placeholder="Select option" w={["50%", "auto"]}>
          <option value="option1">Сначала новые</option>
          <option value="option2">Сначала старые</option>
        </Select>
      </Flex>
    </Flex>
  );
};

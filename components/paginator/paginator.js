import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import {
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";

import { fontResizer } from "../../utils/css/fontResizer";

export const Paginator = ({
  currentPagesArr = [1],
  presentPage = 1,
  getFirstPage = () => {},
  getLastPage = () => {},
  getPrevTenPages = () => {},
  getNextTenPages = () => {},
  getPreviousPage = () => {},
  getNextPage = () => {},
  getPage = () => {},
}) => {
  return (
    <Flex
      overflowX="auto"
      direction={["column", "row"]}
      w="100%"
      justify="space-between"
    >
      <Flex columnGap={1} rowGap={1}>
        <Button onClick={getFirstPage} flex={1}>
          Первая
        </Button>
        <Button onClick={getPrevTenPages}>
          <BiChevronsLeft />
        </Button>
        <Button onClick={getPreviousPage}>
          <BiChevronLeft />
        </Button>
      </Flex>

      <Flex
        overflowX="auto"
        my={[5, 0]}
        mx={["auto", 1]}
        justify={["center", null]}
        w="100%"
        columnGap={1}
        rowGap={1}
      >
        {currentPagesArr.map((i) => {
          return (
            <Button
              key={Date.now().toString() + i}
              isActive={presentPage === i}
              onClick={() => getPage(i)}
            >
              <Text fontSize={`${fontResizer(i)}%`}>{i}</Text>
            </Button>
          );
        })}
      </Flex>
      <Flex columnGap={1} rowGap={1} direction={["row-reverse", "row"]}>
        <Flex direction={["row-reverse", "row"]} columnGap={1} rowGap={1}>
          <Button onClick={getNextPage}>
            <BiChevronRight />
          </Button>
          <Button onClick={getNextTenPages}>
            <BiChevronsRight />
          </Button>
        </Flex>
        <Button onClick={getLastPage} flex={1}>
          Последняя
        </Button>
      </Flex>
    </Flex>
  );
};

import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Select,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";

import { Protect } from "../services/hocs/Protect/Protect";
import { useLoadContent } from "../services/hooks/useLoadContent/useLoadContent";
import { ErrorAlert } from "../components/error-alert/error-alert";
import { usePagination } from "../services/hooks/usePagination/usePagination";
import { isMobile } from "../utils/common/detect-device";

export default function HomeProtected() {
  return (
    <Protect>
      <Home />
    </Protect>
  );
}

function Home() {
  const [buttonsLimit, setButtonsLimit] = React.useState(10);
  const [itemsLimit, setItemsLimit] = React.useState(8);
  const {
    presentPage,
    currentBatch,
    getFirstPage,
    getLastPage,
    getNextPage,
    getPreviousPage,
    getNextTenPages,
    getPrevTenPages,
    getPage,
    total,
  } = usePagination({ buttonsLimit, itemsLimit });

  const {
    data: content,
    isLoading,
    isError,
  } = useLoadContent({
    page: presentPage,
    limit: itemsLimit,
  });

  const changePagesLimit = (e) => {
    e.preventDefault();
    setItemsLimit(Number(e.target.value));
  };

  React.useEffect(() => {
    if (isMobile()) setButtonsLimit(5);
  }, []);

  if (isLoading)
    return (
      <Flex h="100vh" justify={"center"} align="center">
        <Spinner />
      </Flex>
    );

  if (isError)
    return (
      <Flex h="100vh" justify={"center"} align="center">
        <Box maxW="500px">
          <ErrorAlert errorMessage={"Error processing your request."} />
        </Box>
      </Flex>
    );

  return (
    <Box p={10}>
      <Heading mb={5}>Контент</Heading>
      <Box maxH={"350px"} overflowY="auto" p={3} border="1px">
        <Flex wrap="wrap" rowGap={3} columnGap={3}>
          {content &&
            content.map((item, i) => {
              return (
                <Box key={item._id} p={3} border={"1px"} w={"250px"}>
                  <Text color="blue.700" mb={3}>
                    {item.name} -- {i}
                  </Text>
                  <Text>{item.category}</Text>
                </Box>
              );
            })}
        </Flex>
      </Box>
      <form>
        <VStack my={5}>
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

            <Flex align={"center"} mb={[2, 0]} w={["100%", "auto"]} justify="space-between">
              <Text noOfLines={1} mr={2}>
                Показывать на странице по
              </Text>
              <Select
                placeholder="Select option"
                w={["90%", "auto"]}
                defaultValue={itemsLimit}
                onChange={changePagesLimit}
              >
                <option value="10">10 записей</option>
                <option value="8">8 записей</option>
                <option value="5">5 записей</option>
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
              {currentBatch.map((i) => {
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
        </VStack>
      </form>
    </Box>
  );
}

const fontResizer = (i) => {
  if (typeof i !== "number") return 100;
  const size = 100 / (i.toString().length / 4);
  if (size > 100) return 100;
  return size;
};

/* <Button onClick={logMeOut}>LOGOUT</Button> */

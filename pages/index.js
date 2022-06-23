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
import { useRouter } from "next/router";
import React from "react";
import { logout } from "../services/api/auth/logout";
import { Protect } from "../services/hocs/Protect/Protect";
import { useLoadContent } from "../services/hooks/useLoadContent/useLoadContent";
import {
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import { ErrorAlert } from "../components/error-alert/error-alert";
import { usePagination } from "../services/hooks/usePagination/usePagination";

export default function HomeProtected() {
  return (
    <Protect>
      <Home />
    </Protect>
  );
}

function Home() {
  const router = useRouter();
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [buttons, setButtons] = React.useState([]);

  const {
    presentPage,
    currentTen,
    getFirstPage,
    getLastPage,
    getNextPage,
    getPreviousPage,
    getNextTenPages,
    getPrevTenPages,
    getPage,
    total,
  } = usePagination({ limit });

  const {
    data: content,
    isLoading,
    isError,
  } = useLoadContent({
    page: page,
    limit: limit,
  });

  const logMeOut = () => {
    logout();
    router.reload();
  };

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
            content.map((item) => {
              return (
                <Box key={item._id} p={3} border={"1px"} w={"250px"}>
                  <Text color="blue.700" mb={3}>
                    {item.name}
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

            <Flex align={"center"}>
              <Text noOfLines={1} mr={2}>
                Показывать на странице по
              </Text>
              <Select
                placeholder="Select option"
                w={["100%", "auto"]}
                defaultValue={limit}
              >
                <option value="10">10 записей</option>
                <option value="20">20 записей</option>
                <option value="30">30 записей</option>
              </Select>
            </Flex>
            <Flex align={"center"}>
              <Text mr={2}>Сортировать</Text>
              <Select placeholder="Select option" w={["100%", "auto"]}>
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
            <Flex direction={["column", "row"]} columnGap={1} rowGap={1}>
              <Button onClick={getFirstPage}>Первая</Button>
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
              mx={[0, 5]}
              columnGap={1}
              rowGap={1}
            >
              {currentTen.map((i) => {
                return (
                  <Button
                    key={Date.now().toString() + i}
                    isActive={presentPage === i}
                    onClick={() => getPage(i)}
                  >
                    {i}
                  </Button>
                );
              })}
            </Flex>
            <Flex direction={["column", "row"]} columnGap={1} rowGap={1}>
              <Button onClick={getNextPage}>
                <BiChevronRight />
              </Button>
              <Button onClick={getNextTenPages}>
                <BiChevronsRight />
              </Button>
              <Button onClick={getLastPage}>Последняя</Button>
            </Flex>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
}

/* <Button onClick={logMeOut}>LOGOUT</Button> */

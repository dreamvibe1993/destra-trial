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

import { Protect } from "../services/hocs/Protect/Protect";
import { useLoadContent } from "../services/hooks/useLoadContent/useLoadContent";
import { ErrorAlert } from "../components/error-alert/error-alert";
import { usePagination } from "../services/hooks/usePagination/usePagination";
import { isMobile } from "../utils/common/detect-device";
import { useLoadTotal } from "../services/hooks/useLoadTotal/useLoadTotal";
import { ContentControlToolbar } from "../components/content-control-toolbar/content-control-toolbar";
import { Paginator } from "../components/paginator/paginator";
import { ItemBox } from "../components/item-box/item-box";

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

  const { data: totalCount } = useLoadTotal();

  const pagination = usePagination({ buttonsLimit, itemsLimit });

  const {
    data: content,
    isLoading,
    isError,
  } = useLoadContent({
    page: pagination.presentPage,
    limit: itemsLimit,
  });

  const changePagesLimit = (e) => {
    e.preventDefault();
    setItemsLimit(Number(e.target.value));
  };

  React.useEffect(() => {
    if (isMobile()) setButtonsLimit(5);
  }, []);

  React.useEffect(() => {
    if (totalCount) pagination.setTotal(totalCount.count);
  }, [pagination, totalCount]);

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
      <Box h={"350px"} overflowY="auto" p={3} border="1px">
        <Flex wrap="wrap" rowGap={3} columnGap={3}>
          {content &&
            content.map((item) => {
              return <ItemBox key={item._id} {...item} />;
            })}
        </Flex>
      </Box>
      <VStack my={5}>
        <ContentControlToolbar
          total={totalCount}
          itemsLimit={itemsLimit}
          changePagesLimit={changePagesLimit}
        />
        <Paginator {...pagination} />
      </VStack>
    </Box>
  );
}

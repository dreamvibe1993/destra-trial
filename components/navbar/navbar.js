import React from "react";
import { Avatar, Button, Flex, Link, Text } from "@chakra-ui/react";
import { useAppContext } from "../../utils/contexts/app-context";
import { logout } from "../../services/api/auth/logout";

export const Navbar = () => {
  const { isUserAuth, setUserAuth } = useAppContext();

  const logMeOut = () => {
    logout();
    setUserAuth(-1);
  };

  return (
    <Flex
      position={"sticky"}
      minH="70px"
      w="100vw"
      top={0}
      p={5}
      shadow="lg"
      bgColor={"white"}
      align="center"
      justify={"space-between"}
    >
      {isUserAuth === 1 && (
        <>
          <Button onClick={logMeOut}>
            <span>Log out</span>
          </Button>
          <Flex align={"center"}>
            <Text display={["none", "inline"]} mr={5}>
              authorized@email.com
            </Text>
            <Link href="/login">
              <Avatar src="https://bit.ly/broken-link" />
            </Link>
          </Flex>
        </>
      )}
      {isUserAuth === 0 && (
        <Button isLoading={true}>
          <span>Sign in</span>
        </Button>
      )}
      {isUserAuth === -1 && (
        <Link href="/login">
          <Button>
            <span>Sign in</span>
          </Button>
        </Link>
      )}
    </Flex>
  );
};

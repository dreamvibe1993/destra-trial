import React from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Spinner,
  Stack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";

import { loginSchema } from "../models/yup/yup-login-schema";
import { login } from "../services/api/auth/login";
import { ErrorAlert } from "../components/error-alert/error-alert";
import { useAppContext } from "../utils/contexts/app-context";

export default function LoginPage() {
  const router = useRouter();
  const { isUserAuth, setUserAuth } = useAppContext();

  const [errorMessage, setErrorMessage] = React.useState(null);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      setUserAuth(0);
      login(values)
        .then(() => {
          setUserAuth(1);
        })
        .catch((e) => {
          console.error(e.message);
          setUserAuth(-1);
          if (e.status === 401) {
            setErrorMessage(
              `Sorry, but seems the credentials you typed were invalid.`
            );
          } else {
            setErrorMessage(`Error processing your request`);
          }
        });
    },
  });

  if (isUserAuth === 0)
    return (
      <Flex minH={"calc(100vh - 90px)"} align={"center"} justify={"center"}>
        <Spinner />
      </Flex>
    );

  if (isUserAuth === 1)
    return (
      <Flex minH={"calc(100vh - 90px)"} align={"center"} justify={"center"}>
        <Box p={8}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Heading fontSize={"4xl"}>Hello there! 👏</Heading>
          </Stack>
          <Stack spacing={4}>
            <Button onClick={() => router.push("/")}>To content!</Button>
          </Stack>
        </Box>
      </Flex>
    );

  return (
    <Flex minH={"calc(100vh - 90px)"} align={"center"} justify={"center"}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account 👮</Heading>
        </Stack>
        <form onSubmit={formik.handleSubmit}>
          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <Stack spacing={4}>
              <FormControl
                id="email"
                isInvalid={!!formik.errors.email && formik.touched.email}
              >
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  id="email"
                />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>
              <FormControl
                id="password"
                isInvalid={!!formik.errors.password && formik.touched.password}
              >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  id="password"
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>
              {errorMessage && <ErrorAlert errorMessage={errorMessage} />}
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              ></Stack>
              <Button type="submit">Sign in</Button>
            </Stack>
          </Box>
        </form>
      </Stack>
    </Flex>
  );
}

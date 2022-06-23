import { Button, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { login } from "../services/api/auth/login";
import { useAuth } from "../services/hooks/useAuth/useAuth";

export default function LoginPage() {
  const router = useRouter();
  const { isUserAuth } = useAuth();

  const logMeIn = () => {
    login({ email: "", password: "" }).then(() => {
      router.push("/");
    });
  };

  if (isUserAuth === 0) return <Spinner />;

  if (isUserAuth === 1) return <div>user authenticated!</div>;

  return (
    <div>
      <Button onClick={logMeIn}>LOGIN</Button>
    </div>
  );
}

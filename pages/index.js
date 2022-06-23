import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { logout } from "../services/api/auth/logout";
import { Protect } from "../services/hocs/Protect/Protect";
import { useLoadContent } from "../services/hooks/useLoadContent/useLoadContent";
import styles from "../styles/Home.module.css";

export default function HomeProtected() {
  return (
    <Protect>
      <Home />
    </Protect>
  );
}

function Home() {
  const router = useRouter();
  const { data: content } = useLoadContent({ page: 1, limit: 10 });

  const logMeOut = () => {
    logout();
    router.reload();
  };

  return (
    <div className={styles.container}>
      {content && content.map((item) => item.name)}{" "}
      <Button onClick={logMeOut}>LOGOUT</Button>
    </div>
  );
}

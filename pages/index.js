import React from "react";
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
  const { data: content } = useLoadContent({ page: 1, limit: 10 });
  return (
    <div className={styles.container}>
      {content && content.map((item) => item.name)}{" "}
    </div>
  );
}

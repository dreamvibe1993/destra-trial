import React from "react";
import { refresh } from "../../api/auth/refresh";
import { serviceWorkerDispatch } from "../../serviceWorker/swDispatch";

export const useAuth = () => {
  const [isUserAuth, setUserAuth] = React.useState(0);

  const refreshTokens = () =>
    serviceWorkerDispatch(() => {
      setUserAuth(0);
      refresh()
        .then(() => {
          setUserAuth(1);
        })
        .catch((e) => {
          console.error(e);
          setUserAuth(-1);
        });
    });

  React.useEffect(() => {
    refreshTokens();
  }, []);

  return {
    isUserAuth,
    setUserAuth,
  };
};

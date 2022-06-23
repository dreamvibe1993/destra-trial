import React from "react";
import { serviceWorkerDispatch } from "../../serviceWorker/swDispatch";

export const useAuth = () => {
  const [isUserAuth, setUserAuth] = React.useState(0);

  React.useEffect(() => {
    serviceWorkerDispatch(() => {
      setUserAuth(0);
      // eslint-disable-next-line no-undef
      fetch(`${process.env.NEXT_PUBLIC_API_ADDRESS}/content/total`).then(
        (res) => {
          if (!res.ok || res.status === 401) return setUserAuth(-1);
          else setUserAuth(1);
        }
      );
    });
  }, []);

  return {
    isUserAuth,
    setUserAuth
  };
};

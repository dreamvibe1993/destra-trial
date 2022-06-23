import React from "react";
import { useAppContext } from "../../../utils/contexts/app-context";
import { refresh } from "../../api/auth/refresh";
import { serviceWorkerDispatch } from "../../serviceWorker/swDispatch";

export const useLoadContent = ({ page, limit }) => {
  const [data, setData] = React.useState();
  const [isError, setError] = React.useState(null);
  //   const { refreshTokens } = useAppContext();

  React.useEffect(() => {
    if (!page || !limit) {
      const errMessage = "No page or no limit in useLoadContent.js!";
      console.error(errMessage);
      setError(true);
      return;
    }
    const fetchContent = fetch(
      // eslint-disable-next-line no-undef
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/content?page=${page}&limit=${limit}`
    );
    fetchContent
      .then(async (res) => {
        if (!res.ok) {
          await refresh();
          res = fetchContent.then((res) => res);
        }
        return res.json();
      })
      .then((res) => {
        setData(res.result);
      })
      .catch((e) => {
        console.error("ERROR: ", e);
        setError(true);
      });
  }, [page, limit]);

  return { data: data, isLoading: !data && !isError, isError: isError };
};

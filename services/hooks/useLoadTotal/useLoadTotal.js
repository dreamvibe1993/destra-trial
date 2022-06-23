import React from "react";
import { useAppContext } from "../../../utils/contexts/app-context";
import { refresh } from "../../api/auth/refresh";

export const useLoadTotal = () => {
  const [data, setData] = React.useState();
  const [isError, setError] = React.useState(null);
  //   const { refreshTokens } = useAppContext();

  React.useEffect(() => {
    const fetchContent = fetch(
      // eslint-disable-next-line no-undef
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/content/total`
    );
    fetchContent
      .then(async (res) => {
        if (!res.ok) {
          await refresh().then(res => res);
          res = fetchContent;
        }
        return res.json();
      })
      .then((res) => {
        setData(res.result);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, []);

  return { data: data, isLoading: !data && !isError, isError: isError };
};

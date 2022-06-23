import React from "react";
import { useAppContext } from "../../../utils/contexts/app-context";

export const useLoadTotal = () => {
  const [data, setData] = React.useState();
  const [isError, setError] = React.useState(null);
  const { setUserAuth } = useAppContext();

  React.useEffect(() => {
    const fetchContent = fetch(
      // eslint-disable-next-line no-undef
      `${process.env.NEXT_PUBLIC_API_ADDRESS}/content/total`
    );
    fetchContent
      .then(async (res) => {
        if (!res.ok) {
          setUserAuth(-1);
          return;
        }
        return res.json();
      })
      .then((res) => {
        setData(res?.result);
      })
      .catch((e) => {
        console.error(e);
        setError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data: data, isLoading: !data && !isError, isError: isError };
};

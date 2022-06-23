import React from "react";
import { useAppContext } from "../../../utils/contexts/app-context";

export const useLoadContent = ({ page, limit }) => {
  const [data, setData] = React.useState();
  const [isError, setError] = React.useState(null);
  const { setUserAuth } = useAppContext();
  const timeoutId = React.useRef();

  React.useEffect(() => {
    if (!page || !limit) {
      const errMessage = "No page or no limit in useLoadContent.js!";
      console.error(errMessage);
      setError(true);
      return;
    }
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      const fetchContent = fetch(
        // eslint-disable-next-line no-undef
        `${process.env.NEXT_PUBLIC_API_ADDRESS}/content?page=${page}&limit=${limit}`
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
          console.error("ERROR: ", e);
          setError(true);
        });
    }, 150);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit]);

  return { data: data, isLoading: !data && !isError, isError: isError };
};

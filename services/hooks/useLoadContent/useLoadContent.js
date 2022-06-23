import React from "react";

export const useLoadContent = ({ page, limit }) => {
  const [data, setData] = React.useState();
  const [isError, setError] = React.useState(null);
  React.useEffect(() => {
    fetch(
      !page || !limit
        ? // eslint-disable-next-line no-undef
          `${process.env.NEXT_PUBLIC_API_ADDRESS}/content/total`
        : // eslint-disable-next-line no-undef
          `${process.env.NEXT_PUBLIC_API_ADDRESS}/content?page=${page}&limit=${limit}`
    )
      .then((res) => res.json())
      .then((res) => setData(res.result))
      .catch((e) => {
        console.error(e);
        setError(true);
      });
  }, []);

  return { data: data, isLoading: !data && !isError, isError: isError };
};

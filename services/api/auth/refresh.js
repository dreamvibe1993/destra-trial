import { serviceWorkerDispatch } from "../../serviceWorker/swDispatch";

export const refresh = () => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject) => {
    serviceWorkerDispatch((worker) => {
      // eslint-disable-next-line no-undef
      fetch(`${process.env.NEXT_PUBLIC_API_ADDRESS}/refresh`, {
        method: "POST",
      })
        .then((res) => {
          if (!res.ok) {
            reject({
              message: `ERROR WHILE REFRESHING TOKENS. STATUS: ${res.status}`,
              status: res.status,
            });
            return;
          }
          return res.json();
        })
        .then((res) => {
          worker.active.postMessage({
            type: "REFRESH_TOKENS",
            tokens: {
              ...res?.result,
            },
          });
          resolve(res);
        });
    });
  });
};

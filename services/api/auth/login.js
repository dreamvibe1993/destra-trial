import { serviceWorkerDispatch } from "../../serviceWorker/swDispatch";

export const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    serviceWorkerDispatch((worker) => {
      // eslint-disable-next-line no-undef
      fetch(`${process.env.NEXT_PUBLIC_API_ADDRESS}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => {
          if (!res.ok) {
            reject({
              message: `ERROR WHILE LOGGING IN. STATUS: ${res.status}`,
              status: res.status,
            });
            return;
          }
          return res.json();
        })
        .then((res) => {
          worker.active.postMessage({
            type: "SET_TOKENS",
            tokens: {
              access_token: res?.result?.access_token,
              refresh_token: res?.result?.refresh_token,
            },
          });
          resolve(res);
        });
    });
  });
};

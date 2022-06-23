export const login = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    navigator.serviceWorker.ready.then((worker) => {
      // eslint-disable-next-line no-undef
      fetch(`${process.env.NEXT_PUBLIC_API_ADDRESS}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          // eslint-disable-next-line no-undef
          email: process.env.NEXT_PUBLIC_TEST_EMAIL,
          // eslint-disable-next-line no-undef
          password: process.env.NEXT_PUBLIC_TEST_PASSWORD,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          worker.active.postMessage({
            type: "SET_TOKENS",
            tokens: {
              access_token: res.result.access_token,
              refresh_token: res.result.refresh_token,
            },
          });
          resolve(res);
        })
        .catch((e) => {
          console.error(e);
          reject(e);
        });
    });
  });
};

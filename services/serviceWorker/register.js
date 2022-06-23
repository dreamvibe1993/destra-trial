export const registerServiceWorker = () => {
  return new Promise((res, rej) => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then(
        function (registration) {
          console.log(
            "Service Worker registration successful with scope: ",
            registration.scope
          );
          navigator.serviceWorker.onmessage = function (e) {
            // messages from service worker.
            console.log("e.data", e.data);
          };
          res();
        },
        function (err) {
          rej(err);
          console.log("Service Worker registration failed: ", err);
        }
      );
    }
  });
};

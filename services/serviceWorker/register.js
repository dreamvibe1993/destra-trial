export const registerServiceWorker = () => {
  window.addEventListener("load", () => {
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
        },
        function (err) {
          console.log("Service Worker registration failed: ", err);
        }
      );
    }
  });
};

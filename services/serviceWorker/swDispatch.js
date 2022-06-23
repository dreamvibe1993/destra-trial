export const serviceWorkerDispatch = (fn) => {
  navigator.serviceWorker.ready.then((worker) => {
    fn(worker);
  });
};

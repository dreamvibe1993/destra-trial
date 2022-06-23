import { serviceWorkerDispatch } from "../../serviceWorker/swDispatch";

export const logout = () => {
  serviceWorkerDispatch((worker) => {
    worker.active.postMessage({
      type: "CLEAR_TOKENS",
    });
  });
};

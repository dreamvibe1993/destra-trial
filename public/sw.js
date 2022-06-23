self.addEventListener("install", function (event) {
  event.waitUntil(self.skipWaiting());
  console.log("[SW] serviceworker installed!");
});

self.addEventListener("activate", function (event) {
  event.waitUntil(self.clients.claim());
  console.log("[SW] serviceworker ready!");
});

// Global token variable in the service worker
let tokens = {
  access_token: null,
  refresh_token: null,
};

// Exposed "method" for saving the token
self.addEventListener("message", function (event) {
  if (event.data && event.data.type === "SET_TOKENS") {
    tokens = event.data.tokens;
    console.log("[SW] tokens set!");
  }
  if (event.data && event.data.type == "CLEAR_TOKENS") {
    tokens = { access_token: null, refresh_token: null };
    console.log("[SW] tokens cleared!");
  }
});

// Helper function to add the auth header if the oubound request matches the whitelists
const addAuthHeader = function (event) {
  // Headers from orig request
  const modifiedHeaders = new Headers(event.request.headers);
  if (tokens) {
    // Setting tokens headers
    modifiedHeaders.append("x-refresh-token", tokens.refresh_token);
    modifiedHeaders.append("x-access-token", tokens.access_token);
  }
  // Multiplying req headers old with new
  const authReq = new Request(event.request, {
    headers: modifiedHeaders,
  });
  // Proceeding to request
  event.respondWith((async () => fetch(authReq))());
};

// Intercept all fetch requests and add the auth header
self.addEventListener("fetch", addAuthHeader);

const BACKEND_URL = "etudedeployrailway-production.up.railway.app";

function chainPromise(promise) {
  return promise
    .catch((err) => Promise.reject({ error: "network-error" }))
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    });
}

// Session
export function fetchTest() {
  const fetched = fetch(`${BACKEND_URL}/test`);
  return chainPromise(fetched);
}

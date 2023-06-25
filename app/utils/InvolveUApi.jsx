import config from "../config.json";

/**
 * Fetches InvolveU API to get all user data.
 * 
 * @returns {Promise} response from server
 */
export function GetUsers() {
  return new Promise((resolve, reject) => {
    fetch(`${config.server}/api/users/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

/**
 * Fetches InvolveU API to get all event data.
 * 
 * @returns {Promise} response from server
 */
export function GetEvents() {
  return new Promise((resolve, reject) => {
    fetch(`${config.server}/api/events/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

/**
 * Fetches InvolveU API to get all item data.
 * 
 * @returns {Promise} response from server
 */
export function GetItems() {
  return new Promise((resolve, reject) => {
    fetch(`${config.server}/api/items/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

/**
 * Posts refresh token to server to fetch a new access token. Refresh tokens are temporary and used
 * for the user to stay signed in.
 * 
 * @param {JSON} ref refresh token to be posted to server
 * 
 * @returns {Promise} response from server
 */
export function GetRefreshToken(ref) {
  return new Promise((resolve, reject) => {
    fetch(`${config.server}/api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: ref,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        resolve(json);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

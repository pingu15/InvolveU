import config from "../config.json";

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
      });
  });
}

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
      });
  });
}

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
      });
  });
}

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
      });
  });
}

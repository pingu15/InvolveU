import config from "../config.json";

export function GetUsers() {
  return new Promise((resolve, reject) => {
    fetch(`${config.server}/api/users/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
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
        console.log(json);
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
        console.log(json);
        resolve(json);
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

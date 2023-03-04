import config from "../config.json";

export function GetUsers() {
  return new Promise((resolve, reject) => {
    fetch(`${config.server}/api/users/`, {
      method: "GET",
    })
      .then((response) => {
        resolve(response.json());
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
      .then((response) => {
        resolve(response.json());
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
      .then((response) => {
        resolve(response.json());
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

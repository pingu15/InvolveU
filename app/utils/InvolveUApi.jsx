import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config.json";

export function GetUsers() {
  return fetch(`${config.server}/api/users/`, { method: "GET" })
    .then((response) => response.json())
    .then((json) => {
      return json;
    })
    .catch((error) => {
        console.log(error);
    });
}

import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config.json";

export function GetUsers() {
  fetch(`${config.server}/api/users/`, { method: "GET" })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      return json;
    })
    .catch((error) => {
        console.log(error);
    });
}

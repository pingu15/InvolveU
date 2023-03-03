import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config.json";

export async function GetUsers() {
  try {
    const response = await fetch(`${config.server}/api/users/`, { method: "GET" });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function GetEvents() {
  try {
    const response = await fetch(`${config.server}/api/events/`, { method: "GET" });
    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error);
  }
}

export async function GetItems() {
  try {
    const response = await fetch(`${config.server}/api/items/`, { method: "GET" });
    const json = await response.json();
    console.log("PEEPEEPOOPOO");
    return json;
  } catch(error) {
    console.log(error);
  }
}
import React from "react";
import { StatusBar } from "expo-status-bar";
import { StatusBar as RNStatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./utils/Navigator";

import { Provider } from "react-redux";
import store from "./utils/ReduxStore";
import loadResources from "./utils/loadResources";

function App() {
  const load = loadResources();
  RNStatusBar.setBarStyle("dark-content"); // Sets the status bar text color to white
  return !load ? null : (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

function AppProvider() {
  return (
    <Provider store={store}>
      <App></App>
    </Provider>
  );
}

export default AppProvider;

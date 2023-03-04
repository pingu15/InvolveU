import React from "react";
import { StatusBar } from "expo-status-bar";
import { StatusBar as RNStatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigator from "./utils/Navigator";

import { Provider } from "react-redux";
import store from "./utils/ReduxStore";
import loadResources from "./utils/loadResources";

/**
 * Root component of the app.
 * 
 * Models and users data is loaded from the database and stored in the Redux store.
 * 
 * @returns {JSX.Element} The app
 */
function App() {
  const load = loadResources();
  RNStatusBar.setBarStyle("dark-content"); // Sets the status bar text color to white
  return !load ? null : (
    <NavigationContainer>
      <Navigator />
    </NavigationContainer>
  );
}

/**
 * The app is wrapped in a Redux Provider so that the Redux store can be accessed by any component.
 * 
 * @returns {JSX.Element} The app wrapped in a Redux Provider
 */
function AppProvider() {
  return (
    <Provider store={store}>
      <App></App>
    </Provider>
  );
}

export default AppProvider;

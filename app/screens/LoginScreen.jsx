import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config.json";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import {
  setUsername as setReduxUsername,
  setUserData,
} from "../utils/ReduxStore";
import { GetRefreshToken } from "../utils/InvolveUApi";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginText, updateLoginText] = useState("");
  let loggingIn = false;
  let users = useSelector((state) => state.usersData);
  React.useEffect(() => {
    AsyncStorage.getItem("@username").then((username) => {
      if (username == null) return;
      AsyncStorage.getItem("@refreshtoken").then((refreshtoken) => {
        if (refreshtoken == null) return;
        console.log(refreshtoken);
        GetRefreshToken(refreshtoken).then((val) => {
          if (val.detail) {
            AsyncStorage.clear();
          } else {
            AsyncStorage.setItem("@refreshtoken", val.refresh);
            AsyncStorage.setItem("@accesstoken", val.access);
            dispatch(setReduxUsername(username));
            AsyncStorage.getItem("@user").then((u) => {
              let user = JSON.parse(u);
              dispatch(setUserData(user));
            });
            updateLoginText("Loading App...");
            loggingIn = false;
            updateLoginText("");
            navigation.navigate("TabNav");
          }
        });
      });
    });
  }, []);

  const handleLogin = () => {
    if (loggingIn) return;
    updateLoginText("Logging in...");
    loggingIn = true;
    login()
      .then((val) => {
        if (val == "Success!") {
          AsyncStorage.setItem("@username", username);
          dispatch(setReduxUsername(username));
          users.forEach((user) => {
            if (user.username == username) {
              AsyncStorage.setItem("@user", JSON.stringify(user));
              dispatch(setUserData(user));
            }
          });
          updateLoginText(val + " Loading App...");
          loggingIn = false;
          updateLoginText("");
          navigation.navigate("TabNav");
        } else {
          updateLoginText(val);
          loggingIn = false;
        }
      })
      .catch((err) => console.log(err));
  };

  function login() {
    return new Promise((resolve, reject) => {
      fetch(`${config.server}/api/token/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.access && json.refresh) {
            console.log(typeof json.access);
            console.log(typeof json.refresh);
            AsyncStorage.setItem("@accesstoken", json.access)
              .then(() => {
                AsyncStorage.setItem("@refreshtoken", json.refresh)
                  .then(() => {
                    resolve("Success!");
                  })
                  .catch((err) => {
                    console.log(err);
                    resolve("Error occurred. Was storage permission denied?");
                  });
              })
              .catch((err) => {
                console.log(err);
                resolve("Error occurred. Was storage permission denied?");
              });
          } else if (json.detail) {
            resolve("Username or password incorrect.");
          } else {
            resolve("Something went wrong. Please try again.");
          }
        })
        .catch((err) => {
          console.log(err);
          resolve("Network error. Please try again later.");
        });
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.titlecontainer}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            marginBottom: 10,
          }}
        >
          Welcome Back!
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#a6a6a6",
          }}
        >
          Log back in
        </Text>
      </View>

      <View style={styles.inputcontainer}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "#000",
            marginBottom: "2%",
          }}
        >
          Username
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Type your username"
          onChangeText={setUsername}
        />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "#000",
            marginBottom: "2%",
          }}
        >
          Password
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Type your password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
      </View>
      <Text style={styles.loginText}>{loginText}</Text>
      <View style={styles.bottomcontainer}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View
          style={{ flexDirection: "row", alignSelf: "center", margin: "10%" }}
        >
          <Text style={{ textAlign: "center" }}>New user? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Signup");
            }}
          >
            <Text style={{ color: "#2280ff", fontWeight: "bold" }}>
              Sign up here
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titlecontainer: {
    height: "10%",
    width: "90%",
    marginHorizontal: "5%",
    marginTop: "20%",
  },
  inputcontainer: {
    height: "40%",
    width: "90%",
    marginHorizontal: "5%",
    marginTop: "5%",
  },
  bottomcontainer: {
    height: "20%",
    width: "90%",
    marginHorizontal: "5%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: "4%",
    marginBottom: "5%",
    width: "99%",
  },
  button: {
    backgroundColor: "#2280ff",
    padding: "4%",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  loginText: {
    padding: 8,
    alignSelf: "center",
  },
});

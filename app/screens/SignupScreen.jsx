import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config.json";
import { GetUsers } from "../utils/InvolveUApi";
import SelectDropdown from "react-native-select-dropdown";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Linking,
} from "react-native";

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [grade, setGrade] = useState(9);
  const [signupText, updateSignupText] = useState("");
  let signingUp = false;

  const grades = [9, 10, 11, 12];

  const handleSignup = () => {
    if (signingUp) return;
    updateSignupText("Signing Up...");
    signingUp = true;
    signup()
      .then((val) => {
        if (val == "Success!") {
          AsyncStorage.setItem("@username", username);
          updateSignupText(val + " Loading App...");
          signingUp = false;
          updateSignupText("");
          GetUsers().then((users) => {
            AsyncStorage.setItem("@users", JSON.stringify(users));
            console.log("list of users:" + JSON.stringify(users));
            users.forEach((user) => {
              if (user.username == username) {
                console.log("user found in list: " + JSON.stringify(user));
                AsyncStorage.setItem("@user", JSON.stringify(user)).then(() => {
                  navigation.navigate("TabNav");
                });
              }
            });
          });
        } else {
          updateSignupText(val);
          signingUp = false;
        }
      })
      .catch((err) => console.log(err));
  };

  function signup() {
    return new Promise((resolve, reject) => {
      fetch(`${config.server}/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": res.csrftoken,
        },
        body: JSON.stringify({
          username: username,
          password: password,
          password2: password2,
          grade: grade,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success) {
            console.log("signed up");
            resolve(login());
          } else {
            resolve(json.message);
          }
        })
        .catch((err) => {
          console.log(err);
          resolve("Network error. Please try again later.");
        });
    });
  }

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
          Join Us!
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: "#a6a6a6",
          }}
        >
          Create an InvolveU account
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
          fontSize="14"
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
          fontSize="14"
          value={password}
          onChangeText={setPassword}
        />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "#000",
            marginBottom: "2%",
          }}
        >
          Re-enter Password
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Re-type your password"
          secureTextEntry
          fontSize="14"
          value={password2}
          onChangeText={setPassword2}
        />
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            color: "#000",
            marginBottom: "2%",
          }}
        >
          Select Grade
        </Text>
        <SelectDropdown
          data={grades}
          onSelect={(selectedItem, index) => setGrade(selectedItem)}
          defaultButtonText={"Select grade"}
          buttonStyle={styles.select}
          buttonTextStyle={styles.selectText}
          dropdownStyle={styles.dropdown}
        ></SelectDropdown>
      </View>
      <Text style={styles.loginText}>{signupText}</Text>
      <View style={styles.bottomcontainer}>
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View
          style={{ flexDirection: "row", alignSelf: "center", margin: "10%" }}
        >
          <Text style={{ textAlign: "center" }}>Returning user? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={{ color: "#2280ff", fontWeight: "bold" }}>
              Login Here
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
  select: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: "4%",
    marginBottom: "5%",
    width: "99%",
    backgroundColor: "white",
  },
  selectText: {
    color: "black",
    fontSize: 14,
    textAlign: "left",
  },
  dropdown: {
    borderRadius: 10,
  },
});
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config.json";
import { GetUsers } from "../utils/InvolveUApi";
import SelectDropdown from "react-native-select-dropdown";
import validator from "validator";
import { useDispatch } from "react-redux";
import {
  setUsername as setReduxUsername,
  setUsersData,
  setUserData,
  setEventsData,
} from "../utils/ReduxStore";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";

/**
 * The signup screen allows the user to create a new account.
 * 
 * @param {Object} navigation the navigation object
 * 
 * @returns {JSX.Element} the signup screen
 */
export default function SignupScreen({ navigation }) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [grade, setGrade] = useState(9);
  const [signupText, updateSignupText] = useState("");
  let signingUp = false;

  const grades = [9, 10, 11, 12];

  /**
   * Handles the signup button press. Errortrapping ensures the email is valid and the passwords match.
   */
  const handleSignup = () => {
    if (signingUp) return;
    updateSignupText("Signing Up...");
    signingUp = true;
    if (!validator.isEmail(email)) {
      updateSignupText("Invalid email.");
      signingUp = true;
      return;
    }
    signup()
      .then((val) => {
        if (val == "Success!") {
          AsyncStorage.setItem("@username", username);
          dispatch(setReduxUsername(username));
          updateSignupText(val + " Loading App...");
          signingUp = false;
          updateSignupText("");
          GetUsers().then((users) => {
            dispatch(setUsersData(users));
            users.forEach((user) => {
              if (user.username == username) {
                dispatch(setUserData(user));
              }
            });
          });
          navigation.navigate("TabNav");
        } else {
          updateSignupText(val);
          signingUp = false;
        }
      })
      .catch((err) => console.log(err));
  };

  /**
   * Posts the user's information to the server to create a new account. If successful, the user is logged in.
   * 
   * @returns {Promise} a promise that resolves to a string
   */
  function signup() {
    return new Promise((resolve, reject) => {
      fetch(`${config.server}/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          password2: password2,
          grade: grade,
        }),
      })
        .then((response) => response.json())
        .then((json) => {
          if (json.success) {
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

  /**
   * Attempts to log in user by posting the username and password to the server.
   * Server will return a refresh token and an access token if successful and a message indicating the status.
   * 
   * @returns {Promise} A promise that resolves to a string indicating the result of the login attempt.
   */
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
          Email
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          onChangeText={setEmail}
        />
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
          defaultValue={9}
          buttonStyle={styles.select}
          buttonTextStyle={styles.selectText}
          dropdownStyle={styles.dropdown}
        ></SelectDropdown>
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
    height: "50%",
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

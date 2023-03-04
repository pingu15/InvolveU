import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";

import { logout } from "../utils/ReduxStore";
import { useSelector, useDispatch } from "react-redux";
import { Ionicons } from '@expo/vector-icons'; 

/**
 * Displays the user's username and email.
 * 
 * @param {Object} user the user object
 * 
 * @returns {JSX.Element} the profile component
 */
function Profile({ user }) {
  return (
    <View style={styles.profile}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: "#000000",
          marginHorizontal: "7%",
          marginTop: "6%",
          marginBottom: "3%",
        }}
      >
        {user.username}
      </Text>
      <Text
        style={{
          fontSize: 12,
          color: "#a6a6a6",
          marginHorizontal: "7%",
          marginBottom: "6%",
        }}
      >
        {user.email == "" ? "No Email" : user.email}
      </Text>
    </View>
  );
}

/**
 * Separator component. Simply displays a horizontal line.
 * 
 * @returns {JSX.Element} the separator component
 */
function Separator() {
  return (
    <View
      style={{
        width: "85%",
        borderBottomColor: "#d1d1d1",
        borderBottomWidth: 0.5,
      }}
    ></View>
  );
}

/**
 * Uses a TouchableOpacity to display toggleable content.
 * 
 * @param {String} option the text to display on the button 
 * @param {JSX.Element} content the content to display when the button is pressed
 * 
 * @returns {JSX.Element} the toggleable content component
 */
function ToggleableContent({ option, content }) {
  const [visible, setVisible] = useState(false);

  function toggleVisibility() {
    setVisible(!visible);
  }

  return (
    <View style={styles.togglecontent}>
      <TouchableOpacity onPress={toggleVisibility} style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{ fontSize: 20, fontWeight: "bold", color: "#000000" }}>
          {option}
        </Text>
        <Ionicons name={visible ? "chevron-up" : "chevron-down"} size={18} />
      </TouchableOpacity>
      {visible && <View style={{ flexGrow: visible ? 1 : 0 }}>{content}</View>}
    </View>
  );
}

/**
 * Button that navigates to the term screen.
 * 
 * @param {Object} navigation the navigation object
 * 
 * @returns {JSX.Element} the terms button component
 */
function TermsButton({navigation}) {
  return (
    <TouchableOpacity style={styles.bottombutton} onPress={() => navigation.navigate("Terms")}>
      <Text style={{ fontSize: 16, color: "#2280ff" }}>
        Terms and Privacy Policy
      </Text>
    </TouchableOpacity>
  );
}

/**
 * The settings screen contains the user's profile, some general information, and a logout button.
 * 
 * @param {Object} navigation the navigation object
 * 
 * @returns {JSX.Element} the settings screen
 */
export default function SettingsScreen({ navigation }) {
  const user = useSelector((state) => state.userData);

  const handleLogout = () => {
    AsyncStorage.clear().then(() => {
      navigation.navigate("Login");
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.overview}>
          <Profile user={user} />
          <Separator />

          <View style={styles.togglecontentcontainer}>
            <ToggleableContent option={"How to Use"}
            content={
            <Text>{`
Welcome to InvolveU! This app is the hub for all your school's events.

In the home page, you can see the number of points you have earned, and where you stand among your peers.

In the events page, you can see a calendar of events and their details, such as the number of points you can earn by participating.

Students attending events will be awarded the points at the end of each quarter, which can be used to redeem prizes in the prizes page.

Teachers in the school are tasked with adding students by username at each event to ensure validity.
            `}
            </Text>
            }
            />
            <ToggleableContent
              option={"About the Developers"}
              content={
              <Text>{`
InvolveU was developed by a team of 3 students from William Lyon Mackenzie Collegiate Institute in Toronto, Canada.

Please feel free to contact us with any questions or concerns.

Copyright C 2023 by Annie Wong, Shane Chen, Max Sun
              `}</Text>
            }
            />
          </View>
          <Separator />

          <View style={styles.bottombuttonscontainer}>
            <TermsButton navigation={navigation}/>
            <TouchableOpacity
              style={styles.bottombutton}
              onPress={handleLogout}
            >
              <Text style={{ fontSize: 16, color: "#ff5555" }}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  bottombuttonscontainer: {
    width: "85%",
    marginBottom: "8%",
    overflow: "hidden",
  },
  bottombutton: {
    marginTop: "8%",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#fafafa",
  },
  overview: {
    flexGrow: 1,
    margin: "5%",
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    alignSelf: "center",
  },
  profile: {
    margin: "8%",
    width: "85%",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#fafafa",
  },
  togglecontentcontainer: {
    width: "85%",
    marginBottom: "8%",
    overflow: "hidden",
  },
  togglecontent: {
    marginTop: "8%",
  },
});

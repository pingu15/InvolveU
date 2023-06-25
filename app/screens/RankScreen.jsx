import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import RankIcon from "../assets/rankIcon.png";
import { useSelector } from "react-redux";
import ScrollViewWrapper from "./ScrollViewWrapper";

/**
 * The rank screen is a leaderboard of all users points within the user's grade.
 * 
 * @returns {JSX.Element} The rank screen
 */
export default function RankScreen() {
  const user = useSelector((state) => state.userData);
  let grade = [];
  useSelector((state) => state.usersData).forEach((element) => {
    if (element.grade == user.grade) grade.push(element);
  });
  grade.sort(function (a, b) {
    return a.points > b.points ? -1 : 1;
  });

  let idx = -1;
  for (let i = 0; i < grade.length; ++i) {
    if (grade[i].id === user.id) {
      idx = i;
      break;
    }
  }

  return (
    <View style={styles.container}>
      <ScrollViewWrapper contentContainerStyle={styles.container}>
        <View style={styles.box}>
          <View style={styles.row}>
            <Image style={styles.icon} source={RankIcon} />
            <Text style={styles.h1}>Rank</Text>
          </View>
          <Text style={styles.h2}>Among grade {user.grade}s:</Text>
          <View style={styles.row}>
            <Text style={styles.number1}>{idx + 1}</Text>
            <Text style={styles.number2}>of {grade.length}</Text>
          </View>
          <Text style={styles.h2}>Leaderboard</Text>
          <View style={{ width: "100%" }}>
            {grade.map((user, idx) => {
              return (
                <View
                  key={idx}
                  style={{
                    width: "90%",
                    flexDirection: "row",
                    marginLeft: "5%",
                    marginBottom: "3%",
                    borderColor: "#808d9e",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={styles.username}>
                    {grade.indexOf(user) + 1}. {user.username}
                  </Text>
                  <Text style={styles.points}>{user.points}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollViewWrapper>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    height: 36,
    width: 36,
    margin: "5%",
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#fafafa",
  },
  box: {
    flexGrow: 1,
    margin: "5%",
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "left",
  },
  h1: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1D1E25",
  },
  h2: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1d1e25",
    marginLeft: "5%",
    marginBottom: "5%",
  },
  number1: {
    fontSize: 60,
    fontWeight: "bold",
    color: "#1D1E25",
    marginLeft: "5%",
    marginBottom: "5%",
  },
  number2: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#808d9e",
    marginLeft: "5%",
  },
  username: {
    fontSize: 14,
    color: "#1d1e25",
  },
  points: {
    fontSize: 14,
    color: "#808d9e",
  },
});

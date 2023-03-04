import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import Lock from "../assets/lock.png";
import StoreIcon from "../assets/storeIcon.png";
import Star from "../assets/star.png";
import { useSelector } from "react-redux";

/**
 * The prize screen allows the user to view the prizes they can redeem with their points.
 * Prizes are sorted by cost.
 * 
 * @returns {JSX.Element} The prize screen
 */
export default function PrizeScreen() {
  let prizeItems = [];
  let tmp = useSelector((state) => state.itemsData);
  prizeItems = Array.from(tmp);
  prizeItems = prizeItems.sort(function (a, b) {
    return a.cost < b.cost ? -1 : 1;
  });
  let userPoints = useSelector((state) => state.userData.points);
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.box}>
          <View style={styles.row}>
            <Image style={styles.icon} source={StoreIcon} />
            <Text style={styles.h1}>Prizes</Text>
          </View>
          {prizeItems.map((item) => {
            return (
              <View
                key={item.id}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                  borderRadius: 8,
                  backgroundColor: "#ffffff",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "left",
                }}
              >
                <PrizeItem
                  itemName={item.name}
                  points={item.cost}
                  image={item.photo}
                  userPoints={userPoints}
                />
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

/**
 * Component to display a prize item.
 * 
 * @param {String} itemName The name of the prize item
 * @param {Number} points The cost of the prize item
 * @param {String} image The image of the prize item
 * @param {Number} userPoints The user's current points
 * 
 * @returns {JSX.Element} A component containing the prize item
 */
function PrizeItem({ itemName, points, image, userPoints }) {
  return (
    <View style={styles.shopBox}>
      <View style={styles.row}>
        {points > userPoints ? null : (
          <Image
            style={[
              styles.icon,
              { height: 21 },
              { width: 21 },
              { marginBottom: 3 },
            ]}
            source={Lock}
          />
        )}
        <Text style={[styles.h2, { marginTop: 15, marginLeft: "5%" }]}>
          {itemName}
        </Text>
      </View>
      <View style={styles.row}>
        <Image
          style={[styles.icon, { height: 21 }, { width: 21 }]}
          source={Star}
        />
        <Text>{points} points</Text>
      </View>
      <Image style={styles.image} source={{ uri: image }} />
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
  image: {
    margin: "5%",
    width: "90%",
    height: 200,
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#fafafa",
  },
  box: {
    margin: "5%",
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "left",
  },
  shopBox: {
    margin: "5%",
    width: "90%",
    borderRadius: 8,
    backgroundColor: "#ffe9e9",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "left",
    marginTop: "0%",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: "10%",
  },
  h1: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#1D1E25",
  },
  h2: {
    fontSize: 20,
    fontWeight: `medium`,
  },
  points: {
    fontSize: 15,
    fontWeight: "light",
  },
});

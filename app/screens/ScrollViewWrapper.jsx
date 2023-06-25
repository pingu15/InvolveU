import React, { useState, useEffect } from "react";
import {
  ScrollView,
  RefreshControl
} from "react-native";
import { GetItems, GetEvents, GetUsers } from "../utils/InvolveUApi";
import { useDispatch } from "react-redux";
import { setItemsData, setUsersData, setEventsData, setUserData } from "../utils/ReduxStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ScrollViewWrapper({ children, contentContainerStyle }) {
    const dispatch = useDispatch();    
    const [refreshing, setRefreshing] = useState(false);

    function reloadData() {
        GetItems().then((items) => {
          dispatch(setItemsData(items));
        }).catch((err) => console.error("error fetching items:" + err))
        .then(() => GetEvents()).then((events) => {
          dispatch(setEventsData(events));
        }).catch((err) => console.error("error fetching events: " + err))
        .then(() => GetUsers()).then((users) => {
          dispatch(setUsersData(users));
            AsyncStorage.getItem("@username").then((u) => {
                users.forEach(user => {if (user.username === u) dispatch(setUserData(user));})
            }).catch((err) => console.error("error fetching users:" + err));
        }).then(console.log("RELOAD OK")).catch((err) => console.error("unexpected error:" + err))
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        reloadData();
        setTimeout(() => {
          setRefreshing(false);
        }, 2000);
      }, []);

    return (
        <ScrollView
            contentContainerStyle={contentContainerStyle}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
            {children}
        </ScrollView>
    );
}

import React, { useState, useEffect } from "react";
import {
  ScrollView,
  RefreshControl
} from "react-native";

export default function ScrollViewWrapper({ children, contentContainerStyle }) {
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        console.log("refreshing");
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

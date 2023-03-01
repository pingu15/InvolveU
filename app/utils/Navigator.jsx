import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StoreScreen from '../screens/StoreScreen';
import SignupScreen from '../screens/SignupScreen';
import RankScreen from '../screens/RankScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNav({navigation}) {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="home" size={size} color={color} />
              ),
            }}>
              {() => <HomeScreen navigation={navigation} />}
            </Tab.Screen>
            <Tab.Screen name="Events" component={EventsScreen} options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="calendar-outline" size={size} color={color} />
              ),
            }}/> 
            <Tab.Screen name="Settings" options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="cog-outline" size={size} color={color} />
              ),
            }}>
              {() => <SettingsScreen navigation={navigation} />}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

export default function Navigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="Signup" component={SignupScreen} options={{headerShown: false}} />
      <Stack.Screen
        name="TabNav"
        options={{ headerShown: false, gestureEnabled: false }}>
          {({ navigation }) => <TabNav navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen options={{headerBackTitle: "Home"}} name="Store">
        {({ navigation }) => <StoreScreen navigation={navigation} />}
      </Stack.Screen>
      <Stack.Screen options={{headerBackTitle: "Home"}} name="Rank">
        {({ navigation }) => <RankScreen navigation={navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}



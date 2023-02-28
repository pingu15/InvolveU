import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from '../screens/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import EventsScreen from '../screens/EventsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import SignupScreen from '../screens/SignupScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNav({navigation}) {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Events" component={EventsScreen} />
            <Tab.Screen name="Settings">
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
    </Stack.Navigator>
  );
}



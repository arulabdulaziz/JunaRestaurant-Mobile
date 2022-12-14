import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./app/screens/login";
import Register from "./app/screens/register";
import Main from "./app/screens/main";
import Profile from "./app/screens/profile";
import Chart from "./app/screens/chart";
import History from "./app/screens/history";
import HistoryDetail from "./app/screens/history-detail";

export default function App() {
  const [token, setTokenApp] = useState("");
  const [loading, setLoading] = useState(true);
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={"Main"}>
        <Stack.Screen
          name="Register"
          component={Register}
          option={{ title: "Register" }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          option={{ title: "Login" }}
        />
        <Stack.Screen
          name="Main"
          component={Main}
          options={{ title: "Main", headerShown: false }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          option={{ title: "Profile" }}
        />
        <Stack.Screen
          name="Chart"
          component={Chart}
          option={{ title: "Chart" }}
        />
        <Stack.Screen
          name="History"
          component={History}
          option={{ title: "Riwayat Order" }}
        />
        <Stack.Screen
          name="HistoryDetail"
          component={HistoryDetail}
          option={{ title: "Detail Riwayat Order" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

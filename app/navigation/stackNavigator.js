import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/homeScreen";
import PickupScreen from "../screens/pickupScreen";
import CartScreen from "../screens/cartScreen";
import LoginScreen from "../screens/logniScreen";
import RegisterScreen from "../screens/registerScreen";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="loginScreen" component={LoginScreen} />
        <Stack.Screen name="registerScreen" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="pickUp" component={PickupScreen} />
        <Stack.Screen name="cartScreen" component={CartScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});

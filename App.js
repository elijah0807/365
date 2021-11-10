// import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
// import {WebView} from 'react-native-webview';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import RegistrationSuccessful from "./screens/RegistrationSuccessful";
import ContactInfo from "./screens/ContactInfo";
import HomeScreen from "./screens/HomeScreen";
import CategoriesScreen from "./screens/CategoriesScreen";
import Products from "./screens/Products";
import PostAdsScreen from "./screens/PostAdsScreen";
// import MyNavigator from './navigation/navigation';


const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text>Hello React</Text>
    //   <StatusBar style="auto" />
    // </View>
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          options={{ headerShown: false }}
          name="LoginScreen"
          component={LoginScreen}
        />
      <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
      
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignupScreen"
          component={SignupScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ContactInfo"
          component={ContactInfo}
        />
        <Stack.Screen
          options={{ headerShown: true,headerTitle:'All Categories' }}
          name="AllCategories"
          component={CategoriesScreen}
        />
        <Stack.Screen
          options={{ headerShown: true,headerTitle:'Post Ads' }}
          name="PostAd"
          component={PostAdsScreen}
        />
        <Stack.Screen
          options={{ headerShown: true }}
          name="Products"
          component={Products}
        />
        
        <Stack.Screen
          options={{ headerShown: false }}
          name="RegistrationSuccessful"
          component={RegistrationSuccessful}
        />
        
      </Stack.Navigator>
    </NavigationContainer>
    // <MyNavigator/>
    // <WebView source={{ uri: 'https://bestbuy.space/' }} />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { StatusBar } from "expo-status-bar";

import HomeNavigation from "./app/Navigation/HomeNavigation";
import AuthNavigator from "./app/Navigation/AuthNavigator";
import DBAdapter from "./app/Database/DatabaseAdapter";

import * as Font from "expo-font";

const openSansFonts = {
  "Open-Sans-Medium" : require("./app/assets/fonts/OpenSans/OpenSans-Medium.ttf"),
  "Open-Sans-Regular" : require("./app/assets/fonts/OpenSans/OpenSans-Regular.ttf"),
  "Open-Sans-SemiBold" : require("./app/assets/fonts/OpenSans/OpenSans-SemiBold.ttf"),
  "Open-Sans-Bold" : require("./app/assets/fonts/OpenSans/OpenSans-Bold.ttf"),
  "Poppins-Medium" : require("./app/assets/fonts/Poppins/Poppins-Medium.ttf"),
  "Poppins-SemiBold" : require("./app/assets/fonts/Poppins/Poppins-SemiBold.ttf")
};

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    loadCustomFonts();
    
    const getCurrentUser = async () => {
      try {

        DBAdapter.createDatabaseSchema();
        const users = await DBAdapter.getAllUsers();
        console.log("USERS  :  ",users);
        let currentUser = undefined;
        for(let user of users)
          if(user.status === "Logged In")
            currentUser = user;

        console.log("CURRENT USER ",currentUser);
        if (currentUser !== undefined) {
          setCurrentUser(currentUser);
        }
        
      } catch (error) {
        console.log("error while executing getCurrentUser", error);
      }
    };

    getCurrentUser();
  }, [loginStatus]);

  const loadCustomFonts = async() => {
    await Font.loadAsync(openSansFonts);
    setFontsLoaded(true);
  }

  const handleUserSignIn = (currentUser) => {
    if(loginStatus) setLoginStatus(false);
    else setLoginStatus(true);

    console.log("In app.js " + JSON.stringify(currentUser));
  };

  const handleLogout = (currentUser) => {
    setCurrentUser({});
  };

  const handleLogin = () => {
    if(loginStatus) setLoginStatus(false);
    else setLoginStatus(true);
  };

  if(fontsLoaded){
    return (
        <MenuProvider>
          <NavigationContainer>
            <View style={styles.container}>
              {currentUser.hasOwnProperty("user_name") ? (
                <HomeNavigation currentUser={currentUser} onLogout={handleLogout} />
              ) : (
                <AuthNavigator
                  onUserSignUp={handleUserSignIn}
                  onLogin={handleLogin}
                />
              )}
            </View>
            <StatusBar style="auto" />
          </NavigationContainer>
      </MenuProvider>
      
    );
  }

  return <ActivityIndicator size="large"/>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

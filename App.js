// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { MenuProvider } from "react-native-popup-menu";
import { StatusBar } from "expo-status-bar";

import HomeNavigation from "./app/Navigation/HomeNavigation";
import AuthNavigator from "./app/Navigation/AuthNavigator";
import DBAdapter from "./app/Database/DatabaseAdapter";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        // const users = await DBAdapter.getAllUsers();
        // console.log(users); //Current User is being read.....
        const currentUser = await DBAdapter.getCurrentUser();
        if (currentUser !== undefined) {
          setCurrentUser(currentUser);
        }
      } catch (error) {
        console.log("error while executing getCurrentUser", error);
        DBAdapter.createDatabaseSchema();
      }
    };

    getCurrentUser();
  }, [loginStatus]);

  const handleUserSignIn = (currentUser) => {
    if(loginStatus) setLoginStatus(false);
    else setLoginStatus(true);

    console.log("In app.js " + JSON.stringify(currentUser));
    setCurrentUser(currentUser);
  };

  const handleLogout = (currentUser) => {
    setCurrentUser({});
  };

  const handleLogin = () => {
    // const fetchCurrentUser = async () => {
    //   const user = await DBAdapter.getCurrentUser();
    //   if (user !== undefined) {
    //     setCurrentUser(user);
    //   }
    // };
    // fetchCurrentUser();
    if(loginStatus) setLoginStatus(false);
    else setLoginStatus(true);
  };

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

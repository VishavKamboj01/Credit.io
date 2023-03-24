import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import StartUp from "../Screens/StartUp";
import Login from "../Screens/Login";
import SignUp from "../Screens/SignUp";

const Stack = createStackNavigator();

export default function AuthNavigator({ onUserSignUp, onLogin }) {
  return (
    <Stack.Navigator presentation="card">
      <Stack.Screen
        options={{ headerShown: false }}
        name="StartUp"
        component={StartUp}
      />
      <Stack.Screen options={{ headerShown: false }} name="Login">
        {(props) => <Login {...props} onLogin={onLogin} />}
      </Stack.Screen>
      <Stack.Screen options={{ headerShown: false }} name="SignUp">
        {(props) => <SignUp {...props} onUserSignUp={onUserSignUp} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

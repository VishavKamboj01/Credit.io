import React, { useState } from "react";
import { StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "../Screens/Home";
import AllTransactions from "../Screens/AllTransactions";
import AddCustomer from "../Screens/AddCustomer";
import { colors } from "../config/colors";
import AddCustomerButton from "../Components/AddCustomerButton";
import AddCustomerNav from "./AddCustomerNav";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ currentUser, onLogout, paymentMade }) {

  return (
    <Tab.Navigator
      screenOptions={{
        "tabBarActiveTintColor": colors.white,
        "tabBarStyle": [
          {
            display: "flex",
            backgroundColor : colors.appToolbar,
            paddingBottom:5,
            paddingTop:5

          },
          null
        ],
        headerShown: false
      }}
    >
      <Tab.Screen
        name="Home"
        children={(props) => (
          <Home {...props} currentUser={currentUser} onLogout={onLogout} paymentMade={paymentMade} />
        )}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={20} />
          ),
        }}
        initialParams={{
          customer: {
            name: "",
            phoneNumber: "",
            address: "",
            imageUri: "",
          },
        }}
      />

      <Tab.Screen
        name="AddCustomerNav"
        children={(props) => (
          <AddCustomerNav {...props} currentUser={currentUser}/>
        )}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <AddCustomerButton
              onPress={() => navigation.navigate("AddCustomerNav")}
            />
          ),
        })}
      />
      

      <Tab.Screen
        name="AllTransactions"
        children={(props) => (
          <AllTransactions {...props} currentUser={currentUser}/>
        )}
        options={{
          tabBarLabel: "Transactions",
          unmountOnBlur:true,
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="import-export" color={color} size={25} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tab: {
    backgroundColor: colors.secondary,
    elevation: 30,
  },
});

import React from "react";
import { StyleSheet } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Home from "../Screens/Home";
import Contacts from "../Screens/Contacts";
import AddCustomer from "../Screens/AddCustomer";
import { colors } from "../config/colors";
import AddCustomerButton from "../Components/AddCustomerButton";

const Tab = createBottomTabNavigator();

export default function TabNavigator({ currentUser, onLogout, paymentMade }) {
  return (
    <Tab.Navigator
      screenOptions={{
        "tabBarActiveTintColor": "#FF8A65",
        "tabBarStyle": [
          {
            "display": "flex"
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
            <MaterialCommunityIcons name="home" color={color} size={size} />
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
        name="AddCustomer"
        children={(props) => (
          <AddCustomer {...props} currentUser={currentUser} onAddCustomerClicked={() => console.log("Add Customer Clicked")}/>
        )}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <AddCustomerButton
              onPress={() => navigation.navigate("AddCustomer")}
            />
          ),
        })}
      />

      <Tab.Screen
        name="Contacts"
        component={Contacts}
        options={{
          tabBarLabel: "Contacts",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="contacts" color={color} size={size} />
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

import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CustomerTransactions from "../Screens/CustomerTransactions";
import AllTransactions from "../Screens/AllTransactions";
import MyAccount from "../Screens/MyAccount";
import TabNavigator from "./TabNavigator";
import { colors } from "../config/colors";
import CustomerScreenHeader from "../Components/CustomerScreenHeader";

const Stack = createStackNavigator();

export default function HomeNavigation({currentUser, onLogout }) {
  const [totalDueOrAdvance, setTotalDueOrAdvance] = useState(0);

  const handleScreenRender = (totalDueOrAdvance) => {
    setTotalDueOrAdvance(totalDueOrAdvance);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AllCustomers"
        options={({ route }) => ({ headerShown: false })}
      >
        {(props) => (
          <TabNavigator
            {...props}
            currentUser={currentUser}
            onLogout={onLogout}
            paymentMade={totalDueOrAdvance}
          />
        )}
      </Stack.Screen>
      <Stack.Screen
        options={({ route }) => ({
          headerTitle: () => (
            <CustomerScreenHeader
              name={route.params.name}
              imageUri={route.params.image}
              totalDueOrAdvance={totalDueOrAdvance}
            />
          ),
          headerStyle: { backgroundColor: colors.red },
          headerTintColor: colors.white,
        })}
        name="CustomerTransactions"
      >
        {(props) => (
          <CustomerTransactions {...props} onRender={handleScreenRender}/>
        )}
      </Stack.Screen>

      <Stack.Screen
        options={({ route }) => ({
          headerTitle: () => {},
        })}
        name="AllTransactions"
      >
        {(props) => (
          <AllTransactions {...props}/>
        )}
      </Stack.Screen>

      <Stack.Screen name="MyAccount">
        {(props) => (
          <MyAccount {...props} currentUser={currentUser}/>
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

{
  /* <Home {...props} customer={route.params?.customer} /> */
}

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";

import AppList from "../Components/AppList";
import Menus from "../Components/AppMenus";
import { colors } from "../config/colors";
import AppComponent from "../Components/AppComponent";
import DBAdapter from "../Database/DatabaseAdapter";

const FilterType = {
  ALL_CUSTOMERS: 1,
  NEWLY_ADDED: 2,
  PAYMENT_DUE: 3,
  PAYMENT_ADVANCE: 4
};

const MenuItemType = {
   ALL_TRANSACTIONS: 1,
   MY_ACCOUNT: 2,
   LOGOUT: 3
};

export default function Home({ navigation, route, currentUser, onLogout, paymentMade }) {
  const [selectedSearchbarMenuItem, setSelectedSearchbarMenuItem] =
    useState("1");

  const [customers, setCustomers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);

  useEffect(() => {
    //Get Customer from the database...
    const fetchCustomers = async () => {
      try {
        const customers = await DBAdapter.getAllCustomers(currentUser);
        
        const payments = await DBAdapter.getAllPayments(currentUser.user_id);

        const recentPayments = await DBAdapter.getRecentPayments(currentUser.user_id);
        const customersTemp = [...customers];
        for(let customer of customersTemp){

          const paymentSum = getPaymentsSum(payments, customer);

          for(let recent of recentPayments){
            if(recent.customer_id === customer.customer_id && recent.user_id === customer.user_id){
              customer.recentActivity = recent.amount;
              customer.paymentType = recent.payment_type;
              customer.payment = paymentSum;
            }
          }

        }
        
        setCustomers(customersTemp);
        setAllCustomers([...customersTemp]);

      } catch (error) {
        console.log("Error in home "+error);
      }
    };

    fetchCustomers();

    return () => {};
  }, [currentUser, route.params, paymentMade]);

  const getPaymentsSum = (payments, customer) => {
    return payments
    .filter(payment => payment.customer_id === customer.customer_id)
    .reduce((accumulator, payment) => {
      return payment.payment_type === "Credit" ? 
      accumulator - payment.amount :
      accumulator + payment.amount
    }, 0);
  }

  const handleListItemPressed = (item) => {
    navigation.navigate("CustomerTransactions", {
      user_id: currentUser.user_id,
      customer_id: item.customer_id,
      name: item.full_name,
      image: item.image_uri,
    });
  };

  const handleSearchBarMenuItemPress = (id) => {
    setSelectedSearchbarMenuItem(id.toString());
    let filteredCustomers = [...allCustomers];

    if(id == FilterType.NEWLY_ADDED)
      filteredCustomers = filteredCustomers.reverse();
    else if(id == FilterType.PAYMENT_DUE)
      filteredCustomers = filteredCustomers.filter(customer => customer.payment < 0);
    else if(id == FilterType.PAYMENT_ADVANCE)
      filteredCustomers = filteredCustomers.filter(customer => customer.payment > 0);

    setCustomers(filteredCustomers);
  };

  const handleSearchTextChange = (text) => {
    if(text === ""){ 
      setCustomers(allCustomers);
      return;
    }

    text = text.toLowerCase();
    const filtered = customers.filter(customer => customer.full_name.toLowerCase().startsWith(text));
    setCustomers(filtered);
  };

  const handleToolbarMenuItemPress = (id) => {
    if(id == MenuItemType.ALL_TRANSACTIONS){
       navigation.navigate("AllTransactions");
    }
    
    else if(id == MenuItemType.MY_ACCOUNT){
       navigation.navigate("MyAccount");
    }

    else if (id == MenuItemType.LOGOUT) {
      DBAdapter.logoutUser(currentUser);
      onLogout(currentUser);
    }
  };


  return (
    <AppComponent
      title="Home"
      searchbarPlaceholder="Search Customers"
      searchBarMenuItems={Menus.searchBarMenuItemsHome}
      selectedSearchbarMenuItem={selectedSearchbarMenuItem}
      onSearchbarMenuItemPress={handleSearchBarMenuItemPress}
      onSearchbarTextChange={handleSearchTextChange}
      toolbarMenuItems={Menus.toolbarMenuItemsHome}
      onToolbarMenuItemPress={handleToolbarMenuItemPress}
    >
      <View style={styles.container}>
        {currentUser && <Text>{currentUser.user_name}</Text>}
        {customers.length !== 0 ? (
          <AppList
            items={customers}
            onListItemPressed={handleListItemPressed}
          />
        ) : (
          <View
            style={{ alignItems: "center", flex: 1, justifyContent: "center" }}
          >
            <Text style={{ color: colors.lightBlack }}>
              Customers will show here.
            </Text>
          </View>
        )}
      </View>
    </AppComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  toolbar: {
    backgroundColor: colors.red,
  },
});

import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ToastAndroid } from "react-native";

import AppList from "../Components/AppList";
import {searchBarMenuItemsHome, toolbarMenuItemsHome} from "../Components/AppMenus";
import { colors } from "../config/colors";
import AppComponent from "../Components/AppComponent";
import DBAdapter from "../Database/DatabaseAdapter";
import Utility from "../UtilityFunctions/Utility";

const FilterType = {
  ALL_CUSTOMERS: 1,
  PAYMENT_DUE: 2,
  PAYMENT_ADVANCE: 3
};

const MenuItemType = {
   MY_ACCOUNT: 1,
   LOGOUT: 2
};

export default function Home({ navigation, route, currentUser, onLogout, paymentMade }) {
  const [selectedSearchbarMenuItem, setSelectedSearchbarMenuItem] =
    useState("1");

  const [customers, setCustomers] = useState([]);
  const [allCustomers, setAllCustomers] = useState([]);
  const [customerDeleted, setCustomerDeleted] = useState(0);

  useEffect(() => {
    //Get Customer from the database...
    const fetchCustomers = async () => {
      try {
        console.log("CURRENT USER ", currentUser);
        const customers = await DBAdapter.getAllCustomers(currentUser);
        const payments = await DBAdapter.getAllPayments(currentUser.user_id);

        const recentPayments = await DBAdapter.getRecentPayments(currentUser.user_id);
       
        const customersTemp = [...customers];
        for(let customer of customersTemp){

          const paymentSum = getPaymentsSum(payments, customer);

          for(let recent of recentPayments){
            if(recent === undefined) continue;
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
  }, [route.params, paymentMade, customerDeleted]);
  

  const getPaymentsSum = (payments, customer) => {
    return payments
    .filter(payment => payment.customer_id === customer.customer_id)
    .reduce((accumulator, payment) => {
      return payment.payment_type === "Credit" ? 
      accumulator - payment.amount :
      accumulator + payment.amount
    }, 0);
  }

  const handleListItemPressed = (item, color) => {
    navigation.navigate("CustomerTransactionsNav", {
      user_id: currentUser.user_id,
      customer_id: item.customer_id,
      name: item.full_name,
      image: item.image_uri,
      color,
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

  const handleDeleteIconPress = async(item) => {
    const customer = {
      customer_id: item.customer_id,
      deleted_date_time: new Date().toString(),
      deleted_date: Utility.getDate(new Date())
    }
    
    try{
        const result = await DBAdapter.deleteCustomer(customer);
        setCustomerDeleted(customerDeleted+1);
        ToastAndroid.show(
            "Customer Removed!. You can restore it within 30 days from your Account.",
             ToastAndroid.LONG);

      }catch(err){
        console.log("ERROR in HOME CUSTOMER DELETION: ",err);
      }
  }

  const handleEditIconPress = (item) => {
    navigation.navigate("AddCustomerNav", {
      screen: "AddCustomer",
      editCustomer: item
    });
  }


  return (
    <AppComponent
      title="Home"
      searchbarPlaceholder="Search Customers"
      searchBarMenuItems={searchBarMenuItemsHome}
      selectedSearchbarMenuItem={selectedSearchbarMenuItem}
      onSearchbarMenuItemPress={handleSearchBarMenuItemPress}
      onSearchbarTextChange={handleSearchTextChange}
      toolbarMenuItems={toolbarMenuItemsHome}
      onToolbarMenuItemPress={handleToolbarMenuItemPress}
    >
      <View style={styles.container}>
        {customers.length !== 0 ? (
          <AppList
            items={customers}
            onListItemPressed={handleListItemPressed}
            onDeleteIconPress={handleDeleteIconPress}
            onEditIconPress={handleEditIconPress}
            isSwipeable={true}
          />
        ) : (
          <View style={styles.textContainer}>
            <Text style={{ color: colors.lightWhite }}>
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
    backgroundColor:colors.appBackground,
    width:"100%",
    heigth:"100%",
    paddingTop:20
  },

  textContainer: {
    width:"100%",
    height:"100%",
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor:colors.appBackground,
    paddingBottom:"20%"
  }

});

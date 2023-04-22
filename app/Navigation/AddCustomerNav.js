import { createStackNavigator } from '@react-navigation/stack';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomerTransactions from '../Screens/CustomerTransactions';
import { colors } from '../config/colors';
import CustomerScreenHeader from "../Components/CustomerScreenHeader"
import Payment from '../Screens/Payment';
import Contacts from '../Screens/Contacts';
import AddCustomer from '../Screens/AddCustomer';

const Stack = createStackNavigator();


// create a component
const AddCustomerNav = (props) => {
    return (
        <Stack.Navigator screenOptions={{animationEnabled:true}}>
            <Stack.Screen
            name='Contacts'
            options={({ route }) => ({
                headerShown:false,
              })}
            > 
                {(additional) => <Contacts {...props} additional={additional}/>}
            </Stack.Screen>
            <Stack.Screen
            name="AddCustomer" options={{headerShown:false}}>
                {(additional) => <AddCustomer {...props} additional={additional}/>}
            </Stack.Screen>
        </Stack.Navigator>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default AddCustomerNav;

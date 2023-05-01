//import liraries
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CustomerTransactions from '../Screens/CustomerTransactions';
import { colors } from '../config/colors';
import CustomerScreenHeader from "../Components/CustomerScreenHeader"
import Payment from '../Screens/Payment';

// create a component
const Stack = createStackNavigator();

const CustomerTransactionNav = (props) => {

    return (
        <Stack.Navigator>
            <Stack.Screen
            name='CustomerTransactions'
            options={({ route }) => ({
                headerTitle: () => (
                  <CustomerScreenHeader
                    name={props.route.params.name}
                    imageUri={props.route.params.image}
                    totalDueOrAdvance={props.totalDueOrAdvance}
                    color={props.route.params.color}
                  />
                ),
                headerStyle: { 
                    backgroundColor: colors.appToolbar, 
                  },
                headerTintColor: colors.white,
              })}
              >
                {(additional) => <CustomerTransactions {...props} 
                                  additional={additional} 
                                  onRender={props.onRender}
                                  />}
            </Stack.Screen>
            <Stack.Screen
            name="Payment" options={{headerShown:false}}>
                {(additional) => <Payment {...props} 
                  name={props.route.params.name} 
                  image={props.route.params.image}
                  // onEnterPress={handleEnterPress}
                  color={props.route.params.color}
                  additional={additional}/>}
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
export default CustomerTransactionNav;

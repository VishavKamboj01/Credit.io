//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {MaterialCommunityIcons} from "@expo/vector-icons"
import AppText from './AppText';

// create a component
const PaymentView = ({amount, amountStyle}) => {
    return (
        <View style={{flexDirection:"row", alignItems:"center", right:5}}>
            <MaterialCommunityIcons name="currency-inr" size={20} color={amountStyle.color}/>
            <AppText title={amount} style={[styles.textAmountStyle,amountStyle]}/>
        </View>
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

    textAmountStyle:{
        fontSize:20, 
        marginTop:3
    },
});

//make this component available to the app
export default PaymentView;

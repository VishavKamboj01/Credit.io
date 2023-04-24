//import liraries
import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppText from './AppText';
import { colors } from '../config/colors';
import PaymentView from './PaymentView';

// create a component
const TransactionListItem = ({name, amount, time, paymentType}) => {
    return (
        <View style={styles.container}>
            <View style={paymentType === "Accepted" ? styles.itemContainer : [styles.itemContainer, {alignSelf:"flex-end"}]}>
                <AppText title={name} style={{color:colors.textColor}}/>
                <View style={styles.amountTimeContainer}>
                    <PaymentView 
                        amount={amount} 
                        amountStyle={paymentType === "Accepted" ? {color:colors.green} : {color:colors.red}}/>
                    <AppText title={time} style={{color:colors.iconColor, top:5}}/>
                </View>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container:{
        width:"100%",
        paddingLeft:10,
        paddingRight:10,
        marginTop:15
    },
    itemContainer: {
        backgroundColor:colors.appBackground,
        borderWidth:1,
        borderColor:colors.borderColor,
        borderRadius:10,
        padding:5,
        paddingLeft:15,
        width:"60%"
    },

    amountTimeContainer:{
        flexDirection:"row",
        alignItems:"center", 
        justifyContent:"space-between", 
        paddingRight:5
    },
});

//make this component available to the app
export default TransactionListItem;

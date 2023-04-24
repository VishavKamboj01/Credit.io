//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {MaterialIcons} from "@expo/vector-icons"
import AppText from './AppText';
import { colors } from '../config/colors';
import {MaterialCommunityIcons} from "@expo/vector-icons";
import PaymentView from './PaymentView';

// create a component
const TransactionAmount = ({style, Icon, title, amount, titleStyle, amountStyle}) => {
    return (
        <View style={[styles.container, style]}>
            <Icon/>
            <View>
                <AppText title={title} style={titleStyle}/>
                <PaymentView amount={amount} amountStyle={amountStyle}/>
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.appBackground,
        flexDirection:"row",
        alignSelf:"flex-start"
    },
});

//make this component available to the app
export default TransactionAmount;

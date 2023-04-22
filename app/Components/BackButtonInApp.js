//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { colors } from '../config/colors';
import {Ionicons} from "@expo/vector-icons";


// create a component
const BackButtonInApp = ({onPress, style}) => {
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <Ionicons style={[styles.iconStyle, style]} name="chevron-back" color={colors.backIconColor} size={35}/>
        </TouchableNativeFeedback>  
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
    iconStyle:{
        position:'absolute',
        top:60,
        left:20
    },
});

//make this component available to the app
export default BackButtonInApp;

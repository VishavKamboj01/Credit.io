//import liraries
import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { colors } from '../config/colors';

// create a component
const AppText = ({title, style}) => {
    return (
       <Text style={[styles.text,style]}>{title}</Text>
    );
};

// define your styles
const styles = StyleSheet.create({
    text: {
        color: colors.white,
        fontFamily:"Poppins-Medium"
    },
});

//make this component available to the app
export default AppText;

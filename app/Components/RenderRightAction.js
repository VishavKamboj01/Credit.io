//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../config/colors';

// create a component
const RenderRightAction = ({Icon, bgColor}) => {
    return (
        <View style={[styles.container,{backgroundColor:bgColor}]}>
            <Icon/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width:70,
        height:75, 
        backgroundColor:colors.red,
        borderRadius:23,
        marginRight:3,
        alignItems:"center",
        justifyContent:"center"
    },

    iconContainer:{
        flexDirection:"row"
    },
});

//make this component available to the app
export default RenderRightAction;

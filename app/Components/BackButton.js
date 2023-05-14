//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import {Ionicons} from "@expo/vector-icons";
import { colors } from '../config/colors';

// create a component
const BackButton = ({onPress}) => {
    return (
        <TouchableNativeFeedback style={styles.container} onPress={onPress}>
            <View style={styles.button}>
                <Ionicons name="chevron-back" color={colors.white} size={28}/>
            </View>
        </TouchableNativeFeedback>
    );
};


// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    button:{
        width:50,
        height:50,
        backgroundColor: '#090909',
        borderRadius:10,
        marginLeft:20,
        marginRight:20,
        alignItems:'center',
        justifyContent:"center",
        bottom:5,
        borderWidth:2,
        borderColor:"rgba(255,255,255,0.05)",
    },
});

//make this component available to the app
export default BackButton;

//import liraries
import React, { Component } from 'react';
import {View,TouchableOpacity, StyleSheet } from 'react-native';
import AppText from './AppText';
import { colors } from '../config/colors';

// create a component
const TextButton = ({textStyle, onPress, softEdges, title, containerStyles}) => {
    return (
        <TouchableOpacity onPress={onPress}>
            {softEdges ? 
                <View style={[styles.container,containerStyles]}>
                    <AppText style={[textStyle,{color:colors.textColor}]} title={title}/>    
                </View>
                :
                <AppText style={textStyle} title={title}/>    
            }
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container:{
        padding:3,
        borderRadius:20,
        paddingLeft:20,
        paddingRight:20
    },
});

//make this component available to the app
export default TextButton;

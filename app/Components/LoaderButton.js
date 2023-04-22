//import liraries
import React, { Component } from 'react';
import { View, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import AppText from './AppText';
import { colors } from '../config/colors';

// create a component
const LoaderButton = ({showIndicator, onPress, textStyle, title, buttonStyle}) => {
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <View style={buttonStyle}>
                {showIndicator ? 
                    <ActivityIndicator color={colors.black}/> : 
                    <AppText style={textStyle} title={title}/>
                }
            </View>
        </TouchableNativeFeedback>
    );
};

//make this component available to the app
export default LoaderButton;

//import liraries
import React, { Component } from 'react';
import { StyleSheet, TouchableNativeFeedback, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import AppText from './AppText';
import { colors } from '../config/colors';

// create a component
const GradientButton = ({onPress, isLoader, buttonStyles, textStyles, colorsArray, title, showIndicator}) => {
    return (
        <TouchableNativeFeedback onPress={onPress}>
            <LinearGradient
                colors={colorsArray}
                style={[styles.signUpButton, buttonStyles]}
                start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}>
                    {isLoader ? 
                        <>
                            {showIndicator ? 
                                <ActivityIndicator color={colors.black}/> :
                                <AppText style={[{color:colors.black},textStyles]} title={title}/>
                            }

                        </>:
                        <AppText style={[{color:colors.black},textStyles]} title={title}/>
                    }
            </LinearGradient>
        </TouchableNativeFeedback>
    );
};

// define your styles
const styles = StyleSheet.create({
    signUpButton: {
        width:"90%",
        height: 50,
        alignItems:"center",
        justifyContent:"center",
        borderRadius:13,
        marginTop:20,
      },
});

//make this component available to the app
export default GradientButton;

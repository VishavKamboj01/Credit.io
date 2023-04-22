//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../config/colors';
import BackButton from './BackButton';

// create a component
const SignupHeader = ({onBackPress, title}) => {
    return (
        <View style={styles.container}>
            <BackButton onPress={onBackPress}/>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width:"100%",
        height:130,
        alignItems: 'flex-end',
        backgroundColor:"rgba(0,0,0,0.4)",
        display:'flex',
        flexDirection:"row",
        paddingBottom:20
  },

    title:{
        fontFamily:"Poppins-SemiBold",
        fontSize:35,
        color:colors.white,
    },
});

//make this component available to the app
export default SignupHeader;

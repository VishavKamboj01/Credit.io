//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Utility from '../UtilityFunctions/Utility';
import { colors } from '../config/colors';
import AppText from './AppText';

// create a component
const ListCustomerImage = ({name, imageUri, color}) => {
    return (
        imageUri.length === 0 ? (
            <View style={[styles.customerImage,{backgroundColor:color, alignItems:"center", justifyContent:"center"}]}>
              <AppText title={name[0]} style={{fontSize:26, marginTop:3}}/>
            </View>
          ) : (
            <Image style={styles.customerImage} source={{ uri: imageUri }} />
          )
    );
};

// define your styles
const styles = StyleSheet.create({
    customerImage: {
        width: 50,
        height: 50,
        marginStart: 10,
        borderRadius: 25,
      },
    
});

//make this component available to the app
export default ListCustomerImage;

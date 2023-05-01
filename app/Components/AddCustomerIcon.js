//import liraries
import React, { Component } from 'react';
import camera from "../assets/images/camera.png";
import profileUserIcon from "../assets/images/profileUser.png";
import { View, Text, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native';
import { colors } from '../config/colors';

// create a component
const AddCustomerIcon = ({onPress, imageUri, containerStyle, imageStyle}) => {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
          <View style={[styles.imageInput, containerStyle]}>
            {!imageUri ? (
                <View style={{ alignItems: "center", position:"relative" }}>
                    <Image style={[{width:151, height:151},imageStyle]} source={profileUserIcon}/>
                    <Image style={styles.cameraIcon} source={camera}/>
                </View>
                ) : (
              <Image
                source={{ uri: imageUri }}
                style={styles.image}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
    );
};

// define your styles
const styles = StyleSheet.create({
    image:{
        width: 150,
        height: 150, 
        borderRadius: 75
      },
    
      cameraIcon:{
        width:40, 
        height:40,
        position:"absolute", 
        bottom:0, 
        right:0,
      },
    
      imageInput: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: colors.inputPlaceholder,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 40,
      },
});

//make this component available to the app
export default AddCustomerIcon;

//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {AntDesign, MaterialIcons} from "@expo/vector-icons";
import { colors } from '../config/colors';

// create a component
const PaymentSwipeActions = ({type, onDeletePress, onEditPress}) => {
    return (
        type === "Accepted" ? 
        <View style={styles.container}>
            <View style={[styles.editIconContainer,{marginLeft:5}]}> 
                <AntDesign name="edit" size={20} color={colors.white} onPress={onEditPress}/>
            </View>  
            <View style={styles.deleteIconContainer}> 
                <MaterialIcons name="delete-forever" size={22} color={colors.white} onPress={onDeletePress}/>
            </View>
        </View> 
        :
        <View style={styles.container}>
            <View style={styles.deleteIconContainer}> 
                <MaterialIcons name="delete-forever" size={22} color={colors.white} onPress={onDeletePress}/>
            </View>
            <View style={styles.editIconContainer}> 
                <AntDesign name="edit" size={20} color={colors.white} onPress={onEditPress}/>
            </View>  
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:"row"
    },

    deleteIconContainer:{
        alignItems:"center",
        justifyContent:"center",
        padding:8,
        backgroundColor:colors.red,
        borderRadius:20,
        marginRight:5
    },
    
    editIconContainer:{
        alignItems:"center",
        justifyContent:"center",
        padding:9,
        backgroundColor:colors.blue,
        borderRadius: 20,
        marginRight:5,
    },
});

//make this component available to the app
export default PaymentSwipeActions;

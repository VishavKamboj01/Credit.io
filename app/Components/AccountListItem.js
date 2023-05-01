//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../config/colors';
import AppText from './AppText';
import { TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native';
// create a component
const AccountListItem = (
    {title, subtitle, 
    Icon, buttonTitle, 
    onButtonPress, editable, 
    buttonDisable, inputValue,
    keyboardType}) => {
    return (
        <View style={styles.container}>
            <View style={styles.iconAndTitleContainer}>
                {Icon && <Icon/>}
                <View style={[{marginLeft:15, width:"100%"}, buttonTitle !== "" && {width:"65%"}]}>
                    <AppText style={{color:colors.white}} title={title}/>
                    <TextInput 
                        onChangeText={(text) => inputValue.setInputValue(text)}
                        editable={editable}
                        placeholder={subtitle}
                        placeholderTextColor={editable ? colors.iconColor : colors.lightWhite}
                        style={{fontSize:16, fontFamily:"Open-Sans-Medium", color:colors.white}}
                        keyboardType={keyboardType}
                        cursorColor={colors.purple}
                        />
                </View>
            </View>
            <TouchableWithoutFeedback onPress={!buttonDisable ? onButtonPress : () => {}}>
                <View style={styles.buttonTextContainer}>
                    <AppText style={[{marginRight:10,fontSize: 15, color:colors.purple}, buttonDisable && {color:colors.lightBlack}]} title={buttonTitle}/>
                </View>
            </TouchableWithoutFeedback>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width:"100%",
        height:70,
        flexDirection:"row",
        alignItems:"center",
        backgroundColor:colors.appBackground,
        justifyContent:"space-between",
        borderColor: colors.borderColor,
        borderBottomWidth:1,
        marginBottom:10,
        paddingBottom:5
    },

    iconAndTitleContainer:{
        flexDirection:"row", 
        alignItems:"center", 
        marginLeft:10
    },

    buttonTextContainer:{
        position:"absolute",
        right:10,
    }
});

//make this component available to the app
export default AccountListItem;

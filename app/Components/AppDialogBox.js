//import liraries
import React, {useState} from 'react';

import {Modal, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../config/colors';
import AppText from './AppText';
import TextButton from './TextButton';

// create a component
const AppDialogBox = ({
    visibility,
    setDismissAlert,
    title,
    description,
    cancelButtonTitle,
    submitButtonTitle,
    onCancelPress,
    onSubmitPress,
}) => {
    return (
    <View>
      <Modal
        visible={visibility}
        animationType={'fade'}
        transparent={true}
        statusBarTranslucent>
        <View
          style={styles.backgroundContainer}>
          <View
            style={styles.dialogBoxContainer}>

            <AppText style={{fontSize:20, fontFamily:"Poppins-SemiBold", color:colors.textColor}} title={title}/>
            <AppText style={{textAlign:"center", color:colors.iconColor, marginBottom:40}} title={description}/>
            <View style={[styles.buttonsContainer, !cancelButtonTitle && {justifyContent:"center"}]}>
                {cancelButtonTitle
                    &&
                    <TextButton 
                    textStyle={{color: colors.purple, fontSize:16}}
                    title={cancelButtonTitle}
                    onPress={onCancelPress}/>
                }

                <TextButton 
                    containerStyles={{backgroundColor: colors.purple}} 
                    softEdges={true} 
                    textStyle={{color:colors.purple, fontSize:16}}
                    title={submitButtonTitle ? submitButtonTitle : "OK"}
                    onPress={onSubmitPress}/>

            </View>
          </View>
        </View>
      </Modal>
    </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    backgroundContainer: {
        flex: 1,
        backgroundColor: 'rgba(36, 37, 41, 0.7)',
        alignItems: 'center',
        justifyContent: 'center',
    },

    dialogBoxContainer:{
        alignItems: 'center',
        backgroundColor: colors.appToolbar,
        height: 200,
        width: '90%',
        borderWidth: 0.5,
        borderColor:colors.borderColor,
        borderRadius: 20,
        elevation:1,
        padding:20,
        paddingTop:20,
        paddingBottom:20,
        justifyContent:"space-between"
    },

    buttonsContainer:{
        width:"80%",
        flexDirection:"row", 
        alignItems:"center", 
        justifyContent:"space-between"
    }

});

//make this component available to the app
export default AppDialogBox;

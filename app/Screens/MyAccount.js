import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import DatabaseAdapter from '../Database/DatabaseAdapter';
import { ToastAndroid } from 'react-native';
import { colors } from '../config/colors';
import LoaderButton from '../Components/LoaderButton';
import AddCustomerIcon from '../Components/AddCustomerIcon';

export default function MyAccount({currentUser, onRestorePress, navigation, onLogout}) {
  const [showRestoreIndicator, setShowRestoreIndicator] = useState(false);
  const [showAccountIndicator, setShowAccountIndicator] = useState(false);

  const handleRestorePress = async() => {
    //Restore Data
    try{
      setShowRestoreIndicator(true);
      setTimeout(async() => {
        await DatabaseAdapter.restoreCustomers();
        await DatabaseAdapter.restorePayments(); 
        ToastAndroid.show("Restore Successful!", ToastAndroid.SHORT);
        setShowRestoreIndicator(false);
        navigation.navigate("Home",{restore:true});
      },2000);
      
    }catch(err){
      console.log("ERROR IN MY ACCOUNT: ", err);
      setShowRestoreIndicator(false);
    }
    // onRestorePress();
  }

  const handleRemoveAccountPress = async() => {
    try{
      const res = await DatabaseAdapter.removeAccount(currentUser.user_id);
      console.log(res);
      onLogout(currentUser);
    }catch(err){
      console.log("ERROR while removing account ", err);
    }
  }

  const onAddImagePress = () => {
    console.log("add Image press");
  }

  return (
    <View style={styles.container}>
      <Text>{currentUser.user_name}</Text>
      <AddCustomerIcon 
        onPress={onAddImagePress}
        containerStyle={{width:130, height:130, marginTop:20}}
        imageStyle={{width:130, height:130}}/>
      <LoaderButton 
          title="RESTORE" 
          showIndicator={showRestoreIndicator}
          buttonStyle={styles.restoreButton}
          onPress={handleRestorePress}
          textStyle={{color:colors.black, fontFamily:"Open-Sans-SemiBold"}}/>

      <LoaderButton 
          title="REMOVE ACCOUNT" 
          showIndicator={showAccountIndicator}
          buttonStyle={[styles.restoreButton, {marginTop:20, backgroundColor:colors.red}]}
          onPress={handleRemoveAccountPress}
          textStyle={{color:colors.black, fontFamily:"Open-Sans-SemiBold"}}/> 
   
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:colors.appBackground,
      flex:1,
      alignItems:"center"
    },

    restoreButton:{
      width:"80%",
      padding:10,
      backgroundColor:colors.green,
      alignItems:"center",
      borderRadius:13
    }
})
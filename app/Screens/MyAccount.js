import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import DatabaseAdapter from '../Database/DatabaseAdapter';
import { ToastAndroid } from 'react-native';
import { colors } from '../config/colors';
import LoaderButton from '../Components/LoaderButton';

export default function MyAccount({currentUser, onRestorePress, navigation}) {
  const [showRestoreIndicator, setShowRestoreIndicator] = useState(false);

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

  return (
    <View style={styles.container}>
      <Text>{currentUser.user_name}</Text>
      <LoaderButton 
          title="RESTORE" 
          showIndicator={showRestoreIndicator}
          buttonStyle={styles.restoreButton}
          onPress={handleRestorePress}
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
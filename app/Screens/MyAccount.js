import { View, Text, StyleSheet, Button } from 'react-native'
import React, { useState } from 'react'
import DatabaseAdapter from '../Database/DatabaseAdapter';
import { ToastAndroid } from 'react-native';
import { colors } from '../config/colors';
import LoaderButton from '../Components/LoaderButton';
import AddCustomerIcon from '../Components/AddCustomerIcon';
import { FlatList } from 'react-native-gesture-handler';
import AccountListItem from '../Components/AccountListItem';
import {Entypo, FontAwesome, MaterialIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import { ScrollView } from 'react-native';
import Utility from '../UtilityFunctions/Utility';
import BackButtonInApp from '../Components/BackButtonInApp';
import AppDialogBox from '../Components/AppDialogBox';




export default function MyAccount({currentUser, onRestorePress, navigation, onLogout}) {
  const [restoreValue, setRestoreValue] = useState("");
  const [usernameValue, setUsernameValue] = useState("");
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [showDialogId, setShowDialogId] = useState(-1);


  const dialogBoxData = [
    {
      id:"1",
      title: "Save Username",
      description: "Are you sure you want to use " + usernameValue + " as your Username?",
      cancelButtonTitle: "NO",
      submitButtonTitle: "YES"
    },

    {
      id:"2",
      title: "Change Phone Number",
      description: "All your data will be moved to a new Phone Number. Are you sure you want to continue?",
      cancelButtonTitle: "NO",
      submitButtonTitle: "YES"
    },

    {
      id:"3",
      title: "Change Email",
      description: "Are you sure you want to change your email to " + emailValue + "?",
      cancelButtonTitle: "NO",
      submitButtonTitle: "YES"
    },

    {
      id:"4",
      title: "Restore",
      description: `All the deleted Customers and Transactions till ${restoreValue} ${restoreValue == 1 ? " day" : " days"} ago will be restored.`,
      cancelButtonTitle: "CANCEL",
      submitButtonTitle: "OK"
    },

    {
      id:"5",
      title: "Remove Account",
      description: "All your data will be removed and cannot be restored. Are you sure you want to continue?",
      cancelButtonTitle: "CANCEL",
      submitButtonTitle: "REMOVE"
    },
  ]


  const items = [
    {
      id:"1", 
      title:"Username", 
      subtitle:"Enter your Username", 
      leftIcon: () => <FontAwesome style={{marginLeft:6}} name="user" size={26} color={colors.purple}/>,
      buttonTitle: currentUser.user_name === "" ? "SAVE" : "CHANGE USERNAME",
      editable:true,
      buttonDisabled:usernameValue === "",
      value: {inputValue: usernameValue, setInputValue: setUsernameValue},
      keyboardType:"default",
      handleButtonPress: () => {setShowDialogId(0)}
    },
  
    {
      id:"2", 
      title:"Mobile Number", 
      subtitle:currentUser.phone_number,
      leftIcon: () => <Entypo name="mobile" size={26} color={colors.purple}/>,
      buttonTitle: "CHANGE NUMBER",
      editable:false,
      buttonDisabled:false,
      value: {inputValue: phoneNumberValue, setInputValue: setPhoneNumberValue},
      keyboardType:"phone-pad",
      handleButtonPress: () => {setShowDialogId(1)}
    },
  
    {
      id:"3", 
      title:"Email", 
      subtitle:currentUser.email, 
      leftIcon: () => <MaterialIcons name="email" size={26} color={colors.purple}/>,
      buttonTitle: "CHANGE EMAIL",
      editable:false,
      buttonDisabled:false,
      value: {inputValue: emailValue, setInputValue: setEmailValue},
      keyboardType:"email-address",
      handleButtonPress: () => {setShowDialogId(2)}
    },

    {
      id:"4", 
      title:"Restore", 
      subtitle:"Enter days (Max 30)", 
      leftIcon: () => <MaterialCommunityIcons name="restore" size={26} color={colors.purple}/>,
      buttonTitle: "RESTORE",
      editable:true,
      buttonDisabled: restoreValue === "",
      value: {inputValue: restoreValue, setInputValue: setRestoreValue},
      keyboardType:"number-pad",
      handleButtonPress: () => setShowDialogId(3)
    },

    {
      id:"5", 
      title:"Remove", 
      subtitle:"Delete your Account", 
      leftIcon: () => <Entypo name="trash" size={26} color={colors.purple}/>,
      buttonTitle: "REMOVE",
      editable:false,
      buttonDisabled:false,
      value: {inputValue: "", setInputValue: () => {}},
      keyboardType:"default",
      handleButtonPress: () => setShowDialogId(4)
    },
  ]
  
  
  const [showRestoreIndicator, setShowRestoreIndicator] = useState(false);
  const [showAccountIndicator, setShowAccountIndicator] = useState(false);


  const handleRestorePress = async() => {
    //Restore Data
    console.log("Restore called");
    try{
      if(restoreValue === "" || restoreValue <= 0 || restoreValue > 30){
        console.log("Value is not in correct range"); 
        return;
      }
      if(restoreValue.includes(".") || restoreValue.includes(",")){ 
        console.log("Value includes , or .");
        return;
      }

      console.log("RESTORING");

      let date = new Date();
      date.setDate(date.getDate()-restoreValue);
      let restoreDate = Utility.getDate(date);
      
      date = new Date();
      let today = Utility.getDate(date);
      
      setShowRestoreIndicator(true);
      setTimeout(async() => {
        await DatabaseAdapter.restoreCustomers(restoreDate, today);
        await DatabaseAdapter.restorePayments(restoreDate, today); 
        ToastAndroid.show("Restore Successful!", ToastAndroid.SHORT);
        setShowRestoreIndicator(false);
        navigation.navigate("Home",{restore:true});
      },2000);
      
    }catch(err){
      console.log("ERROR IN MY ACCOUNT: ", err);
      setShowRestoreIndicator(false);
    }
  }

  const handleRemoveAccountPress = async() => {
    try{
      const res = await DatabaseAdapter.removeAccount(currentUser.user_id);
      onLogout(currentUser);
    }catch(err){
      console.log("ERROR while removing account ", err);
    }
  }

  const onAddImagePress = () => {
    console.log("add Image press");
  }

  const handleDialogSubmitPress = () => {
    switch (showDialogId) {
      case 0:
        console.log("SAVE USERNAME");
        break;
      case 1:
        console.log("CHANGE PHONE NUMBER");
        break;
      case 2:
        console.log("CHANGE EMAIL");
        break;     
      case 3:
        handleRestorePress();
        break;
      case 4:
        console.log("REMOVE ACCOUNT");
        break;

      default:
        break;
    }
  }

  return (
    <View style={styles.container}>
      <BackButtonInApp onPress={() => navigation.navigate("Home")}/>
      <Text>{currentUser.user_name}</Text>
      <AddCustomerIcon 
        onPress={onAddImagePress}
        containerStyle={{width:130, height:130, marginTop:20}}
        imageStyle={{width:135, height:135}}/>


      <FlatList 
        style={{width:"100%", marginTop:20}}
        data={items}
        renderItem={({item}) => 
                      <AccountListItem 
                          title={item.title}
                          subtitle={item.subtitle}
                          Icon={item.leftIcon}
                          buttonTitle={item.buttonTitle}
                          onButtonPress={item.handleButtonPress}
                          editable={item.editable}
                          buttonDisable={item.buttonDisabled}
                          inputValue={item.value}
                          keyboardType={item.keyboardType}/>
                      }
        keyExtractor={(item) => item.id}
      />  

    {
      showDialogId !== -1 
      &&
      <AppDialogBox 
        visibility={showDialogId !== -1}
        title={dialogBoxData[showDialogId].title}
        description={dialogBoxData[showDialogId].description}
        submitButtonTitle= {dialogBoxData[showDialogId].submitButtonTitle}
        cancelButtonTitle={dialogBoxData[showDialogId].cancelButtonTitle}
        onCancelPress={() => setShowDialogId(-1)}
        onSubmitPress={handleDialogSubmitPress}
        />
    }
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      backgroundColor:colors.appBackground,
      width:"100%",
      height:"100%",
      alignItems:"center",
      paddingTop:40
    },

    restoreButton:{
      width:"80%",
      padding:10,
      backgroundColor:colors.green,
      alignItems:"center",
      borderRadius:13
    }
})
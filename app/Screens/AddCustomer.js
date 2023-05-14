import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { colors } from "../config/colors";
import AppInputField from "../Components/AppInputField";
import AppButton from "../Components/AppButton";
import DBAdapter from "../Database/DatabaseAdapter";
import BackButtonInApp from "../Components/BackButtonInApp";
import name from "../assets/images/name.png";
import phone from "../assets/images/phone.png";
import location from "../assets/images/location.png";
import interest from "../assets/images/interest_rate.png";


import AddCustomerIcon from "../Components/AddCustomerIcon";

export default function AddCustomer({ navigation, route, currentUser, additional }) {
  const [imageUri, setImageUri] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [interestRate, setInterestRate] = useState();

  const [id, setId] = useState(17);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) showAlert();
    return granted;
  };

  useEffect(() => {
    emptyInputFields();
  
    if (additional.route.params?.contact) {
      const contact = additional.route.params.contact;
      setFullName(contact.name);
      setPhoneNumber(contact.phoneNumbers[0].number);
    }

    if(route.params?.editCustomer){
      const customer = route.params.editCustomer;
      setFullName(customer.full_name);
      setPhoneNumber(customer.phone_number);
      setAddress(customer.address);
      setImageUri(customer.image_uri);
    }


  }, [route.params?.contact, route.params?.editCustomer]);

  const showAlert = () => {
    Alert.alert(
      "Permission Denied",
      "You need to enable camera permissions for this feature.",
      [
        {
          text: "Ok",
          style: "cancel",
        },
      ]
    );
  };


  const handleAddImagePress = async() => {
    const granted = await requestPermission();
    if(granted) pickImage();
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImageUri(result.assets[0].uri);
      }
    } catch (err) {
      new Error("An error occured while reading Image");
    }
  };

  const addCountryCodeWithNumber = () => {
    if(phoneNumber.charAt(0) !== '+') 
      return "+91 "+phoneNumber.trim();

    return "+91 "+phoneNumber.substring(3).trim();
  }

  const handleAddCustomerPress = () => {
    const customer = {
      full_name: fullName,
      phone_number: addCountryCodeWithNumber(),
      address: address,
      image_uri: imageUri,
    };

    const addCustomer = async () => {
      const result = await DBAdapter.createCustomer(currentUser, customer);
      
      if(result.customerAdded){
        const interest = {
          customer_id : result.success.insertId,
          user_id: currentUser.user_id,
          interestable_amount: 0,
          interest_rate: interestRate
        }

        const res = await DBAdapter.addInterest(interest);
        if(res.interestAdded) console.log("INTEREST ADDED");
      }

      navigation.navigate({
        name: "Home",
        params: { customer: customer },
      });
    };
    addCustomer();
    emptyInputFields();
  };

  const emptyInputFields = () => {
    setFullName("");
    setAddress("");
    setPhoneNumber("");
    setImageUri("");
    setInterestRate("");
  };

  const handleUpdateCustomerPress = async() => {
    const arg = {
      full_name: fullName,
      phone_number: addCountryCodeWithNumber(),
      address : address,
      image_uri : imageUri,
      customer_id: route.params.editCustomer.customer_id
    };

    await DBAdapter.updateCustomer(arg);
    navigation.navigate("Home");
  }

  return (
    <ScrollView style={styles.container}>
      <BackButtonInApp onPress={() => navigation.navigate("Contacts")}/>
      <View style={styles.dataInputsContainer}>

        <AddCustomerIcon imageUri={imageUri} onPress={handleAddImagePress}/>
        
        <AppInputField
          inputFieldStyle={{backgroundColor:colors.appToolbar,marginLeft:0}}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
          outIcon={name}
          outIconStyle={{width:39, height:39}}
        />

      <View style={{flexDirection:"row", width:"90%"}}>
          <AppInputField
            inputContainerStyles={{width:"60%"}}
            inputFieldStyle={{
                backgroundColor:colors.appToolbar,
                
              }}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={(text) => setPhoneNumber(text)}
            keyboardType="number-pad"
            outIcon={phone}
            outIconStyle={{width:33, height:33}}
          />
          <AppInputField
            inputContainerStyles={{width:"40%"}}
            inputFieldStyle={{backgroundColor:colors.appToolbar}}
            placeholder="Interest Rate"
            value={interestRate}
            onChangeText={(text) => setInterestRate(text)}
            keyboardType="number-pad"
            outIcon={interest}
            iconContainerStyle={{
              backgroundColor:colors.purple,
              borderRadius:17,
              alignItems:"center",
              justifyContent:"center"
            }}
            outIconStyle={{
              width:25, 
              height:25,
            }}
          />
      </View>

        <AppInputField
          inputFieldStyle={{backgroundColor:colors.appToolbar}}
          placeholder="Address"
          value={address}
          numberOfLines={4}
          multiline={true}
          textAlignVertical="top"
          onChangeText={(text) => setAddress(text)}
          outIcon={location}
          outIconStyle={{width:33, height:33}}
        />
        <AppButton
          style={styles.addCustomerButton}
          title={route.params?.editCustomer ? "UPDATE CUSTOMER" : "ADD CUSTOMER"}
          onPress={route.params?.editCustomer ? handleUpdateCustomerPress : handleAddCustomerPress}
          textStyle={{ fontFamily:"Open-Sans-Bold" }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    // justifyContent:"center",
    paddingBottom:50,
    backgroundColor: colors.appBackground,
  },

  dataInputsContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: 100,
  },

  

  addImage: {
    color: colors.iconColor,
  },

  addCustomerButton: {
    backgroundColor: colors.purple,
    width: "85%",
    marginTop: 35,
    marginBottom: 30,
    elevation:1,
  },
});

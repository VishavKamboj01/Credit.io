import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../config/colors";
import AppInputField from "../Components/AppInputField";
import AppButton from "../Components/AppButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import DBAdapter from "../Database/DatabaseAdapter";
import BackButtonInApp from "../Components/BackButtonInApp";

export default function AddCustomer({ navigation, route, currentUser, additional }) {
  const [imageUri, setImageUri] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const [id, setId] = useState(17);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) showAlert();
    return granted;
  };

  useEffect(() => {
    emptyInputFields();
    console.log(additional.route.params);
    
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

  const handleAddCustomerPress = () => {
    const customer = {
      full_name: fullName,
      phone_number: phoneNumber,
      address: address,
      image_uri: imageUri,
    };

    // setId(id + 1);
    // emptyInputFields();

    const addCustomer = async () => {
      const result = await DBAdapter.createCustomer(currentUser, customer);
      console.log("RESULT ",result);
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
  };

  const handleUpdateCustomerPress = async() => {
    const arg = {
      full_name: fullName,
      phone_number: phoneNumber,
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
        <TouchableWithoutFeedback onPress={handleAddImagePress}>
          <View style={styles.imageInput}>
            {!imageUri ? (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.addImage}>Add Image</Text>
                <MaterialCommunityIcons
                  name="plus"
                  color={colors.iconColor}
                  size={40}
                />
              </View>
            ) : (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 150, height: 150, borderRadius: 75 }}
              />
            )}
          </View>
        </TouchableWithoutFeedback>
        <AppInputField
          inputFieldStyle={{backgroundColor:colors.appToolbar,marginLeft:0}}
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />

        <AppInputField
          inputFieldStyle={{backgroundColor:colors.appToolbar,marginLeft:0}}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="number-pad"
        />
        <AppInputField
          inputFieldStyle={{backgroundColor:colors.appToolbar, marginLeft:0}}
          placeholder="Address"
          value={address}
          numberOfLines={4}
          multiline={true}
          textAlignVertical="top"
          onChangeText={(text) => setAddress(text)}
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

  imageInput: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: colors.appToolbar,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  addImage: {
    color: colors.iconColor,
  },

  addCustomerButton: {
    backgroundColor: colors.purple,
    width: "85%",
    marginTop: 20,
    marginBottom: 30,
    elevation:1,
  },
});

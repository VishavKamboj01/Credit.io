import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../config/colors";
import AppInputField from "../Components/AppInputField";
import AppButton from "../Components/AppButton";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import DBAdapter from "../Database/DatabaseAdapter";

export default function AddCustomer({ navigation, route, currentUser }) {
  const [canAskAgain, setCanAskAgain] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [id, setId] = useState(17);

  const requestPermission = async () => {
    const { granted } = await ImagePicker.requestCameraPermissionsAsync();
    if (!granted) showAlert();
  };

  useEffect(() => {
    requestPermission();
    if (route.params?.contact) {
      const contact = route.params.contact;
      setFullName(contact.name);
      setPhoneNumber(contact.phoneNumbers[0].number);
    }
  }, [canAskAgain, route.params?.contact]);

  const showAlert = () => {
    Alert.alert(
      "Permission Denied",
      "This action needs to access your gallery. Would you like to give us your permission?",
      [
        {
          text: "No",
          style: "cancel",
        },
        { text: "Yes", onPress: handleYesPress },
      ]
    );
  };

  const handleYesPress = () => {
    setCanAskAgain(true);
  };

  const handleAddImagePress = () => {
    pickImage();
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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.dataInputsContainer}>
        <TouchableWithoutFeedback onPress={handleAddImagePress}>
          <View style={styles.imageInput}>
            {!imageUri ? (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.addImage}>Add Image</Text>
                <MaterialCommunityIcons
                  name="plus"
                  color={colors.darkSilver}
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
          placeholder="Full Name"
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />

        <AppInputField
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={(text) => setPhoneNumber(text)}
          keyboardType="number-pad"
        />
        <AppInputField
          placeholder="Address"
          value={address}
          numberOfLines={4}
          multiline={true}
          textAlignVertical="top"
          onChangeText={(text) => setAddress(text)}
        />
        <AppButton
          style={styles.addCustomerButton}
          title="Add Customer"
          onPress={handleAddCustomerPress}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: colors.white,
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
    backgroundColor: colors.platinum,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
  },

  addImage: {
    color: colors.darkSilver,
  },

  addCustomerButton: {
    backgroundColor: colors.secondaryShade,
    width: "85%",
    marginTop: 20,
    borderWidth: 5,
    borderColor: colors.white,
    elevation: 10,
    marginBottom: 30,
  },
});

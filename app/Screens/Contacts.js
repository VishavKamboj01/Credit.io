import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Contact from "expo-contacts";

import AppComponent from "../Components/AppComponent";
import AppListItem from "../Components/AppListItem";
import {searchbarMenuItemsContacts} from "../Components/AppMenus";
import { colors } from "../config/colors";
import AppText from "../Components/AppText";
import { AntDesign } from "@expo/vector-icons";


export default function Contacts({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [accessPermission, setAccessPermission] = useState(false);
  const [selectedSearchbarMenuItem, setSelectedSearchbarMenuItem] = useState(1);
  const [searchbarOpen, setSearchbarOpen] = useState();

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    const status = await requestContactsPermission();
    if (status === "granted") {
      const { data } = await Contact.getContactsAsync();
      setContacts(data);
      setAccessPermission(true);
      return;
    }
    showAlert();
  };

  const requestContactsPermission = async () => {
    const { status } = await Contact.requestPermissionsAsync();
    return status;
  };

  const showAlert = () => {
    Alert.alert(
      "Permission Denied",
      "You need to enable contacts permissions for this feature.",
      [
        {
          text: "Ok",
          style: "cancel",
        },
      ]
    );
  };


  const handleAddPress = (id) => {
    const contact = contacts.filter((contact) => contact.id === id);
    navigation.navigate("AddCustomer", { contact: contact[0] });
  };

  const handleSearchBarMenuItemPress = (id) => {
    setSelectedSearchbarMenuItem(id);
  };

  const handleSearchbarTextChange = (text) => {};

  const handleSearchBarIconPress = () => {
    if(searchbarOpen) setSearchbarOpen(false);
    else setSearchbarOpen(true);
  }

  return (
    <AppComponent
      title="Contacts"
      searchbarPlaceholder="Search Contacts"
      searchBarMenuItems={searchbarMenuItemsContacts}
      onSearchbarMenuItemPress={handleSearchBarMenuItemPress}
      onSearchbarTextChange={handleSearchbarTextChange}
      selectedSearchbarMenuItem={selectedSearchbarMenuItem}
      onSearchbarIconPress={handleSearchBarIconPress}
    >
      <View style={styles.container}>
        {accessPermission ? 
        
          <FlatList
            data={contacts}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{alignItems:"center"}}
            renderItem={({ item }) => (
              <AppListItem
                name={item.name}
                subTitle={item.phoneNumbers[0].number}
                onItemPressed={() => handleAddPress(item.id)}
                Icon={() => <></>}
              ></AppListItem>
            )}
            
          ></FlatList>
          :
          <View style={{flex:1,alignItems:"center", justifyContent:"center", bottom:40}}> 
            <View>
              <AppText title="Go to setting >"></AppText> 
              <AppText title="Search for app permissions >"></AppText> 
              <AppText title="Select Credit.io >"></AppText> 
              <AppText title="Enable Contacts Permissions."></AppText>
            </View>
          </View>
        }
         <TouchableOpacity style={[styles.addManuallyButton,searchbarOpen && {bottom:182}]} onPress={() => navigation.navigate("AddCustomer")}>
          <AntDesign name="adduser" color={colors.black} size={20}/>
          <AppText title="ADD MANUALLY" style={{color:colors.black,marginTop:2 }}/>
         </TouchableOpacity>
      </View>
    </AppComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    width:"100%",
    height:"100%",
    position:"relative"
  },

  addManuallyButton:{
    position:"absolute",
    width:"40%",
    bottom:120,
    right:5,
    backgroundColor:colors.iconColor,
    borderRadius:40,
    alignItems:"center",
    justifyContent:"space-evenly",
    padding:12,
    flexDirection:"row",
  },
});

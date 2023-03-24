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
import Menus from "../Components/AppMenus";
import AppListItemSeperator from "../Components/AppListItemSeperator";
import Searchbar from "../Components/Searchbar";
import { colors } from "../config/colors";

export default function Contacts({ navigation }) {
  const [contacts, setContacts] = useState([]);
  const [accessPermission, setAccessPermission] = useState(false);
  const [selectedSearchbarMenuItem, setSelectedSearchbarMenuItem] = useState(1);

  useEffect(() => {
    getContacts();
  }, [accessPermission]);

  const getContacts = async () => {
    const status = await requestContactsPermission();
    if (status === "granted") {
      const { data } = await Contact.getContactsAsync();
      setContacts(data);
      return;
    }
    setAccessPermission(false);
    showAlert();
  };

  const requestContactsPermission = async () => {
    const { status } = await Contact.requestPermissionsAsync();
    return status;
  };

  const showAlert = () => {
    Alert.alert(
      "Permission Denied",
      "Without your permission we won't be able to access your contacts. Would you like to give us your permission?",
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
    setAccessPermission(true);
  };

  const handleAddPress = (id) => {
    const contact = contacts.filter((contact) => contact.id === id);
    navigation.navigate("AddCustomer", { contact: contact[0] });
  };

  const handleSearchBarMenuItemPress = (id) => {
    setSelectedSearchbarMenuItem(id);
  };

  const handleSearchbarTextChange = (text) => {};

  return (
    <AppComponent
      title="Contacts"
      searchbarPlaceholder="Search Contacts"
      searchBarMenuItems={Menus.searchbarMenuItemsContacts}
      onSearchbarMenuItemPress={handleSearchBarMenuItemPress}
      onSearchbarTextChange={handleSearchbarTextChange}
      selectedSearchbarMenuItem={selectedSearchbarMenuItem}
    >
      <View>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AppListItem
              name={item.name}
              subTitle={item.phoneNumbers[0].number}
              Icon={() => (
                <TouchableOpacity onPress={() => handleAddPress(item.id)}>
                  <Feather
                    name="plus-circle"
                    size={30}
                    color={colors.secondaryShade}
                    style={{ marginRight: 15 }}
                  />
                </TouchableOpacity>
              )}
            ></AppListItem>
          )}
          ItemSeparatorComponent={() => <AppListItemSeperator />}
        ></FlatList>
      </View>
    </AppComponent>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 84,
  },
});

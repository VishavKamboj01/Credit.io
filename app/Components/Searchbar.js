import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import { colors } from "../config/colors";
import SearchBarSeperator from "./SearchBarSeperator";
import AppContextMenu from "./AppContextMenu";

export default function Searchbar({
  onMenuItemPressed,
  onSearchTextChange,
  selectedMenuItem,
  menuItems,
  placeholder,
}) {
  return (
    <View style={{ width: "100%", backgroundColor: colors.appBackground }}>
      <View style={styles.container}>
        <MaterialIcons
          name="person-search"
          size={30}
          color={colors.iconColor}
          style={{ marginStart: 5 }}
        />
        <SearchBarSeperator />
        <TextInput
          style={styles.searchField}
          onChangeText={(text) => onSearchTextChange(text)}
          selectionColor={colors.purple}
          placeholder={placeholder}
          placeholderTextColor={colors.lightBlack}
          
        ></TextInput>
        <SearchBarSeperator />
        <AppContextMenu
          menuItems={menuItems}
          selectedMenuItem={selectedMenuItem}
          Icon={() => (
            <Ionicons
              name="ios-filter"
              size={22}
              color={colors.iconColor}
              style={{ marginStart: 2 }}
            />
          )}
          onMenuItemPressed={onMenuItemPressed}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "98%",
    borderRadius: 15,
    borderColor: colors.borderColor,
    borderWidth: 1,
    backgroundColor: colors.appToolbar,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    paddingTop:10,
    paddingBottom:10,
    marginTop:10,
    justifyContent:"center"
  },

  searchField: {
    width: "75%",
    height: "100%",
    paddingStart: 10,
    fontSize: 14,
    color:colors.white,
    fontFamily:"Open-Sans-SemiBold",
    letterSpacing:0.4
  },
});

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
    <View style={{ width: "100%", backgroundColor: colors.white }}>
      <View style={styles.container}>
        <MaterialIcons
          name="person-search"
          size={30}
          color={colors.secondaryShade}
          style={{ marginStart: 5 }}
        />
        <SearchBarSeperator />
        <TextInput
          style={styles.searchField}
          onChangeText={(text) => onSearchTextChange(text)}
          selectionColor={colors.secondaryShade}
          placeholder={placeholder}
        ></TextInput>
        <SearchBarSeperator />
        <AppContextMenu
          menuItems={menuItems}
          selectedMenuItem={selectedMenuItem}
          Icon={() => (
            <Ionicons
              name="ios-filter"
              size={25}
              color={colors.secondaryShade}
              style={{ marginStart: 4 }}
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
    width: "95%",
    height: 45,
    borderRadius: 10,
    borderColor: colors.platinum,
    borderWidth: 2,
    backgroundColor: colors.white,
    marginTop: 10,
    marginBottom: 5,
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
  },

  searchField: {
    width: "75%",
    height: "100%",
    paddingStart: 10,
    fontSize: 14,
  },
});

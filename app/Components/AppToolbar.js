import React, { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { AntDesign, Ionicons } from "@expo/vector-icons";

import { colors } from "../config/colors";
import SearchBarSeperator from "./SearchBarSeperator";
import AppContextMenu from "./AppContextMenu";

export default function AppToolbar({
  style,
  title,
  logo,
  children,
  menuItems,
  onMenuItemPressed,
  onSearchIconPress,
}) {
  return (
    <View style={[styles.ToolbarContainer, style]}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={onSearchIconPress}>
          <Ionicons name="search-circle" size={32} color={colors.white} />
        </TouchableOpacity>
        <SearchBarSeperator />
        <AppContextMenu
          menuItems={menuItems}
          Icon={() => (
            <AntDesign
              style={{ marginRight: 10 }}
              name="bars"
              color="white"
              size={30}
            ></AntDesign>
          )}
          onMenuItemPressed={onMenuItemPressed}
        />
      </View>

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  ToolbarContainer: {
    height: 80,
    width: "100%",
    flexDirection: "row",
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 24,
  },

  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },

  title: {
    color: "white",
    fontSize: 16,
    marginLeft: 10,
  },

  iconsContainer: {
    flexDirection: "row",
  },
});

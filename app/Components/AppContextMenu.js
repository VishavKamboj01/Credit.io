import React from "react";
import { StyleSheet, View, Text } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import { MaterialIcons } from "@expo/vector-icons";

import { colors } from "../config/colors";
import { ScrollView } from "react-native-gesture-handler";

export default function AppContextMenu({
  menuItems,
  Icon,
  onMenuItemPressed,
  selectedMenuItem,
}) {
  return (
    <View >
      {menuItems ? (
        <Menu>
          <MenuTrigger>
            <Icon />
          </MenuTrigger>
          <MenuOptions>
            {menuItems.map((item) => {
              return (
                <MenuOption
                  key={item.id}
                  onSelect={() => onMenuItemPressed(item.id)}
                  style={
                    item.id === selectedMenuItem
                      ? styles.selectedMenuItem
                      : styles.nonSelectedItem
                  }
                >
                  <MaterialIcons
                    name={item.icon}
                    size={20}
                    color={
                      item.id === selectedMenuItem ? colors.white : colors.red
                    }
                  />
                  <Text
                    style={
                      item.id === selectedMenuItem
                        ? styles.selectedItemText
                        : styles.nonSelectedItemText
                    }
                  >
                    {item.title}
                  </Text>
                </MenuOption>
              );
            })}
          </MenuOptions>
        </Menu>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  selectedMenuItem: {
    flexDirection: "row",
    backgroundColor: colors.secondary,
    color: colors.white,
    height: 40,
    alignItems: "center",
  },

  nonSelectedItem: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    borderBottomColor: colors.platinum,
    borderBottomWidth: 1,
  },

  selectedItemText: {
    color: colors.white,
    padding: 5,
    marginLeft: 10,
  },

  nonSelectedItemText: {
    marginLeft: 10,
    color: colors.black,
    padding: 5,
  },
});

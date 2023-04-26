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
          <MenuOptions customStyles={{optionsContainer:{borderRadius:12, borderWidth:1, borderColor:colors.borderColor}}}>
              {menuItems.map((item) => {
                return (
                  <MenuOption
                    key={item.id}
                    onSelect={() => onMenuItemPressed(item.id)}
                    style={[styles.menuItem,
                      item.id === selectedMenuItem
                        ? styles.selectedMenuItem
                        : styles.nonSelectedItem
                    ,item.id == 1 && {borderTopLeftRadius:10, borderTopRightRadius:10},
                  item.id == menuItems.length && {borderBottomLeftRadius:10, borderBottomRightRadius:10}]}
                  >
                    <MaterialIcons
                      name={item.icon}
                      size={20}
                      color={
                        item.id === selectedMenuItem ? colors.white : colors.iconColor
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

  menuItem:{
    flexDirection: "row",
    height: 40,
    alignItems: "center",
  },

  selectedMenuItem: {
    backgroundColor: colors.iconColor,
    color: colors.white,
  },

  nonSelectedItem: {
    backgroundColor:colors.appToolbar,
  },

  selectedItemText: {
    color: colors.white,
    padding: 5,
    marginLeft: 10,
  },

  nonSelectedItemText: {
    marginLeft: 10,
    color: colors.iconColor,
    padding: 5,
  },
});

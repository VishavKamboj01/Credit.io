import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import AppToolbar from "./AppToolbar";
import Searchbar from "./Searchbar";
import { colors } from "../config/colors";
import logo from "../assets/logo_white.png";

export default function AppComponent({
  title,
  children,
  searchBarMenuItems,
  searchbarPlaceholder,
  toolbarMenuItems,
  selectedSearchbarMenuItem,
  onSearchbarTextChange,
  onSearchbarMenuItemPress,
  onToolbarMenuItemPress,
  onSearchbarIconPress,
}) {
  const [isSearchIconPressed, setSearchIconPressed] = useState(false);

  const handleSearchIconPress = () => {
    if (isSearchIconPressed) setSearchIconPressed(false);
    else setSearchIconPressed(true);
    if(onSearchbarIconPress)
      onSearchbarIconPress();
  };

  return (
    <View style={styles.container}>
      <AppToolbar
        logo={logo}
        title={title}
        menuItems={toolbarMenuItems}
        onMenuItemPressed={onToolbarMenuItemPress}
        onSearchIconPress={handleSearchIconPress}
      />
      {isSearchIconPressed && 
        <Searchbar
          onMenuItemPressed={onSearchbarMenuItemPress}
          onSearchTextChange={onSearchbarTextChange}
          selectedMenuItem={selectedSearchbarMenuItem}
          menuItems={searchBarMenuItems}
          placeholder={searchbarPlaceholder}
    
      />
      }

      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.appBackground,
    alignItems:"center"
  },

});

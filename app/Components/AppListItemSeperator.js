import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../config/colors";

export default function AppListItemSeperator() {
  return (
    <View style={styles.container}>
      <View style={styles.seperatorLine}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    backgroundColor: colors.white,
  },

  seperatorLine: {
    width: "80%",
    height: 0.5,
    backgroundColor: colors.lightWhite,
  },
});

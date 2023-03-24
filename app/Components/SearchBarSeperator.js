import React from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../config/colors";
export default function SearchBarSeperator() {
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    width: 1,
    height: "70%",
    backgroundColor: colors.platinum,
    marginLeft: 5,
    marginRight: 5,
  },
});

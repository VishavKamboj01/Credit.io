import React from "react";
import { Platform, SafeAreaView, StyleSheet } from "react-native";
export default function Screen({ children }) {
  return <SafeAreaView style={styles.screen}>{children}</SafeAreaView>;
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Platform.OS === "android" ? 24 : 0,
  },
});

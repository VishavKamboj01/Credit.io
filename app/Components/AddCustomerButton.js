import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { colors } from "../config/colors";

export default function AddCustomerButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.addCustomerButton} onPress={onPress}>
      <AntDesign name="adduser" size={28} color={colors.black} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  addCustomerButton: {
    backgroundColor: colors.white,
    width: 70,
    height: 70,
    borderColor: colors.black,
    borderRadius: 40,
    borderWidth: 5,
    justifyContent: "center",
    bottom: 24,
    alignItems: "center",
    elevation: 20,
  },
});

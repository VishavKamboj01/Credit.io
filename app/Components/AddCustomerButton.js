import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
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
    backgroundColor: colors.purple,
    width: 70,
    height: 70,
    borderRadius: 40,
    justifyContent: "center",
    bottom: 28,
    alignItems: "center",
  },
});

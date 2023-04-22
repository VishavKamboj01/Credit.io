import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../config/colors";

export default function AppButton({
  title,
  onPress,
  color = "orange",
  style,
  textStyle,
  textColor = "white",
}) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }, style]}
      onPress={onPress}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "orange",
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  text: {
    color: colors.white,
    textTransform: "uppercase",
    fontFamily:"Poppins-Medium"
  },
});

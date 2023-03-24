import React from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../config/colors";

export default function AppInputField({
  title,
  selectionColor = colors.lightBlack,
  onChangeText,
  value,
  placeholder,
  keyboardType,
  icon,
  numberOfLines,
  multiline,
  error,
  ...props
}) {
  return (
    <View style={styles.inputContainer}>
      {/* <Text style={styles.inputFeildTitle}>{title}</Text> */}
      <View style={styles.inputFeildContainer}>
        <MaterialCommunityIcons
          name={icon}
          size={24}
          color={colors.darkSilver}
          style={{ marginStart: 10 }}
        />
        <TextInput
          style={multiline ? styles.multilineInputField : styles.inputField}
          onChangeText={onChangeText}
          selectionColor={colors.peach}
          value={value}
          placeholder={placeholder}
          keyboardType={keyboardType}
          numberOfLines={numberOfLines}
          multiline={multiline}
          placeholderTextColor={colors.darkSilver}
          {...props}
        ></TextInput>
      </View>
      {error && <Text style={styles.errorMessage}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: "85%",
    alignItems: "center",
    marginBottom: 10,
  },

  inputFeildContainer: {
    width: "100%",
    flexDirection: "row",
    overflow: "hidden",
    backgroundColor: colors.platinum,
    borderRadius: 25,
    elevation: 2,
    alignItems: "center",
  },

  inputFeildTitle: {
    color: colors.lightBlack,
    alignSelf: "flex-start",
    marginBottom: 10,
    marginTop: 20,
  },

  inputField: {
    width: "90%",
    height: 50,
    marginStart: 15,
    color: colors.lightBlack,
  },
  multilineInputField: {
    width: "90%",
    height: 100,
    marginStart: 15,
    paddingTop: 10,
    color: colors.lightBlack,
  },

  errorMessage: {
    color: colors.orange,
    alignSelf: "flex-start",
    marginStart: 10,
  },
});

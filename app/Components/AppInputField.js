import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../config/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import AppText from "./AppText";

let inputColor = colors.textFeildBackgroundColor;
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
  isTouched,
  onPressIn,
  onBlur,
  focused,
  inputFieldStyle,
  outIcon,
  outIconStyle,
  ...props
}) {

  return (
    <View style={styles.inputContainer}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={focused ? 
                  [styles.inputFeildContainer,{borderColor:colors.purple}, inputFieldStyle] : 
                  [styles.inputFeildContainer, inputFieldStyle]}>
          {icon && 
            <MaterialCommunityIcons
              name={icon}
              size={24}
              color={colors.inputPlaceholder}
              style={{ marginStart: 10 }}
            />
          }

          {outIcon && 
            <View style={styles.outIcon}>
              <Image style={outIconStyle} source={outIcon}/>
            </View>
          }

            <TextInput
              style={multiline ? [styles.multilineInputField, inputFieldStyle] : [styles.inputField, inputFieldStyle]}
              onChangeText={onChangeText}
              selectionColor={colors.peach}
              value={value}
              placeholder={placeholder}
              keyboardType={keyboardType}
              numberOfLines={numberOfLines}
              multiline={multiline}
              placeholderTextColor={colors.inputPlaceholder}
              onBlur={onBlur}
              onPressIn={onPressIn}
              {...props}
            ></TextInput>
          
        </View>
      </View>
      {(error && isTouched) && <AppText style={styles.errorMessage} title={error}/>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width:"100%",
    marginBottom: 10,
    alignItems:"center"
  },

  inputFeildContainer: {
    width: "90%",
    flexDirection: "row",
    borderRadius: 13,
    elevation:1,
    alignItems: "center",
    justifyContent:"center",
    backgroundColor: colors.textFeildBackgroundColor,
    borderWidth:0.5,
    borderColor: colors.textFeildBorderColor,
    position:"relative"
  },

  outIcon:{
    width:30, 
    height:30, 
    backgroundColor: colors.white, 
    position:"absolute",
    bottom:-10,
    left:-15,
    borderRadius:20,
    alignItems:"center",
    justifyContent:"center"
  },

  title:{
    color:colors.white,
    marginBottom:5,
    fontFamily:"Poppins-Medium"
  },

  inputField: {
    width: "85%",
    height: 50,
    marginStart: 15,
    color: colors.white,
    fontFamily:"Open-Sans-Medium",
    letterSpacing:0.4,
    borderRadius:13
  },
  multilineInputField: {
    width: "85%",
    height: 100,
    marginStart: 10,
    paddingTop: 10,
    color: colors.white,
    fontFamily:"Open-Sans-Medium",
    borderRadius:13

  },

  errorMessage: {
    color: colors.orange,
    alignSelf: "flex-start",
    marginStart: 25,
    marginTop:5
  },
});

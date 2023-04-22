import React from "react";
import { StyleSheet, ImageBackground, View, Image, Text } from "react-native";

import AppButton from "../Components/AppButton.js";

import loginBackground from "../assets/loginBackground.jpg";
import grid from "../assets/images/grid1.png";
import logoIcon from "../assets/logo_white.png";
import { colors } from "../config/colors.js";
import {verifyUser} from "../auth/firebaseAuth.js";

import credit from "../assets/images/credit.png";

export default function StartUp({ navigation }) {


  const handleSignUpPress = () => {
    navigation.navigate("SignUp", { name: "SignUp" });
  };

  const handleLoginPress = () => {
    navigation.navigate("Login", { name: "Login" });
  };

  return (
    <ImageBackground style={styles.background} source={grid}>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Manage</Text>
          <Text style={styles.title}>your</Text>
          <Text style={styles.title}>finances</Text>
          <Text style={[styles.title,{color:colors.green}]}>simply</Text>
          <Text style={styles.subtitle}>From easy money management, to flawlesly calculating interest.</Text>
          
        </View>
        <View style={styles.buttonContainer}>
          <AppButton
            style={styles.signUpButton}
            title="Sign Up"
            onPress={handleSignUpPress}
            textColor={colors.white}
          ></AppButton>
          <AppButton
            style={styles.loginButton}
            title="Login"
            textColor={colors.white}
            onPress={handleLoginPress}
          ></AppButton>
        </View>
      </View>
    
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex:1,
    resizeMode:"contain",
  },

  container:{
    flex:1,
    backgroundColor:"rgba(0,0,0,0.4)"
  },

  titleContainer:{
    flex:1,
    marginTop:70,
    marginLeft:25
  },

  title:{
    fontSize:55,
    color:colors.white,
    fontFamily:"Poppins-Medium",
    lineHeight:65,
  },

  subtitle:{
    color:colors.silver,
    fontSize:15,
    fontFamily:"Poppins-Medium",
    width:"80%",
    marginTop:30
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height:"20%",
    bottom:30
  },

  loginButton: {
    backgroundColor: colors.green,
    width: "80%",
  },

  signUpButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: colors.white,
    borderStyle: "solid",
    width: "80%",
  },
});

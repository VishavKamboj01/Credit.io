import React from "react";
import { StyleSheet, ImageBackground, View, Image, Text } from "react-native";

import AppButton from "../Components/AppButton.js";

import loginBackground from "../assets/loginBackground.jpg";
import logoIcon from "../assets/logo_white.png";
import { colors } from "../config/colors.js";

export default function StartUp({ navigation }) {
  const handleSignUpPress = () => {
    navigation.navigate("SignUp", { name: "SignUp" });
  };

  const handleLoginPress = () => {
    navigation.navigate("Login", { name: "Login" });
  };

  return (
    <ImageBackground style={styles.background} source={loginBackground}>
      <View style={styles.backgroundColor}>
        <View style={styles.content}>
          <Image source={logoIcon} style={styles.logo} />
          <Text style={styles.title}>Credit.IO</Text>
          <Text style={styles.subTitle}>
            Manage your credit details like a pro
          </Text>
          <View style={styles.buttonContainer}>
            <AppButton
              style={styles.signUpButton}
              title="Sign Up"
              onPress={handleSignUpPress}
            ></AppButton>
            <AppButton
              style={styles.loginButton}
              title="Login"
              textColor={colors.red}
              onPress={handleLoginPress}
            ></AppButton>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },

  backgroundColor: {
    flex: 1,
    backgroundColor: "rgba(231, 76, 60,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  logo: {
    width: 80,
    height: 80,
    marginBottom: 5,
  },

  title: {
    color: "white",
    fontSize: 28,
    marginBottom: 10,
  },

  subTitle: {
    color: colors.lightWhite,
    fontSize: 16,
    marginBottom: 100,
  },

  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  loginButton: {
    backgroundColor: "white",
    width: "80%",
    fontWeight: "bold",
  },

  signUpButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "white",
    borderStyle: "solid",
    width: "80%",
    fontWeight: "bold",
  },
});

import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  TextInput,
  Text,
} from "react-native";

import AppInputField from "../Components/AppInputField";
import AppButton from "../Components/AppButton";
import DBAdapter from "../Database/DatabaseAdapter";
import loginBackground from "../assets/loginBackground.jpg";
import logoIcon from "../assets/logo_red.png";
import { colors } from "../config/colors";
import { Formik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  user_name: Yup.string()
    .required("Username or Email is required")
    .label("Username"),
  password: Yup.string().required().label("Password"),
});

export default function Login({ onLogin }) {
  const handleSubmit = (values) => {
    const loginUser = async () => {
      const userLoggedIn = await DBAdapter.loginUser(values);
      if (userLoggedIn) onLogin();
      else alert("Invalid Username or Password!");
    };
    loginUser();
    //Check if the user exists in the database if yes then log the user in
    // and navigate to home screen
    //else decline the request...
  };

  return (
    <ImageBackground style={styles.background} source={loginBackground}>
      <View style={styles.backgroundColor}>
        <View style={styles.container}>
          <Image source={logoIcon} style={styles.logo} />
          <Formik
            initialValues={{ user_name: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleSubmit, errors }) => (
              <>
                <AppInputField
                  icon="account"
                  placeholder="Username or Email"
                  onChangeText={handleChange("user_name")}
                  error={errors.user_name}
                />
                <AppInputField
                  icon="lock"
                  placeholder="Password"
                  onChangeText={handleChange("password")}
                  secureTextEntry={true}
                  error={errors.password}
                />
                <Text style={styles.forgetPassword}>Forget Password?</Text>
                <AppButton
                  style={styles.loginButton}
                  color={colors.red}
                  title="LOGIN"
                  onPress={handleSubmit}
                />
              </>
            )}
          </Formik>
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
    backgroundColor: "rgba(255, 255, 255,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  logo: {
    width: 80,
    height: 80,
    marginBottom: 70,
  },

  forgetPassword: {
    color: colors.lightBlack,
    textDecorationStyle: "solid",
    textDecorationLine: "underline",
    marginTop: 15,
    alignSelf: "flex-end",
    marginRight: 35,
  },

  loginButton: {
    width: "85%",
    marginTop: 30,
    elevation: 10,
  },
});

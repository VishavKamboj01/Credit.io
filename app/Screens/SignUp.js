import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  Image,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import AppInputField from "../Components/AppInputField";
import AppButton from "../Components/AppButton";
import DBAdapter from "../Database/DatabaseAdapter";
import loginBackground from "../assets/loginBackground.jpg";
import logoIcon from "../assets/logo_red.png";
import { colors } from "../config/colors";

const validationSchema = Yup.object().shape({
  full_name: Yup.string().required().min(5).max(50).label("FullName"),
  user_name: Yup.string().required().max(50).label("Username"),
  email: Yup.string().required().max(255).email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
  confirmPassword: Yup.string()
    .required()
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm Password must match with Password feild"
    )
    .label("Confirm Password"),
});

export default function SignUp({ navigation, onUserSignUp }) {
  const handleSubmit = (values) => {
    //Save Details in the database and login the user
    const checkIfUserExists = async () => {
      try {
        const { userExists } = await DBAdapter.checkIsUserExists(
          values.user_name
        );

        if (!userExists) {
          DBAdapter.addUser(values);
          onUserSignUp(values);
        } else
          alert(
            "User with same Username already exists. Change your Username and try again."
          );
      } catch (error) {
        console.log(error);
      }
    };
    checkIfUserExists();
  };

  return (
    <ImageBackground style={styles.background} source={loginBackground}>
      <View style={styles.backgroundColor}>
        <ScrollView>
          <View style={styles.container}>
            <Image source={logoIcon} style={styles.logo} />
            <Formik
              initialValues={{
                full_name: "",
                user_name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ handleChange, handleSubmit, errors }) => (
                <>
                  <AppInputField
                    icon="account"
                    placeholder="Full Name *"
                    onChangeText={handleChange("full_name")}
                    error={errors.full_name}
                  />
                  <AppInputField
                    icon="account-circle"
                    placeholder="Username *"
                    onChangeText={handleChange("user_name")}
                    error={errors.user_name}
                  />
                  <AppInputField
                    icon="email"
                    placeholder="Email Address *"
                    onChangeText={handleChange("email")}
                    error={errors.email}
                  />
                  <AppInputField
                    icon="lock"
                    placeholder="Password *"
                    onChangeText={handleChange("password")}
                    secureTextEntry={true}
                    error={errors.password}
                  />
                  <AppInputField
                    icon="lock"
                    placeholder="Confirm Password *"
                    onChangeText={handleChange("confirmPassword")}
                    secureTextEntry={true}
                    error={errors.confirmPassword}
                  />
                  <AppButton
                    style={styles.signUpButton}
                    color={colors.red}
                    title="Sign Up"
                    onPress={handleSubmit}
                  />
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },

  backgroundColor: {
    height: "100%",
    backgroundColor: "rgba(255, 255, 255,0.8)",
  },

  container: {
    width: "100%",
    height: "120%",
    alignItems: "center",
    justifyContent: "center",
  },

  logo: {
    width: 80,
    height: 80,
    marginBottom: 60,
  },

  signUpButton: {
    width: "85%",
    marginTop: 40,
    elevation: 10,
    marginBottom: "50%",
  },
});

import React, { useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
} from "react-native";

import AppInputField from "../Components/AppInputField";
import DBAdapter from "../Database/DatabaseAdapter";
import grid from "../assets/images/grid1.png";
import { colors } from "../config/colors";
import { Formik } from "formik";
import * as Yup from "yup";
import SignupHeader from "../Components/SignupHeader";
import GradientButton from "../Components/GradientButton";

const validationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .required()
    .label("Phone Number"),
  password: Yup.string().required().label("Password"),
});

export default function Login({ onLogin, navigation }) {  

  const [showLoader, setShowLoader] = useState(false);

  const handleSubmit = async(values) => {
    if(showLoader) return;

    setShowLoader(true);
    loginUser(values);
  };

  const loginUser = async (values) => {
    const userLoggedIn = await DBAdapter.loginUser(values);
    setShowLoader(false);
    if (userLoggedIn) onLogin();
    else alert("Invalid Phone Number or Password!");
  };

  const handleonBackPress = () => {
    navigation.navigate("StartUp");
  }

  return (
      <ImageBackground source={grid} style={styles.background}>
          <SignupHeader title="Login" onBackPress={handleonBackPress}/>
        <View style={styles.container}>
          <Formik
            initialValues={{ phone_number: "", password: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleSubmit, errors }) => (
              <>
                <View style={styles.phoneContainer}>
                  
                <AppInputField
                  icon="phone"
                  placeholder="Enter your Phone with Country Code"
                  onChangeText={handleChange("phone_number")}
                  error={errors.phone_number}
                  title="Phone Number"
                />

                </View>
                <AppInputField
                  icon="lock"
                  placeholder="Enter your password"
                  onChangeText={handleChange("password")}
                  secureTextEntry={true}
                  error={errors.password}
                  title="Password"
                />
                {/* <Text style={styles.forgetPassword}>Forget Password?</Text> */}
                <GradientButton 
                  colorsArray={["#ddffbb","#afc170"]} 
                  title="LOGIN"
                  buttonStyles={{marginTop:30}}
                  onPress={handleSubmit}
                  isLoader={true}
                  showIndicator={showLoader}
                />
              </>
            )}
          </Formik>
        </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex:1,
  },

  container: {
    alignItems: "center",
    flex:1,
    backgroundColor:"rgba(0,0,0,0.4)",
    paddingTop:20
  },


  forgetPassword: {
    color: colors.platinum,
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

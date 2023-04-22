import React, { useReducer, useState } from "react";
import {
  StyleSheet,
  ImageBackground,
  View,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import AppInputField from "../Components/AppInputField";
import DBAdapter from "../Database/DatabaseAdapter";
import { colors } from "../config/colors";
import grid from "../assets/images/grid1.png";
import SignupHeader from "../Components/SignupHeader";
import SignupPhoneCard from "../Components/SignupPhoneCard";
import GradientButton from "../Components/GradientButton";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().max(255).email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

export default function SignUp({ navigation, onUserSignUp }) {

  const [isPhoneVerified, setPhoneVerified] = useState(true);
  const [verifiedPhone, setVerifiedPhone] = useState("");
  const [verifiedCountry, setVerifiedCountry] = useState("");


  const handleFormSubmit = (values) => {
    //Save Details in the database and login the user
    if(isPhoneVerified){ //Not verified -> Opposite Condition
      setPhoneVerified(false);
      console.log("NOT VERIFIED");
      return;
    } 
    
     addUser(values);
  };

  const addUser = async(values) => {
    try{
      const { userExists } = await DBAdapter.checkIsUserExists(values.email);
      if(userExists){
         alert(
          "User with same Email already exists. Change your Email and try again."
        );
        return;
      }

      values.phone_number = verifiedPhone;
      values.country = verifiedCountry;
      DBAdapter.addUser(values);
      onUserSignUp(values);
    }catch(error){
      console.log("ERROR IN SIGN UP ", error);
    }
  }

  const handleBackPress = () => {
    navigation.navigate("StartUp");
  }


  const handleOnVerificationSuccess = (phoneNumber, country) => {
    setPhoneVerified(false);
    setVerifiedPhone(phoneNumber);
    setVerifiedCountry(country);
  }

  return (
    <ImageBackground source={grid} style={styles.background}>
        <SignupHeader onBackPress={handleBackPress} title="Sign up"/>
        <ScrollView style={styles.scrollView}>
            <Formik
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => handleFormSubmit(values)}
              validationSchema={validationSchema}
            >
              {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
                <View style={styles.formContainer}>
                  <AppInputField
                    title="Email"
                    icon="email"
                    placeholder="tim@credit.io.com"
                    onChangeText={handleChange("email")}
                    error={errors.email}
                    onBlur={() => setFieldTouched("email")}
                    isTouched={touched.email}
                  />
                
                  <SignupPhoneCard 
                    onVerificationSuccess={handleOnVerificationSuccess}
                    isPhoneVerified={isPhoneVerified}/>
                  
                  <AppInputField
                    title="Password"
                    icon="lock"
                    placeholder="Pick a Strong Password"
                    onChangeText={handleChange("password")}
                    secureTextEntry={true}
                    error={errors.password}
                    onBlur={() => setFieldTouched("password")}
                    isTouched={touched.password}
                  />
                  
                  <GradientButton 
                    colorsArray={["#ddffbb","#afc170"]} 
                    title="SIGN UP"
                    onPress={handleSubmit}
                  />

                </View>
              )}
            </Formik>
        </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex:1,
    justifyContent: "center",
    alignItems:"center",
  },
  
  scrollView: {
    flex:1,
    backgroundColor:"rgba(0,0,0,0.4)",
    width:"100%"
  },

  formContainer: {
    flex:1,
    alignItems:"center",
    justifyContent:'center',
  },
});

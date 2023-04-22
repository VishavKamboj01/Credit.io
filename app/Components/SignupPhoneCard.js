//import liraries
import React, { useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../config/colors';
import { TextInput } from 'react-native-gesture-handler';
import { countryCodesMenuItems } from "../Components/AppMenus"
import AppText from './AppText';
import LoaderButton from './LoaderButton';
import { sendOTP, verifyOTP } from '../auth/firebaseAuth';
import { getAuth } from 'firebase/auth';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import { firebaseConfig, app } from '../firebase/config';
import DatabaseAdapter from '../Database/DatabaseAdapter';
import CountryPicker from './CountryPicker.js';

// create a component

const SignupPhoneCard = ({onVerificationSuccess, isPhoneVerified}) => {
    const [showOTPIndicator, setShowOTPIndicator] = useState(false);
    const [showValidateIndicator, setShowValidateIndicator] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [countryCode, setCountryCode] = useState("+91");
    const [country, setCountry] = useState("India");
    const [OTPSent, setOTPSent] = useState(false);
    const [phoneValidated, setPhoneValidated] = useState();
    const [phoneError, setPhoneError] = useState("");
    const [otpError, setOtpError] = useState("");
    const [otp, setOtp] = useState();

    //Firebase
    const auth = getAuth(app);
    const recaptchaRef = useRef();
    const [verificationId, setVerificationId] = useState();



    const handlePickerItemChange = (value, index) => {

        const obj = countryCodesMenuItems.filter((object) => object.id == index);
        setCountry(obj.title);
        setCountryCode(value);
    }

    const handleSendOTPPress = async() => {
        if(phoneNumber === "") return;
        const phoneNumberWithCode = countryCode+phoneNumber;

        const {userExists} = await DatabaseAdapter.checkIsUserExists(phoneNumberWithCode);
        if(userExists) return alert("User with the same phone number already exists.");

        console.log("PHONE: ",phoneNumberWithCode);
        setShowOTPIndicator(true);

        try{
            const verificationId = await sendOTP(phoneNumberWithCode, recaptchaRef, auth);
            setOTPSent(true);
            setVerificationId(verificationId);
            setShowOTPIndicator(false);

        }catch(error){
            setPhoneError(error.message);
            setShowOTPIndicator(false);
        }
        
    }

    const handleValidatePress = async() => {
        if(!otp) return;
        setShowValidateIndicator(true);
        
        try{
            await verifyOTP(otp, verificationId, auth);
            
            setShowValidateIndicator(false);
            setPhoneValidated(true);
            onVerificationSuccess(countryCode+phoneNumber, country);
        }catch(error){
            setOtpError(error.message);
            setShowValidateIndicator(false);
        }
    }



    return (
        <View style={phoneValidated ? [styles.verifiedPhoneContainer] : styles.container}>
            
            <AppText style={phoneValidated ? [styles.title, { color:colors.black}] : styles.title} title={phoneValidated ? "Phone Number Verified" : "Verify Phone Number"}/>
            {(!phoneValidated) && 
            <View style={{flex:1, paddingTop:10}}>
                <FirebaseRecaptchaVerifierModal
                ref={recaptchaRef}
                firebaseConfig={firebaseConfig}
                />
                <View style={{display:"flex", flexDirection:"row", width:"100%"}}>
                    <View style={[styles.inputContainer,{width:"20%", marginRight:10, paddingLeft:0}]}>
                        <AppText style={styles.codeText} title={countryCode}/>
                        <CountryPicker items={countryCodesMenuItems} 
                            onValueChange={(value, index) => handlePickerItemChange(value, index)}/>  
                    </View>
                    <View style={styles.inputContainer}>
                        <TextInput 
                            style={[styles.textFeild, {width:"65%"}]} 
                            selectionColor={colors.green}
                            placeholder='Type your number'
                            placeholderTextColor={colors.inputPlaceholder}
                            keyboardType='number-pad'
                            value={phoneNumber}
                            onChangeText={(value) => {setPhoneError(""); setPhoneNumber(value)}}
                            />

                        <LoaderButton showIndicator={showOTPIndicator} 
                            onPress={handleSendOTPPress} 
                            textStyle={{color:colors.black}} 
                            buttonStyle={styles.sendOTPButton}
                            title="Send OTP"/>    
                    </View>
                </View>
                    {!isPhoneVerified && <AppText style={{color:colors.red, marginTop:5}}
                     title="Phone Number Verification is Required."/>}
                {phoneError && <AppText title={phoneError} style={{color:colors.red, marginTop:10}}/>}
                {OTPSent && 
                
                    <View style={styles.verifyOTPContainer}>
                        <AppText style={{marginBottom:10}} title="Enter OTP"/>
                    
                        <TextInput 
                            style={styles.otpInput} 
                            cursorColor={colors.inputPlaceholder} 
                            keyboardType='numeric'
                            onChangeText={(value) =>{setOtpError(""); setOtp(value)}}/>

                        {otpError && <AppText title={otpError} style={{color:colors.red, paddingTop:10}}/>}    
                        <LoaderButton showIndicator={showValidateIndicator} 
                            onPress={handleValidatePress} 
                            textStyle={{color:colors.black}} 
                            buttonStyle={[styles.sendOTPButton, {height:50, width:"90%", marginTop:25, marginRight:0}]}
                            title="VALIDATE"/>
                    </View>
                }
                </View>
            }
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        padding:10,
        backgroundColor:colors.textFeildBackgroundColor,
        borderWidth:1,
        borderRadius:13,
        borderColor:colors.textFeildBorderColor,
        flex:1,
        paddingBottom:20,
        marginBottom:10
    },

    verifiedPhoneContainer:{
        backgroundColor:colors.green, 
        width:"90%",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        marginTop:10,
        marginBottom:20
    },

    title:{
        color: colors.white,
        fontFamily:"Poppins-SemiBold",
        paddingTop:5,
        paddingBottom:5
    },

    inputContainer:{
        width:"75%",
        height:45,
        backgroundColor:"#171717",
        borderColor:colors.textFeildBorderColor,
        borderWidth:1,
        borderRadius:13,
        justifyContent:"center",
        flexDirection:"row",
        alignItems:"center",
        paddingLeft:10
    },

    textFeild:{
        width:"100%",
        height:"90%",
        color:colors.white,
        fontFamily:"Open-Sans-Regular",
    },

    codeText:{
        color:colors.white, 
        marginLeft:10,
        fontFamily:"Open-Sans-Bold"
    },

    sendOTPButton:{
        width:"35%",
        height:"90%",
        backgroundColor:colors.purple,
        borderRadius:12,
        alignItems:"center",
        justifyContent:"center",
        marginRight:2
    },

    verifyOTPContainer: {
        alignItems:"center",
        justifyContent:"center",
        marginTop:20,
        flex:1
    },

    otpInput: {
        backgroundColor:"#171717",
        borderWidth:2,
        borderColor: colors.textFeildBorderColor,
        borderRadius:10,
        padding:5,
        fontFamily: "Open-Sans-SemiBold",
        fontSize:28,
        color: colors.white,
        textAlign:"center",
        width:"90%",
        letterSpacing:25,
    },
});

//make this component available to the app
export default SignupPhoneCard;

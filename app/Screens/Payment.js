//import liraries
import React, { Component, useEffect, useState } from 'react';
import { Image, Keyboard } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../config/colors';
import { TouchableNativeFeedback } from 'react-native';
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { MaterialCommunityIcons, FontAwesome, Ionicons } from "@expo/vector-icons";
import AppDatePicker from '../Components/AppDatePicker';
import Utility from '../UtilityFunctions/Utility';
import AppText from '../Components/AppText';
import right from "../assets/images/right.png";
import { ToastAndroid } from 'react-native';
import DatabaseAdapter from '../Database/DatabaseAdapter';
import BackButtonInApp from '../Components/BackButtonInApp';
import customerImage from "../assets/customerImage.png";

const numpad = ["1","2","3","4","5","6","7","8","9",".","0","enter"]
// create a component
const Payment = ({name, image, navigation, additional}) => {

    const [inputValue, setInputValue] = useState("");
    const [note, setNote] = useState("");
    const [date, setDate] = useState(new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [noteFieldFocused, setNoteFieldFocused] = useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = useState(false);

    useEffect(() => {
       const keyboardDidShowListener = Keyboard.addListener(
         'keyboardDidShow',
         () => {
           setKeyboardVisible(true); // or some other action
         }
       );
       const keyboardDidHideListener = Keyboard.addListener(
         'keyboardDidHide',
         () => {
           setKeyboardVisible(false); // or some other action
         }
       );
   
       return () => {
         keyboardDidHideListener.remove();
         keyboardDidShowListener.remove();
       };
     }, []);




    const handleDatePress = () => {
        setDatePickerVisible(true)
    }

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDatePickerVisible(false);
        setDate(currentDate);
    };

    const handleNumpadButtonPress = (num) => {
        if(num !== "enter"){
            return setInputValue(inputValue+num);
        }
        
        if(inputValue === "") return;
        //Do the payment and clear the fields
        const paymentInfo = {
            amount: inputValue,
            date: date,
            note: note
        }

        const {trigger, customer_id, user_id} = additional.route.params;
        addPayment(paymentInfo, trigger, customer_id, user_id);
        navigation.navigate("CustomerTransactions", {paymentAdded:true});
    }

    const addPayment = async(paymentInfo, trigger, customer_id, user_id) => {
        const payment = {
        amount: paymentInfo.amount,
        payment_date_time: paymentInfo.date,
        payment_date: Utility.getDate(paymentInfo.date),
        payment_type: trigger,
        payment_note: note,
        customer_id,
        user_id
        };

        try{
        const result = await DatabaseAdapter.addPayment(payment);
        ToastAndroid.show("Success!", ToastAndroid.LONG);
        }catch(err){
            console.log("ERROR in Payment", err);
            ToastAndroid.show("Failed!", ToastAndroid.LONG);
        }

        // setPaymentMade(paymentMade+1);
      };

    const handleBackSpacePress = () => {
        if(inputValue === "") return;

        const value = inputValue;
        const spliced = value.slice(0, value.length-1);
        setInputValue(spliced);
    }

    return (
        <View style={styles.container}>
            <BackButtonInApp onPress={() => navigation.navigate("CustomerTransactions")}/>
        
            <View style={styles.imageAndNameContainer}>
                {image.length === 0 ? 
                    <Image style={styles.image} source={customerImage}/>
                    :
                    <Image style={styles.image} source={{uri: image}}/>
                }
                <Text style={styles.name}>{name}</Text>
                <TouchableWithoutFeedback style={styles.calenderIconContainer} onPress={handleDatePress}>
                    <Ionicons name="ios-calendar-outline" size={25} color="#9a99a1"/>
                    <AppText title={Utility.getReadableDate(date)} style={{marginLeft:15, marginTop:3, color:"#9a99a1"}}/>
                </TouchableWithoutFeedback>
            </View>
            <View style={styles.numpadAndFeildContainer}>
                <View style={styles.inputAndIconContainer}>
                    <MaterialCommunityIcons name='currency-inr' size={40} color={colors.purple}/>
                    <TextInput 
                        value={inputValue} 
                        onFocus={() => Keyboard.dismiss()} 
                        style={[styles.input, {paddingRight:40}]} 
                        showSoftInputOnFocus={false} 
                        cursorColor={colors.purple}/>
                        
                    <Ionicons 
                        onPress={handleBackSpacePress}
                        style={{position:"absolute", right:15}}
                        name='backspace' 
                        size={28} 
                        color={colors.lightBlack}/>    
                </View>
                <View style={isKeyboardVisible ? [styles.inputAndIconContainer,{marginTop:10, marginBottom:10}] : [styles.inputAndIconContainer,{marginTop:10}]}>
                    <FontAwesome name='pencil-square-o' size={30} color={colors.purple}/>
                    <TextInput 
                        style={[styles.input,{fontSize:18,paddingTop:9,paddingBottom:9}]}  
                        cursorColor={colors.purple}
                        value={note}
                        placeholder='Add a note.'
                        placeholderTextColor={colors.lightBlack}
                        onChangeText={(text) => setNote(text)}/>
                </View>
                
                {!isKeyboardVisible && 
                    <View style={styles.numpadContainer}>
                        {numpad.map( (num) => 
                            <TouchableNativeFeedback key={num} onPress={() => handleNumpadButtonPress(num)}>
                                <View style = 
                                    {num === "enter" ? [styles.numpadButton,inputValue !== "" ? {backgroundColor:colors.purple} : {backgroundColor:"#33333d"}]:
                                        styles.numpadButton}>
                                    {num === "enter" ? 
                                    <Image source={uri=right} style={{width:25, height:25}}/>: 
                                    <AppText title={num} style={{fontSize:23, fontFamily:"Open-Sans-SemiBold", color:"#dad8e0"}}/>
                                    }
                                </View>
                            </TouchableNativeFeedback>
                        )}    

                    </View>
                }
            
            </View>
            
            <AppDatePicker
                visible={datePickerVisible}
                date={date}
                onDateChange={handleDateChange}/>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.appBackground,
        position:"relative"
    },

    

    imageAndNameContainer:{
        alignItems:"center",
        position:"absolute",
        top:60
    },

    image:{
        width:125,
        height:125,
        borderRadius:70
    },

    name:{
        fontFamily:"Poppins-Medium",
        color:colors.textColor,
        marginTop:20,
        fontSize:17
    },

    calenderIconContainer:{
        backgroundColor:"#2c2d31",
        alignItems:"center",
        flexDirection:"row",
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:25,
        paddingRight:25,
        borderRadius:25,
        marginTop:20
    },
    
    numpadAndFeildContainer:{
        height:"60%",
        width:"100%",
        alignItems:"center",
        position:"absolute",
        bottom:5,
        justifyContent:"flex-end"
    },

    inputAndIconContainer:{
        width:"95%",
        borderWidth:1,
        borderColor:"#474655",
        borderRadius:30,
        justifyContent:"center",
        flexDirection:"row",
        paddingLeft:30,
        paddingRight:30,
        paddingTop:5,
        paddingBottom:5,
        alignItems:"center"
    },

    input:{
        fontSize:35,
        width:"100%",
        fontFamily:"Open-Sans-Bold",
        color:colors.textColor,
        letterSpacing:0.5,
        paddingLeft:10
    },

    numpadContainer:{
        width:"96%",
        height:"70%",
        backgroundColor:"#2c2d31",
        borderWidth:1,
        borderColor:"#454453",
        marginTop:10,
        borderRadius:30,
        padding:10,
        flexWrap:"wrap",
        flexDirection:'row',
        justifyContent:"space-between",
        alignItems:"center"
    },

    numpadButton:{
        width:"30%",
        height: "22%",
        backgroundColor:"#33333d",
        borderWidth:1,
        borderColor:"#4b4b59",
        borderRadius:30,
        alignItems:"center",
        justifyContent:"center",
        marginBottom: 9,
    },
});

//make this component available to the app
export default Payment;

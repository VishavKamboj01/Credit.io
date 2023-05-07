import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import { colors } from "../config/colors";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "./AppText";
import { Swipeable } from "react-native-gesture-handler";
import SwipeablePaymentListItem from "./SwipeablePaymentListItem";
import { TouchableOpacity } from "react-native";

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  FadeInUp,
  FadeInDown,
  SlideInUp
} from 'react-native-reanimated';


export default function PaymentListItem({
  amount,
  date,
  time,
  type,
  note,
  children,
  interest,
  totalDueOrAdvance,
  colorsArrayCredit,
  colorsArrayAccepted,
  rightActions,
  leftActions,
  setIsLoaded,
}) {


  const randomWidth = useSharedValue(100);
  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };


  const [viewWidth, setViewWidth] = useState(0);
  const [itemPressed, setItemPressed] = useState(false);

  const lines = note === null ? 0 : Math.ceil(note.length / 33);
  const height = 70 + ((lines-1)*30);

  const handleItemPressed = () => {
    if(itemPressed) return setItemPressed(false);
    setItemPressed(true);
  }


  return (
    <SwipeablePaymentListItem rightActions={rightActions} leftActions={leftActions} type={type}>
      <TouchableWithoutFeedback onPress={handleItemPressed}>
        <View style={lines < 2 ? styles.container : [styles.container,{height:height}]}>
          <View>
            <LinearGradient
              onLayout={(event) => setViewWidth(event.nativeEvent.layout.width)}
              colors={type === "Accepted" ? colorsArrayAccepted : colorsArrayCredit}
              start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}
              style={
                type === "Accepted"
                  ? styles.paymentContainer
                  : styles.paymentContainerFlexEnd
              }
            >
              <View style={styles.paymentInfo}>
                <MaterialCommunityIcons name="currency-inr" size={20} color={type === "Accepted" ? colors.black : colors.white}/>
                <Text
                  style={
                    type === "Accepted" ? styles.amountAccepted : styles.amountCredit
                  }
                >
                  {amount}
                </Text>
              </View>
              <View style={styles.paymentDateTimeContainer}>
                <Text style={type === "Accepted" ? [styles.time,{color:colors.black}] : styles.time}>{time}</Text>
                <Text style={type === "Accepted" ? [styles.date,{color: colors.black}] : styles.date}>{date}</Text>
              </View>
              <MaterialIcons
                style={{ marginStart: 5 }}
                name="arrow-drop-down"
                size={25}
                color={type === "Accepted" ? colors.iconColor : colors.white}
              />
            </LinearGradient>
            {itemPressed && 
              <Animated.View entering={FadeInUp} style={[type !== "Accepted" && styles.interestContainer, viewWidth && {width:viewWidth}]}>
                <View style={[
                      styles.note, 
                      type === "Accepted" ? styles.noteLeft : styles.noteRight,
                      {flexDirection:"row"},
                      viewWidth && {width:viewWidth}
                    ]}>
                  <View><AppText title={interest}/></View>
                  <View><AppText title={parseInt(amount) + parseInt(interest)}/></View>
                </View>
              {note && 
                <AppText title={note} 
                  style={type === "Accepted" ? 
                      [styles.note, styles.noteLeft,viewWidth && {width:viewWidth}] : 
                      [styles.note,styles.noteRight,viewWidth && {width:viewWidth}]}/>
              }
              </Animated.View>
              
            }
          
            
          </View>
        </View>
      </TouchableWithoutFeedback>  
      </SwipeablePaymentListItem>
  );
}


const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor:colors.appBackground,
  },

  paymentContainer: {
    alignItems: "center",
    elevation: 6,
    alignSelf:"flex-start",
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    marginStart: 5,
    flexDirection: "row",
    minWidth:"40%",
    paddingRight:10,
    paddingLeft:5
  },

  paymentContainerFlexEnd: {
    alignItems: "center",
    alignSelf: "flex-end",
    elevation: 6,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    flexDirection: "row",
    marginRight:5,
    minWidth:"40%",
    paddingRight:10,
    paddingLeft:10
  },

  paymentInfo: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    flexDirection:"row"
  },

  amountAccepted: {
    fontSize: 17,
    marginRight: 10,
    color: colors.black,
    fontFamily:"Open-Sans-Bold",
    bottom:1
  },

  amountCredit: {
    fontSize: 17,
    marginRight: 10,
    color: colors.white,
    fontFamily:"Open-Sans-Bold",
    bottom:1
  },

  paymentDateTimeContainer: {
    padding: 5,
    alignItems: "flex-end",
    justifyContent:"center"
  },

  time: {
    color: colors.white,
    fontSize: 12,
    marginBottom: 2,
    fontFamily:"Open-Sans-SemiBold"
  },

  date:{
    fontSize: 12, 
    color: colors.white,
    fontFamily:"Open-Sans-SemiBold"
  },

  creditOrAdvanceContainer: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.orange,
    paddingLeft: 8,
    paddingTop: 2,
    paddingBottom: 3,
  },

  creditOrAdvanceContainerAdvance: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.green,
    paddingLeft: 8,
    paddingTop: 2,
    paddingBottom: 3,
  },

  creditOrAdvanceText: {
    color: colors.lightBlack,
    fontSize: 13,
    color: colors.white,
  },

  note:{
    marginLeft:5, 
    marginTop:5, 
    fontSize:13, 
    color:colors.lightWhite,
    fontFamily:"Open-Sans-Regular",
    backgroundColor:"#2c2d31",
    padding:5,
    minWidth:"30%",
    paddingLeft:10
  },

  noteLeft:{
    borderBottomLeftRadius:12,
    borderBottomRightRadius:12,
    borderTopRightRadius:12,
    borderWidth:1,
    borderColor:colors.borderColor,
    alignSelf:"flex-start",
    
  },

  noteRight:{
    alignSelf:"flex-end",
    borderBottomLeftRadius:12,
    borderBottomRightRadius:12,
    borderTopLeftRadius:12,
    borderWidth:1,
    borderColor:colors.borderColor,
    marginRight:5,
  },

  interestContainer:{
    alignSelf:"flex-end",  
    alignItems:"flex-end",
    borderTopLeftRadius:12,
    borderBottomLeftRadius:12,

  },
});

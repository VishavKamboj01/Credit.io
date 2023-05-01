import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { colors } from "../config/colors";
import { LinearGradient } from "expo-linear-gradient";
import AppText from "./AppText";
import { Swipeable } from "react-native-gesture-handler";
import SwipeablePaymentListItem from "./SwipeablePaymentListItem";

export default function PaymentListItem({
  amount,
  date,
  time,
  type,
  note,
  children,
  totalDueOrAdvance,
  colorsArrayCredit,
  colorsArrayAccepted,
  rightActions,
  leftActions,
  setIsLoaded,
}) {

  const [viewWidth, setViewWidth] = useState(0);

  const lines = note === null ? 0 : Math.ceil(note.length / 33);
  const height = 70 + ((lines-1)*30);


  return (
      <SwipeablePaymentListItem rightActions={rightActions} leftActions={leftActions} type={type}>
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
              <Ionicons
                style={{ marginStart: 5 }}
                name="checkmark-done-outline"
                size={18}
                color={type === "Accepted" ? colors.iconColor : colors.white}
              />
            </LinearGradient>
            {note && 
              <AppText title={note} 
                style={type === "Accepted" ? 
                    [styles.note, styles.noteLeft,viewWidth && {width:viewWidth}] : 
                    [styles.note,styles.noteRight,viewWidth && {width:viewWidth}]}/>
            }
          </View>
        </View>
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
  }
});

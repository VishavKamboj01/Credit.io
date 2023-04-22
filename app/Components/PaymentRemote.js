import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import { colors } from "../config/colors";
import AppText from "./AppText";

export default function PaymentRemote({
  onAcceptPaymentPress,
  onGiveCreditPress,
  onCallIconPress,
  onMessageIconPress,
}) {
  //["#948cb7","#c7a8ca"]
  return (
      <LinearGradient
        colors={["#434343","rgba(0,0,0,0.8)"]} 
        start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}
        style={styles.bottomContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={onAcceptPaymentPress}>
            <View style={styles.acceptPaymentButton}>
              <Feather
                name="arrow-down-circle"
                size={24}
                color={colors.black}
              />
              <AppText
                title="Accept"
                style={{ color: colors.black, textAlign: "center", width: 80 }}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.seperatorContainer}>
            <View style={styles.seperator} />
          </View>
          <TouchableOpacity onPress={onGiveCreditPress}>
            <View style={styles.giveCreditButton}>
              <Feather name="arrow-up-circle" size={24} color={colors.black} />
              <AppText
                title="Credit"
                style={{ color: colors.black, textAlign: "center", width: 80 }}
              />
              
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.secondButtonsContainer}>
          <View style={styles.callButton}>
            <Feather name="phone-call" size={24} color={colors.black} />
          </View>
          <View style={styles.messageButton}>
            <AntDesign name="message1" size={24} color={colors.black} />
          </View>
        </View>
      </LinearGradient>
   
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 30,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    bottom:10,
    marginTop: 10,
  },

  buttonsContainer: {
    flexDirection: "row",
    marginTop: 25,
    paddingBottom:40
  },

  acceptPaymentButton: {
    backgroundColor: "#dbcae2",
    flexDirection: "row",
    alignItems: "center",
    padding:10,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: "center",
  },

  seperatorContainer: {
    backgroundColor: "#dbcae2",
    height: 45,
    justifyContent: "center",
  },

  seperator: {
    height: 30,
    width: 0.5,
    backgroundColor: colors.iconColor,
  },

  giveCreditButton: {
    backgroundColor: "#dbcae2",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    justifyContent: "center",
  },

  secondButtonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  callButton: {
    width: 55,
    height: 55,
    backgroundColor: "#dbcae2",
    borderRadius: 30,
    left: 10,
    bottom: 10,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  messageButton: {
    width: 55,
    height: 55,
    backgroundColor: "#dbcae2",
    borderRadius: 30,
    right: 10,
    bottom: 10,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

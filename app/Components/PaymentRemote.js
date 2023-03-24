import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather, AntDesign } from "@expo/vector-icons";

import { colors } from "../config/colors";

export default function PaymentRemote({
  onAcceptPaymentPress,
  onGiveCreditPress,
  onCallIconPress,
  onMessageIconPress,
}) {
  return (
      <View style={styles.bottomContainer}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={onAcceptPaymentPress}>
            <View style={styles.acceptPaymentButton}>
              <Feather
                name="arrow-down-circle"
                size={24}
                color={colors.white}
              />
              <Text
                style={{ color: colors.white, textAlign: "center", width: 80 }}
              >
                Accept Payment
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.seperatorContainer}>
            <View style={styles.seperator} />
          </View>
          <TouchableOpacity onPress={onGiveCreditPress}>
            <View style={styles.giveCreditButton}>
              <Feather name="arrow-up-circle" size={24} color={colors.white} />
              <Text
                style={{ color: colors.white, textAlign: "center", width: 80 }}
              >
                Give Credit
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.secondButtonsContainer}>
          <View style={styles.callButton}>
            <Feather name="phone-call" size={24} color={colors.secondary} />
          </View>
          <View style={styles.messageButton}>
            <AntDesign name="message1" size={24} color={colors.secondary} />
          </View>
        </View>
      </View>
   
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    display:"flex",
    width: "90%",
    height: 150,
    backgroundColor: colors.white,
    borderRadius: 30,
    elevation: 5,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    overflow: "hidden",
    bottom:10,
    marginTop: 20
  },

  buttonsContainer: {
    flexDirection: "row",
    marginTop: 25,
  },

  acceptPaymentButton: {
    backgroundColor: colors.red,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    padding: 10,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: "center",
  },

  seperatorContainer: {
    backgroundColor: colors.red,
    height: 50,
    justifyContent: "center",
  },

  seperator: {
    height: 35,
    width: 0.5,
    backgroundColor: colors.lightWhite,
  },

  giveCreditButton: {
    backgroundColor: colors.red,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    height: 50,
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
    backgroundColor: colors.white,
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
    backgroundColor: colors.white,
    borderRadius: 30,
    right: 10,
    bottom: 10,
    elevation: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});

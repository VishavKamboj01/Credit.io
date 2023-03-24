import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../config/colors";

export default function PaymentListItem({
  amount,
  date,
  time,
  type,
  children,
  totalDueOrAdvance,
}) {
  return (
    <View style={styles.container}>
      {children}
      <View
        style={
          type === "Accepted"
            ? styles.paymentContainer
            : styles.paymentContainerFlexEnd
        }
      >
        <View style={styles.paymentInfo}>
          <Text
            style={
              type === "Accepted" ? styles.amountAccepted : styles.amountCredit
            }
          >
            {amount}
          </Text>
        </View>
        <View style={styles.paymentDateTimeContainer}>
          <Text style={styles.time}>{time}</Text>
          <Text style={{ fontSize: 12, color: colors.lightBlack }}>{date}</Text>
        </View>
        <Ionicons
          style={{ marginStart: 5 }}
          name="checkmark-done-outline"
          size={18}
          color={colors.blue}
        />
        {/* <View
          style={
            totalDueOrAdvance > 0
              ? styles.creditOrAdvanceContainer
              : styles.creditOrAdvanceContainerAdvance
          }
        >
          <Text style={styles.creditOrAdvanceText}>
            {totalDueOrAdvance > 0
              ? "Due : " + totalDueOrAdvance
              : "Advance : " + Math.abs(totalDueOrAdvance)}
          </Text>
          <Text style={styles.time}>{time}</Text>
        </View> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 50,
  },

  paymentContainer: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderTopLeftRadius: 15,
    marginStart: 10,
    backgroundColor: colors.white,
    overflow: "hidden",
    flexDirection: "row",
  },

  paymentContainerFlexEnd: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    elevation: 6,
    backgroundColor: colors.white,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15,
    marginRight: 10,
    overflow: "hidden",
    flexDirection: "row",
  },

  paymentInfo: {
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },

  amountAccepted: {
    fontSize: 17,
    marginRight: 10,
    color: colors.green,
  },

  amountCredit: {
    fontSize: 17,
    marginRight: 10,
    color: colors.orange,
  },

  paymentDateTimeContainer: {
    padding: 5,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  time: {
    color: colors.lightBlack,
    fontSize: 12,
    marginBottom: 2,
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
});

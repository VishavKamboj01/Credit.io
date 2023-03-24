import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../config/colors";
import customerImage from "../assets/customerImage.png";

export default function AppListItem({
  image = customerImage,
  imageUri = "",
  name,
  subTitle,
  payment,
  paymentStatus,
  onItemPressed,
  Icon,
}) {

  
  return (
    <TouchableNativeFeedback onPress={onItemPressed}>
      <View style={styles.container}>
        {imageUri.length === 0 ? (
          <Image style={styles.customerImage} source={image} />
        ) : (
          <Image style={styles.customerImage} source={{ uri: imageUri }} />
        )}

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{name}</Text>
          <View style={{flexDirection:"row", alignItems:"center"}}>
            {paymentStatus !== undefined &&
              <Ionicons name={paymentStatus === "Accepted" ? "arrow-down-circle" : "arrow-up-circle"} 
              size={17} 
              color={paymentStatus === "Accepted" ? colors.green : colors.red}/>
            }
            
            <Text style={styles.subTitle}>{subTitle}</Text>
          </View>
        </View>
        <View style={styles.paymentContainer}>
          {Icon ? (
            <Icon />
          ) : (
            <View style={{ alignItems: "center" }}>
              <Text
                style={
                  payment < 0
                    ? styles.paymentDue
                    : styles.paymentAdvance
                }
              >
                {payment === undefined ? 0 : Math.abs(payment)}
              </Text>
              <Text style={styles.paymentStatus}>{payment > 0 ? "Advance" : "Due"}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: colors.white,
    height: 65,
    alignItems: "center",
  },

  customerImage: {
    width: 50,
    height: 50,
    marginStart: 10,
    borderRadius: 25,
  },

  titleContainer: {
    marginStart: 15,
  },

  title: {
    color: colors.black,
    fontSize: 16,
  },

  subTitle: {
    color: colors.lightBlack,
    fontSize: 13,
  },

  paymentContainer: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: 10,
  },

  paymentDue: {
    color: "red",
  },

  paymentAdvance: {
    color: "green",
  },

  paymentStatus: {
    color: colors.lightBlack,
  },
});

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
import  Swipeable  from "react-native-gesture-handler/Swipeable";
import RenderRightAction from "./RenderRightAction";
import {MaterialIcons, AntDesign} from "@expo/vector-icons";
import AppText from "./AppText";
import Utility from "../UtilityFunctions/Utility";
import ListCustomerImage from "./ListCustomerImage";

const pallet = [colors.purple, colors.blue, "#3F979B"];


export default function AppListItem({
  image = customerImage,
  imageUri = "",
  name,
  subTitle,
  payment,
  paymentStatus,
  onItemPressed,
  Icon,
  endContainerStyle,
  onDeleteIconPress,
  onEditIconPress,
  isSwipeable,
}) {

  const renderActions = () => {
    if(!isSwipeable) return <></>;
    return (
      <>
          <RenderRightAction Icon={() => 
              <AntDesign name="edit" size={28} color={colors.white} onPress={onEditIconPress}/>} bgColor={colors.blue}/>
          <RenderRightAction Icon={() => 
              <MaterialIcons name="delete-forever" size={30} color={colors.white} onPress={onDeleteIconPress}/>} bgColor={colors.red}/>
      </>
    )
  }

  const currColor = pallet[Utility.getRandomNumber(2)];
  
  return (
    <Swipeable 
      containerStyle={{width:"100%", alignItems:"center"}}
      renderRightActions={renderActions}>
      
      <TouchableNativeFeedback onPress={() => onItemPressed(currColor)}>
        <View style={styles.container}>
          
          <ListCustomerImage name={name} imageUri={imageUri} color={currColor}/>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{name}</Text>
            <View style={{flexDirection:"row", 
                          alignItems:"center", 
                          }}>
              {paymentStatus !== undefined &&
                <Ionicons name={paymentStatus === "Accepted" ? "arrow-down-circle" : "arrow-up-circle"} 
                size={17} 
                color={paymentStatus === "Accepted" ? colors.green : colors.red}/>
              }
              
              <Text style={styles.subTitle}>{subTitle}</Text>
            </View>
          </View>
          <View style={[styles.paymentContainer, endContainerStyle]}>
            {Icon ? (
              <Icon />
            ) : (
              <View style={{minWidth:60, alignItems: "flex-start", marginRight:5 }}>
                <Text
                  style={
                    payment < 0
                      ? styles.paymentDue
                      : styles.paymentAdvance
                  }
                >
                  {payment === undefined ? 0 : Math.abs(payment).toFixed(2)}
                </Text>
                <Text style={styles.paymentStatus}>{payment > 0 ? "Advance" : "Due"}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableNativeFeedback>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "96%",
    backgroundColor: colors.appToolbar,
    alignItems: "center",
    borderRadius:20,
    borderWidth:3,
    borderColor:colors.borderColor,
    paddingTop:10,
    paddingBottom:10,
    marginBottom:7,
    paddingRight:4
  },


  titleContainer: {
    marginStart: 15,
  },

  title: {
    color: colors.white,
    fontSize: 16,
    fontFamily:"Poppins-Medium"
  },

  subTitle: {
    color: colors.iconColor,
    fontSize: 14,
    fontFamily:"Poppins-Medium",
    marginTop:2,
    marginLeft:2
  },

  paymentContainer: {
    flexGrow: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },

  paymentDue: {
    color: colors.red,
  },

  paymentAdvance: {
    color: colors.green,
  },

  paymentStatus: {
    color: colors.iconColor,
  },
});

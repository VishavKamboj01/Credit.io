import React from "react";
import { StyleSheet, View, Image, Text } from "react-native";

import image from "../assets/customerImage.png";
import { colors } from "../config/colors";

export default function CustomerScreenHeader({
  name,
  imageUri,
  totalDueOrAdvance,
}) {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", right:10 }}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Image style={styles.image} source={image} />
        )}

        <Text style={styles.name}>{name}</Text>
      </View>
      <View style={styles.totalDueOrAdvanceContainer}>
        <Text
          style={
            totalDueOrAdvance > 0
              ? styles.totalDueOrAdvanceText
              : styles.totalDueOrAdvanceTextAdvance
          }
        >
          {Math.abs(totalDueOrAdvance)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  image: {
    width: 45,
    height: 45,
    borderRadius: 25,
  },

  name: {
    color: colors.white,
    marginStart: 10,
    fontSize: 17,
    fontFamily:"Poppins-Medium"
  },

  totalDueOrAdvanceContainer: {
    backgroundColor: colors.white,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 6,
    paddingRight: 6,
    borderRadius: 12,
  },

  totalDueOrAdvanceText: {
    color: colors.orange,
    fontFamily:"Open-Sans-SemiBold"
  },

  totalDueOrAdvanceTextAdvance: {
    color: colors.green,
    fontFamily:"Open-Sans-SemiBold"
  },
});

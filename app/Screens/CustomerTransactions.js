import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import DBAdapter from "../Database/DatabaseAdapter";
import PaymentListItem from "../Components/PaymentListItem";
import PaymentRemote from "../Components/PaymentRemote";
import Utility from "../UtilityFunctions/Utility";
import { colors } from "../config/colors";
import { LinearGradient } from "expo-linear-gradient";
import PaymentSwipeActions from "../Components/PaymentSwipeActions";

const gradientColorsRed = [
  ["#ea5753","#ffb88e"],
  ["#f40752","#f9ab8f"],
  ["#f292ed","#f36364"]
]

const gradientColorsGreen = [
  ["#6ef195","#00e3fd"],
  ["#f3f98a","#95ecb0"],
  ["#c9efdc","#f2bbf1"]
]

function getRandomNumber() {
  return Math.round(Math.random() * 2);
}

export default function CustomerTransactions({ onRender, route, navigation, additional }) {
  const [payments, setPayments] = useState([]);
  const {customer_id, user_id} = route.params;
  const [paymentDeleted, setPaymentDeleted] = useState(0);

  useEffect(() => {
    // Get payments for a pertucular customer from the database...
    const getPayments = async() => {
       const paymentsArray = await DBAdapter.getPayments(customer_id, user_id);
       setPayments(paymentsArray);
       const dueOrAdvance = getTotalDueOrAdvance(paymentsArray);
       onRender(dueOrAdvance);
      
    }
    getPayments();
  }, [route, additional.route.params, paymentDeleted]); 

  const handleAcceptPaymentPress = () => {
    navigation.navigate("Payment",{trigger:"Accepted", customer_id, user_id});
  };

  const handleGiveCreditPress = () => {
    navigation.navigate("Payment",{trigger:"Credit", customer_id, user_id});
  };

  const handleDeletePress = async(payment) => {
      const arg = {
        payment_id: payment.payment_id,
        deleted_date_time: new Date().toString()
      }
      await DBAdapter.deletePayment(arg);
      setPaymentDeleted(paymentDeleted+1);
  }

  const handleEditPress = (payment) => {
    console.log("Edit: ",payment);
  }

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={["rgba(44,45,50,1)","rgba(255,255,255,0)"]}
        // start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}
        style={{height:6, width:"100%"}}></LinearGradient>
      <FlatList style={{display:"flex", height:"100%", paddingBottom:20 }}
        renderItem={({ item }) => (
          <PaymentListItem
            amount={item.amount}
            date={Utility.getReadableDate(item.payment_date_time)}
            type={item.payment_type}
            time={Utility.formatTime(item.payment_date_time)}
            note={item.payment_note}
            totalDueOrAdvance={getTotalDueOrAdvance(payments)}
            colorsArrayCredit={gradientColorsRed[getRandomNumber()]}
            colorsArrayAccepted={gradientColorsGreen[getRandomNumber()]}
            rightActions={() => 
                      <PaymentSwipeActions 
                          type="Credit" 
                          onDeletePress={() => handleDeletePress(item)}
                          onEditPress={() => handleEditPress(item)}/>}
            leftActions={() => 
                      <PaymentSwipeActions 
                          type="Accepted" 
                          onDeletePress={() => handleDeletePress(item)}
                          onEditPress={() => handleEditPress(item)}/>}
          />
        )}
        data={payments}
        keyExtractor={(item) => item.payment_id.toString()}
        ItemSeparatorComponent={() => (
          <View style={{ height: 25, width: "100%" }}></View>
        )}
      />

      <PaymentRemote
        onAcceptPaymentPress={handleAcceptPaymentPress}
        onGiveCreditPress={handleGiveCreditPress}
      />

    </View>
  );
}

const getTotalDueOrAdvance = (payments) => {
  let sum = 0;
  for (let i = 0; i < payments.length; i++) {
    const payment = payments[i];
    const amount = parseInt(payment.amount);
    if (payment.payment_type === "Credit") {
      sum += amount;
    } else sum -= amount;
  }
  return sum;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-end",
    backgroundColor:colors.appBackground
  },
});

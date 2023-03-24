import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, ToastAndroid } from "react-native";

import DBAdapter from "../Database/DatabaseAdapter";
import AppDialogBox from "../Components/AppDialogBox";
import PaymentListItem from "../Components/PaymentListItem";
import PaymentRemote from "../Components/PaymentRemote";
import Utility from "../UtilityFunctions/Utility";

export default function CustomerTransactions({ onRender, route }) {
  const [payments, setPayments] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [trigger, setTrigger] = useState("");
  const [paymentMade, setPaymentMade] = useState(1);
  const[totalPayment, setTotalPayment] = useState(0);
 
  const {customer_id, user_id} = route.params;

  useEffect(() => {
    // Get payments for a pertucular customer from the database...
    const getPayments = async() => {
       const paymentsArray = await DBAdapter.getPayments(customer_id, user_id);
       setPayments(paymentsArray);
       const dueOrAdvance = getTotalDueOrAdvance(paymentsArray);
       onRender(dueOrAdvance);
       setTotalPayment(dueOrAdvance);
    }
    getPayments();
  }, [route, paymentMade]);

  const handleAcceptPaymentPress = () => {
    setTrigger("Accepted");
    setModalVisible(true);
  };

  const handleGiveCreditPress = () => {
    setTrigger("Credit");
    setModalVisible(true);
  };

  const handleModelClose = () => {
    setModalVisible(false);
  };

  const handlePaymentSuccess = (paymentInfo, trigger) => {
    const addPayment = async() => {
      const payment = {
        amount: paymentInfo.amount,
        payment_date_time: paymentInfo.date,
        payment_type: trigger,
        customer_id,
        user_id
      };

      try{
        const result = await DBAdapter.addPayment(payment);
        
        ToastAndroid.show("Success!", ToastAndroid.LONG);
      }catch(err){
        console.log(err);
        ToastAndroid.show("Failed!", ToastAndroid.LONG);
      }
    }
    
    addPayment();
    setPaymentMade(paymentMade+1);
  };

  return (
    <View style={styles.container}>
      <FlatList style={{display:"flex", height:"100%"}}
        renderItem={({ item }) => (
          <PaymentListItem
            amount={item.amount}
            date={Utility.getReadableDate(item.payment_date_time)}
            type={item.payment_type}
            time={Utility.formatTime(item.payment_date_time)}
            totalDueOrAdvance={getTotalDueOrAdvance(payments)}
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
      <AppDialogBox
        visible={modalVisible}
        onModelClose={handleModelClose}
        trigger={trigger}
        onPaymentSuccess={handlePaymentSuccess}
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
    paddingTop: 15,
    justifyContent: "flex-end",
  },
});

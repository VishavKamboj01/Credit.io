import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import DBAdapter from "../Database/DatabaseAdapter";
import PaymentListItem from "../Components/PaymentListItem";
import PaymentRemote from "../Components/PaymentRemote";
import Utility from "../UtilityFunctions/Utility";
import { colors } from "../config/colors";
import { LinearGradient } from "expo-linear-gradient";
import PaymentSwipeActions from "../Components/PaymentSwipeActions";
import { ActivityIndicator } from "react-native";

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


export default function CustomerTransactions({ onRender, route, navigation, additional }) {
  const [payments, setPayments] = useState([]);
  const {customer_id, user_id} = route.params;
  const [paymentDeleted, setPaymentDeleted] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);


  useEffect(() => {
    // Get payments for a pertucular customer from the database...
    const getPayments = async() => {
      const paymentsArray = await DBAdapter.getPayments(customer_id, user_id);

      const reversed = paymentsArray.reverse();
      const interestArray = [];
      
      for(let payment of reversed){
        const withInterest = {...payment};
        payment.payment_date = "2024-05-02";
        const days = Utility.getDayDifference(new Date(payment.payment_date), new Date());
        const interest = payment.amount * 2 * 12 / 100 * (1 / 12);
        
        withInterest.interest = interest.toFixed(2);
        interestArray.push(withInterest);
      }

      setPayments(interestArray);
      let dueOrAdvance = getTotalDueOrAdvance(paymentsArray);
      const interest = dueOrAdvance + Math.abs(dueOrAdvance) * 2 * 12 / 100 * (1 / 12);
      
      onRender(interest);
      setIsLoaded(true);
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
        deleted_date_time: new Date().toString(),
        deleted_date: Utility.getDate(new Date())
      }
      await DBAdapter.deletePayment(arg);
      setPaymentDeleted(paymentDeleted+1);
  }

  const handleEditPress = (payment) => {
    navigation.navigate("Payment", {payment})
  }

  return (
    <View style={styles.container}>
    {isLoaded ? 
    <>
        <LinearGradient 
          colors={["rgba(44,45,50,1)","rgba(255,255,255,0)"]}
          // start={{x: 0, y: 0.75}} end={{x: 1, y: 0.25}}
          style={{height:6, width:"100%"}}></LinearGradient>
        <FlatList
          contentContainerStyle={{paddingBottom:20, paddingTop:20}}
          data={payments}
          renderItem={({ item }) => { 
            return (
              <PaymentListItem
                amount={item.amount}
                date={Utility.getReadableDate(item.payment_date_time)}
                type={item.payment_type}
                time={Utility.formatTime(item.payment_date_time)}
                note={item.payment_note}
                interest={item.interest}
                totalDueOrAdvance={getTotalDueOrAdvance(payments)}
                colorsArrayCredit={gradientColorsRed[Utility.getRandomNumber(2)]}
                colorsArrayAccepted={gradientColorsGreen[Utility.getRandomNumber(2)]}
                setIsLoaded={setIsLoaded}
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
            )
          }}
          keyExtractor={(item) => item.payment_id.toString()}
          ItemSeparatorComponent={() => (
            <View style={{ height: 25, width: "100%" }}></View>
            )}
            />

        <PaymentRemote
          onAcceptPaymentPress={handleAcceptPaymentPress}
          onGiveCreditPress={handleGiveCreditPress}
          />
        </> 
        :
        <ActivityIndicator color={colors.purple} size={40}/>
      }
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
    width:"100%",
    height:"100%",
    justifyContent:"center",
    backgroundColor:colors.appBackground
  },
});

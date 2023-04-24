import { 
  View, 
  Text, 
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native'
import React, {useState, useEffect} from 'react'
import { colors } from '../config/colors';
import {Ionicons, AntDesign, MaterialIcons} from "@expo/vector-icons";
import AppDatePicker from "../Components/AppDatePicker"
import AppText from '../Components/AppText';
import Utility from '../UtilityFunctions/Utility';
import TransactionAmount from '../Components/TransactionAmount';
import TransactionListItem from '../Components/TransactionListItem';
import DatabaseAdapter from '../Database/DatabaseAdapter';

// create a component


const AllTransactions = ({currentUser}) => {

  const [date, setDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [creditCount, setCreditCount] = useState(0);
  const [paymentCount, setPaymentCount] = useState(0);
  const [creditSum, setCreditSum] = useState(0);
  const [paymentSum, setPaymentSum] = useState(0);
  const [activityIndicator, setActivityIndicator] = useState(false);

  useEffect(() => {
    const getPaymentsByDate = async() => {
      setActivityIndicator(true);
      const payments = await DatabaseAdapter.getPaymentsByDate(currentUser.user_id, Utility.getDate(date));  
      if(payments.length === 0){ 
        setTransactions(payments);
        return setActivityIndicator(false);
      }

      let cCount = 0;
      let pCount = 0;
      let cSum = 0;
      let pSum = 0;

      for(let payment of payments){
          if(payment.payment_type === "Accepted"){
            pCount++;
            pSum += payment.amount;
          }
          else{
            cCount++;
            cSum += payment.amount;
          }
      }
      
      const reversed = payments.reverse();
      reversed.splice(0,0,{payment_id:-1});

      setTransactions(reversed);
      setPaymentCount(pCount);
      setCreditCount(cCount);
      setPaymentSum(pSum);
      setCreditSum(cSum);
      setActivityIndicator(false);
    }
    getPaymentsByDate();
  },[date]);
  
  

  const handleBackPress = () => {
    console.log("Back");
  }

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDatePickerVisible(false);
    setDate(currentDate);
  };

  const handleDatePress = () => {
    setDatePickerVisible(true)
  }


  return (
    <View style={styles.container}>
      {activityIndicator ? 
        <ActivityIndicator style={{marginTop:10}} size={30} color={colors.purple}/>
        :
        <TouchableOpacity style={styles.calenderIconContainer} onPress={handleDatePress}>
            <Ionicons name="ios-calendar-outline" size={25} color="#9a99a1"/>
            <AppText style={styles.dateText} title={Utility.getReadableDate(date)}/>
            <AntDesign name='caretdown' size={12} color = "#9a99a1" />
        </TouchableOpacity>
      }

      {(transactions.length === 0 && !activityIndicator) ? 
        <AppText style={{marginTop:50}} title="No Transactions on this date."/>
      :
        <FlatList 
          style={{width:"100%", marginBottom:10}}
          data={transactions}
          keyExtractor={(item) => item.payment_id.toString()}
          renderItem={({item}) => {
            if(item.payment_id === -1){
              return (
                <View style={styles.infoContainer}>
                
      
               
                <TransactionAmount
                  style={{paddingLeft:15, bottom:10}}
                  Icon={() => <AntDesign 
                                name='wallet' 
                                size={22} 
                                color={colors.iconColor}
                                style={styles.iconStyle}/>}
                  title="Net Balance"
                  titleStyle={{color:colors.textColor}}
                  amount={Math.abs(paymentSum - creditSum)}
                  amountStyle={(paymentSum - creditSum) < 0 ? {color:colors.red} : {color:colors.green}}/>
      
               <View style={styles.paymentCreditContainer}>
                <TransactionAmount
                    style={{paddingLeft:15}}
                    Icon={() => <AntDesign 
                                  name='arrowdown' 
                                  size={22} 
                                  color={colors.iconColor}
                                  style={styles.iconStyle}/>}
                    title={paymentCount + (paymentCount <= 1 ? " Payment" : " Payments")}
                    titleStyle={{color:colors.textColor}}
                    amount={paymentSum}
                    amountStyle={{color:colors.green}}/>
                  
                  <TransactionAmount
                    style={{right:10}}
                    Icon={() => <AntDesign 
                                  name='arrowup' 
                                  size={22} 
                                  color={colors.iconColor}
                                  style={styles.iconStyle}/>}
                    title={creditCount + (creditCount <= 1 ? " Credit" : " Credits")}
                    titleStyle={{color:colors.textColor}}
                    amount={creditSum}
                    amountStyle={{color:colors.red}}/>
      
      
      
              </View>   
                
            </View>
              );
            }
            return (
              <TransactionListItem 
                name={item.full_name}
                amount={item.amount}
                time={Utility.formatTime(item.payment_date_time)}
                paymentType={item.payment_type}
                />
            )
          } }
        />
      }


      <AppDatePicker
          visible={datePickerVisible}
          date={date}
          onDateChange={handleDateChange}/>

    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    width:"100%",
    height:"100%",
    backgroundColor: colors.appBackground,
    alignItems:"center",
    justifyContent:"center",
    paddingTop:30,
    position:"relative"
  },

  
  calenderIconContainer:{
    backgroundColor:"#2c2d31",
    alignItems:"center",
    justifyContent:"center",
    flexDirection:"row",
    paddingTop:5,
    paddingBottom:5,
    borderRadius:25,
    width:"50%",
    position:"absolute",
    zIndex:1,
    top:50
  },

  toolbar:{
    width:"100%",
    backgroundColor:colors.appToolbar,
    padding:10,
    alignItems:'center',
    flexDirection:"row",
    paddingTop:40,
    paddingLeft:5
  },

  infoContainer:{
    width:"95%",
    height:220,
    borderWidth:1,
    borderColor:colors.borderColor,
    marginTop:40,
    borderRadius:10,
    paddingTop:50,
    alignItems:"center",
    justifyContent:"space-between",
    alignSelf:"center"
  },

  dateText:{
    marginLeft:15, 
    marginTop:5, 
    color:"#9a99a1",
    marginRight:15
  },

  iconStyle:{ 
    borderWidth:1, 
    borderColor:colors.borderColor,
    padding:8,
    borderRadius:20,
    paddingLeft:10,
    marginRight:15
  },


  paymentCreditContainer: {
    flexDirection:"row",
    width:"100%", 
    justifyContent:"space-between",
    marginBottom:5
  }
});

//make this component available to the app
export default AllTransactions;

import React, { useState, useEffect } from "react";
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

import Utility from "../UtilityFunctions/Utility";
import AppButton from "../Components/AppButton";
import AppDatePicker from "../Components/AppDatePicker";
import { colors } from "../config/colors";

export default function AppDialogBox({
  visible,
  onModelClose,
  trigger,
  onPaymentSuccess,
}) {
  const [date, setDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState({
    amount: "",
    date: date,
    note: "",
  });

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDatePickerVisible(false);
    setDate(currentDate);
  };

  const handleDatePickerPress = () => {
    if (!datePickerVisible) setDatePickerVisible(true);
    else setDatePickerVisible(false);
  };

  const handleAmountChange = (text) => {
    const payment = { ...paymentInfo };
    payment["amount"] = text;
    setPaymentInfo(payment);
  };

  const handleNoteChange = (text) => {
    const payment = { ...paymentInfo };
    payment["note"] = text;
    setPaymentInfo(payment);
  };

  const handleSuccess = () => {
    if (paymentInfo.amount !== "" && paymentInfo.date !== "") {
      onPaymentSuccess(paymentInfo, trigger);
    }
    onModelClose();
    clearDialogFeilds();
  };

  const handleCancelPress = () => {
    clearDialogFeilds();
    onModelClose();
  };

  const clearDialogFeilds = () => {
    const payment = {
      amount: "",
      date: date,
      note: "",
    };
    setPaymentInfo(payment);
  };

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Payment</Text>
            <View style={styles.paymentFeildContainer}>
              <MaterialCommunityIcons
                name="currency-inr"
                size={40}
                color={colors.primary}
              />
              <TextInput
                style={styles.paymentFeild}
                keyboardType="number-pad"
                placeholder="Enter Amount"
                value={paymentInfo.amount}
                onChangeText={handleAmountChange}
              ></TextInput>
            </View>
            <TouchableWithoutFeedback onPress={handleDatePickerPress}>
              <View
                style={[
                  styles.paymentFeildContainer,
                  { width: "70%", height: 40 },
                ]}
              >
                <Ionicons name="calendar" size={25} color={colors.primary} />
                <Text style={{ marginStart: 20, fontSize: 15 }}>
                  {Utility.getReadableDate(date)}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <View style={styles.addNoteContainer}>
              <TextInput
                placeholder="Add Note"
                textAlignVertical="top"
                multiline={true}
                numberOfLines={4}
                value={paymentInfo.note}
                onChangeText={handleNoteChange}
              />
            </View>
            <AppButton
              title={trigger === "Accepted" ? "Accept Payment" : "Give Credit"}
              style={styles.acceptPaymentButton}
              onPress={handleSuccess}
            ></AppButton>
            <AppButton
              title="Cancel"
              style={styles.cancelPaymentButton}
              onPress={handleCancelPress}
            ></AppButton>
          </View>
        </View>

        <AppDatePicker
          visible={datePickerVisible}
          date={date}
          onDateChange={handleDateChange}
        />
      </Modal>

      {/* <TouchableHighlight
        style={styles.cancelPaymentButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.textStyle}>Show Modal</Text>
      </TouchableHighlight> */}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  modalView: {
    width: "80%",
    height: 450,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    // shadowColor: colors.blue,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
    elevation: 100,
  },

  modalTitle: {
    marginBottom: 10,
    textAlign: "center",
    color: colors.green,
    fontSize: 20,
  },

  paymentFeildContainer: {
    width: "90%",
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: colors.primary,
    marginTop: 15,
    alignItems: "center",
    flexDirection: "row",
  },

  paymentFeild: {
    width: "80%",
    height: "80%",
    fontSize: 25,
    borderLeftWidth: 1,
    borderLeftColor: colors.silver,
    paddingLeft: 15,
  },

  addNoteContainer: {
    backgroundColor: colors.platinum,
    width: "90%",
    marginTop: 20,
    borderRadius: 20,
    padding: 10,
  },

  acceptPaymentButton: {
    backgroundColor: colors.green,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
    height: 40,
  },

  cancelPaymentButton: {
    backgroundColor: colors.orange,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    height: 40,
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

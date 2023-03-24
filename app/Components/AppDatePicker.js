import React, { useState } from "react";
import { View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function AppDatePicker({ visible, date, onDateChange }) {
  return (
    <View>
      {visible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode="date"
          is24Hour={false}
          display="default"
          onChange={onDateChange}
        />
      )}
    </View>
  );
}

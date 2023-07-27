import React from "react";
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";
import {View, StyleSheet, ScrollView, Text, TextInput, Image, TouchableOpacity} from 'react-native';
export default function CustomDatePicker() {
  const [inputDate, setInputDate] = React.useState(undefined)

  return ( 
    <SafeAreaProvider>
      <DatePickerInput
        label="Birthdate"
        value={inputDate}
        onChange={(d) => setInputDate(d)}
        inputMode="start"
      />
  </SafeAreaProvider>
  );
}

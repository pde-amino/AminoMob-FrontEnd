import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import GlobalStyles from "../style/GlobalStyles";

export default function CustomStyle({ children }) {
  return (
    <SafeAreaView style={GlobalStyles.safeAreaStyle}>{children}</SafeAreaView>
  );
}

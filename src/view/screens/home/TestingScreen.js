import { View, Text } from "react-native";
import React from "react";
import GlobalStyles from "../../../style/GlobalStyles";
import DropdownComponent from "../../../components/DropdownComponent";
import { useRoute } from "@react-navigation/native";

export default function TestingScreen() {
  const route = useRoute();
  const { result } = route.params;
  return (
    <View style={GlobalStyles.Content}>
      <Text>TestingScreen</Text>
      <Text>{JSON.stringify(result, null, 2)}</Text>
      <DropdownComponent />
    </View>
  );
}

import { View, Text, TextInput } from "react-native";
import React from "react";

export default function ProfileScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
      }}>
      <Text>Profile Screen</Text>
      <TextInput />
    </View>
  );
}

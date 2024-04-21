import React from "react";
import { Text, View } from "react-native";
import ButtonPrimary from "../../../components/ButtonPrimary";
import TestingComponents from "../../../components/TestingComponents";

export default function HomeTelekonseling() {
  return (
    <View
      style={{
        marginTop: "50%",
        alignItems: "center",
        alignContent: "center",
        justifyContent: "center",
        gap: 15,
      }}
    >
      <TestingComponents titlePage={"Halaman Telekonseling"} />
    </View>
  );
}

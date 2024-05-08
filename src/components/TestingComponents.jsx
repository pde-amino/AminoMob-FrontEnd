import React from "react";
import { Text, View } from "react-native";
import ButtonPrimary from "./ButtonPrimary";

export default function TestingComponents({ titlePage }) {
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
      <Text>{titlePage}</Text>
      <ButtonPrimary title="Go to Hmm.." onPress={() => console.log("Hmm..")} />
      <ButtonPrimary
        backgroundColor="#f1c40f"
        color="#333"
        title="Go to Haa.."
        onPress={() => console.log("Ha..")}
      />
    </View>
  );
}

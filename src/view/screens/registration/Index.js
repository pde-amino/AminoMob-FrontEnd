import React from "react";
import { Text, View } from "react-native";
import ButtonPrimary from "../../../components/ButtonPrimary";

export default function Index() {
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
      <Text>Ini Halaman Pendaftaran</Text>
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

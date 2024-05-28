import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";

function FavoriteScreen() {
  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <HeaderComponent title={"Riwayat"} />
      <View style={GlobalStyles.Content}>
        <Text>Riwayat Screen </Text>
      </View>
    </SafeAreaView>
  );
}

export default FavoriteScreen;

import React from "react";
import { SafeAreaView, Text, View } from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";

function FavoriteScreen() {
  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <View style={GlobalStyles.Content}>
        <Text>Favorite Screen </Text>
      </View>
    </SafeAreaView>
  );
}

export default FavoriteScreen;

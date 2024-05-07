import { View, Text, TextInput, ScrollView } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import HeaderComponent from "../../../components/HeaderComponent";

export default function ProfileScreen() {
  return (
    <View>
      <HeaderComponent title="Profil" icon="arrow-back" onPress={null} />
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 50,
          }}
        >
          <Avatar.Image
            size={82}
            source={require("../../../../assets/favicon.png")}
          />
          <Text>Profile Screen</Text>
          <TextInput />
        </View>
      </ScrollView>
    </View>
  );
}

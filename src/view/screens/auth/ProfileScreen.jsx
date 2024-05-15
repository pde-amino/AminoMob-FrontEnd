import { View, Text, TextInput, ScrollView, Button } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";
import HeaderComponent from "../../../components/HeaderComponent";
import ButtonPrimary from "../../../components/ButtonPrimary";

const ProfileScreen = () => {
  return (
    <View>
      <HeaderComponent title="Profil" icon="arrow-back" onPress={null} />
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 50,
          }}>
          <Avatar.Image
            size={82}
            source={require("../../../../assets/favicon.png")}
          />
          <Text>Profile Screen</Text>
          <TextInput style={{ backgroundColor: "grey", width: 100 }} />
          <ButtonPrimary title="Next" onPress={null} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

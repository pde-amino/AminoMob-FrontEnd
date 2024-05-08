import { View, Text, TextInput, ScrollView, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-paper";
import HeaderComponent from "../../../components/HeaderComponent";
import TextInputIconComponent from "../../../components/TextInputIconComponent";

export default function ProfileScreen() {
  return (
    <View>
      <HeaderComponent title="Profil" icon="arrow-back" onPress={null} />
      <ScrollView>
        <View
          style={{
            flex: 1,
            // alignItems: "center",
            margin: 20,
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Avatar.Image
              size={82}
              source={require("../../../../assets/favicon.png")}
            />
            <View>
              <Text>Bogeng</Text>
              <Text></Text>
            </View>

            {/* <TextInputIconComponent /> */}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});

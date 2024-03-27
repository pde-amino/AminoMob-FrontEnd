import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Button, Text, View } from "react-native";
import {Ionicons} from "react-native-vector-icons";
import HomeScreen from "../../screen/HomeScreen";
import FavoriteScreen from "../view/screens/home/FavoriteScreen";

export default function HomeScreen() {
  return (
    function HomeScreen({navigation}) {
        return (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                  <Text>Thiss Favorite Screen !!!</Text>
                </View>
              );
      }
  )
}

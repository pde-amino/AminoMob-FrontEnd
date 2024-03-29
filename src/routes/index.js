import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { Ionicons } from "react-native-vector-icons";
import HomeTabs from "./tabs";
import FavoriteScreen from "../view/screens/home/FavoriteScreen";
import Poli2 from "../view/screens/poli/Poli2";
import PortalInformation from "../view/screens/poli/PortalInformasi";
// import Poli1 from "../view/screens/poli/poli1";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Amino Care" component={HomeTabs} />
        <Stack.Screen name="Favorites" component={FavoriteScreen} />
        <Stack.Screen name="Portal Informasi" component={PortalInformation} />
        <Stack.Screen name="Poli2" component={Poli2} />
        {/* <Stack.Screen name="Poli1" component={Poli1} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

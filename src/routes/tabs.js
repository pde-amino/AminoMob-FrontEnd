import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import {Ionicons} from'react-native-vector-icons';
import HomeScreen from "../../screen/HomeScreen";
import FavoriteScreen from "../view/screens/home/FavoriteScreen";


  const Tabs = createBottomTabNavigator();
export default function HomeTabs() {
    return (
        <Tabs.Navigator>
        <Tabs.Screen options={{
        tabBarIcon:({focused, color, size})=><Ionicons name={focused?'home':'home-outline'} size={24} color="grey"/>,
      }}
      name="Home Screen"
      component={HomeScreen}
      />
      <Tabs.Screen options={{
        tabBarIcon:({focused, color, size})=><Ionicons name={focused?'heart':'heart-outline'} size={24} color="grey"/>,
      }}
      name="Favorite"
      component={FavoriteScreen}
      />
      <Tabs.Screen options={{
        tabBarIcon:({focused, color, size})=><Ionicons name={focused?'book':'book-outline'} size={24} color="grey"/>,
      }}
      name="Data"
      component={YourScreenName}
      />
      <Tabs.Screen options={{
        tabBarIcon:({focused, color, size})=><Ionicons name={focused?'create':'create-outline'} size={24} color="grey"/>,
      }}
      name="Form"
      component={InputForm}
      />
        </Tabs.Navigator>
      );
}
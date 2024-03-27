import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
// import { Button, Text, View } from "react-native";
// import { Button, Text, View } from "react-native";
import {Ionicons} from "react-native-vector-icons";
import HomeScreen from "../../screen/HomeScreen";
import FavoriteScreen from "../view/screens/home/FavoriteScreen";

  const Stack= createNativeStackNavigator();
  const Tabs=createBottomTabNavigator();

  // function FavoriteScreen() {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>Thiss Favorite Screen !!!</Text>
  //     </View>
  //   );
  // }
  // function HomeScreen({navigation}) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>Thiss Home Screen !!!</Text>
  //       <Button 
  //       onPress={()=>navigation.navigate("Favorite")}
  //       title="Gerser ke Favorite.?"
  //       />
  //     </View>
  //   );
  // }

  export default function Routes(){
    return(
        <NavigationContainer>
            <Stack.Navigator>
        <Stack.Screen
        name="Home"
        component={HomeScreen}
        />
        <Stack.Screen 
        name="Favorite"
        component={FavoriteScreen}
        
        />
        </Stack.Navigator>
        </NavigationContainer>
    )
  }
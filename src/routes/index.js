import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeTabs from "./tabs";
import FavoriteScreen from "../view/screens/home/FavoriteScreen";
import Poli2 from "../view/screens/poli/Poli2";
import PortalInformation from "../view/screens/poli/PortalInformasi";
import KlinikUmum from "../view/screens/poli/KlinikUmum";
import DoctorScreen from "../view/screens/poli/DoctorScreen";
import TestingWeb from "../view/screens/web/TestingWeb";
import LoginScreen from "../view/screens/auth/LoginScreen";
import PoliInformation from "../view/screens/poli/PoliInformation";
import { Regist } from "../view/screens/registation/Regist";
import OnboardingScreen from "../view/screens/home/OnboardingScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";


const Stack = createNativeStackNavigator();

export default function Routes() {

  const [pertamaLaunch, setPertamaLaunch] = React.useState(true)
  React.useEffect(async () => {
    const appData = AsyncStorage.getItem('pertamaLaunch')
    console.log(appData)
    // if (appData == null) {
    //   setPertamaLaunch(true)
    //   await AsyncStorage.setItem('pertamaLaunch','false')
    // } else {
    //   setPertamaLaunch(false)
    // }
  }, [])


  return (
    pertamaLaunch !== null && (
      <NavigationContainer>
        <Stack.Navigator
          // initialRouteName="Onboarding"
          screenOptions={{
            headerShown: false, // Menyembunyikan header secara default
          }}>
            {pertamaLaunch && (<Stack.Screen name="Onboarding" component={OnboardingScreen}/>)}
            {/* <Stack.Screen name="Onboarding" component={OnboardingScreen}/> */}
            <Stack.Screen name="Amino Care" component={HomeTabs} />
            <Stack.Screen name="Favorites" component={FavoriteScreen} />
            <Stack.Screen name="Portal Informasi" component={PortalInformation} />
            <Stack.Screen name="Poli2" component={Poli2} />
            <Stack.Screen name="Klinik Umum" component={KlinikUmum} />
            <Stack.Screen name="DoctorScreen" component={DoctorScreen} />
            <Stack.Screen name="Web View" component={TestingWeb} />
            <Stack.Screen name="Testing" component={Regist} />
            <Stack.Screen options={{ headerShown: false }} name="Login Screen" component={LoginScreen}/>
            <Stack.Screen name="Poli Information" component={PoliInformation} />
        </Stack.Navigator>
      </NavigationContainer>
    )
    
  );
}

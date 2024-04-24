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
import { Regist } from "../view/screens/pendaftaran/Regist";
import OnboardingScreen from "../view/screens/home/OnboardingScreen";
import RegistrationScreen from "../view/screens/auth/RegistrationScreen";
import HomeTelekonseling from "../view/screens/telekonseling/HomeTelekonseling";
import JadwalDokter from "../view/screens/informasi/JadwalDokter";
import RiwayatKunjungan from "../view/screens/riwayat/RiwayatKunjungan";
import FaqHomeScreen from "../view/screens/faq/FaqHomeScreen";
import { Pendaftaran } from "../view/screens/pendaftaran/Pendaftaran";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        // initialRouteName="Onboarding"
        screenOptions={{
          headerShown: false, // Menyembunyikan header secara default
        }}>
        <Stack.Screen name="Amino Care" component={HomeTabs} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Favorites" component={FavoriteScreen} />
        <Stack.Screen name="Portal Informasi" component={PortalInformation} />
        <Stack.Screen name="Poli2" component={Poli2} />
        <Stack.Screen name="Klinik Umum" component={KlinikUmum} />
        <Stack.Screen name="DoctorScreen" component={DoctorScreen} />
        <Stack.Screen name="Web View" component={TestingWeb} />
        <Stack.Screen name="Pendaftaran" component={RegistrationScreen} />
        <Stack.Screen name="Testing" component={Regist} />
        {/* Niat */}
        <Stack.Group>
          <Stack.Screen
            name="Daftar Online"
            component={Pendaftaran}
            options={{
              title: "Masuk",
            }}
          />
          <Stack.Screen
            name="Telekonseling"
            component={HomeTelekonseling}
            options={{
              title: "Masuk",
            }}
          />
          <Stack.Screen
            name="Jadwal Dokter"
            component={JadwalDokter}
            options={{
              title: "Masuk",
            }}
          />
          <Stack.Screen
            name="Riwayat Kunjungan"
            component={RiwayatKunjungan}
            options={{
              title: "Masuk",
            }}
          />
          <Stack.Screen
            name="FAQ"
            component={FaqHomeScreen}
            options={{
              title: "Masuk",
            }}
          />
        </Stack.Group>
        {/* End Niat */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login Screen"
          component={LoginScreen}
        />
        <Stack.Screen name="Poli Information" component={PoliInformation} />
        {/* <Stack.Screen name="Poli1" component={Poli1} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

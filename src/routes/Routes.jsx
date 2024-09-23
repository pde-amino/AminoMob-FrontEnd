import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import HomeTabs from "./tabs";
import FavoriteScreen from "../view/screens/home/FavoriteScreen";
import Poli2 from "../view/screens/poli/Poli2";
import PortalInformation from "../view/screens/poli/PortalInformasi";
import KlinikUmum from "../view/screens/poli/KlinikUmum";
import DoctorScreen from "../view/screens/poli/DoctorScreen";
import TestingWeb from "../view/screens/web/TestingWeb";
import LoginScreen from "../view/screens/auth/LoginScreen";
import PoliInformation from "../view/screens/poli/PoliInformation";
import OnboardingScreen from "../view/screens/home/OnboardingScreen";
import SignupScreen from "../view/screens/auth/SignupScreen";
import HomeTelekonseling from "../view/screens/telekonseling/HomeTelekonseling";
import RiwayatKunjungan from "../view/screens/riwayat/RiwayatKunjungan";
import FaqHomeScreen from "../view/screens/faq/FaqHomeScreen";
import { TambahPasien } from "../view/screens/pendaftaran/TambahPasien";
import InformasiUmum from "../view/screens/informasi/InformasiUmum";
import InformasiRumahSakit from "../view/screens/informasi/InformasiRumahSakit";
import ListPasien from "../view/screens/pendaftaran/ListPasien";
import BookingScreen from "../view/screens/Verifikasi/BookingScreen";
import InformasiTempatTidur from "../view/screens/informasi/InformasiTempatTidur";
import ProfileScreen from "../view/screens/auth/ProfileScreen";
import LayananNonBPJS from "../view/screens/layanan/LayananNonBPJS";
import { PilihPoli } from "../view/screens/pendaftaran/PilihPoli";
import Swafoto from "../contex/SwaFoto";
import DisplayPhoto from "../contex/DisplayPhoto";
import VerifikasiPage from "../contex/VerifikasiPage";
import InformasiDokter from "../view/screens/informasi/InformasiDokter";
import SearchDokter from "../view/screens/informasi/SearchDokter";
import EditProfileScreen from "../view/screens/auth/EditProfileScreen";
import { TambahPasienLama } from "../view/screens/pendaftaran/TambahPasienLama";
import InfoListPasien from "../view/screens/informasi/InfoListPasien";
import OTPInputScreen from "../view/screens/auth/OTPInputScreen";
import SplashScreen from "../view/screens/home/SplashScreen";
import DetailDoctorScreen from "../view/screens/informasi/DetailDoctorScreen";
import ArticleKesehatan from "../view/screens/web/ArticleKesehatan";
import AllArticle from "../view/screens/web/AllArticle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ActivityIndicator, View } from "react-native";
import * as SecureStore from "expo-secure-store";
import { AuthContex } from "../contex/AuthProvider";
import GetUserData from "../view/screens/auth/GetUserData";
import ScreenEditProfile from "../view/screens/auth/ScreenEditProfile";
import ChangePasswordForm from "../view/screens/auth/ChangePasswordForm";
import ChatAI from "../view/screens/web/ChatAI";
import LupaPassword from "../view/screens/auth/LupaPassword";
import FloatingButton from "../components/FloatingButton";
import AIScreen from "../view/screens/layanan/AIScreen";

const Stack = createNativeStackNavigator();

export default function Routes() {
  const { auth, setAuth } = useContext(AuthContex);
  const [initialRoute, setInitialRoute] = useState("Splash"); // Pastikan ada default yang aman
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const user = await GetUserData();

        if (user) {
          await AsyncStorage.setItem("userInfo", JSON.stringify(user));
          setAuth(user);
          // console.log("User ID:", user);
        } else {
          setInitialRoute("LoginScreen");
        }

        const isFirstLaunch = await AsyncStorage.getItem("isFirstLaunch");
        if (isFirstLaunch === null) {
          await AsyncStorage.setItem("isFirstLaunch", "false");
          setInitialRoute("Onboarding");
        } else {
          const token = await SecureStore.getItemAsync("userToken");
          // console.log(SecureStore.getItem());
          if (token) {
            setInitialRoute("HomeScreen");
          } else {
            setInitialRoute("LoginScreen");
          }
        }
      } catch (error) {
        // console.log("Gagal memuat data:", error);
        setInitialRoute("LoginScreen");
      } finally {
        setLoading(false);
      }
    };

    initialize();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{
          headerShown: false, // Menyembunyikan header secara default
        }}
      >
        <Stack.Screen name="Home Screen" component={HomeTabs} />
        <Stack.Screen
          name="ChangePasswordScreen"
          component={ChangePasswordForm}
        />
        <Stack.Screen name="Edit Profiles" component={ScreenEditProfile} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Favorites" component={FavoriteScreen} />
        <Stack.Screen name="Portal Informasi" component={PortalInformation} />
        <Stack.Screen name="Poli2" component={Poli2} />
        <Stack.Screen name="Klinik Umum" component={KlinikUmum} />
        <Stack.Screen name="DoctorScreen" component={DoctorScreen} />
        <Stack.Screen name="Web View" component={TestingWeb} />
        <Stack.Screen name="ChatAI" component={ChatAI} />
        <Stack.Screen name="AI" component={AIScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name="LupaPassword" component={LupaPassword} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Edit Profil" component={EditProfileScreen} />
        {/* Pendaftaran */}
        <Stack.Screen name="OTPInputScreen" component={OTPInputScreen} />
        <Stack.Screen name="Tambah Pasien Baru" component={TambahPasien} />
        <Stack.Screen name="Tambah Pasien Lama" component={TambahPasienLama} />
        <Stack.Screen name="Detail Dokter" component={DetailDoctorScreen} />
        <Stack.Screen name="Pilih Poli" component={PilihPoli} />
        <Stack.Screen name="List Pasien" component={ListPasien} />
        {/* Niat */}
        <Stack.Group>
          <Stack.Screen
            name="Profile Screen"
            component={ProfileScreen}
            options={{
              title: "Profile",
            }}
          />

          <Stack.Screen
            name="Article"
            component={ArticleKesehatan}
            options={{
              title: "Artikel",
            }}
          />

          <Stack.Screen
            name="AllArticle"
            component={AllArticle}
            options={{
              title: "Artikel Amino",
            }}
          />

          <Stack.Screen
            name="Informasi Rumah Sakit"
            component={InformasiRumahSakit}
            options={{
              title: "Informasi RS",
            }}
          />
          <Stack.Screen name="Telekonseling" component={HomeTelekonseling} />

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
        <Stack.Screen name="Swafoto" component={Swafoto} />
        <Stack.Screen name="DisplayPhoto" component={DisplayPhoto} />
        <Stack.Screen name="VerifikasiPage" component={VerifikasiPage} />
        {/* End Niat */}
        {/* Public */}
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login Screen"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Informasi Umum"
          component={InformasiUmum}
          options={{
            title: "Masuk",
          }}
        />
        <Stack.Screen
          name="Informasi Dokter"
          component={InformasiDokter}
          options={{
            title: "Masuk",
          }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="InfoTT"
          component={InformasiTempatTidur}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="LayananNonBPJS"
          component={LayananNonBPJS}
        />
        <Stack.Screen name="Poli Information" component={PoliInformation} />
        <Stack.Screen name="Booking Screen" component={BookingScreen} />
        <Stack.Screen name="Search Poli" component={SearchDokter} />
      </Stack.Navigator>
      {/* <FloatingButton /> */}
    </NavigationContainer>
  );
}

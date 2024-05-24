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
import SignupScreenBaru from "../view/screens/auth/SignupScreenBaru";
import SignupScreenLama from "../view/screens/auth/SignupScreenLama";
import HomeTelekonseling from "../view/screens/telekonseling/HomeTelekonseling";
import RiwayatKunjungan from "../view/screens/riwayat/RiwayatKunjungan";
import FaqHomeScreen from "../view/screens/faq/FaqHomeScreen";
import { Pendaftaran } from "../view/screens/pendaftaran/Pendaftaran";
import InformasiUmum from "../view/screens/informasi/InformasiUmum";
import InformasiRumahSakit from "../view/screens/informasi/InformasiRumahSakit";
import DiriSendiri from "../view/screens/pendaftaran/DiriSendiri";
import BookingScreen from "../view/screens/Verifikasi/BookingScreen";
import InformasiTempatTidur from "../view/screens/informasi/InformasiTempatTidur";
import ProfileScreen from "../view/screens/auth/ProfileScreen";
import LayananNonBPJS from "../view/screens/layanan/LayananNonBPJS";
import { PilihPoli } from "../view/screens/pendaftaran/PilihPoli";
import Swafoto from "../contex/SwaFoto";
import DisplayPhoto from "../contex/DisplayPhoto";
import VerifikasiPage from "../contex/VerifikasiPage";
import InformasiDokter from "../view/screens/informasi/InformasiDokter";
import SearchPoli from "../view/screens/informasi/SearchDokter";
import SearchPage from "../view/screens/informasi/SearchDokter";
import SearchDokter from "../view/screens/informasi/SearchDokter";
import EditProfileScreen from "../view/screens/auth/EditProfileScreen";

const Stack = createNativeStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator //Untuk mengatur screen yang ingin ditampilkan pertama
        // initialRouteName="Onboarding"
        initialRouteName="Login Screen"
        screenOptions={{
          headerShown: false, // Menyembunyikan header secara default
        }}>
        <Stack.Screen name="Home Screen" component={HomeTabs} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Favorites" component={FavoriteScreen} />
        <Stack.Screen name="Portal Informasi" component={PortalInformation} />
        <Stack.Screen name="Poli2" component={Poli2} />
        <Stack.Screen name="Klinik Umum" component={KlinikUmum} />
        <Stack.Screen name="DoctorScreen" component={DoctorScreen} />
        <Stack.Screen name="Web View" component={TestingWeb} />
        <Stack.Screen name="Signup Baru" component={SignupScreenBaru} />
        <Stack.Screen name="Signup Lama" component={SignupScreenLama} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Edit Profil" component={EditProfileScreen} />
        {/* Pendaftaran */}
        <Stack.Screen
          screenOptions={{ headerShown: true }}
          name="Pendaftaran Poli"
          component={Pendaftaran}
        />
        <Stack.Screen
          screenOptions={{ headerShown: true }}
          name="Pilih Poli"
          component={PilihPoli}
        />
        <Stack.Screen
          screenOptions={{ headerShown: true }}
          name="Dirisendiri"
          component={DiriSendiri}
        />
        {/* Niat */}
        <Stack.Group>
          <Stack.Screen
            name="Profile Screen"
            screenOptions={{ headerShown: true }}
            component={ProfileScreen}
            options={{
              title: "Profile",
            }}
          />
          <Stack.Screen
            name="Daftar Online"
            screenOptions={{ headerShown: true }}
            component={DiriSendiri}
            options={{
              title: "Masuk",
            }}
          />
          <Stack.Screen
            name="Informasi Rumah Sakit"
            component={InformasiRumahSakit}
            options={{
              title: "Informasi RS",
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
        {/* <Stack.Screen name="Poli1" component={Poli1} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

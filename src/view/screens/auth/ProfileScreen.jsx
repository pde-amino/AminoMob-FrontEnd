import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar } from "react-native-paper";
import HeaderComponent from "../../../components/HeaderComponent";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import ButtonPrimary from "../../../components/ButtonPrimary";
import GlobalStyles from "../../../style/GlobalStyles";
import { useContext } from "react";
import { AuthContex } from "../../../contex/AuthProvider";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import BannerComponent from "../../../components/BannerComponent";
import ButtonSecondary from "../../../components/ButtonSecondary";
import ConfirmModal from "../../../components/ConfirmModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const { data } = useContext(AuthContex);
  const { logout } = useContext(AuthContex);
  console.log("inidarihomescreen", data);

  const navigation = useNavigation();

  const [banner, setBannerVis] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [RM, setRM] = useState("1234567890");
  const [phone, setPhone] = useState("1234567890");
  const [address, setAddress] = useState("123 Main St, Anytown, CA 12345");
  const [password, setPassword] = useState("1234567890");
  const [confirmPassword, setConfirmPassword] = useState("1234567890");
  const [avatarSource, setAvatarSource] = useState(null);

  // useEffect(() => {
  //   if (data.status === "Proses") {
  //     setBannerVis(true);
  //   } else {
  //     setBannerVis(false);
  //   }
  // }, [data.status]);
  // useEffect(() => {
  //   if (data.status === "Proses") {
  //     setBannerVis(true);
  //   } else {
  //     setBannerVis(false);
  //   }
  // }, [data.status]);

  // const handleLogout = () => {
  //   // Add your logout logic here
  //   authLogout(); // Assuming `authLogout` is a function provided by the AuthContex to log the user out
  //   setConfirmLogout(false); // Close the confirmation modal
  //   navigation.navigate("Login Screen"); // Navigate to the login screen or any other screen
  // };

  const maskName = (name) => name.replace(/\B\w/g, "●");

  const displayName = maskName(name);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
      navigation.navigate("Login Screen");
      Alert.alert("Logout", "Anda telah berhasil logout.");
      logout();
    } catch (error) {
      Alert.alert("Error", "Logout gagal. Silakan coba lagi.");
      console.error("Error removing userInfo from AsyncStorage", error);
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <HeaderComponent title="Profil" />
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginTop: 16,
            flex: 2,
          }}
        >
          <Avatar.Image
            size={80}
            source={require("../../../../assets/avatar.png")}
          />
        </View>

        <View style={{ gap: 10, flex: 2 }}>
          <View style={{ alignItems: "center" }}>
            <Text style={GlobalStyles.h2}>{name}</Text>
          </View>
          <View style={{ marginHorizontal: 20 }}>
            <Text style={GlobalStyles.h4}>Alamat</Text>
            <Text>{address}</Text>
          </View>
          <Divider />
          <View style={{ marginHorizontal: 20 }}>
            <Text style={GlobalStyles.h4}>Alamat</Text>
            <Text>{address}</Text>
          </View>
          <Divider />
          <View style={{ marginHorizontal: 20 }}>
            <Text style={GlobalStyles.h4}>Alamat</Text>
            <Text>{address}</Text>
          </View>
          <Divider />
          <View style={{ marginHorizontal: 20 }}>
            <Text style={GlobalStyles.h4}>Alamat</Text>
            <Text>{address}</Text>
          </View>
          <Divider />
        </View>

        <View style={GlobalStyles.btnContainer}>
          <ButtonPrimary
            title="Edit Profil"
            onPress={() => navigation.navigate("Edit Profil")}
          />
        </View>
        <View style={GlobalStyles.btnContainer}>
          <ButtonSecondary title={"Log Out"} onPress={() => handleLogout()} />
        </View>
        {confirmLogout && (
          <ConfirmModal
            visible={confirmLogout}
            message={"Apakah anda yakin ingin keluar?"}
            onCancel={() => setConfirmLogout(false)}
            onConfirm={"#"}
            confirmButtonText={"Ya"}
            cancelButtonText={"Tidak"}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

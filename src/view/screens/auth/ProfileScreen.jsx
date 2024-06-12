import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
  SafeAreaView,
  Alert,
  RefreshControl,
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
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";

const ProfileScreen = () => {
  const { logout, auth } = useContext(AuthContex);
  // console.log("log yang muncul dari screen profilescreen", auth);

  const navigation = useNavigation();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [address, setAddress] = useState("123 Main St, Anytown, CA 12345");

  const [dataUser, setDataUser] = useState(null);

  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cariId/${auth.user.id}`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`, // Pastikan token disertakan dalam header jika diperlukan
        },
      });
      console.log("FetCH Response data:", response.data); // Logging response data

      const nmData = response.data.user[0];
      setDataUser(nmData);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      console.error("Error response data:", error.response?.data);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
      navigation.navigate("Login Screen");
      logout();
      // Alert.alert("Logout", "Anda telah berhasil logout.");
    } catch (error) {
      Alert.alert("Error", "Logout gagal. Silakan coba lagi.");
      console.error("Error removing userInfo from AsyncStorage", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true); // Mulai refreshing
    fetchData(); // Panggil fungsi fetchData untuk mengambil data terbaru
    // setRefreshing(false); // Mulai refreshing
  };
  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <HeaderComponent title="Profil" />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
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

        {dataUser ? (
          <View style={{ gap: 10, flex: 1, backgroundColor: "pink" }}>
            <View style={{ alignItems: "center", gap: 4 }}>
              <Text style={GlobalStyles.h2}>{dataUser.nama}</Text>
              <Text>{dataUser.telp}</Text>
            </View>
          </View>
        ) : (
          <Text>Loading...</Text> // Display a loading indicator while fetching data
        )}
        <View style={GlobalStyles.btnContainer}>
          <ButtonPrimary
            title="Edit Profil"
            onPress={() => navigation.navigate("Edit Profil")}
          />
        </View>
        <View style={GlobalStyles.btnContainer}>
          <ButtonSecondary
            title={"Log Out"}
            onPress={() => setConfirmLogout(true)}
          />
        </View>

        {confirmLogout && (
          <ConfirmModal
            visible={confirmLogout}
            message={"Apakah anda yakin ingin keluar?"}
            onCancel={() => setConfirmLogout(false)}
            onConfirm={() => handleLogout()}
            confirmButtonText={"Ya"}
            cancelButtonText={"Tidak"}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

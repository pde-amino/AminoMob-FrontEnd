import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
  RefreshControl,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Avatar } from "react-native-paper";
import HeaderComponent from "../../../components/HeaderComponent";
import GlobalStyles from "../../../style/GlobalStyles";
import { useContext } from "react";
import { AuthContex } from "../../../contex/AuthProvider";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import ButtonSecondary from "../../../components/ButtonSecondary";
import ConfirmModal from "../../../components/ConfirmModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";

const ProfileScreen = () => {
  const { logout, auth } = useContext(AuthContex);
  const navigation = useNavigation();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cariId/${auth.user.id}`, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      setDataUser(response.data.user);
      console.log("Fetch Response data:", response.data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
      console.error("Error response data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true); // Set loading true before fetching data
      fetchData();
    }, [])
  );

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("userInfo");
      logout();
      navigation.navigate("Login Screen");
      Alert.alert("Logout", "Anda telah berhasil logout.");
    } catch (error) {
      Alert.alert("Error", "Logout gagal. Silakan coba lagi.");
      console.error("Error removing userInfo from AsyncStorage", error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true); // Set loading true before refreshing data
    fetchData();
  };

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <HeaderComponent title="Profil" />
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{ alignItems: "center", marginTop: 16, flex: 2 }}>
            <Avatar.Image
              size={80}
              source={require("../../../../assets/avatar.png")}
            />
          </View>

          {dataUser ? (
            <View style={{ gap: 10, flex: 1 }}>
              <View style={{ alignItems: "center", gap: 4 }}>
                <Text style={GlobalStyles.h2}>
                  {dataUser.nama ? dataUser.nama : "Hai, ini data kamu"}
                </Text>
                <View>
                  <Text>Nomor Telepon</Text>
                  <Text style={GlobalStyles.h4}>{dataUser.telp}</Text>
                </View>
                <View>
                  <Text>Tanggal Lahir</Text>
                  <Text style={GlobalStyles.h4}>{dataUser.tgl_lahir}</Text>
                </View>
              </View>
            </View>
          ) : (
            <Text>Loading...</Text>
          )}

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
              onConfirm={handleLogout}
              confirmButtonText={"Ya"}
              cancelButtonText={"Tidak"}
            />
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

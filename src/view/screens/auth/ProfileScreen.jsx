import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
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
  console.log("auth yang muncul dari screen profilescreen", auth);

  const navigation = useNavigation();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  // try {
  //   const response = await axios.get(`${BASE_URL}/cariId/${auth.user.id}`, {
  //     headers: {
  //       Authorization: `Bearer ${auth.user.token}`,
  //     },
  //   });
  //   setDataUser(response.data.user);
  //   console.log("Fetch Response data:", response.data);
  // } catch (error) {
  //   console.error("Error fetching user data:", error.message);
  //   console.error("Error response data:", error);
  // } finally {
  //   setLoading(false);
  //   setRefreshing(false);
  // }

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
      if (error.message === "Request failed with status code 401") {
        AsyncStorage.removeItem("userInfo");
        logout();
        navigation.replace("Login Screen");
        Alert.alert(
          "Maaf",
          "Hanya bisa login di satu perangkat, silakan logout di perangkat yang lain"
        );
        return;
      }
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
      <View style={{ flex: 1 }}>
        <HeaderComponent title="Profil" />
      </View>
      <View style={{ flex: 8 }}>
        {loading ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View style={styles.containerAvatar}>
              <Avatar.Image
                size={80}
                source={require("../../../../assets/avatar.png")}
              />
              <Text style={GlobalStyles.h2}>
                {dataUser.nama ? dataUser.nama : "Hai, ini data kamu"}
              </Text>
            </View>

            {dataUser ? (
              <View style={{ gap: 12, padding: 20 }}>
                <View>
                  <Text>Nomor Telepon</Text>
                  <Text style={GlobalStyles.h4}>{dataUser.telp}</Text>
                </View>
                <View>
                  <Text>Tanggal Lahir</Text>
                  <Text style={GlobalStyles.h4}>{dataUser.tgl_lahir}</Text>
                </View>
              </View>
            ) : (
              <Text>Loading...</Text>
            )}

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
      </View>
      <View style={{ flex: 1 }}>
        <View style={GlobalStyles.btnContainer}>
          <ButtonSecondary
            title={"Log Out"}
            onPress={() => setConfirmLogout(true)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerAvatar: {
    alignItems: "center",
    margin: 20,
    flexDirection: "row",
    gap: 16,
  },
});

export default ProfileScreen;

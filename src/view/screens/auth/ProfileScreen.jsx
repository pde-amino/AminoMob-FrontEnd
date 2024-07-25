import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Alert,
  RefreshControl,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Icon,
  TouchableRipple,
} from "react-native-paper";
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
import ButtonPrimary from "../../../components/ButtonPrimary";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";

const ProfileScreen = () => {
  const { logout, auth } = useContext(AuthContex);
  console.log("auth yang muncul dari screen profilescreen", auth);

  const navigation = useNavigation();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cariId/${auth.user.id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "pd3@mino347",
          Authorization: `Bearer ${auth.user.token}`,
        },
      });
      setDataUser(response.data.user);
    } catch (error) {
      // if (error.message === "Request failed with status code 401") {
      //   AsyncStorage.removeItem("userInfo");
      //   logout();
      //   navigation.replace("Login Screen");
      //   Alert.alert(
      //     "Maaf",
      //     "Hanya bisa login di satu perangkat, silakan logout di perangkat yang lain"
      //   );
      //   return;
      // }
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
      navigation.replace("Login Screen");
      Alert.alert("Logout", "Anda telah berhasil logout.");
    } catch (error) {
      if (error.includes("Cannot read property")) {
        logout();
        navigation.replace("Login Screen");
        Alert.alert(
          "Maaf",
          "Akun Anda login menggunakan perangkat lain, hanya bisa login dengan satu perangkat",
          [{ text: "OK", onPress: () => paksaLogout() }]
        );
      } else {
        Alert.alert("Error", "Logout gagal. Silakan coba lagi.");
      }
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setLoading(true); // Set loading true before refreshing data
    fetchData();
  };

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <View style={{ height: hp(10) }}>
        <HeaderComponent title="Profil" />
      </View>
      <View style={{ height: hp(90) }}>
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

            <View style={{ gap: 12 }}>
              <Divider />

              {dataUser.level === "1" ? (
                <>
                  <TouchableOpacity
                    style={styles.containerMenu}
                    onPress={() => navigation.replace("Web View")}
                  >
                    <Icon source="chat-alert" size={24} />
                    <Text style={GlobalStyles.textBold}>Lapor Amino</Text>
                  </TouchableOpacity>
                </>
              ) : null}

              <Divider />

              <TouchableOpacity
                style={styles.containerMenu}
                onPress={() => setConfirmLogout(true)}
              >
                <Icon source={"logout"} color="#430D09" size={24} />
                <Text style={[GlobalStyles.textBold, { color: "#430D09" }]}>
                  Logout
                </Text>
              </TouchableOpacity>

              <Divider />
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
      </View>

      {/* <View style={{ flex: 1 }}>
        <View style={GlobalStyles.btnContainer}>
          <ButtonSecondary
            title={"Log Out"}
            onPress={() => setConfirmLogout(true)}
          />
        </View>
      </View> */}
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
  containerMenu: {
    marginHorizontal: 20,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default ProfileScreen;

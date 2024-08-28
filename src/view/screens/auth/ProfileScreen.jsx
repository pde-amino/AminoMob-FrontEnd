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
import { Avatar, Divider, Icon } from "react-native-paper";
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
import AlertFormComponent from "../../../components/AlertFormComponent";

const ProfileScreen = () => {
  const { logout, auth } = useContext(AuthContex);
  const navigation = useNavigation();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [dellAccount, setDellAccount] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAlertVisible, setAlertVisible] = useState(false);

  const handleOpenAlert = () => {
    setAlertVisible(true);
  };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  const handleSubmit = async () => {
    try {
      await axios.delete(`${BASE_URL}/user/${user}`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          Authorization: `Bearer ${token}`,
        },
        data: {
          telp: telp,
          password: password,
        },
      });
      await AsyncStorage.removeItem("userInfo");

      Alert.alert("Sukses", "Akun berhasil dihapus", [
        {
          text: "OK",
          onPress: () => {
            navigation.replace("Login Screen");
          },
        },
      ]);
    } catch (error) {
      if (error.response) {
        // Menangani error yang dikembalikan oleh server
        const errorMessage =
          error.response.data.messages.error || "Unknown error";

        if (error.response.status === 401) {
          // Alert.alert("Perhatian", errorMessage);
          Alert.alert(
            "Perhatian",
            "Sesi Login anda telah berakhir mohon lakukan login ulang"
          );
          navigation.replace("Login Screen");
        } else {
          // Menangani error lain yang mungkin terjadi
          Alert.alert("Error", `Terjadi kesalahan: ${errorMessage}`);
        }

        // console.log("Error Response Data:", error.response.data);
        // console.log("Error Response Status:", error.response.status);
      } else if (error.request) {
        // Jika tidak ada respons dari server
        // console.log("No Response Received:", error.request);
        Alert.alert("Peringatan", "Silakan coba lagi nanti.");
      } else {
        // Error lainnya
        // console.log("Error Message:", error.message);
        Alert.alert(
          "Peringatan",
          `Terdapat kesalahan data mohon lakukan login ulang`
        );
        navigation.replace("Login Screen");
      }
    } finally {
      return;
    }
  };

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${BASE_URL}/cariId/${auth.id}`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "x-api-key":
  //           "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
  //         Authorization: `Bearer ${auth.token}`,
  //       },
  //     });
  //     setDataUser(response.data.user);
  //   } catch (error) {
  //     Alert.alert(
  //       "Maaf",
  //       "Terjadi kesalahan saat mengambil data, silakan silahkan Login ulang"
  //     );
  //   } finally {
  //     setLoading(false);
  //     setRefreshing(false);
  //   }
  // };

  // useFocusEffect(
  //   useCallback(() => {
  //     setLoading(true);
  //     // fetchData();
  //   }, [])
  // );

  const HapusAkun = () => {
    Alert.alert("Hapus Akun", "Apakah Anda yakin ingin menghapus akun?", [
      {
        text: "Tidak",
        style: "cancel",
      },
      {
        text: "Ya",
        onPress: () => {
          handleOpenAlert();
        },
      },
    ]);
  };

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

  // const onRefresh = () => {
  //   setRefreshing(true);
  //   setLoading(true);
  //   // fetchData();
  // };

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <View style={{ height: hp(10) }}>
        <HeaderComponent title="Profil" />
      </View>
      <View style={{ height: hp(90) }}>
        {/* {loading ? (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : ( */}
        <ScrollView
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
        >
          <View style={styles.containerAvatar}>
            <Avatar.Image
              size={80}
              source={require("../../../../assets/avatar.png")}
            />
            <Text style={GlobalStyles.h2}>
              {auth.nama ? auth.nama : "Hai, Apakah kamu sudah login?"}
            </Text>
            <TouchableOpacity onPress={() => setDellAccount(true)}>
              <Icon source={"cog-outline"} color="gray" size={24} />
            </TouchableOpacity>
          </View>

          {auth ? (
            <View style={{ gap: 12, padding: 20 }}>
              <View>
                <Text>Nomor Telepon</Text>
                <Text style={GlobalStyles.h4}>{auth.hp}</Text>
              </View>
              {/* <View>
                <Text>Tanggal Lahir</Text>
                <Text style={GlobalStyles.h4}>{auth.tgl_lahir}</Text>
              </View> */}
            </View>
          ) : (
            <Text>Loading...</Text>
          )}

          <View style={{ gap: 12 }}>
            <Divider />
            {auth.level === "1" ? (
              <View style={{ gap: 12 }}>
                <TouchableOpacity
                  style={styles.containerMenu}
                  onPress={() => navigation.replace("Web View")}>
                  <Icon source="chat-alert" size={24} />
                  <Text style={GlobalStyles.textBold}>Lapor Amino</Text>
                </TouchableOpacity>
                <Divider />
              </View>
            ) : null}

            <TouchableOpacity
              style={styles.containerMenu}
              onPress={() => setConfirmLogout(true)}>
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
          {dellAccount && (
            <ConfirmModal
              visible={dellAccount}
              message={"Hapus Akun"}
              submessage={`Apakah Anda ingin menghapus akun ${auth.hp}`}
              onCancel={() => setDellAccount(false)}
              onConfirm={HapusAkun}
              confirmButtonText={"Ya"}
              cancelButtonText={"Tidak"}
            />
          )}
          <AlertFormComponent
            title={"Masukan Password"}
            placeholder={"Password"}
            visible={isAlertVisible}
            onClose={handleCloseAlert}
            onSubmit={handleSubmit}
            secure={true}
          />
        </ScrollView>
        {/* )} */}
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
  containerMenu: {
    marginHorizontal: 20,
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});

export default ProfileScreen;

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
  FlatList,
  Button,
  Platform,
} from "react-native";
import React, { useCallback, useState } from "react";
import { Avatar, Divider, Icon, Modal, Portal } from "react-native-paper";
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
import ModalComponent from "../../../components/ModalComponent";
import CardButtonComponent from "../../../components/CardButtonComponent";
import { StatusBar } from "expo-status-bar";

const ProfileScreen = () => {
  const { logout, auth } = useContext(AuthContex);
  const navigation = useNavigation();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [dellAccount, setDellAccount] = useState(false);
  const [dataUser, setDataUser] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAlertVisible, setAlertVisible] = useState(false);
  const [manages, setManages] = useState(false);
  const [password, setPassword] = useState(false);
  const WARNA = { primary: "#0A78E2", white: "#fff" };
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const handleCloseAlert = () => {
    setAlertVisible(false);
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
  };

  const handleSubmit = async () => {
    try {
      // console.log(auth);
      await axios.delete(`${BASE_URL}/user/${auth.id}`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          Authorization: `Bearer ${auth.token}`,
        },
        data: {
          telp: auth.hp,
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
          Alert.alert(
            "Perhatian",
            "Sesi Login anda telah berakhir mohon lakukan login ulang"
          );
          navigation.replace("Login Screen");
        }

        // console.log("Error Response Data:", error.response.data);
        // console.log("Error Response Status:", error.response.status);
      } else if (error.request) {
        // Jika tidak ada respons dari server
        // console.log("No Response Received:", error.request);
        Alert.alert("Peringatan", "Silahkan coba lagi nanti.");
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

  const HapusAkun = () => {
    Alert.alert("Hapus Akun", "Apakah Anda yakin ingin menghapus akun?", [
      {
        text: "Tidak",
        style: "cancel",
      },
      {
        text: "Ya",
        onPress: () => {
          setAlertVisible(true);
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
    <SafeAreaView
      style={[
        GlobalStyles.utama,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}>
      <HeaderComponent title="Profil" />
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
          {auth.nama ? (
            <>
              <Text style={GlobalStyles.h2}>{auth.nama}</Text>
              <TouchableOpacity onPress={() => setDellAccount(true)}>
                <Icon source={"cog-outline"} color="#565D5E" size={24} />
              </TouchableOpacity>
            </>
          ) : (
            <Text style={GlobalStyles.h2}>Hai, Anda belum Login</Text>
          )}
          {/* <TouchableOpacity
              onPress={() => navigation.navigate("Edit Profil", auth)}>
              <Text>Tess</Text>
            </TouchableOpacity> */}
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
        ) : null}

        <View style={{ gap: 12 }}>
          <Divider />
          {auth.level === "1" ? (
            <View style={{ gap: 12 }}>
              <TouchableOpacity
                style={styles.containerMenu}
                onPress={() => navigation.replace("Web View")}>
                <Icon color="#000" source="chat-alert" size={24} />
                <Text style={GlobalStyles.textBold}>Lapor Amino</Text>
              </TouchableOpacity>
              <Divider />
            </View>
          ) : null}

          {auth ? (
            <>
              <TouchableOpacity
                style={styles.containerMenu}
                onPress={() => setConfirmLogout(true)}>
                <Icon source={"logout"} color="#430D09" size={24} />
                <Text style={[GlobalStyles.textBold, { color: "#430D09" }]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              style={styles.containerMenu}
              onPress={() => navigation.replace("Login Screen")}>
              <Icon source={"login"} color="#0A78E2" size={24} />
              <Text style={[GlobalStyles.textBold, { color: "#0A78E2" }]}>
                Login Sekarang
              </Text>
            </TouchableOpacity>
          )}

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
          <Portal>
            <Modal
              visible={dellAccount}
              onDismiss={() => setDellAccount(false)}
              contentContainerStyle={containerStyle}>
              <View>
                <Text style={{ marginBottom: 20, fontWeight: "bold" }}>
                  Pengaturan Akun
                </Text>
                <ButtonPrimary
                  title={"Ubah Data"}
                  onPress={() => {
                    navigation.navigate("Edit Profil", auth),
                      setDellAccount(false);
                  }}
                />
                <ButtonSecondary
                  title={"Hapus Akun"}
                  onPress={() => HapusAkun()}
                />
              </View>
            </Modal>
          </Portal>

          // <ConfirmModal
          //   visible={dellAccount}
          //   message={"Pengaturan Akun"}
          //   // submessage={`Apakah Anda ingin menghapus akun ${auth.hp}`}
          //   onCancel={() => setDellAccount(false)}
          //   onConfirm={HapusAkun}
          //   confirmButtonText={"Ya"}
          //   cancelButtonText={"Tidak"}>
          //   <View>
          //     <ButtonPrimary title={"Atur Akun"} />
          //     <ButtonSecondary title={"Hapus Akun"} />
          //   </View>
          // </ConfirmModal>

          // <ConfirmModal
          //   visible={dellAccount}
          //   message={"Hapus Akun"}
          //   submessage={`Apakah Anda ingin menghapus akun ${auth.hp}`}
          //   onCancel={() => setDellAccount(false)}
          //   onConfirm={HapusAkun}
          //   confirmButtonText={"Ya"}
          //   cancelButtonText={"Tidak"}
          // />
        )}
        <AlertFormComponent
          title={"Masukan Password"}
          placeholder={"Password"}
          visible={isAlertVisible}
          onClose={handleCloseAlert}
          onSubmit={handleSubmit}
          secure={true}
          onChangeText={handlePasswordChange}
        />
        {/* <AlertFormComponent
            title={"Masukan Password"}
            placeholder={"Password"}
            visible={manages}
            onClose={() => setManages(false)}
            onSubmit={""}
            secure={true}
          /> */}
      </ScrollView>
      {/* )} */}
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

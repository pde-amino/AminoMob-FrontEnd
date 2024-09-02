import React, { useContext, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonPrimary from "../../../components/ButtonPrimary";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import { AuthContex } from "../../../contex/AuthProvider";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalStyles from "../../../style/GlobalStyles";
import { BASE_URL } from "../../../contex/Config";
import * as Network from "expo-network";
import * as SecureStore from "expo-secure-store";
import NetInfo from "@react-native-community/netinfo";
import GetIPButton from "../../../components/GetIpButton";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const { auth, setAuth } = useContext(AuthContex);

  const handleUsernameChange = (input) => {
    setUsername(input);
    const onlyNumbers = /^[0-9]+$/.test(input);
    setUsernameError(onlyNumbers ? "" : "Cuma boleh pakai angka");
  };

  const handlePasswordChange = (input) => {
    setPassword(input);
    const containsSpecialChar = /[!@#$%^&*()_=+\-\[\]{};':"\\|,.<>\/?]/.test(
      input
    );
    if (containsSpecialChar) {
      setPasswordError("Tidak boleh menggunakan karakter khusus");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async () => {
    const storeToken = async (token) => {
      try {
        await SecureStore.setItemAsync("userData", JSON.stringify(token));
        // console.log("Token berhasil disimpan");
      } catch (error) {
        // console.log("Gagal menyimpan token:", error);
      }
    };
    try {
      await AsyncStorage.removeItem("userInfo");
      setLoading(true);
      const ip = await Network.getIpAddressAsync(
        Network.NetworkStateType.CELLULAR
      );

      const response = await axios
        .post(
          `${BASE_URL}/login`,
          {
            user: username,
            password: password,
            ip: ip,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key":
                "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
            },
          }
        )
        .then(async (response) => {
          const userInfo = response.data;

          const userData = {
            id: userInfo.user.id,
            status: userInfo.user.status,
            token: userInfo.user.token,
            nama: userInfo.user.nama,
            hp: userInfo.user.hp,
            level: userInfo.user.level,
          };

          storeToken(userData);
          await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          setAuth(userData);
          setLoading(false);
          navigation.replace("Home Screen");
        })
        .catch((error) => {
          setLoading(false);

          // Jika status 429 (Too Many Requests)
          if (error.response && error.response.status === 429) {
            Alert.alert("Peringatan", "Anda telah melebihi batas percobaan.");
          } else if (error.response && error.response.status === 401) {
            // Jika error status 401 (Unauthorized)

            // console.log(error.response.data.messages.error);
            if (error.response.data.messages.error === "User belum aktif") {
              Alert.alert(
                "Upss!",
                "Status User Anda Belum Aktif, Mohon Ulangi Pendaftaran setelah Jam 12 Malam. Pastikan Anda memasukan kode OTP yang dikirim melalui SMS untuk mengaktifkan Akun.",
                [
                  {
                    text: "Mengerti",
                  },
                  // {
                  //   text: "Masukan Kode Otp",
                  //   onPress: () =>
                  //     navigation.navigate("OTPInputScreen"),
                  // },
                ],
                {
                  cancelable: true,
                }
              );
            } else if (
              error.response.data.messages.error === "Pengguna tidak ditemukan"
            ) {
              Alert.alert("Upss!", "Pengguna tidak ditemukan");
            } else if (
              error.response.data.messages.error === "Kata Sandi salah"
            ) {
              Alert.alert("Upss!", "Kata Sandi atau Nomor salah");
            } else {
              Alert.alert("Upss!", "Kata Sandi atau Nomor salah");
            }

            // Alert.alert(
            //   "Maaf",
            //   `${
            //     error.response
            //       ? "Kata Sandi atau Nomor salah"
            //       : error.message
            //   }`
            // );
          } else {
            // Error umum lainnya
            Alert.alert("Upss!", "Kata Sandi atau Nomor salah");
          }

          // console.log(
          //   "Error Login:",
          //   error.response ? error.response.data : error.message
          // );
        });
    } catch (error) {
      try {
        if (error == "AxiosError: Request failed with status code 500") {
          Alert.alert(
            "Upss!",
            "Sepertinya Kami sedang melakukan pemeliharaan sistem, mohon ulangi beberapa saat lagi"
          );
          setLoading(false);
        } else {
          Alert.alert("Ups!", "No HP atau password Anda salah");
          setLoading(false);
        }
      } catch (error) {
        Alert.alert("Maaf", "Sepertinya password atau nomor HP anda salah");
      }
    }
  };

  return (
    <View style={GlobalStyles.utama}>
      <StatusBar
        hidden={false}
        barStyle="dark-content"
        backgroundColor={"white"}
      />
      <View style={GlobalStyles.Content}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={[
                GlobalStyles.h1,
                { color: WARNA.primary, paddingBottom: 40 },
              ]}>
              Masuk
            </Text>
          </View>
          <View style={{ gap: 8, marginBottom: 12 }}>
            <TextInputIconComponent
              label="Nomor HP"
              placeholder="Masukkan No HP Anda"
              value={username}
              type={"username"}
              inputMode={"numeric"}
              onChangeText={handleUsernameChange}
            />

            <TextInputIconComponent
              label="Kata Sandi"
              placeholder="Masukkan kata sandi di sini"
              password={true}
              value={password}
              onChangeText={handlePasswordChange}
            />
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <ButtonPrimary
                title="Masuk"
                disabled={!!usernameError || !!passwordError}
                onPress={handleSubmit}
              />
              {/* <GetIPButton /> */}
            </>
          )}

          <View style={{ flexDirection: "row" }}>
            <Text style={GlobalStyles.textBiasa}>Belum punya akun?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={GlobalStyles.textLink}> Daftar Akun Sekarang</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default LoginScreen;

import React, { useContext, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  StatusBar,
  Keyboard,
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
import DeviceInfo from "react-native-device-info";
// import NetInfo from "@react-native-community/netinfo";
// import GetIPButton from "../../../components/GetIpButton";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loginDisable, setLoginDisable] = useState(false);

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

  const handleTooManyRequests = () => {
    setLoading(false);
    Alert.alert(
      "Peringatan!",
      "Anda melebihi batas percobaan, coba kembali dalam 10 menit"
    );
    setLoginDisable(true);
    let countdown = 600;
    setTimer(countdown);

    const interval = setInterval(() => {
      countdown -= 1;
      setTimer(countdown);

      if (countdown <= 0) {
        clearInterval(interval);
        setLoginDisable(false);
      }
    }, 1000);
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
      let ip;
      try {
        ip = await Network.getIpAddressAsync(Network.NetworkStateType.CELLULAR);
      } catch (error) {
        console.log("Gagal mendapatkan IP:", error);
        ip = "Unknown";
      }

      const ip2 = await DeviceInfo.getIpAddress();

      const response = await axios.post(
        `${BASE_URL}/login`,
        {
          user: username,
          password: password,
          ip: ip || ip2,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        }
      );
      // .then(async (response) => {
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
      // }
      // )
    } catch (error) {
      // console.error("ini error di catch", error.response.status);

      if (error.response && error.response.status === 401) {
        if (error.response.data.messages.error === "Kata sandi tidak cocok") {
          setLoading(false);
          Alert.alert("Maaf", "Kata sandi salah");
        } else {
          setLoading(false);
          Alert.alert("Ups!", "No HP atau password Anda salah");
        }
      } else if (error.response && error.response.status === 429) {
        handleTooManyRequests();
      } else if (error.response && error.response.status === 500) {
        setLoading(false);
        Alert.alert(
          "Maaf",
          "Server sedang dalam pemeliharaan, coba lagi setelah beberapa saat"
        );
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
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text
              style={[
                GlobalStyles.h1,
                { color: WARNA.primary, paddingBottom: 40 },
              ]}
            >
              Masuk
            </Text>
          </View>
          <View style={{ gap: 8, marginBottom: 12 }}>
            <TextInputIconComponent
              label="Nomor HP"
              placeholder="Masukkan No HP Anda"
              value={username}
              type={"nomor"}
              inputMode={"numeric"}
              onChangeText={handleUsernameChange}
            />

            <TextInputIconComponent
              label="Kata Sandi"
              placeholder="Masukkan kata sandi di sini"
              type={"password"}
              password={true}
              value={password}
              onChangeText={handlePasswordChange}
              onSubmitEditing={handleSubmit}
            />

            <View
              style={{
                alignItems: "flex-end",
                width: "100%",
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("LupaPassword")}
              >
                <Text style={GlobalStyles.textLink}>Lupa password</Text>
              </TouchableOpacity>
            </View>
          </View>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <ButtonPrimary
                title={
                  loginDisable ? `Coba lagi dalam ${timer} detik` : "Masuk"
                }
                disabled={loginDisable || !!usernameError || !!passwordError}
                onPress={handleSubmit}
              />
              {/* <GetIPButton /> */}
            </>
          )}

          <View style={{ flexDirection: "row" }}>
            <Text style={GlobalStyles.textBiasa}>Belum punya akun?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={GlobalStyles.textLink}> Daftar akun sekarang</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default LoginScreen;

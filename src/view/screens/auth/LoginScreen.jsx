import React, { useContext, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonPrimary from "../../../components/ButtonPrimary";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import BottomSheet from "../../../components/BottomSheet";
import { AuthContex } from "../../../contex/AuthProvider";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalStyles from "../../../style/GlobalStyles";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigation = useNavigation();
  const { auth, setAuth } = useContext(AuthContex);
  // console.log("Ini Data Auth :", auth);

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

  const [userInfo, setUserInfo] = useState();
  // const loginData = {
  //   status: "Sudah",
  //   // status: "Belum",
  //   // status: "Proses",
  //   ids: 7,
  //   token:
  //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsb2dpbi1hcGktcHJvamVjdCIsInN1YiI6ImxvZ2ludG9rZW4iLCJpYXQiOjE3MTY5NDM5MzcsImV4cCI6MTcxNzAzMDMzNywidWlkIjoiNSJ9.1OFftMGOGHNhcYVPc57UNROfsH0nte6bftRxtEkMTVg",
  //   role: "user",
  // };

  const login = (username, password) => {
    axios
      .post(`http://192.168.5.5:8080/login`, {
        user: username,
        password: password,
      })
      .then(async (res) => {
        const userInfo = res.data;

        // Simpan userInfo ke AsyncStorage dan tangani error di sini
        try {
          await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          setUserInfo(userInfo);

          // Periksa status respons
          if (userInfo) {
            console.log("Login berhasil. Token:", userInfo);
            // Navigasi ke screen "Amino Care" dan kirim data token dan id
            setAuth(userInfo);
            navigation.replace("Amino Care");
          } else {
            // Tangani kesalahan login
            const errorMessage = userInfo.message || "Kesalahan tidak dikenal";
            console.log("Login gagal, pesan kesalahan:", errorMessage);
          }
        } catch (error) {
          console.log("Gagal menyimpan userInfo ke AsyncStorage:", error);
        }
      })
      .catch((error) => {
        console.log("Login Error:", error);
      });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://192.168.5.5:8080/login`,
        {
          user: "012345678901",
          password: "123456",
          // user: username,
          // password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "pd3@mino347",
          },
        }
      );

      const userInfo = response.data;

      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      setAuth(userInfo);
      console.log("ini user info:", userInfo);
      navigation.replace("Home Screen");

      // if (userInfo.message) {
      //   console.log("Login berhasil. Token:", userInfo);
      //   setAuth(userInfo);
      //   navigation.replace("Amino Care");
      // } else {
      //   console.log("Login gagal, pesan kesalahan:", userInfo.message);
      // }
    } catch (error) {
      Alert.alert("Maaf", "Sepertinya password atau nomor HP anda salah");
      console.log("Login Error:", error);
    }
  };

  return (
    <View style={GlobalStyles.utama}>
      <View style={GlobalStyles.Content}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginBottom: 36,
            }}
          >
            <Text style={[GlobalStyles.h1, { color: WARNA.primary }]}>
              Masuk
            </Text>
          </View>
          <View style={{ gap: 8, marginBottom: 12 }}>
            <TextInputIconComponent
              label="Nomor HP/ Nama Lengkap"
              placeholder="Masukkan salah satu"
              value={username}
              type={"username"}
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

          <ButtonPrimary
            title="Masuk"
            disabled={!!usernameError || !!passwordError}
            onPress={handleSubmit}
          />

          <View style={{ flexDirection: "row" }}>
            <Text style={GlobalStyles.textBiasa}>Belum punya akun?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={GlobalStyles.textLink}>Daftar Akun Sekarang</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;

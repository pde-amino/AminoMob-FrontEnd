import React, { useContext, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import ButtonPrimary from "../../../components/ButtonPrimary";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import BottomSheet from "../../../components/BottomSheet";
import { AuthContex } from "../../../contex/AuthProvider";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalStyles from "../../../style/GlobalStyles";
import { BASE_URL } from "../../../contex/Config";

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
    try {
      setLoading(true);
      const response = await axios
        .post(
          `${BASE_URL}/login`,
          {
            user: username,
            password: password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": "pd3@mino347",
            },
          }
        )
        .then(async (response) => {
          const userInfo = response.data;

          await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
          setAuth(userInfo);
          console.log("ini user info:", userInfo);
          setLoading(false);
          navigation.replace("Home Screen");
        })
        .catch(() => {
          Alert.alert("Maaf", "No HP atau Password salah.");
          setLoading(false);
        });
    } catch (error) {
      try {
        if (error == "AxiosError: Request failed with status code 500") {
          Alert.alert(
            "Maaf",
            "Sepertinya Kami sedang melakukan pemeliharaan sistem, mohon ulangi beberapa saat lagi"
          );
          setLoading(false);
        } else {
          Alert.alert("Ups!", "No HP atau password Anda salah");
        }
        setLoading(false);
      } catch (error) {
        Alert.alert("Maaf", "Sepertinya password atau nomor HP anda salah");
      }
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
          <View style={{ alignItems: "center" }}>
            <Text style={[GlobalStyles.h1, { color: WARNA.primary }]}>
              Masuk
            </Text>
          </View>
          <View style={{ gap: 8, marginBottom: 12 }}>
            <TextInputIconComponent
              label="Nomor HP"
              placeholder="Masukkan No HP Anda"
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

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <ButtonPrimary
              title="Masuk"
              disabled={!!usernameError || !!passwordError}
              onPress={handleSubmit}
            />
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

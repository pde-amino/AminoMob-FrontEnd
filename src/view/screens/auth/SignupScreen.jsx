import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Alert,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ButtonPrimary from "../../../components/ButtonPrimary";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import GlobalStyles from "../../../style/GlobalStyles";
import {
  BASE_URL,
  OTP_DIVISION,
  OTP_ID,
  OTP_PASS,
  OTP_SENDER,
  SEND_OTP,
} from "../../../contex/Config";
import * as Network from "expo-network";
import { Checkbox } from "react-native-paper";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const { width } = Dimensions.get("window");

const SignupScreen = () => {
  const navigation = useNavigation();
  const [showPicker, setShowPicker] = useState(false);
  const toggleShowDate = () => {
    setShowPicker(!showPicker);
  };
  const [dateOfBirth, setDateOfBirth] = useState("");
  const berubah = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleShowDate();
        setDateOfBirth(currentDate.toISOString().split("T")[0]);
      }
    } else {
      toggleShowDate();
    }
  };
  const [date, setDate] = useState(new Date());

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confPasswordError, setConfPasswordError] = useState("");
  const [noHP, setHP] = useState("");
  const [noKTP, setKTP] = useState("");
  const [nmLengkap, setNama] = useState("");
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    validatePasswords();
  }, [password, confirmPassword]);

  const validatePasswords = () => {
    const adaSpecialChar = /[!@#$%^&*()_=+\-\[\]{};':"\\|,.<>\/?]/.test(
      password
    );
    if (adaSpecialChar) {
      setPasswordError("Karakter yang diperbolehkan adalah A-Z, a-z, 0-9");
    } else if (password.length < 6) {
      setPasswordError("Password minimal 6 karakter");
    } else {
      setPasswordError("");
    }

    if (confirmPassword !== password) {
      setConfPasswordError("Tidak cocok dengan password");
    } else {
      setConfPasswordError("");
    }
  };

  const sendOTP = async (otp) => {
    await axios.post(
      `${SEND_OTP}`,
      {
        userid: OTP_ID,
        password: OTP_PASS,
        msisdn: noHP,
        message: `Jangan Bagikan Kode OTP Anda, Kode Ini Untuk Validasi Amino Mobile ${otp}, Berlaku 2 Menit.`,
        sender: OTP_SENDER,
        division: OTP_DIVISION,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  };
  const simpanData = async () => {
    const ip = await Network.getIpAddressAsync();
    try {
      const response = await axios.post(
        `${BASE_URL}/register`,
        {
          nama: nmLengkap,
          telp: noHP,
          nik: noKTP,
          password: password,
          confirm_password: confirmPassword,
          ip: ip,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        }
      );

      await AsyncStorage.setItem("noHp", JSON.stringify(noHP));

      const userData = response.data;
      await sendOTP((otp = response.data.otp));
      navigation.navigate("OTPInputScreen", userData);
    } catch (error) {
      Alert.alert(
        "Gagal Mendaftar",
        "Sepertinya Nomor HP atau NIK sudah didaftarkan"
      );
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <StatusBar
        hidden={false}
        barStyle="dark-content"
        backgroundColor={"white"}
      />
      <View style={GlobalStyles.Content}>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            justifyContent: "center",
            alignContent: "center",
          }}>
          <View style={{ alignItems: "center" }}>
            <Text
              style={[
                GlobalStyles.h1,
                { color: WARNA.primary, marginBottom: 40 },
              ]}>
              Daftar Akun
            </Text>
          </View>

          <View style={{ marginBottom: 12, gap: 8 }}>
            <TextInputIconComponent
              label={"Nama Lengkap"}
              type={"nama"}
              value={nmLengkap}
              onChangeText={setNama}
            />
            <TextInputIconComponent
              label={"No KTP"}
              type={"ktp"}
              value={noKTP}
              inputMode={"numeric"}
              onChangeText={setKTP}
            />
            <TextInputIconComponent
              label={"No Handphone"}
              type={"nomor"}
              placeholder="Pastikan nomor dapat dihubungi"
              inputMode={"numeric"}
              value={noHP}
              onChangeText={setHP}
            />

            <TextInputIconComponent
              label={"Kata Sandi"}
              placeholder={"Buat Kata Sandi"}
              type={"password"}
              value={password}
              onChangeText={setPassword}
              password={true}
            />

            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <TextInputIconComponent
              label={"Ulang Kata Sandi"}
              placeholder={"Ulangi kata sandi"}
              type={"password"}
              value={confirmPassword}
              onChangeText={setConfPassword}
              password={true}
            />

            {confPasswordError ? (
              <Text style={styles.errorText}>{confPasswordError}</Text>
            ) : null}
          </View>

          <View style={{ paddingTop: 8 }}>
            <Checkbox.Item
              style={GlobalStyles.cekBox}
              color={WARNA.primary}
              label="Data yang Saya masukkan sudah benar"
              labelStyle={GlobalStyles.textBiasa}
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <ButtonPrimary
              title="Daftar"
              onPress={() => {
                Alert.alert(
                  "Peringatan",
                  "Pastikan nomor HP yang Anda input adalah nomor pribadi dan dapat dihubungi",
                  [
                    {
                      text: "Cek Lagi",
                    },
                    { text: "Sudah", onPress: simpanData },
                  ]
                );
              }}
              disabled={!!passwordError || !!confPasswordError || !checked}
            />
          </View>

          <View style={{ flexDirection: "row" }}>
            <Text style={GlobalStyles.textBiasa}>Sudah punya akun? </Text>
            <TouchableOpacity>
              <Text
                style={GlobalStyles.textLink}
                onPress={() => {
                  navigation.navigate("Login Screen");
                }}>
                Masuk disini
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 5,
  },
});

export default SignupScreen;

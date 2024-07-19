import React, { useState, useContext } from "react";
import { View, Text, TextInput, StyleSheet, Button, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContex } from "../../../contex/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalStyles from "../../../style/GlobalStyles";
import ButtonPrimary from "../../../components/ButtonPrimary";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";

const OTPInputScreen = () => {
  const route = useRoute();
  const dataUser = route.params;
  console.log("Ini data user di OTP Screen :", dataUser);
  const [otp, setOtp] = useState("");
  const { auth, setAuth } = useContext(AuthContex);
  const navigation = useNavigation();

  const handleOTPSubmit = async () => {
    // Contoh validasi kode OTP
    const validOTP = dataUser.otp;
    if (otp === validOTP) {
      try {
        // Simpan userInfo ke AsyncStorage (contoh)
        await axios.post(
          `${BASE_URL}/otp`,
          {
            telp: dataUser.telp,
            otp: dataUser.otp,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key": "pd3@mino347",
            },
          }
        );
        const userInfo = {
          ...auth,
          otpVerified: true,
        };
        await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
        setAuth(userInfo);

        Alert.alert(
          "Success",
          "Kode OTP valid. Silahkan Login menggunakan nomor yang anda daftarkan.",
          [{ text: "OK", onPress: () => navigation.navigate("Login Screen") }]
        ); // Navigasi ke layar Home
      } catch (error) {
        console.error("Error saving userInfo to AsyncStorage", error);
        Alert.alert(
          "Error",
          "Gagal menyimpan data pengguna. Silakan coba lagi."
        );
      }
    } else {
      Alert.alert("Error", "Kode OTP tidak valid. Silakan coba lagi.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[GlobalStyles.h1, { marginBottom: 20 }]}>
        Masukkan Kode OTP
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Kode OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
      />
      <ButtonPrimary title="Verifikasi OTP" onPress={handleOTPSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "60%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#0A78E2",
    borderRadius: 10,
    marginBottom: 20,
  },
});

export default OTPInputScreen;

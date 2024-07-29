import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContex } from "../../../contex/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalStyles from "../../../style/GlobalStyles";
import ButtonPrimary from "../../../components/ButtonPrimary";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";
import * as Network from "expo-network";

const OTPInputScreen = () => {
  const route = useRoute();
  const dataUser = route.params;
  const [otp, setOtp] = useState("");
  const { auth, setAuth } = useContext(AuthContex);
  const navigation = useNavigation();

  const [counter, setCounter] = useState(30); // Mulai hitung mundur dari 30 detik
  const [isCounting, setIsCounting] = useState(true); // Mulai dengan status counting true

  useEffect(() => {
    let timer;
    if (isCounting) {
      timer = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter <= 1) {
            clearInterval(timer);
            setIsCounting(false);
            return 30;
          }
          return prevCounter - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCounting]);

  const handleSendOtp = () => {
    setCounter(90); // Setel ulang counter ke 30 detik setiap kali OTP dikirim
    setIsCounting(true); // Mulai hitung mundur
  };

  const handleOTPSubmit = async () => {
    const validOTP = dataUser.otp;
    const ip = await Network.getIpAddressAsync();
    if (otp === validOTP) {
      try {
        await axios.post(
          `${BASE_URL}/otp`,
          {
            telp: dataUser.telp,
            otp: dataUser.otp,
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
        );
      } catch (error) {
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
      <Text
        style={[GlobalStyles.textBiasa, { marginBottom: 20, maxWidth: "80%" }]}>
        OTP akan dikirim ke nomor yang anda daftarkan sebelumnya
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Kode OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
      />

      <View style={GlobalStyles.btnFullContainer}>
        <ButtonPrimary title="Verifikasi" onPress={handleOTPSubmit} />
      </View>
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <Text style={GlobalStyles.textBiasa}>Belum dapat OTP? </Text>
        <TouchableOpacity
          onPress={handleSendOtp}
          disabled={isCounting}
          // style={[
          //   styles.resendButton,
          //   isCounting && styles.resendButtonDisabled,
          // ]}
        >
          <Text
            style={[GlobalStyles.textLink, isCounting && styles.linkDisabled]}>
            {isCounting ? ` Kirim ulang OTP dalam ${counter}` : " Kirim Ulang"}
          </Text>
        </TouchableOpacity>
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
  input: {
    width: "60%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#0A78E2",
    borderRadius: 10,
    marginBottom: 100,
  },
  linkDisabled: {
    color: "#6F9FCC",
    textDecorationLine: "none",
  },
});

export default OTPInputScreen;

import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
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

const OTPInputScreen = () => {
  const route = useRoute();
  const dataUser = route.params;
  console.log("Ini data user di OTP Screen :", dataUser);
  const [otp, setOtp] = useState("");
  const { auth, setAuth } = useContext(AuthContex);
  const navigation = useNavigation();

  const [counter, setCounter] = useState(60); // Mulai hitung mundur dari 60 detik
  const [isCounting, setIsCounting] = useState(false);

  useEffect(() => {
    let timer;
    if (isCounting) {
      timer = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter <= 1) {
            clearInterval(timer);
            setIsCounting(false);
            return 180;
          }
          return prevCounter - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isCounting]);

  const handleSendOtp = () => {
    // Logika pengiriman OTP Anda di sini
    console.log("OTP dikirim!");
    setIsCounting(true);
  };

  const handleOTPSubmit = async () => {
    const validOTP = dataUser.otp;
    if (otp === validOTP) {
      try {
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
          "Kode OTP valid. Silahkan Login menggunakan nomor yang anda daftarkan."
        );
        navigation.navigate("Login Screen");
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
      <Text style={styles.title}>Masukkan Kode OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="Kode OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        maxLength={6}
      />
      <ButtonPrimary title="Verifikasi OTP" onPress={handleOTPSubmit} />
      <TouchableOpacity
        onPress={handleSendOtp}
        disabled={isCounting}
        style={[
          styles.resendButton,
          isCounting && styles.resendButtonDisabled,
        ]}>
        <Text style={styles.resendButtonText}>
          {isCounting ? `Kirim OTP dalam ${counter}d` : "Kirim Ulang OTP"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
  },
  resendButton: {
    marginTop: 20,
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    backgroundColor: "#0A78E2",
  },
  resendButtonDisabled: {
    backgroundColor: "#A0A0A0",
  },
  resendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default OTPInputScreen;

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

const OTPInputScreen = () => {
  const route = useRoute();
  const dataUser = route.params;
  console.log("Ini data user di OTP Screen :", dataUser);
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
    console.log("OTP dikirim!");
    setCounter(10); // Setel ulang counter ke 30 detik setiap kali OTP dikirim
    setIsCounting(true); // Mulai hitung mundur
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
          "Kode OTP valid. Silahkan Login menggunakan nomor yang anda daftarkan.",
          [{ text: "OK", onPress: () => navigation.navigate("Login Screen") }]
        );
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
      <TouchableOpacity
        onPress={handleSendOtp}
        disabled={isCounting}
        style={[
          styles.resendButton,
          isCounting && styles.resendButtonDisabled,
        ]}>
        <Text style={GlobalStyles.h4}>
          {isCounting
            ? `Kirim ulang OTP dalam ${counter}detik`
            : "Kirim Ulang OTP"}
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
  },
  input: {
    width: "60%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#0A78E2",
    borderRadius: 10,
    marginBottom: 20,
  },
  resendButton: {
    marginTop: 40,
    padding: 5,
    // borderRadius: 5,
    width: "auto",
    alignItems: "center",
    // borderBottomColor: "#0A78E2",
    borderBottomWidth: 1,
    // backgroundColor: "#0A78E2",
  },
  resendButtonDisabled: {
    borderBottomWidth: 1,
    color: "black",
    // backgroundColor: "#A0A0A0",
  },
  resendButtonText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default OTPInputScreen;

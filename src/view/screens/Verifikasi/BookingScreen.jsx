import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-paper";
import GenerateQRCode from "../../../contex/GenerateQRCode";

const { height, width } = Dimensions.get("window");

const BookingScreen = ({ navigation }) => {
  // Dummy data transaksi
  const transactionData = {
    amount: "Rp 1,000,000",
    transactionId: "TRX123456789",
    date: "April 20, 2024",
    merchantName: "Poli Dewasa",
    status: "Success",
  };

  // Fungsi untuk menangani tombol kembali ke halaman utama
  const handleBackToHome = () => {
    navigation.navigate("HomeScreen");
  };

  return (
    <View style={styles.container}>
      {/* Gambar status pembayaran sukses */}
      <Image
        // source={require("./assets/success.png")} // Ganti dengan path gambar yang Anda inginkan
        style={styles.successImage}
      />

      {/* Keterangan sukses */}
      <Text style={styles.successText}>Booking Berhasil</Text>
      <GenerateQRCode />

      {/* Detail transaksi */}
      <View style={styles.detailsContainer}>
        <Text style={styles.label}>KD Booking:</Text>
        <Text style={styles.value}>{transactionData.transactionId}</Text>

        <Text style={styles.label}>No Antrian:</Text>
        <Text style={styles.value}>{transactionData.amount}</Text>

        <Text style={styles.label}>Tanggal:</Text>
        <Text style={styles.value}>{transactionData.date}</Text>

        <Text style={styles.label}>Poliklinik:</Text>
        <Text style={styles.value}>{transactionData.merchantName}</Text>
      </View>

      {/* Tombol kembali ke halaman utama */}
      <Button
        mode="contained"
        buttonColor="#0A78E2"
        style={styles.button}
        onPress={handleBackToHome}>
        Kembali ke Halaman Utama
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20,
  },
  successImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "green",
    marginBottom: 20,
  },
  detailsContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    padding: 20,
    width: width * 0.9,
    marginBottom: 30,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  value: {
    fontSize: 18,
    color: "#000",
    marginBottom: 15,
  },
  button: {
    borderRadius: 10,
    width: width * 0.8,
    padding: 10,
  },
});

export default BookingScreen;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Button } from "react-native-paper";
import GenerateQRCode from "../../../contex/GenerateQRCode";
import ButtonPrimary from "../../../components/ButtonPrimary";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../../../style/GlobalStyles";
import { useNavigation } from "@react-navigation/native";

const { height, width } = Dimensions.get("window");

const BookingScreen = () => {
  const navigation = useNavigation();
  // Dummy data transaksi
  const transactionData = {
    amount: "Rp 1,000,000",
    transactionId: "TRX123456790",
    date: "April 20, 2024",
    merchantName: "Poli Dewasa",
    status: "Success",
  };

  // Fungsi untuk menangani tombol kembali ke halaman utama
  const handleBackToHome = () => {
    navigation.replace("Home Screen");
  };

  return (
    <SafeAreaView style={[GlobalStyles.utama, { backgroundColor: "#0A78E2" }]}>
      <View style={GlobalStyles.Content}>
        <Text style={[GlobalStyles.h1, { color: "white" }]}>
          Booking Berhasil
        </Text>
        <Image
          resizeMode="cover"
          source={require("../../../../assets/success.png")} // Ganti dengan path gambar yang Anda inginkan
          style={styles.successImage}
        />

        {/* Detail transaksi */}
        <View style={styles.container}>
          <ScrollView style={{ flex: 1, borderRadius: 20 }}>
            <View style={styles.detailsContainer}>
              <View style={{ gap: 8 }}>
                <View>
                  <Text style={styles.label}>KD Booking:</Text>
                  <Text style={styles.value}>
                    {transactionData.transactionId}
                  </Text>
                </View>
                <View>
                  <Text style={styles.label}>No RM:</Text>
                  <Text style={styles.value}>{transactionData.amount}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Nama:</Text>
                  <Text style={styles.value}>
                    {transactionData.merchantName}
                  </Text>
                </View>
                <View>
                  <Text style={styles.label}>Tanggal Periksa:</Text>
                  <Text style={styles.value}>
                    {transactionData.merchantName}
                  </Text>
                </View>
                <View>
                  <Text style={styles.label}>Jam Periksa:</Text>
                  <Text style={styles.value}>
                    {transactionData.merchantName}
                  </Text>
                </View>
                <View>
                  <Text style={styles.label}>Poliklinik:</Text>
                  <Text style={styles.value}>
                    {transactionData.merchantName}
                  </Text>
                </View>
                <View>
                  <Text style={styles.label}>Dokter:</Text>
                  <Text style={styles.value}>
                    {transactionData.merchantName}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  marginVertical: 12,
                }}
              >
                <GenerateQRCode
                  value={transactionData.transactionId}
                  size={150}
                />
              </View>
              <ButtonPrimary
                title={"Kembali ke Halaman Utama"}
                onPress={handleBackToHome}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  successImage: {
    width: 320,
    height: 150,
    // backgroundColor: "pink",
  },
  container: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden", // Overflow hidden untuk memotong konten yang keluar dari batas container
  },
  detailsContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 16,
    paddingHorizontal: 25,
    width: width * 1,
    gap: 8,
  },
  label: {
    fontSize: 14,
    color: "#555",
  },
  value: {
    fontSize: 16,
    color: "#000",
  },
});

export default BookingScreen;

import React, { useContext, useEffect, useState } from "react";
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
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContex } from "../../../contex/AuthProvider";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";

const { height, width } = Dimensions.get("window");

const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [adaRM, setAdaRM] = useState(true);

  const auth = useContext(AuthContex);

  console.log(auth);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/daftarKerabat/${auth.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`, // Pastikan token disertakan dalam header jika diperlukan
          },
        }
      );
      console.log("Response data:", response.data); // Logging response data
      const data = response.data.data_kerabat;

      setDataPasien(data);
    } catch (error) {
      console.error("Error fetching kerabat data:", error.message);
      console.error("Error response data:", error.response?.data);
    }
    // finally {
    // setLoading(false);
    // setRefreshing(false);
    // }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const data = route.params.data;

  const tglFormatted = new Date(data.tanggal_periksa)
    .toISOString()
    .split("T")[0];

  // Dummy data transaksi
  const transactionData = {
    noRM: "ini no RM",
    kdBook: data.kode_booking,
    nmPas: "Nama Pasien di sini",
    tglPeriksa: tglFormatted,
    jamPeriksa: data.jam_periksa,
    poliPeriksa: "Poli Dewasa",
    nmDokter: data.kd_dokter,
  };

  // Fungsi untuk menangani tombol kembali ke halaman utama
  const handleBackToHome = () => {
    navigation.replace("Home Screen");
  };

  console.log("ini dari verifikasi berhasil", route.params);
  return (
    <SafeAreaView style={[GlobalStyles.utama, { backgroundColor: "#0A78E2" }]}>
      <View style={GlobalStyles.Content}>
        <Text style={[GlobalStyles.h2, { color: "white" }]}>
          Booking Berhasil
        </Text>
        <Image
          source={require("../../../../assets/success.png")}
          style={styles.successImage}
        />

        {/* Detail transaksi */}
        <View style={styles.container}>
          <ScrollView style={{ flex: 1, borderRadius: 20 }}>
            <View style={styles.detailsContainer}>
              <View style={{ gap: 4 }}>
                {adaRM ? (
                  <View>
                    <Text style={styles.label}>No RM:</Text>
                    <Text style={styles.value}>{transactionData.noRM}</Text>
                  </View>
                ) : null}
                <View>
                  <Text style={styles.label}>Nama:</Text>
                  <Text style={styles.value}>{transactionData.nmPas}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Tanggal Periksa:</Text>
                  <Text style={styles.value}>{transactionData.tglPeriksa}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Jam Periksa:</Text>
                  <Text style={styles.value}>{transactionData.jamPeriksa}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Poliklinik:</Text>
                  <Text style={styles.value}>
                    {transactionData.poliPeriksa}
                  </Text>
                </View>
                <View>
                  <Text style={styles.label}>Dokter :</Text>
                  <Text style={styles.value}>{transactionData.nmDokter}</Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  marginVertical: 12,
                  padding: 20,
                  gap: 24,
                }}
              >
                <GenerateQRCode value={transactionData.kdBook} size={150} />
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {transactionData.kdBook}
                </Text>
              </View>
              <View style={{ marginBottom: 100, gap: 20 }}>
                {adaRM ? null : (
                  <Text style={{ fontSize: 16 }}>
                    <B>Tunjukkan KTP/KK pendaftar saat daftar ulang.</B>
                  </Text>
                )}
                <Text style={{ fontSize: 16 }}>
                  Mohon datang minimal <B>30 menit</B> sebelum jam periksa
                </Text>
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
    width: 300,
    height: 120,
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
    height: "100%",
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

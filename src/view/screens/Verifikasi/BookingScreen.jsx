import React, { useContext, useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { Button } from "react-native-paper";
import GenerateQRCode from "../../../contex/GenerateQRCode";
import ButtonPrimary from "../../../components/ButtonPrimary";
import { SafeAreaView } from "react-native-safe-area-context";
import GlobalStyles from "../../../style/GlobalStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AuthContex } from "../../../contex/AuthProvider";
import * as MediaLibrary from "expo-media-library";
import { captureRef } from "react-native-view-shot";
import ButtonSecondary from "../../../components/ButtonSecondary";

const { width } = Dimensions.get("window");

const B = (props) => (
  <Text style={{ fontWeight: "bold" }}>{props.children}</Text>
);

const BookingScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [adaRM, setAdaRM] = useState(true);
  const viewRef = useRef();

  const { auth } = useContext(AuthContex);

  const cekRM = () => {
    if (data.no_rkm_medis == null || data.no_rkm_medis == "") {
      setAdaRM(false);
    }
  };

  useEffect(() => {
    cekRM();
  }, []);

  const data = route.params.data;

  const transactionData = {
    noRM: data.no_rkm_medis,
    kdBook: data.kode_booking,
    nmPas: data.nm_pasien,
    tglPeriksa: data.tanggal_periksa,
    jamPeriksa: data.jam_periksa,
    poliPeriksa: data.nm_poli,
    nmDokter: data.nm_dokter,
  };

  const handleBackToHome = () => {
    navigation.replace("Home Screen");
  };

  const saveImageToGallery = async () => {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        alert("diperlukan Izin untuk mengakses perpustakaan media!");
        return;
      }

      const uri = await captureRef(viewRef, {
        format: "png",
        quality: 1.0,
      });

      const asset = await MediaLibrary.createAssetAsync(uri);
      await MediaLibrary.createAlbumAsync("Download", asset, false);
      Alert.alert("Tersimpan", `Gambar berhasil tersimpan di galeri!`);
    } catch (error) {
      Alert.alert(
        "Gagal menyimpan",
        "Aplikasi tidak memiliki ijin untuk menyimpan gambar di galeri!"
      );
    }
  };

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
            <View style={styles.detailsContainer} ref={viewRef}>
              <View style={{ gap: 8 }}>
                {adaRM ? (
                  <View>
                    <Text style={styles.label}>No RM:</Text>
                    <Text style={GlobalStyles.h4}>{transactionData.noRM}</Text>
                  </View>
                ) : null}
                <View>
                  <Text style={styles.label}>Nama:</Text>
                  <Text style={GlobalStyles.h4}>{transactionData.nmPas}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Tanggal Periksa:</Text>
                  <Text style={GlobalStyles.h4}>
                    {transactionData.tglPeriksa}
                  </Text>
                </View>
                <View>
                  <Text style={styles.label}>Jam Periksa:</Text>
                  <Text style={GlobalStyles.h4}>
                    {transactionData.jamPeriksa}
                  </Text>
                </View>
                <View>
                  <Text style={styles.label}>Poliklinik:</Text>
                  <Text style={GlobalStyles.h4}>
                    {transactionData.poliPeriksa}
                  </Text>
                </View>
                <View>
                  <Text style={styles.label}>Dokter :</Text>
                  <Text style={GlobalStyles.h4}>
                    {transactionData.nmDokter}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: "center",
                  marginVertical: 12,
                  padding: 20,
                  gap: 24,
                }}>
                <GenerateQRCode value={transactionData.kdBook} size={150} />
                <Text style={GlobalStyles.h2}>{transactionData.kdBook}</Text>
              </View>
              <View style={{ marginBottom: 40, gap: 20 }}>
                {adaRM ? null : (
                  <Text style={{ fontSize: 16 }}>
                    <B>Tunjukkan KTP/KK pendaftar saat daftar ulang.</B>
                  </Text>
                )}
                <Text style={{ fontSize: 16 }}>
                  Terima Kasih. Mohon datang minimal <B>30 menit</B> sebelum jam
                  periksa
                </Text>
                <View style={styles.floatingButton}>
                  <View style={{ flex: 1 }}>
                    <ButtonPrimary title="Selesai" onPress={handleBackToHome} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <ButtonSecondary
                      title="Simpan Gambar"
                      onPress={saveImageToGallery}
                    />
                  </View>
                </View>
              </View>
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
    overflow: "hidden",
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
    fontSize: 14,
    color: "#000",
    fontWeight: "bold",
  },
  floatingButton: {
    gap: 10,
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
  },
});

export default BookingScreen;

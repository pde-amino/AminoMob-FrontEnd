import React, { useContext, useEffect } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  TouchableOpacity,
  Platform,
} from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";
import { AuthContex } from "../../../contex/AuthProvider";
import { BASE_URL } from "../../../contex/Config";
import axios from "axios";
import { useState } from "react";
import { ActivityIndicator, Dialog, Portal } from "react-native-paper";
import CardColapse from "../../../components/CardColapse";
import ButtonPrimary from "../../../components/ButtonPrimary";
import GenerateQRCode from "../../../contex/GenerateQRCode";
import { Image } from "react-native";
import ConfirmModal from "../../../components/ConfirmModal";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

const WARNA = { primary: "#0A78E2", white: "#fff" };

export default function RiwayatKunjungan() {
  const { auth } = useContext(AuthContex);
  const [refreshing, setRefreshing] = useState(false);
  const [dataRiwayat, setDataRiwayat] = useState();
  const [loading, setLoading] = useState(true);
  const [lihatQR, setLihatQR] = useState(false);
  const [selectedKodeBooking, setSelectedKodeBooking] = useState(null);
  const hideDialog = () => setLihatQR(false);
  const [batalBook, setBatalBook] = useState(false);
  const navigation = useNavigation();

  const ambilDataRiwayat = async () => {
    try {
      const response = await axios
        .get(`${BASE_URL}/riwayatbooking/${auth.id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        })
        .then((response) => {
          setDataRiwayat(response.data.data_user);
        });
      // const data = response.data.data_user;
      // setDataRiwayat(data);
    } catch (error) {
      if (error.response) {
        // Menangani error yang dikembalikan oleh server
        // const errorMessage =
        //   error.response.data.messages.error || "Unknown error";

        if (error.response.status === 401) {
          console.error("log1", error.response);
          Alert.alert(
            "Perhatian",
            "Sesi Login anda telah berakhir mohon lakukan login ulang"
          );
          navigation.replace("Login Screen");
        } else if (error.response.status === 404) {
          // Alert.alert("Perhatian", errorMessage);
          return;
        } else {
          Alert.alert(
            "Perhatian",
            "Sesi Login anda telah berakhir mohon lakukan login ulang"
          );
          navigation.replace("Login Screen");
        }

        // console.log("Error Response Data:", error.response.data);
        // console.log("Error Response Status:", error.response.status);
      } else if (error.request) {
        // Jika tidak ada respons dari server
        // console.log("No Response Received:", error.request);
        Alert.alert("Peringatan", "Silakan coba lagi nanti.");
        console.error("log3", error.response);
      } else {
        // Error lainnya
        // console.log("Error Message:", error.message);
        Alert.alert(
          "Peringatan",
          `Terdapat kesalahan data mohon lakukan login ulang`
        );
        console.error("log4", error.response);
        // navigation.replace("Login Screen");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const batalBooking = async () => {
    try {
      await axios.put(
        `${BASE_URL}/bookPeriksa/${auth.id}`,
        {
          kd_booking: selectedKodeBooking,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      Alert.alert(
        "Maaf",
        "Gagal membatalkan booking, silakan coba beberapa saat lagi" + error
      );
    } finally {
      setBatalBook(false);
      onRefresh();
    }
  };

  useEffect(() => {
    ambilDataRiwayat();
  }, []);

  const Item = ({ item, onPress, onPressBatal }) => (
    <CardColapse title={item.kode_booking} subtitle={item.nm_pasien}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <View>
          <Text>Poliklinik </Text>
          <Text>Tanggal periksa </Text>
          <Text>Jam periksa </Text>
          <Text>Dokter </Text>
        </View>
        <View>
          <Text> {item.nm_poli}</Text>
          <Text> {item.tanggal_periksa}</Text>
          <Text> {item.jam_periksa}</Text>
          <Text> {item.nm_dokter}</Text>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        {item.status_reg == "Belum" && (
          <View style={styles.containerBtn}>
            <ButtonPrimary title="Lihat QR Code" onPress={onPress} />
            <TouchableOpacity
              onPress={onPressBatal}
              style={styles.containerButton}>
              <Text style={[GlobalStyles.h4, { color: "#CA0101" }]}>
                Batalkan
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {item.status_reg == "Terdaftar" && (
          <View style={GlobalStyles.chipSuccess}>
            <Text style={GlobalStyles.textChipSucces}>Sudah Periksa</Text>
          </View>
        )}
        {item.status_reg == "Batal" && (
          <View style={GlobalStyles.chipError}>
            <Text style={GlobalStyles.textChipError}>Batal Periksa</Text>
          </View>
        )}
      </View>
    </CardColapse>
  );

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedKodeBooking(item.kode_booking);
          setLihatQR(true);
        }}
        onPressBatal={() => {
          setSelectedKodeBooking(item.kode_booking);
          setBatalBook(true);
        }}
      />
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    ambilDataRiwayat();
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyles.utama,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}>
      <HeaderComponent title={"Riwayat Periksa"} />
      {loading ? (
        <ActivityIndicator animating={true} color={WARNA.primary} />
      ) : dataRiwayat ? (
        <View>
          <FlatList
            style={{ width: "100%" }}
            data={dataRiwayat}
            renderItem={renderItem}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={{ alignItems: "center", alignContent: "center" }}>
            <Image
              style={{
                width: "70%",
                resizeMode: "contain",
              }}
              source={require("../../../../assets/no-data.png")}
            />
            <Text
              style={[
                GlobalStyles.h4,
                {
                  fontWeight: "normal",
                  maxWidth: "85%",
                  textAlign: "center",
                },
              ]}>
              Belum ada riwayat periksa, silakan mendaftar
            </Text>
          </View>
        </ScrollView>
      )}

      <Portal>
        <Dialog
          visible={lihatQR}
          onDismiss={hideDialog}
          style={{
            alignSelf: "center",
            width: "90%",
            height: "45%",
            backgroundColor: "white",
          }}>
          <Dialog.Title
            style={GlobalStyles.h2}>{`QR ${selectedKodeBooking}`}</Dialog.Title>
          <Dialog.Content style={styles.dialogContentContainer}>
            <GenerateQRCode size={200} value={selectedKodeBooking} />
          </Dialog.Content>
        </Dialog>
      </Portal>

      {batalBook && (
        <ConfirmModal
          visible={batalBook}
          message={`Apakah anda yakin ingin membatalkan ${selectedKodeBooking}?`}
          onCancel={() => setBatalBook(false)}
          onConfirm={batalBooking}
          confirmButtonText={"Ya"}
          cancelButtonText={"Tidak"}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  dialogContentContainer: {
    alignContent: "center",
    justifyContent: "center",
    marginTop: 10,
    height: "70%",
  },
  containerButton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CA0101",
    borderRadius: 10,
    width: 120,
    height: 48,
  },
  containerBtn: {
    flexDirection: "row-reverse",
    justifyContent: "space-between",
  },
});

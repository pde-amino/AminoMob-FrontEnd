import React, { useCallback, useContext, useEffect, useState } from "react";
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
  StatusBar,
  Image,
} from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";
import { AuthContex } from "../../../contex/AuthProvider";
import { BASE_URL } from "../../../contex/Config";
import axios from "axios";
import { useState } from "react";
import { ActivityIndicator, Dialog, Modal, Portal } from "react-native-paper";
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
  const [dataRiwayat, setDataRiwayat] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lihatQR, setLihatQR] = useState(false);
  const [selectedKodeBooking, setSelectedKodeBooking] = useState(null);
  const hideDialog = () => setLihatQR(false);
  const [batalBook, setBatalBook] = useState(false);
  const [gantiDok, setGantiDok] = useState(false);
  const [focusNama, setfocusNama] = useState(false);
  const [dokBaru, setDokBaru] = useState();
  const [dataDok, setDataDok] = useState([]);
  const navigation = useNavigation();

  const ambilDataRiwayat = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/riwayatbooking/${auth.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        }
      );
      setDataRiwayat(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleError = (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        Alert.alert(
          "Perhatian",
          "Sesi Login anda telah berakhir mohon lakukan login ulang"
        );
        navigation.replace("Login Screen");
      } else if (error.response.status === 404) {
        return;
      } else {
        Alert.alert(
          "Perhatian",
          "Terjadi kesalahan pada server, silakan coba beberapa saat lagi"
        );
      }
    } else {
      Alert.alert("Peringatan", "Silakan coba lagi nanti.");
    }
  };

  const pilihDokter = useCallback(async () => {
    const data = dataRiwayat.length > 0 ? dataRiwayat[0] : null;
    if (!data) return;

    const hari = [
      "minggu",
      "senin",
      "selasa",
      "rabu",
      "kamis",
      "jumat",
      "sabtu",
    ];
    const tanggal = new Date(data.tanggal_periksa);
    const namaHari = hari[tanggal.getDay()];
    const jamPeriksa = data.jam_periksa;

    try {
      const [start] = jamPeriksa.split(" - ");
      const startHour = parseInt(start.split(":")[0], 10);
      const statusWaktu = startHour >= 7 && startHour < 14 ? "pagi" : "sore";

      const response = await axios.get(
        `${BASE_URL}/jadwaldok/${data.kd_poli}/${namaHari}/${statusWaktu}`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        }
      );

      const docss = response.data.data_dokter || [];
      if (Array.isArray(docss)) {
        // Ambil nm_dokter dan kd_dokter saja
        const dokterList = docss.map((dokter) => ({
          nm_dokter: dokter.nm_dokter,
          kd_dokter: dokter.kd_dokter,
        }));
        setDataDok(dokterList); // Simpan data dokter
      } else {
        console.error("Data dokter bukan array", docss);
      }
      // setDataDok(response.data || []);
    } catch (error) {
      console.error("Error saat mengambil data dokter:", error);
      Alert.alert("Terjadi kesalahan", "Tidak dapat mengambil data dokter");
    }
  }, [dataRiwayat, auth.token]);

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
    if (!auth) {
      Alert.alert(
        "Perhatian",
        "Anda belum Login, Silahkan Login terlebih dahulu."
      );
      navigation.replace("Login Screen");
    } else {
      ambilDataRiwayat();
    }
  }, [auth, navigation]);

  useEffect(() => {
    if (gantiDok) {
      pilihDokter(); // Panggil pilihDokter hanya saat gantiDok berubah menjadi true
    }
  }, [gantiDok, pilihDokter]);

  const Item = ({ item, onPress, onPressBatal, onPressGantiDok }) => (
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
              style={styles.containerButton}
            >
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
        {item.status_reg == "Dokter Berhalangan" && (
          <View style={styles.containerBtn}>
            <ButtonPrimary title="Ganti Dokter" onPress={onPressGantiDok} />
            <TouchableOpacity
              onPress={onPressBatal}
              style={styles.containerButton}
            >
              <Text style={[GlobalStyles.h4, { color: "#CA0101" }]}>
                Batalkan
              </Text>
            </TouchableOpacity>
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
        onPressGantiDok={() => {
          setSelectedKodeBooking(item.kode_booking);
          setGantiDok(true);
        }}
      />
    );
  };

  const updateDok = (nm_dokter, kd_dokter) => {
    Alert.alert(
      "Konfirmasi",
      `Yakin ingin ganti dengan ${nm_dokter}? Pergantian dokter hanya bisa dilakukan satu kali, mohon pastikan ulang sebelum konfirmasi.`,
      [
        {
          text: "Nanti",
          style: "cancel",
        },
        { text: "Konfirmasi", onPress: () => changeDoc(kd_dokter) },
      ],
      {
        cancelable: true,
      }
    );
    console.log(nm_dokter, kd_dokter, selectedKodeBooking);
  };

  const changeDoc = async (kd_dokter) => {
    console.log(selectedKodeBooking, kd_dokter);
    try {
      const response = await axios.put(
        `${BASE_URL}/gantiDokBook/${auth.id}`,
        {
          kd_booking: selectedKodeBooking,
          kd_dokter: kd_dokter,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("status ganti dok: ", response.data);
      setGantiDok(false);
      Alert.alert(
        "Berhasiil",
        `Dokter berhasil diganti, silakan periksa sesuai jadwal yang telah dipilih`,
        {
          cancelable: true,
        }
      );
      onRefresh();
    } catch (error) {
      // console.error("Error ganti dokter: ", error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    ambilDataRiwayat();
  }, []);

  return (
    <SafeAreaView
      style={[
        GlobalStyles.utama,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}
    >
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
          }
        >
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
              ]}
            >
              Belum ada riwayat periksa, silakan mendaftar
            </Text>
          </View>
        </ScrollView>
      )}

      <Portal>
        {/* dialog lihat qr */}
        <Dialog
          visible={lihatQR}
          onDismiss={hideDialog}
          style={styles.styleDialog}
        >
          <Dialog.Title
            style={GlobalStyles.h2}
          >{`QR ${selectedKodeBooking}`}</Dialog.Title>
          <Dialog.Content style={styles.dialogContentContainer}>
            <GenerateQRCode size={200} value={selectedKodeBooking} />
          </Dialog.Content>
        </Dialog>

        {/* dialog gantidokter */}
        <Modal
          visible={gantiDok}
          contentContainerStyle={styles.modalView}
          dismissable={true}
          onDismiss={() => setGantiDok(false)}
        >
          <Text style={GlobalStyles.h2}>Ganti Dokter</Text>
          <View style={styles.modalContent}>
            <View>
              <Text style={GlobalStyles.textBiasa}>
                Dokter yang Anda pilih sebelumnya berhalangan, silakan ganti
                dengan dokter yang tersedia.
              </Text>
            </View>

            <FlatList
              data={dataDok}
              keyExtractor={(item) => item.kd_dokter}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.newDokBtn}
                  onPress={() =>
                    updateDok(
                      item.nm_dokter,
                      item.kd_dokter,
                      selectedKodeBooking
                    )
                  }
                >
                  <View style={{ gap: 5 }}>
                    <Text style={GlobalStyles.textBold}>{item.nm_dokter}</Text>
                    <Text style={GlobalStyles.textBiasa}>{item.kd_dokter}</Text>
                  </View>
                </TouchableOpacity>
              )}
            />

            {/* <ButtonPrimary
              title="Ganti"
              disabled={!dokBaru}
              onPress={() => setGantiDok(false)}
            /> */}
          </View>
        </Modal>
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
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalContent: {
    gap: 10,
    marginTop: 15,
    width: "100%",
  },
  dialogContentContainer: {
    alignContent: "center",
    justifyContent: "center",
    marginTop: 10,
    height: "70%",
  },
  styleDialog: {
    alignSelf: "center",
    width: "90%",
    height: "45%",
    backgroundColor: "white",
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
  newDokBtn: {
    marginTop: 10,
    backgroundColor: "#E1F0FF",
    padding: 12,
    borderRadius: 10,
  },
});

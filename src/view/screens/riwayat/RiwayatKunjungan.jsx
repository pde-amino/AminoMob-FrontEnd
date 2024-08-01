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

const WARNA = { primary: "#0A78E2", white: "#fff" };

export default function RiwayatKunjungan() {
  const { auth } = useContext(AuthContex);
  const [refreshing, setRefreshing] = useState(false);
  const [dataRiwayat, setDataRiwayat] = useState();
  const [loading, setLoading] = useState(true);
  const [lihatQR, setLihatQR] = useState(false);
  const [selectedKodeBooking, setSelectedKodeBooking] = useState(null);
  const hideDialog = () => setLihatQR(false);

  const ambilDataRiwayat = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/riwayatbooking/${auth.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        }
      );
      const data = response.data.data_user;
      setDataRiwayat(data);
    } catch (error) {
      if (error.message != "Request failed with status code 404") {
        Alert.alert(
          "Maaf",
          "Ada kesalahan saat mengambil data riwayat, mohon ulangi beberapa saat lagi"
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    ambilDataRiwayat();
  }, []);

  const Item = ({ item, onPress }) => (
    <CardColapse title={item.kode_booking} subtitle={item.nm_pasien}>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <View>
          <Text>Poliklinik </Text>
          <Text>Tanggal periksa </Text>
          <Text>Dokter </Text>
        </View>
        <View>
          <Text> {item.nm_poli}</Text>
          <Text> {item.tanggal_periksa}</Text>
          <Text> {item.nm_dokter}</Text>
        </View>
      </View>
      <View style={{ marginTop: 10 }}>
        {item.status_reg == "Belum" && (
          <ButtonPrimary title="Lihat QR Code" onPress={onPress} />
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
      />
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    ambilDataRiwayat();
  };

  return (
    <SafeAreaView style={[GlobalStyles.safeAreaStyle, GlobalStyles.utama]}>
      <View style={{ flex: 1 }}>
        <HeaderComponent title={"Riwayat Periksa"} />
      </View>
      <View style={{ flex: 9 }}>
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
      </View>

      <Portal>
        <Dialog
          visible={lihatQR}
          onDismiss={hideDialog}
          style={{
            alignSelf: "center",
            width: "90%",
            height: "45%",
            backgroundColor: "white",
          }}
        >
          <Dialog.Title
            style={GlobalStyles.h2}
          >{`QR ${selectedKodeBooking}`}</Dialog.Title>
          <Dialog.Content style={styles.dialogContentContainer}>
            <GenerateQRCode size={200} value={selectedKodeBooking} />
          </Dialog.Content>
        </Dialog>
      </Portal>
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
});

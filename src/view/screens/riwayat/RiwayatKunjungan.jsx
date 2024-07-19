import React, { useContext, useEffect } from "react";
import {
  View,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Text,
  ScrollView,
} from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";
import { AuthContex } from "../../../contex/AuthProvider";
import { BASE_URL } from "../../../contex/Config";
import axios from "axios";
import { useState } from "react";
import { ActivityIndicator, Dialog, Portal } from "react-native-paper";
import CardColapse from "../../../components/CardColapse";
import { useNavigation } from "@react-navigation/native";
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

  console.log("auth dari riwayat:", auth.user.id);

  const hideDialog = () => setLihatQR(false);

  const ambilDataRiwayat = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/riwayatbooking/${auth.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`, // Pastikan token disertakan dalam header jika diperlukan
            "Content-Type": "application/json",
            "x-api-key": "pd3@mino347",
          },
        }
      );
      console.log("Response data riwayat:", response.data); // Logging response data
      const data = response.data.data_user;
      setDataRiwayat(data);
    } catch (error) {
      console.error("Error fetching riwayat data:", error.message);
      console.error("Error response data:", error.response.data);
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
          <Text>Poliklinik : </Text>
          <Text>Tanggal periksa : </Text>
          <Text>Dokter : </Text>
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
          console.log("Item pilihpasien:", selectedKodeBooking);
          // , item.kode_booking);
          setLihatQR(true);
          // navigation.navigate("Booking Screen", item);
        }}
      />
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    ambilDataRiwayat();
  };

  // console.log('ini status')

  return (
    <SafeAreaView style={[GlobalStyles.safeAreaStyle, GlobalStyles.utama]}>
      <View style={{ flex: 1 }}>
        <HeaderComponent title={"Riwayat Periksa"} />
      </View>
      <View style={{ flex: 9 }}>
        {loading ? (
          <ActivityIndicator animating={true} color={WARNA.primary} />
        ) : dataRiwayat.length > 0 ? (
          <View>
            <FlatList
              style={{ width: "100%" }}
              data={dataRiwayat}
              renderItem={renderItem}
              // keyExtractor={(item) => item.kode_booking.toString()}
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
                  width: "80%",
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
                Belum ada data riwayat, silakan mendaftar poli
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
          <Dialog.Content
            style={{
              alignContent: "center",
              justifyContent: "center",
              marginTop: 10,
              height: "70%",
            }}
          >
            <GenerateQRCode size={200} value={selectedKodeBooking} />
          </Dialog.Content>
        </Dialog>
      </Portal>
    </SafeAreaView>
  );
}

import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ScrollView,
  Image,
} from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import BottomSheet from "../../../components/BottomSheet";
import { BASE_URL } from "../../../contex/Config";
import { AuthContex } from "../../../contex/AuthProvider";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import CardColapse from "../../../components/CardColapse";

const Item = ({ item }) => (
  <CardColapse title={item.id_pasien} subtitle={item.nm_pasien}>
    <View style={{ flexDirection: "row", gap: 8 }}>
      <View>
        <Text>No.Telp </Text>
        <Text>Hubungan </Text>
        <Text>Pekerjaan </Text>
        <Text>Tgl Lahir </Text>
      </View>
      <View>
        <Text> {item.no_tlp}</Text>
        <Text> {item.status_user}</Text>
        <Text> {item.pekerjaan}</Text>
        <Text> {item.tgl_lahir}</Text>
      </View>
    </View>
    <View style={{ marginTop: 10 }}>
      {item.no_rkm_medis ? (
        <View style={GlobalStyles.chipSuccess}>
          <Text style={GlobalStyles.textChipSucces}>Sudah Ada RM</Text>
        </View>
      ) : (
        <View style={GlobalStyles.chipError}>
          <Text style={GlobalStyles.textChipError}>Belum Ada RM</Text>
        </View>
      )}
    </View>
  </CardColapse>
);

const WARNA = { primary: "#0A78E2", white: "#fff", red: "#F01F1F" };

export default function InfoListPasien() {
  const navigation = useNavigation();
  const [btmTambah, setBtmtambah] = useState(false);
  // const [adaKerabat, setAdaKerabat] = useState(false);
  const [dataPasien, setDataPasien] = useState();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { auth } = useContext(AuthContex);

  console.log("ini adalah id auth dari info data pasien", auth.user.id);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/daftarKerabat/${auth.user.id}/`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`, // Pastikan token disertakan dalam header jika diperlukan
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        }
      );
      console.log("Respon data kerabat:", response.data); // Logging response data
      const data = response.data.data_kerabat;
      setDataPasien(data);
    } catch (error) {
      console.error("Error fetching kerabat data:", error.message);
      console.error("Error response data:", error.response.data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <View style={{ flex: 1 }}>
        <HeaderComponent title={"Informasi Data Pasien"} />
      </View>

      <View style={{ flex: 9, alignItems: "center" }}>
        {loading ? (
          <ActivityIndicator
            animating={true}
            color={WARNA.primary}
            size={"large"}
          />
        ) : dataPasien ? (
          <FlatList
            style={{ width: "100%" }}
            data={dataPasien}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
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
                ]}>
                Belum ada data pasien, silakan tambah data atau refresh
              </Text>
            </View>
          </ScrollView>
        )}
      </View>

      {btmTambah && (
        <BottomSheet
          setStatus={setBtmtambah}
          ukuranModal={{ width: "100%", height: "20%" }}
          judul="Sudah Pernah Periksa Sebelumnya?"
          subjudul="Jika sudah punya No. Rekam Medis pilih Sudah"
          buttonKiri="Belum"
          buttonKanan="Sudah"
          pressKiri={() => navigation.navigate("Tambah Pasien Baru")}
          pressKanan={() => navigation.navigate("Tambah Pasien Lama")}
        />
      )}
    </SafeAreaView>
  );
}

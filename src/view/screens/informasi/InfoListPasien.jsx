import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
} from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
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
        <Text>No.Telp : </Text>
        <Text>Pekerjaan : </Text>
        <Text>Tgl Lahir : </Text>
      </View>
      <View>
        <Text> {item.no_telp}</Text>
        <Text> {item.pekerjaan}</Text>
        <Text> {item.tgl_lahir}</Text>
      </View>
    </View>
    <View style={{ marginTop: 10 }}>
      {item.no_rkm_medis != null ? (
        <View style={GlobalStyles.chipSuccess}>
          <Text style={GlobalStyles.textChipSucces}>Terverifikasi</Text>
        </View>
      ) : (
        <View style={GlobalStyles.chipError}>
          <Text style={GlobalStyles.textChipError}>Belum Verifikasi</Text>
        </View>
      )}
      {/* {item.status_reg == "Batal" && (
        <View style={GlobalStyles.chipError}>
          <Text style={GlobalStyles.textChipError}>Batal Periksa</Text>
        </View>
      )} */}
    </View>
  </CardColapse>
  // <TouchableOpacity onPress={onPress} style={styles.item}>
  //   <Text style={styles.title}>{item.nm_pasien}</Text>
  // </TouchableOpacity>
);

const WARNA = { primary: "#0A78E2", white: "#fff", red: "#F01F1F" };

export default function InfoListPasien() {
  const navigation = useNavigation();
  const [btmTambah, setBtmtambah] = useState(false);
  const [adaKerabat, setAdaKerabat] = useState(false);
  const [dataPasien, setDataPasien] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { auth } = useContext(AuthContex);

  console.log("ini adalah id auth", auth.user.id);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/daftarKerabat/${auth.user.id}/`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`, // Pastikan token disertakan dalam header jika diperlukan
          },
        }
      );
      console.log("Respon data kerabat:", response.data); // Logging response data
      const data = response.data.data_kerabat;

      setDataPasien(data);
    } catch (error) {
      console.error("Error fetching kerabat data:", error.message);
      console.error("Error response data:", error.response?.data);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
      // Add any cleanup logic here if needed
      return () => {};
    }, [])
  );

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          console.log("Item clicked:", item);
        }}
      />
    );
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
      {/* <View style={{ flex: 1, alignItems: "center" }}>
        <View style={GlobalStyles.btnFullContainer}>
          <ButtonPrimary title={"Tambahkan Data"} onPress={setBtmtambah} />
        </View>
      </View> */}
      <View style={{ flex: 9, alignItems: "center" }}>
        {loading ? (
          <ActivityIndicator
            animating={true}
            color={WARNA.primary}
            size={"large"}
          />
        ) : dataPasien.length > 0 ? (
          <FlatList
            style={{ width: "100%" }}
            data={dataPasien}
            renderItem={renderItem}
            keyExtractor={(item) => item.no_ktp.toString()}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        ) : (
          <Text>Belum ada data pasien sebelumnya, silakan tambah data</Text>
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

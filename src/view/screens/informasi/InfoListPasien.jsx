import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";
import ButtonPrimary from "../../../components/ButtonPrimary";
import { useNavigation, useRoute } from "@react-navigation/native";
import BottomSheet from "../../../components/BottomSheet";
import { BASE_URL } from "../../../contex/Config";
import { AuthContex } from "../../../contex/AuthProvider";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.title}>{item.nm_pasien}</Text>
  </TouchableOpacity>
);

const WARNA = { primary: "#0A78E2", white: "#fff", red: "#F01F1F" };

export default function InfoListPasien() {
  const navigation = useNavigation();
  // const [selectedId, setSelectedId] = useState();
  const [btmTambah, setBtmtambah] = useState(false);
  const [adaKerabat, setAdaKerabat] = useState(false);
  const [dataPasien, setDataPasien] = useState([]);
  const [loading, setLoading] = useState(true);
  const { auth } = useContext(AuthContex);

  console.log("ini adalah id auth", auth.user.id);

  const fetchData = async () => {
    try {
      const url = `${BASE_URL}/daftarKerabat/${auth.user.id}`;
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${auth.user.token}`, // Pastikan token disertakan dalam header jika diperlukan
        },
      });
      console.log("Response data:", response.data); // Logging response data
      const data = response.data.data_kerabat;
      setDataPasien(data);
    } catch (error) {
      console.error("Error fetching kerabat data:", error.message);
      console.error("Error response data:", error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <View style={{ flex: 2 }}>
        <HeaderComponent title={"Data Pasien"} />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <View style={GlobalStyles.btnFullContainer}>
          <ButtonPrimary title={"Tambahkan Data"} onPress={setBtmtambah} />
        </View>
      </View>
      <View style={{ flex: 12, alignItems: "center" }}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderBottomWidth: 0.5,
    // marginVertical: 8,
    // marginHorizontal: 20,
  },
  title: {
    fontSize: 16,
  },
});

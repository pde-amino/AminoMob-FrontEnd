import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";
import ButtonPrimary from "../../../components/ButtonPrimary";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "../../../components/BottomSheet";
import { BASE_URL } from "../../../contex/Config";
import { AuthContex } from "../../../contex/AuthProvider";
import axios from "axios";
import { ActivityIndicator, Icon } from "react-native-paper";
import BottomSheetMenu from "../../../components/BottomSheetMenu";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={GlobalStyles.textBiasa}>{item.nm_pasien}</Text>
    <Icon source="chevron-right" size={24} />
  </TouchableOpacity>
);

const WARNA = { primary: "#0A78E2", white: "#fff", red: "#F01F1F" };

export default function ListPasien() {
  const navigation = useNavigation();
  // const [selectedId, setSelectedId] = useState();
  const [btmTambah, setBtmtambah] = useState(false);
  const [btmMenu, setBtmMenu] = useState(false);
  const [dataPasien, setDataPasien] = useState([]);
  const [pilihPasien, setPilihPasien] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { auth } = useContext(AuthContex);

  console.log("id user dari screen listpasien", auth.user.id);

  const pasienLama = () => {
    navigation.navigate("Tambah Pasien Lama");
    setBtmtambah(false);
  };
  const pasienBaru = () => {
    navigation.navigate("Tambah Pasien Baru");
    setBtmtambah(false);
  };

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
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const Menus = [
    {
      kd_poli: "1",
      title: "Poliklinik",
      desc: "Pendaftaran online poliklinik rawat jalan",
      to: "Pilih Poli",
      // warna: "#E79903",
      warna: "#DC9203",
      img: require("../../../../assets/icon41.png"),
    },
    {
      kd_poli: "2",
      title: "Pemeriksaan Penunjang",
      desc: "Pendaftaran Laborat dan Radiologi",
      // to:
      // warna: "#A9BD2C",
      warna: "#8FA11E",
      img: require("../../../../assets/icon42.png"),
    },
    {
      kd_poli: "3",
      title: "Telekonseling",
      desc: "Konsultasi online dengan Psikiater atau Psikolog pilihan Anda",
      // to: () => {
      //   setJnsMenu("tele");
      //   setBtmTele(true);
      // },
      // warna: "#09A0CF",
      warna: "#0293C0",
      img: require("../../../../assets/icon43.png"),
    },
    {
      kd_poli: "4",
      title: "Terang Bulan",
      desc: "Pelayanan Fisioterapi dan Terapi Wicara yang dilakukan dirumah pasien",
      // to: () => {
      //   setJnsMenu("terang");
      //   setBtmTerang(true);
      // },
      // warna: "#A557F3",
      warna: "#9335F0",
      img: require("../../../../assets/icon44.png"),
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          setPilihPasien(item);
          // console.log("Item pilihpasien:", item);
          // setBtmMenu(true);
          navigation.navigate(
            "LayananNonBPJS",
            item
            // (selectedItem = item)
          );
          // console.log("Pilih Poli", selectedItem);
        }}
      />
    );
  };

  const handleMenuPress = (menuItem) => {
    setBtmMenu(false);
    navigation.navigate(menuItem.to, { no_rkm_medis: pilihPasien });
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <HeaderComponent
        title={"Daftar Pasien"}
        icon={"arrow-back"}
        onPress={() => navigation.goBack()}
      />
      <View style={GlobalStyles.Content}>
        {loading ? (
          <ActivityIndicator animating={true} color={WARNA.primary} />
        ) : dataPasien ? (
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
          <View style={styles.containerTengah}>
            <Icon source="account-search" size={250} color={"#73B9FC"} />
            <Text
              style={{
                fontSize: 14,
                textAlign: "center",
              }}>
              Belum ada data pasien, silakan tambah data
            </Text>
          </View>
        )}
      </View>
      <View style={[GlobalStyles.btnFullContainer, { margin: 20 }]}>
        <ButtonPrimary title={"Tambahkan Data"} onPress={setBtmtambah} />
      </View>

      {btmMenu && pilihPasien && (
        <BottomSheetMenu
          dataMenu={Menus}
          setStatus={setBtmMenu}
          ukuranModal={{ width: "100%", height: "65%" }}
          judul="Menu Layanan"
          subjudul="Pilih Layanan Non BPJS"
          onMenuPress={handleMenuPress}
        />
      )}

      {btmTambah && (
        <BottomSheet
          setStatus={setBtmtambah}
          ukuranModal={{ width: "100%", height: "20%" }}
          judul="Sudah Pernah Periksa Sebelumnya?"
          subjudul="Pilih Sudah jika punya No. Rekam Medis"
          buttonKiri="Belum"
          buttonKanan="Sudah"
          pressKiri={pasienBaru}
          pressKanan={pasienLama}
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
    borderBottomWidth: 1,
    borderColor: "#eaeaea",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    // marginVertical: 8,
    // marginHorizontal: 20,
  },
  title: {
    fontSize: 16,
  },
  containerTengah: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});

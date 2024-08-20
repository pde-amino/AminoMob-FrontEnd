import React, { useContext, useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  ScrollView,
  Image,
  Alert,
} from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";
import ButtonPrimary from "../../../components/ButtonPrimary";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import BottomSheet from "../../../components/BottomSheet";
import { BASE_URL } from "../../../contex/Config";
import { AuthContex } from "../../../contex/AuthProvider";
import axios from "axios";
import { ActivityIndicator, Icon } from "react-native-paper";

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={GlobalStyles.textBold}>{item.nm_pasien}</Text>
    <Icon source="chevron-right" size={24} />
  </TouchableOpacity>
);

const WARNA = { primary: "#0A78E2", white: "#fff", red: "#F01F1F" };

export default function ListPasien() {
  const { auth } = useContext(AuthContex);
  const navigation = useNavigation();
  const [btmTambah, setBtmtambah] = useState(false);
  const [dataPasien, setDataPasien] = useState();
  const [pilihPasien, setPilihPasien] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);

  const pasienLama = () => {
    navigation.navigate("Tambah Pasien Lama");
    setBtmtambah(false);
  };
  const pasienBaru = () => {
    navigation.navigate("Tambah Pasien Baru");
    setBtmtambah(false);
  };

  console.log("ListPasien", auth);
  const fetchData = async () => {
    try {
      const response = await axios
        .get(`${BASE_URL}/daftarKerabat/${auth.id}/`, {
          headers: {
            Authorization: `Bearer ${auth.token}`, // Pastikan token disertakan dalam header jika diperlukan
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        })
        .then((response) => {
          setDataPasien(response.data.data_kerabat);
        });
    } catch (error) {
      if (error.message != "Request failed with status code 404") {
        Alert.alert(
          "Maaf",
          "Ada kesalahan saat mengambil data list pasien, mohon ulangi beberapa saat lagi " +
            error
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [])
  );

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          setPilihPasien(item);
          navigation.navigate("LayananNonBPJS", item);
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
      <View style={{ flex: 1.4 }}>
        <HeaderComponent
          title={"Daftar Pasien"}
          icon={"arrow-back"}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={[GlobalStyles.Content, { flex: 10 }]}>
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
            keyExtractor={(item) => item.no_rkm_medis.toString()}
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
      <View style={[GlobalStyles.btnFullContainer, { margin: 20 }]}>
        <ButtonPrimary title={"Tambahkan Data"} onPress={setBtmtambah} />
      </View>

      {btmTambah && (
        <BottomSheet
          setStatus={setBtmtambah}
          ukuranModal={{ width: "100%", height: "20%" }}
          judul="Pernah Periksa Sebelumnya?"
          subjudul="Pasien yang sudah pernah periksa di Amino Hospital dan mempunyai nomor RM pilih Sudah"
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
  item: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderBottomWidth: 1,
    borderColor: "#eaeaea",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerTengah: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    gap: 8,
  },
});

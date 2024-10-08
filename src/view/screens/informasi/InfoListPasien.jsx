import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  RefreshControl,
  ScrollView,
  Image,
  Alert,
  Platform,
  StatusBar,
} from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "../../../components/BottomSheet";
import { BASE_URL } from "../../../contex/Config";
import { AuthContex } from "../../../contex/AuthProvider";
import axios from "axios";
import { ActivityIndicator } from "react-native-paper";
import CardColapse from "../../../components/CardColapse";

const Item = ({ item }) => (
  <CardColapse title={item.status_user} subtitle={item.nm_pasien}>
    <View style={{ flexDirection: "row", gap: 8 }}>
      <View>
        <Text>No.Telp </Text>
        <Text>Pekerjaan </Text>
        <Text>Tgl Lahir </Text>
      </View>
      <View>
        <Text> {item.no_tlp}</Text>
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
  const [dataPasien, setDataPasien] = useState();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { auth } = useContext(AuthContex);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/daftarKerabat/${auth.id}/`,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`, // Pastikan token disertakan dalam header jika diperlukan
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        }
      );

      const data = response.data.data_kerabat;
      setDataPasien(data);
    } catch (error) {
      if (error.response) {
        // Menangani error yang dikembalikan oleh server
        // const errorMessage =
        //   error.response.data.messages.error || "Unknown error";

        if (error.response.status === 401) {
          // Alert.alert("Perhatian", errorMessage);

          Alert.alert(
            "Perhatian",
            "Sesi Login anda telah berakhir mohon lakukan login ulang"
          );
          navigation.replace("Login Screen");
        } else if (error.response.status === 404) {
          // Alert.alert("Perhatian", errorMessage);
          return;
        } else {
          // Menangani error lain yang mungkin terjadi
          // Alert.alert("Error", `Terjadi kesalahan: ${errorMessage}`);
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
      } else {
        // Error lainnya
        // console.log("Error Message:", error.message);
        Alert.alert(
          "Peringatan",
          `Terdapat kesalahan data mohon lakukan login ulang`
        );
        navigation.replace("Login Screen");
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
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
      fetchData();
    }
  }, []);

  const renderItem = ({ item }) => {
    return <Item item={item} />;
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <>
      <SafeAreaView
        style={[
          GlobalStyles.utama,
          {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
        ]}
      >
        <HeaderComponent title={"Informasi Data Pasien"} />

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
                Belum ada data pasien, silakan tambah data lewat menu layanan di
                Home atau refresh
              </Text>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
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
    </>
  );
}

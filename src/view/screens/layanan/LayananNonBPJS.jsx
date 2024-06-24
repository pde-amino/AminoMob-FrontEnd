import React, { useContext, useEffect, useState } from "react";
import { View, FlatList, SafeAreaView, Alert, Text } from "react-native";

import CardButtonNavComponent from "../../../components/CardButtonNavComponent";
import GlobalStyles from "../../../style/GlobalStyles";
import CardButtonComponent from "../../../components/CardButtonComponent";
import BottomSheet from "../../../components/BottomSheet";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderComponent from "../../../components/HeaderComponent";
import axios from "axios";
import { AuthContex } from "../../../contex/AuthProvider";
import { BASE_URL } from "../../../contex/Config";
const WARNA = { primary: "#0A78E2", white: "#fff" };
export default function LayananNonBPJS() {
  const navigation = useNavigation();
  const [jnsMenu, setJnsMenu] = useState(null);
  const [btmPoli, setBtmPoli] = useState(false);
  const [btmPenunjang, setBtmPenunjang] = useState(false);
  const [btmTele, setBtmTele] = useState(false);
  const [btmTerang, setBtmTerang] = useState(false);
  const [kerabat, setKerabat] = useState(false);
  const route = useRoute();

  console.log("datapasdsdasdasdasd", route.params);
  const dataKerabat = route.params;
  const { auth } = useContext(AuthContex);
  console.log("Ini Auth :", auth);

  const Menus = [
    {
      kd_poli: "1",
      title: "Poliklinik",
      desc: "Pendaftaran online poliklinik rawat jalan",
      // to: () => {
      //   setJnsMenu("Poliklinik");
      //   setBtmPoli(true);
      // },
      // warna: "#E79903",
      warna: "#DC9203",
      img: require("../../../../assets/icon41.png"),
    },
    {
      kd_poli: "2",
      title: "Pemeriksaan Penunjang",
      desc: "Pendaftaran Laborat dan Radiologi",
      // to: () => {
      //   setJnsMenu("Penunjang");
      //   setBtmPenunjang(true);
      // },
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

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <View style={{ flex: 2 }}>
        <HeaderComponent
          title={"Layanan Non BPJS"}
          icon={"arrow-back"}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Text style={GlobalStyles.textBiasa}>Daftarkan untuk :</Text>
        <Text style={GlobalStyles.h4}>{dataKerabat.nm_pasien}</Text>
      </View>
      <View style={{ flex: 14, alignItems: "center" }}>
        <FlatList
          data={Menus}
          renderItem={({ item }) => (
            <CardButtonComponent
              data={{ clinicId: item.kd_poli, nameClinic: item.desc }}
              title={item.title}
              description={item.desc}
              onPress={() => navigation.navigate("Pilih Poli", dataKerabat)}
              warna={item.warna}
              imgSource={item.img}
            />
          )}
          keyExtractor={(item) => item.kd_poli}
        />
      </View>
    </SafeAreaView>
  );
}

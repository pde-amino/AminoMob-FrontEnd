import { View, SafeAreaView, ScrollView, FlatList } from "react-native";
import React from "react";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";
import CardButtonNavComponent from "../../../components/CardButtonNavComponent";

const WARNA = { primary: "#0A78E2", white: "#fff" };

export default function RiwayatKunjungan() {
  const Menus = [
    {
      kd_poli: "1",
      source: require("../../../../assets/icon31.png"),
      title: "Layanan RS (Non BPJS)",
      desc: "Pendaftaran layanan kesehatan khusus untuk pasien Non BPJS",
      to: "LayananNonBPJS",
      warna: WARNA.primary,
      kondisi: false,
    },
    {
      kd_poli: "2",
      source: require("../../../../assets/icon32.png"),
      title: "Layanan RS (BPJS)",
      desc: "Pendaftaran layanan kesehatan khusus untuk pasien BPJS",
      to: "Informasi Rumah Sakit",
      warna: WARNA.primary,
    },
    {
      kd_poli: "3",
      source: require("../../../../assets/icon33.png"),
      title: "Informasi Umum RS",
      desc: "Informasi terkini dan terlengkap seputar Amino Hospital",
      to: "Informasi Umum",
      // params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
      warna: WARNA.primary,
    },
  ];

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <HeaderComponent title={"Riwayat"} />
      <View style={GlobalStyles.Content}>
        <FlatList
          data={Menus}
          renderItem={({ item }) => (
            <CardButtonNavComponent
              data={{ clinicId: item.kd_poli, nameClinic: item.desc }}
              icon={item.icon}
              title={item.title}
              description={item.desc}
              onPress={item.to}
              colorIcon={item.color}
              imgSource={item.source}
              warna={item.warna}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}

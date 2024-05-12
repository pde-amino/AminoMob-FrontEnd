import React, { useState } from "react";
import { View, FlatList } from "react-native";

import CardButtonNavComponent from "../../../components/CardButtonNavComponent";
import GlobalStyles from "../../../style/GlobalStyles";
import CardButtonComponent from "../../../components/CardButtonComponent";
import BottomSheet from "../../../components/BottomSheet";
import { useNavigation } from "@react-navigation/native";

export default function LayananNonBPJS() {
  const Menus = [
    // {
    //   kd_poli: "1",
    //   icon: "home",
    //   title: "Poliklinik",
    //   desc: "Layanan pendaftaran online poliklinik rawat jalan",
    //   to: "LayananNonBPJS",
    //   color: "pink",
    //   kondisi: false,
    // },
    {
      kd_poli: "2",
      icon: "book",
      title: "Telekonseling",
      desc: "Konsultasi online dengan Psikiater atau Psikolog pilihan Anda",
      to: "Informasi Rumah Sakit",
      color: "green",
    },
    {
      kd_poli: "3",
      icon: "note",
      title: "Terang Bulan",
      desc: "Pelayanan Fisioterapi dan Terapi Wicara yang dilakukan dirumah pasien",
      to: "Informasi Umum",
      params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
      color: "blue",
    },
  ];

  const navigation = useNavigation();
  const [kondisi, setKondisi] = useState(false);

  const diriSendiri = () => {
    navigation.navigate("Dirisendiri");
    setKondisi(false);
  };

  const orangLain = () => {
    navigation.navigate("Daftar Online");
    setKondisi(false);
  };

  return (
    <View style={GlobalStyles.Content}>
      <CardButtonComponent
        icon="home"
        title="Daftar Online Poli Klinik"
        description="Layanan pendaftaran online poliklinik rawat jalan"
        onPress={() => setKondisi(true)}
        colorIcon="blue"
      />
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
          />
        )}
        keyExtractor={(item) => item.kd_poli}
      />
      {kondisi && (
        <BottomSheet
          setStatus={setKondisi}
          ukuranModal={{ width: "100%", height: "25%" }}
          judul="Untuk siap Anda ingin Mendaftar ?"
          subjudul='Pilih "Diri Sendiri" jika Anda ingin mendaftar untuk Diri Anda sendiri. Pilih "Orang Lain" jika Anda ingin mendaftarkan Kerabat atau Orang Lain'
          buttonKiri="Diri Sendiri"
          buttonKanan="Orang Lain"
          pressKanan={orangLain}
          pressKiri={diriSendiri}
        />
      )}
    </View>
  );
}

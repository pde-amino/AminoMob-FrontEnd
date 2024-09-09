import React, { useContext, useState } from "react";
import {
  View,
  FlatList,
  SafeAreaView,
  Alert,
  Text,
  Platform,
} from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import CardButtonComponent from "../../../components/CardButtonComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderComponent from "../../../components/HeaderComponent";
import { AuthContex } from "../../../contex/AuthProvider";
import { BASE_URL } from "../../../contex/Config";
import { StatusBar } from "expo-status-bar";

const WARNA = { primary: "#0A78E2", white: "#fff" };
export default function LayananNonBPJS() {
  const navigation = useNavigation();
  const [jnsMenu, setJnsMenu] = useState(null);
  const route = useRoute();

  const dataKerabat = route.params;
  const { auth } = useContext(AuthContex);

  // const notifNoRawat = () => {
  //   <View>
  //     <Text>{dataKerabat.nm_pasien} belum memiliki nomor rawat.</Text>
  //     <Text>
  //       Terang bulah hanya bisa untuk psien yang sudah memiliki nomor rawat.
  //     </Text>
  //     <TouchableOpacityComponent
  //       onPress={() => {
  //         Alert.alert("Informasi", "Cara mendapatkan nomor rawat");
  //       }}
  //     >
  //       <Text>Bagaimana cara mendapatkan nomor rawat</Text>
  //     </TouchableOpacityComponent>
  //   </View>;
  // };

  const Menus = [
    {
      kd_poli: "1",
      title: "Poliklinik",
      desc: "Pendaftaran online poliklinik rawat jalan",
      poli: "Klinik",
      to: () => {
        setJnsMenu("Poliklinik");
        navigation.navigate("Pilih Poli", {
          dataKerabat,
          jnsMenu: "Poliklinik",
        });
      },
      warna: "#DC9203",
      img: require("../../../../assets/icon41.png"),
    },
    {
      kd_poli: "2",
      title: "Pemeriksaan Penunjang",
      desc: "Pendaftaran Laborat dan Radiologi",
      // to: "Pilih Poli",
      poli: "Penunjang",
      to: () => {
        setJnsMenu("Penunjang");
        navigation.navigate("Pilih Poli", {
          dataKerabat,
          jnsMenu: "Penunjang",
        });
      },
      warna: "#A9BD2C",
      warna: "#8FA11E",
      img: require("../../../../assets/icon42.png"),
    },
    {
      kd_poli: "3",
      title: "Telekonseling",
      desc: "Konsultasi online dengan Psikiater atau Psikolog pilihan Anda",
      to: "Pilih Poli",
      poli: "Penunjang",
      to: () => {
        // setJnsMenu("TerangBulan");
        // navigation.navigate("Pilih Poli", {
        //   dataKerabat,
        //   jnsMenu: "TerangBulan",
        // });
        // () => {
        Alert.alert(
          "Maaf",
          "Saat ini menu Telekonseling masih dalam tahap pengembangan"
        );
        // setJnsMenu("tele");
      },
      warna: "#0293C0",
      img: require("../../../../assets/icon43.png"),
    },
    {
      kd_poli: "4",
      title: "Terang Bulan",
      desc: "Pelayanan Fisioterapi dan Terapi Wicara yang dilakukan dirumah pasien",
      to: "Pilih Poli",
      poli: "Penunjang",
      to: () => {
        Alert.alert(
          "Maaf",
          "Saat ini menu Terang Bulan masih dalam tahap pengembangan"
        );
        // setJnsMenu("tele");
      },
      warna: "#9335F0",
      img: require("../../../../assets/icon44.png"),
    },
  ];

  return (
    <SafeAreaView
      style={[
        GlobalStyles.utama,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}>
      <HeaderComponent
        title={"Layanan Non BPJS"}
        icon={"arrow-back"}
        onPress={() => navigation.goBack()}
      />
      <View style={{ marginHorizontal: 20, marginTop: 20 }}>
        <Text style={GlobalStyles.textBiasa}>Daftarkan untuk :</Text>
        <Text style={GlobalStyles.h4}>{dataKerabat.nm_pasien}</Text>
      </View>
      <View style={{ alignItems: "center" }}>
        <FlatList
          style={{ marginVertical: 10 }}
          data={Menus}
          renderItem={({ item }) => (
            <CardButtonComponent
              data={{
                clinicId: item.kd_poli,
                nameClinic: item.desc,
                poli: item.poli,
              }}
              title={item.title}
              description={item.desc}
              onPress={item.to}
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

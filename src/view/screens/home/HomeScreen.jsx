import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MenuItemComponent from "../../../components/MenuItemComponent";
import LoadingContent from "../../../components/LoadingContent";
import { Button } from "react-native-paper";
import CardButtonNavComponent from "../../../components/CardButtonNavComponent";
import SliderComponent from "../../../components/SliderComponent ";
import MySlider from "../../../components/MySlider";
import GlobalStyles from "../../../style/GlobalStyles";
import BottomSheet from "../../../components/BottomSheet";
import ConfirmModal from "../../../components/ConfirmModal";
import CardButtonComponent from "../../../components/CardButtonComponent";
import { AuthContex } from "../../../contex/AuthProvider";

const { lebar } = Dimensions.get("window");

const HomeScreen = () => {
  const { data } = useContext(AuthContex);
  // const route = useRoute();
  // const { data } = route.params;
  console.log("result", { data });
  // const { result } = route.params;
  const Menus = [
    {
      kd_poli: "1",
      icon: "home",
      title: "Layanan Rumah Sakit (Non BPJS)",
      desc: "Pendaftaran layanan kesehatan online maupun offline khusus untuk pasien Tunai (Non BPJS)",
      to: "LayananNonBPJS",
      color: "pink",
      kondisi: false,
    },
    {
      kd_poli: "2",
      icon: "book",
      title: "Layanan Rumah Sakit (Non BPJS)",
      desc: "Pendaftaran layanan kesehatan khusus untuk pasien BPJS",
      to: "Informasi Rumah Sakit",
      color: "green",
    },
    {
      kd_poli: "3",
      icon: "note",
      title: "Informasi Umuum Rumah Sakit",
      desc: "Berbagai Informasi terkini dan terlengkap seputar Amino Hospital",
      to: "Informasi Umum",
      params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
      color: "blue",
    },
    // {
    //   kd_poli: "4",
    //   icon: "history",
    //   title: "Riwayat Kunjungan",
    //   desc: "Riwayat Lengkap  Pemeriksaan Anda",
    //   to: "Riwayat Kunjungan",
    //   // params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
    //   color: "blue",
    // },
    // {
    //   kd_poli: "5",
    //   icon: "check",
    //   title: "FAQ",
    //   desc: "Pertanyaan yang sering muncul",
    //   to: "FAQ",
    //   // params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
    //   color: "blue",
    // },
  ];

  const navigation = useNavigation();
  const [poliklinikData, setPoliklinikData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const diriSendiri = () => {
    navigation.navigate("Daftar Online");
    setKondisi(false);
  };

  const orangLain = () => {
    navigation.navigate("Daftar Online");
    setKondisi(false);
  };

  const handleClinicSelection = (screen, params) => {
    navigation.navigate(screen, params);
  };

  const handleKondisi = (item) => {
    if (item.kondisi) {
      // Lakukan sesuatu jika kondisi terpenuhi
      setModalVisible(true);
    } else {
      // Navigasi ke screen lain berdasarkan nilai 'to' dari item
      navigation.navigate(item.to);
    }
  };

  const [kondisi, setKondisi] = React.useState(false);

  return (
    <View
      style={[
        GlobalStyles.Main,
        (flex = 1),
        (marginHorizontal = 24),
        (marginTop = 40),
      ]}
    >
      <View
        style={{
          backgroundColor: "white",
          width: lebar,
          height: 650,
          position: "absolute",
          top: 300,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      <View style={GlobalStyles.Home}>
        <Text
          style={{
            fontSize: 15,
            textAlign: "left",
            color: "white",
            lineHeight: 36,
            marginTop: 40,
          }}
        >
          Halaman Utama
        </Text>
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            color: "white",
            marginBottom: 8,
          }}
        >
          Amino Mobile
        </Text>
      </View>
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
        ListHeaderComponent={
          <>
            <MySlider />
            {/* <CardButtonComponent
              icon="home"
              title="Layanan Rumah Sakit (Non BPJS)"
              description="Pendaftaran Poli Klinik"
              onPress={() => setKondisi(true)}
              colorIcon="blue"
            /> */}
          </>
        }
      />

      {/* {kondisi && (
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
      )} */}
    </View>
  );
};

export default HomeScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuItemComponent from "../../../components/MenuItemComponent";
import LoadingContent from "../../../components/LoadingContent";
import { Button } from "react-native-paper";
import CardButtonNavComponent from "../../../components/CardButtonNavComponent";
import SliderComponent from "../../../components/SliderComponent ";
import MySlider from "../../../components/MySlider";
import { ScrollView } from "react-native";

const HomeScreenOld = () => {
  const Menus = [
    // {
    //   kd_poli: "1",
    //   icon: "home",
    //   title: "Daftar Online",
    //   desc: "Pendaftaran Poli Klinik",
    //   to: "Daftar Online",
    //   color: "pink",
    //   kondisi: false,
    // },
    {
      kd_poli: "2",
      icon: "book",
      title: "Informasi Rumah Sakit",
      desc: "Telekonseling Gratis",
      to: "Informasi Rumah Sakit",
      color: "green",
    },
    {
      kd_poli: "3",
      icon: "note",
      title: "Layanan Rumah Sakit",
      desc: "Lihat Jadwal Dokter",
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
        (marginTop = 20),
      ]}>
      <View style={GlobalStyles.safeAreaStyle}>
        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            color: "#3c3c3c",
            lineHeight: 36,
          }}>
          Hii,
        </Text>
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            color: "white",
            marginBottom: 8,
          }}>
          Safira Putri
        </Text>
      </View>
      <ScrollView>
        <MySlider />

        <View
          style={{
            // flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}>
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            // refreshControl={
            //   <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
            // }
            // horizontal={false}
            // numColumns={3}
            data={Menus}
            renderItem={({ item, index }) => (
              <CardButtonNavComponent
                // onPress={() =>
                //   handleClinicSelection("Testing", {
                //     clinicId: item.kd_poli,
                //     nameClinic: item.desc,
                //   })
                // }
                data={{ clinicId: item.kd_poli, nameClinic: item.desc }}
                icon={item.icon}
                title={item.title}
                description={item.desc}
                onPress={item.to}
                // colorIcon={item.color}
              />
            )}
            keyExtractor={(item) => item.kd_poli}
          />
        </View>
      </ScrollView>
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
};

export default HomeScreenOld;

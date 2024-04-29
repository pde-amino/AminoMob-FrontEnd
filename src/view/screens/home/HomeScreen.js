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
import CardButtonComponent from "../../../components/CardButtonComponent";
import SliderComponent from "../../../components/SliderComponent ";
import MySlider from "../../../components/MySlider";
import GlobalStyles from "../../../style/GlobalStyles";
import BottomSheet from "../../../components/BottomSheet";

const { lebar } = Dimensions.get("window");

const HomeScreen = () => {
  const Menus = [
    {
      kd_poli: "1",
      icon: "home",
      title: "Daftar Online",
      desc: "Pendaftaran Poli Klinik",
      to: "Daftar Online",
      color: "pink",
      kondisi: true,
    },
    {
      kd_poli: "2",
      icon: "book",
      title: "Pendaftaran Telekonseling",
      desc: "Telekonseling Gratis",
      to: "Telekonseling",
      color: "green",
    },
    {
      kd_poli: "3",
      icon: "note",
      title: "Informasi Umum",
      desc: "Lihat Jadwal Dokter",
      to: "Informasi Umum",
      params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
      color: "blue",
    },
    {
      kd_poli: "4",
      icon: "history",
      title: "Riwayat Kunjungan",
      desc: "Riwayat Lengkap  Pemeriksaan Anda",
      to: "Riwayat Kunjungan",
      // params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
      color: "blue",
    },
    {
      kd_poli: "5",
      icon: "check",
      title: "FAQ",
      desc: "Pertanyaan yang sering muncul",
      to: "FAQ",
      // params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
      color: "blue",
    },
  ];

  const navigation = useNavigation();
  const [poliklinikData, setPoliklinikData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);

  const handleConfirm = () => {
    // Lakukan aksi konfirmasi di sini
    setModalVisible(false);
  };

  const handleCancel = () => {
    // Lakukan aksi pembatalan di sini
    setModalVisible(false);
  };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = () => {
  //   setIsLoading(true);
  //   fetch("http://192.168.5.5:8080/poliklinik")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.message === "success") {
  //         setPoliklinikData(data.data_poli);
  //       } else {
  //         console.error("Error fetching data:", data.message);
  //         setError(true); // Mengatur error menjadi true saat terjadi kesalahan
  //       }
  //       setIsLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //       setError(true); // Mengatur error menjadi true saat terjadi kesalahan
  //       setIsLoading(false);
  //     });
  // };

  const handleClinicSelection = (screen, params) => {
    navigation.navigate(screen, params);
  };

  // if (isLoading) {
  //   return <LoadingContent />; // Menampilkan komponen loading saat sedang memuat data
  // }

  // if (error || poliklinikData.length === 0) {
  //   // Menampilkan screen kosong atau error jika ada error atau data kosong
  //   return (
  //     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //       <Text>
  //         {error ? "Error occurred" : "Sepertinya tidak ada sesuatu disini"}
  //       </Text>
  //       <Button title="Retry" onPress={fetchData}>
  //         Coba Lagi
  //       </Button>
  //     </View>
  //   );
  // }

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
          top: 200,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      />
      <View>
        <Text
          style={{
            fontSize: 20,
            textAlign: "left",
            color: "white",
            lineHeight: 36,
            marginTop: 40,
          }}
        >
          Hii,
        </Text>
        <Text
          style={{
            fontSize: 26,
            fontWeight: "bold",
            color: "white",
            marginBottom: 8,
          }}
        >
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
          }}
        >
          <View>
            <Button
              title="Tampilkan Modal"
              onPress={() => setModalVisible(true)}
            />

            <ConfirmModal
              visible={isModalVisible}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
              message="Apakah Anda yakin ingin melanjutkan?"
              confirmButtonText="Ya"
              cancelButtonText="Tidak"
            />
          </View>
          <FlatList
            contentContainerStyle={{ flexGrow: 1 }}
            // refreshControl={
            //   <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
            // }
            // horizontal={false}
            // numColumns={3}
            data={Menus}
            renderItem={({ item, index }) => (
              <CardButtonComponent
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
    </View>
  );
};

export default HomeScreen;

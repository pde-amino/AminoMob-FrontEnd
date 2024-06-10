import React, { useState, useEffect } from "react";
import { View, FlatList, Text, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuItemComponent from "../../../components/MenuItemComponent";
import LoadingContent from "../../../components/LoadingContent";
import { Button } from "react-native-paper";
import GlobalStyles from "../../../style/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from "../../../components/HeaderComponent";

const InformasiUmum = () => {
  const Menus = [
    {
      kd_poli: "2",
      nm_poli: "Jadwal Dokter Poli",
      icon: "local-hospital",
      title: "Account",
      to: "Informasi Dokter",
      color: "pink",
    },
    {
      kd_poli: "2",
      nm_poli: "Informasi Tempat Tidur",
      icon: "hotel",
      title: "Information",
      to: "InfoTT",
      color: "green",
    },
  ];

  const navigation = useNavigation();
  const [poliklinikData, setPoliklinikData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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
    <SafeAreaView style={GlobalStyles.utama}>
      <HeaderComponent
        title="Informasi RS"
        icon={"arrow-back"}
        onPress={() => navigation.goBack()}
      />
      <View style={GlobalStyles.Content}>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          // refreshControl={
          //   <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
          // }
          horizontal={false}
          numColumns={3}
          data={Menus}
          renderItem={({ item }) => (
            <MenuItemComponent
              onPress={() =>
                handleClinicSelection(item.to, {
                  clinicId: item.kd_poli,
                  nameClinic: item.nm_poli,
                })
              }
              data={{ clinicId: item.kd_poli, nameClinic: item.nm_poli }}
              icon={item.icon}
              title={item.nm_poli}
              colorIcon={item.color}
            />
          )}
          keyExtractor={(item) => item.kd_poli}
        />
      </View>
    </SafeAreaView>
  );
};

export default InformasiUmum;

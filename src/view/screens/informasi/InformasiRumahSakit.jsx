import React, { useState, useEffect } from "react";
import { View, FlatList, Text, RefreshControl, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuItemComponent from "../../../components/MenuItemComponent";
import LoadingContent from "../../../components/LoadingContent";
import { Button } from "react-native-paper";
import GlobalStyles from "../../../style/GlobalStyles";

const InformasiRumahSakit = () => {
  const Menus = [
    {
      kd_poli: "2",
      nm_poli: "Jadmal Dokter",
      icon: "home",
      title: "Account",
      to: "Favorites",
      color: "pink",
    },
    {
      kd_poli: "2",
      nm_poli: "Info TT",
      icon: "format-list-numbered",
      title: "Informasi Tempat Tidur",
      to: "Informasi TT",
      color: "green",
    },
    {
      kd_poli: "2",
      nm_poli: "Poli",
      icon: "question-answer",
      title: "Klinik Umum",
      to: "DoctorScreen",
      params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
      color: "grey",
    },
    {
      kd_poli: "2",
      nm_poli: "Kopi 24",
      icon: "chat",
      title: "Web View",
      to: "Web View",
      // params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
      color: "grey",
    },
  ];

  const navigation = useNavigation();
  const [poliklinikData, setPoliklinikData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    fetch("http://192.168.5.5:8080/poliklinik")
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          setPoliklinikData(data.data_poli);
        } else {
          Alert.alert(
            "Maaf",
            "Ada kesalahan saat mengambil data informasi RS, mohon ulangi beberapa saat lagi " +
              error
          );
          setError(true); // Mengatur error menjadi true saat terjadi kesalahan
        }
        setIsLoading(false);
      })
      .catch((error) => {
        Alert.alert(
          "Maaf",
          "Ada kesalahan saat mengambil data informasi RS, mohon ulangi beberapa saat lagi " +
            error
        );
        setError(true); // Mengatur error menjadi true saat terjadi kesalahan
        setIsLoading(false);
      });
  };

  const handleClinicSelection = (screen, params) => {
    navigation.navigate(screen, params);
  };

  if (isLoading) {
    return <LoadingContent />; // Menampilkan komponen loading saat sedang memuat data
  }

  if (error || poliklinikData.length === 0) {
    // Menampilkan screen kosong atau error jika ada error atau data kosong
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>
          {error ? "Error occurred" : "Sepertinya tidak ada sesuatu disini"}
        </Text>
        <Button title="Retry" onPress={fetchData}>
          Coba Lagi
        </Button>
      </View>
    );
  }

  return (
    <View
      style={
        (GlobalStyles.Content,
        {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        })
      }
    >
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
              handleClinicSelection("Testing", {
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
  );
};

export default InformasiRumahSakit;

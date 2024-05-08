import React, { useState, useEffect } from "react";
import { View, FlatList, Text, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuItemComponent from "../../../components/MenuItemComponent";
import LoadingContent from "../../../components/LoadingContent";
import { Button } from "react-native-paper";

const HomeScreenOld = () => {
  const Menus = [
    {
      kd_poli: "2",
      nm_poli: "Daftar Online",
      icon: "home",
      title: "Account",
      to: "Favorites",
      color: "pink",
    },
    {
      kd_poli: "2",
      nm_poli: "Antrian",
      icon: "book-outline",
      title: "Information",
      to: "Portal Informasi",
      color: "green",
    },
    {
      kd_poli: "2",
      nm_poli: "Testing",
      icon: "leaf-outline",
      title: "Klinik Umum",
      to: "DoctorScreen",
      params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
      color: "blue",
    },
    {
      kd_poli: "2",
      nm_poli: "Testing",
      icon: "leaf-outline",
      title: "Web View",
      to: "Web View",
      // params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
      color: "blue",
    },
    // {
    //   kd_poli: "2",
    //   nm_poli: "Testing",
    //   icon: "heart",
    //   title: "Notifaction",
    //   to: "Favorites",
    //   color: "purple",
    // },
    // {
    //   kd_poli: "2",
    //   nm_poli: "Testing",
    //   icon: "bonfire-outline",
    //   title: "Poli 2",
    //   to: "Poli2",
    //   color: "red",
    // },
    // {
    //   kd_poli: "2",
    //   nm_poli: "Testing",
    //   icon: "leaf-outline",
    //   title: "Klinik Hijau",
    //   to: "DoctorScreen",
    //   params: { clinicId: 2, nameClinic: "Klinik Hijau" },
    //   color: "green",
    // },
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
          console.error("Error fetching data:", data.message);
          setError(true); // Mengatur error menjadi true saat terjadi kesalahan
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
        }
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

export default HomeScreenOld;

import React from "react";
import {
  View,
  FlatList,
  RefreshControl,
  Linking,
  Alert,
  Platform,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuItemComponent from "../../../components/MenuItemComponent";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";

export default function InformasiUmum() {
  const navigation = useNavigation();

  const showAlert = () =>
    Alert.alert(
      "Informasi",
      "Anda akan dihubungkan langsung ke layanan WhatsApp Humas Amino Hospital.",
      [
        {
          text: "Ikuti",
          onPress: () => {
            Linking.openURL("https://wa.me/6289515636878");
          },
        },
        {
          text: "Ok",
        },
      ],
      {
        cancelable: true,
      }
    );

  const Menus = [
    {
      kd_poli: "1",
      nm_poli: "Jadwal Dokter Poliklinik",
      icon: "local-hospital",
      title: "Account",
      to: () => navigation.navigate("Informasi Dokter"),
      color: "pink",
    },
    {
      kd_poli: "2",
      nm_poli: "Informasi Tempat Tidur",
      icon: "hotel",
      title: "Information",
      to: () => navigation.navigate("InfoTT"),
      color: "cornflowerblue",
    },
    // {
    //   kd_poli: "3",
    //   nm_poli: "Permintaan Informasi",
    //   icon: "support-agent",
    //   title: "Information",
    //   to: () => showAlert(),
    //   color: "green",
    // },
  ];

  return (
    <>
      {/* <View style={{ flex: 1.4 }}> */}
      <HeaderComponent
        title="Informasi RS"
        icon={"arrow-back"}
        onPress={() => navigation.goBack()}
      />
      {/* </View> */}

      <FlatList
        contentContainerStyle={{ marginTop: 4, alignItems: "center", gap: 4 }}
        // refreshControl={
        //   <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
        // }
        horizontal={false}
        numColumns={3}
        data={Menus}
        renderItem={({ item }) => (
          <MenuItemComponent
            onPress={item.to}
            data={{ clinicId: item.kd_poli, nameClinic: item.nm_poli }}
            icon={item.icon}
            title={item.nm_poli}
            colorIcon={item.color}
          />
        )}
        keyExtractor={(item) => item.kd_poli}
      />
    </>
  );
}

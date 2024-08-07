import React, { useState, useEffect } from "react";
import { View, FlatList, Text, RefreshControl, Linking } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuItemComponent from "../../../components/MenuItemComponent";
import GlobalStyles from "../../../style/GlobalStyles";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComponent from "../../../components/HeaderComponent";

const InformasiUmum = () => {
  const Menus = [
    {
      kd_poli: "1",
      nm_poli: "Jadwal Dokter Poli",
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
      color: "green",
    },
    {
      kd_poli: "3",
      nm_poli: "Permintaan Informasi",
      icon: "support-agent",
      title: "Information",
      to: () => Linking.openURL("https://wa.me/6281225204301"),
      color: "green",
    },
  ];

  const navigation = useNavigation();

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <View style={{ flex: 1 }}>
        <HeaderComponent
          title="Informasi RS"
          icon={"arrow-back"}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={[GlobalStyles.Content, { flex: 9 }]}>
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
              onPress={item.to}
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

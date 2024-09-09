import { View, Text, SafeAreaView } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import { TambahPasien } from "../pendaftaran/TambahPasien";
import { TambahPasienLama } from "../pendaftaran/TambahPasienLama";

const Tab = createMaterialTopTabNavigator();

const TabHome = () => {
  return (
    <SafeAreaView style={{ flex: 1, marginTop: 30 }}>
      {/* Gunakan SafeAreaView */}
      <Tab.Navigator>
        <Tab.Screen name="Tambah Pasien Baru" component={TambahPasien} />
        <Tab.Screen name="Tambah Pasien Lama" component={TambahPasienLama} />
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default TabHome;

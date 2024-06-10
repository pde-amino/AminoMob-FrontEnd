// SearchDokter.js
import { View, Text, FlatList, StyleSheet, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../../../style/GlobalStyles";
import SearchComponent from "../../../components/SearchComponent";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";
import CardButtonNavComponent from "../../../components/CardButtonNavComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
import HeaderComponent from "../../../components/HeaderComponent";

export default function SearchDokter() {
  const WARNA = { primary: "#0A78E2", white: "#fff" };
  const route = useRoute();
  const { nameClinic, clinicId } = route.params;
  console.log("nameClinic", nameClinic);
  console.log("nameClinic", clinicId);
  const [dataPoli, setDataPoli] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/caridokter/${clinicId}/`)
      .then((response) => {
        const data = response.data.data_dokter; // Assuming data_dokter contains the array
        setDataPoli(data);
        setFilteredData(data); // initialize with full data
        setLoading(false);
      })
      .catch((err) => console.log("Error Search Dokter :", err));
  }, []);

  if (loading) {
    return (
      <View style={GlobalStyles.Content}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={GlobalStyles.Content}>
        <Text>Error fetching data: {error.message}</Text>
      </View>
    );
  }

  const handleSearch = (filteredData) => {
    setFilteredData(filteredData);
  };

  //   console.log("Filtered Data:", filteredData); // Debugging log

  return (
    <View style={GlobalStyles.Content}>
      <HeaderComponent
        title="Daftar Dokter"
        icon={"arrow-back"}
        onPress={() => navigation.goBack()}
      />
      <SearchComponent
        platform="android"
        data={dataPoli}
        onSearch={handleSearch}
        placeholder="Cari dengan Nama Dokter / Hari"
        filterAttribute="nm_dokter"
      />
      {/* {filteredData ? (
        <Text style={GlobalStyles.h3}>Daftar Dokter pada {nameClinic}</Text>
      ) : (
        <Text style={GlobalStyles.h3}>
          Daftar Dokter pada {nameClinic} Sepertinya doter sedang cuti
        </Text>
      )} */}
      <FlatList
        data={filteredData}
        keyExtractor={(item, index) => `${item.kd_dokter}-${index}`}
        renderItem={({ item }) => (
          <CardButtonNavComponent
            title={item.nm_dokter}
            // description={item.nm_poli}
            imgSource={{ uri: `${item.image}` }}
            onPress={() =>
              Alert.alert(`${item.nm_dokter}`, `${item.nm_dokter}`)
            }
            warna={"#73B9FC"}
          />
        )}
      />
      <View />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

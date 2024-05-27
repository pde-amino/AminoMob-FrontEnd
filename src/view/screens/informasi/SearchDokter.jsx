// SearchDokter.js
import { View, Text, FlatList, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../../../style/GlobalStyles";
import SearchComponent from "../../../components/SearchComponent";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";
import CardButtonNavComponent from "../../../components/CardButtonNavComponent";
import { useRoute } from "@react-navigation/native";

export default function SearchDokter() {
  const route = useRoute();
  const { nameClinic, clinicId } = route.params;
  console.log("nameClinic", nameClinic);
  console.log("nameClinic", clinicId);
  const [dataPoli, setDataPoli] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/caridokter/${clinicId}`)
      .then((response) => {
        const data = response.data.data_dokter; // Assuming data_dokter contains the array
        setDataPoli(data);
        setFilteredData(data); // initialize with full data
      })
      .catch((err) => console.log("Error Search Dokter :", err));
  }, []);

  const handleSearch = (filteredData) => {
    setFilteredData(filteredData);
  };

  //   console.log("Filtered Data:", filteredData); // Debugging log

  return (
    <>
      <SearchComponent
        platform="android"
        data={dataPoli}
        onSearch={handleSearch}
        placeholder="Cari dengan Nama Dokter / Hari"
        filterAttribute="nm_dokter"
      />
      <View style={GlobalStyles.Content}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 18, color: "#3E3E3E" }}>
            Daftar Dokter pada {nameClinic}
          </Text>
          <FlatList
            data={filteredData}
            keyExtractor={(item, index) => `${item.kd_dokter}-${index}`}
            renderItem={({ item }) => (
              <CardButtonNavComponent
                title={item.nm_dokter}
                description={item.nm_poli}
                onPress={() => console.log(`Navigating to ${item.nm_dokter}`)}
                warna={"blue"}
              />
            )}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

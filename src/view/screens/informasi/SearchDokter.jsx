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
import ModalComponent from "../../../components/ModalComponent";
import BottomSheet from "../../../components/BottomSheet";

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
  const [bottomSeed, setBootomSeed] = useState(false);

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

  // const detailDokter = () => {
  //   return (
  //     <View>
  //       <Text>Detail Dokter</Text>
  //     </View>
  //   );
  // };

  // if (loading) {
  //   return (
  //     <View style={GlobalStyles.Content}>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View style={GlobalStyles.Content}>
  //       <Text>Error fetching data: {error.message}</Text>
  //     </View>
  //   );
  // }

  const handleSearch = (filteredData) => {
    setFilteredData(filteredData);
  };

  console.log("Filtered Data:", filteredData); // Debugging log

  return (
    <View style={GlobalStyles.utama}>
      <View style={{ flex: 1 }}>
        <HeaderComponent
          title="Daftar Dokter"
          icon={"arrow-back"}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{ flex: 1 }}>
        <SearchComponent
          platform="android"
          data={dataPoli}
          onSearch={handleSearch}
          placeholder="Cari dengan Nama Dokter / Hari"
          filterAttribute="nm_dokter"
        />
      </View>

      {/* {filteredData ? (
        <Text style={GlobalStyles.h3}>Daftar Dokter pada {nameClinic}</Text>
      ) : (
        <Text style={GlobalStyles.h3}>
          Daftar Dokter pada {nameClinic} Sepertinya doter sedang cuti
        </Text>
      )} */}
      <View style={{ flex: 10, alignItems: "center" }}>
        <FlatList
          data={filteredData}
          keyExtractor={(item, index) => `${item.kd_dokter}-${index}`}
          renderItem={({ item }) => (
            <CardButtonNavComponent
              title={item.nm_dokter}
              // description={item.nm_poli}
              imgSource={{ uri: `${item.image}` }}
              modal={true}
              onPress={() => navigation.navigate("Detail Dokter")}
              warna={"#73B9FC"}
            />
          )}
        />
      </View>

      {/* {bottomSeed ? (
        <BottomSheet
          setStatus={setBootomSeed}
          ukuranModal={{ width: "100%", height: "80%" }}
          judul="Pastikan Data Benar"
          subjudul={""}
          buttonKiri="Batal"
          buttonKanan="Booking"
          listKerabat={true}
          pressKiri={() => setBootomSeed(false)}
          pressKanan={() => setBootomSeed(false)}
        />
      ) : null} */}
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

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
import { LinearGradient } from "expo-linear-gradient";

export default function DetailDoctorScreen() {
  const WARNA = { primary: "#0A78E2", white: "#fff" };
  const route = useRoute();
  const [dataPoli, setDataPoli] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [bottomSeed, setBootomSeed] = useState(false);

  //   useEffect(() => {
  //     axios
  //       .get(`${BASE_URL}/caridokter/${clinicId}/`)
  //       .then((response) => {
  //         const data = response.data.data_dokter; // Assuming data_dokter contains the array
  //         setDataPoli(data);
  //         setFilteredData(data); // initialize with full data
  //         setLoading(false);
  //       })
  //       .catch((err) => console.log("Error Search Dokter :", err));
  //   }, []);

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

  //   console.log("Filtered Data:", filteredData); // Debugging log

  return (
    <View style={GlobalStyles.utama}>
      <View style={{ flex: 1 }}>
        <HeaderComponent
          title="Detail Dokter"
          icon={"arrow-back"}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{ flex: 4 }}>
        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
        ></LinearGradient>
      </View>

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
            modal={true}
            onPress={() => setBootomSeed(true)}
            warna={"#73B9FC"}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

// SearchDokter.js
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  RefreshControl,
} from "react-native";
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
  const [refreshing, setRefreshing] = useState(false);
  const [tanpaDokter, setTanpaDokter] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
  };

  useEffect(() => {
    axios
      .get(`${BASE_URL}/caridokter/${clinicId}/`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key": "pd3@mino347",
        },
      })
      .then((response) => {
        const data = response.data.data_dokter; // Assuming data_dokter contains the array
        if (data == []) {
          setTanpaDokter(true);
        }
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
      <View>
        <HeaderComponent
          title="Daftar Dokter"
          icon={"arrow-back"}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View>
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
        <View
          style={{
            alignItems: "center",
          }}>
          <FlatList
            data={filteredData}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            keyExtractor={(item, index) => `${item.kd_dokter}-${index}`}
            renderItem={({ item }) => (
              <CardButtonNavComponent
                title={item.nm_dokter}
                description={item.nm_poli}
                imgSource={{ uri: `${item.image}` }}
                modal={true}
                onPress={() =>
                  navigation.navigate("Detail Dokter", { doctorData: item })
                }
                warna={"#0A78E2"}
              />
            )}
            ListEmptyComponent={
              <Text
                style={{
                  marginTop: 20,
                  marginHorizontal: 20,
                  fontSize: 15,
                  fontWeight: "bold",
                }}>
                Tidak ada dokter untuk poli ini, silahkan langsung datang ke RS
                Amino Gundohutomo
              </Text>
            }
          />
        </View>
      </View>

      <View style={{ height: 100 }}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

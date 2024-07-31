import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import GlobalStyles from "../../../style/GlobalStyles";
import SearchComponent from "../../../components/SearchComponent";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";
import CardButtonNavComponent from "../../../components/CardButtonNavComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderComponent from "../../../components/HeaderComponent";

export default function SearchDokter() {
  const WARNA = { primary: "#0A78E2", white: "#fff" };
  const route = useRoute();
  const { nameClinic, clinicId } = route.params;
  const [dataPoli, setDataPoli] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [tanpaDokter, setTanpaDokter] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    fetchDokter();
  };

  const fetchDokter = () => {
    try {
      axios
        .get(`${BASE_URL}/caridokter/${clinicId}/`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
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
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDokter();
  }, []);

  const handleSearch = (filteredData) => {
    setFilteredData(filteredData);
  };

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
          placeholder="Cari Dokter"
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={filteredData}
            showsVerticalScrollIndicator={false}
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
                warna={WARNA.primary}
              />
            )}
            ListEmptyComponent={
              <Text style={[GlobalStyles.h4, styles.dokterKosong]}>
                Tidak ada dokter untuk poli ini, silahkan langsung datang ke RS
                Amino Gundohutomo
              </Text>
            }
            contentContainerStyle={{
              paddingBottom: 200,
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dokterKosong: {
    marginTop: 20,
    marginHorizontal: 20,
    textAlign: "center",
  },
});

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import axios from "axios";
import GlobalStyles from "../../../style/GlobalStyles";
import TableListComponent from "../../../components/TableListComponent";
import { BASE_URL } from "../../../contex/Config";
import MenuItemComponent from "../../../components/MenuItemComponent";
import CardButtonNavComponent from "../../../components/CardButtonNavComponent";
import CardListComponent from "../../../components/CardListComponent";
import SearchComponent from "../../../components/SearchComponent";

const InformasiTempatTidur = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/infoTT`)
      .then((response) => {
        const data = response.data.data_bed;
        setFilteredData(data);
        setLoading(false);
        setData(data);
      })
      .catch((err) => console.log("Error Dari Informasi TT :" + err));
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
  console.log("Dari Informasi Tempat Tidur", filteredData);

  const handleSearch = (filteredData) => {
    setFilteredData(filteredData);
  };
  return (
    <View style={GlobalStyles.Content}>
      <SearchComponent
        platform="android"
        data={data}
        onSearch={handleSearch}
        placeholder={"Cari dengan Nama Dokter / Hari"}
        filterAttribute={"kelas"}
      />
      <Text style={GlobalStyles.subTitle}>
        Kelas dan Kamar yang tersedia pada RS
      </Text>
      <FlatList
        style={{ width: "100%" }}
        data={filteredData}
        keyExtractor={(item, index) => `${item.kd_dokter}-${index}`}
        renderItem={({ item }) => <CardListComponent data={item} />}
      />
    </View>
  );
};

export default InformasiTempatTidur;

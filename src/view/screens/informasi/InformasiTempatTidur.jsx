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
import HeaderComponent from "../../../components/HeaderComponent";
import { useNavigation } from "@react-navigation/native";

const InformasiTempatTidur = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/infoTT`, {
        headers: {
          "Content-Type": "application/json",
          "x-api-key":
            "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
        },
      })
      .then((response) => {
        const data = response.data.data_bed;
        setFilteredData(data);
        setLoading(false);
        setData(data);
      })
      .catch((err) => {
        return;
      });
  }, []);

  const handleSearch = (filteredData) => {
    setFilteredData(filteredData);
  };
  return (
    <View style={GlobalStyles.Content}>
      <HeaderComponent
        title="Informasi Tempat Tidur"
        icon={"arrow-back"}
        onPress={() => navigation.goBack()}
      />
      <SearchComponent
        platform="android"
        data={data}
        onSearch={handleSearch}
        placeholder={"Cari Tempat Tidur"}
        filterAttribute={"kelas"}
      />
      {/* <Text style={GlobalStyles.subTitle}>
        Kelas dan Kamar yang tersedia pada RS
      </Text> */}
      {loading ? (
        <View style={GlobalStyles.Content}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          style={{ width: "100%" }}
          data={filteredData}
          keyExtractor={(item, index) => `${item.kd_dokter}-${index}`}
          renderItem={({ item }) => <CardListComponent data={item} />}
        />
      )}
      {error ? (
        <View style={GlobalStyles.Content}>
          <Text>Error fetching data: {error.message}</Text>
        </View>
      ) : null}
    </View>
  );
};

export default InformasiTempatTidur;

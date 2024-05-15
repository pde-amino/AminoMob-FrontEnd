import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import axios from "axios";
import GlobalStyles from "../../../style/GlobalStyles";
import TableListComponent from "../../../components/TableListComponent";
import { BASE_URL } from "../../../contex/Config";

const InformasiTempatTidur = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/infoTT`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
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
  // console.log("Dari Informasi Tempat Tidur", data);
  return (
    <View style={GlobalStyles.Content}>
      <ScrollView>
        <TableListComponent data={data} />
      </ScrollView>
    </View>
  );
};

export default InformasiTempatTidur;

import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View, Text } from "react-native";
import { BASE_URL } from "../../../contex/Config";
import MenuItemComponent from "../../../components/MenuItemComponent";
import EventSource from "react-native-event-source";
import GlobalStyles from "../../../style/GlobalStyles";
import SearchComponent from "../../../components/SearchComponent";

const InformasiDokter = () => {
  const [dataPoli, setDataPoli] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [filteredData, setFilteredData] = useState();

  const handleSearch = (filteredData) => {
    setFilteredData(filteredData);
  };

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/poli`);
        setDataPoli(response.data.daftar_poli || []); // Tambahkan fallback jika daftar_poli undefined
        setLoading(false);
      } catch (err) {
        console.log("Error Informasi Dokter", err);
        setError(err);
        setLoading(false);
      }
    };

    fetchData();

    // Setup EventSource for real-time updates
    const eventSource = new EventSource(`${BASE_URL}/sse-endpoint`);

    eventSource.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setDataPoli(newData.daftar_poli || []); // Tambahkan fallback jika daftar_poli undefined
    };

    eventSource.onerror = (error) => {
      console.error("EventSource error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
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

  return (
    <View style={GlobalStyles.Content}>
      <SearchComponent
        data={dataPoli}
        onSearch={handleSearch}
        placeholder={"Cari Nama Poli"}
        filterAttribute={"nm_poli"}
      />
      <Text style={GlobalStyles.subTitle}>Daftar Poliklinik</Text>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        horizontal={false}
        numColumns={3}
        data={filteredData}
        renderItem={({ item }) => (
          <MenuItemComponent
            onPress={() =>
              navigation.navigate("Search Poli", {
                clinicId: item.kd_poli,
                nameClinic: item.nm_poli,
              })
            }
            data={{ clinicId: item.kd_poli, nameClinic: item.nm_poli }}
            icon={"apps"}
            title={item.nm_poli}
            // colorIcon={item.color}
          />
        )}
        keyExtractor={(item) => item.kd_poli.toString()}
      />
    </View>
  );
};

export default InformasiDokter;

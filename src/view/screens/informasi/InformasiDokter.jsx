import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  View,
  Text,
  RefreshControl,
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
} from "react-native";
import { BASE_URL } from "../../../contex/Config";
import MenuItemComponent from "../../../components/MenuItemComponent";
import EventSource from "react-native-event-source";
import GlobalStyles from "../../../style/GlobalStyles";
import SearchComponent from "../../../components/SearchComponent";
import HeaderComponent from "../../../components/HeaderComponent";

const InformasiDokter = () => {
  const [dataPoli, setDataPoli] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const [filteredData, setFilteredData] = useState();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
  };

  const handleSearch = (filteredData) => {
    setFilteredData(filteredData);
  };

  useEffect(() => {
    // Fetch initial data
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/poli`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        });
        setDataPoli(response.data.daftar_poli || []); // Tambahkan fallback jika daftar_poli undefined
        setFilteredData(response.data.daftar_poli);
        setLoading(false);
      } catch (err) {
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
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  if (error) {
    return (
      <SafeAreaView
        style={[
          GlobalStyles.Content,
          {
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          },
        ]}
      >
        <ScrollView
          contentContainerStyle={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Text>Mohon ulangi beberapa saat lagi..</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={[
        GlobalStyles.utama,
        // { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}
    >
      <HeaderComponent
        title={"Daftar Poliklinik"}
        icon={"arrow-back"}
        onPress={() => navigation.goBack()}
      />
      <View style={{ width: "100%", marginBottom: 20 }}>
        <SearchComponent
          data={dataPoli}
          onSearch={handleSearch}
          placeholder={"Cari Poli"}
          filterAttribute={"nm_poli"}
        />
      </View>
      {loading ? (
        <View style={GlobalStyles.Content}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            alignItems: "center",
          }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
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
      )}
    </SafeAreaView>
  );
};

export default InformasiDokter;

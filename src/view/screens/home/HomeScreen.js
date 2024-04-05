import React, { useState, useEffect } from "react";
import { View, FlatList, Text, RefreshControl } from "react-native";
import { useNavigation } from "@react-navigation/native";
import MenuItemComponent from "../../../components/MenuItemComponent";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [poliklinikData, setPoliklinikData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setRefreshing(true);
    fetch("http://192.168.5.5:8080/poliklinik")
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "success") {
          setPoliklinikData(data.data_poli);
        } else {
          console.error("Error fetching data:", data.message);
        }
        setRefreshing(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setRefreshing(false);
      });
  };

  const handleClinicSelection = (screen, params) => {
    navigation.navigate(screen, params);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      }}>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
        }
        horizontal={false}
        numColumns={3}
        data={poliklinikData}
        renderItem={({ item }) => (
          <MenuItemComponent
            onPress={() =>
              handleClinicSelection("Poli Information", {
                clinicId: item.kd_poli,
                nameClinic: item.nm_poli,
              })
            }
            icon="leaf-outline" // Ganti dengan ikon yang sesuai
            title={item.nm_poli}
            colorIcon="green" // Ganti dengan warna yang sesuai
          />
        )}
        keyExtractor={(item) => item.kd_poli}
        ListEmptyComponent={<Text>Loading...</Text>}
      />
    </View>
  );
};

export default HomeScreen;

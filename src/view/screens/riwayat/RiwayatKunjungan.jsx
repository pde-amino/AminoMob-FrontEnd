import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  StyleSheet,
  Text,
  Button,
} from "react-native";
import React, { useContext, useEffect } from "react";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";
import { AuthContex } from "../../../contex/AuthProvider";
import { BASE_URL } from "../../../contex/Config";
import axios from "axios";
import { useState } from "react";
import { Icon, List } from "react-native-paper";
import CardColapse from "../../../components/CardColapse";
import GenerateQRCode from "../../../contex/GenerateQRCode";
import { useNavigation } from "@react-navigation/native";

const WARNA = { primary: "#0A78E2", white: "#fff" };

export default function RiwayatKunjungan() {
  const { auth } = useContext(AuthContex);
  const [refreshing, setRefreshing] = useState(false);
  const [dataRiwayat, setDataRiwayat] = useState();
  const navigation = useNavigation();

  // const handlePress = () => setExpanded(!expanded);

  console.log("auth dari riwayat:", auth.user.id);

  const Item = ({ item, onPress }) => (
    <CardColapse title={item.kode_booking} subtitle={item.nm_pasien}>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Text>Poliklinik : </Text>
          <Text>Tanggal periksa : </Text>
          <Text>Dokter : </Text>
        </View>
        <View>
          <Text> {item.nm_poli}</Text>
          <Text> {item.tanggal_periksa}</Text>
          <Text> {item.nm_dokter}</Text>
        </View>
      </View>
      <Button title="Lihat QR Code" onPress={onPress}>
        Lihat QR Code
      </Button>
    </CardColapse>

    // <View>
    //   <TouchableOpacity onPress={onPress} style={styles.item}>
    //     <View>
    //       <Text style={GlobalStyles.textBiasa}>{item.kode_booking}</Text>
    //       <Text style={GlobalStyles.textBiasa}>{item.nm_poli}</Text>
    //       <Text style={GlobalStyles.textBiasa}>{item.nm_dokter}</Text>
    //       <Text style={[GlobalStyles.h4, { fontWeight: "bold" }]}>
    //         {item.nm_pasien}
    //       </Text>
    //     </View>
    //     <Icon source="chevron-down" size={24} />
    //   </TouchableOpacity>
    // </View>
  );

  const ambilDataRiwayat = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/riwayatbooking/${auth.user.id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.user.token}`, // Pastikan token disertakan dalam header jika diperlukan
          },
        }
      );
      console.log("Response data riwayat:", response.data); // Logging response data
      const data = response.data.data_user;
      setDataRiwayat(data);
    } catch (error) {
      console.error("Error fetching riwayat data:", error.message);
      console.error("Error response data:", error.response?.data);
    } finally {
      // setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    ambilDataRiwayat();
  }, []);

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          //   // setPilihPasien(item);
          console.log("Item pilihpasien:", item);
          //   // setBtmMenu(true);
          // navigation.navigate("Booking Screen", item);
        }}
      />
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    // fetchData();
  };

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <HeaderComponent title={"Riwayat Periksa"} />
      <View style={GlobalStyles.Content}>
        <FlatList
          style={{ width: "100%" }}
          data={dataRiwayat}
          renderItem={renderItem}
          // keyExtractor={(item) => item.no_ktp.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    borderWidth: 1,
    borderColor: "#eaeaea",
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    marginVertical: 4,
    marginHorizontal: 20,
    backgroundColor: "white",
    elevation: 2,
    // gap: 8,
    // marginVertical: 8,
    // marginHorizontal: 20,
  },
  title: {
    fontSize: 16,
  },
  containerTengah: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
  },
});

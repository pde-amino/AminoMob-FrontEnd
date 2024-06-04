import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import GlobalStyles from "../../../style/GlobalStyles";
import HeaderComponent from "../../../components/HeaderComponent";
import ButtonPrimary from "../../../components/ButtonPrimary";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "../../../components/BottomSheet";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";
import { AuthContex } from "../../../contex/AuthProvider";

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "First Item",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Second Item",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Third Item",
  },
];

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.item}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

export default function ListPasien() {
  const navigation = useNavigation();
  // const [selectedId, setSelectedId] = useState();
  const [btmTambah, setBtmtambah] = useState(false);
  const [adaKerabat, setAdaKerabat] = useState(false);

  const { auth } = useContext(AuthContex);

  const cekKerabat = () => {
    axios.get(`${BASE_URL}/daftarKerabat/${auth.ids}`).then((res) => {
      setAdaKerabat(true);
    });
  };

  cekKerabat();

  const renderItem = ({ item }) => {
    return (
      <Item
        item={item}
        onPress={() => {
          console.log("Item clicked:", item);
          navigation.navigate("Pilih Poli", { id: item.id });
        }}
        // backgroundColor={backgroundColor}
        // textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <HeaderComponent title={"Daftar Pasien"} />
      <View style={GlobalStyles.Content}>
        <View style={GlobalStyles.btnFullContainer}>
          <ButtonPrimary title={"Tambahkan Data"} onPress={setBtmtambah} />
        </View>
        {adaKerabat ? (
          <FlatList
            style={{ width: "100%" }}
            data={cekKerabat}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            // extraData={selectedId}
          />
        ) : (
          <Text>Belum ada data pasien sebelumnya, silakan tambah data</Text>
        )}
      </View>
      {btmTambah && (
        <BottomSheet
          setStatus={setBtmtambah}
          ukuranModal={{ width: "100%", height: "20%" }}
          judul="Sudah Pernah Periksa Sebelumnya?"
          subjudul="Jika sudah punya No. Rekam Medis pilih Sudah"
          buttonKiri="Belum"
          buttonKanan="Sudah"
          pressKiri={() => navigation.navigate("Tambah Pasien Baru")}
          // pressKanan={() => navigation.navigate("Tambah Pasien Baru")}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    width: "100%",
    backgroundColor: "white",
    padding: 20,
    borderBottomWidth: 0.5,
    // marginVertical: 8,
    // marginHorizontal: 20,
  },
  title: {
    fontSize: 16,
  },
});

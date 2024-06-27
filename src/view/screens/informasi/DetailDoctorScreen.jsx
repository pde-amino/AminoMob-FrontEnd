import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import GlobalStyles from "../../../style/GlobalStyles";
import { useNavigation, useRoute } from "@react-navigation/native";
import HeaderComponent from "../../../components/HeaderComponent";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { AirbnbRating } from "@rneui/themed";
import { Avatar } from "react-native-paper";

const WARNA = { primary: "#0A78E2", white: "#fff", red: "#F01F1F" };
export default function DetailDoctorScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const data = route.params.doctorData;
  console.log("datadok:", data.jadwal_praktek); // Debugging log

  return (
    <View style={GlobalStyles.utama}>
      <View style={{ height: hp(8) }}>
        <HeaderComponent
          title="Detail Dokter"
          icon={"arrow-back"}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={styles.containerImage}>
        <Avatar.Image
          source={{ uri: data.image }}
          size={100}
          style={{
            backgroundColor: WARNA.primary,
          }}
        />
      </View>

      <View style={{ height: hp(10) }}>
        <View
          style={{
            alignItems: "center",
            paddingVertical: 20,
          }}
        >
          <Text
            style={[GlobalStyles.h2, { textAlign: "center", maxWidth: "80%" }]}
          >
            {data.nm_dokter}
          </Text>
          {/* <AirbnbRating showRating={false} size={18} /> */}
        </View>
      </View>
      <View style={{ marginTop: 10, gap: 8 }}>
        <Text style={[GlobalStyles.h3, { paddingHorizontal: 20 }]}>
          Jadwal Praktek
        </Text>
        <Text style={[GlobalStyles.h4, { paddingHorizontal: 20 }]}>Pagi</Text>

        <FlatList
          style={{ width: "100%", paddingLeft: 15 }}
          data={data.jadwal_praktek.filter((item) => item.waktu === "Pagi")}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={[GlobalStyles.textBiasa, { paddingHorizontal: 20 }]}>
              Tidak ada jadwal
            </Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.contentView}>
              <Text style={GlobalStyles.h3}>{item.hari}</Text>
              <Text style={GlobalStyles.textBiasa}>Kuota: {item.kuota}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />

        <Text style={[GlobalStyles.h4, { paddingHorizontal: 20 }]}>Sore</Text>

        <FlatList
          style={{ width: "100%", paddingLeft: 15 }}
          data={data.jadwal_praktek.filter((item) => item.waktu === "Sore")}
          horizontal
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={[GlobalStyles.textBiasa, { paddingHorizontal: 20 }]}>
              Tidak ada jadwal
            </Text>
          )}
          renderItem={({ item }) => (
            <View style={styles.contentView}>
              <Text style={GlobalStyles.h3}>{item.hari}</Text>
              <Text style={GlobalStyles.textBiasa}>Kuota: {item.kuota}</Text>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  contentView: {
    borderRadius: 20,
    padding: 12,
    marginHorizontal: 4, // Adjust horizontal margin for items
    borderWidth: 0.5,
    width: wp(25),
  },
  containerImage: {
    height: hp(15),
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
    // backgroundColor: WARNA.primary,
  },
});

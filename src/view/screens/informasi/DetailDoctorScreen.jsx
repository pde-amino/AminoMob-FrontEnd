import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Platform,
  SafeAreaView,
  StatusBar,
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
// import { StatusBar } from "expo-status-bar";

const getSpecializationText = (doctorName) => {
  if (doctorName.includes("Sp.KJ")) {
    return "Spesialis Kesehatan Jiwa";
  } else if (doctorName.includes("Sp.A")) {
    return "Spesialis Anak";
  } else if (doctorName.includes("Sp.OG")) {
    return "Spesialis Kandungan dan Ginekologi";
  } else if (doctorName.includes("Sp.PD")) {
    return "Spesialis Penyakit Dalam";
  } else if (doctorName.includes("Sp.N")) {
    return "Spesialis Saraf";
  } else if (doctorName.includes("Sp.PK")) {
    return "Spesialis Patologi Klinis";
  } else if (doctorName.includes("Sp.Rad")) {
    return "Spesialis Radiologi";
  } else if (doctorName.includes("Sp.BM")) {
    return "Spesialis Bedah Mulut";
  } else if (doctorName.includes("Sp.P")) {
    return "Spesialis Paru";
  } else if (doctorName.includes("drg")) {
    return "Dokter Gigi";
  } else if (doctorName.includes("Sp.An")) {
    return "Spesialis Anastesi";
  } else if (doctorName.includes("Sp.K.F.R")) {
    return "Spesialis Kesehatan Fisik & Rehabilitasi";
  } else if (doctorName.includes("Sp.B")) {
    return "Spesialis Bedah";
  } else if (doctorName.includes("Sp.JP")) {
    return "Spesialis Jantung & Pembuluh Darah";
  } else if (doctorName.includes("S. Psi" && "Psi")) {
    return "Psikolog";
  } else if (doctorName.includes("Sp.DVE")) {
    return "Spesialis Dermatologi dan Venereologi";
  } else if (doctorName.includes("Sp.A")) {
    return "Spesialis Anak";
  } else {
    return "Umum";
  }
};

const WARNA = { primary: "#0A78E2", white: "#fff", red: "#F01F1F" };

export default function DetailDoctorScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const data = route.params.doctorData;

  return (
    <SafeAreaView style={[GlobalStyles.utama]}>
      <HeaderComponent
        title="Detail Dokter"
        icon={"arrow-back"}
        onPress={() => navigation.goBack()}
      />

      <View style={styles.containerImage}>
        <Avatar.Image
          source={{ uri: data.image }}
          size={180}
          style={{
            backgroundColor: "#559EE3",
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
          <Text
            style={[
              GlobalStyles.h3,
              { textAlign: "center", maxWidth: "80%", fontWeight: "normal" },
            ]}
          >
            {getSpecializationText(data.nm_dokter)}
          </Text>
          {/* <AirbnbRating
            showRating={false}
            size={20}
            defaultRating={5}
            isDisabled={true}
          /> */}
        </View>
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={[GlobalStyles.h3, { paddingHorizontal: 20 }]}>
          Jadwal Praktek
        </Text>

        <Text
          style={[GlobalStyles.h4, { paddingHorizontal: 20, marginBottom: 8 }]}
        >
          Pagi 07:00-13.00
        </Text>
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

        <Text
          style={[GlobalStyles.h4, { paddingHorizontal: 20, marginBottom: 8 }]}
        >
          Sore 14:00-18:00
        </Text>
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
    </SafeAreaView>
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
    height: hp(25),
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
    // backgroundColor: WARNA.primary,
  },
});

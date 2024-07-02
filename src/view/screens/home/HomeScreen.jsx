import React, { useState, useContext } from "react";
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Linking,
  Alert,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import MenuItemComponent from "../../../components/MenuItemComponent";
import SliderComponent from "../../../components/SliderComponent ";
import MySlider from "../../../components/MySlider";
import GlobalStyles from "../../../style/GlobalStyles";
import BottomSheet from "../../../components/BottomSheet";
import ConfirmModal from "../../../components/ConfirmModal";
import { AuthContex } from "../../../contex/AuthProvider";
import Svg, { Path } from "react-native-svg";
import BannerComponent from "../../../components/BannerComponent";
import { SpeedDial } from "@rneui/themed";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";
import CardButtonComponent from "../../../components/CardButtonComponent";
import WebView from "react-native-webview";
import CardComponentArticel from "../../../components/CardComponentArticel";

const WARNA = { primary: "#0A78E2", white: "#fff" };

const HomeScreen = () => {
  const { logout, auth } = useContext(AuthContex);
  console.log("Ini dari HomeScreen :", auth);

  const alertMJKN = () => {
    Alert.alert(
      "Maaf",
      "Saat ini pendaftaran Layanan BPJS hanya bisa menggunakan aplikasi Mobile JKN",
      [{ text: "OK", onPress: () => checkAndOpenApp() }]
    );
  };

  const checkAndOpenApp = async () => {
    const packageName = "app.bpjs.mobile";
    const appLink = `intent://${packageName}#Intent;scheme=package;end`;
    const playStoreLink = `https://play.google.com/store/apps/details?id=${packageName}`;

    try {
      await Linking.openURL(appLink);
    } catch (error) {
      Linking.openURL(playStoreLink);
    }
  };

  const Menus = [
    {
      kd_poli: "1",
      source: require("../../../../assets/icon31.png"),
      title: "Layanan RS (Non BPJS)",
      desc: "Pendaftaran layanan kesehatan khusus untuk pasien Non BPJS",
      to: () => navigation.navigate("List Pasien"),
      warna: WARNA.primary,
    },
    {
      kd_poli: "2",
      source: require("../../../../assets/icon32.png"),
      title: "Layanan RS (BPJS)",
      desc: "Pendaftaran layanan kesehatan khusus untuk pasien BPJS",
      to: () => alertMJKN(),
      warna: WARNA.primary,
    },
    {
      kd_poli: "3",
      source: require("../../../../assets/icon33.png"),
      title: "Informasi Umum RS",
      desc: "Informasi terkini dan terlengkap seputar Amino Hospital",
      to: () => navigation.navigate("Informasi Umum"),
      warna: WARNA.primary,
    },
  ];

  const navigation = useNavigation();
  const darurat = () => {
    Linking.openURL("https://wa.me/6281225204301");
  };

  const WebViewCard = () => {
    return (
      <ScrollView horizontal={true} style={{ height: 50, width: wp(100) }}>
        <View style={{ height: 100, width: wp(20), margin: 5 }}>
          <WebView
            source={{ uri: "https://www.rajutankoding.com" }}
            style={{ flex: 1 }}
          />
        </View>
        <View style={{ height: 50, width: wp(20), margin: 5 }}>
          <WebView
            source={{
              uri: "https://www.yukberbudidaya.my.id/2024/01/pakan-ikan-koi-terbaik-memberi-nutrisi.html",
            }}
            style={{ flex: 1 }}
          />
        </View>
        {/* Tambahkan lebih banyak View dan WebView jika diperlukan */}
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <ScrollView>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View
            style={{
              backgroundColor: WARNA.primary,
              height: 150,
              width: "100%",
              position: "absolute",
            }}>
            <Svg height={hp(45)} width={wp(100)} viewBox="0 0 1440 320">
              <Path
                fill="#0a78e2"
                fill-opacity="1"
                d="M0,288L48,256C96,224,192,160,288,160C384,160,480,224,576,256C672,288,768,288,864,261.3C960,235,1056,181,1152,144C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></Path>
            </Svg>
          </View>
          <View style={{ marginVertical: 50 }}>
            <View style={GlobalStyles.headerHomeContainer}>
              <Image
                source={require("../../../../assets/logo-app.png")}
                resizeMode="contain"
                style={GlobalStyles.containerLogo}
              />
              <TouchableOpacity
                style={GlobalStyles.btnRedSmall}
                onPress={darurat}>
                <Text style={GlobalStyles.textButtonSmall}>IGD AMINO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{ flex: 2 }}>
          <MySlider />
        </View>

        <View style={{ flex: 4, paddingHorizontal: 20 }}>
          <Text style={GlobalStyles.h3}>Menu</Text>
          <FlatList
            data={Menus}
            renderItem={({ item }) => (
              <CardButtonComponent
                data={{ clinicId: item.kd_poli, nameClinic: item.desc }}
                icon={item.icon}
                title={item.title}
                description={item.desc}
                onPress={item.to}
                colorIcon={item.color}
                imgSource={item.source}
                warna={item.warna}
                alertData={item.alert}
              />
            )}
          />
        </View>
        <ScrollView horizontal={true} style={{ gap: 4 }}>
          <CardComponentArticel
            imgSource={{ uri: "https://via.placeholder.com/150" }}
            title="Sample Title"
            description="This is a sample description that will be truncated if it's too long. This is a sample description that will be truncated if it's too long."
          />
          <CardComponentArticel
            imgSource={{ uri: "https://via.placeholder.com/150" }}
            title="Another Title"
            description="Another sample description that will be truncated."
          />
          <CardComponentArticel
            imgSource={{ uri: "https://via.placeholder.com/150" }}
            title="Another Title"
            description="Another sample description that will be truncated."
          />
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   scrollView: {
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "center",
//   },
// });
export default HomeScreen;

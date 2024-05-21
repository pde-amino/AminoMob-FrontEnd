import React, { useState, useEffect, useContext } from "react";
import {
  View,
  FlatList,
  Text,
  RefreshControl,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  Image,
  Linking,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import MenuItemComponent from "../../../components/MenuItemComponent";
import LoadingContent from "../../../components/LoadingContent";
import CardButtonNavComponent from "../../../components/CardButtonNavComponent";
import SliderComponent from "../../../components/SliderComponent ";
import MySlider from "../../../components/MySlider";
import GlobalStyles from "../../../style/GlobalStyles";
import BottomSheet from "../../../components/BottomSheet";
import ConfirmModal from "../../../components/ConfirmModal";
import CardButtonComponent from "../../../components/CardButtonComponent";
import { AuthContex } from "../../../contex/AuthProvider";
import Svg, { Path } from "react-native-svg";
import BannerComponent from "../../../components/BannerComponent";
import { SpeedDial } from "@rneui/themed";

// const { lebar } = Dimensions.get("screen");
const WARNA = { primary: "#0A78E2", white: "#fff" };

const HomeScreen = () => {
  const { data } = useContext(AuthContex);
  console.log("Ini dari HomeScreen :", data);
  // const route = useRoute();
  // const { data } = route.params;
  // console.log("result", { route });
  // const { result } = route.params;
  const Menus = [
    {
      kd_poli: "1",
      source: require("../../../../assets/icon31.png"),
      title: "Layanan RS (Non BPJS)",
      desc: "Pendaftaran layanan kesehatan khusus untuk pasien Non BPJS",
      to: "LayananNonBPJS",
      warna: WARNA.primary,
      kondisi: false,
    },
    {
      kd_poli: "2",
      source: require("../../../../assets/icon32.png"),
      title: "Layanan RS (BPJS)",
      desc: "Pendaftaran layanan kesehatan khusus untuk pasien BPJS",
      to: "Informasi Rumah Sakit",
      warna: WARNA.primary,
    },
    {
      kd_poli: "3",
      source: require("../../../../assets/icon33.png"),
      title: "Informasi Umum RS",

      desc: "Informasi terkini dan terlengkap seputar Amino Hospital",
      to: "",
      // params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
      warna: WARNA.primary,
    },
  ];

  const navigation = useNavigation();
  const [poliklinikData, setPoliklinikData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const [open, setOpen] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const handleClinicSelection = (screen, params) => {
    navigation.navigate(screen, params);
  };

  const darurat = () => {
    Linking.openURL("https://wa.me/6281213536824");
  };

  // const handleKondisi = (item) => {
  //   if (item.kondisi) {
  //     // Lakukan sesuatu jika kondisi terpenuhi
  //     setModalVisible(true);
  //     console.log("Lebar layar:", Dimensions.get("window").width);
  //   } else {
  //     // Navigasi ke screen lain berdasarkan nilai 'to' dari item
  //     navigation.navigate(item.to);
  //   }
  // };

  const [kondisi, setKondisi] = React.useState(false);

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <StatusBar backgroundColor={WARNA.primary} />
      <View style={{ flex: 1, alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#0a78e2",
            height: 150,
            position: "absolute",
          }}
        >
          <Svg
            height={380}
            width={Dimensions.get("screen").width}
            viewBox="0 0 1440 320"
          >
            <Path
              fill="#0a78e2"
              fill-opacity="1"
              d="M0,288L48,256C96,224,192,160,288,160C384,160,480,224,576,256C672,288,768,288,864,261.3C960,235,1056,181,1152,144C1248,107,1344,85,1392,74.7L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></Path>
          </Svg>
        </View>
        <View style={{ marginVertical: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 25,
            }}
          >
            <Image
              source={require("../../../../assets/logo-app.png")}
              resizeMode="contain"
              style={{
                height: 40,
                width: 80,
              }}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#DF1448",
                paddingHorizontal: 12,
                paddingVertical: 8,
                borderRadius: 20,
              }}
              onPress={darurat}
            >
              <Text
                style={{
                  color: WARNA.white,
                  fontSize: 13,
                  fontWeight: "bold",
                }}
              >
                Panggilan Darurat
              </Text>
            </TouchableOpacity>
          </View>
          <MySlider />
          <View>
            <Text
              style={{ fontWeight: "bold", fontSize: 18, color: "#3E3E3E" }}
            >
              Menu
            </Text>
            <FlatList
              data={Menus}
              renderItem={({ item }) => (
                <CardButtonNavComponent
                  data={{ clinicId: item.kd_poli, nameClinic: item.desc }}
                  icon={item.icon}
                  title={item.title}
                  description={item.desc}
                  onPress={item.to}
                  colorIcon={item.color}
                  imgSource={item.source}
                  warna={item.warna}
                />
              )}
            />
          </View>
        </View>
      </View>
      {/* 
      <SpeedDial
        isOpen={open}
        icon={{ name: "edit", color: "#fff" }}
        openIcon={{ name: "close", color: "#fff" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <SpeedDial.Action
          icon={{ name: "add", color: "#fff" }}
          title="Add"
          onPress={() => console.log("Add Something")}
        />
        <SpeedDial.Action
          icon={{ name: "delete", color: "#fff" }}
          title="Delete"
          onPress={() => console.log("Delete Something")}
        />
      </SpeedDial> */}
    </SafeAreaView>
  );
};

export default HomeScreen;

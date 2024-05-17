import React, { useEffect, useState } from "react";
import { View, FlatList, SafeAreaView } from "react-native";

import CardButtonNavComponent from "../../../components/CardButtonNavComponent";
import GlobalStyles from "../../../style/GlobalStyles";
import CardButtonComponent from "../../../components/CardButtonComponent";
import BottomSheet from "../../../components/BottomSheet";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../../../components/HeaderComponent";
import { SpeedDial } from "@rneui/themed";

const WARNA = { primary: "#0A78E2", white: "#fff" };

export default function LayananNonBPJS() {
  const navigation = useNavigation();
  const [jnsMenu, setJnsMenu] = useState(null);
  const [btmPoli, setBtmPoli] = useState(false);
  const [btmPenunjang, setBtmPenunjang] = useState(false);
  const [btmTele, setBtmTele] = useState(false);
  const [btmTerang, setBtmTerang] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setJnsMenu(null);
    });

    return unsubscribe;
  }, [navigation]);

  const diriSendiri = () => {
    if (jnsMenu === "poli") {
      console.log(jnsMenu);
      navigation.navigate("Pilih Poli", { jnsMenu });
    } else if (jnsMenu === "penunjang") {
      console.log(jnsMenu);
      navigation.navigate("Pilih Poli", { jnsMenu });
    } else if (jnsMenu === "tele") {
      navigation.navigate("");
    } else if (jnsMenu === "terang") {
      navigation.navigate("");
    }
    setBtmPoli(false);
    setBtmPenunjang(false);
    setBtmTele(false);
    setBtmTerang(false);
  };
  const orangLain = () => {
    if (jnsMenu === "poli") {
      console.log(jnsMenu);
      navigation.navigate("Pendaftaran Poli", { jnsMenu });
    } else if (jnsMenu === "penunjang") {
      console.log(jnsMenu);
      navigation.navigate("Pendaftaran Poli", { jnsMenu });
    } else if (jnsMenu === "tele") {
      navigation.navigate("");
    } else if (jnsMenu === "terang") {
      navigation.navigate("");
    }
    setBtmPoli(false);
    setBtmPenunjang(false);
    setBtmTele(false);
    setBtmTerang(false);
  };

  const Menus = [
    {
      kd_poli: "1",
      title: "Poliklinik",
      desc: "Pendaftaran online poliklinik rawat jalan",
      to: () => {
        setJnsMenu("poli");
        setBtmPoli(true);
      },
      // warna: "#E79903",
      warna: "#DC9203",
      img: require("../../../../assets/icon41.png"),
    },
    {
      kd_poli: "2",
      title: "Pemeriksaan Penunjang",
      desc: "Pendaftaran Laborat dan Radiologi",
      to: () => {
        setJnsMenu("penunjang");
        setBtmPenunjang(true);
      },
      // warna: "#A9BD2C",
      warna: "#8FA11E",
      img: require("../../../../assets/icon42.png"),
    },
    {
      kd_poli: "3",
      title: "Telekonseling",
      desc: "Konsultasi online dengan Psikiater atau Psikolog pilihan Anda",
      to: () => {
        setJnsMenu("tele");
        setBtmTele(true);
      },
      // warna: "#09A0CF",
      warna: "#0293C0",
      img: require("../../../../assets/icon43.png"),
    },
    {
      kd_poli: "4",
      title: "Terang Bulan",
      desc: "Pelayanan Fisioterapi dan Terapi Wicara yang dilakukan dirumah pasien",
      to: () => {
        setJnsMenu("terang");
        setBtmTerang(true);
      },
      // warna: "#A557F3",
      warna: "#9335F0",
      img: require("../../../../assets/icon44.png"),
    },
  ];
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent
        title={"Layanan Non BPJS"}
        icon={"arrow-back"}
        onPress={() => navigation.goBack()}
      />
      <View style={{ alignItems: "center" }}>
        <FlatList
          data={Menus}
          renderItem={({ item }) => (
            <CardButtonComponent
              data={{ clinicId: item.kd_poli, nameClinic: item.desc }}
              title={item.title}
              description={item.desc}
              onPress={item.to}
              warna={item.warna}
              imgSource={item.img}
            />
          )}
          keyExtractor={(item) => item.kd_poli}
        />
      </View>

      {btmPoli && (
        <BottomSheet
          setStatus={setBtmPoli}
          ukuranModal={{ width: "100%", height: "25%" }}
          judul="Untuk siapa Anda mendaftar Poli?"
          subjudul='Pilih "Diri Sendiri" jika Anda ingin mendaftar untuk Diri Anda sendiri. Pilih "Orang Lain" jika Anda ingin mendaftarkan Kerabat atau Orang Lain'
          buttonKiri="Orang Lain"
          buttonKanan="Diri Sendiri"
          pressKiri={orangLain}
          pressKanan={diriSendiri}
        />
      )}
      {btmPenunjang && (
        <BottomSheet
          setStatus={setBtmPenunjang}
          ukuranModal={{ width: "100%", height: "25%" }}
          judul="Untuk siapa Anda mendaftar Pemeriksaan Penunjang?"
          subjudul='Pilih "Diri Sendiri" jika Anda ingin mendaftar untuk Diri Anda sendiri. Pilih "Orang Lain" jika Anda ingin mendaftarkan Kerabat atau Orang Lain'
          buttonKiri="Orang Lain"
          buttonKanan="Diri Sendiri"
          pressKiri={orangLain}
          pressKanan={diriSendiri}
        />
      )}
      {btmTele && (
        <BottomSheet
          setStatus={setBtmTele}
          ukuranModal={{ width: "100%", height: "25%" }}
          judul="Untuk siapa Anda mendaftar Telekonseling?"
          subjudul='Pilih "Diri Sendiri" jika Anda ingin mendaftar untuk Diri Anda sendiri. Pilih "Orang Lain" jika Anda ingin mendaftarkan Kerabat atau Orang Lain'
          buttonKiri="Orang Lain"
          buttonKanan="Diri Sendiri"
          pressKiri={orangLain}
          pressKanan={diriSendiri}
        />
      )}
      {btmTerang && (
        <BottomSheet
          setStatus={setBtmTerang}
          ukuranModal={{ width: "100%", height: "25%" }}
          judul="Untuk siapa Anda mendaftar Terang Bulan?"
          subjudul='Pilih "Diri Sendiri" jika Anda ingin mendaftar untuk Diri Anda sendiri. Pilih "Orang Lain" jika Anda ingin mendaftarkan Kerabat atau Orang Lain'
          buttonKiri="Orang Lain"
          buttonKanan="Diri Sendiri"
          pressKiri={orangLain}
          pressKanan={diriSendiri}
        />
      )}
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
}

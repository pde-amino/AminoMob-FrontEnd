import React, { useContext, useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Platform,
  Text,
} from "react-native";
import { Divider } from "react-native-paper";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import ButtonPrimary from "../../../components/ButtonPrimary";
import GlobalStyles from "../../../style/GlobalStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import HeaderComponent from "../../../components/HeaderComponent";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";
import { AuthContex } from "../../../contex/AuthProvider";
import { Alert } from "react-native";
import BottomSheet from "../../../components/BottomSheet";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const WARNA = {
  primary: "#0A78E2",
  white: "#fff",
  red: "#F01F1F",
  secondary: "#5DA3E7",
};

const hubungan = [
  { label: "Kerabat", value: "KERABAT" },
  { label: "Ayah", value: "AYAH" },
  { label: "Ibu", value: "IBU" },
  { label: "Istri", value: "ISTRI" },
  { label: "Suami", value: "SUAMI" },
  { label: "Saudara", value: "SAUDARA" },
  { label: "Anak", value: "ANAK" },
  { label: "Diri Dendiri", value: "DIRI SENDIRI" },
  { label: "Lain - Lain", value: "LAIN-LAIN" },
];

export const TambahPasienLama = () => {
  const route = useRoute(); // Gunakan useRoute untuk mengambil parameter

  const [value, setValue] = useState(null);
  const [bs, setBs] = useState(true);
  const [isFocus1, setIsFocus1] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [noRm, setNoRm] = useState("");
  const { auth } = useContext(AuthContex);
  const [dataGet, setDataGet] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [hubunganPasien, setHubungan] = useState(
    "Hubungan Dengan Pemilik Akun"
  );

  const navigation = useNavigation();

  const toggleShowDate = () => {
    setShowPicker(!showPicker);
  };

  const berubah = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleShowDate();
        setDateOfBirth(currentDate.toISOString().split("T")[0]);
      }
    } else {
      toggleShowDate();
    }
  };

  const searchPass = async () => {
    try {
      await axios
        .get(`${BASE_URL}/cariPas/${auth.user.id}/${noRm}/${dateOfBirth}`, {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        })
        .then((response) => {
          if (response.data.status == true) {
            setDataGet(response.data.user);
            setBs(true);

            // navigation.navigate("TambahPasienLamaDetail", {
            //   idPasien: response.data[0].id,
            // });
          }
        })
        .catch((error) => {
          Alert.alert(
            "Peringatan",
            "Pastikan data yang anda input adalah data pasien yang pernah periksa di RS"
          );
          // console.error("Error fetching data: ", error);
        });

      // console.log("No Rekam Medis: ", noRm);
      // console.log("Tanggal Lahir: ", dateOfBirth);
      // console.log("No Handphone: ", value);
    } catch (error) {
      console.error("Error in try-catch: ", error);
    }
  };

  const addKerabat = async () => {
    await axios
      .post(
        `${BASE_URL}/tambahKerabat/${auth.user.id}`,
        {
          no_rkm_medis: dataGet.no_rkm_medis,
          status_user: hubunganPasien,
          id_pasien: dataGet.id_pasien,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      )
      .then((response) => {
        Alert.alert("Berhasil", "Data berhasil disimpan");
        navigation.navigate("List Pasien");
      })
      .catch((error) => {
        Alert.alert("Gagal", "Data gagal disimpansss");
      });
  };

  const confirmData = (
    <View style={{ gap: 8 }}>
      <View>
        <Text>Nama</Text>
        <Text style={GlobalStyles.h4}>{dataGet.nm_pasien}</Text>
      </View>
      <View>
        <Text>Nomor Telepon</Text>
        <Text style={GlobalStyles.h4}>{dataGet.no_tlp}</Text>
      </View>
      <View>
        <Text>Alamat</Text>
        <Text style={GlobalStyles.h4}>{dataGet.alamat}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <View style={styles.containerHeader}>
        <HeaderComponent
          title={"Daftarkan Pasien Lama"}
          icon={"arrow-back"}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.containerMid}>
        <View style={{ gap: 8 }}>
          <Text style={[GlobalStyles.h4, { maxWidth: "85%" }]}>
            Untuk pengecekan data pasien, mohon masukkan data dengan benar
          </Text>

          <TextInputIconComponent
            label={"No Rekam Medis*"}
            placeholder={"Masukkan No RM yang sudah terdaftar"}
            type={"username"}
            value={noRm}
            onChangeText={setNoRm}
          />

          <View>
            {showPicker && (
              <DateTimePicker
                mode="date"
                onChange={berubah}
                value={date}
                minimumDate={new Date(1935, 12, 31)}
                maximumDate={new Date()}
              />
            )}

            {!showPicker && (
              <Pressable onPress={toggleShowDate}>
                <TextInput
                  style={styles.tglPilihan}
                  editable={false}
                  placeholder={"Tanggal Lahir*"}
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                />
              </Pressable>
            )}
          </View>
          <View style={styles.containerDrop}>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus1 && {
                  borderColor: "green",
                  backgroundColor: WARNA.white,
                },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              search={false}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={hubungan}
              // search
              maxHeight={300}
              labelField="label"
              // valueField="value"
              placeholder={hubunganPasien}
              searchPlaceholder="Search..."
              value={hubunganPasien}
              onFocus={() => setIsFocus1(true)}
              onBlur={() => setIsFocus1(false)}
              onChange={(item) => {
                setHubungan(item.value);
                console.log(hubunganPasien);
                setIsFocus1(false);
              }}
            />
          </View>
        </View>
      </View>

      <View style={[GlobalStyles.btnFullContainer, styles.containerBot]}>
        <ButtonPrimary
          title="Cari"
          onPress={searchPass}
          disabled={dateOfBirth ? false : true}
        />
      </View>
      {bs ? (
        <BottomSheet
          setStatus={setBs}
          ukuranModal={{ width: "100%", height: "40%" }}
          judul="Pastikan Data Benar"
          subjudul={confirmData}
          buttonKiri="Ubah Data"
          buttonKanan="Simpan"
          listKerabat={true}
          pressKiri={() => setBs(false)}
          pressKanan={addKerabat}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerHeader: {
    height: hp(10),
  },
  containerMid: {
    height: hp(80),
    alignItems: "center",
  },
  containerBot: {
    height: hp(10),
    margin: 20,
  },
  tglPilihan: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: WARNA.primary,
    width: "100%",
    backgroundColor: "white",
    color: "black",
    padding: 14,
  },
  inputan: {
    marginBottom: 16,
    marginTop: 24,
  },
  containerDrop: {
    backgroundColor: "white",
  },
  dropdown: {
    height: 50,
    width: "100%",
    borderColor: WARNA.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
  },

  placeholderStyle: {
    fontSize: hp(1.6),
  },
  selectedTextStyle: {
    fontSize: hp(1.6),
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: hp(1.6),
  },
});

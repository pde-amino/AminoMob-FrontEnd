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
import { Checkbox, Divider } from "react-native-paper";
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

const WARNA = {
  primary: "#0A78E2",
  white: "#fff",
  red: "#F01F1F",
  secondary: "#5DA3E7",
};

const data = [
  { label: "Laki-laki", value: "1" },
  { label: "Perempuan", value: "2" },
];

const hubungan = [
  { label: "Diri Sendiri", value: "Diri Sendiri" },
  { label: "Suami", value: "Suami" },
  { label: "Istri", value: "Istri" },
  { label: "Ayah", value: "Ayah" },
  { label: "Ibu", value: "Ibu" },
  { label: "Anak", value: "Anak" },
  { label: "Saudara", value: "Saudara" },
];

export const TambahPasienLama = () => {
  const route = useRoute(); // Gunakan useRoute untuk mengambil parameter

  const [checked, setChecked] = React.useState(false);
  const [value, setValue] = useState(null);
  const [bs, setBs] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [noRm, setNoRm] = useState("");
  const { auth } = useContext(AuthContex);
  const [dataGet, setDataGet] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

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
            console.log("data api :", response.data.user.nm_pasien);
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
          status_user: "Kerabat",
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
        // navigation.navigate("Pilih Poli");
      })
      .catch((error) => {
        console.log(dataGet.nm_pasien);
        Alert.alert("Gagal", "Data gagal disimpan");
      });
  };

  const confirmData = (
    <View>
      <View style={{ marginVertical: 10, marginHorizontal: 5 }}>
        <Text>Nama</Text>
        <Text style={GlobalStyles.h3}>{dataGet.nm_pasien}</Text>
      </View>
      <View style={{ marginVertical: 10, marginHorizontal: 5 }}>
        <Text>Nomor Telepon</Text>
        <Text style={GlobalStyles.h3}>{dataGet.no_tlp}</Text>
      </View>
      <View style={{ marginVertical: 10, marginHorizontal: 5 }}>
        <Text>Alamat</Text>
        <Text style={GlobalStyles.h3}>{dataGet.alamat}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent
        title={"Daftarkan Pasien Lama"}
        icon={"arrow-back"}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={GlobalStyles.Content}>
          <View style={{ gap: 8 }}>
            <Text style={GlobalStyles.h4}>Teks dengan tanda * wajib diisi</Text>

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

            <Divider />

            <TextInputIconComponent
              label={"No Handphone"}
              placeholder={"Masukkan Nomor HP yang bisa dihubungi"}
              type={"username"}
              value={value}
              onChangeText={setValue}
            />
          </View>
        </View>

        <Checkbox.Item
          style={GlobalStyles.cekBox}
          color={WARNA.primary}
          label="Pastikan data sudah benar"
          labelStyle={{ fontSize: 13 }}
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />

        <View style={[GlobalStyles.btnFullContainer, { marginLeft: 20 }]}>
          <ButtonPrimary
            title="Simpan"
            onPress={searchPass}
            disabled={!checked}
          />
        </View>
      </ScrollView>
      {bs ? (
        <BottomSheet
          setStatus={setBs}
          ukuranModal={{ width: "100%", height: "65%" }}
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
  input: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
  },
  tglPilihan: {
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: WARNA.primary,
    width: 370,
    backgroundColor: "white",
    color: "black",
    padding: 14,
    fontSize: 14,
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
    width: 370,
    borderColor: WARNA.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

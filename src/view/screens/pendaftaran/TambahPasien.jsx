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
  Alert,
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
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import * as Network from "expo-network";

const WARNA = {
  primary: "#0A78E2",
  white: "#fff",
  red: "#F01F1F",
  secondary: "#5DA3E7",
};

const data = [{}];

const kelamin = [
  { label: "Laki-laki", value: "L" },
  { label: "Perempuan", value: "P" },
];

const hubungan = [
  { label: "Diri Sendiri", value: "DIRI SENDIRI" },
  { label: "Suami", value: "SUAMI" },
  { label: "Istri", value: "ISTRI" },
  { label: "Ayah", value: "AYAH" },
  { label: "Ibu", value: "IBU" },
  { label: "Anak", value: "ANAK" },
  { label: "Saudara", value: "SAUDARA" },
];
const agama = [
  { label: "Islam", value: "ISLAM" },
  { label: "Kristen", value: "KRISTEN" },
  { label: "Katolik", value: "KATOLIK" },
  { label: "Hindu", value: "HINDU" },
  { label: "Buddha", value: "BUDDHA" },
  { label: "Khonghucu", value: "KHONGHUCU" },
];
const goldar = [
  { label: "A", value: "A" },
  { label: "O", value: "O" },
  { label: "B", value: "B" },
  { label: "AB", value: "AB" },
  { label: "-", value: "-" },
];
const pendidikan = [
  { label: "TIDAK SEKOLAH", value: "TS" },
  { label: "TK", value: "TK" },
  { label: "SD", value: "SD" },
  { label: "SMP", value: "SMP" },
  { label: "SMA", value: "SMA" },
  { label: "SLB", value: "SLB" },
  { label: "SLTA/SEDERAJAT", value: "SLTA/SEDERAJAT" },
  { label: "D1", value: "D1" },
  { label: "D2", value: "D2" },
  { label: "D3", value: "D3" },
  { label: "D4", value: "D4" },
  { label: "S1", value: "S1" },
  { label: "S2", value: "S2" },
  { label: "S3", value: "S3" },
];
const sttsNikah = [
  { label: "MENIKAH", value: "MENIKAH" },
  { label: "BELUM MENIKAH", value: "BELUM MENIKAH" },
  { label: "JANDA", value: "JANDA" },
  { label: "DUDHA", value: "DUDHA" },
];

export const TambahPasien = () => {
  const route = useRoute(); // Gunakan useRoute untuk mengambil parameter
  const { auth } = useContext(AuthContex);

  //value yang akan diambil post
  const [hubunganPasien, setHubungan] = useState("");
  const [nmLengkap, setnmLengkap] = useState("");
  const [noHP, setnoHP] = useState("");
  const [noKTP, setnoKTP] = useState();
  const [statusNikah, setStatusNikah] = useState("");
  const [kelaminPasien, setKelamin] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [alamat, setAlamat] = useState("");
  const [agamaPasien, setAgama] = useState("");
  const [goldarPasien, setGoldar] = useState("");
  const [pndPasien, setPendidikan] = useState("");

  // const [prov, setProv] = useState([]);
  // const [pilihProv, setPilihProv] = useState();
  // const [provFocus, setProvFocus] = useState(false);
  // const [kab, setKab] = useState([]);
  // const [pilihKab, setPilihKab] = useState();
  // const [kabFocus, setKabFocus] = useState(false);

  const [checked, setChecked] = useState(false);

  //focus utk dropdown
  const [focusNama, setfocusNama] = useState(false);
  const [focusNikah, setfocusNikah] = useState(false);
  const [focusKelamin, setFocusKelamin] = useState(false);
  const [focusAgama, setFocuAgama] = useState(false);
  const [focusGoldar, setFocuGoldar] = useState(false);
  const [focusPendidikan, setFocusPendidikan] = useState(false);

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
        setDateOfBirth(currentDate.toDateString());
      }
    } else {
      toggleShowDate();
    }
  };
  // const closeDate = () => {
  //   setShowDate(false);
  // };

  // const handleNama = (input) => {
  //   setnmLengkap(input);
  // };
  // const handleHP = (input) => {
  //   setnoHP(input);
  // };
  // const handleKTP = (input) => {
  //   setnoKTP(input);
  // };
  // const handleAlamat = (input) => {
  //   setAlamat(input);
  // };
  // const handleTL = (input) => {
  //   setTempatLahir(input);
  // };

  // const simpanData = () => {
  //   postPasienBaru();
  // };

  const formattedDate = date ? date.toISOString().split("T")[0] : "";

  const getCurrentDate = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Bulan dalam format dua digit
    const day = String(now.getDate()).padStart(2, "0"); // Hari dalam format dua digit

    return `${year}-${month}-${day}`;
  };

  const tglHariIni = getCurrentDate();

  const postPasienBaru = async () => {
    const ip = await Network.getIpAddressAsync();
    try {
      const response = await axios.post(
        `${BASE_URL}/insertPas/${auth.id}`,
        {
          no_rkm_medis: "",
          nm_pasien: nmLengkap,
          no_ktp: noKTP,
          jk: kelaminPasien,
          tmp_lahir: tempatLahir,
          tgl_lahir: formattedDate,
          nm_ibu: "",
          alamat: alamat,
          gol_darah: goldarPasien,
          pekerjaan: "",
          stts_nikah: statusNikah,
          agama: agamaPasien,
          no_tlp: noHP,
          umur: "",
          pnd: pndPasien,
          keluarga: hubunganPasien,
          namakeluarga: "",
          kd_pj: "",
          no_peserta: "",
          kd_kel: "",
          kd_kec: "",
          kd_kab: "",
          pekerjaanpj: "",
          alamatpj: "",
          kelurahanpj: "",
          kecamatanpj: "",
          kabupatenpj: "",
          perusahaan_pasien: "",
          suku_bangsa: "",
          bahasa_pasien: "",
          cacat_fisik: "",
          email: "",
          nip: "",
          kd_prop: "",
          propinsipj: "",
          ip: ip,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      Alert.alert("Berhasil", "Pasien berhasil ditambahkan");
    } catch (error) {
      // Tangani kesalahan yang terjadi selama permintaan POST
      if (error.response) {
        if (error.response.status === 400) {
          Alert.alert(
            "Data Sudah Ada",
            "Pasien sudah terdaftar di database Amino Hospital, silakan menggunakan menu Pendaftaran Pasien Lama",
            [
              {
                text: "OK",
                onPress: () => {
                  navigation.replace("Tambah Pasien Lama");
                },
              },
            ]
          );
        } else {
          Alert.alert(
            "Error response",
            `Error: ${error.response.data || "Something went wrong"}`
          );
        }
      } else if (error.request) {
        Alert.alert(
          "Error Request",
          "Server sedang dalam perbaikan. Mohon coba lagi nanti."
        );
      } else {
        Alert.alert("Error", `Error: ${error.message}`);
      }
    } finally {
      // navigation.navigate("Home Screen");
    }
  };

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <View style={{ height: hp(8) }}>
        <HeaderComponent
          title={"Pendaftaran Pasien Baru"}
          icon={"arrow-back"}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{ flex: 1, marginTop: 8 }}>
        <ScrollView>
          <View style={{ gap: 8, alignItems: "center" }}>
            <View>
              <Text style={GlobalStyles.h4}>Isi semua data</Text>
            </View>

            <View style={styles.containerDrop}>
              <Dropdown
                style={[
                  styles.dropdown,
                  focusNama && {
                    borderColor: "green",
                    backgroundColor: WARNA.white,
                  },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                search={false}
                inputSearchStyle={styles.inputSearchStyle}
                // iconStyle={styles.iconStyle}
                data={hubungan}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  !focusNama
                    ? "Hubungan Pasien dengan Pemilik Akun"
                    : "Pilih Hubungan"
                }
                searchPlaceholder="Search..."
                value={hubunganPasien}
                onFocus={() => setfocusNama(true)}
                onBlur={() => setfocusNama(false)}
                onChange={(item) => {
                  setHubungan(item.value);
                  setfocusNama(false);
                }}
              />
            </View>

            <Divider />

            <TextInputIconComponent
              label={"Nama Lengkap"}
              placeholder={"Masukan Nama Lengkap Anda"}
              type={"nama"}
              value={nmLengkap}
              onChangeText={setnmLengkap}
            />

            <TextInputIconComponent
              label={"No Handphone"}
              placeholder={"Masukkan Nomor HP yang bisa dihubungi"}
              type={"nomor"}
              value={noHP}
              onChangeText={setnoHP}
              inputMode="numeric"
            />

            <TextInputIconComponent
              label={"Nomor KTP"}
              placeholder={"Masukan NIK Anda"}
              type={"ktp"}
              value={noKTP}
              onChangeText={setnoKTP}
              inputMode="numeric"
              eqwe
            />

            <View style={styles.containerDrop}>
              <Dropdown
                style={[
                  styles.dropdown,
                  focusNikah && {
                    borderColor: WARNA.primary,
                    backgroundColor: WARNA.white,
                  },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                search={false}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={sttsNikah}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  !focusNikah ? "Status Nikah" : "Pilih Status Pernikahan"
                }
                searchPlaceholder="Search..."
                value={statusNikah}
                onFocus={() => setfocusNikah(true)}
                onBlur={() => setfocusNikah(false)}
                onChange={(item) => {
                  setStatusNikah(item.value);
                  setfocusNikah(false);
                }}
              />
            </View>

            <View style={styles.containerDrop}>
              <Dropdown
                style={[
                  styles.dropdown,
                  focusKelamin && {
                    borderColor: WARNA.primary,
                    backgroundColor: WARNA.white,
                  },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                search={false}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={kelamin}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  !focusKelamin ? "Jenis Kelamin" : "Pilih Jenis Kelamin Anda"
                }
                searchPlaceholder="Search..."
                value={kelaminPasien}
                onFocus={() => setFocusKelamin(true)}
                onBlur={() => setFocusKelamin(false)}
                onChange={(item) => {
                  setKelamin(item.value);
                  setFocusKelamin(false);
                }}
              />
            </View>

            <Divider />

            <TextInputIconComponent
              label={"Tempat Lahir"}
              placeholder={"Masukkan Kota tempat lahir Anda"}
              type={"username"}
              value={tempatLahir}
              onChangeText={setTempatLahir}
            />

            <View>
              {showPicker && (
                <DateTimePicker
                  // display={"spinner"}
                  mode="date"
                  onChange={berubah}
                  value={date}
                  minimumDate={new Date(1935, 12, 31)}
                  maximumDate={new Date()}
                />
              )}

              {!showPicker && (
                <Pressable
                  style={{ width: wp(100), alignItems: "center" }}
                  onPress={toggleShowDate}
                >
                  <TextInput
                    style={styles.tglPilihan}
                    editable={false}
                    placeholder={"Tanggal Lahir"}
                    value={
                      dateOfBirth
                        ? new Date(date).toISOString().split("T")[0]
                        : ""
                    }
                    onChangeText={setDateOfBirth}
                  />
                </Pressable>
              )}
            </View>

            <Divider />

            <TextInputIconComponent
              label={"Alamat"}
              placeholder={"Masukan Alamat sesuai KTP"}
              value={alamat}
              type={"username"}
              onChangeText={setAlamat}
            />

            {/* ini prov */}
            {/* <View style={styles.containerDrop}>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && {
                  borderColor: WARNA.primary,
                  backgroundColor: WARNA.white,
                },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              search={true}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={prov}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!provFocus ? "Provinsi*" : "Pilih Provinsi"}
              searchPlaceholder="Search..."
              value={pilihProv}
              onFocus={() => setProvFocus(true)}
              onBlur={() => setProvFocus(false)}
              onChange={(item) => {
                setPilihProv(item.value);
                setProvFocus(false);
              }}
            />
          </View> */}

            {/* ini kab */}
            {/* <View style={styles.containerDrop}>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && {
                  borderColor: WARNA.primary,
                  backgroundColor: WARNA.white,
                },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              search={true}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={kab}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!kabFocus ? "Kab/Kota*" : "Pilih Kota Anda"}
              searchPlaceholder="Search..."
              value={pilihKab}
              onFocus={() => setKabFocus(true)}
              onBlur={() => setKabFocus(false)}
              onChange={(item) => {
                setPilihKab(item.value);
                setKabFocus(false);
              }}
            />
          </View> */}

            {/* ini kecamatan */}
            {/* <View style={styles.containerDrop}>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && {
                  borderColor: WARNA.primary,
                  backgroundColor: WARNA.white,
                },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              search={false}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Kecamatan*" : "Pilih Kecamatan Anda"}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View> */}

            {/* ini kelurahan */}
            {/* <View style={styles.containerDrop}>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus && {
                  borderColor: WARNA.primary,
                  backgroundColor: WARNA.white,
                },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              search={false}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Kelurahan*" : "Pilih Kelurahan Anda"}
              searchPlaceholder="Search..."
              value={value}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setValue(item.value);
                setIsFocus(false);
              }}
            />
          </View> */}

            <Divider />

            <View style={styles.containerDrop}>
              <Dropdown
                style={[
                  styles.dropdown,
                  focusAgama && {
                    borderColor: WARNA.primary,
                    backgroundColor: WARNA.white,
                  },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                search={false}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={agama}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!focusAgama ? "Agama" : "Pilih Agama Anda"}
                searchPlaceholder="Search..."
                value={agamaPasien}
                onFocus={() => setFocuAgama(true)}
                onBlur={() => setFocuAgama(false)}
                onChange={(item) => {
                  setAgama(item.value);
                  setFocuAgama(false);
                }}
              />
            </View>

            <View style={styles.containerDrop}>
              <Dropdown
                style={[
                  styles.dropdown,
                  focusGoldar && {
                    borderColor: WARNA.primary,
                    backgroundColor: WARNA.white,
                  },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                search={false}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={goldar}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  !focusGoldar ? "Golongan Darah" : "Pilih Golongan Darah"
                }
                searchPlaceholder="Search..."
                value={goldarPasien}
                onFocus={() => setFocuGoldar(true)}
                onBlur={() => setFocuGoldar(false)}
                onChange={(item) => {
                  setGoldar(item.value);
                  setFocuGoldar(false);
                }}
              />
            </View>

            <View style={styles.containerDrop}>
              <Dropdown
                style={[
                  styles.dropdown,
                  focusPendidikan && {
                    borderColor: WARNA.primary,
                    backgroundColor: WARNA.white,
                  },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                search={false}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={pendidikan}
                // search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  !focusPendidikan
                    ? "Riwayat Pendidikan"
                    : "Pilih Pendidikan Terakhir"
                }
                searchPlaceholder="Search..."
                value={pndPasien}
                onFocus={() => setFocusPendidikan(true)}
                onBlur={() => setFocusPendidikan(false)}
                onChange={(item) => {
                  setPendidikan(item.value);
                  setFocusPendidikan(false);
                }}
              />
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <Checkbox.Item
              style={GlobalStyles.cekBox}
              color={WARNA.primary}
              label="Data yang saya masukkan sudah benar"
              labelStyle={GlobalStyles.textBiasa}
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />
            <View style={GlobalStyles.btnFullContainer}>
              <ButtonPrimary
                title="Simpan"
                onPress={postPasienBaru}
                disabled={
                  !checked || !hubunganPasien || !nmLengkap || !noKTP || !noHP
                }
              />
            </View>
          </View>
        </ScrollView>
      </View>
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
    width: "90%",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: WARNA.primary,
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
    width: "90%",
  },
  dropdown: {
    height: 50,
    borderColor: WARNA.primary,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
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

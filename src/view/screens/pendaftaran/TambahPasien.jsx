import React, { useEffect, useState } from "react";
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

const WARNA = {
  primary: "#0A78E2",
  white: "#fff",
  red: "#F01F1F",
  secondary: "#5DA3E7",
};

const data = [{}];

const kelamin = [
  { label: "Laki-laki", value: "1" },
  { label: "Perempuan", value: "2" },
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

export const TambahPasien = () => {
  const route = useRoute(); // Gunakan useRoute untuk mengambil parameter

  const [hubunganPasien, setHubungan] = useState("");
  const [kelaminPasien, setKelamin] = useState("");
  const [agamaPasien, setAgama] = useState("");

  const [prov, setProv] = useState([]);
  const [pilihProv, setPilihProv] = useState();
  const [provFocus, setProvFocus] = useState(false);
  const [kab, setKab] = useState([]);
  const [pilihKab, setPilihKab] = useState();
  const [kabFocus, setKabFocus] = useState(false);

  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [noKTP, setnoKTP] = useState("");
  const [nmLengkap, setnmLengkap] = useState("");
  const [alamat, setAlamat] = useState("");

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

  const simpanData = () => {
    // Tambahkan logika pendaftaran di sini
  };

  // axios.get(`${BASE_URL}/poli`).then((response) => {
  //     const poli = response.data.daftar_poli.map((item, index) => {
  //       return {
  //         key: index,
  //         label: item.nm_poli,
  //         value: item.kd_poli,
  //       };
  //     });
  //     setDatas(poli);

  const fetchData = async () => {
    try {
      const provinsi = await axios.get(`${BASE_URL}/prov`);
      const transProv = provinsi.data.data.map((prov) => ({
        label: prov.nm_prop, // Adjust according to your data structure
        value: prov.kd_prop, // Adjust according to your data structure
      }));
      const kabupaten = await axios.get(`${BASE_URL}/kab`);
      const transKab = kabupaten.data.data.map((kab) => ({
        label: kab.nm_kab, // Adjust according to your data structure
        value: kab.kd_kab, // Adjust according to your data structure
      }));
      // const jateng = await axios.get(`${BASE_URL}/prov`);
      // const transformedData = provinsi.data.data.map((prov) => ({
      //   label: prov.nm_prop, // Adjust according to your data structure
      //   value: prov.kd_prop, // Adjust according to your data structure
      // }));
      console.log("Response data:", kabupaten.data.data); // Logging response data
      // console.log("transformed data:", transformedData); // Logging response data
      setProv(transProv);
      setKab(transKab);
    } catch (error) {
      console.error("Error fetching prov:", error.message);
      console.error("Error response data:", error.provinsi?.data);
    } finally {
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <HeaderComponent
        title={"Daftarkan Pasien Baru"}
        icon={"arrow-back"}
        onPress={() => navigation.goBack()}
      />
      <ScrollView>
        <View style={[GlobalStyles.Content, { gap: 8 }]}>
          <View
            style={{
              width: "100%",
              marginLeft: 40,
              marginVertical: 8,
            }}
          >
            <Text style={GlobalStyles.h4}>
              Isian dengan tanda * wajib diisi
            </Text>
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
              placeholder={
                !isFocus1 ? "Hubungan dengan Pemilik Akun* " : "Pilih Hubungan"
              }
              searchPlaceholder="Search..."
              value={hubunganPasien}
              onFocus={() => setIsFocus1(true)}
              onBlur={() => setIsFocus1(false)}
              onChange={(item) => {
                setHubungan(item.value);
                setIsFocus1(false);
                console.log(item.value);
              }}
            />
          </View>

          <TextInputIconComponent
            label={"Nama Lengkap*"}
            placeholder={"Masukan Nama Lengkap Anda"}
            type={"nama"}
            value={nmLengkap}
          />

          <TextInputIconComponent
            label={"No Handphone*"}
            placeholder={"Masukkan Nomor HP yang bisa dihubungi"}
            type={"username"}
          />

          <TextInputIconComponent
            label={"Nomor KTP*"}
            placeholder={"Masukan NIK Anda"}
            type={"ktp"}
            value={noKTP}
          />

          <View style={styles.containerDrop}>
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
              data={kelamin}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={
                !isFocus ? "Jenis Kelamin*" : "Pilih Jenis Kelamin Anda"
              }
              searchPlaceholder="Search..."
              value={kelaminPasien}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setKelamin(item.value);
                setIsFocus(false);
              }}
            />
          </View>

          <Divider />

          <TextInputIconComponent
            label={"Tempat Lahir*"}
            placeholder={"Masukkan Kota tempat lahir Anda"}
            type={"username"}
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
              <Pressable onPress={toggleShowDate}>
                <TextInput
                  style={styles.tglPilihan}
                  editable={false}
                  // label={"Tgl Lahir"}
                  placeholder={"Tanggal Lahir*"}
                  value={
                    dateOfBirth
                      ? new Date(dateOfBirth).toISOString().split("T")[0]
                      : ""
                  }
                  onChangeText={setDateOfBirth}
                  // type={"username"}
                  // onPress={() => setShowDate(true)}
                />
              </Pressable>
            )}
          </View>

          <Divider />

          <TextInputIconComponent
            label={"Alamat"}
            placeholder={"Masukan Alamat Lengkap Anda"}
            // type={"usernamae"}
            value={alamat}
          />

          {/* ini prov */}
          <View style={styles.containerDrop}>
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
          </View>

          {/* ini kab */}
          <View style={styles.containerDrop}>
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
          </View>

          {/* ini kecamatan */}
          <View style={styles.containerDrop}>
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
          </View>

          {/* ini kelurahan */}
          <View style={styles.containerDrop}>
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
          </View>

          <Divider />

          <View style={styles.containerDrop}>
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
              data={agama}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus ? "Agama*" : "Pilih Agama Anda"}
              searchPlaceholder="Search..."
              value={agamaPasien}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setAgama(item.value);
                setIsFocus(false);
              }}
            />
          </View>

          <TextInputIconComponent
            label={"Nama Ibu*"}
            placeholder={"Masukkan nama Ibu"}
            type={"username"}
          />
        </View>

        <Checkbox.Item
          style={GlobalStyles.cekBox}
          color={WARNA.primary}
          label="Data yang saya masukkan sudah benar"
          labelStyle={{ fontSize: 12 }}
          status={checked ? "checked" : "unchecked"}
          onPress={() => {
            setChecked(!checked);
          }}
        />

        <View style={[GlobalStyles.btnFullContainer, { marginLeft: 20 }]}>
          <ButtonPrimary
            title="Simpan"
            onPress={simpanData}
            disabled={!checked || !!hubunganPasien}
          />
        </View>
      </ScrollView>
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
    // justifyContent: "center",
    width: 370,
    backgroundColor: "white",
    color: "black",
    padding: 14,
    fontSize: 14,
    // backgroundColor: "red",
  },
  inputan: {
    marginBottom: 16,
    marginTop: 24,
  },
  containerDrop: {
    backgroundColor: "white",
    // padding: 16,
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

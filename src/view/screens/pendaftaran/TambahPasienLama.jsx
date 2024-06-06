import React, { useState } from "react";
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

  const [hubu, setHubungan] = useState("");

  const [checked, setChecked] = React.useState(false);
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

  const handleRegister = () => {
    // Tambahkan logika pendaftaran di sini
  };

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
              label={"No Handphone"}
              placeholder={"Masukkan Nomor HP yang bisa dihubungi"}
              type={"username"}
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
            onPress={handleRegister}
            disabled={!checked || !!hubu}
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

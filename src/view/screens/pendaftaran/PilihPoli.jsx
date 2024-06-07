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
  Alert,
  Button,
} from "react-native";
import { Checkbox } from "react-native-paper";
import ButtonPrimary from "../../../components/ButtonPrimary";
import GlobalStyles from "../../../style/GlobalStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import HeaderComponent from "../../../components/HeaderComponent";
import { Dropdown } from "react-native-element-dropdown";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";
import { id } from "date-fns/locale";
import { format } from "date-fns";
import BottomSheet from "../../../components/BottomSheet";
import ConfirmModal from "../../../components/ConfirmModal";

const WARNA = {
  primary: "#0A78E2",
  white: "#fff",
  red: "#F01F1F",
  secondary: "#5DA3E7",
};

const data = [
  { label: "Pagi (07:00 - 12:00)", value: "pagi" },
  { label: "Sore (13:00 - 18:00)", value: "sore" },
];

export const PilihPoli = () => {
  const [datas, setDatas] = useState([]);
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(null);
  const [value1, setValue1] = useState(null);
  const [value2, setValue2] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [hariPoli, setHariPoli] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [buttomSheet, setButtomSheet] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  // const selectedItem = route.params;
  const [tglBooking, setTglBooking] = useState();
  const [tglPeriksa, setTglPeriksa] = useState();

  const [subMessMod, setSubMessMod] = useState("");
  const [messMod, setMessMod] = useState("Silahkan Pilih");
  const [jamPeriksa, setJamPeriksa] = useState("Pilih Jam Periksa");
  const [dokter, setDokter] = useState("Pilih Dokter");
  const [poli, setPoli] = useState();
  const [kdPoli, setKdPoli] = useState();
  const [jamPoli, setJamPoli] = useState();

  // Log selectedItem to console
  // useEffect(() => {
  //   console.log("selectedItem:", selectedItem);
  // }, [selectedItem]);

  const [filtDokter, setFiltDokter] = useState("");
  // console.log("data dari data kerabat:", route.params.kerabat);

  const extractDay = (dateString) => {
    return dateString.split(" ")[0];
  };

  useEffect(() => {
    axios.get(`${BASE_URL}/poli`).then((response) => {
      const poli = response.data.daftar_poli.map((item, index) => {
        return {
          key: index,
          label: item.nm_poli,
          value: item.kd_poli,
        };
      });
      setDatas(poli);
    });
  }, []);
  console.log("data pasodojasfkjhdsklfjklf: ", [kdPoli, hariPoli, value]);
  const jadwalDok = (param) => {
    console.log("Ini Params JadwalDok :", param);
  };

  const toggleShowDate = () => {
    setShowPicker(!showPicker);
  };

  const berubah = ({ type }, selectedDate) => {
    if (type === "set") {
      const currentDate = selectedDate;
      setDate(currentDate);

      if (Platform.OS === "android") {
        toggleShowDate();
        setHariPoli(format(currentDate, "eeee dd MMMM yyyy", { locale: id }));
      }
    } else {
      toggleShowDate();
    }
  };

  const handleRegister = () => {
    setButtomSheet(true);
    const formattedDate = date.toISOString().split("T")[0];
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    const tglBooking = new Date();
    console.log("Ajukan booking: ", {
      formattedDate: formattedDate,
      formattedTime: formattedTime,
      value: value,
      value1: value1,
      value2: value2,
      tglBooking: tglBooking.toISOString().split("T")[0],
    });
    // if (!kerabat) {
    //   console.log("Diri Sendiri");
    // } else {
    //   console.log("Kerabat");
    // }
  };

  const Menus = {
    message: "success",
    data_dokter: [
      {
        kd_dokter: "D0000026",
        nm_dokter: "dr. WITRIE SUTATY MR, Sp.KJ.",
        hari_kerja: "SENIN",
        jam_layanan: "Sore",
        kd_poli: "9108",
        nm_poli: "POLI JIWA PSIKIATRI GERIATRI",
        kuota: "30",
      },
      {
        kd_dokter: "D0000030",
        nm_dokter: "dr. RILLA FIFTINA HADI,Sp.KJ",
        hari_kerja: "SENIN",
        jam_layanan: "Sore",
        kd_poli: "9108",
        nm_poli: "POLI JIWA PSIKIATRI GERIATRI",
        kuota: "30",
      },
    ],
  };
  const dataInput = {
    id_user: 1,
    id_kerabat: 2,
    tanggal_booking: tglBooking,
    jam_booking: "13:25:00",
    no_rkm_medis: " ",
    tanggal_periksa: tglPeriksa,
    jam_periksa:
      // "07:00:00 - 14:00:00"
      value,
    kd_dokter: value1,
    kd_poli: value2,
    no_reg: " ",
    waktu_kunjungan: " ",
    // status_reg: "Belum",
    jns_kunjungan: "Poli",
    status_byr: "-",
    jns_pas: "Diri Sendiri",
  };
  console.log("ini pic tgl :", datas);

  const diriSendiri = {
    id_user: 1,
    id_kerabat: "",
    tanggal_booking: "2024-05-15",
    jam_booking: "13:25:00",
    no_rkm_medis: " ",
    tanggal_periksa: "2024-05-22",
    jam_periksa: "07:00:00 - 14:00:00",
    kd_dokter: "D0000020",
    kd_poli: "9108",
    no_reg: " ",
    waktu_kunjungan: " ",
    // "status_reg": "Belum",
    jns_kunjungan: "Poli",
    status_byr: "-",
    jns_pas: "Diri Sendiri",
  };
  const orangLain = {
    id_user: 1,
    id_kerabat: "",
    tanggal_booking: "2024-05-15",
    jam_booking: "13:25:00",
    no_rkm_medis: " ",
    tanggal_periksa: "2024-05-22",
    jam_periksa: "07:00:00 - 14:00:00",
    kd_dokter: "D0000020",
    kd_poli: "9108",
    no_reg: " ",
    waktu_kunjungan: " ",
    // "status_reg": "Belum",
    jns_kunjungan: "Poli",
    status_byr: "-",
    jns_pas: "Diri Sendiri",
  };

  // console.log(selectedItem.nm_pasien, selectedItem.no_rkm_medis);
  const [pilihan, setPilihan] = useState("");
  const pilihJamPeriksa = () => {
    setMessMod("Pilih Jam Periksa");
    setSubMessMod(`Jam Pagi (07:00:00 - 14:00:00)
Jam Sore (14:00:00 - 18:00:00)`);
    setModalList(false);

    setConfMod("Sore");
    setCancMod("Pagi");
    setVisMod(true);
  };

  const pilihDokter = () => {
    try {
      axios
        .get(`${BASE_URL}/jadwaldok/${kdPoli}/${extractDay(hariPoli)}/${value}`)
        .then((response) => {
          const dokters = response.data.data_dokter.map((item) => {
            return {
              key: item.key,
              label: item.nm_dokter,
              value: item.kd_dokter,
            };
          });
          setFiltDokter(dokters);
        });
    } catch (error) {
      Alert.alert(
        "aaaMaaf Poli yang anda pilih sepertinya libur pada Har yang anda pilih"
      );
    }
    setMessMod("Silahkan Pilih Dokter");
    setPilihan("dokter");
    setModalList(true);
    setVisMod(true);
    setConfMod("Sore");
    setCancMod("Pagi");
  };
  const [dataListPoli, setDataListPoli] = useState("");
  const poliTujuan = () => {
    setDataListPoli(datas);
    setMessMod("Silahkan Pilih Poliklinik");
    setPilihan("poli");
    setModalList(true);
    setVisMod(true);
    setConfMod("Sore");
    setCancMod("Pagi");
  };

  const minimumDate = new Date();
  minimumDate.setDate(minimumDate.getDate() + 1);

  const [visMod, setVisMod] = useState(false);
  const [confMod, setConfMod] = useState("Sore");
  const [cancMod, setCancMod] = useState("Tidak");

  const [modalList, setModalList] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navHandle = () => {
    navigation.navigate("Booking Screen");
  };
  const confirmData = (
    <View>
      <View style={{ marginVertical: 10, marginHorizontal: 5 }}>
        <Text>Nama</Text>
        <Text style={GlobalStyles.h3}>{route.params.nm_pasien}</Text>
      </View>
      <View style={{ marginVertical: 10, marginHorizontal: 5 }}>
        <Text>Tanggal Periksa</Text>
        <Text style={GlobalStyles.h3}>{hariPoli}</Text>
      </View>
      <View style={{ marginVertical: 10, marginHorizontal: 5 }}>
        <Text>Jam Periksa</Text>
        <Text style={GlobalStyles.h3}>{value}</Text>
      </View>
      <View style={{ marginVertical: 10, marginHorizontal: 5 }}>
        <Text>Poli Tujuan</Text>
        <Text style={GlobalStyles.h3}>{value2}</Text>
      </View>
      <View style={{ marginVertical: 10, marginHorizontal: 5 }}>
        <Text>Dokter Dituju</Text>
        <Text style={GlobalStyles.h3}>{dokter}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <ConfirmModal
        list={modalList}
        listData={pilihan == "poli" ? datas : filtDokter}
        visible={visMod}
        message={messMod}
        submessage={subMessMod}
        onData={(item) => {
          console.log("iniconsole", item);
          {
            if (pilihan == "poli") {
              setValue2(item.label);
              setKdPoli(item.value);
              jadwalDok(item.value);
            } else if (pilihan == "dokter") {
              setDokter(item.label);
            }
            // pilihan == "poli" ? setPoli(item) : setDokter(item);
          }
          setVisMod(false);
        }}
        onCancel={() => {
          setValue("Pagi");
          setVisMod(false);
        }}
        onConfirm={() => {
          setValue("Sore");
          setVisMod(false);
        }}
        confirmButtonText={confMod}
        cancelButtonText={cancMod}
      />
      <HeaderComponent
        title={"Pilih Poli"}
        icon={"arrow-back"}
        onPress={() => navigation.goBack()}
      />

      <View style={{ marginVertical: 10, marginHorizontal: 5 }}>
        <Text>Nama</Text>
        <Text style={GlobalStyles.h1}>{route.params.nm_pasien}</Text>
      </View>
      <View style={styles.list}>
        <Text>Tanggal Periksa</Text>
        <View style={styles.itemList}>
          <Text style={GlobalStyles.h4}>
            {hariPoli ? hariPoli : "Silahkan Pilih Tanggal"}
          </Text>
          <Button title={"Pilih"} onPress={berubah} />
        </View>
      </View>
      <View style={styles.list}>
        <Text>Jam Periksa</Text>
        <View style={styles.itemList}>
          <Text style={GlobalStyles.h4}>{value}</Text>
          <Button title={"Pilih"} onPress={pilihJamPeriksa} />
        </View>
      </View>
      <View style={styles.list}>
        <Text>Poli Tujuan</Text>
        <View style={styles.itemList}>
          <Text style={GlobalStyles.h4}>{value2}</Text>
          <Button title={"Pilih"} onPress={poliTujuan} />
        </View>
      </View>
      <View style={styles.list}>
        <Text>Dokter Tujuan</Text>
        <View style={styles.itemList}>
          <Text style={GlobalStyles.h4}>{dokter}</Text>

          <Button
            disabled={value2 ? false : true}
            title={"Pilih"}
            onPress={pilihDokter}
          />
        </View>
      </View>
      <View style={GlobalStyles.Content}>
        {showPicker && Platform.OS === "android" && (
          <DateTimePicker
            mode="date"
            onChange={berubah}
            value={date}
            minimumDate={minimumDate}
          />
        )}

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
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? "Pilih Jam Periksa " : ""}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
        </View>
        {datas ? (
          <View style={styles.containerDrop}>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus1 && {
                  borderColor: WARNA.primary,
                  backgroundColor: WARNA.white,
                },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              search={true}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={datas}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus1 ? "Pilih Poliklinik " : ""}
              searchPlaceholder="Search..."
              value={value2}
              onFocus={() => setIsFocus1(true)}
              onBlur={() => setIsFocus1(false)}
              onChange={(item) => {
                setValue2(item.value);
                setIsFocus1(false);
                jadwalDok(item.value); // Memanggil fungsi jadwalDok dengan parameter
              }}
            />
          </View>
        ) : null}
        {filtDokter ? (
          <View style={styles.containerDrop}>
            <Dropdown
              style={[
                styles.dropdown,
                isFocus2 && {
                  borderColor: WARNA.primary,
                  backgroundColor: WARNA.white,
                },
              ]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              search={false}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={filtDokter}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus2 ? "Pilih Dokter " : ""}
              value={value1}
              onFocus={() => setIsFocus2(true)}
              onBlur={() => setIsFocus2(false)}
              onChange={(item) => {
                setValue1(item.value);
                setIsFocus2(false);
              }}
            />
          </View>
        ) : null}
      </View>

      <Checkbox.Item
        style={{ flexDirection: "row-reverse", fontSize: 12 }}
        color={WARNA.primary}
        label="Pastikan data sudah benar"
        labelStyle={{ fontSize: 13 }}
        status={checked ? "checked" : "unchecked"}
        onPress={() => {
          setChecked(!checked);
        }}
      />

      <View style={GlobalStyles.btnContainer}>
        <ButtonPrimary
          title="Ajukan Booking"
          onPress={handleRegister}
          disabled={!checked || !value || !value1 || !value2}
        />
      </View>

      {buttomSheet ? (
        <BottomSheet
          setStatus={setButtomSheet}
          ukuranModal={{ width: "100%", height: "65%" }}
          judul="Pastikan Data Benar"
          subjudul={confirmData}
          buttonKiri="Orang Lain"
          buttonKanan="Diri Sendiri"
          listKerabat={true}
          pressKiri={() => setButtomSheet(false)}
          pressKanan={navHandle}
        />
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  judul: {
    fontSize: 24,
    fontWeight: "bold",
  },
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
  list: {
    margin: 5,
    paddingBottom: 4,
    // borderWidth: 1,
    borderBottomWidth: 2,
  },
  itemList: {
    alignItems: "center",
    alignContent: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

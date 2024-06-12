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
import { AuthContex } from "../../../contex/AuthProvider";

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
  const { auth } = useContext(AuthContex);
  const [datas, setDatas] = useState([]);
  const [value, setValue] = useState("Pilih Jam Periksa");
  const [value2, setValue2] = useState("Pilih Poliklinik");
  const [isFocus, setIsFocus] = useState(false);
  const [isFocus1, setIsFocus1] = useState(false);
  const [isFocus2, setIsFocus2] = useState(false);
  const [hariPoli, setHariPoli] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [buttomSheet, setButtomSheet] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const [subMessMod, setSubMessMod] = useState("");
  const [messMod, setMessMod] = useState("Silahkan Pilih");
  const [jamPeriksa, setJamPeriksa] = useState("Pilih Jam Periksa");
  const [dokter, setDokter] = useState("Pilih Dokter");
  const [kdDokter, setKdDokter] = useState("Pilih Dokter");
  const [poli, setPoli] = useState();
  const [kdPoli, setKdPoli] = useState();
  const [jamPoli, setJamPoli] = useState();
  const [filtDokter, setFiltDokter] = useState("");
  const [pilihan, setPilihan] = useState("");
  const [visMod, setVisMod] = useState(false);
  const [confMod, setConfMod] = useState("Sore");
  const [cancMod, setCancMod] = useState("Tidak");

  const [modalList, setModalList] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const extractDay = (dateString) => {
    return dateString.split(" ")[0];
  };

  const getPoli = () => {
    axios
      .get(`${BASE_URL}/jadwalpoli/${extractDay(hariPoli)}/${value}`)
      .then((response) => {
        if (response.data.status === false) {
          setDatas(null);
          Alert.alert(
            "Pemberitahuan",
            "Tidak ada Dokter Poli yang bertugas Pada Hari yang dipilih."
          );
        } else {
          const poli = response.data.data_poli.map((item, index) => {
            return {
              key: index,
              label: item.nm_poli,
              value: item.kd_poli,
            };
          });
          setDatas(poli);
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        Alert.alert("Error", "Terjadi kesalahan saat mengambil data.");
      });
  };

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
    // const formattedDate = date.toISOString().split("T")[0];
    // const hours = date.getHours().toString().padStart(2, "0");
    // const minutes = date.getMinutes().toString().padStart(2, "0");
    // const seconds = date.getSeconds().toString().padStart(2, "0");
    // const formattedTime = `${hours}:${minutes}:${seconds}`;
    // const tglBooking = new Date();
    // console.log("Ajukan booking: ", {
    //   formattedDate: formattedDate,
    //   formattedTime: formattedTime,
    //   value: value,
    //   value1: value1,
    //   value2: value2,
    //   tglBooking: tglBooking.toISOString().split("T")[0],
    // });
  };

  const tglPeriksa = new Date(date).toISOString().split("T")[0];
  const getCurrentDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // Month is zero-based
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  // Error
  const dataBooking = {
    tanggal_booking: getCurrentDateTime(),
    id_pasien: route.params.id_pasien,
    no_rkm_medis: route.params.no_rkm_medis,
    tanggal_periksa: tglPeriksa,
    jam_periksa:
      value == "Pagi" ? "07:00:00 - 14:00:00" : "14:00:00 - 18:00:00",
    kd_dokter: kdDokter,
    kd_poli: kdPoli,
    status_reg: "Belum",
    jns_kunjungan: "Poli",
    status_byr: "-",
    jns_pas: "Diri Sendiri",
  };
  // endError

  const postData = async () => {
    await axios
      .post(
        `${BASE_URL}/bookPeriksa/${auth.user.id}/poli`,
        {
          tanggal_booking: new Date().toISOString().split("T")[0], // memastikan format tanggal
          id_pasien: route.params.id_pasien,
          no_rkm_medis: route.params.no_rkm_medis,
          tanggal_periksa: date,
          jam_periksa:
            value == "Pagi" ? "07:00:00 - 14:00:00" : "14:00:00 - 18:00:00",
          kd_dokter: kdDokter,
          kd_poli: kdPoli,
          status_reg: "Belum",
          jns_kunjungan: "Poli",
          status_byr: "-",
          jns_pas: "Diri Sendiri",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.user.token}`,
          },
        }
      )
      .then((response) => {
        navigation.navigate("Booking Screen", response.data);
      })
      .catch((error) => {
        if (error.response) {
          // Server merespon dengan status code yang di luar rentang 2xx
          console.log("Response data:", error.response.data);
          console.log("Response status:", error.response.status);
          console.log("Response headers:", error.response.headers);
          Alert.alert(
            "Error",
            `Error: ${error.response.data.message || "Something went wrong"}`
          );
        } else if (error.request) {
          // Permintaan telah dibuat tetapi tidak ada respons yang diterima
          console.log("Request:", error.request);
          Alert.alert(
            "Error",
            "No response received from the server. Please try again later."
          );
        } else {
          // Ada sesuatu yang salah dalam mengatur permintaan
          console.log("Error", error.message);
          Alert.alert("Error", `Error: ${error.message}`);
        }
      });
  };

  // console.log(selectedItem.nm_pasien, selectedItem.no_rkm_medis);
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
    getPoli();
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

  const navHandle = async () => {
    postData();
  };

  const confirmData = (
    <View style={{ gap: 8 }}>
      <View>
        <Text>Nama</Text>
        <Text style={GlobalStyles.h4}>{route.params.nm_pasien}</Text>
      </View>
      <View>
        <Text>Tanggal Periksa</Text>
        <Text style={GlobalStyles.h4}>{hariPoli}</Text>
      </View>
      <View>
        <Text>Jam Periksa</Text>
        <Text style={GlobalStyles.h4}>{value}</Text>
      </View>
      <View>
        <Text>Poli Tujuan</Text>
        <Text style={GlobalStyles.h4}>{value2}</Text>
      </View>
      <View>
        <Text>Dokter Dituju</Text>
        <Text style={GlobalStyles.h4}>{dokter}</Text>
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
              setKdDokter(item.value);
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
        <Text style={GlobalStyles.h3}>{route.params.nm_pasien}</Text>
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
            disabled={value2 == "Pilih Poliklinik" ? true : false}
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
      </View>

      <View style={GlobalStyles.btnContainer}>
        <ButtonPrimary
          title="Ajukan Booking"
          onPress={handleRegister}
          disabled={
            value == "Pilih Jam Periksa" ||
            value2 == "Pilih Poliklinik" ||
            dokter == "Pilih Dokter"
          }
        />
      </View>

      {buttomSheet ? (
        <BottomSheet
          setStatus={setButtomSheet}
          ukuranModal={{ width: "100%", height: "45%" }}
          judul="Pastikan Data Benar"
          subjudul={confirmData}
          buttonKiri="Batal"
          buttonKanan="Booking"
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

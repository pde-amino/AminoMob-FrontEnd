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
import ButtonPrimary from "../../../components/ButtonPrimary";
import GlobalStyles from "../../../style/GlobalStyles";
import DateTimePicker from "@react-native-community/datetimepicker";
import HeaderComponent from "../../../components/HeaderComponent";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";
import { id } from "date-fns/locale";
import { format } from "date-fns";
import BottomSheet from "../../../components/BottomSheet";
import ConfirmModal from "../../../components/ConfirmModal";
import { AuthContex } from "../../../contex/AuthProvider";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import * as Network from "expo-network";

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

  const [hariPoli, setHariPoli] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [buttomSheet, setButtomSheet] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();

  const dataPas = route.params.dataKerabat;
  const kunjungan = route.params.jnsMenu;

  const [subMessMod, setSubMessMod] = useState("");
  const [messMod, setMessMod] = useState("Silahkan Pilih");
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
  const [noHpError, setNoHpError] = useState("");

  const [modalList, setModalList] = useState(false);

  const [noHp, setNoHp] = useState("");

  const handleNoHp = (input) => {
    setNoHp(input);
    const onlyNumbers = /^[0-9]+$/.test(input);
    setNoHpError(onlyNumbers ? "" : "Cuma boleh pakai angka");
  };

  const extractDay = (dateString) => {
    return dateString.split(" ")[0];
  };

  const getPoli = () => {
    if (kunjungan === "Poliklinik") {
      axios
        .get(`${BASE_URL}/jadwalpoli/${extractDay(hariPoli)}/${value}`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        })
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
          Alert.alert("Error", "Terjadi kesalahan saat mengambil data.");
        });
    } else if (kunjungan === "Penunjang") {
      axios
        .get(`${BASE_URL}/jadwalpenunjang/${extractDay(hariPoli)}/${value}`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        })
        .then((response) => {
          if (response.data.status === false) {
            setDatas(null);
            Alert.alert(
              "Pemberitahuan",
              "Tidak ada Dokter Penunjang yang bertugas Pada Hari yang dipilih."
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
          Alert.alert(
            "Poli Tutup",
            "Coba pilih jam periksa atau tanggal periksa lain."
          );
        });
    } else if (kunjungan === "TeleKonseling") {
      axios
        .get(`${BASE_URL}/pakettk`, {
          headers: {
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        })
        .then((response) => {
          if (response.data.status === false) {
            setDatas(null);
            Alert.alert(
              "Pemberitahuan",
              "Tidak ada Dokter Penunjang yang bertugas Pada Hari yang dipilih."
            );
          } else {
            const poli = response.data.data_poli.map((item, index) => {
              return {
                key: index,
                label: item.nm_perawatan,
                value: item.kd_jenis_prw,
              };
            });
            setDatas(poli);
          }
        })
        .catch((error) => {
          Alert.alert(
            "Poli Tutup",
            "Coba pilih jam periksa atau tanggal periksa lain. " + error
          );
        });
    }
  };

  const jadwalDok = (param) => {};

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

  const postData = async () => {
    let url, payload;
    const ip = await Network.getIpAddressAsync();

    if (kunjungan === "Poliklinik") {
      await axios
        .post(
          `${BASE_URL}/bookPeriksa/${auth.user.id}/poli`,
          {
            tanggal_booking: new Date().toISOString().split("T")[0], // memastikan format tanggal
            id_pasien: dataPas.id_pasien,
            no_rkm_medis: dataPas.no_rkm_medis,
            tanggal_periksa: date.toISOString().split("T")[0],
            jam_periksa:
              value == "Pagi" ? "07:00:00 - 14:00:00" : "14:00:00 - 18:00:00",
            kd_dokter: kdDokter,
            kd_poli: kdPoli,
            status_reg: "Belum",
            jns_kunjungan: "Poli",
            status_byr: "-",
            jns_pas: dataPas.status_user,
            ip: ip,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key":
                "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
              Authorization: `Bearer ${auth.user.token}`,
            },
          }
        )
        .then((response) => {
          navigation.replace("Booking Screen", response.data);
        })
        .catch((response) => {
          Alert.alert(
            "Mohon Maaf",
            `Sepertinya ${dataPas.nm_pasien} sudah terdaftar pada Tanggal ${
              date.toISOString().split("T")[0]
            } di ${value2}`
          );
        });
    } else if (kunjungan === "Penunjang") {
      await axios
        .post(
          `${BASE_URL}/bookPeriksa/${auth.user.id}/penunjang`,
          {
            tanggal_booking: new Date().toISOString().split("T")[0], // memastikan format tanggal
            id_pasien: dataPas.id_pasien,
            no_rkm_medis: dataPas.no_rkm_medis,
            tanggal_periksa: date.toISOString().split("T")[0],
            jam_periksa:
              value == "Pagi" ? "07:00:00 - 14:00:00" : "14:00:00 - 18:00:00",
            kd_dokter: kdDokter,
            kd_poli: kdPoli,
            status_reg: "Belum",
            jns_kunjungan: "Penunjang",
            status_byr: "-",
            jns_pas: dataPas.status_user,
            ip: ip,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key":
                "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
              Authorization: `Bearer ${auth.user.token}`,
            },
          }
        )
        .then((response) => {
          navigation.replace("Booking Screen", response.data);
        })
        .catch((response) => {
          Alert.alert(
            "Mohon Maaf",
            `Sepertinya ${dataPas.nm_pasien} sudah terdaftar pada Tanggal ${
              date.toISOString().split("T")[0]
            } di ${value2}`
          );
        });
    } else if (kunjungan === "TerangBulan") {
      await axios
        .post(
          `${BASE_URL}/bookPeriksa/${auth.user.id}/tb`,
          {
            no_rkm_medis: dataPas.no_rkm_medis,
            id_pasien: dataPas.id_pasien,
            // tanggal_booking: new Date().toISOString().split("T")[0], // memastikan format tanggal
            tanggal_periksa: date.toISOString().split("T")[0],
            jam_periksa:
              value == "Pagi" ? "07:00:00 - 14:00:00" : "14:00:00 - 18:00:00",
            kd_dokter: kdDokter,
            kd_poli: kdPoli,
            status_reg: "Belum",
            jns_kunjungan: "Penunjang",
            status_byr: "-",
            jns_pas: dataPas.status_user,
            kd_paket: "",
            jml_byr: "80000",
            wa: noHp,
            ip: ip,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key":
                "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
              Authorization: `Bearer ${auth.user.token}`,
            },
          }
        )
        .then((response) => {
          navigation.replace("Booking Screen", response.data);
        })
        .catch((response) => {
          Alert.alert(
            "Mohon Maaf",
            `Sepertinya ${dataPas.nm_pasien} sudah terdaftar pada Tanggal ${
              date.toISOString().split("T")[0]
            } di ${value2}`
          );
        });
    } else if (kunjungan === "TeleKonseling") {
      await axios
        .post(
          `${BASE_URL}/bookPeriksa/${auth.user.id}/tk`,
          {
            no_rkm_medis: dataPas.no_rkm_medis,
            id_pasien: dataPas.id_pasien,
            // tanggal_booking: new Date().toISOString().split("T")[0], // memastikan format tanggal
            tanggal_periksa: date.toISOString().split("T")[0],
            jam_periksa:
              value == "Pagi" ? "07:00:00 - 14:00:00" : "14:00:00 - 18:00:00",
            kd_dokter: kdDokter,
            kd_poli: kdPoli,
            status_reg: "Belum",
            jns_kunjungan: "Penunjang",
            status_byr: "-",
            jns_pas: dataPas.status_user,
            kd_paket: "",
            jml_byr: "80000",
            wa: noHp,
            ip: ip,
          },
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key":
                "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
              Authorization: `Bearer ${auth.user.token}`,
            },
          }
        )
        .then((response) => {
          navigation.replace("Booking Screen", response.data);
        })
        .catch((response) => {
          Alert.alert(
            "Mohon Maaf",
            `Sepertinya ${dataPas.nm_pasien} sudah terdaftar pada Tanggal ${
              date.toISOString().split("T")[0]
            } di ${value2}`
          );
        });
    }
  };

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
        .get(
          `${BASE_URL}/jadwaldok/${kdPoli}/${extractDay(hariPoli)}/${value}`,
          {
            headers: {
              "Content-Type": "application/json",
              "x-api-key":
                "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
            },
          }
        )
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
        "Maaf Poli yang anda pilih sepertinya libur pada Hari yang anda pilih"
      );
    }
    setMessMod("Pilih Dokter");
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
    setMessMod("Pilih Poliklinik");
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
        <Text style={GlobalStyles.textBiasa}>Nama</Text>
        <Text style={GlobalStyles.h4}>{dataPas.nm_pasien}</Text>
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
        cancel={() => {
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

      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ marginVertical: 10, marginHorizontal: 5 }}>
          <Text>Nama</Text>
          <Text style={GlobalStyles.h3}>{dataPas.nm_pasien}</Text>
        </View>
        <View style={styles.list}>
          <Text>Tanggal Periksa</Text>
          <View style={styles.itemList}>
            <Text style={GlobalStyles.h4}>
              {hariPoli ? hariPoli : "Pilih Tanggal"}
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

        {kunjungan == "TerangBulan" ? (
          <>
            <View style={styles.list}>
              <Text>Paket Terang</Text>
              <View style={styles.itemList}>
                <Text style={GlobalStyles.h4}>{value2}</Text>
                <Button title={"Pilih"} onPress={poliTujuan} />
              </View>
            </View>
            <View style={styles.list}>
              <Text>Nomor HP yang bisa dihubungi</Text>
              {noHpError ? (
                <Text style={{ color: "red" }}>{noHpError}</Text>
              ) : null}
              <TextInput
                label="Nomor HP"
                placeholder="Masukkan No HP Anda"
                value={noHp}
                type={"username"}
                onChangeText={handleNoHp}
              />
              {/* <View style={styles.itemList}> */}
              {/* <Text style={GlobalStyles.h4}>{value2}</Text> */}
              {/* <Button title={"Pilih"} onPress={poliTujuan} />
            </View> */}
            </View>
          </>
        ) : (
          <>
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
          </>
        )}
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
        {kunjungan == "TerangBulan" ? (
          <ButtonPrimary
            title="Ajukan Booking"
            onPress={handleRegister}
            disabled={
              value == "Pilih Jam Periksa" ||
              value2 == "Pilih Poliklinik" ||
              noHpError ||
              noHp == ""
            }
          />
        ) : (
          <ButtonPrimary
            title="Ajukan Booking"
            onPress={handleRegister}
            disabled={
              value == "Pilih Jam Periksa" ||
              value2 == "Pilih Poliklinik" ||
              dokter == "Pilih Dokter"
            }
          />
        )}
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

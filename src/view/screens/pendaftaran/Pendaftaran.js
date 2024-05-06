import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import { Modal, Portal, Checkbox } from "react-native-paper";
import ModalComponent from "../../../components/ModalComponent";
import ConfirmModal from "../../../components/ConfirmModal";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import ButtonPrimary from "../../../components/ButtonPrimary";
import GlobalStyles from "../../../style/GlobalStyles";
import DatePicker from "../../../components/DatePicker";
import DateTimePicker from "@react-native-community/datetimepicker";
import DropdownComponent from "../../../components/DropdownComponent";

const { lebar } = Dimensions.get("window");
const WARNA = { primary: "#0A78E2", white: "#fff", red: "#F01F1F" };

export const Pendaftaran = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [checked, setChecked] = React.useState(false);

  const [dateOfBirth, setDateOfBirth] = useState("");

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const toggleShowDate = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
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

  const handleConfirm = () => {
    // Lakukan aksi konfirmasi di sini
    setModalVisible(false);
  };

  const handleCancel = () => {
    // Lakukan aksi pembatalan di sini
    setModalVisible(false);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    // Tambahkan logika pendaftaran di sini
  };

  return (
    <SafeAreaView style={{ flex: 1, marginTop: 100 }}>
      <ScrollView>
        <View style={GlobalStyles.Content}>
          <Text style={styles.judul}>Pendaftaran Poli</Text>
          {/* <View style={GlobalStyles.textCenter}>
            <Text>Ini adalah data dari Profile Anda</Text>
            <Text>
              Jika masih ada kekliruan mohon perbaiki dahulu melalui menu
              Profile
            </Text>
          </View> */}
          <View style={{ gap: 12 }}>
            <TextInputIconComponent
              style={styles.inputan}
              label={"No Rekam Medis"}
              placeholder={"Masukan No Rekam Medis Anda"}
              type={"username"}
            />
            <TextInputIconComponent
              style={styles.inputan}
              label={"Nama Lengkap"}
              placeholder={"Masukan Nama Lengkap Anda"}
              type={"username"}
            />
            <TextInputIconComponent
              style={styles.inputan}
              label={"Alamat"}
              placeholder={"Masukan Alamat Lengkap Anda"}
              type={"username"}
            />

            <DropdownComponent style={styles.inputan} />

            {/* <TextInputIconComponent
              label={"Jns Kelamin"}
              placeholder={"Gender"}
              type={"username"}
            /> */}
            <View>
              {showPicker && (
                <DateTimePicker
                  // display={"spinner"}
                  mode="date"
                  onChange={onChange}
                  value={date}
                />
              )}

              {!showPicker && (
                <Pressable onPress={toggleShowDate}>
                  <TextInput
                    style={styles.tglPilihan}
                    editable={false}
                    // label={"Tgl Lahir"}
                    placeholder={"Tanggal Lahir"}
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

            <TextInputIconComponent
              label={"No Handphone"}
              placeholder={"081222931283"}
              type={"username"}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Checkbox
              status={checked ? "checked" : "unchecked"}
              onPress={() => {
                setChecked(!checked);
              }}
            />

            <Text>Pastikan data anda sudah benar</Text>
          </View>

          <View style={{ width: "90%" }}>
            <ButtonPrimary
              title="Selanjutnya -->"
              onPress={handleRegister}
              disabled={!checked}
            />
          </View>
        </View>
      </ScrollView>
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
    // marginBottom: 20,
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
    height: 48,
    borderWidth: 1,
    borderColor: WARNA.primary,
    justifyContent: "center",
    width: 370,
    backgroundColor: "white",
    color: "black",
    padding: 14,
    fontSize: 15,
  },
  inputan: {
    marginBottom: 16,
    marginTop: 24,
  },
});

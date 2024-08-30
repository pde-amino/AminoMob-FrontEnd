import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Button,
  Platform,
  StatusBar,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthContex } from "../../../contex/AuthProvider";
import GlobalStyles from "../../../style/GlobalStyles";
import { Avatar } from "react-native-paper";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import axios from "axios";
import { BASE_URL } from "../../../contex/Config";
import DateTimePicker from "@react-native-community/datetimepicker";

const WARNA = {
  primary: "#0A78E2",
  white: "#fff",
  red: "#F01F1F",
  secondary: "#5DA3E7",
};

export default function EditProfileScreen() {
  const { auth, setAuth } = useContext(AuthContex);
  const navigation = useNavigation();

  const [name, setName] = useState(auth.nama);
  const [phone] = useState(auth.hp); // Phone number is readonly
  const [tglLahir, setTglLahir] = useState(auth.tgl_lahir || "Belum ada data");
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/cariId/${auth.id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        });
        // console.log(response.data);
        setName(response.data.user.nama);
        setTglLahir(response.data.user.tgl_lahir);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [auth.id, auth.token]);

  const handleSave = async () => {
    try {
      await axios.put(
        `${BASE_URL}/updateUser/${auth.id}`,
        { nama: name, tgl_lahir: tglLahir },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
            "Content-Type": "application/json",
            "x-api-key":
              "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
          },
        }
      );

      Alert.alert("Berhasil", "Data berhasil diubah");

      const userGet = await axios.get(`${BASE_URL}/cariId/${auth.id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
          "x-api-key":
            "8466f6edaf4cbd71b365bb5dba94f176f5e3b6f88cf28361b935dedcf3a34c98",
        },
      });

      setAuth((prevAuth) => ({
        ...prevAuth,
        nama: userGet.data.user.nama,
        tgl_lahir: userGet.data.user.tgl_lahir,
      }));
      navigation.goBack();
    } catch (error) {
      const errorMessage =
        error.response?.data?.messages?.error || "Unknown error";
      Alert.alert("Error", `Terjadi kesalahan: ${errorMessage}`);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);
      setTglLahir(selectedDate.toISOString().split("T")[0]);
    }
    setShowPicker(false);
  };

  return (
    <SafeAreaView
      style={[
        GlobalStyles.utama,
        { paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0 },
      ]}>
      <View style={[{ marginTop: 10 }, styles.header]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.headerText}>Batal</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Profil</Text>
        <TouchableOpacity onPress={handleSave}>
          <Text style={styles.headerText}>Selesai</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.avatarContainer} onPress={() => {}}>
          <Avatar.Image
            size={80}
            source={require("../../../../assets/avatar.png")}
          />
        </TouchableOpacity>

        <View style={[{ gap: 12 }, styles.inputContainer]}>
          <TextInputIconComponent
            style={styles.input}
            label={"Nama"}
            placeholder="Nama Lengkap"
            value={name}
            onChangeText={setName}
          />

          <TextInputIconComponent
            disable={true}
            style={styles.input}
            label="Nomor Telepon"
            placeholder="Nomor HP"
            value={phone}
            keyboardType="phone-pad"
          />

          {showPicker && (
            <DateTimePicker
              mode="date"
              value={date}
              minimumDate={new Date(1935, 12, 31)}
              maximumDate={new Date()}
              onChange={handleDateChange}
            />
          )}

          {!showPicker && (
            <View style={styles.list}>
              <Text>Tanggal Lahir</Text>
              <View style={styles.itemList}>
                <Text style={GlobalStyles.h4}>{tglLahir}</Text>
                <Button
                  title={"Ubah Tanggal"}
                  onPress={() => setShowPicker(true)}
                />
              </View>
            </View>
          )}
        </View>
      </View>

      <TouchableOpacity
        style={styles.changePasswordContainer}
        onPress={() => navigation.navigate("ChangePasswordScreen")}>
        <Text style={styles.changePasswordText}>Ubah Kata Sandi</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    color: "#0A78E2",
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  list: {
    margin: 5,
    marginTop: 10,
    paddingBottom: 4,
    borderBottomWidth: 2,
  },
  itemList: {
    marginTop: 10,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  changePasswordContainer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    padding: 15,
  },
  changePasswordText: {
    color: "#0A78E2",
    fontSize: 16,
    textAlign: "center",
  },
});

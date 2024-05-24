import { View, Text, TextInput, SafeAreaView } from "react-native";
import React, { useContext, useState } from "react";
import GlobalStyles from "../../../style/GlobalStyles";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../../../components/HeaderComponent";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import { AuthContex } from "../../../contex/AuthProvider";
import ButtonPrimary from "../../../components/ButtonPrimary";

export default function EditProfileScreen() {
  const { data } = useContext(AuthContex);
  const navigation = useNavigation();

  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [RM, setRM] = useState("1234567890");
  const [phone, setPhone] = useState("1234567890");
  const [address, setAddress] = useState("123 Main St, Anytown, CA 12345");
  const [password, setPassword] = useState("1234567890");
  const [confirmPassword, setConfirmPassword] = useState("1234567890");
  const [avatarSource, setAvatarSource] = useState(null);

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <HeaderComponent
        title={"Edit Profil"}
        icon={"arrow-back"}
        onPress={() => navigation.goBack()}
      />
      <View style={GlobalStyles.Content}>
        <TextInputIconComponent
          label={"Nama Lengkap"}
          placeholder={"Nama Lengkap Anda"}
          type={"nama"}
          value={name}
          onChangeText={setName}
          // password={(data.status = "Success" ? true : false)}
          maskValue={data.status === "Sudah" ? false : true}
        />
        <TextInputIconComponent
          label={"No Rekam Medis"}
          placeholder={"Nomor Rekam Medis Anda"}
          type={"username"}
          value={RM}
          onChangeText={setRM}
          maskValue={data.status === "Sudah" ? false : true}
        />
        <TextInputIconComponent
          label={"Alamat"}
          placeholder={"Alamat Lengkap Anda"}
          // type={"usernamae"}
          value={address}
          maskValue={data.status === "Sudah" ? false : true}
        />
        <TextInputIconComponent
          label={"Nomor Handphone Anda"}
          placeholder={"Nomor HP yang bisa dihubungi"}
          type={"username"}
          value={phone}
          // {data.status? "disabled" : null}
          maskValue={data.status === "Sudah" ? false : true}
        />

        <ButtonPrimary title={"Simpan"} />
      </View>
    </SafeAreaView>
  );
}

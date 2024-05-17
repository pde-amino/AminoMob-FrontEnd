import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import React, { useState } from "react";
import { Avatar } from "react-native-paper";
import HeaderComponent from "../../../components/HeaderComponent";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import ButtonPrimary from "../../../components/ButtonPrimary";
import GlobalStyles from "../../../style/GlobalStyles";
import { useContext } from "react";
import { AuthContex } from "../../../contex/AuthProvider";

const ProfileScreen = () => {
  const { data } = useContext(AuthContex);
  console.log("inidarihomescreen", data);
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [RM, setRM] = useState("1234567890");
  const [phone, setPhone] = useState("1234567890");
  const [address, setAddress] = useState("123 Main St, Anytown, CA 12345");
  const [password, setPassword] = useState("1234567890");
  const [confirmPassword, setConfirmPassword] = useState("1234567890");
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/300");
  const [avatarSource, setAvatarSource] = useState(null);

  return (
    <View>
      <HeaderComponent title="Profil" icon="arrow-back" onPress={null} />
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: "center",
            marginTop: 50,
          }}>
          <Avatar.Image
            size={82}
            source={require("../../../../assets/favicon.png")}
          />
          <Text>Profile Screen</Text>
          <TextInput style={{ backgroundColor: "grey", width: 100 }} />
          <ButtonPrimary title="Next" onPress={null} />
        </View>
        <View style={GlobalStyles.Content}>
          <View style={{ gap: 8 }}>
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
          </View>
        </View>

        <View style={GlobalStyles.Content}>
          {data.status === "Sudah" ? (
            <View style={{ flex: 1, justifyContent: "flex-end", gap: 8 }}>
              <ButtonPrimary title="Selanjutnya " onPress={"#"} />
              <ButtonPrimary title="Selanjutnya " onPress={"#"} />
            </View>
          ) : (
            <ButtonPrimary title="Verifikasi Akun " onPress={"#"} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;

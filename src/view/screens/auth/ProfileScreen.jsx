import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Avatar } from "react-native-paper";
import HeaderComponent from "../../../components/HeaderComponent";
import TextInputIconComponent from "../../../components/TextInputIconComponent";
import ButtonPrimary from "../../../components/ButtonPrimary";
import GlobalStyles from "../../../style/GlobalStyles";
import { useContext } from "react";
import { AuthContex } from "../../../contex/AuthProvider";
import { Divider } from "@rneui/themed";
import { useNavigation } from "@react-navigation/native";
import BannerComponent from "../../../components/BannerComponent";

const ProfileScreen = () => {
  const { data } = useContext(AuthContex);
  console.log("inidarihomescreen", data);

  const navigation = useNavigation();

  const [banner, setBannerVis] = useState(false);

  const [name, setName] = useState("Placentino");
  const [email, setEmail] = useState("johndoe@gmail.com");
  const [RM, setRM] = useState("1234567890");
  const [phone, setPhone] = useState("1234567890");
  const [address, setAddress] = useState("123 Main St, Anytown, CA 12345");
  const [password, setPassword] = useState("1234567890");
  const [confirmPassword, setConfirmPassword] = useState("1234567890");
  const [avatarSource, setAvatarSource] = useState(null);

  useEffect(() => {
    if (data.status === "Proses") {
      setBannerVis(true);
    } else {
      setBannerVis(false);
    }
  }, [data.status]);

  const maskName = (name) => name.replace(/\B\w/g, "●");

  const displayName = data.status === "Sudah" ? name : maskName(name);

  return (
    <SafeAreaView style={GlobalStyles.utama}>
      <HeaderComponent title="Profil" />
      {banner && (
        <BannerComponent
          visible={banner}
          content={
            "Data anda sedang dalam proses verifikasi oleh petugas (maks 24 jam)"
          }
          bannerStyle={{
            backgroundColor: "#FF8310",
            borderRadius: 20,
            width: "95%",
            marginTop: 12,
          }}
          textStyle={{ fontWeight: "bold", color: "white" }}
          colorIcon={"white"}
        />
      )}
      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginTop: 16,
          }}
        >
          <Avatar.Image
            size={100}
            source={require("../../../../assets/avatar.png")}
          />
        </View>
        {data.status === "Sudah" ? (
          <View style={{ gap: 12 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={GlobalStyles.h2}>{name}</Text>
            </View>
            <View style={{ marginHorizontal: 20 }}>
              <Text style={GlobalStyles.h4}>Alamat</Text>
              <Text>{address}</Text>
            </View>
            <Divider />
            <View style={{ marginHorizontal: 20 }}>
              <Text style={GlobalStyles.h4}>Alamat</Text>
              <Text>{address}</Text>
            </View>
            <Divider />
            <View style={{ marginHorizontal: 20 }}>
              <Text style={GlobalStyles.h4}>Alamat</Text>
              <Text>{address}</Text>
            </View>
            <Divider />
            <View style={{ marginHorizontal: 20 }}>
              <Text style={GlobalStyles.h4}>Alamat</Text>
              <Text>{address}</Text>
            </View>
            <Divider />
          </View>
        ) : (
          <View style={{ gap: 12 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={GlobalStyles.h2}>{displayName}</Text>
            </View>
          </View>
        )}

        <View style={GlobalStyles.Content}>
          {data.status === "Sudah" ? (
            <ButtonPrimary
              title="Edit Profil"
              onPress={() => navigation.navigate("Edit Profil")}
            />
          ) : (
            <ButtonPrimary
              title="Verifikasi Akun"
              onPress={() => navigation.navigate("VerifikasiPage")}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;

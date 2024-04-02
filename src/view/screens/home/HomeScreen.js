// HomeScreen.js
import React from "react";
import { View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import MenuItem from "./MenuItem"; // Impor komponen MenuItem yang baru dibuat
import MenuItemComponent from "../../../components/MenuItemComponent";

const Menus = [
  {
    icon: "home",
    title: "Account",
    to: "Favorites",
    color: "pink",
  },
  {
    icon: "heart",
    title: "Notifaction",
    to: "Favorites",
    color: "purple",
  },
  {
    icon: "bonfire-outline",
    title: "Poli 2",
    to: "Poli2",
    color: "red",
  },
  {
    icon: "leaf-outline",
    title: "Klinik Hijau",
    to: "DoctorScreen",
    params: { clinicId: 2, nameClinic: "Klinik Hijau" },
    color: "green",
  },
  {
    icon: "book-outline",
    title: "Information",
    to: "Portal Informasi",
    color: "green",
  },
  {
    icon: "leaf-outline",
    title: "Klinik Umum",
    to: "DoctorScreen",
    params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
    color: "blue",
  },
  {
    icon: "leaf-outline",
    title: "Web View",
    to: "Web View",
    // params: { clinicId: 1, nameClinic: "Klinik Umum" }, // Parameter yang disertakan (misalnya clinicId)
    color: "blue",
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();

  const handleClinicSelection = (screen, params) => {
    navigation.navigate(screen, params);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      }}>
      <FlatList
        horizontal={false}
        numColumns={3}
        data={Menus}
        renderItem={({ item }) => (
          <MenuItemComponent
            onPress={() => handleClinicSelection(item.to, item.params)}
            icon={item.icon}
            title={item.title}
            colorIcon={item.color}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default HomeScreen;

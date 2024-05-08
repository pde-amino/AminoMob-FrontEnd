import { View, Text, FlatList } from "react-native";
import React from "react";

export default function InformasiHome() {
  const Menus = [
    {
      kd_poli: "1",
      icon: "home",
      title: "Jadwal Dokter",
      desc: "Pendaftaran Poli Klinik",
      to: "Daftar Online",
      color: "pink",
    },
  ];
  return (
    <View>
      <FlatList
        contentContainerStyle={{ flexGrow: 1 }}
        // refreshControl={
        //   <RefreshControl refreshing={isLoading} onRefresh={fetchData} />
        // }
        // horizontal={false}
        // numColumns={3}
        data={Menus}
        renderItem={({ item, index }) => (
          <CardButtonComponent
            // onPress={() =>
            //   handleClinicSelection("Testing", {
            //     clinicId: item.kd_poli,
            //     nameClinic: item.desc,
            //   })
            // }
            data={{ clinicId: item.kd_poli, nameClinic: item.desc }}
            icon={item.icon}
            title={item.title}
            description={item.desc}
            onPress={item.to}
            colorIcon={item.color}
          />
        )}
        keyExtractor={(item) => item.kd_poli}
      />
    </View>
  );
}

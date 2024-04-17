import React from "react";
import { View } from "react-native";
import ButtonPrimary from "../../../components/ButtonPrimary";

export default function Index() {
  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={doctorsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CardDoctorInformationComponent
            doctorName={item.name}
            doctorSpecialty={item.specialization}
          />
        )}
      />
    </View>
  );
}

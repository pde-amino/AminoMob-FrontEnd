import React from "react";
import { FlatList, View } from "react-native";
import CardDoctorInformationComponent from "../../../components/CardDoctorInformationComponent";

const doctorsData = [
  { name: "Dr. San France", specialization: "Pediatrician" },
  { name: "Dr. Jade", specialization: "Dermatologist" },
  { name: "Dr. John Doe", specialization: "Pediatrician" },
  { name: "Dr. Jane Smith", specialization: "Dermatologist" },
];

export default function PoliInformation({ route }) {
  const { clinicId, nameClinic } = route.params;
  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        data={doctorsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <CardDoctorInformationComponent
            doctorName={clinicId}
            doctorSpecialty={item.specialization}
          />
        )}
      />
    </View>
  );
}

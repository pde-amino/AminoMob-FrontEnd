import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Card, Avatar, Button } from "react-native-paper";

const CardDoctorInformationComponent = ({ doctorName, doctorSpecialty }) => {
  const navigation = useNavigation();
  const handleClinicSelection = (screen, params) => {
    navigation.navigate(screen, params);
  };
  return (
    <Card>
      <Card.Content style={{ flexDirection: "row", alignItems: "center" }}>
        <Avatar.Image
          size={64}
          source={{ uri: "https://picsum.photos/seed/picsum/200/300" }}
        />
        <Card.Title
          title={doctorName}
          subtitle={doctorSpecialty}
          style={{ flex: 1, marginLeft: 16 }}
        />
        <Button>Lihat</Button>
      </Card.Content>
    </Card>
  );
};

export default CardDoctorInformationComponent;

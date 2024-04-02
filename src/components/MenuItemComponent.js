// MenuItemComponent.js
import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { Ionicons } from "react-native-vector-icons";

const MenuItemComponent = ({ onPress, icon, title, colorIcon }) => (
  <TouchableOpacity onPress={onPress}>
    <IconButton
      icon={({ color, size }) => (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Ionicons name={icon} size={size} color={colorIcon} />
          <Text style={{ fontSize: 12 }}>{title}</Text>
        </View>
      )}
      style={{
        margin: 5,
        borderRadius: 10,
        backgroundColor: "white",
        width: 120,
        height: 120,
      }}
    />
  </TouchableOpacity>
);

export default MenuItemComponent;

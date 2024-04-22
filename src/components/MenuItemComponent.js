import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { Icon } from "@rneui/themed";

const MenuItemComponent = ({ onPress, icon, title, colorIcon }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <View style={styles.iconContainer}>
      <Icon name={icon} size={32} color={colorIcon} />
    </View>
    <Text style={styles.title}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    margin: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    height: 120,
    width: 120,
    borderRadius: 10,
    elevation: 4,
  },
  iconContainer: {
    margin: 8,
  },
  title: {
    fontSize: 14,
    width: 100,
    textAlign: "center",
  },
});

export default MenuItemComponent;

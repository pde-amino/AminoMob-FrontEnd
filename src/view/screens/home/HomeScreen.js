import * as React from "react";
import {
  Text,
  TextInput,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "react-native-vector-icons";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const styles = {
  iconButton: {
    margin: 5,
    borderRadius: 10,
    backgroundColor: "white",
    width: 120,
    height: 120,
  },
};

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
    icon: "list",
    title: "Poli 2",
    to: "Poli2",
    color: "grey",
  },
  {
    icon: "leaf-outline",
    title: "Inspire",
    to: "Poli1",
    color: "green",
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        // marginTop: 20,
      }}>
      <View>
        <FlatList
          horizontal={false}
          numColumns={3}
          data={Menus}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate(item.to)}>
              <IconButton
                icon={({ color, size }) => (
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}>
                    <Ionicons name={item.icon} size={size} color={item.color} />
                    <Text style={{ fontSize: 12 }}>{item.title}</Text>
                  </View>
                )}
                style={styles.iconButton}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  );
}

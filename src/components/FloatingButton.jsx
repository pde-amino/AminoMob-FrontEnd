import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Alert, Linking } from "react-native";
import { FAB, Portal, PaperProvider } from "react-native-paper";

const FloatingButton = () => {
  const navigation = useNavigation();

  const [state, setState] = React.useState({ open: false });

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <Portal>
      <PaperProvider>
        <FAB.Group
          style={{ paddingBottom: "13%" }}
          color="#fff"
          open={open}
          visible
          fabStyle={{ backgroundColor: "#06b8ac" }}
          icon={open ? "close-circle-outline" : "chat-processing"}
          actions={[
            {
              icon: "face-agent",
              label: "Bantuan Informasi RS",
              labelStyle: { color: "#243b39", letterSpacing: 1 },
              onPress: () => {
                Alert.alert(
                  "Informasi",
                  "Anda akan dihubungkan langsung ke layanan WhatsApp Humas Amino Hospital.",
                  [
                    {
                      text: "Batal",
                    },
                    {
                      text: "Lanjutkan",
                      onPress: () => {
                        Linking.openURL("https://wa.me/6289515636878");
                      },
                    },
                  ],
                  {
                    cancelable: true,
                  }
                );
              },
              containerStyle: {
                backgroundColor: "#fff",
                //   borderColor: "black",
                //   borderWidth: 4,
                //   borderBottomWidth: 4,
              },
              style: { backgroundColor: "#fff" },
              color: "#06b8ac",
            },
            {
              icon: "message-text",
              label: "Chat AI Otomatis",
              labelStyle: { color: "#243b39", letterSpacing: 1 },
              containerStyle: {
                backgroundColor: "#fff",
              },
              style: { backgroundColor: "#fff" },
              color: "#06b8ac",
              onPress: () => navigation.replace("ChatAI"),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
      </PaperProvider>
    </Portal>
  );
};

export default FloatingButton;

import * as React from "react";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "./src/contex/AuthProvider";
import Routes from "./src/routes/Routes";
import deviceInfoModule from "react-native-device-info";
import { Alert, BackHandler } from "react-native";

export default function App() {
  // React.useEffect(() => {
  //   const checkIfEmulator = async () => {
  //     const isEmulator = await deviceInfoModule.isEmulator();
  //     if (isEmulator) {
  //       // Tindakan yang dilakukan jika aplikasi dijalankan di emulator
  //       Alert.alert(
  //         "Emulator Detected",
  //         "The app cannot be run on an emulator.",
  //         [
  //           {
  //             text: "OK",
  //             onPress: () => {
  //               // Close the app or navigate away
  //               // Misalnya, menggunakan BackHandler untuk menutup aplikasi
  //               BackHandler.exitApp();
  //             },
  //           },
  //         ],
  //         { cancelable: false }
  //       );
  //     }
  //   };

  //   checkIfEmulator();
  // }, []);

  return (
    <PaperProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </PaperProvider>
  );
}

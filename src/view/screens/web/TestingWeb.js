import { WebView } from "react-native-webview";
import Constants from "expo-constants";
import { StyleSheet } from "react-native";

const TestingWeb = () => {
  return (
    <WebView
      style={styles.container}
      source={{ uri: "https://github.com/rajutankoding" }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

export default TestingWeb;

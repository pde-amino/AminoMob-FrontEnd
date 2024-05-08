import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
import { WebView } from "react-native-webview";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");

const WebViewScreen = () => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Logika refresh data di sini
    setRefreshing(false);
  };

  return (
    // <ScrollView
    //   refreshControl={
    //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //   }>
    <WebView
      style={{ height }}
      source={{ uri: "http://192.168.5.5:8080" }}
      // Anda juga dapat menambahkan properti lain untuk WebView di sini
      // Contoh: onLoadStart, onLoadEnd, onError, dll.
    />
    // </ScrollView>
  );
};

export default WebViewScreen;

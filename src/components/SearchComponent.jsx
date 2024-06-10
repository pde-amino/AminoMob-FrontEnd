// SearchComponent.js
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SearchBar } from "@rneui/base";
import { TextInput } from "react-native";

const SearchComponent = ({ data, onSearch, placeholder, filterAttribute }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (query) => {
    setQuery(query);
    if (Array.isArray(data)) {
      if (query) {
        const filteredData = data.filter((item) =>
          item[filterAttribute]?.toLowerCase().includes(query.toLowerCase())
        );
        onSearch(filteredData);
      } else {
        onSearch(data); // Reset to full data if query is empty
      }
    } else {
      onSearch([]); // In case data is not an array
    }
  };

  return (
    <View style={styles.srcContainer}>
      <View style={[styles.searchBar, styles.borderShadow]}>
        <TextInput
          placeholder={placeholder}
          onChangeText={handleSearch}
          value={query}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  srcContainer: {
    marginTop: 10,
    marginHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
    padding: 10,
    flex: 1,
  },
  borderShadow: {
    borderRadius: 50,
    shadowColor: "gray",
    shadowOffset: {
      widh: 2,
      height: 1,
    },
    shadowOpacity: 5,
    shadowRadius: 2,
    elevation: 5,
    borderTopWidth: 0,
    borderLeftWidth: 0.2,
    backgroundColor: "white",
  },
});

export default SearchComponent;

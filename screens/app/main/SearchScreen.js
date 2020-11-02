import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import CategoryList from "../../../components/app/main/CategoryList";

const SearchScreen = (props) => {
  const initialCategories = useSelector((state) =>
    state.categories.categories.map((category) => category.id)
  );
  const [checks, setChecks] = useState(initialCategories);

  return (
    <View style={styles.screen}>
      <CategoryList inputMode many value={checks} onChange={setChecks} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    paddingHorizontal: 15,
    backgroundColor: "white",
    paddingTop: 25,
  },
});

export const screenOptions = {
  headerTitle: "Search",
};

export default SearchScreen;

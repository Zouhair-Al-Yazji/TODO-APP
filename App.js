import React, { useState } from "react";
import {
  StyleSheet,
  Keyboard,
  SafeAreaView,
  StatusBar,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
} from "react-native";
import Header from "./components/header";
import ListItem from "./components/listItem";
import AddItem from "./components/addItem";
import uuid from "react-native-uuid";

export default function App() {
  const [items, setItems] = useState([
    { id: uuid.v4(), text: "Milk" },
    { id: uuid.v4(), text: "Eggs" },
    { id: uuid.v4(), text: "Bread" },
    { id: uuid.v4(), text: "Juice" },
  ]);

  const deleteItem = (id) => {
    setItems((prevItems) => {
      return prevItems.filter((item) => item.id != id);
    });
  };

  const addItem = (text) => {
    if (text.length < 3) {
      Alert.alert("Error", "The item must be over 3 chars length.", [
        { text: "OK" },
      ]);
    } else {
      setItems((prevItems) => {
        return [...prevItems, { id: uuid.v4(), text }];
      });
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={styles.container}>
        <Header title="Shopping List" />
        <AddItem addItem={addItem} />
        <FlatList
          keyExtractor={(item) => item.id}
          data={items}
          renderItem={({ item }) => (
            <ListItem item={item} deleteItem={deleteItem} />
          )}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
});

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Alert,
  Button,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { IImage, useGallery } from "./src/useGallery";
import data from "@expo/cli/node_modules/type-fest/source/readonly-deep";

const screenWidth = Dimensions.get("screen").width;
const columSize = screenWidth / 3;
export default function App() {
  const { images, pickImage, deleteImage, imageWithADdButton } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };

  const onLongPress = (imageId: number) => {
    deleteImage(imageId);
  };
  const renderItem = ({ item, index }: { item: IImage; index: number }) => {
    if (item.id === -1) {
      return (
        <TouchableOpacity
          style={{
            width: columSize,
            height: columSize,
            backgroundColor: "lightgrey",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={onPressOpenGallery}
        >
          <Text style={{ fontSize: 40, fontWeight: "100", color: "white" }}>
            +
          </Text>
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onLongPress={() => onLongPress(item.id)}>
          <Image source={{ uri: item.uri }} style={styles.image} />
        </TouchableOpacity>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={imageWithADdButton}
        renderItem={renderItem}
        numColumns={3}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  image: {
    width: columSize,
    height: columSize,
  },
});

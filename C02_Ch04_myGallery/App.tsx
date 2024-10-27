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
import { IImage, ISelectedAlbum, useGallery } from "./src/useGallery";
import data from "@expo/cli/node_modules/type-fest/source/readonly-deep";
import MyDropdownPicker from "./src/MyDropdownPicker";
import TextInputModal from "./src/TextInputModal";

const screenWidth = Dimensions.get("screen").width;
const columSize = screenWidth / 3;

export default function App() {
  const {
    selectedAlbum,
    pickImage,
    deleteImage,
    imageWithADdButton,
    modalVisible,
    openModal,
    closeModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    resetAlbumTitle,
    isDropdownOpen,
    closeDropdown,
    openDropdown,
    albums,
    selectAlbum,
    deleteAlbum,
  } = useGallery();

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

  const onPressAddAlbum = () => {
    openModal();
  };

  const onSubmitEditing = () => {
    if (!albumTitle || albumTitle.trim().length === 0) return;
    addAlbum();
    closeModal();
    resetAlbumTitle();
  };

  const onPressHeader = () => {
    if (isDropdownOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };
  const onPressAlbum = (album: ISelectedAlbum) => {
    selectAlbum(album);
    closeDropdown();
  };

  const onLongPressAlbum = (albumId: number) => {
    deleteAlbum(albumId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyDropdownPicker
        onPressHeader={onPressHeader}
        selectedAlbum={selectedAlbum}
        onPressAddAlbum={onPressAddAlbum}
        isDropdownOpen={isDropdownOpen}
        albums={albums}
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={onLongPressAlbum}
      />

      <TextInputModal
        modalVisible={modalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={closeModal}
      />

      <FlatList
        data={imageWithADdButton}
        renderItem={renderItem}
        numColumns={3}
        style={styles.flatList}
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
  flatList: {
    zIndex: -1,
  },
});

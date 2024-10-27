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
import BigImgModal from "./src/BigImgModal";

const screenWidth = Dimensions.get("screen").width;
const columSize = screenWidth / 3;

export default function App() {
  const {
    selectedAlbum,
    pickImage,
    deleteImage,
    imageWithADdButton,
    textModalVisible,
    openTextInputModal,
    closeTextInputModal,
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
    imgModalVisible,
    openBigImgModal,
    closeBigImgModal,
    selectedImage,
    selectedImg,
    moveToPreviousImage,
    moveToNextImage,
    showPreviousArrow,
    showNextArrow,
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };

  const onLongPress = (imageId: number) => {
    deleteImage(imageId);
  };

  const onPressImg = (uri: IImage) => {
    openBigImgModal();
    selectedImage(uri);
  };

  const renderItem = ({
    item: image,
    index,
  }: {
    item: IImage;
    index: number;
  }) => {
    const { id, uri } = image;
    if (id === -1) {
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
        <TouchableOpacity
          onLongPress={() => onLongPress(id)}
          onPress={() => onPressImg(image)}
        >
          <Image source={{ uri: uri }} style={styles.image} />
        </TouchableOpacity>
      );
    }
  };

  const onPressAddAlbum = () => {
    openTextInputModal();
  };

  const onSubmitEditing = () => {
    if (!albumTitle || albumTitle.trim().length === 0) return;
    addAlbum();
    closeTextInputModal();
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

  const onPressArrowLeft = () => {
    moveToPreviousImage();
  };
  const onPressArrowRight = () => {
    moveToNextImage();
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
        textModalVisible={textModalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={closeTextInputModal}
      />

      <BigImgModal
        imgModalVisible={imgModalVisible}
        onPressBackdrop={closeBigImgModal}
        selectedImg={selectedImg}
        onPressArrowLeft={onPressArrowLeft}
        onPressArrowRight={onPressArrowRight}
        showPreviousArrow={showPreviousArrow}
        showNextArrow={showNextArrow}
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

import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from "react-native";
import { IImage } from "./useGallery";

interface TextInputModalProp {
  imgModalVisible: boolean;
  onPressBackdrop: () => void;
  selectedImg: IImage;
}

export default ({
  imgModalVisible,
  onPressBackdrop,
  selectedImg,
}: TextInputModalProp) => {
  return (
    <Modal animationType="fade" transparent={true} visible={imgModalVisible}>
      <Pressable onPress={onPressBackdrop} style={styles.pressable}>
        <Pressable>
          <Image source={{ uri: selectedImg?.uri }} style={styles.img} />
        </Pressable>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  pressable: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    width: 280,
    height: 280,
    backgroundColor: "white",
    resizeMode: "contain",
  },
});

import React from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { IImage } from "./useGallery";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

interface ArrowButtonProps {
  iconName: keyof typeof SimpleLineIcons.glyphMap;
  onPress: () => void;
  disabled: boolean;
}
const ArrowButton = ({ iconName, onPress, disabled }: ArrowButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.arrow}
      disabled={disabled}
    >
      <SimpleLineIcons
        name={iconName}
        size={20}
        color={disabled ? "transparent" : "black"}
      />
    </TouchableOpacity>
  );
};

interface TextInputModalProp {
  imgModalVisible: boolean;
  onPressBackdrop: () => void;
  selectedImg: IImage | null;
  onPressArrowLeft: () => void;
  onPressArrowRight: () => void;
  showPreviousArrow: boolean;
  showNextArrow: boolean;
}

export default ({
  imgModalVisible,
  onPressBackdrop,
  selectedImg,
  onPressArrowLeft,
  onPressArrowRight,
  showPreviousArrow,
  showNextArrow,
}: TextInputModalProp) => {
  return (
    <Modal animationType="fade" transparent={true} visible={imgModalVisible}>
      <Pressable onPress={onPressBackdrop} style={styles.pressable}>
        <View style={styles.viewWithArrow}>
          <ArrowButton
            iconName={"arrow-left"}
            onPress={onPressArrowLeft}
            disabled={!showNextArrow}
          />
          <Pressable>
            <Image source={{ uri: selectedImg?.uri }} style={styles.img} />
          </Pressable>
          <ArrowButton
            iconName={"arrow-right"}
            onPress={onPressArrowRight}
            disabled={!showPreviousArrow}
          />
        </View>
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
  viewWithArrow: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrow: { paddingHorizontal: 20, height: "100%", justifyContent: "center" },
});

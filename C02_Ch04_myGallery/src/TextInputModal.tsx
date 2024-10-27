import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  NativeSyntheticEvent,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TextInputSubmitEditingEventData,
  View,
} from "react-native";

interface TextInputModalProp {
  textModalVisible: boolean;
  albumTitle: string;
  setAlbumTitle: React.Dispatch<React.SetStateAction<string>>;
  onSubmitEditing: (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>
  ) => void;
  onPressBackdrop: () => void;
}

export default ({
  textModalVisible,
  albumTitle,
  setAlbumTitle,
  onSubmitEditing,
  onPressBackdrop,
}: TextInputModalProp) => {
  return (
    <Modal animationType="slide" transparent={true} visible={textModalVisible}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.view}
      >
        <Pressable style={styles.view} onPress={onPressBackdrop}>
          <SafeAreaView style={styles.sideView}>
            <TextInput
              placeholder="앨범명을 입력해주세요"
              style={styles.viewText}
              value={albumTitle}
              onChangeText={setAlbumTitle}
              onSubmitEditing={onSubmitEditing}
              autoFocus
            ></TextInput>
          </SafeAreaView>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  sideView: {
    width: "100%",
    position: "absolute",
    bottom: 0,
  },
  viewText: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: "lightgrey",
  },
});

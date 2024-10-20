import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";

interface AddTodoInputProps {
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  onPressAdd: () => void;
}

const AddTodoInput = ({
  value,
  onChangeText,
  placeholder,
  onPressAdd,
}: AddTodoInputProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        width: 220,
        alignItems: "center",
        // marginBottom: insets.bottom,
        flexDirection: "row",
        alignSelf: "center"
      }}
    >
      <TextInput
        style={{ flex: 1, padding: 5, color:"#595959" }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      <TouchableOpacity onPress={onPressAdd} style={{ padding: 5 }}>
        <AntDesign name="plus" size={18} color={"#595959"} />
      </TouchableOpacity>
    </View>
  );
};

export default AddTodoInput;

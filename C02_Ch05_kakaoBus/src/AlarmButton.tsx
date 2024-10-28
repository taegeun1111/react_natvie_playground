import { TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "./color";

interface Props {
  onPress: () => void;
  buttonStyle?: ViewStyle;
}

export default ({ onPress, buttonStyle }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Ionicons name="alarm-outline" size={24} color={COLOR.GRAY_3} />
    </TouchableOpacity>
  );
};

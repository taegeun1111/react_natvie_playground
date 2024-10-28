import { TouchableOpacity, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLOR } from "./color";

interface Props {
  isBookmarked: boolean;
  onPress: () => void;
  buttonStyle?: ViewStyle;
}

export default ({ isBookmarked, onPress, buttonStyle }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyle}>
      <Ionicons
        name="star"
        size={24}
        color={isBookmarked ? COLOR.YELLOW : COLOR.GRAY_1}
      />
    </TouchableOpacity>
  );
};

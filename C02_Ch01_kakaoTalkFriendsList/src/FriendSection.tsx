import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface FriendSectionProps {
  friendProfileLen: string | number;
  onPress: () => void;
  isOpened: boolean
}

export default ({ friendProfileLen, onPress,isOpened }: FriendSectionProps) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{color:'grey'}}>친구 {friendProfileLen}</Text>

      <TouchableOpacity onPress={onPress}>
        {/* <MaterialIcons name="keyboard-arrow-down" size={24} color="black" /> */}
        <MaterialIcons name={isOpened ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color="lightgray" />
      </TouchableOpacity>
    </View>
  );
};

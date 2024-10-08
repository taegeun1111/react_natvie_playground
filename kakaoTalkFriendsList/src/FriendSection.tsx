import { Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface FriendSectionProps {
  friendProfileLen: string | number;
  onPress: () => void;
}

export default ({ friendProfileLen, onPress }: FriendSectionProps) => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text style={{color:'grey'}}>친구 {friendProfileLen}</Text>

      <TouchableOpacity onPress={onPress}>
        {/* <MaterialIcons name="keyboard-arrow-down" size={24} color="black" /> */}
        <MaterialIcons name="keyboard-arrow-up" size={24} color="lightgray" />
      </TouchableOpacity>
    </View>
  );
};

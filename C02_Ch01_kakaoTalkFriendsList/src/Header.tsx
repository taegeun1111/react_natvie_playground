import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const IconButton = ({ name }: { name: keyof typeof Ionicons.glyphMap }) => {
  return (
    <TouchableOpacity
      style={{ paddingHorizontal: 6 }}
      hitSlop={{ top: 10, bottom: 10 }}
    >
      <Ionicons name={name} size={24} color="black" />
    </TouchableOpacity>
  );
};

const Header = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>친구</Text>

      <View style={{ flexDirection: "row" }}>
        <IconButton name="search-outline" />
        <IconButton name="person-add-outline" />
        <IconButton name="musical-notes-outline" />
        <IconButton name="settings-outline" />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});

import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import BusInfo from "./src/BusInfo";

export default function App() {
  return (
    <View style={styles.container}>
      <BusInfo
        isBookmarked={true}
        onPress={() => {}}
        num={145}
        directionDescription=""
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

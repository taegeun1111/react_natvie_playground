import dayjs from "dayjs";
import { StatusBar } from "expo-status-bar";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { getCalendarColumns } from "./util";

export default function App() {
  const now = dayjs();
  const columns = getCalendarColumns(now);

  const renderItem = ({ item: date }: { item: Date }) => {
    const dateText = dayjs(date).get("date");
    const day = dayjs(date).get("day");
    const color = day === 0 ? "#e67639" : day === 6 ? "#5872d1" : "#2b2b2b";
    const isCurrentMonth = dayjs(date).isSame(now, "month");
    return (
      <View
        style={{
          width: 30,
          height: 30,
          justifyContent: "center",
          alignItems: "center",
          opacity: isCurrentMonth ? 1 : 0.3,
        }}
      >
        <Text style={{ color }}>{dateText}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={columns} renderItem={renderItem} numColumns={7} />
    </SafeAreaView>
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

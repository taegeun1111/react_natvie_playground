import dayjs from "dayjs";
import { StatusBar } from "expo-status-bar";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getCalendarColumns, getDayColor, getDayText } from "./util";
import Margin from "./src/Margin";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useState } from "react";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface ColumnProps {
  text: string;
  color: string;
  opacity: number;
  disabled?: boolean;
  onPress?: () => void;
  isSelected?: boolean;
}

interface ArrowButtonProps {
  iconName: keyof typeof SimpleLineIcons.glyphMap;
  onPress: () => void;
}

export default function App() {
  const now = dayjs();
  const [selectedDate, setSelectedDate] = useState(now);
  const columns = getCalendarColumns(selectedDate);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: Date) => {
    // console.warn("A date has been picked: ", date);
    setSelectedDate(dayjs(date));
    hideDatePicker();
  };

  const onPressLeftArrow = () => {
    const newSelectedDate = dayjs(selectedDate).subtract(1, "month");
    setSelectedDate(newSelectedDate);
  };

  const onPressRightArrow = () => {
    const newSelectedDate = dayjs(selectedDate).add(1, "month");
    setSelectedDate(newSelectedDate);
  };

  const Column = ({
    color,
    opacity,
    text,
    disabled,
    onPress,
    isSelected,
  }: ColumnProps) => {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={onPress}
        style={{
          width: 30,
          height: 30,
          justifyContent: "center",
          alignItems: "center",
          opacity,
          backgroundColor: isSelected ? "#c2c2c2" : "transparent",
          borderRadius: 50,
        }}
      >
        <Text style={{ color }}>{text}</Text>
      </TouchableOpacity>
    );
  };

  const ArrowButton = ({ onPress, iconName }: ArrowButtonProps) => {
    return (
      <TouchableOpacity style={{ padding: 15 }} onPress={onPress}>
        <SimpleLineIcons name={iconName} size={15} color="#404040" />
      </TouchableOpacity>
    );
  };

  const ListHeaderComponent = () => {
    const currentDateText = dayjs(selectedDate).format("YYYY.MM.DD");
    return (
      <View>
        <Margin height={15} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ArrowButton iconName="arrow-left" onPress={onPressLeftArrow} />
          <TouchableOpacity onPress={showDatePicker}>
            <Text style={{ fontSize: 20, color: "#404040" }}>
              {currentDateText}
            </Text>
          </TouchableOpacity>
          <ArrowButton iconName="arrow-right" onPress={onPressRightArrow} />
        </View>

        <View style={{ flexDirection: "row" }}>
          {[0, 1, 2, 3, 4, 5, 6].map((day) => {
            const dayText = getDayText(day);
            const dayColor = getDayColor(day);
            return (
              <Column
                key={day}
                text={dayText}
                color={dayColor}
                opacity={1}
                disabled
              />
            );
          })}
        </View>
      </View>
    );
  };

  const renderItem = ({ item: date }: { item: Date }) => {
    const dateText = dayjs(date).get("date");
    const day = dayjs(date).get("day");
    const color = day === 0 ? "#e67639" : day === 6 ? "#5872d1" : "#2b2b2b";
    const isCurrentMonth = dayjs(date).isSame(now, "month");
    const onPress = () => {
      setSelectedDate(dayjs(date)); // Date를 Dayjs로 변환하여 전달
    };
    const isSelected = dayjs(date).isSame(selectedDate, "date");

    return (
      <Column
        text={String(dateText)}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.3}
        onPress={onPress}
        isSelected={isSelected}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={columns}
        renderItem={renderItem}
        numColumns={7}
        ListHeaderComponent={ListHeaderComponent}
        keyExtractor={(_, index) => `day-${index}`}
      />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
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

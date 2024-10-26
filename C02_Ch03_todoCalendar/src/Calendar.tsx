import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { getCalendarColumns, getDayColor, getDayText } from "../util";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Margin from "./Margin";
import dayjs from "dayjs";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { ITodoItem } from "./hooks/useTodoList";

interface ArrowButtonProps {
  iconName: keyof typeof SimpleLineIcons.glyphMap;
  onPress: () => void;
}

interface ColumnProps {
  text: string;
  color: string;
  opacity: number;
  disabled?: boolean;
  onPress?: () => void;
  isSelected?: boolean;
  hasTodo?: boolean;
}

interface CalendarProps {
  selectedDate: dayjs.Dayjs;
  onPressLeftArrow: () => void;
  onPressRightArrow: () => void;
  onPressHeaderDate: () => void;
  onPressDate: (date: dayjs.Dayjs) => void;
  columns: ArrayLike<Date>;
  todoList: ITodoItem[];
}

const Calendar = ({
  selectedDate,
  onPressLeftArrow,
  onPressRightArrow,
  onPressHeaderDate,
  onPressDate,
  columns,
  todoList,
}: CalendarProps) => {
  const insets = useSafeAreaInsets();
  const renderItem = ({ item: date }: { item: Date }) => {
    const dateText = dayjs(date).get("date");
    const day = dayjs(date).get("day");
    const color = day === 0 ? "#e67639" : day === 6 ? "#5872d1" : "#2b2b2b";
    const isCurrentMonth = dayjs(date).isSame(selectedDate, "month");
    const onPress = () => onPressDate(dayjs(date));
    const isSelected = dayjs(date).isSame(selectedDate, "date");
    const hasTodo = todoList.find((todo) =>
      dayjs(todo.date).isSame(dayjs(date), "date")
    );
    return (
      <Column
        text={String(dateText)}
        color={color}
        opacity={isCurrentMonth ? 1 : 0.3}
        onPress={onPress}
        isSelected={isSelected}
        hasTodo={hasTodo !== undefined}
      />
    );
  };

  const Column = ({
    color,
    opacity,
    text,
    disabled,
    onPress,
    isSelected,
    hasTodo,
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
        <Text style={{ color, fontWeight: hasTodo ? "bold" : "normal" }}>
          {text}
        </Text>
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
          <TouchableOpacity onPress={onPressHeaderDate}>
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

  return (
    <FlatList
      data={columns}
      renderItem={renderItem}
      numColumns={7}
      ListHeaderComponent={ListHeaderComponent}
      keyExtractor={(_, index) => `day-${index}`}
      contentContainerStyle={{ paddingTop: insets.top }}
    />
  );
};

export default Calendar;

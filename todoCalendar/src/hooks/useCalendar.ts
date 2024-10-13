import dayjs from "dayjs";
import { useState } from "react";

interface useCalendarProps {
  now: dayjs.Dayjs;
}

export const useCalendar = ({ now }: useCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState(now);
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

  const subtract1Month = () => {
    const newSelectedDate = dayjs(selectedDate).subtract(1, "month");
    setSelectedDate(newSelectedDate);
  };

  const add1Month = () => {
    const newSelectedDate = dayjs(selectedDate).add(1, "month");
    setSelectedDate(newSelectedDate);
  };

  return {
    selectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
    setSelectedDate
  };
};

import dayjs from "dayjs";
import {
  FlatList,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useCalendar } from "./src/hooks/useCalendar";
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { ITodoItem, useTodoList } from "./src/hooks/useTodoList";
import Calendar from "./src/Calendar";
import { getCalendarColumns } from "./util";
import { Ionicons } from "@expo/vector-icons";
import Margin from "./src/Margin";
import AddTodoInput from "./src/AddTodoInput";

export default function App() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}

function Main() {
  const now = dayjs();
  const {
    selectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    add1Month,
    subtract1Month,
    setSelectedDate,
  } = useCalendar({ now });

  const { todoList, input, setInput } = useTodoList(now);

  const insets = useSafeAreaInsets();
  const columns = getCalendarColumns(selectedDate);

  const onPressLeftArrow = subtract1Month;
  const onPressHeaderDate = showDatePicker;
  const onPressRightArrow = add1Month;
  const onPressDate = setSelectedDate;

  const ListHeaderComponent = () => {
    return (
      <View>
        <Calendar
          selectedDate={selectedDate}
          onPressLeftArrow={onPressLeftArrow}
          onPressRightArrow={onPressRightArrow}
          onPressHeaderDate={onPressHeaderDate}
          onPressDate={onPressDate}
          columns={columns}
        />
        <Margin height={15} />
        <View
          style={{
            width: 4,
            height: 4,
            borderRadius: 4 / 2,
            backgroundColor: "#a3a3a3",
            alignSelf: "center",
          }}
        ></View>
        <Margin height={15} />
      </View>
    );
  };

  const renderItem = ({ item: todo }: { item: ITodoItem }) => {
    const isSuccess = todo.isSuccess;
    return (
      <View
        style={{
          width: 220,
          alignItems: "center",
          paddingVertical: 10,
          paddingHorizontal: 5,
          borderBottomWidth: 0.2,
          borderColor: "#a6a6a6",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 14, color: "#595959", flex: 1 }}>
          {todo.content}
        </Text>

        <Ionicons
          name="checkmark"
          size={17}
          color={isSuccess ? "#595959" : "#bfbfbf"}
        />
      </View>
    );
  };

  const onPressAdd = () => {};

  return (
    <Pressable style={styles.container} onPress={Keyboard.dismiss}>
      <Image
        source={{
          // 출처: https://kr.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1189772.htm
          uri: "https://img.freepik.com/free-photo/white-crumpled-paper-texture-for-background_1373-159.jpg?w=1060&t=st=1667524235~exp=1667524835~hmac=8a3d988d6c33a32017e280768e1aa4037b1ec8078c98fe21f0ea2ef361aebf2c",
        }}
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View>
          <FlatList
            data={todoList}
            contentContainerStyle={{ paddingTop: insets.top }}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={renderItem}
          />

          <AddTodoInput
            value={input}
            onChangeText={setInput}
            placeholder={`${dayjs(selectedDate).format("MM.DD")}에 초구할 투두`}
            onPressAdd={onPressAdd}
          />
        </View>
      </KeyboardAvoidingView>

      <Margin height={insets.bottom} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
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

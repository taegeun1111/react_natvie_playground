import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export interface ITodoItem {
  id: number;
  content: string;
  date: dayjs.Dayjs;
  isSuccess: boolean;
}

const TODO_LIST_KEY = "TODO_LIST_KEY";

const defaultTodoList: ITodoItem[] = [
  { id: 1, content: "1", date: dayjs(), isSuccess: true },
  { id: 2, content: "2", date: dayjs(), isSuccess: false },
  { id: 3, content: "3", date: dayjs(), isSuccess: true },
];

export const useTodoList = (selectedDate: dayjs.Dayjs) => {
  const [todoList, setTodoList] = useState(defaultTodoList);
  const [input, setInput] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const result = await AsyncStorage.getItem(TODO_LIST_KEY);
    if (result) {
      setTodoList(JSON.parse(result));
    }
  };

  const addTodo = () => {
    const newTodoList = [
      ...todoList,
      {
        id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
        content: input,
        date: selectedDate,
        isSuccess: false,
      },
    ];

    setTodoList(newTodoList);
    AsyncStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList));
  };

  const removeTodo = (todoId: number) => {
    const newTodoList = todoList.filter((list) => list.id !== todoId);
    setTodoList(newTodoList);
    AsyncStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList));
  };

  const toggleTodo = (todoId: number) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id !== todoId) return todo;
      return {
        ...todo,
        isSuccess: !todo.isSuccess,
      };
    });

    setTodoList(newTodoList);
    AsyncStorage.setItem(TODO_LIST_KEY, JSON.stringify(newTodoList));
  };

  const resetInput = () => {
    setInput("");
  };

  const filteredTodoList = todoList.filter((todo) => {
    const isSameDate = dayjs(todo.date).isSame(selectedDate, "date");
    // console.log("selectedDate: ", selectedDate);

    return isSameDate;
  });

  return {
    todoList,
    filteredTodoList,
    addTodo,
    removeTodo,
    toggleTodo,
    input,
    setInput,
    resetInput,
  };
};

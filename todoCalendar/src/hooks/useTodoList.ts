import dayjs from "dayjs";
import { useState } from "react";

export interface ITodoItem {
  id: number;
  content: string;
  date: dayjs.Dayjs;
  isSuccess: boolean;
}

const defaultTodoList: ITodoItem[] = [
  { id: 1, content: "1", date: dayjs(), isSuccess: true },
  { id: 2, content: "2", date: dayjs(), isSuccess: false },
  { id: 3, content: "3", date: dayjs(), isSuccess: true },
];

export const useTodoList = (selectedDate: dayjs.Dayjs) => {
  const [todoList, setTodoList] = useState(defaultTodoList);
  const [input, setInput] = useState("");

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
  };

  const removeTodo = (todoId: number) => {
    const newTodoList = todoList.filter((list) => list.id !== todoId);
    setTodoList(newTodoList);
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
  };

  const resetInput = () => {
    setInput("");
  };

  return {
    todoList,
    addTodo,
    removeTodo,
    toggleTodo,
    input,
    setInput,
    resetInput,
  };
};

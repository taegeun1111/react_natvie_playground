import { useState } from "react";

export const useCalculator = () => {
  const [input, setInput] = useState<null | string | number>(0);
  const [currentOperator, setCurrentOperator] = useState<null | string>(null);
  const [result, setResult] = useState<null | string | number>(null);
  const [tempInput, setTempInput] = useState<null | string | number>(null);
  const [tempOperator, setTempOperator] = useState<null | string | number>(
    null
  );
  const [isClickedOperator, setIsClickedOperator] = useState(false);
  const [isClickedEqual, setIsClickedEqual] = useState(false);

  const hasInput = !!input;

  const onPressNum = (num: number) => {
    if (currentOperator && isClickedOperator) {
      setResult(input);
      setInput(num);
      setIsClickedOperator(false);
    } else {
      const newInput = `${String(input) + String(num)}`;
      setInput(Number(newInput));
    }
  };

  const onPressOperator = (operator: string) => {
    if (operator !== "=") {
      setCurrentOperator(operator);
      setIsClickedOperator(true);
      setIsClickedEqual(false);
    } else {
      let finalResult = result;
      const finalInput = isClickedEqual ? tempInput : input;
      const finalOperator = isClickedEqual ? tempOperator : currentOperator;

      switch (finalOperator) {
        case "+":
          finalResult = Number(result) + Number(finalInput);
          break;
        case "-":
          finalResult = Number(result) - Number(finalInput);
          break;
        case "*":
          finalResult = Number(result) * Number(finalInput);
          break;
        case "/":
          finalResult = Number(result) / Number(finalInput);
          break;
        default:
          break;
      }

      setResult(finalResult);
      setInput(finalResult);
      setTempInput(finalInput);
      setCurrentOperator(null);
      setTempOperator(finalOperator);
      setIsClickedEqual(true);
    }
  };

  const onPressReset = () => {
    if (hasInput) {
      setInput(0);
    } else {
      setInput(0);
      setCurrentOperator(null);
      setResult(null);
      setTempInput(null);
      setTempOperator(null);
    }
  };

  return {
    input,
    currentOperator,
    result,
    tempInput,
    tempOperator,
    hasInput,
    onPressReset,
    onPressOperator,
    onPressNum,
  };
};

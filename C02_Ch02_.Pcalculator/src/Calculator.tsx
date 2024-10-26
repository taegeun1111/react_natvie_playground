import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { useCalculator } from "./useCalculator";

enum EButtonType {
  reset,
  operator,
  num,
}

const COLOR = {
  RESULT: "#4e4c51",
  RESET: "#5f5e62",
  OPERATOR: "#f39c29",
  NUM: "#5c5674",
};

interface ButtonProps {
  text: string;
  onPress: () => void;
  flex: number;
  type: EButtonType;
  isSelected?: boolean;
}

const Button = ({ text, onPress, flex, type, isSelected }: ButtonProps) => {
  const backgroundColor =
    type === EButtonType.reset
      ? COLOR.RESET
      : type === EButtonType.operator
      ? COLOR.OPERATOR
      : type === EButtonType.num
      ? COLOR.NUM
      : "transparent";

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flex: flex,
        backgroundColor: backgroundColor,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        borderWidth: isSelected ? 1 : 0.2,
        borderColor: "black",
      }}
    >
      <Text style={{ color: "white", fontSize: 25 }}>{text}</Text>
    </TouchableOpacity>
  );
};

const Calculator = () => {
  const {
    currentOperator,
    hasInput,
    input,
    result,
    tempInput,
    tempOperator,
    onPressReset,
    onPressNum,
    onPressOperator,
  } = useCalculator();

  /*
    계산기는 총 5줄로 분류해서 개발
  */
  return (
    <View style={{ flex: 1, width: 250, justifyContent: "center" }}>
      <Text>input: {input}</Text>
      <Text>currentOperator: {currentOperator}</Text>
      <Text>result: {result}</Text>
      <Text>tempInput: {tempInput}</Text>
      <Text>tempOperator: {tempOperator}</Text>

      {/* 결과 */}
      <InputContainer>
        <Text style={{ color: "white", fontSize: 35, textAlign: "right" }}>
          {input}
        </Text>
      </InputContainer>

      {/* [AC ~ /] */}
      <View style={{ flexDirection: "row" }}>
        <Button
          type={EButtonType.reset}
          text={hasInput ? "C" : "AC"}
          onPress={() => onPressReset()}
          flex={3}
        />
        <Button
          type={EButtonType.operator}
          text="/"
          onPress={() => onPressOperator("/")}
          flex={1}
          isSelected={currentOperator === "/"}
        />
      </View>

      {/* [7 ~ x] */}
      <ButtonContainer>
        {[7, 8, 9].map((num) => (
          <Button
            key={`num-${num}`}
            type={EButtonType.num}
            text={num.toString()}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type={EButtonType.operator}
          text="*"
          onPress={() => onPressOperator("*")}
          flex={1}
          isSelected={currentOperator === "*"}
        />
      </ButtonContainer>

      {/* [4 ~ -] */}
      <ButtonContainer>
        {[4, 5, 6].map((num) => (
          <Button
            key={`num-${num}`}
            type={EButtonType.num}
            text={num.toString()}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type={EButtonType.operator}
          text="-"
          onPress={() => onPressOperator("-")}
          flex={1}
          isSelected={currentOperator === "-"}
        />
      </ButtonContainer>

      {/* [1 ~ +] */}
      <ButtonContainer>
        {[1, 2, 3].map((num) => (
          <Button
            key={`num-${num}`}
            type={EButtonType.num}
            text={num.toString()}
            onPress={() => onPressNum(num)}
            flex={1}
          />
        ))}
        <Button
          type={EButtonType.operator}
          text="+"
          onPress={() => onPressOperator("+")}
          isSelected={currentOperator === "+"}
          flex={1}
        />
      </ButtonContainer>

      {/* [0 ~ =] */}
      <ButtonContainer>
        <Button
          type={EButtonType.num}
          text="0"
          onPress={() => onPressNum(0)}
          flex={3}
        />
        <Button
          type={EButtonType.operator}
          text="="
          onPress={() => onPressOperator("=")}
          isSelected={currentOperator === "="}
          flex={1}
        />
      </ButtonContainer>
    </View>
  );
};

export default Calculator;

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const InputContainer = styled.View`
  background-color: ${COLOR.RESULT};
  min-height: 50px;
  align-items: flex-end;
  padding: 10px 5px;
`;

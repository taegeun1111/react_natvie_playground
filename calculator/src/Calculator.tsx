import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";

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
}

const Button = ({ text, onPress, flex, type }: ButtonProps) => {
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
        borderWidth: 0.2,
        borderColor: "black",
      }}
    >
      <Text style={{ color: "white", fontSize: 25 }}>{text}</Text>
    </TouchableOpacity>
  );
};

const ButtonContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;

const Calculator = () => {
  /*
    계산기는 총 5줄로 분류해서 개발
  */
  return (
    <View style={{ flex: 1, width: 250 }}>
      {/* 결과 */}

      {/* [AC ~ /] */}
      <View style={{ flexDirection: "row" }}>
        <Button
          type={EButtonType.reset}
          text="AC"
          onPress={() => console.log("f")}
          flex={3}
        />
        <Button
          type={EButtonType.operator}
          text="/"
          onPress={() => console.log("f")}
          flex={1}
        />
      </View>

      {/* [7 ~ x] */}
      <ButtonContainer>
        <Button
          type={EButtonType.num}
          text="7"
          onPress={() => console.log("f")}
          flex={1}
        />
        <Button
          type={EButtonType.num}
          text="8"
          onPress={() => console.log("f")}
          flex={1}
        />
        <Button
          type={EButtonType.num}
          text="9"
          onPress={() => console.log("f")}
          flex={1}
        />
        <Button
          type={EButtonType.operator}
          text="x"
          onPress={() => console.log("f")}
          flex={1}
        />
      </ButtonContainer>

      {/* [4 ~ -] */}
      <ButtonContainer>
        <Button
          type={EButtonType.num}
          text="4"
          onPress={() => console.log("f")}
          flex={1}
        />
        <Button
          type={EButtonType.num}
          text="5"
          onPress={() => console.log("f")}
          flex={1}
        />
        <Button
          type={EButtonType.num}
          text="6"
          onPress={() => console.log("f")}
          flex={1}
        />
        <Button
          type={EButtonType.operator}
          text="-"
          onPress={() => console.log("f")}
          flex={1}
        />
      </ButtonContainer>

      {/* [1 ~ +] */}
      <ButtonContainer>
        <Button
          type={EButtonType.num}
          text="1"
          onPress={() => console.log("f")}
          flex={1}
        />
        <Button
          type={EButtonType.num}
          text="2"
          onPress={() => console.log("f")}
          flex={1}
        />
        <Button
          type={EButtonType.num}
          text="3"
          onPress={() => console.log("f")}
          flex={1}
        />
        <Button
          type={EButtonType.operator}
          text="+"
          onPress={() => console.log("f")}
          flex={1}
        />
      </ButtonContainer>

      {/* [0 ~ =] */}
      <ButtonContainer>
        <Button
          type={EButtonType.num}
          text="0"
          onPress={() => console.log("f")}
          flex={3}
        />
        <Button
          type={EButtonType.operator}
          text="="
          onPress={() => console.log("f")}
          flex={1}
        />
      </ButtonContainer>
    </View>
  );
};

export default Calculator;

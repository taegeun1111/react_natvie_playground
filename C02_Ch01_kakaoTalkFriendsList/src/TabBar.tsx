import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface TabBarProps {
  selectedTabIdx: number;
  setSelectedTabIdx: React.Dispatch<React.SetStateAction<number>>;
}

interface TabButtonProps {
  isSelected: boolean;
  onPress: () => void;
  activeIconName:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof Fontisto.glyphMap;
  inactiveIconName:
    | keyof typeof Ionicons.glyphMap
    | keyof typeof Fontisto.glyphMap;
  isIconFontisto?: boolean;
  isIconIonicons?: boolean;
}

const TabButton = ({
  isSelected,
  onPress,
  activeIconName,
  inactiveIconName,
  isIconFontisto,
  isIconIonicons,
}: TabButtonProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: 50,
        paddingVertical: 10,
      }}
    >
      {isIconFontisto && (
        <Fontisto
          name={
            isIconFontisto && isSelected
              ? (activeIconName as keyof typeof Fontisto.glyphMap)
              : (inactiveIconName as keyof typeof Fontisto.glyphMap)
          }
          size={24}
          color={"black"}
        />
      )}
      {isIconIonicons && (
        <Ionicons
          name={
            isIconIonicons && isSelected
              ? (activeIconName as keyof typeof Ionicons.glyphMap)
              : (inactiveIconName as keyof typeof Ionicons.glyphMap)
          }
          size={24}
          color={"black"}
        />
      )}
    </TouchableOpacity>
  );
};

const TabBar = ({ selectedTabIdx, setSelectedTabIdx }: TabBarProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        paddingBottom: insets.bottom,
        borderTopWidth: 0.5,
        borderTopColor: "grey",
      }}
    >
      <TabButton
        isSelected={selectedTabIdx === 0}
        onPress={() => setSelectedTabIdx(0)}
        activeIconName="person"
        inactiveIconName="persons"
        isIconFontisto
      />
      <TabButton
        isSelected={selectedTabIdx === 1}
        onPress={() => setSelectedTabIdx(1)}
        activeIconName="chatbubble"
        inactiveIconName="chatbubble-outline"
        isIconIonicons
      />
      <TabButton
        isSelected={selectedTabIdx === 2}
        onPress={() => setSelectedTabIdx(2)}
        activeIconName="pricetag"
        inactiveIconName="pricetag-outline"
        isIconIonicons
      />
      <TabButton
        isSelected={selectedTabIdx === 3}
        onPress={() => setSelectedTabIdx(3)}
        activeIconName="add-circle"
        inactiveIconName="add-circle-outline"
        isIconIonicons
      />
    </View>
  );
};

export default TabBar;

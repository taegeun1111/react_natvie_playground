import { StyleSheet, Text, View } from "react-native";
import BookmarkButton from "./BookmarkButton";
import { COLOR } from "./color";
import AlarmButton from "./AlarmButton";
import NextBusInfo from "./NextBusInfo";

interface Props {
  isBookmarked: boolean;
  onPress: () => void;
  num: number;
  numColor: string;
  directionDescription: string;
}

export default ({
  isBookmarked,
  onPress,
  num,
  numColor,
  directionDescription,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <BookmarkButton
          isBookmarked={isBookmarked}
          onPress={onPress}
          buttonStyle={{ paddingHorizontal: 10 }}
        />

        <View style={styles.busDirection}>
          <Text style={[styles.busText, { color: numColor }]}>{num}</Text>
          <Text style={styles.directionText}>{directionDescription} 방향</Text>
        </View>
      </View>
      <View style={styles.right}>
        <View style={styles.rightEnd}>
          <NextBusInfo
            hasInfo
            remainedTimeText="8분 0초"
            numOfRemainedStops={5}
            seatStatusText="여유"
          />

          <NextBusInfo hasInfo={false} remainedTimeText="8분 0초" />
        </View>

        <AlarmButton
          onPress={() => {}}
          buttonStyle={{ paddingHorizontal: 15 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  left: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  right: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  busDirection: { flex: 1 },
  busText: { fontSize: 20 },
  directionText: { fontSize: 13, color: COLOR.GRAY_3 },
  rightEnd: {
    flex: 1,
  },
});

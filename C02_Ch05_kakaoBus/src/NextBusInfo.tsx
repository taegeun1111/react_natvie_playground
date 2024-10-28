import { StyleSheet, Text, View } from "react-native";
import { COLOR } from "./color";
import { numberTypeAnnotation } from "../node_modules/@babel/types/lib/index-legacy.d";

interface Props {
  remainedTimeText: string;
  hasInfo: boolean;
  numOfRemainedStops?: number;
  seatStatusText?: string;
}

export default ({
  remainedTimeText,
  hasInfo,
  numOfRemainedStops,
  seatStatusText,
}: Props) => {
  if (!hasInfo) return <Text style={styles.noInfo}>도착 정보 없음</Text>;
  return (
    <View style={styles.container}>
      <Text style={styles.remainedTimeText}>{remainedTimeText}</Text>
      <View style={styles.right}>
        <Text style={styles.numOfRemainedStops}>
          {numOfRemainedStops}번째전
        </Text>
        <Text style={styles.seatStatusText}>{seatStatusText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  noInfo: {
    color: COLOR.GRAY_2,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  remainedTimeText: { color: COLOR.BLACK, marginRight: 10 },
  right: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLOR.GRAY_1,
    borderRadius: 3,
    padding: 2,
  },
  numOfRemainedStops: { color: COLOR.GRAY_3, marginRight: 3 },
  seatStatusText: { color: COLOR.CORAL },
});

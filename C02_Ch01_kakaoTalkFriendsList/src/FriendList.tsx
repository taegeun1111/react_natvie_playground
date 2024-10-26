import { ScrollView, View } from "react-native";
import Profile from "./Profile";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Margin from "./Margin";

export interface FriendItem {
  uri: string;
  name: string;
  introduction: string;
}

export interface FriendListProps {
  data: FriendItem[];
  isOpened: boolean;
}

export default ({ data, isOpened }: FriendListProps) => {
  const insets = useSafeAreaInsets();

  if (isOpened) {
    return null;
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      // contentContainerStyle={{ paddingBottom: insets.bottom }}
    >
      {data.map((item, index) => (
        <View key={index}>
          <Profile
            uri={item.uri}
            name={item.name}
            introduction={item.introduction}
          />
          <Margin height={13} />
        </View>
      ))}
    </ScrollView>
  );
};

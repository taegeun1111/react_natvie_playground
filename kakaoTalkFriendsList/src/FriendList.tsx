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
}

export default ({ data }: FriendListProps) => {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom }}
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

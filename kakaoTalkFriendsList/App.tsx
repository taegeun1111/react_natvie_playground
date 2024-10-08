import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Header from "./src/Header";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MyProfile from "./src/Profile";
import { friendProfiles, myProfile } from "./src/constant/data";
import Margin from "./src/Margin";
import Division from "./src/Division";
import FriendSection from "./src/FriendSection";
import FriendList from "./src/FriendList";

export default function App() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}

function Main() {
  const insets = useSafeAreaInsets();

  const onPressArrow = () => {
    console.log("clicl");
  };

  return (
    <View style={{ paddingTop: insets.top, flex: 1, paddingHorizontal: 15 }}>
      <Header />

      <Margin height={10} />
      <MyProfile
        name={myProfile.name}
        uri={myProfile.uri}
        introduction={myProfile.introduction}
      />

      <Margin height={15} />
      <Division />

      <Margin height={12} />
      <FriendSection
        friendProfileLen={friendProfiles.length}
        onPress={onPressArrow}
      />

      <FriendList data={friendProfiles} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

import { StatusBar } from "expo-status-bar";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Header from "./src/Header";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import MyProfile, { MyProfileProps } from "./src/Profile";
import { friendProfiles, myProfile } from "./src/constant/data";
import Margin from "./src/Margin";
import Division from "./src/Division";
import FriendSection from "./src/FriendSection";
import FriendList from "./src/FriendList";
import { useState } from "react";
import TabBar from "./src/TabBar";
import Profile from "./src/Profile";

export default function App() {
  return (
    <SafeAreaProvider>
      <Main />
    </SafeAreaProvider>
  );
}

function Main() {
  const insets = useSafeAreaInsets();
  const [isOpened, setIsOpened] = useState(true);
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  const onPressArrow = () => {
    setIsOpened(!isOpened);
  };

  const ItemSeparatorComponent = () => <Margin height={13} />;
  const renderItem = ({ item }: { item: MyProfileProps }) => (
    <View>
      <Profile
        uri={item.uri}
        name={item.name}
        introduction={item.introduction}
      />
    </View>
  );

  const ListHeaderComponent = () => (
    <View style={{ backgroundColor: "white" }}>
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
        isOpened={isOpened}
      />
    </View>
  );

  const ListFooterComponent = () => <Margin height={10} />;

  return (
    <View style={[styles.container, { paddingTop: insets.top, flex: 1 }]}>
      <FlatList
        data={isOpened ? friendProfiles : []}
        keyExtractor={(item, index) => item.name + index}
        stickyHeaderIndices={[0]}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListFooterComponent={ListFooterComponent}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
      />

      <TabBar
        selectedTabIdx={selectedTabIdx}
        setSelectedTabIdx={setSelectedTabIdx}
      />
    </View>
  );

  return (
    <View style={{ paddingTop: insets.top, flex: 1 }}>
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
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
          isOpened={isOpened}
        />

        <FriendList data={friendProfiles} isOpened={isOpened} />
      </View>

      <TabBar
        selectedTabIdx={selectedTabIdx}
        setSelectedTabIdx={setSelectedTabIdx}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

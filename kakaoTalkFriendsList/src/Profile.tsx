import React from "react";
import { Image, Text, View } from "react-native";
import Margin from "./Margin";

export interface MyProfileProps {
  uri: string;
  name: string;
  introduction: string;
}

const Profile = ({ uri, name, introduction }: MyProfileProps) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Image
        source={{ uri: uri }}
        style={{ width: 50, height: 50, borderRadius: 20 }}
      />
      <View style={{ justifyContent: "center", marginLeft: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{name}</Text>
        <Margin height={6} />
        <Text style={{ fontSize: 12, color: "gray" }}>{introduction}</Text>
      </View>
    </View>
  );
};

export default Profile;

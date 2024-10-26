import React from "react";
import { Image, Text, View } from "react-native";
import Margin from "./Margin";
import styled from "styled-components/native";

export interface MyProfileProps {
  uri: string;
  name: string;
  introduction: string;
}

const Container = styled.View`
  flex-direction: row;
`;

const ProfileImage = styled.Image<{
  size: number;
  height: number;
  borderRadius: number;
}>`
  width: ${(props) => props.size}px;
  height: ${(props) => props.height}px;
  border-radius: ${(props) => props.borderRadius}px;
`;

const Profile = ({ uri, name, introduction }: MyProfileProps) => {
  return (
    <Container>
      <ProfileImage source={{ uri }} size={50} height={50} borderRadius={20} />
      <View style={{ justifyContent: "center", marginLeft: 10 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>{name}</Text>
        <Margin height={6} />
        <Text style={{ fontSize: 12, color: "gray" }}>{introduction}</Text>
      </View>
    </Container>
  );
};

export default Profile;

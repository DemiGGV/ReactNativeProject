import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";
import { useNavigation } from "@react-navigation/native";

import { BackgroundComponent } from "../components/BackgroundComponent";
const userAvatar = require("../imgs/user.jpg");
const forest = require("../imgs/forest.jpg");
const down = require("../imgs/down.jpg");
const oldHouse = require("../imgs/oldHouse.jpg");
const user1 = require("../imgs/user1.png");
const user2 = require("../imgs/user2.png");

const posts = [
  {
    id: 1,
    imageUri: forest,
    title: "Forest",
    location: {
      name: "Ukraine",
      coordinates: {
        latitude: "48.9215",
        longitude: "24.70972",
      },
    },
    comments: [
      {
        id: 1,
        user: user1,
        comment:
          "Really love your most recent photo. I've been trying to capture the same thing for a few months and would love some tips!",
        time: "09 червня, 2020  08:40",
      },
      {
        id: 2,
        user: user2,
        comment:
          "A fast 50mm like f1.8 would help with the bokeh. I've been using primes as they tend to get a bit sharper images.",
        time: "09 червня, 2020 | 09:14",
      },
      {
        id: 3,
        user: user1,
        comment: "Thank you! That was very helpful!",
        time: "09 червня, 2020  09:40",
      },
      {
        id: 4,
        user: user2,
        comment: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
        time: "09 червня, 2020  10:40",
      },
    ],
    likes: 153,
  },
  {
    id: 2,
    imageUri: down,
    title: "Down",
    location: {
      name: "Black See, Ukraine",
      coordinates: {
        latitude: "46.482952",
        longitude: "30.712481",
      },
    },
    comments: [
      {
        id: 1,
        user: user1,
        comment: "Lorem ipsum dolor sit amet.",
        time: "09 червня, 2020  08:40",
      },
      {
        id: 2,
        user: user2,
        comment: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        time: "09 червня, 2020 | 09:14",
      },
      {
        id: 3,
        user: user1,
        comment: "Lorem, ipsum dolor.",
        time: "09 червня, 2020  09:40",
      },
      {
        id: 4,
        user: user2,
        comment: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
        time: "09 червня, 2020  10:40",
      },
    ],
    likes: 200,
  },
  {
    id: 3,
    imageUri: oldHouse,
    title: "Old house in Venice",
    location: {
      name: "Venice, Italy",
      coordinates: {
        latitude: "45.438759",
        longitude: "12.327145",
      },
    },
    comments: [
      {
        id: 1,
        user: user1,
        comment: "Lorem ipsum dolor sit amet.",
        time: "09 червня, 2020  08:40",
      },
      {
        id: 2,
        user: user2,
        comment: "Lorem ipsum dolor sit amet consectetur adipisicing.",
        time: "09 червня, 2020 | 09:14",
      },
      {
        id: 3,
        user: user1,
        comment: "Lorem, ipsum dolor.",
        time: "09 червня, 2020  09:40",
      },
    ],
    likes: 0,
  },
];

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const [isAvatarSet, setIsAvatarSet] = useState(false);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <BackgroundComponent>
        <ContainerViewMain>
          <ProfileView>
            <AvatarView
              onPress={() => {
                setIsAvatarSet(!isAvatarSet);
              }}
            >
              <AvatarImage source={userAvatar} resizeMode="cover" />
              <TouchableOpacityIcon
                onPress={() => {
                  console.log("Change the Avatar!");
                }}
              >
                <Icon name="x-circle" size={26} />
              </TouchableOpacityIcon>
            </AvatarView>
            <LogoutBtn
              onPress={() => {
                navigation.navigate("LoginScreen");
              }}
            >
              <Icon name="log-out" size={24} />
            </LogoutBtn>
            <TitleH1>Natali Romanova</TitleH1>
            <UserPostsList
              data={posts}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <PostView key={item.id}>
                  <PostImage source={item.imageUri} resizeMode="cover" />
                  <PostTitle>{item.title}</PostTitle>
                  <PostData>
                    <CommentsView
                      onPress={() => {
                        navigation.navigate("CommentsScreen", {
                          imageUri: item.imageUri,
                          comments: item.comments,
                        });
                      }}
                    >
                      <Icon
                        name="message-circle"
                        size={24}
                        style={{
                          color: item.comments ? "#ff6c00" : "#21212180",
                        }}
                      />
                      <CountersText
                        style={{
                          color: item.comments ? "#212121" : "#21212180",
                        }}
                      >
                        {item.comments.length}
                      </CountersText>
                    </CommentsView>
                    <LikesView>
                      <Icon
                        name="thumbs-up"
                        size={24}
                        style={{
                          color: item.likes ? "#ff6c00" : "#21212180",
                        }}
                      />
                      <CountersText
                        style={{
                          color: item.likes ? "#212121" : "#21212180",
                        }}
                      >
                        {item.likes}
                      </CountersText>
                    </LikesView>
                    <LocationView
                      onPress={() => {
                        navigation.navigate("MapScreen", {
                          coordinates: item.location.coordinates,
                        });
                      }}
                      style={{ color: "#21212180" }}
                    >
                      <Icon name="map-pin" size={24} />
                      <LocationText>{item.location.name}</LocationText>
                    </LocationView>
                  </PostData>
                </PostView>
              )}
            />
          </ProfileView>
        </ContainerViewMain>
      </BackgroundComponent>
    </TouchableWithoutFeedback>
  );
};

const ContainerViewMain = styled.View`
  margin-top: 120px;
  margin-bottom: 120px;
`;
const ProfileView = styled.View`
  padding: 90px 16px 0 16px;
  justify-content: start;
  align-items: center;
  background-color: #fff;
  border-radius: 25px 25px 0 0;
`;
const AvatarView = styled.TouchableOpacity`
  position: absolute;
  top: -60px;
  width: 120px;
  height: 120px;
  border-radius: 16px;
  background-color: #f6f6f6;
`;
const AvatarImage = styled.Image`
  width: 120px;
  height: 120px;
  border-radius: 16px;
  overflow: hidden;
`;
const TouchableOpacityIcon = styled.TouchableOpacity`
  position: absolute;
  bottom: 12px;
  right: -12px;
  margin: 0;
  padding: 0;
  background-color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 12px;
`;
const Icon = styled(Feather)`
  font-size: 25px;
  color: #bdbdbd;
`;
const LogoutBtn = styled.TouchableOpacity`
  position: absolute;
  top: 22px;
  right: 16px;
`;
const TitleH1 = styled.Text`
  color: #212121;
  text-align: center;
  font-family: "Roboto-Medium";
  font-size: 30px;
  margin-bottom: 32px;
`;
const UserPostsList = styled.FlatList`
  width: 100%;
  height: auto;
`;
const PostView = styled.View`
  margin-bottom: 32px;
`;
const PostImage = styled.Image`
  width: 100%;
  border-radius: 8px;
`;
const PostTitle = styled.Text`
  margin-top: 8px;
  color: #212121;
  font-family: "Roboto-Medium";
  font-weight: bold;
  font-size: 16px;
`;
const PostData = styled.View`
  margin-top: 8px;
  flex-direction: row;
  justify-content: space-between;
`;
const CommentsView = styled.TouchableOpacity`
  flex-direction: row;
`;
const LikesView = styled.TouchableOpacity`
  margin-left: 24px;
  flex-direction: row;
  align-content: baseline;
`;
const CountersText = styled.Text`
  margin-left: 6px;
  margin-top: 2px;
  font-family: "Roboto-Regular";
  font-size: 16px;
`;
const LocationView = styled.TouchableOpacity`
  margin-left: auto;
  flex-direction: row;
`;
const LocationText = styled.Text`
  margin-left: 6px;
  margin-top: 2px;
  font-family: "Roboto-Regular";
  font-size: 16px;
  color: #212121;
  text-decoration: underline;
`;

// const Icon = styled(Feather)`
//   color: #21212180;
// `;

import React from "react";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const userAvatar = require("../imgs/user.jpg");
const forest = require("../imgs/forest.jpg");
const down = require("../imgs/down.jpg");
const oldHouse = require("../imgs/oldHouse.jpg");
const user1 = require("../imgs/user1.png");
const user2 = require("../imgs/user2.png");

const user = {
  name: "Natali Romanova",
  email: "email@example.com",
  avatar: userAvatar,
};
const posts = [
  {
    id: 1,
    imageUri: forest,
    title: "Forest",
    location: {
      name: "Ivano-Frankivs'k Region, Ukraine",
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
      {
        id: 4,
        user: user2,
        comment: "Lorem ipsum dolor sit amet, consectetur adipisicing.",
        time: "09 червня, 2020  10:40",
      },
    ],
    likes: 200,
  },
];

export const PostsScreen = () => {
  const navigation = useNavigation();

  return (
    <MiddleView>
      <UserView>
        <AvatarImage source={user.avatar} resizeMode="cover" />
        <UserDataView>
          <UserNameText>{user.name}</UserNameText>
          <UserEmailText>{user.email}</UserEmailText>
        </UserDataView>
      </UserView>
      <UserPostsList>
        {posts.map((post) => (
          <PostView key={post.id}>
            <PostImage source={post.imageUri} resizeMode="cover" />
            <PostTitle>{post.title}</PostTitle>
            <PostData>
              <CommentsView
                onPress={() => {
                  navigation.navigate("CommentsScreen", {
                    imageUri: post.imageUri,
                    comments: post.comments,
                  });
                }}
              >
                <Icon
                  name="message-circle"
                  size={24}
                  style={{
                    color: post.comments ? "#ff6c00" : "#21212180",
                  }}
                />
                <CommentsText
                  style={{
                    color: post.comments ? "#212121" : "#21212180",
                  }}
                >
                  {post.comments.length}
                </CommentsText>
              </CommentsView>
              {/* <LikesView>
                <Icon
                  name="thumbs-up"
                  size={24}
                  style={{
                    color: item.likes ? "#ff6c00" : "#21212180",
                  }}
                />
                <CommentsText
                  style={{
                    color: item.likes ? "#212121" : "#21212180",
                  }}
                >
                  {item.likes}
                </CommentsText>
              </LikesView> */}
              <LocationView
                onPress={() => {
                  navigation.navigate("MapScreen", {
                    coordinates: post.location.coordinates,
                  });
                }}
                style={{ color: "#21212180" }}
              >
                <Icon name="map-pin" size={24} />
                <LocationText>{post.location.name}</LocationText>
              </LocationView>
            </PostData>
          </PostView>
        ))}
      </UserPostsList>
    </MiddleView>
  );
};

const MiddleView = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: center;
  padding: 32px 16px;
  background-color: #fff;
`;
const UserView = styled.View`
  height: 60px;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;
const AvatarImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 16px;
`;
const UserDataView = styled.View`
  margin-left: 8px;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: start;
`;
const UserNameText = styled.Text`
  color: #212121;
  font-family: "Roboto-Bold";
  font-weight: bold;
  font-size: 13px;
`;
const UserEmailText = styled.Text`
  color: #21212180;
  font-family: "Roboto-Regular";
  font-size: 11px;
`;
//+++ posts
const UserPostsList = styled.ScrollView`
  margin-top: 32px;
  width: 100%;
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
const CommentsText = styled.Text`
  margin-left: 6px;
  font-family: "Roboto-Regular";
  font-size: 16px;
`;
const LocationView = styled.TouchableOpacity`
  flex-direction: row;
`;
const LocationText = styled.Text`
  margin-left: 6px;
  font-family: "Roboto-Regular";
  font-size: 16px;
  color: #212121;
  text-decoration: underline;
`;

const Icon = styled(Feather)`
  color: #21212180;
`;

// <View>
//   <Icon
//     name="thumbs-up"
//     size={24}
//     style={{
//       color: post.comments ? "#ff6c00" : "#21212180",
//     }}
//   />
//   <CountersText>{post.likes}</CountersText>
// </View>;

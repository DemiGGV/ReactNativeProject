import React from "react";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

const userAvatar = require("../imgs/user.jpg");
const forest = require("../imgs/forest.jpg");
const down = require("../imgs/down.jpg");
const oldHouse = require("../imgs/oldHouse.jpg");

const user = {
  name: "Natali Romanova",
  email: "email@example.com",
  avatar: userAvatar,
};
const posts = [
  {
    id: 1,
    image: forest,
    title: "Forest",
    location: "Ivano-Frankivs'k Region, Ukraine",
    // coordinates:,
    comments: 8,
    thread: [
      { pavel: "lorem ipsum!" },
      { lev: "dolores emmet" },
      { sasha: "lorem!" },
      { user: "dolores" },
    ],
    likes: 153,
  },
  {
    id: 2,
    image: down,
    title: "Down",
    location: "Black See, Ukraine",
    comments: 3,
    likes: 200,
  },
  {
    id: 3,
    image: oldHouse,
    title: "Old house in Venice",
    location: "Venice, Italy",
    comments: 50,
    likes: 200,
  },
];

export const PostsScreen = () => {
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
            <PostImage source={post.image} resizeMode="cover" />
            <PostTitle>{post.title}</PostTitle>
            <PostData>
              <CommentsView>
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
                  {post.comments}
                </CommentsText>
              </CommentsView>
              <LocationView style={{ color: "#21212180" }}>
                <Icon name="map-pin" size={24} />
                <LocationText>{post.location}</LocationText>
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
const CommentsView = styled.View`
  flex-direction: row;
`;
const CommentsText = styled.Text`
  margin-left: 6px;
  font-family: "Roboto-Regular";
  font-size: 16px;
`;
const LocationView = styled.View`
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

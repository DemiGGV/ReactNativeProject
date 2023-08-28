import React from "react";
import { View, Text } from "react-native";
export const PostsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Posts Screen</Text>
    </View>
  );
};

// import React from "react";
// import {
//   Keyboard,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
// } from "react-native";
// import styled from "styled-components/native";
// import { Feather } from "@expo/vector-icons";

// const userAvatar = require("../imgs/user.jpg");
// const forest = require("../imgs/forest.jpg");
// const down = require("../imgs/down.jpg");
// const oldHouse = require("../imgs/oldHouse.jpg");
// const title = "Publications";
// const user = {
//   name: "Natali Romanova",
//   email: "email@example.com",
//   avatar: userAvatar,
// };
// const posts = [
//   {
//     id: 1,
//     image: forest,
//     title: "Forest",
//     location: "Ivano-Frankivs'k Region, Ukraine",
//     comments: 8,
//     likes: 153,
//   },
//   {
//     id: 2,
//     image: down,
//     title: "Down",
//     location: "Black See, Ukraine",
//     comments: 3,
//     likes: 200,
//   },
//   {
//     id: 3,
//     image: oldHouse,
//     title: "Old house in Venice",
//     location: "Venice, Italy",
//     comments: 50,
//     likes: 200,
//   },
// ];

// export const PostsScreen = () => {
//   return (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//       <MainView>
//         <Header>
//           <HeaderTitle>{title}</HeaderTitle>
//           <IconAbs name="log-out" size={24} />
//         </Header>
//         <MiddleView>
//           <UserView>
//             <AvatarImage source={user.avatar} resizeMode="cover" />
//             <UserDataView>
//               <UserNameText>{user.name}</UserNameText>
//               <UserEmailText>{user.email}</UserEmailText>
//             </UserDataView>
//           </UserView>
//           <UserPostsList>
//             {posts.map((post) => (
//               <View key={post.id}>
//                 <PostImage source={post.image} resizeMode="cover" />
//                 <PostTitle>{post.title}</PostTitle>
//                 <PostData>
//                   <CountersView>
//                     <PostView>
//                       <Icon
//                         name="message-circle"
//                         size={24}
//                         style={{
//                           color: post.comments ? "#ff6c00" : "#21212180",
//                         }}
//                       />
//                       <CountersText>{post.comments}</CountersText>
//                     </PostView>
//                     <View>
//                       <Icon
//                         name="thumbs-up"
//                         size={24}
//                         style={{
//                           color: post.comments ? "#ff6c00" : "#21212180",
//                         }}
//                       />
//                       <CountersText>{post.likes}</CountersText>
//                     </View>
//                   </CountersView>
//                   <LocationView>
//                     <Icon
//                       name="map-pin"
//                       size={24}
//                       // style={{ color: post.comments ? "#ff6c00" : "#21212180" }}
//                     />
//                     <LocationText>{post.location}</LocationText>
//                   </LocationView>
//                 </PostData>
//               </View>
//             ))}
//           </UserPostsList>
//         </MiddleView>
//         <BottomTab>
//           <Icon name="grid" size={24} />
//           <TouchableOpacity>
//             <MiddleBtn>
//               <Icon name="plus" size={24} style={{ color: "#fff" }} />
//             </MiddleBtn>
//           </TouchableOpacity>
//           <Icon name="user" size={24} />
//         </BottomTab>
//       </MainView>
//     </TouchableWithoutFeedback>
//   );
// };

// const MainView = styled.View`
//   flex: 1;
//   justify-content: space-between;
// `;
// const Header = styled.View`
//   flex: 1;
//   padding: 10px 0;
//   flex-direction: row;
//   justify-content: center;
//   align-items: flex-end;
//   max-height: 90px;
//   border-bottom-width: 1px;
//   border-bottom-style: solid;
//   border-bottom-color: #21212180;
// `;
// const HeaderTitle = styled.Text`
//   color: #212121;
//   font-family: "Roboto-Medium";
//   font-size: 17px;
// `;
// const IconAbs = styled(Feather)`
//   position: absolute;
//   bottom: 10px;
//   right: 10px;
//   color: #21212180;
// `;
// const MiddleView = styled.View`
//   flex: 1;
//   justify-content: flex-start;
//   align-items: flex-start;
// `;
// const UserView = styled.View`
//   flex: 1;
//   padding: 32px 16px;
//   flex-direction: row;
//   justify-content: start;
//   align-items: center;
// `;
// const AvatarImage = styled.Image`
//   width: 60px;
//   height: 60px;
//   border-radius: 16px;
// `;
// const UserDataView = styled.View`
//   margin-left: 8px;
//   flex: 1;
//   flex-direction: column;
//   justify-content: center;
//   align-items: left;
// `;
// const UserNameText = styled.Text`
//   color: #212121;
//   font-family: "Roboto-Bold";
//   font-weight: bold;
//   font-size: 13px;
// `;
// const UserEmailText = styled.Text`
//   color: #21212180;
//   font-family: "Roboto-Regular";
//   font-size: 11px;
// `;
// //+++ post
// const UserPostsList = styled.ScrollView``;
// const PostView = styled.View`
//   flex: 1;
//   flex-direction: row;
// `;
// const PostImage = styled.Image``;
// const PostTitle = styled.Text``;
// const PostData = styled.View``;
// const CountersView = styled.View``;
// const CountersText = styled.Text``;
// const LocationView = styled.View``;
// const LocationText = styled.Text``;

// //--- post
// const BottomTab = styled.View`
//   flex: 1;
//   max-height: 60px;
//   flex-direction: row;
//   justify-content: center;
//   align-items: center;
//   gap: 30px;
//   border-top-width: 1px;
//   border-top-style: solid;
//   border-top-color: #21212180;
// `;
// const MiddleBtn = styled.View`
//   flex: 1;
//   justify-content: center;
//   align-items: center;
//   min-width: 70px;
//   max-height: 40px;
//   border-radius: 20px;
//   background-color: #ff6c00;
// `;
// const Icon = styled(Feather)`
//   color: #21212180;
// `;

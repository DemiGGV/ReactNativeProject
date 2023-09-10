import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Alert, Keyboard, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";

import { BackgroundComponent } from "../components/BackgroundComponent";
import { getUser } from "../redux/user/authSelectors";
import { auth } from "../../config";
import { getUserPosts } from "../redux/posts/postsSelectors";
import {
  deletePost,
  fetchAllPosts,
  incrementLikes,
} from "../redux/posts/postsOperations";
import { setCurrentID } from "../redux/posts/postsSlice";
import { LogoutBtn } from "../components/LogoutBtn";
import { Loader } from "../components/Loader";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const posts = useSelector(getUserPosts);
  const userPostsList = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      dispatch(fetchAllPosts());
    });
    return () => unsubscribe();
  }, []);

  if (!user) {
    return <Loader />;
  }

  const handleDelete = (post) => {
    Alert.alert(
      "Delete post",
      "Are you sure to delete this post?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            dispatch(
              deletePost({
                id: post.id,
                imageURL: post.imageUri,
              })
            );
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <BackgroundComponent>
      <ContainerViewMain>
        <ProfileView>
          <AvatarView
            onPress={() => {
              console.log("Avatar box touched!");
            }}
          >
            <AvatarImage source={{ uri: user?.photoURL }} resizeMode="cover" />
            <TouchableOpacityIcon
              onPress={() => {
                console.log("IconAdd touched!");
              }}
            >
              <Icon name="x-circle" size={26} />
            </TouchableOpacityIcon>
          </AvatarView>
          <LogoutBtnView>
            <LogoutBtn />
          </LogoutBtnView>
          <TitleH1>{user?.displayName}</TitleH1>
          {!posts.length ? (
            <Loader />
          ) : (
            <UserPostsList
              ref={userPostsList}
              onContentSizeChange={() => {
                userPostsList.current?.scrollToEnd();
              }}
              data={posts}
              renderItem={({ item }) => {
                return (
                  <Pressable style={{ flex: 1 }} onPress={() => {}}>
                    <PostView>
                      <DeletePress onPress={() => handleDelete(item)}>
                        <PostImage
                          loadingIndicatorSource={<Loader />}
                          source={{ uri: item.imageUri }}
                          resizeMode="cover"
                        />
                      </DeletePress>

                      <PostTitle>{item.title}</PostTitle>
                      <PostData>
                        <DataView
                          onPress={() => {
                            dispatch(setCurrentID(item.id));
                            navigation.navigate("CommentsScreen");
                          }}
                        >
                          <Icon
                            name="message-circle"
                            size={24}
                            style={{
                              color: !!item.comments.length
                                ? "#ff6c00"
                                : "#21212180",
                            }}
                          />
                          <CommentsText
                            style={{
                              color: !!item.comments.length
                                ? "#212121"
                                : "#21212180",
                            }}
                          >
                            {item.comments.length}
                          </CommentsText>
                        </DataView>
                        <DataView
                          disabled={item.likes.includes(user.uid)}
                          onPress={() => {
                            dispatch(
                              incrementLikes({ id: item.id, uid: user.uid })
                            );
                          }}
                        >
                          <Icon
                            name="thumbs-up"
                            size={24}
                            style={{
                              color: !!item.likes.length
                                ? "#ff6c00"
                                : "#21212180",
                            }}
                          />
                          <CommentsText
                            style={{
                              color: !!item.likes.length
                                ? "#212121"
                                : "#21212180",
                            }}
                          >
                            {item.likes.length}
                          </CommentsText>
                        </DataView>
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
                  </Pressable>
                );
              }}
              keyExtractor={(item) => item.id}
            />
          )}
        </ProfileView>
      </ContainerViewMain>
    </BackgroundComponent>
  );
};

const ContainerViewMain = styled.View`
  margin-top: 120px;
`;
const ProfileView = styled.View`
  height: 100%;
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
const LogoutBtnView = styled.View`
  position: absolute;
  top: 22px;
  right: 0;
`;
const TitleH1 = styled.Text`
  color: #212121;
  text-align: center;
  font-family: "Roboto-Medium";
  font-size: 30px;
  margin-bottom: 32px;
`;
//+++ posts
const UserPostsList = styled.FlatList`
  margin-top: 32px;
  width: 100%;
`;
const PostView = styled.View`
  margin-bottom: 32px;
`;
const DeletePress = styled.Pressable`
  width: 100%;
`;
const PostImage = styled.Image`
  margin-left: auto;
  margin-right: auto;
  width: 343px;
  height: 240px;
  background-color: #00000020;
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
  column-gap: 24px;
  justify-content: space-between;
`;
const DataView = styled.TouchableOpacity`
  flex-direction: row;
`;
const CommentsText = styled.Text`
  margin-left: 6px;
  font-family: "Roboto-Regular";
  font-size: 16px;
`;
const LocationView = styled.TouchableOpacity`
  margin-left: auto;
  flex-direction: row;
`;
const LocationText = styled.Text`
  margin-left: 6px;
  font-family: "Roboto-Regular";
  font-size: 16px;
  color: #212121;
  text-decoration: underline;
`;

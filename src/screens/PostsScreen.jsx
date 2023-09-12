import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import styled from "styled-components/native";

import { getUser } from "../redux/user/authSelectors";
import { auth } from "../../config";
import { getPosts } from "../redux/posts/postsSelectors";
import { fetchAllPosts, incrementLikes } from "../redux/posts/postsOperations";
import { setCurrentID } from "../redux/posts/postsSlice";
import { Loader } from "../components/Loader";

export const PostsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const posts = useSelector(getPosts);
  const userPostsList = useRef(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      dispatch(fetchAllPosts());
    });
    return () => unsubscribe();
  }, []);

  // useEffect(() => {
  //   const unsubscribe = onSnapshot(postsCollectionRef, () => {
  //     dispatch(fetchAllPosts());
  //   });
  //   return () => unsubscribe();
  // }, []);

  if (!user) return <Loader />;

  return (
    <MiddleView>
      <UserView>
        <AvatarImage
          loadingIndicatorSource={<Loader />}
          source={{ uri: user?.photoURL }}
          resizeMode="cover"
        />
        <UserDataView>
          <UserNameText>{user?.displayName}</UserNameText>
          <UserEmailText>{user?.email}</UserEmailText>
        </UserDataView>
      </UserView>
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
                  <Pressable
                    style={{
                      flex: 1,
                    }}
                    onPress={() =>
                      navigation.navigate("ModalScreen", {
                        imageUri: item.imageUri,
                      })
                    }
                  >
                    <PostImage
                      loadingIndicatorSource={<Loader />}
                      source={{ uri: item.imageUri }}
                      resizeMode="cover"
                    />
                  </Pressable>
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
                          color: !!item.likes.length ? "#ff6c00" : "#21212180",
                        }}
                      />
                      <CommentsText
                        style={{
                          color: !!item.likes.length ? "#212121" : "#21212180",
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
const UserPostsList = styled.FlatList`
  margin-top: 32px;
  width: 100%;
`;
const PostView = styled.View`
  margin-bottom: 32px;
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

const Icon = styled(Feather)`
  color: #21212180;
`;

import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Keyboard, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import Toast from "react-native-root-toast";
import * as Crypto from "expo-crypto";
import styled from "styled-components/native";

import { getUser } from "../redux/user/authSelectors";
import { editPost } from "../redux/posts/postsOperations";
import { getCurrentPost, getPosts } from "../redux/posts/postsSelectors";

export const CommentsScreen = () => {
  const [inputValue, setInputValue] = useState("");
  const user = useSelector(getUser);
  const posts = useSelector(getPosts);
  const currentPost = useSelector(getCurrentPost);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const chatScroll = useRef(null);

  const formatedTimestamp = () => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hourCycle: "h24",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date().toLocaleString("uk-UA", options);
  };

  const handlerAddComment = async () => {
    const timeStamp = formatedTimestamp();
    const comment = {
      id: Crypto.randomUUID(),
      uid: user.uid,
      photoURL: user.photoURL,
      message: inputValue.trim(),
      timeStamp,
    };
    try {
      setInputValue("");
      Keyboard.dismiss();
      await dispatch(editPost({ id: posts[currentPost].id, comment })).unwrap();
    } catch (err) {
      let toast = Toast.show(err.message, {
        duration: 1000,
        backgroundColor: "#f02c2c",
        shadowColor: "black",
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  };

  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <ContainerViewMain>
        <Pressable
          style={{
            flex: 1,
          }}
          onPress={() =>
            navigation.navigate("ModalScreen", {
              imageUri: posts[currentPost].imageUri,
            })
          }
        >
          <Photo
            source={{ uri: posts[currentPost].imageUri }}
            resizeMode="cover"
          />
        </Pressable>
        <ChatScroll
          ref={chatScroll}
          onContentSizeChange={() => {
            chatScroll.current.scrollToEnd();
          }}
          data={posts[currentPost].comments}
          renderItem={({ item }) => {
            const oddElement = item.uid === user.uid;
            return (
              <Pressable onPress={() => {}} style={{ flex: 1 }}>
                <MessageView st={oddElement}>
                  <AvatarImage
                    source={{ uri: item.photoURL }}
                    resizeMode="cover"
                  />
                  <CommentView>
                    <CommentText>{item.message}</CommentText>
                    <TimeText st={oddElement}>{item.timeStamp}</TimeText>
                  </CommentView>
                </MessageView>
              </Pressable>
            );
          }}
          keyExtractor={(item) => item.id}
        />
        <FormWrapper>
          <InputForm
            value={inputValue}
            onChangeText={setInputValue}
            onFocus={() => {}}
            onBlur={() => {}}
            placeholder="Comment..."
          />
          <SendBtn
            onPress={handlerAddComment}
            style={{
              backgroundColor: !!inputValue ? "#ff6c00" : "#21212180",
            }}
            disabled={!inputValue}
          >
            <ArrowUp name="arrow-up" size={24} />
          </SendBtn>
        </FormWrapper>
      </ContainerViewMain>
    </Pressable>
  );
};

const ContainerViewMain = styled.View`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: #fff;
  padding: 32px 16px 20px 16px;
`;
const Photo = styled.Image`
  margin-left: auto;
  margin-right: auto;
  width: 360px;
  height: 252px;
  border-radius: 8px;
  margin-bottom: 32px;
`;
const ChatScroll = styled.FlatList`
  max-height: 300px;
  margin-bottom: 20px;
`;
const MessageView = styled.View`
  column-gap: 16px;
  flex-direction: ${(props) => (!props.st ? "row" : "row-reverse")};
  justify-content: center;
  align-items: start;
  margin-bottom: 24px;
  max-width: 360px;
`;
const AvatarImage = styled.Image`
  width: 28px;
  height: 28px;
`;
const CommentView = styled.View`
  background-color: #00000006;
  padding: 16px;
  width: 100%;
  border-radius: 0 6px 6px 6px;
  max-width: 316px;
`;
const CommentText = styled.Text`
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
  width: auto;
  margin-bottom: 8px;
  color: #212121;
  font-family: "Roboto-Regular";
  font-size: 13px;
`;
const TimeText = styled.Text`
  text-align: ${(props) => (!props.st ? "right" : "left")};
  color: #bdbdbd;
  font-family: "Roboto-Regular";
  font-size: 10px;
`;
const FormWrapper = styled.View`
  position: relative;
  width: 100%;
`;
const InputForm = styled.TextInput`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  font-size: 16px;
  background-color: #f6f6f6;
  border-width: 1px;
  border-color: #e8e8e8;
  border-radius: 25px;
`;
const SendBtn = styled.TouchableOpacity`
  position: absolute;
  top: 8px;
  right: 8px;
  justify-content: center;
  align-items: center;
  width: 34px;
  height: 34px;
  /* background-color: #ff6c00; */
  border-radius: 17px;
`;

const ArrowUp = styled(Feather)`
  color: #fff;
  font-weight: 200;
`;

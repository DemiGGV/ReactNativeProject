import React, { useState } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const CommentsScreen = ({ route }) => {
  const [inputValue, setInputValue] = useState("");
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
  let oddElement = true;
  const { imageUri, comments } = route.params;
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ContainerViewMain
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <Photo source={imageUri} />
        <ChatScroll
          data={comments}
          renderItem={({ item }) => {
            oddElement = !oddElement;
            return (
              <MessageView st={oddElement}>
                <AvatarImage source={item.user} />
                <CommentView>
                  <CommentText>{item.comment}</CommentText>
                  <TimeText st={oddElement}>{item.time}</TimeText>
                </CommentView>
              </MessageView>
            );
          }}
          keyExtractor={(item) => item.id}
        />
        <FormWrapper>
          <InputForm
            value={inputValue}
            onChangeText={setInputValue}
            onFocus={() => setIsKeyboardVisible(true)}
            onBlur={() => setIsKeyboardVisible(false)}
            placeholder="Comment..."
          />
          <SendBtn
            onPress={() => {
              setInputValue("");
              Keyboard.dismiss();
              console.log(inputValue);
            }}
          >
            <ArrowUp name="arrow-up" size={24} />
          </SendBtn>
        </FormWrapper>
      </ContainerViewMain>
    </TouchableWithoutFeedback>
  );
};

const PendingContainer = styled.View``;
const ContainerViewMain = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: flex-end;
  align-items: center;
  background-color: #fff;
  padding: 32px 16px 20px 16px;
`;
const Photo = styled.Image`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 32px;
`;
const ChatScroll = styled.FlatList`
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
  background-color: #ff6c00;
  border-radius: 17px;
`;

const ArrowUp = styled(Feather)`
  color: #fff;
  font-weight: 200;
`;

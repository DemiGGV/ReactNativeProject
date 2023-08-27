import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback, Keyboard, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Formik } from "formik";
import styled from "styled-components/native";

import { BackgroundComponent } from "../components/BackgroudComponent";
const userAvatar = require("../imgs/user.jpg");

export const RegistrationScreen = () => {
  const [keyboardStatus, setKeyboardStatus] = useState(false);
  const [isAvatarSet, setIsAvatarSet] = useState(false);
  const [focused, setFocused] = useState("");
  const [showPass, setShowPass] = useState(false);

  const focusedFieldStyle = {
    color: "#212121",
    backgroundColor: "#fff",
    borderColor: "#ff6c00",
  };

  useEffect(() => {
    const showKBSubscription = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardStatus(true);
    });
    const hideKBSubscription = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardStatus(false);
    });

    return () => {
      showKBSubscription.remove();
      hideKBSubscription.remove();
    };
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>
        <BackgroundComponent>
          <ContainerViewMain
            behavior={Platform.OS === "ios" ? "padding" : "height"}
          >
            <RegFormView style={keyboardStatus && [{ height: 380 }]}>
              <AvatarView
                onPress={() => {
                  setIsAvatarSet(!isAvatarSet);
                }}
              >
                {isAvatarSet && (
                  <AvatarImage source={userAvatar} resizeMode="cover" />
                )}
                <TouchableOpacityIcon
                  onPress={() => {
                    setIsAvatarSet(!isAvatarSet);
                  }}
                >
                  <Icon
                    name={!isAvatarSet ? "plus-circle" : "x-circle"}
                    size={26}
                  />
                </TouchableOpacityIcon>
              </AvatarView>
              <TitleH1>Registration</TitleH1>
              <Formik
                initialValues={{ login: "", email: "", password: "" }}
                onSubmit={(values, { resetForm }) => {
                  console.log(values);
                  resetForm();
                }}
              >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                  <FormWrapper>
                    <FormField
                      style={[focused === "login" && focusedFieldStyle]}
                      onFocus={() => {
                        setFocused("login");
                      }}
                      onChangeText={handleChange("login")}
                      onBlur={() => {
                        setFocused("");
                        handleBlur("login");
                      }}
                      value={values.login}
                      placeholder="Login"
                    />
                    <FormField
                      style={[focused === "email" && focusedFieldStyle]}
                      onFocus={() => {
                        setFocused("email");
                      }}
                      onChangeText={handleChange("email")}
                      onBlur={() => {
                        setFocused("");
                        handleBlur("email");
                      }}
                      value={values.email}
                      placeholder="E-mail"
                      inputMode="email"
                    />
                    <View>
                      <FormField
                        style={[focused === "password" && focusedFieldStyle]}
                        onFocus={() => {
                          setFocused("password");
                        }}
                        onChangeText={handleChange("password")}
                        onBlur={() => {
                          setFocused("");
                          handleBlur("password");
                        }}
                        value={values.password}
                        placeholder="Password"
                        secureTextEntry={!showPass}
                      />
                      <PasswordLink
                        onPress={() => {
                          setShowPass(!showPass);
                        }}
                      >
                        <PassLinkText>
                          {!showPass ? "Show password" : "Hide password"}
                        </PassLinkText>
                      </PasswordLink>
                    </View>
                    <SubmitBtn onPress={handleSubmit} title="Submit">
                      <SubmitBtnText>Sign up</SubmitBtnText>
                    </SubmitBtn>
                    <TouchOpWrapper onPress={() => {}}>
                      <LinkText>Already registered? Please login</LinkText>
                    </TouchOpWrapper>
                  </FormWrapper>
                )}
              </Formik>
            </RegFormView>
          </ContainerViewMain>
        </BackgroundComponent>
      </View>
    </TouchableWithoutFeedback>
  );
};

const ContainerViewMain = styled.KeyboardAvoidingView`
  flex: 1;
  flex-direction: column-reverse;
  justify-content: end;
`;
const RegFormView = styled.View`
  max-height: 550px;
  height: 100%;
  padding: 0 16px 0 16px;
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
  font-size: 24px;
  color: #ff6c00;
`;
const TitleH1 = styled.Text`
  margin-top: 90px;
  color: #212121;
  text-align: center;
  font-family: "Roboto-Medium";
  font-size: 30px;
`;
const FormWrapper = styled.View`
  margin-top: 16px;
  width: 100%;
  height: auto;
`;
const FormField = styled.TextInput`
  border-width: 1px;
  border-color: #e8e8e8;
  background-color: #f6f6f6;
  width: 100%;
  height: 50px;
  margin-top: 16px;
  border-style: solid;
  border-radius: 10px;
  padding: 16px;
  font-family: "Roboto-Regular";
  font-size: 16px;
`;
const SubmitBtn = styled.TouchableOpacity`
  justify-content: center;
  margin-top: 42px;
  height: 50px;
  border-radius: 100px;
  background-color: #ff6c00;
`;
const SubmitBtnText = styled.Text`
  color: #fff;
  text-align: center;
  font-family: "Roboto-Regular";
  font-size: 16px;
`;
const TouchOpWrapper = styled.TouchableOpacity``;

const PasswordLink = styled.TouchableOpacity`
  position: absolute;
  right: 16px;
  top: 43%;
`;
const PassLinkText = styled.Text`
  color: #1b4371;
  text-align: center;
  font-family: "Roboto-Regular";
  font-size: 16px;
`;
const LinkText = styled.Text`
  margin-top: 16px;
  margin-bottom: 40px;
  color: #1b4371;
  text-align: center;
  font-family: "Roboto-Regular";
  font-size: 16px;
`;
